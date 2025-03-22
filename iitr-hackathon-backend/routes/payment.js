const express = require("express");
const { createPaymentLink ,approveMilestone,withdrawPayment} = require("../controllers/payment");

const router = express.Router();


router.post("/deposit", createPaymentLink);


router.post("/milestone/approve",approveMilestone);


router.post("/withdraw",withdrawPayment);

module.exports = router;
