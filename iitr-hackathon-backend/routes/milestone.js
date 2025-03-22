const express = require("express");
const { createMilestone } = require("../controllers/milestone");
const router = express.Router();

router.post("/milestone", createMilestone);
module.exports = router; 