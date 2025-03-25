import React, { useState } from "react";
import axios from "axios";

const FilePathUploaderNew = () => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit1 = async () => {
    const jsonData = {
        file_path: inputValue,
        key_columns: ["Company","Account","AU","Currency"], 
        criteria_columns: ["GL Balance","IHub Balance"], 
        derived_columns: ["Balance Difference"], 
        historic_columns: ["Account","Secondary Account","Primary Account"], 
        date_columns: ["As of Date"],
        usecase_id: "IHub"
    };

    try {
      const response = await axios.post("http://localhost:8081/api/predict", jsonData, 
      {
        responseType: "blob",
        headers: { "Content-Type": "application/json" },
      });
      const blobUrl = URL.createObjectURL(response.data);
      setDownloadUrl(blobUrl);
      setMessage("File received successfully! Click below to download.");
    } // Create a URL for the received file
    catch (error) {
    console.error("Error fetching file:", error);
    setMessage("Failed to fetch file.");
  }
  };

  const handleSubmit2 = async () => {
    const jsonData = {
        file_path: inputValue,
        key_columns: ["TRADEID"], 
        criteria_columns: ["INVENTORY","CUSIP","TRADE_DATE","SETTLE_DATE","BUY_SELL","PRICE"],
        historic_columns: ["INVENTORY","CUSIP"], 
        date_columns: ["RECONDATE"],
        usecase_id: "CATALYST"
    };

    try {
      const response = await axios.post("http://localhost:8081/api/predict", jsonData, 
      {
        responseType: "blob",
        headers: { "Content-Type": "application/json" },
      });
      const blobUrl = URL.createObjectURL(response.data);
      setDownloadUrl(blobUrl);
      setMessage("File received successfully! Click below to download.");
    } // Create a URL for the received file
    catch (error) {
    console.error("Error fetching file:", error);
    setMessage("Failed to fetch file.");
  }
  };

  return (
    <div>
      <h2>Enter the File Path</h2>
      <input
        type="text"
        placeholder="Enter value"
        value={inputValue}
        onChange={handleChange}
      />
      <br /><br />
      <button onClick={() => handleSubmit1()}>
        Send Data 1
      </button>
      <button onClick={() => handleSubmit2()}>
        Send Data 2
      </button>
      {message && <p>{message}</p>}

      {downloadUrl && (
        <a href={downloadUrl} download="received_file">
          <button>Download File</button>
        </a>
      )}
    </div>
  );
};

export default FilePathUploaderNew;
