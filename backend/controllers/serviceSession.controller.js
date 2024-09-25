import mongoose from "mongoose";
import { ServiceSessionModel } from "../models/servicesSession.model.js";
import { User } from "../models/user.model.js";
import { ServiceProviderModel } from "../models/serviceProvider.model.js";

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
        // console.log(userId)
        let userData = await User.findById(userId);
        const {fullname,phoneNumber} = userData;
        if(!userData){
            return(res.status(400).json({
                message:"Error Fetchin user details",
                success:false
            }))
        }
        let {service,time,location,duration,basePrice,totalPrice,offerings} = req.body;
        // console.log("Debug 2");
        // console.log(service,time,location,duration,basePrice,totalPrice,offerings);/
        const offeringList = offerings.map((item)=>{
            let name = Object.keys(item)[0];
            let price = Number(Object.values(item)[0]);
            return{name,price}
        })
        if ( !service || !time || !location || !duration || !basePrice || !totalPrice) {
            return res.status(400).json({ message: "All required fields must be provided.",success:false });
          }
        //   console.log("UserData",userData.fullname,"User Phone Number",userData.phoneNumber);
        let serviceCreation =await ServiceSessionModel.create({
            userId:userId,service,
            userName:fullname,
            userPhoneNumber:phoneNumber,
            time,location,
            duration,basePrice,totalPrice,offerings:offeringList,
            feedback:"",confirmationCode:"",status:"pending"
        })
        // console.log("Debug 3")

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
        console.error("Error during session creation:", error);
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
        // console.log(UpdatedStatus,sessionId)

        let statusList =['pending','confirmed' , 'completed' , 'cancelled' ,'started']
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
        let userID =req;
        // console.log(typeof userID.id);
        // let {id} = req.body;
        // console.log(typeof id);
        const resp = await ServiceSessionModel.find({userId:userID.id})
        // console.log("Response",resp);
        return(res.status(200).json({
            message:"Data fetched Successfull",
            data:resp
        }))

    }catch(error){
        return(res.status(400).json({
            message:"Error Fetching Data",
            success:false
        }))
    }
}

export const assignServiceProvider = async(req,res)=>{
    try{
        const {sessionId,serviceproviderId,serviceproviderName} = req.body;
        console.log(sessionId,serviceproviderId,serviceproviderName);
        const findSession = await ServiceSessionModel.findById(sessionId);
        if(!findSession){
            return res.status(400).json({
                message:"Session Not Found.",
                success:false
            })
        }
        const findServiceProvider = await ServiceProviderModel.findById(serviceproviderId);
        if(!findServiceProvider){
            return res.status(400).json({
                message:"Service Provider Not Found.",
                success:false
            })
        }
  
  
        function CodeGenerator(){
            let abc = "ABCD123456789EFGHIJKLMNOPQRSTUVWXYZ123456789";
            let code = '';
            for (let i = 0; i < 4; i++) {
              let randomIndex = Math.floor(Math.random() * abc.length);
              code += abc[randomIndex];
            }
            return code;
                  }
        let confirmCode = CodeGenerator();
        const resp = await ServiceSessionModel.findByIdAndUpdate(sessionId,{
            $set:{
                serviceProviderId:findServiceProvider?._id,
                serviceProviderName:findServiceProvider?.fullname,
                confirmationCode:confirmCode,
                status:'confirmed'
            }
        });
        if(!resp){
            return res.status(400).json({
                message:"Couldnt update Data.",
                success:false
            })
        }
        return res.status(200).json({
            message:"Success",
            success:true
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Something went wrong.",
            success:false
        })
    }
}

export const getAssignedProvider =async (req,res)=> {
    try{
        const {id} = req;
        // console.log(id);
        const resp = await ServiceSessionModel.find({serviceProviderId:id});
        if(resp){
            const modifiedResp = resp.map(session => {
                const { confirmationCode, ...sessionWithoutCode } = session.toObject(); 
                return sessionWithoutCode; 
            });
            return res.status(200).json({
                message:"Success",
                data:modifiedResp,
                success:true
            })
        }
    }catch(error){
        return res.status(400).json({
            message:"Something went wrong.",
            success:false
        })
    }
}

export const sessionConfirmCode = async(req,res)=>{
    try{
        // const resp = await ServiceSessionModel.find({})
        const {code,sessionId} = req.body;
        // console.log(code);
        // console.log(sessionId)
        const fetchSession = await ServiceSessionModel.findById(sessionId);

        if(!fetchSession){
            return res.status(404).json({
                message:"Incorrect Code",
                success:false
            })
        }
        if(fetchSession.confirmationCode===code){
            console.log("Success")
            fetchSession.status = "started"
            const updatedSession = await fetchSession.save();
            if(updatedSession){
                return res.status(200).json({
                    message:"Code Confirmed",
                    success:true
                })
            }

        }else{
            return res.status(401).json({
                message:"Incorrect Code",
                success:false
            })
        }
    }catch(error){
        return res.status(500).json({
            message:"Something went wrong.",
            success:false
        })
    }
}
