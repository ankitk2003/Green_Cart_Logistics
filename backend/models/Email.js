import mongoose from "mongoose";
const emailSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  otp: String,
  otpExpires: Date,
  hashedPassword: String,
  username: String,
  verified: { type: Boolean, default: false },
});

export default mongoose.model("Email",emailSchema)
