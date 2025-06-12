from fastapi import FastAPI, UploadFile
from fastapi.responses import JSONResponse
import whisperx               # wrapper around Whisper v3 + VAD
import torch
from pyannote.audio import Pipeline

app = FastAPI()

# 2-A  Whisper v3 ASR -------------------------------------------------
asr_model = whisperx.load_model("large-v3", device="cuda" if torch.cuda.is_available() else "cpu")

# 3-B  Speaker diarization -------------------------------------------
diar_model = Pipeline.from_pretrained("pyannote/speaker-diarization@2024.10",
                                      use_auth_token="YOUR_HF_TOKEN")

@app.post("/transcribe")
async def transcribe(file: UploadFile):
    # save to disk
    wav_path = f"/tmp/{file.filename}"
    with open(wav_path, "wb") as f:
        f.write(await file.read())

    # 2. transcription + word timestamps
    asr_out = asr_model.transcribe(wav_path, batch_size=24, return_char_alignments=False)

    # 3. diarization (RT ≈ 0.6 × audio length on GPU)
    diar = diar_model(wav_path)

    # align word segments to diarization
    result = whisperx.align(word_timestamps=asr_out["segments"],
                            diarization=diar, min_speakers=2)

    # 4. map speaker-id → role ---------------------------------------
    role_map = guess_roles(result["segments"])  # custom fn below
    for seg in result["segments"]:
        seg["role"] = role_map[seg["speaker"]]

    return JSONResponse(result["segments"])

# naive role guesser – replace with finetuned embedding CLS
def guess_roles(segments):
    """
    Heuristic: the speaker who talks the most in 1st 2 min is the Teacher.
    """
    import collections, itertools
    spans = collections.defaultdict(float)
    for s in itertools.takewhile(lambda x: x['end'] < 120, segments):
        spans[s["speaker"]] += (s["end"] - s["start"])
    teacher = max(spans, key=spans.get, default="SPEAKER_00")
    return {spk: ("Teacher" if spk == teacher else "Student") for spk in spans}
