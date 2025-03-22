const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    Profilename: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["freelancer", "employer", "admin"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [String],
      ratings: { type: Number, default: 0 },
      completedProjects: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
