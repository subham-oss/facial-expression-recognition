import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import api from "../services/api";

const WebcamFeed = ({ setPrediction }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const capture = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then((r) => r.blob());

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const res = await api.post("/predict", formData);

      setPrediction(res.data);

      drawFace(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const drawFace = (data) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const video = webcamRef.current.video;

    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!data.success || !data.face) return;

    const scaleX = canvas.width / data.image_width;
    const scaleY = canvas.height / data.image_height;

    const x = data.face.x * scaleX;
    const y = data.face.y * scaleY;
    const w = data.face.w * scaleX;
    const h = data.face.h * scaleY;

    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 4;

    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "#00ff00";
    ctx.font = "22px Arial";

    ctx.fillText(
      `${data.emotion} (${data.confidence}%)`,
      x,
      y - 10
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-5">

      <div className="relative">

        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="rounded-lg w-full"
        />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />

      </div>

    </div>
  );
};

export default WebcamFeed;