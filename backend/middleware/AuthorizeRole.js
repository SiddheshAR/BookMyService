


const AuthRoles = (...role)=>{
    return((req,res,next)=>{
        let UserRole = req.role;
        if(!UserRole){
            return(res.status(400).json({
                message:"Auth Error",
                success:false
            }))
        }
        if(role.includes(UserRole)){
            next();
        }else{
            return(res.status(400).json({
                message:"Action not allowed.",
                success:false
            }))
        }
    })
}

export default AuthRoles;