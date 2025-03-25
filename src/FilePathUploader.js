import React, { useState } from "react";
import axios from "axios";

const FilePathUploader = () => {
  const [filePath, setFilePath] = useState("");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setFilePath(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!filePath) {
      setMessage("Please enter a file path.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/predict", // Replace with actual API endpoint
        { filePath }, // JSON payload
        {
          responseType: "blob", // Important to handle file response
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Create a URL for the received file
      const blobUrl = URL.createObjectURL(response.data);
      setDownloadUrl(blobUrl);
      setMessage("File received successfully! Click below to download.");
    } catch (error) {
      console.error("Error fetching file:", error);
      setMessage("Failed to fetch file.");
    }
  };

  return (
    <div>
      <h2>Send File Path & Receive File</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter File Path:</label>
        <input
          type="text"
          value={filePath}
          onChange={handleInputChange}
          placeholder="e.g., /uploads/myfile.pdf"
          required
        />
        <button type="submit">Send</button>
      </form>

      {message && <p>{message}</p>}

      {downloadUrl && (
        <a href={downloadUrl} download="received_file">
          <button>Download File</button>
        </a>
      )}
    </div>
  );
};

export default FilePathUploader;
