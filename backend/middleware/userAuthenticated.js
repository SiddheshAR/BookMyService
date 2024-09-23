import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next)=>{
    try{
        let token = req.cookies.token;
        if(!token){
            return(res.status(400).json({
                message:"Authentication Error,Token not found.",
                success:false
            }))
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        // console.log(decode)
        if(!decode){
            return(res.status(400).json({
                message:"Authentication Failed",
                success:false
            }))
        }
        req.id=decode.userId;
        req.role=decode.role
        next();
    }catch(error){
        return(res.status(400).json({
            message:"Authentication Error",
            success:false
        }))
    }
}
export default isAuthenticated;