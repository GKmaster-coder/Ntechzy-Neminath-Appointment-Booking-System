// routes/auth.routes.js
import express from "express";
import { body } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { register, login, forgotPassword, verifyOtp, resetPassword, me } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("fullName").isString().trim().isLength({ min: 2 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").exists()
  ],
  asyncHandler(register)
);

// Login
router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").exists()],
  asyncHandler(login)
);

// Forgot (send OTP)
router.post("/forgot-password", asyncHandler(forgotPassword));

// Verify OTP
router.post("/verify-otp", asyncHandler(verifyOtp));

// Reset password
router.post("/reset-password", asyncHandler(resetPassword));

// Protected profile
router.get("/me", protect, asyncHandler(me));

export default router;
