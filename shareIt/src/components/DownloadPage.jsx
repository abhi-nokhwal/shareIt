import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const DownloadPage = () => {
  const { uuid } = useParams();
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });

    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#f9f9f9" : "#121212";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    const fetchFile = async () => {
      try {
        const res = await axios.get(
          `https://shareit-1-ppkm.onrender.com/api/files/${uuid}`
        );
        setFileData(res.data);
      } catch (err) {
        setError("⚠️ File not found or expired.");
      }
    };
    fetchFile();
  }, [uuid, darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Inline styles for base layout
  const containerStyle = {
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: darkMode ? "#121212" : "#fff",
    color: darkMode ? "#f9f9f9" : "#121212",
  };

  const buttonStyle = {
    margin: "10px 0",
    padding: "12px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "100%",
    wordBreak: "break-word",
    boxSizing: "border-box",
    transition: "background 0.2s",
  };

  const responsiveText = {
    textAlign: "center",
    maxWidth: "98vw",
    wordBreak: "break-word",
    fontSize: "1.1rem",
  };

  const fileBoxStyle = {
    ...responsiveText,
    marginTop: "20px",
    padding: "18px",
    borderRadius: "12px",
    background: darkMode ? "#232323" : "#f7f7f7",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    width: "100%",
    maxWidth: "440px",
    boxSizing: "border-box",
  };

  const previewButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    marginRight: "10px",
    color: "#fff",
  };

  const downloadButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    color: "#fff",
  };

  // Responsive styles using a style tag for media queries
  const responsiveCss = `
    @media (max-width: 600px) {
      .file-box {
        max-width: 98vw !important;
        padding: 10px !important;
        font-size: 0.98rem !important;
      }
      .responsive-text {
        font-size: 1rem !important;
      }
      .download-btn, .preview-btn {
        font-size: 0.98rem !important;
        padding: 10px 8px !important;
      }
    }
    @media (min-width: 601px) and (max-width: 900px) {
      .file-box {
        max-width: 90vw !important;
        padding: 14px !important;
        font-size: 1.05rem !important;
      }
      .responsive-text {
        font-size: 1.08rem !important;
      }
      .download-btn, .preview-btn {
        font-size: 1.05rem !important;
        padding: 12px 14px !important;
      }
    }
    @media (min-width: 901px) {
      .file-box {
        max-width: 440px !important;
        font-size: 1.1rem !important;
      }
      .responsive-text {
        font-size: 1.1rem !important;
      }
      .download-btn, .preview-btn {
        font-size: 1.1rem !important;
        padding: 12px 20px !important;
      }
    }
  `;

  if (error)
    return (
      <div style={{ ...containerStyle, ...responsiveText }}>
        <style>{responsiveCss}</style>
        <p style={{ color: "red", fontSize: "18px" }}>{error}</p>
      </div>
    );

  return fileData ? (
    <div style={containerStyle}>
      <style>{responsiveCss}</style>
      <div style={{ alignSelf: "flex-end" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            ...buttonStyle,
            background: "#333",
            color: "#fff",
            fontSize: "1.2rem",
            width: "auto",
            maxWidth: "unset",
          }}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div
        data-aos="fade-down"
        className="responsive-text"
        style={responsiveText}>
        <h2 style={{ fontSize: "1.5rem", margin: "10px 0" }}>
          📦 File Details
        </h2>
        <p style={{ fontSize: "1rem" }}>
          Here you can preview or download the file securely.
        </p>
      </div>

      <div data-aos="fade-up" className="file-box" style={fileBoxStyle}>
        <p>
          <strong>Filename:</strong> {fileData.filename}
        </p>
        <p>
          <strong>Size:</strong> {(fileData.sizeInBytes / 1024).toFixed(2)} KB
        </p>

        {fileData.filename.toLowerCase().endsWith(".pdf") ? (
          <div
            style={{
              marginBottom: "15px",
              //   marginLeft: "10px",
              color: "#888",
              fontSize: "1rem",
            }}>
            📄 PDF preview not available.
            <br />
            Please use the download button below.
          </div>
        ) : (
          <a
            href={fileData.previewLink}
            target="_blank"
            rel="noreferrer"
            className="preview-btn"
            style={previewButtonStyle}>
            🔍 Preview File
          </a>
        )}

        <a
          href={`https://shareit-1-ppkm.onrender.com/download/${uuid}`}
          target="_blank"
          rel="noreferrer"
          className="download-btn"
          style={downloadButtonStyle}>
          ⬇️ Download
        </a>
      </div>
    </div>
  ) : (
    <p style={{ textAlign: "center", marginTop: "50px" }}>Loading file...</p>
  );
};

export default DownloadPage;
