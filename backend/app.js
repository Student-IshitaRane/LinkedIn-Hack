import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";
import axios from "axios";
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
app.use(express.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

app.use(cors());

const FASTAPI_URL = "http://localhost:8000";


// Routes
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/verify.js";
import interviewRoutes from "./routes/interview.js";
import userRoutes from "./routes/user.js";
import gdRoutes from "./routes/gdRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// app.use(cors());
//cors for both fasAPI_backend and frontend

// Configure CORS for your frontend (5173)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// FastAPI middleware
app.use('/api/interview', async (req, res, next) => {
  try {
    const url = `${FASTAPI_URL}${req.path}`;
    
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(FASTAPI_URL).host
      }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('FastAPI proxy error:', error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: error.message });
  }
});


// Routes
app.use("/interviews", interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/gd', gdRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    services: ['resume', 'gd'],
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message,
    path: req.path
  });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected successfully!");
    // server.listen(PORT, () => console.log(`Running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection failed", error.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for frontend: http://localhost:5173`);
});
