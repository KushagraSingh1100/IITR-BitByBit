const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disputeSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", 
      required: true,
    },
    milestones: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone", 
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    status: {
      type: String,
      enum: ["escrow", "pending", "refunded", "completed"],
      required: true,
    },
    messages: [
        {
          sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          message: { type: String, required: true },
          timestamp: { type: Date, default: Date.now },
        },
      ],
  },
  { timestamps: true }
);

const Dispute = mongoose.model("Dispute", disputeSchema);

module.exports = Dispute; 