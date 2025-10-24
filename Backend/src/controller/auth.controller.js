// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validationResult } from "express-validator";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const OTP_EXPIRES_MIN = parseInt(process.env.OTP_EXPIRES_MIN || "10", 10);
const RESET_TOKEN_EXPIRES_MIN = parseInt(process.env.RESET_TOKEN_EXPIRES_MIN || "15", 10);

// Configure nodemailer transporter (simple)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// helper to sign JWT
const signJwt = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Register
const register = async (req, res, next) => {
  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(422, "Validation failed", errors.array()));

  const { fullName, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return next(new ApiError(400, "Passwords do not match"));

  const existing = await User.findOne({ email });
  if (existing) return next(new ApiError(409, "Email already registered"));

  const user = new User({ fullName, email, password });
  await user.save();

  // prepare response with token
  const token = signJwt({ id: user._id, email: user.email });
  const response = new ApiResponse(201, { user: { id: user._id, fullName: user.fullName, email: user.email }, token }, "User registered");
  res.status(201).json(response);
};

// Login
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(422, "Validation failed", errors.array()));

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(401, "Invalid credentials"));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ApiError(401, "Invalid credentials"));

  const token = signJwt({ id: user._id, email: user.email });
  res.json(new ApiResponse(200, { user: { id: user._id, fullName: user.fullName, email: user.email }, token }, "Logged in"));
};

// Forgot Password (Send OTP)
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ApiError(400, "Email is required"));

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(404, "User not found"));

  // generate numeric OTP of 6 digits
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

  // save hashed OTP with expiry on user
  await user.setOTP(otp, OTP_EXPIRES_MIN);

  // send otp via email
  const mailOptions = {
    from: `"No Reply" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Your password reset OTP",
    text: `Your OTP for password reset is ${otp}. It will expire in ${OTP_EXPIRES_MIN} minutes.`,
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It will expire in ${OTP_EXPIRES_MIN} minutes.</p>`
  };

  await transporter.sendMail(mailOptions);

  res.json(new ApiResponse(200, null, "OTP sent to registered email"));
};

// Verify OTP
const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) return next(new ApiError(400, "Email and OTP are required"));

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(404, "User not found"));

  const ok = user.verifyOTP(otp);
  if (!ok) return next(new ApiError(400, "Invalid or expired OTP"));

  // If verification succeeded, save cleared fields and create a short-lived reset JWT
  await user.save();

  const resetToken = signJwt({ id: user._id, email: user.email, purpose: "reset-password" }, `${RESET_TOKEN_EXPIRES_MIN}m`);
  res.json(new ApiResponse(200, { resetToken }, "OTP verified. Use resetToken to reset password (expires soon)"));
};

// Reset Password
const resetPassword = async (req, res, next) => {
  const { resetToken, password, confirmPassword } = req.body;
  if (!resetToken || !password || !confirmPassword) return next(new ApiError(400, "resetToken, password and confirmPassword are required"));
  if (password !== confirmPassword) return next(new ApiError(400, "Passwords do not match"));

  // verify JWT
  let payload;
  try {
    payload = jwt.verify(resetToken, JWT_SECRET);
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired reset token"));
  }

  if (payload.purpose !== "reset-password") return next(new ApiError(401, "Invalid reset token"));

  const user = await User.findById(payload.id);
  if (!user) return next(new ApiError(404, "User not found"));

  user.password = password; // pre-save hook will hash
  // clear any reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json(new ApiResponse(200, null, "Password has been reset successfully"));
};

// Optional protected profile endpoint
const me = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password -otp -otpExpiresAt");
  if (!user) return next(new ApiError(404, "User not found"));
  res.json(new ApiResponse(200, { user }));
};

export { register, login, forgotPassword, verifyOtp, resetPassword, me };
