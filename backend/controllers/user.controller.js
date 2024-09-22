
import {User} from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try{
        const {fullname,email,password,phoneNumber,address} = req.body;
        if(!fullname || !email || !password || !phoneNumber){
            return(res.status(400).json({
                message:"Please add all fields",
                success:false
            }))
        }
        const userExistCheck = await User.findOne({email});
        if(userExistCheck){
            return(res.status(400).json({
                message:"User Already exists",
                success:false
            }))
        }
        const hasedPassword = await bcrypt.hash(password,11);
        let resStatus = await User.create({
            fullname,
            email,
            password:hasedPassword,
            phoneNumber,
            role:"user"
        })
        if(resStatus){
            return(res.status(200).json({
                message:"User created Succesfully",
                success:true
            }))
        }
    }catch(error){
        console.log(error);
        return(res.status(400).json({
            message:"Something went wrong",
            success:false
        }))
    }
}

export const UserLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if( !email || !password){
            return(res.status(400).json({
                message:"Please input all Credentials",
                success:false
            }))
        }
        let ReqUser = await User.findOne({email});
        if(!ReqUser){
            return(res.status(400).json({
                message:"Email not Found.",
                success:false
            }))
        }
        let MatchPassword =await bcrypt.compare(password,ReqUser.password);
        if(!MatchPassword){
            return(res.status(400).json({
                message:"Password is incorrect",
                success:false
            }))
        }
        const tokenData = {
            userId:ReqUser._id,
            role:"user"
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        let user = {
            _id: ReqUser._id,
            fullname: ReqUser.fullname,
            email: ReqUser.email,
            address:ReqUser.address,
            role:ReqUser.role,
            phoneNumber:ReqUser.phoneNumber
        }
        console.log(user);
        return(res.status(200).cookie("token",token,{ maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json(
           { 
            message:"Welcome !",
            success:true,
            user
           }
        ))
    }catch(error){
        console.log(error)
    }
}

export const userLogout = (req,res)=>{
    try{
        console.log("Debug 1")
        return(res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        }))
    }catch(error){
        return (res.status(400).json({
            message:"Something went wrong.",
            success:false
        }))
    }
}








