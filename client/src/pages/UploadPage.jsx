// src/pages/UploadPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";
import "./upload.css";

export default function UploadPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  /* browse & upload helpers */
  const browse = () => document.getElementById("fileInput").click();

  const handleNext = async () => {
    if (!files.length) return;
    const fd = new FormData();
    files.forEach(f => fd.append("video", f));

    try {
      const res = await fetch("/api/upload", { method:"POST", body: fd });
      const json = await res.json();
      console.log("Backend returned:", json);
      navigate("/");                 // back to lessons list
    } catch (err) {
      alert("Upload failed — see console");
      console.error(err);
    }
  };

  return (
    <>
      <header className="app-bar">
        <span className="app-title">M-Powering Teachers</span>
        <div className="user-info">
          <span>Hello, Anantrao Chinta</span>
          <span className="material-icons">account_circle</span>
        </div>
      </header>

      <main className="upload-page">
        <button className="icon-link" onClick={() => navigate("/")}>
          <span className="material-icons">arrow_back</span> Upload files
        </button>

        <section className="card upload-card">
          {/* stepper */}
          <ol className="stepper">
            <li className="step active"><span className="circle">1</span><span className="label">Upload Interactions</span></li>
            <li className="step"><span className="circle">2</span><span className="label">Configure</span></li>
            <li className="step"><span className="circle">3</span><span className="label">Send to AI</span></li>
          </ol>

          <div className="upload-body">
            <h2>Upload the Classroom Interactions</h2>
            <p className="subtitle">Feel free to upload multiple files. Each file will be analyzed separately!</p>

            {/* hidden native input */}
            <input
              id="fileInput"
              type="file"
              multiple
              hidden
              accept="audio/*,video/*,.csv,application/json"
              onChange={e => setFiles([...e.target.files])}
            />

            <button className="btn-primary" onClick={browse}>SELECT FILES</button>

            <p className="file-types">
              Only Audio, Video, CSV, and JSON files are allowed.&nbsp;
              <a href="#" target="_blank" rel="noopener noreferrer">View example file format</a>
            </p>
          </div>

          {/* footer */}
          <div className="upload-footer">
            <button className="btn-primary" disabled={!files.length} onClick={handleNext}>
              NEXT
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
