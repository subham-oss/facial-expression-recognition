import { useState } from "react";

import Navbar from "../components/Navbar";
import WebcamFeed from "../components/WebcamFeed";
import EmotionCard from "../components/EmotionCard";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";

const Home = () => {
  const [prediction, setPrediction] = useState({
    success: false,
    emotion: null,
    confidence: 0,
    face: null,
    image_width: 640,
    image_height: 480,
    message: "Waiting for prediction...",
  });

  const [backendOnline, setBackendOnline] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-4xl font-bold">
              Live Emotion Detection
            </h2>

            <p className="mt-2 text-slate-400">
              Detect facial expressions directly from your webcam using CNN.
            </p>
          </div>

          <StatusBadge
            prediction={prediction}
            backendOnline={backendOnline}
          />

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <WebcamFeed
            setPrediction={setPrediction}
            setBackendOnline={setBackendOnline}
          />

          <EmotionCard
            prediction={prediction}
          />

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Home;