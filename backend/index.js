import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import UserRoutes from "./routes/user.routes.js";
import ServiceProvider from "./routes/serviceProvider.route.js";
import ManagerRoute from "./routes/manager.routes.js";
import ServiceRouter from "./routes/serviceSession.router.js"
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

app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/serviceProvider",ServiceProvider);
app.use("/api/v1/manager",ManagerRoute);
app.use('/api/v1/service',ServiceRouter);
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started at Port: ${5001}`)
})

