const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    sizeInBytes: Number,
    secure_url: String,
    format: String,
    uuid: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
