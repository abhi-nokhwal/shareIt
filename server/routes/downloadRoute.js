const express = require("express");
const File = require("../models/File");
const router = express.Router();

router.get("/download/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const file = await File.findOne({ uuid });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Check for expiration
    if (Date.now() > file.expiresAt) {
      return res.status(410).json({ error: "File has expired" });
    }

    // Create forced download URL
    const downloadUrl = file.secure_url.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.originalname)}/`
    );

    // Optional: cache headers
    res.set({
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    });

    return res.redirect(downloadUrl);
  } catch (err) {
    console.error("Download error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
