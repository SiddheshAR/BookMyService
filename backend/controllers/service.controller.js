
import mongoose from "mongoose"
import { ServiceModel } from "../models/service.model.js";

export const CreateService = async(req,res)=>{
    try{
        const {name,img,duration,price,description} = req.body;
        if(!name || !img || !duration || !price || !description){
            return(res.status(400).json({
                message:"Please submit all the requried data."
            }))
        }
        let result = await ServiceModel.create({
            name,
            img,
            duration,
            price,
            description
        });

        if(result){
            return(res.status(200).json({
                message:"Service Added Successfull.",
               success:true 
            }))
        }

    }catch(error){
        return(res.status(400).json({
            message:"Something went wrong",
            success:false
        }))
    }
}