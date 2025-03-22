const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    msg: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const NOTIFICATION = mongoose.model("notification", notificationSchema);

module.exports = NOTIFICATION;
