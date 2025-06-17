const express = require("express");
const router = express.Router();
const File = require("../models/File");

// GET route to serve file metadata for the download page
router.get("/files/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });

    if (!file) {
      return res.status(404).json({ error: "File not found or has expired." });
    }

    // Construct the download link exactly as in upload route
    const downloadLink = file.secure_url.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.originalname)}/`
    );

    return res.status(200).json({
      ...file.toObject(),
      downloadLink,
      previewLink: file.secure_url,
    });
  } catch (err) {
    console.error("Error fetching file metadata:", err);
    return res
      .status(500)
      .json({ error: "Server error while retrieving file." });
  }
});

module.exports = router;
