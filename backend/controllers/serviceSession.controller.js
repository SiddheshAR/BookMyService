import { ServiceSessionModel } from "../models/servicesSession.model.js";


export const createServiceSession =async(req,res)=>{
    try{
        let userId=req.id;
        if(!userId){
            return(res.status(400).json({
                message:"Cant find user.",
                success:false
            }))
        }
        let {service,time,location,rating,status,duration,price,feedback,confirmationCode} = req.body;

        let serviceCreation =await ServiceSessionModel.create({
            userId:userId,service,
            time,location,rating,
            status,duration,price,
            feedback,confirmationCode:"KZI7"
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
