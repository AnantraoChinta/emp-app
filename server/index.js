// server/index.js
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import { mp4ToWav } from "./utils/media.js";   // your ffmpeg helper
import { connect } from "./db.js";             // if you use Mongo/Postgres

const upload = multer({ dest: "uploads/" });
const app = express();
app.use(cors());
app.use(express.json());

/* ───────── GET  /api/lessons ───────── */
app.get("/api/lessons", async (_req, res) => {
  const db  = await connect();
  const out = await db.collection("lessons").find().toArray();
  res.json(out);
});

/* ───────── POST /api/upload ───────── */
app.post("/api/upload", upload.single("video"), async (req, res, next) => {
  try {
    const wavPath = await mp4ToWav(req.file.path);

    const { data: segments } = await axios.post(
      "http://localhost:8000/transcribe",
      fs.createReadStream(wavPath),
      { headers: { "Content-Type": "audio/wav" } }
    );

    const db  = await connect();
    const doc = {
      title:   req.file.originalname,
      assets:  `1 asset / ${(req.file.size / 1024).toFixed(1)} kB`,
      analysis:"Ready",
      created: new Date(),
      transcript: segments,
    };
    const { insertedId } = await db.collection("lessons").insertOne(doc);
    res.json({ id: insertedId, ...doc });
  } catch (e) { next(e); }
});

app.listen(3001, () => console.log("API on :3001"));