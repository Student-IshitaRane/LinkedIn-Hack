import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/verify.js";
import userRoutes from "./routes/user.js";


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const resumeRoutes = require('./routes/resumeRoutes');
const gdRoutes = require('./routes/gdRoutes');

const app = express();

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

// Routes
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
    server.listen(PORT, () => console.log(`Running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection failed", error.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for frontend: http://localhost:5173`);
});
