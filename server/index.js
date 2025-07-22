// server/index.js
import "dotenv/config";
import FormData from "form-data";
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import { mp4ToWav } from "./utils/media.js";   // your ffmpeg helper
import { connect } from "./db.js";             // if you use Mongo/Postgres

const upload = multer({ dest: "uploads/" });  
const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API on :${PORT}`));

app.use(cors());
app.use(express.json());

/* ───────── GET  /api/lessons ───────── */
app.get("/api/lessons", async (_req, res) => {
  const db  = await connect();
  const out = await db.collection("lessons").find();
  console.log(out)
  res.json(out);
});

/* ───────── POST /api/upload ───────── */
app.post("/api/upload", upload.single("video"), async (req, res, next) => {
  try {
    const wavPath = await mp4ToWav(req.file.path);

    /* --- send multipart/form-data -------------------- */
    const form = new FormData();
    form.append("file", fs.createReadStream(wavPath), "audio.wav");



    const { data: segments } = await axios.post(
      "http://localhost:8000/transcribe",
      form,
      { headers: form.getHeaders() }           // « correct boundary
    );
    
    console.log("IT REACHED PUSH PART");
    const doc = {
      id: Date.now(),
      title: req.file.originalname,
      assets: `1 asset / ${(req.file.size/1024).toFixed(1)} kB`,
      analysis: "Ready",
      created: new Date().toISOString().slice(0,10),
      transcript: segments,
    };
    await db.collection("lessons").insertOne(doc);              // in-memory stub
    res.json(doc);
  } 
  catch (err) {
    console.error("Upload no working:", err.message);
    res.status(500).json({ error: err.message });
  }

});