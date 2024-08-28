import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
dotenv.config({})
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const corsOptions = {
    origin:'http//localhost:5173',
    credentials:true
}

app.use(cors(corsOptions))
const PORT = 5001;

app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"Backend",
        success:true
    })
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started at Port: ${5001}`)
})

