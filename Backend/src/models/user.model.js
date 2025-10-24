// models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    // For OTP flow
    otp: { type: String }, // store hashed OTP
    otpExpiresAt: { type: Date },
    // Optionally store a reset token (hashed) -- we'll use JWT for reset token but keep fields if desired
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  { timestamps: true }
);

// Hash password before save (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate hashed OTP and save expiry
userSchema.methods.setOTP = async function (rawOtp, expiresInMinutes) {
  const hash = crypto.createHash("sha256").update(rawOtp).digest("hex");
  this.otp = hash;
  this.otpExpiresAt = Date.now() + expiresInMinutes * 60 * 1000;
  await this.save();
  return hash;
};

// Verify OTP
userSchema.methods.verifyOTP = function (rawOtp) {
  if (!this.otp || !this.otpExpiresAt) return false;
  const hash = crypto.createHash("sha256").update(rawOtp).digest("hex");
  if (hash !== this.otp) return false;
  if (Date.now() > this.otpExpiresAt.getTime()) return false;
  // clear OTP after verification
  this.otp = undefined;
  this.otpExpiresAt = undefined;
  return true;
};

const User = mongoose.model("User", userSchema);
export default User;
