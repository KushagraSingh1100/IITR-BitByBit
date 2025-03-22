const axios = require("axios");
require("dotenv").config();
const User = require("../models/userModel.js");
const Milestone = require("../models/milestones.js");

const createPaymentLink = async (req, res) => {
  try {
    const { employerId, milestoneId } = req.body;

    const employer = await User.findById(employerId);
    if (!employer || employer.role !== "employer") {
      return res.status(400).json({ message: "Invalid Employer" });
    }

    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    const amount = milestone.amount;

    const cashfreeResponse = await axios.post(
      "https://sandbox.cashfree.com/pg/links",
      {
        customer_details: {
          customer_id: employerId,
          customer_name: employer.username,
          customer_email: employer.mail,
          customer_phone: "9936012303",
        },
        link_amount: amount,
        link_currency: "INR",
        link_purpose: `Milestone Payment for ${milestone.title}`,
        link_id: `MS_${milestoneId}_${Date.now()}`,
        link_notify: { send_sms: true, send_email: true },
      },
      {
        headers: {
          "x-client-id": process.env.CLIENT_ID,
          "x-client-secret": process.env.CLIENT_SECRET,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Cashfree Response:", cashfreeResponse.data);

    res.status(200).json({
      success: true,
      paymentLink: cashfreeResponse.data.link_url || "No link found",
    });
  } catch (error) {
    console.error("Payment Link Error:", error.response?.data || error.message);
    res.status(500).json({
      message: error.response?.data?.message || "Payment creation failed",
    });
  }
};

const approveMilestone = async (req, res) => {
  try {
    const { employerId, milestoneId } = req.body;

    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    const employer = await User.findById(employerId);
    if (!employer || employer.role !== "employer") {
      return res.status(400).json({ message: "Invalid Employer" });
    }
    if (milestone.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Milestone already approved or completed" });
    }

    milestone.status = "approved";
    await milestone.save();

    res
      .status(200)
      .json({ success: true, message: "Milestone approved successfully" });
  } catch (error) {
    console.error("Milestone Approval Error:", error);
    res.status(500).json({ message: "Error approving milestone" });
  }
};

const withdrawPayment = async (req, res) => {
  try {
    const { freelancerId, milestoneId } = req.body;

    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    if (milestone.status !== "approved") {
      return res.status(400).json({ message: "Milestone is not yet approved" });
    }

    const freelancer = await User.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    const payoutPayload = {
      beneId: "freelancer_id",
      amount: milestone.amount,
      transferId: `TR_${milestoneId}_${Date.now()}`,
    };

    const cashfreeResponse = await axios.post(
      "https://payout-gamma.cashfree.com/payout/v1/requestTransfer",
      payoutPayload,
      {
        headers: {
          "x-client-id": process.env.CLIENT_ID,
          "x-client-secret": process.env.CLIENT_SECRET,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );

    milestone.status = "submitted";
    await milestone.save();

    res.status(200).json({
      success: true,
      message: "Withdrawal successful",
      transactionId: cashfreeResponse.data.data.transferId,
    });
  } catch (error) {
    console.error("Withdrawal Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Withdrawal failed" });
  }
};

module.exports = { createPaymentLink, approveMilestone, withdrawPayment };
