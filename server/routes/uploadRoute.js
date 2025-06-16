const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const File = require("../models/File");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    // Upload stream wrapped in Promise
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: file.mimetype === "application/pdf" ? "raw" : "auto",
          type: "upload", // ✅ Add this line to ensure public access
          folder: "shareit-files",
          use_filename: true,
          unique_filename: false,
          filename_override: file.originalname,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    const secureUrl = result.secure_url;
    const downloadUrl = secureUrl.replace("/upload/", "/upload/fl_attachment/");

    // Save metadata in MongoDB
    const newFile = await File.create({
      filename: file.originalname,
      sizeInBytes: file.size,
      secure_url: secureUrl,
      format: result.format,
      uuid: uuidv4(),
      expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return res.status(201).json({
      id: newFile.uuid,
      downloadLink: downloadUrl,
      previewLink: secureUrl,
      // uuid: newFile.uuid,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
