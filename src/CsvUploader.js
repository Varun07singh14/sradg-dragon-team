import React, { useState } from "react";
import axios from "axios";

const CsvUploader = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleUpload = async () => {
    setLoading(true);
    const jsonData = { file_path: "C:\Users\Anupam\processed_file.csv" };

    try {
      const response = await axios.post("http://localhost:8081/api/predict", jsonData, {
        headers: { "Content-Type": "application/json" },
        responseType: "blob", // Expecting a file in response
      });

      // Create a blob URL for the returned CSV file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "response_file.csv"); // Set download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-6">SMART Reconcile Testing</h1>
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg shadow-lg disabled:bg-gray-400 transition-all duration-300"
      >
        {loading ? "Processing..." : "Click here to process the input file & Download CSV"}
      </button>
    </div>
  );
};

export default CsvUploader;
