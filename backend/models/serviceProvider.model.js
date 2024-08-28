import mongoose from "mongoose";

const serviceProviderSchema = mongoose.Schema({
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
    phoneNumber:{
        type:Number,
        requried:true
    },
    address:{
        type:String,
    },
    servicesLocation:{
        type:[String]
    },
    ratings:{
        type:[Number],
    },
    availability:{
        type:String
    },
    servicesOffered:{
        type:[String]
    }
},{timestamps:true})

export const serviceProviderModel = mongoose.model("ServiceProvider",serviceProviderSchema)