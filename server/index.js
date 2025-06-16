// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const uploadRoute = require("./routes/uploadRoute");
const downloadRoute = require("./routes/downloadRoute");
const mailRoute = require("./routes/mail");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("ShareIt API is running...");
});
app.use("/api", uploadRoute);
app.use("/", downloadRoute);
app.use("/api", require("./routes/files")); // assuming the file name is files.js
app.use("/api", mailRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
