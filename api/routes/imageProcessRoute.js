const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage } = require("../utility/azureConnection");

const {
  imageProcessController,
} = require("../controllers/imageProcessController");

router.post("/image", uploadImage, imageProcessController);

module.exports = router;
