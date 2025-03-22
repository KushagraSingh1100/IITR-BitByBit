const express = require("express");
const {
  // handleGetJobs,
  // handleGetProfile,
  // handleGetJob,
  // handleGetHome,
  // handleGetAdminPanel,
  // handleAdminLogin,
  // handleUserLogin,
  handleGetJob,
  handleRegister,
  handleCreateProject,
  handleSignIn,
  handleGetJobs,
  verifyOTP,
} = require("../controllers/users");
const router = express.Router();

router.get("/jobs", handleGetJobs);
router.get("/profile/:id");
router.get("/job/:id", handleGetJob);
router.get("/home");
router.get("/admin/panel");
router.post("/admin/login");
router.post("/verify-otp", verifyOTP);
router.post("/user/login", handleSignIn);
router.post("/create/project", handleCreateProject);
router.post("/register", handleRegister);

module.exports = router;
