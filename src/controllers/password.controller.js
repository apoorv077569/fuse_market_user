import nodemailer from "nodemailer";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";

const otpStore = new Map();

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email are required" });
    const existingUser = await user.findOne({ email });
    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"Fuse Market" <process.env.MAIL_USER>`,
      to: email,
      subject: "Fuse Market - Reset Password otp",
      html: `<p>Hello <b>${user.name}</b>,</p>
             <p>Your OTP for password reset is <b>${otp}</b>.</p>
             <p>This OTP is valid for 5 minutes.</p>`,
    };
    await transporter.sendMail(mailOptions);
    // Expire OTP after 5 minutes
    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000);
    return res.status(200).json({
      success: true,
      message: "otp sent to your email",
      otp: otp,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and otp are required" });
    const validOtp = otpStore.get(email);
    if (!validOtp)
      return res
        .status(400)
        .json({ success: false, message: "Expired otp or not found" });
    if (validOtp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    otpStore.set(`${email}_verified`, true);
    otpStore.delete(email);

    return res.status(200).json({
      success: false,
      message: "OTP verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const resetPssword = async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;
    if (!email || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Password didn't match",
      });
    }
    const isVerified = otpStore.get(`${email}_verified`);
    if (!isVerified)
      return res
        .status(400)
        .json({ success: false, message: "Otp verification required" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.findOneAndUpdate({ email }, { password: hashedPassword });
    otpStore.delete(`${email}_verified`);

    return res.status(200).json({
      success: true,
      message: "Password reset successfull",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
