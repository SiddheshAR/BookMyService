import mongoose from 'mongoose';

const managerSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    phoneNumber:{
        type:Number
    }
},{timestamps:true});

export const Manager = mongoose.model("Manager",managerSchema);