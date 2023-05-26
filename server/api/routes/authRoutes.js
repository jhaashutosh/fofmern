const express = require("express");
const router = express.Router();

const {
  signupController,
  verifyMail,
  loginController,
  // resendVerifyMail,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  sendVerificationMailController,
} = require("../controllers/authController");

const { signupValidator } = require("../middlewares/signupValidator");
const { loginValidator } = require("../middlewares/loginValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginValidator, loginController);

router.get("/sendVerificationMail/:id", sendVerificationMailController);

router.get("/verify/:id", verifyMail);

// router.post("/resendVerify", resendVerifyMail);

router.get("/logout", logoutController);

router.post("/forgotPassword", forgotPasswordController);

router.post("/resetPassword/:token", resetPasswordController);

module.exports = router;
