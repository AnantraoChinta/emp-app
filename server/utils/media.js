import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { randomUUID } from "node:crypto";

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Convert an MP4 (or any video) to 16-kHz mono WAV that the speech
 * backend expects. Returns the WAV path.
 */
export async function mp4ToWav(inputPath) {
  const outPath = join(dirname(inputPath), `${randomUUID()}.wav`);

  await new Promise((res, rej) => {
    ffmpeg(inputPath)
      .noVideo()
      .audioChannels(1)
      .audioFrequency(16_000)
      .format("wav")
      .on("error", rej)
      .on("end", res)
      .save(outPath);
  });

  // optional: remove the original upload to save space
  await unlink(inputPath).catch(() => {});

  return outPath;
}
