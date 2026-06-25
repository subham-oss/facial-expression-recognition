from fastapi import FastAPI

app = FastAPI(title="Facial Expression Recognition API")


@app.get("/")
def home():
    return {
        "message": "FER API is running successfully"
    }