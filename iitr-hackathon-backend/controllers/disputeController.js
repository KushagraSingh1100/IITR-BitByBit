const Dispute = require("../models/disputeSchema.js");
const Milestone = require("../models/milestones.js");


exports.raiseDispute = async (req, res) => {
  try {
    const { projectId, milestoneId, senderId, receiverId } = req.body;

    const dispute = new Dispute({
      project: projectId,
      milestone: milestoneId,
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await dispute.save();
    res.status(201).json({ message: "Dispute created successfully", dispute });
  } catch (error) {
    console.error("Dispute creation error:", error);
    res.status(500).json({ message: "Error creating dispute" });
  }
};


exports.sendMessage = async (req, res) => {
  try {
    const { disputeId, senderId, message } = req.body;

    const dispute = await Dispute.findById(disputeId);
    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    dispute.messages.push({ sender: senderId, message });
    await dispute.save();

    res.status(200).json({ message: "Message sent", dispute });
  } catch (error) {
    console.error("Message sending error:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};


exports.resolveDispute = async (req, res) => {
  try {
    const { disputeId, resolution } = req.body;

    const dispute = await Dispute.findById(disputeId);
    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    dispute.status = resolution === "approve" ? "resolved" : "rejected";
    await dispute.save();

    res.status(200).json({ message: "Dispute resolved", dispute });
  } catch (error) {
    console.error("Error resolving dispute:", error);
    res.status(500).json({ message: "Error resolving dispute" });
  }
};
