import { Router } from "express";
import jwt from "jsonwebtoken"; 
import { users } from "../data";
import asyncHandler from 'express-async-handler'; 
import bcrypt from 'bcryptjs'; 
import { User, UserModel } from "../models/user.model";
import { CardModel } from "../models/card.model";

const router = Router(); 

router.get("/seed", asyncHandler(
    async (req, res) => {
        const cardsCount = await UserModel.countDocuments();        
        if(cardsCount>0){
            res.send(users); 
            return; 
        }
        await UserModel.create(users); 
        res.send("Seed is done. ")
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        res.send("User API"); 
    }
))

router.get("/list", asyncHandler(
    async (req, res) => {
        
    }
))

router.post("/login", asyncHandler(
    async(req, res) => {
        const {email, password} = req.body; 
        const user = await UserModel.findOne({email: email}); 
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                res.send(generateTokenResponse(user)); 
            } else {
                res.status(400).send("Invalid password.");     
            }
        } else {
            res.status(400).send("Invalid email."); 
        }
    })
)

router.post("/register", asyncHandler(
    async(req, res) => {
        const {email, password, name } = req.body; 
        const user = await UserModel.findOne({email: email}); 
        if (user) {
            res.status(400).send('User already exists.'); 
            return; 
        } 
        const encryptedPassword = await bcrypt.hash(password, 10); 

        const newUser:User = {
            id:'', 
            name, 
            email: email.toLowerCase(), 
            password: encryptedPassword, 
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser); 
        res.send(generateTokenResponse(dbUser)); 
    })
)

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    },"branmarkauth", {
        expiresIn:"30d"
    }); 

    user.token = token; 
    return user; 
}

export default router; 