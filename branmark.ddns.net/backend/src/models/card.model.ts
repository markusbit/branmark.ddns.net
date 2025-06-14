import { model, Schema } from "mongoose";

export interface Card{
    id:string;
    title:string;
    link:string;
    icon:string;
    tags:string[];
}

export const CardShema = new Schema<Card>(
    {
        title: {type: String, required:true}, 
        link: {type: String, required:true}, 
        icon: {type: String, required:true}, 
        tags: {type: [String], required:false}
    },{
        toJSON:{
            virtuals:true
        }, 
        toObject:{
            virtuals: true
        }, 
        timestamps:true
    }
)

export const CardModel = model<Card>('card', CardShema); 