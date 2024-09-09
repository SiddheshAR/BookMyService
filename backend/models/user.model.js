import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        requried:true
    },
    phoneNumber:{
        type:Number,
        requried:true
    },
    address:{
        type:String,
    },
    role:{
        type:String
    }
    
},{timestamps:true})
export const User = mongoose.model('User',userSchema);