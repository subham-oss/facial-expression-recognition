from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os
import traceback
import time
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Facial Expression Recognition API")

FRONTEND_URL = os.getenv("FRONTEND_URL")
MODEL_PATH = os.getenv("MODEL_PATH")
CASCADE_PATH = os.getenv("CASCADE_PATH")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

emotion_labels = [
    "angry",
    "disgust",
    "fear",
    "happy",
    "neutral",
    "sad",
    "surprise"
]

model = None
face_cascade = None


@app.on_event("startup")
def startup():
    global model, face_cascade

    print("Loading model...")
    model = load_model(MODEL_PATH)

    print("Loading Haar Cascade...")
    face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

    if face_cascade.empty():
        raise RuntimeError("Failed to load Haar Cascade.")

    print("Backend ready.")


@app.get("/")
def home():
    return {"message": "FER API is running successfully"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    total_start = time.perf_counter()

    try:
        # Validate image
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="Uploaded file must be an image."
            )

        # -----------------------------
        # Decode image (faster than PIL)
        # -----------------------------
        decode_start = time.perf_counter()

        contents = await file.read()

        np_img = np.frombuffer(contents, np.uint8)

        image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if image is None:
            raise HTTPException(
                status_code=400,
                detail="Invalid image."
            )

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        print(f"Decode Time: {time.perf_counter()-decode_start:.3f}s")

        # -----------------------------
        # Face Detection
        # -----------------------------
        detect_start = time.perf_counter()

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(60, 60)
        )

        print(f"Face Detection: {time.perf_counter()-detect_start:.3f}s")

        if len(faces) == 0:
            return {
                "success": False,
                "emotion": None,
                "confidence": 0,
                "face": None,
                "image_width": int(image.shape[1]),
                "image_height": int(image.shape[0]),
                "message": "No face detected"
            }

        x, y, w, h = max(faces, key=lambda f: f[2] * f[3])

        # -----------------------------
        # Preprocessing
        # -----------------------------
        preprocess_start = time.perf_counter()

        face = gray[y:y+h, x:x+w]
        face = cv2.resize(face, (48, 48))
        face = face.astype(np.float32) / 255.0
        face = np.expand_dims(face, axis=(0, -1))

        print(f"Preprocessing: {time.perf_counter()-preprocess_start:.3f}s")

        # -----------------------------
        # Prediction
        # -----------------------------
        predict_start = time.perf_counter()

        prediction = model.predict(face, verbose=0)

        print(f"Prediction: {time.perf_counter()-predict_start:.3f}s")

        emotion_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction) * 100)

        print(f"Total Time: {time.perf_counter()-total_start:.3f}s")

        return {
            "success": True,
            "emotion": emotion_labels[emotion_index],
            "confidence": round(confidence, 2),
            "face": {
                "x": int(x),
                "y": int(y),
                "w": int(w),
                "h": int(h)
            },
            "image_width": int(image.shape[1]),
            "image_height": int(image.shape[0])
        }

    except HTTPException:
        raise

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )