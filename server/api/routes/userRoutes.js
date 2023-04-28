const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");
const { userRegister } = require("../controllers/userController");

router.post("/register", authVerifyMiddleware, userRegister);

module.exports = router;
