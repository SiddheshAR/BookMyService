import  mongoose,{Schema}  from "mongoose";

const ServiceSessionSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName:{type:String ,required:true},
    userPhoneNumber:{type:Number},
    serviceProviderId:{type:Schema.Types.ObjectId,ref:"ServiceProvider",required:false},
    serviceProviderName:{type:String},
    service: { type: String, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'started','canceled'], required: true },
    duration: { type: String },  // e.g., '60 minutes'
    basePrice: { type: Number },
    totalPrice:{type:Number},
    feedback: { type: String },
    confirmationCode: { type: String},
    offerings: [
        {
            name: { type: String },  // Offering name
            price: { type: Number }  // Offering price
        }
    ],

},{ timestamps: true });

export const ServiceSessionModel = mongoose.model("ServiceSession",ServiceSessionSchema);