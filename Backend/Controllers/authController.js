const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const otpStore = {};

const userController = {
  register: async (req, res) => {
    try {
      const { email, password, name, role, age } = req.body;

      if (!email || !password || !name || !age) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email.toLowerCase(), // normalize
        password: hashedPassword,
        name,
        role,
        age,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email: email.toLowerCase() }); // normalize
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const expiresInMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      const expiresAt = new Date(Date.now() + expiresInMs);

      const token = jwt.sign(
        { user: { userId: user._id, role: user.role } },
        secretKey,
        { expiresIn: '3h' } // JWT valid for 3 hours
      );

     const isProduction = process.env.NODE_ENV === "production";
return res
  .cookie("token", token, {
    expires: expiresAt,
    httpOnly: true,
    secure: isProduction,            // secure=true only in production (HTTPS)
    sameSite: isProduction ? "none" : "lax",
  })
  .status(200)
  .json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  forgetPassword: async (req, res) => {
    const { email, otp, newPassword, step } = req.body;

    try {
      if (!step) return res.status(400).json({ message: "Step is required" });

      // STEP 1: Request OTP
      if (step === "request") {
        const user = await User.findOne({ email: email.toLowerCase() }); // normalize
        if (!user) return res.status(404).json({ message: "User not found" });

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = {
          otp: generatedOtp,
          expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        };

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset OTP",
          text: `Your OTP for password reset is: ${generatedOtp}`,
        });

        return res.status(200).json({ message: "OTP sent to email" });
      }

      // STEP 2: Verify OTP
      if (step === "verify") {
        const record = otpStore[email];
        if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        return res.status(200).json({ message: "OTP verified" });
      }

      // STEP 3: Reset Password
      if (step === "reset") {
        if (!otp || !newPassword) {
          return res.status(400).json({ message: "OTP and new password are required" });
        }

        const record = otpStore[email];
        if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const user = await User.findOne({ email: email.toLowerCase() }); // normalize
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        delete otpStore[email];

        return res.status(200).json({ message: "Password reset successfully" });
      }

      return res.status(400).json({ message: "Invalid step" });
    } catch (err) {
      console.error("Forget password error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userController;
