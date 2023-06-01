const express = require("express");
const router = express.Router();

const {
  signupController,
  checkValidEmailURL,
  loginController,
  logoutController,
  forgotPasswordController,
  setNewPasswordController,
  sendVerificationMailController,
  checkResetPasswordTokenController,
  checkIfUserIsLoggedInController,
  websiteDetailsController,
} = require("../controllers/authController");

const {
  signupValidator,
  loginValidator,
} = require("../middlewares/allValidators");

router.get("/websiteDetails", websiteDetailsController);

router.get("/checkIfUserIsLoggedIn", checkIfUserIsLoggedInController);

router.post("/signup", signupValidator, signupController);

router.post("/login", loginValidator, loginController);

router.get("/sendVerificationMail/:id", sendVerificationMailController);

router.get("/checkValidEmailURL/:id", checkValidEmailURL);

router.get("/logout", logoutController);

router.post("/forgotPassword", forgotPasswordController);

router.get("/checkResetPasswordToken/:token", checkResetPasswordTokenController);

router.post("/setNewPassword/:token", setNewPasswordController);

module.exports = router;
