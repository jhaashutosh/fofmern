const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");
const { allDetailsValidator } = require("../middlewares/allDetailsValidator");
const {
  allDetailsController,
  searchFriendsController,
  userInformationController,
  fetchAllDetailsController,
  updateAllDetailsController,
} = require("../controllers/userController");


router.post("/allDetails", authVerifyMiddleware, allDetailsValidator, allDetailsController);

router.get('/fetchAllDetails', authVerifyMiddleware, fetchAllDetailsController);

router.put("/updateAllDetails", authVerifyMiddleware, allDetailsValidator, updateAllDetailsController);

router.post("/searchFriends", authVerifyMiddleware, searchFriendsController);

router.get("/userInformation", authVerifyMiddleware, userInformationController);

module.exports = router;
