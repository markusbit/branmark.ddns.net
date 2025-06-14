import { model, Schema } from "mongoose";

export interface User{
    id:string;
    email:string;
    password:string; 
    name:string;
    isAdmin:boolean;
}

export const UserShema = new Schema<User>(
    {
        email: {type: String, required:true}, 
        password: {type: String, required:true}, 
        name: {type: String, required:true}, 
        isAdmin: {type: Boolean, required:true}, 
    },{
        timestamps:true, 
        toJSON: {
            virtuals:true
        }, 
        toObject: {
            virtuals:true
        }
    }
)

export const UserModel = model<User>('user', UserShema); 