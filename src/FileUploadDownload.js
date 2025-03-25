import { useState } from "react";
import axios from "axios";

export default function FileUploadDownload() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8081/upload", formData, {
        responseType: "blob", // Ensure response is treated as a binary file
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Create download URL for the received file
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      alert("File uploaded successfully. You can download it now.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
      alert(error)
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Input The File And Wait for the Results to be Downloaded</h2>
      
      <input type="file" onChange={handleFileChange} className="mb-2" />

      <button onClick={handleUpload} className="p-2 bg-blue-500 text-white rounded-md">
        Upload
      </button>

      {downloadUrl && (
        <a href={downloadUrl} download="processed-file" className="ml-4 p-2 bg-green-500 text-white rounded-md">
          Download Processed File
        </a>
      )}
    </div>
  );
}
