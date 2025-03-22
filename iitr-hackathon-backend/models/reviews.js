const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema(
  {
    stars: {
        type:  Number,
        enum: ["1","2","3","4","5"],
        default: 1,
        require: true,
    },
    review: {
        type: String,
        require: true,
    },
    projectid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }
  },
  { timestamps: true }
);

const TRANSACTION = mongoose.model("transaction", transactionSchema);

module.exports = TRANSACTION;
