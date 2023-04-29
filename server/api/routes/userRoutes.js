const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");
const { userRegister } = require("../controllers/userController");
const { allDetailsValidator } = require("../middlewares/allDetailsValidator");

router.post(
  "/register",
  authVerifyMiddleware,
  allDetailsValidator,
  userRegister
);

module.exports = router;
