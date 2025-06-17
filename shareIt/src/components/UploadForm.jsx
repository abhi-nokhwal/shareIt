import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [previewLink, setPreviewLink] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Mail form states
  const [showMailBox, setShowMailBox] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [mailStatus, setMailStatus] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#f9f9f9";
    document.body.style.color = darkMode ? "#f9f9f9" : "#121212";
  }, [darkMode]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");
      setPreviewLink("");
      setDownloadLink("");
      setShareLink("");
      setShowMailBox(false);
      setMailStatus("");
      const res = await axios.post(
        "https://shareit-1-ppkm.onrender.com/api/upload",
        formData
      );
      setPreviewLink(res.data.previewLink);
      setDownloadLink(res.data.downloadLink);
      const FRONTEND_BASE_URL = "https://share-it-mu.vercel.app";

      setShareLink(`${FRONTEND_BASE_URL}/download/${res.data.id}`);
      setMessage("✅ File uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setMessage("✅ Shareable link copied to clipboard!");
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Responsive and dark mode styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: darkMode ? "#232323" : "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
      color: darkMode ? "#f9f9f9" : "#121212",
      transition: "background 0.3s, color 0.3s",
      position: "relative",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "24px",
      color: darkMode ? "#fff" : "#333",
      textAlign: "center",
    },
    fileInput: {
      width: "100%",
      marginBottom: "15px",
      background: darkMode ? "#232323" : "#fff",
      color: darkMode ? "#f9f9f9" : "#121212",
      border: "1px solid #ccc",
      borderRadius: "6px",
      padding: "8px",
      transition: "background 0.3s, color 0.3s",
    },
    uploadButton: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "10px",
    },
    message: {
      marginTop: "10px",
      fontWeight: "bold",
      color: darkMode ? "#f9f9f9" : "#444",
      textAlign: "center",
    },
    section: {
      marginTop: "30px",
      textAlign: "left",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: darkMode ? "#fff" : "#333",
    },
    link: {
      color: "#007BFF",
      textDecoration: "underline",
      wordWrap: "break-word",
      fontSize: "14px",
      display: "block",
      marginBottom: "8px",
    },
    downloadButton: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "6px",
      marginTop: "5px",
      fontWeight: "bold",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
    },
    copyButton: {
      marginTop: "10px",
      padding: "8px 16px",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    toggleButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: darkMode ? "#f9f9f9" : "#232323",
      color: darkMode ? "#232323" : "#f9f9f9",
      border: "none",
      borderRadius: "50%",
      width: "38px",
      height: "38px",
      fontSize: "1.3rem",
      cursor: "pointer",
      transition: "background 0.3s, color 0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  // Responsive CSS with media queries
  const responsiveCss = `
    @media (max-width: 600px) {
      .upload-container {
        max-width: 98vw !important;
        padding: 10px !important;
      }
      .upload-heading {
        font-size: 1.2rem !important;
      }
      .upload-section {
        font-size: 1rem !important;
      }
      .upload-download-btn, .upload-copy-btn {
        font-size: 0.98rem !important;
        padding: 10px 8px !important;
      }
    }
    @media (min-width: 601px) and (max-width: 900px) {
      .upload-container {
        max-width: 90vw !important;
        padding: 14px !important;
      }
      .upload-heading {
        font-size: 1.4rem !important;
      }
      .upload-section {
        font-size: 1.08rem !important;
      }
      .upload-download-btn, .upload-copy-btn {
        font-size: 1.05rem !important;
        padding: 12px 14px !important;
      }
    }
    @media (min-width: 901px) {
      .upload-container {
        max-width: 600px !important;
      }
      .upload-heading {
        font-size: 1.5rem !important;
      }
      .upload-section {
        font-size: 1.1rem !important;
      }
      .upload-download-btn, .upload-copy-btn {
        font-size: 1.1rem !important;
        padding: 12px 20px !important;
      }
    }
  `;

  return (
    <div className="upload-container" style={styles.container}>
      <style>{responsiveCss}</style>
      <button
        onClick={toggleDarkMode}
        style={styles.toggleButton}
        aria-label="Toggle dark mode"
        title="Toggle dark/light mode">
        {darkMode ? "☀️" : "🌙"}
      </button>
      <h2 className="upload-heading" style={styles.heading}>
        📤 Upload a File
      </h2>
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
        style={styles.fileInput}
        aria-label="Select file"
      />
      <button
        onClick={handleUpload}
        style={styles.uploadButton}
        disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p style={styles.message}>{message}</p>}
      {previewLink && (
        <div className="upload-section" style={styles.section}>
          <p style={styles.label}>🔍 Preview:</p>
          {file && file.type === "application/pdf" ? (
            <div style={{ color: "#888", marginBottom: "10px" }}>
              📄 PDF preview not available. Please use the download button
              below.
            </div>
          ) : (
            <a
              href={previewLink}
              target="_blank"
              rel="noreferrer"
              style={styles.link}>
              Open File in New Tab
            </a>
          )}
        </div>
      )}
      {downloadLink && (
        <div className="upload-section" style={styles.section}>
          <p style={styles.label}>⬇️ Direct Download:</p>
          <a
            href={downloadLink}
            className="upload-download-btn"
            style={styles.downloadButton}
            target="_blank"
            rel="noreferrer">
            Download File
          </a>
        </div>
      )}
      {shareLink && (
        <div className="upload-section" style={styles.section}>
          <p style={styles.label}>🔗 Shareable Page:</p>
          <a href={shareLink} style={styles.link}>
            {shareLink}
          </a>
          <br />
          <button
            onClick={handleCopy}
            className="upload-copy-btn"
            style={styles.copyButton}>
            📋 Copy Link
          </button>
          <button
            onClick={() => setShowMailBox((prev) => !prev)}
            className="upload-copy-btn"
            style={{
              ...styles.copyButton,
              backgroundColor: "#007BFF",
              marginLeft: 8,
            }}>
            📧 Mail Link
          </button>
          {showMailBox && (
            <form
              style={{
                marginTop: 10,
                background: darkMode ? "#232323" : "#f1f1f1",
                padding: 12,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxWidth: 350,
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                setMailStatus("Sending...");
                try {
                  await axios.post(
                    "https://shareit-1-ppkm.onrender.com/api/send-link",
                    {
                      sender: senderEmail,
                      receiver: receiverEmail,
                      link: shareLink,
                    }
                  );
                  setMailStatus("✅ Email sent!");
                } catch {
                  setMailStatus("❌ Failed to send email.");
                }
              }}>
              <input
                type="email"
                placeholder="Your Email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  background: darkMode ? "#232323" : "#fff",
                  color: darkMode ? "#f9f9f9" : "#121212",
                }}
              />
              <input
                type="email"
                placeholder="Friend's Email"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                required
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  background: darkMode ? "#232323" : "#fff",
                  color: darkMode ? "#f9f9f9" : "#121212",
                }}
              />
              <button
                type="submit"
                style={{
                  ...styles.copyButton,
                  backgroundColor: "#28a745",
                  marginTop: 0,
                }}>
                Send
              </button>
              {mailStatus && (
                <div style={{ marginTop: 8, fontWeight: "bold" }}>
                  {mailStatus}
                </div>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
