import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import http from "http";
import jwt from "jsonwebtoken";

const app=express();
app.use(cors());
dotenv.config();

const PORT=4000;

app.use(express.json());

import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/verify.js";
import userRoutes from "./routes/user.js";
app.use("/auth",authRoutes);
app.use("/users", userRoutes);

app.use()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected successfully!");
    server.listen(PORT,()=>console.log(`Running on port ${PORT}`));
})
.catch((error)=>{
    console.error("Database connection failed ",error.message);
    process.exit(1);//exit if the database is not connected
});

console.log("Server is running on port", PORT);
