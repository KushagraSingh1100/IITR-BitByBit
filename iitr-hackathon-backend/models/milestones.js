const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const milestoneSchema = new Schema(
  {
    title: {
        type: String, 
        required: true,
    },
    amount:{ 
        type: Number, 
        required: true 
    },
    status: { 
        type:String,
        enum: ["pending", "funded", "submitted", "approved", "disputed", "released"],  
        default: 'pending' 
    },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

    submission: { 
        type: String 
    },
    submittedAt: { 
        type: Date 
    },
    approvedAt: { 
        type: Date 
    },
    escrowFunded: { type: Boolean, default: false }, 
    paymentReleased: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const MILESTONE = mongoose.model("milestone", milestoneSchema);

module.exports = MILESTONE;