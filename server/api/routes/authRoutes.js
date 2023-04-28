const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");

const { signupController, verifyMail, loginController, allDetailsController} = require("../controllers/authController");

const { signupValidator } = require("../functions/signupValidator");
const { loginValidator } = require("../functions/loginValidator");
const { allDetailsValidator } = require("../functions/allDetailsValidator");

router.post("/signup", signupValidator, signupController);

router.post("/login", loginValidator, loginController);

router.post("/allDetails", allDetailsValidator, allDetailsController);

//testing the middleware
router.get("/middleware", authVerifyMiddleware, () => {
  res.send("middleware testing");
});

router.get("/verify", verifyMail);

module.exports = router;
