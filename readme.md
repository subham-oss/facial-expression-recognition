# 😊 Facial Expression Recognition System (FER)  
### IEEE Final Year Project | Real-Time Deep Learning Application  

![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-DeepLearning-orange.svg)
![React](https://img.shields.io/badge/React-Frontend-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-ImageProcessing-red.svg)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)

## Abstract
Here are a few improved versions you can use, depending on the style you want:


Facial Expression Recognition (FER) is a deep learning-based computer vision application that detects and classifies human emotions from real-time facial images. The system employs a Convolutional Neural Network (CNN) trained on the FER-2013 dataset and integrates a FastAPI backend with a React frontend to provide real-time emotion prediction. It recognizes seven facial expressions: **Angry, Disgust, Fear, Happy, Sad, Surprise,** and **Neutral**.


Developed a **Facial Expression Recognition (FER)** system using deep learning to identify human emotions from real-time facial images. The application utilizes a **CNN model** trained on the **FER-2013 dataset**, with a **FastAPI** backend and **React** frontend for seamless live emotion detection. The model classifies seven emotions: **Angry, Disgust, Fear, Happy, Sad, Surprise,** and **Neutral**.


Facial Expression Recognition (FER) is an AI-powered web application that performs real-time emotion recognition using computer vision and deep learning. The project leverages a **Convolutional Neural Network (CNN)** trained on the **FER-2013 dataset** to accurately classify facial expressions. Built with a **FastAPI** backend and a **React** frontend, the application provides live emotion predictions for seven categories: **Angry, Disgust, Fear, Happy, Sad, Surprise,** and **Neutral**.

This version is suitable for project documentation, GitHub, and portfolio presentations.


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