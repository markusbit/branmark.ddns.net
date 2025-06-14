import { Router } from "express"; 
import { cards } from "../data";
import asyncHandler from 'express-async-handler'; 
import { CardModel } from "../models/card.model";

const router = Router(); 

router.get("/seed", asyncHandler(
    async (req, res) => {
        const cardsCount = await CardModel.countDocuments();        
        if(cardsCount>0){
            res.send(cards); 
            return; 
        }
        await CardModel.create(cards); 
        res.send("Seed is done. ")
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const cards = await CardModel.find(); 
        res.send(cards); 
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i'); 
        const foundCards = await CardModel.find({name: {$regex:searchRegex}, tags: {$regex:searchRegex}}); 
        res.send(foundCards); 
    }
))

export default router; 