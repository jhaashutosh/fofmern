const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");
const { allDetailsValidator } = require("../middlewares/allDetailsValidator");
const {
  allDetailsController,
  searchFriendsController,
  userInformationController,
} = require("../controllers/userController");


router.post("/allDetails", authVerifyMiddleware, allDetailsValidator, allDetailsController);
// router.post("/searchFriends", authVerifyMiddleware, searchFriendsController);
router.post("/searchFriends", searchFriendsController);
router.get("/userInformation", authVerifyMiddleware, userInformationController);

module.exports = router;
