import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/verify.js";
import userRoutes from "./routes/user.js";

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected successfully!");
    server.listen(PORT, () => console.log(`Running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection failed", error.message);
    process.exit(1);
  });

console.log("Server is running on port", PORT);