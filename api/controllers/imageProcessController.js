exports.imageProcessController = async (req, res) => {
  try {
    // Access the file URL using the `url` property of the `req.file` object
    const fileUrl = req.file.url;
    console.log(fileUrl);

    res.json({ imageUrl: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload the image" });
  }
};
