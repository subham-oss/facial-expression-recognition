import { useEffect, useState } from "react";

import ConfidenceBar from "./ConfidenceBar";
import FPSCounter from "./FPSCounter";
import EmotionHistory from "./EmotionHistory";

const emoji = {
  angry: "😠",
  disgust: "🤢",
  fear: "😨",
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  surprise: "😲",
};

const EmotionCard = ({ prediction }) => {
  const [history, setHistory] = useState([]);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frames = 0;

    const interval = setInterval(() => {
      setFps(frames);
      frames = 0;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!prediction.success) return;

    setHistory((prev) => {
      const updated = [
        {
          emotion: prediction.emotion,
          confidence: prediction.confidence,
        },
        ...prev,
      ];

      return updated.slice(0, 8);
    });

    setFps((prev) => prev + 1);
  }, [prediction]);

  if (!prediction.success) {
    return (
      <div
        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        <div className="text-center">
          <div className="text-8xl">👤</div>

          <h2 className="mt-6 text-3xl font-bold text-white">
            No Face Detected
          </h2>

          <p className="mt-3 text-slate-400">
            Position your face inside the camera.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-lg">
      <div className="text-center">
        <div className="text-8xl">{emoji[prediction.emotion]}</div>

        <h2 className="mt-6 text-5xl font-bold capitalize text-white">
          {prediction.emotion}
        </h2>
      </div>

      <ConfidenceBar confidence={prediction.confidence} />

      <FPSCounter fps={fps} />

      <EmotionHistory history={history} />
    </div>
  );
};

export default EmotionCard;
