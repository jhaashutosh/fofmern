const express = require("express");
const router = express.Router();

const {
  signupController,
  verifyMail,
  loginController,
  allDetailsController,
} = require("../controllers/authController");

const { signupValidator } = require("../middlewares/signupValidator");
const { loginValidator } = require("../middlewares/loginValidator");
const { allDetailsValidator } = require("../middlewares/allDetailsValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginValidator, loginController);

router.post("/allDetails", allDetailsValidator, allDetailsController);

router.get("/verify", verifyMail);

module.exports = router;
