import  mongoose,{Schema}  from "mongoose";

const ServiceSessionSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceProviderId:{type:Schema.Types.ObjectId,ref:"ServiceProvider",required:false},
    service: { type: String, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], required: true },
    duration: { type: String },  // e.g., '60 minutes'
    basePrice: { type: Number },
    totalPrice:{type:Number},
    feedback: { type: String },
    confirmationCode: { type: String},
    offerings: [
        {
            name: { type: String, required: true },  // Offering name
            price: { type: Number, required: true }  // Offering price
        }
    ],

},{ timestamps: true });

export const ServiceSessionModel = mongoose.model("ServiceSession",ServiceSessionSchema);