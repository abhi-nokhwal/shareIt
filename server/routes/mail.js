const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send-link", async (req, res) => {
  const { sender, receiver, link } = req.body;

  if (!sender || !receiver || !link) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Configure your transporter (use your real email and app password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    await transporter.sendMail({
      from: sender,
      to: receiver,
      subject: "File Share Link",
      html: `
        <p>${sender} has shared a file with you!</p>
        <p>Click the link below to download:</p>
        <a href="${link}">${link}</a>
      `,
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
