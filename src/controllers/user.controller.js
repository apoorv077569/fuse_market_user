import user from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, college, city, year_or_sem, password } =
      req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !college ||
      !city ||
      !year_or_sem ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exist",
        user: existingUser,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      phone,
      college,
      city,
      year_or_sem,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getProfile = async(req,res) =>{
  try{
    const userId = req.user.id;
    const existingUser = await user.findById(userId).select("-password");
    if(!existingUser){
      return res.status(404).json(
        {
          success:false,
          message:"User not found"
        }
      );
    }
    return res.status(200).json({
      success:true,
      message:"Profile fetched successfully",
      existingUser
    });
  }catch(err){
    return res.status(500).json(
      {
        success:false,
        error:err.message
      }
    );
  }
}

export const updateProfile = async(req,res) =>{
  try{
    const userId = req.user.id;
    const {name,email,phone,college,city,year_or_sem} = req.body;

    const updateUser = await user.findByIdAndUpdate(
      userId,
      {name,email,phone,college,city,year_or_sem},
      {new:true,runValidators:true}
    ).select("-password");
    if(!updateUser){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }
    return res.status(201).json({
      success:true,
      message:"Profile updated Successfully",
      user:updateUser
    });
  }catch(err){
    return res.status(500).json({
      success:false,
      error:err.message
    });
  }
}
