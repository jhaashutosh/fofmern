const express = require("express");
const router = express.Router();

const {signupController,verifyMail,loginController} = require("../controllers/authController");

router.post("/signup", signupController);

router.post("/login",loginController);

router.get("/verify", verifyMail);

module.exports = router;
