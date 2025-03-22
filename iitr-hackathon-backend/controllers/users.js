const User = require("../models/userModel.js");
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const PROJECT = require("../models/projects");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("../models/projects.js");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const handleRegister = async (req, res) => {
  try {
    const { username, password, mail, role } = req.body;

    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      mail,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, mail: newUser.mail, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        mail: newUser.mail,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("User signup error:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { mail, otp } = req.body;

    // Check if OTP exists and is valid
    const storedOTP = otpStore.get(mail);
    if (
      !storedOTP ||
      storedOTP.otp !== otp ||
      Date.now() > storedOTP.expiresAt
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // OTP is correct; remove it from store
    otpStore.delete(mail);

    // Find user and generate JWT
    const existingUser = await User.findOne({ mail });
    const token = jwt.sign(
      {
        id: existingUser._id,
        mail: existingUser.mail,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        mail: existingUser.mail,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleCreateProject = async (req, res) => {
  try {
    const {
      projectname,
      description,
      amount,
      deadline,
      tags,
      difficulty,
      completeStatus,
      proposals,
      assignedfreelancerid,
    } = req.body;

    if (!projectname) {
      return res.status(400).json({
        message: "Project name, description, and deadline are required.",
      });
    }

    const newProject = new PROJECT({
      projectname,
      description,
      assignedfreelancerid: assignedfreelancerid || null,
      deadline,
      tags,
      amount,
      proposals: proposals || [],
      difficulty,
      completeStatus: completeStatus || false,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully!", project: newProject });
  } catch (error) {
    console.error("Project Creation Error:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

const handleSignIn = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const existingUser = await User.findOne({ mail });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP temporarily (expires in 5 minutes)
    otpStore.set(mail, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mail,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    res
      .status(200)
      .json({ message: "OTP sent to email. Please verify to continue." });
  } catch (error) {
    console.error("User sign-in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetJobs = async (req, res) => {
  try {
    const allJobs = await Project.find();
    if (allJobs.length === 0) {
      return res.status(404).json({ message: "No jobs found." });
    }
    res.status(200).json({ success: true, allJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const handleGetJob = async (req, res) => {
  try {
    const id = req.params.id;
    const Job = await Project.findById(id);
    if (!Job) {
      return res.status(404).json({ message: "No jobs found." });
    }
    res.status(200).json({ success: true, Job });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  handleRegister,
  handleCreateProject,
  handleSignIn,
  handleGetJobs,
  handleGetJob,
  verifyOTP,
};
