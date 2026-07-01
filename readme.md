# 😊 Facial Expression Recognition System (FER)  
### IEEE Final Year Project | Real-Time Deep Learning Application  

![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-DeepLearning-orange.svg)
![React](https://img.shields.io/badge/React-Frontend-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-ImageProcessing-red.svg)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)

## Abstract
Facial Expression Recognition (FER) is a deep learning-based computer vision system designed to detect and classify human emotions from real-time facial images. This project uses a CNN model trained on the FER-2013 dataset and integrates FastAPI backend with React frontend for live emotion prediction.

Emotions: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral

## Objectives
- Real-time emotion detection system  
- CNN-based facial expression classification  
- FastAPI backend API integration  
- React frontend UI development  
- Improve human-computer interaction  

## System Architecture
Webcam → OpenCV Face Detection → CNN Model → FastAPI Backend → React Frontend → Emotion Display  

## Features
- Real-time webcam emotion detection  
- CNN deep learning model  
- REST API backend  
- React frontend UI  
- OpenCV face detection  
- 7 emotion classification  
- Live prediction updates  

## Technologies Used
- FastAPI (Backend)  
- React (Frontend)  
- TensorFlow / Keras (Deep Learning)  
- OpenCV (Computer Vision)  
- FER-2013 Dataset  

## Installation

### Clone Repository
git clone https://github.com/subham-oss/facial-expression-recognition.git
cd facial-expression-recognition  

### Backend Setup
cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  

Backend: http://127.0.0.1:8000  
Docs: http://127.0.0.1:8000/docs  

### Frontend Setup
cd frontend  
bun install  
bun run dev  

Frontend: http://localhost:5173  

## API Endpoint
POST /predict

Response:
{
  "emotion": "Happy",
  "confidence": 0.92
}
  
## Model Details
CNN trained on FER-2013 dataset  
7 emotion classes  
Optimized with dropout and augmentation  

## Future Scope
- Improve accuracy using ResNet/VGG  
- Deploy on cloud (Render + Vercel)  
- Mobile app integration  
- Audio emotion detection  
- Real-time optimization  

## Team
Subham Chakraborty  
Debleena Maiti  

## Conclusion
This system successfully detects human emotions in real time using deep learning and computer vision with web integration.

## License
For educational purposes only.

## Acknowledgement
If you like this project, give it a star ⭐