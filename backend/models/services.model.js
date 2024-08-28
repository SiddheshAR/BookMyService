import  mongoose  from "mongoose";

const serviceSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceProviderId:{type:Schema.Types.ObjectId,ref:"ServiceProvider",required:true},
    service: { type: String, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
    rating: { type: Number, min: 1, max: 5 },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], required: true },
    duration: { type: String },  // e.g., '60 minutes'
    price: { type: Number },
    feedback: { type: String },
    confirmationCode: { type: String},

},{ timestamps: true });

export const service = mongoose.model("Service",serviceSchema);