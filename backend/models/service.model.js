import  mongoose  from "mongoose";

const serviceSchema = mongoose.Schema({
    name: { type: String, required: true },
    img:{type:String,required:true},
    duration: { type: String,required:true },  
    price: { type: Number,required:true },
    description: { type: String,required:true},
    offerings: [
        {
            name: { type: String, required: true },  // Offering name
            price: { type: Number, required: true }  // Offering price
        }
    ],
    rating:{type:Number,required:true},
    tags:[{name:{type:String}}]
});

export const ServiceModel = mongoose.model("Service",serviceSchema);