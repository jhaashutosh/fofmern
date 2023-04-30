const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");
const { allDetailsValidator } = require("../middlewares/allDetailsValidator");
const {
  allDetailsController,
  searchFriendsController,
} = require("../controllers/userController");

router.post(
  "/allDetails",
  authVerifyMiddleware,
  allDetailsValidator,
  allDetailsController
);

router.get("/searchFriends", searchFriendsController);

module.exports = router;
