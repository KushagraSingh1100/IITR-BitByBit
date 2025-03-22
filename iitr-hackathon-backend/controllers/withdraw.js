const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

router.post("/approve-milestone", async (req, res) => {
  try {
    const { milestoneId } = req.body;

    if (!milestoneId) {
      return res.status(400).json({ message: "Milestone ID is required" });
    }

    
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/escrow/v1/milestone/approve",
      { milestone_id: milestoneId },
      {
        headers: {
          "X-Client-Id": process.env.CLIENT_ID,  
          "X-Client-Secret": process.env.CLIENT_SECRET, 
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("Milestone Approved:", response.data);
    res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    console.error("Error approving milestone:", error.response?.data || error.message);
    res.status(500).json({ message: "Error approving milestone", error: error.response?.data || error.message });
  }
});

module.exports = router;
