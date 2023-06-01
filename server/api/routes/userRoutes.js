const express = require("express");
const router = express.Router();
const { authVerifyMiddleware } = require("../middlewares/authVerifyMiddleware");
const { allDetailsValidator } = require("../middlewares/allValidators");
const {
  homeController,
  allDetailsController,
  searchFriendsController,
  fetchAllDetailsController,
  updateAllDetailsController,
} = require("../controllers/userController");

router.get("/home", authVerifyMiddleware, homeController);

router.post("/allDetails", authVerifyMiddleware, allDetailsValidator, allDetailsController);

router.get('/fetchAllDetails', authVerifyMiddleware, fetchAllDetailsController);

router.put("/updateAllDetails", authVerifyMiddleware, allDetailsValidator, updateAllDetailsController);

router.post("/searchFriends", authVerifyMiddleware, searchFriendsController);

module.exports = router;
