const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    completeStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    assignedfreelancerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    milestones: {
      type: Object,
      default: {},
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    proposals: {
      type: Number, // Ensure you send a number in the request
      default: 0,
      required:true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "professional"], // Ensure request uses valid values
      required: true,
    },
  },
  { timestamps: true }
);

const PROJECT = mongoose.model("project", projectSchema);
module.exports = PROJECT;
