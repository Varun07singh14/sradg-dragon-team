import { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to backend
      const uploadResponse = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (uploadResponse.data.filePath) {
        setFilePath(uploadResponse.data.filePath);
        console.log('file path : ', filePath)
        alert(filePath)
        // Send file path to another API
        // await axios.post("/process-file", {
        //   filePath: uploadResponse.data.filePath,
        // });

        alert("File uploaded and processed successfully!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed!");
      alert(error)
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Upload
      </button>
      {filePath && <p>Uploaded File Path: {filePath}</p>}
    </div>
  );
}
