const axios = require("axios");
require("dotenv").config();
const Milestone = require("../models/milestones.js");

exports.createMilestone = async (req, res) => {
     try {
       const { projectId, title, amount, employerId} = req.body;
   
       if (!projectId || !employerId) {
         return res.status(400).json({ message: "All fields are required." });
       }
   
       const newMilestone = new Milestone({
        projectId,
        employerId,  
        title,
        
        amount,
        
        status: "pending"
      });
   
       await newMilestone.save();
   
       res.status(201).json({
         message: "Milestone created successfully",
         milestone: newMilestone,
       });
     } catch (error) {
       console.error("Milestone Creation Error:", error);
       res.status(500).json({ message: "Failed to create milestone" });
     }
   };