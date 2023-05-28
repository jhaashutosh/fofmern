const express = require("express");
const router = express.Router();

const {
  signupController,
  checkValidEmailURL,
  loginController,
  // resendVerifyMail,
  logoutController,
  forgotPasswordController,
  setNewPasswordController,
  sendVerificationMailController,
  checkResetPasswordTokenController,
} = require("../controllers/authController");

const { signupValidator } = require("../middlewares/signupValidator");
const { loginValidator } = require("../middlewares/loginValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginValidator, loginController);

router.get("/sendVerificationMail/:id", sendVerificationMailController);

router.get("/checkValidEmailURL/:id", checkValidEmailURL);

// router.post("/resendVerify", resendVerifyMail);

router.get("/logout", logoutController);

router.post("/forgotPassword", forgotPasswordController);

router.get("/checkResetPasswordToken/:token", checkResetPasswordTokenController);

router.post("/setNewPassword/:token", setNewPasswordController);

module.exports = router;
