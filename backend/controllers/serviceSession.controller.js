import mongoose from "mongoose";
import { ServiceSessionModel } from "../models/servicesSession.model.js";

// Fetch Manager Data
export const getServiceSession = async(req,res)=>{
    try{
        let fetchAllServices = await ServiceSessionModel.find();
        return(res.status(200).json({
            message:"Data Fetched Success",
            data:fetchAllServices,
            success:true
        }))
    }catch(error){
        return(res.status(400).json({
            message:"Error Fetching Data",
            success:false
        }))
    }
}

// Fetch session by ID
export const getSessionById = async(req,res)=>{
    try{
        let userId=req.params.id;
        console.log(userId)
        let fetchDataByID = await ServiceSessionModel.find({["userId"]:userId});
        if(!fetchDataByID){
            return(res.status(400).json({
                message:"Error Fetching Data",
                success:false
            })) 
        }
        return(res.status(200).json({
            message:"Data Fetch Successfully.",
            data:fetchDataByID,
            success:true
        }))
    }catch(error){
        return(res.status(400).json({
            message:"Error Fetching Session Details",
            success:false
        }))
    }
}

// TO Create a session.
export const createServiceSession =async(req,res)=>{
    try{
        let userId=req.id;
        if(!userId){
            return(res.status(400).json({
                message:"Cant find user.",
                success:false
            }))
        }
        let {service,time,location,duration,basePrice,totalPrice} = req.body;
        if (!service || !time || !location || !duration || !basePrice || !totalPrice) {
            return res.status(400).json({ message: "All required fields must be provided.",success:false });
          }
        let serviceCreation =await ServiceSessionModel.create({
            userId:userId,service,
            time,location,
            duration,basePrice,totalPrice,
            feedback:"",confirmationCode:"",status:"pending"
        })

        if(!serviceCreation){
            return(res.status(400).json({
                message:"Error creating session",
                success:false
            }))
        }else{
            return(res.status(200).json({
                message:"Session Created Successfully.",
                success:true
            }))
        }
    }catch(error){
        return(res.status(400).json({
            message:"Unable to create Service",
            success:false
        }))
    }
} 

// To Update Status of Service
export const updateServiceStatus = async(req,res)=>{
    try{
        let {sessionId,UpdatedStatus} = req.body;
        let statusList =['pending' || 'confirmed' || 'completed' || 'canceled']
        if(!statusList.includes(UpdatedStatus)){
            return(res.status(400).json({
                message:"Invalid Status Input.",
                success:false
            }))  
        }
            
        if(!sessionId){
            return(res.status(400).json({
                message:"Session status not found",
                success:false
            }))
        };
        let result = await ServiceSessionModel.findByIdAndUpdate(sessionId,{$set:{["status"]:UpdatedStatus}});
        if(!result){
            return(res.status(400).json({
                message:"Error Updating status 1",
                success:false
            }))
        }
        return(res.status(200).json({
            message:"Updated Status",
            success:true
        }))
    }catch(error){
        return(res.status(400).json({
            message:"Error updating status",
            success:false
        }))
    }
}

export const getCurrentSessions = async(req,res)=>{
    try{
        console.log("Debug1");
        const {id,role} = req;
        const objectID = mongoose.Types.ObjectId(id);
        console.log(objectID);
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     console.error("Invalid ObjectId format.");
        //     return res.status(400).json({
        //         message: "Invalid ID format.",
        //         success: false
        //     });
        // }
        // let objectId = mongoose.Types.ObjectId(id);
        // console.log("Converted ObjectId:", objectId);
        if(!id || !role){
            return(res.status(400).json({
                message:"Cant find valid Token & ID.",
                success:false
            }))
        }
        // console.log(id,role)
        if(role=="user"){
            console.log("Debug 2")
            
        //    let resData =  await ServiceSessionModel.find({["userId"]:"66d162c9e024d42e90827f7a"});
        //    let resData =  await ServiceSessionModel.find({userId:toString(id)});
        let resData = await ServiceSessionModel.find({ userId: mongoose.Types.ObjectId(id) });
           console.log(resData);
            console.log("Debug 3")

           if(!res){
            return(res.status(400).json({
                message:"Failed to fetch Data.",
                success:false
            }))
           }
           return(res.status(200).json({
            message:"Data Fetch Successfull.",
            data:resData,
            success:true
        }))
        }
    }catch(error){
        return(res.status(400).json({
            message:"Error Fetching Data",
            success:false
        }))
    }
}

