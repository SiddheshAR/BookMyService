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
                phoneNumber
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
        console.log("debug 1")
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
        console.log('t1')

        const passCheck = await bcrypt.compare(password,UserCheck.password);
        console.log('t2')
        if(!passCheck){
            return(res.status(400).json({
                message:"Incorrect password",
                success:false
            }))
        }
        console.log("debug 4")
        const tokenData = {
            serviceProviderId:UserCheck._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        console.log("debug 5")
        let data = {
            id:UserCheck._id,
            fullname:UserCheck?.fullname,
            email:UserCheck?.email,
            address:UserCheck?.address || "",
            phoneNumber:UserCheck?.phoneNumber || null,
            servicesLocation:UserCheck?.servicesLocation || [],
            ratings:UserCheck?.ratings || [],
            availability:UserCheck?.availability || [],
            servicesOffered:UserCheck?.servicesOffered || []
        }
        console.log("debug 6")

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



