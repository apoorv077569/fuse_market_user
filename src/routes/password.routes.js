import { sendOtp,verifyOtp,resetPssword } from "../controllers/password.controller.js";
import express from "express";

const passwordRoute = express.Router();

passwordRoute.post("/send-otp",sendOtp);
passwordRoute.post("/verify",verifyOtp);
passwordRoute.post("/reset",resetPssword);

export default passwordRoute;