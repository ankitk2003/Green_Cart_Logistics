import User from "../models/User.js";
import Email from "../models/Email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// dotenv.config();
dotenv.config({ path: "./server.env" });

const JWT_admin_secret = process.env.JWT_ADMIN_SECRET || "admin_secret_key";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const Signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "user already exists" });
    }

    const otp = generateOtp();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store OTP in temp Email collection
    await Email.findOneAndUpdate(
      { email },
      {
        email,
        hashedPassword,
        username,
        otp,
        otpExpires: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
        verified: false,
      },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your admin account",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to email","email":email });
  } catch (err) {
    console.error("Error in admin signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const tempRecord = await Email.findOne({ email });

    //    console.log(tempRecord)

    if (!tempRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (tempRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (tempRecord.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const newAdmin = await User.create({
      email: tempRecord.email,
      password: tempRecord.hashedPassword,
      username: tempRecord.username,
    });

    await Email.deleteOne({ email });

    const token = jwt.sign({ id: newAdmin._id }, JWT_admin_secret);

    res.json({
      message: "user verified and signed in successfully",
      token,
      userName: newAdmin.username,
      role: "admin",
    });
  } catch (err) {
    console.error("Error verifying admin OTP:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_admin_secret);

    res.json({
      message: "user logged in successfully",
      token,
      userName: user.username,
      role: "admin",
    });
  } catch (err) {
    console.error("Error in admin signin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
