import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"User not authenticated",
                success:false
            })
        }
        // const decode 
    }catch(error){

    }
}