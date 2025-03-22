const express = require("express");
const {
  raiseDispute,
  sendMessage,
  resolveDispute,
} = require("../controllers/disputeController");

const router = express.Router();

router.post("/raise", raiseDispute);
router.post("/message", sendMessage);
router.post("/resolve", resolveDispute);

module.exports = router;
