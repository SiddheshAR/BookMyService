
import mongoose from "mongoose"
import { ServiceModel } from "../models/service.model.js";

export const CreateService = async(req,res)=>{
    try{
        const {name,img,duration,price,description,offerings} = req.body;
        if(!name || !img || !duration || !price || !description || !offerings){
            return(res.status(400).json({
                message:"Please submit all the requried data."
            }))
        }
        let result = await ServiceModel.create({
            name,
            img,
            duration,
            price,
            description,
            offerings
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

export const getAllServices = async(req,res)=>{
    try{
        let services = await ServiceModel.find();
        return(res.status(200).json({
            message:"Services fetched.",
            success:true,
            services
        }));
    }catch(error){
        return(res.status(400).json({
            message:"Something went wrong.",
            success:false
        }))
    }
}

export const getServiceByID = async(req,res)=>{
    try{
        let serviceID = req.params.id;
        let data = await ServiceModel.findById(serviceID);
        if(!data){
            return(res.status(400).json({
                message:"Unable to find Service",
                success:false
            }))
        }else{
            return(res.status(200).json({
               message:"Data fetched success",
               success:true,
               data
            }))
        }
    }catch(error){
        return(res.status(400).json({
            message:"Something went wrong.",
            success:false
        }))
    }   
}
