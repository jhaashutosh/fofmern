const express = require("express");
const router = express.Router();

const {
  signupController,
  verifyMail,
  loginController,
} = require("../controllers/authController");
const { signupValidator } = require("../functions/signupValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginController);

router.get("/verify", verifyMail);

module.exports = router;
