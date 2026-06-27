import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import api from "../services/api";

const WebcamFeed = ({ setPrediction }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Prevent multiple requests running simultaneously
  const isPredicting = useRef(false);

  const drawFace = (data) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const video = webcamRef.current?.video;

    if (!video || video.videoWidth === 0) return;

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
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "#00ff00";
    ctx.font = "18px Arial";

    ctx.fillText(
      `${data.emotion} (${data.confidence}%)`,
      x,
      Math.max(20, y - 8)
    );
  };

  const capture = async () => {
    if (isPredicting.current) return;

    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    isPredicting.current = true;

    try {
      const blob = await fetch(imageSrc).then((r) => r.blob());

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await api.post("/predict", formData);

      setPrediction(res.data);

      drawFace(res.data);
    } catch (err) {
      console.error("Prediction Error:", err);
    } finally {
      isPredicting.current = false;
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loop = async () => {
      while (!cancelled) {
        await capture();

        // Small delay before next prediction
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    };

    loop();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-5">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          screenshotFormat="image/jpeg"
          screenshotQuality={0.7}
          videoConstraints={{
            width: 320,
            height: 240,
            facingMode: "user",
          }}
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