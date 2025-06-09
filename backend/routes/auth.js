import express from "express";
import { register } from "../controller/authControllers.js";
import { login } from "../controller/authControllers.js";
import { verifyToken } from "../middleware/verify.js";
const router=express.Router();

//entrepreneur routes
router.post("/candidate/register",verifyToken, register);
router.post("/candidate/login",login);
// router.post("/admin/register", verifyToken regAdmin);
// router.post("/admin/login", loginAdmin);

export default router;