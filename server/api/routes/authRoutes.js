const express = require("express");
const router = express.Router();

const {
  signupController,
  verifyMail,
  loginController,
  resendVerifyMail,
  logoutController,
} = require("../controllers/authController");

const { signupValidator } = require("../middlewares/signupValidator");
const { loginValidator } = require("../middlewares/loginValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginValidator, loginController);

router.get("/verify/:id", verifyMail);

router.post("/resendVerify", resendVerifyMail);

router.get("/logout", logoutController);

module.exports = router;
