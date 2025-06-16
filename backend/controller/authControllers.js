import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv'; 
dotenv.config(); 

const key=process.env.JWT_SECRET;

//register
export const register = async (req, res) => {
  try {
    const { username, emailid, password, role } = req.body;

    if (!username || !emailid || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ emailid });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      emailid,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, emailid: savedUser.emailid },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userObject = savedUser.toObject();
    delete userObject.password;

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: userObject,
    });

  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { emailid, password } = req.body;

    const currentUser = await User.findOne({ emailid });
    if (!currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, currentUser.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const userObject = currentUser.toObject();
    delete userObject.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userObject
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


//GET details
export const details=async(req,resp)=>{
    try {
        const emailid=req.user.emailid;
        const currentUser=await Entre.findOne({emailid:emailid});
        resp.json({username:currentUser.username});
    } catch (error) {
        console.log("there has been an error ", error);
        resp.status(500).js({message: "there has been an error oopsie poopsie"});
    }
}