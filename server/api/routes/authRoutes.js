const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");

const {
  signupController,
  verifyMail,
  loginController,
} = require("../controllers/authController");
const { signupValidator } = require("../functions/signupValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginController);

//testing the middleware
router.get("/middleware", authVerifyMiddleware, () => {
  res.send("middleware testing");
});

router.get("/verify", verifyMail);

module.exports = router;
