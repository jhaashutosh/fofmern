const express = require("express");
const router = express.Router();
const {
  signupController,
  verifyMail,
  loginController,
} = require("../controllers/authController");

router.post("/signup", signupController);

// router.get("/login", (req, res) => {
//   res.status(200);
//   res.send("This is success");

// });

router.post("/login",loginController);


router.get("/verify", verifyMail);

module.exports = router;
