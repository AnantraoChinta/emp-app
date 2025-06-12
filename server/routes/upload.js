import { spawn } from "child_process";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs/promises";

export async function mp4ToWav(mp4Path) {
  const wavPath = path.join("/tmp", `${uuid()}.wav`);
  await new Promise((res, rej) => {
    const ff = spawn("ffmpeg", [
      "-i", mp4Path,
      "-ac", "1",         // mono
      "-ar", "16000",     // 16 kHz
      "-y", wavPath,
    ]);
    ff.stderr.on("data", d => process.stderr.write(d));
    ff.on("close", code => (code ? rej(code) : res()));
  });
  return wavPath;
}

router.post("/upload", upload.single("video"), async (req, res, next) => {
    try {
      /* 1. convert MP4 → WAV  */
      const wav = await mp4ToWav(req.file.path);
  
      /* 2. send WAV to Python service */
      const { data: segments } = await axios.post(
        "http://localhost:8000/transcribe",
        fs.createReadStream(wav),                     // stream, not buffer
        { headers: { "Content-Type": "audio/wav" } }
      );
  
      /* 3. save to DB or just return JSON */
      res.json(segments);                          // [{start,end,text,role}, …]
    } catch (err) {
      next(err);
    }
  });
  