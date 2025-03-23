const express = require("express");
const { createMilestone, getMilestonesByProject } = require("../controllers/milestone");
const router = express.Router();

router.post("/milestone", createMilestone);
router.get("/milestones/:projectId", getMilestonesByProject);

module.exports = router; 