from fastapi import FastAPI, UploadFile, File, HTTPException
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import cv2

app = FastAPI(title="Facial Expression Recognition API")

# Load model
model = load_model("models/fer_model.keras")

# Load Haar Cascade
face_cascade = cv2.CascadeClassifier(
    "assets/haarcascade_frontalface_default.xml"
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


@app.get("/")
def home():
    return {"message": "FER API is running successfully"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image
        image = Image.open(file.file).convert("RGB")

        # Convert to OpenCV format
        image = np.array(image)

        # RGB -> BGR
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Detect face
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=5
        )

        if len(faces) == 0:
            raise HTTPException(
                status_code=400,
                detail="No face detected in the uploaded image."
            )

        # Largest face
        faces = sorted(
            faces,
            key=lambda f: f[2] * f[3],
            reverse=True
        )

        x, y, w, h = faces[0]

        face = gray[y:y+h, x:x+w]

        face = cv2.resize(face, (48, 48))

        face = face.astype("float32") / 255.0

        face = np.expand_dims(face, axis=-1)
        face = np.expand_dims(face, axis=0)

        prediction = model.predict(face, verbose=0)

        emotion_index = np.argmax(prediction)

        confidence = float(np.max(prediction) * 100)

        return {
            "emotion": emotion_labels[emotion_index],
            "confidence": round(confidence, 2)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )