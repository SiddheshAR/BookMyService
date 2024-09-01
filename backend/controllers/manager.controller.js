import bcrypt from "bcryptjs";
import { Manager } from "../models/manager.model.js";
import jwt from "jsonwebtoken";

export const ManagerLogin = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return(res.status(400).json({
                message:"Please input all fields",
                success:false
            }))
        }
        const manager = await Manager.findOne({email});
        // console.log(manager);
        if(!manager){
            return(
                res.status(400).json({
                    message:"User not Found.",
                    success:false
                })
            )
        }
        const PassCheck = await bcrypt.compare(password,manager.password);
        // console.log(PassCheck);
        if(!PassCheck){
            return(
                res.status(400).json({
                    message:"Password not match",
                    success:false
                })
            )
        }
        const tokenData ={
            userId:manager._id,
            role:"manager"
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        let data = {
            email:manager.email,
            address:manager.address,
            phoneNumber:manager.phoneNumber,
            fullname:manager.fullname
        }
        return(res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly: true, sameSite: 'strict'}).json({
            message:"Logged in",
            data,
            success:true
        }));

    }catch(error){
        return(res.status(400).json({
            message:"Something went wrong.",
            status:false
        }))
    }
}

export const ManagerLogout = async(req,res)=>{
    try{
        return(res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out Successfully."
        }))
    }catch(error){
        return(res.status(400).json({
            message:"Error Logging Out",
            status:false
        }))
    }
}