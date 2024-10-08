import bcrypt from "bcryptjs";
import { ServiceProviderModel } from "../models/serviceProvider.model.js";
import jwt from "jsonwebtoken";

export const serviceProviderRegister =async(req,res)=>{
    try{
        const {fullname,email,password,phoneNumber} = req.body;
        if(!fullname || !email || !password || !phoneNumber){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details."
            })
        }
        let userCheck = await ServiceProviderModel.findOne({email});
        if(userCheck){
            return res.status(400).json({
                success:false,
                message:"User already exists."
            })
        }
            const hashedPassword = await bcrypt.hash(password,11);
            let userCreate = await ServiceProviderModel.create({
                fullname,
                email,
                password:hashedPassword,
                phoneNumber,
                role:"serviceProvider"
            });
        if(userCreate){
            return res.status(200).json({
                success:true,
                message:"Account Created."
            })
        }

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong."
        })
    }
}

export const ServiceProviderLogin = async(req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(email,password);
        if(!email || !password){
            return(
                res.status(400).json({
                    message:"Email or Password Missng",
                    success:false
                })
            )
        }
        let UserCheck = await ServiceProviderModel.findOne({email});
        // console.log(UserCheck);
        if(!UserCheck){
            return(res.status(400).json({
                message:"Something went wrong.",
                success:false
            }))
        }
        const passCheck = await bcrypt.compare(password,UserCheck.password);
        if(!passCheck){
            return(res.status(400).json({
                message:"Incorrect password",
                success:false
            }))
        }

        const tokenData = {
            userId:UserCheck._id,
            role:"serviceProvider"
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        let data = {
            id:UserCheck._id,
            fullname:UserCheck?.fullname,
            email:UserCheck?.email,
            address:UserCheck?.address || "",
            phoneNumber:UserCheck?.phoneNumber || null,
            servicesLocation:UserCheck?.servicesLocation || [],
            ratings:UserCheck?.ratings || [],
            availability:UserCheck?.availability || [],
            servicesOffered:UserCheck?.servicesOffered || [],
            role:"serviceProvider"
        }

        return(res.status(200).cookie("token",token,{maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message:"Login Success",
            success:true,
            data
        }))
    }catch(error){
        return(res.status(400).json({
            message:"Something went wrong.",
            success:false
        }))
    }
}

export const serviceProviderLogout = (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out Successfully",
            success:true
        })
    }catch(error){
        return(res.status(400).json({
            message:"Something went wrong",
            success:false
        }))
    }
}

export const getServiceProviders =async (req,res)=>{
    try{
        let data = await ServiceProviderModel.find();
        if(!data){
            return(res.status(400).json({
                message:"Something went wrong",
                success:false
            }))
        }
        return(res.status(200).json({
            message:"Data Fetched",
            data,
            success:true
        }))
    }catch(error){
        return(res.status(400).json({
            message:"Error Fetching Service Providers Data.",
            success:false
        }))
    }
}

export const updateServiceProviderData = async(req,res)=>{
    try{
        const {id} = req;
        // console.log(id);
        let {fullname,skills,locationsOffer,availability,phoneNumber} = req.body;
        const userCheck = await ServiceProviderModel.findById(id);
        if(!userCheck){
            return res.status(400).json({
                message:"User Id Invalid,Please login again.",
                success:false
            })
        }   
        const updateUser = await ServiceProviderModel.findByIdAndUpdate(
            id,
            {$set:{fullname:fullname,servicesLocation:locationsOffer,availability:availability,
                servicesOffered:skills,phoneNumber:phoneNumber
            }},
            {new:true}
        );
        if(!updateUser){
            return res.status(400).json({
                message:"Error Updating data.",
                success:false
            })
        }

        return res.status(200).json({
            message:"Update Successfull.",
            success:true
        })
    }catch(error){
        return res.status(400).json({
            message:"Something went wrong.",
            success:false
        })
    }
}

