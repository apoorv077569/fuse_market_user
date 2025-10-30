import { registerUser,getProfile,updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/register",registerUser);
userRouter.get("/profile",verifyToken,getProfile);
userRouter.put("/profile",verifyToken,updateProfile);
export default userRouter;