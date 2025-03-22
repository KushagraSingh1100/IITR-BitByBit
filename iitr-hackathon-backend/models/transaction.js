const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema(
  {
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    milestones: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ['escrow', 'pending', 'refunded', 'completed'],
        required: true
    }
  },
  { timestamps: true }
);

const TRANSACTION = mongoose.model("transaction", transactionSchema);

module.exports = TRANSACTION;
