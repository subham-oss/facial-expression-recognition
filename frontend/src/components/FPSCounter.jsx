const FPSCounter = ({ fps }) => {
  return (
    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800 p-4">

      <p className="text-sm text-slate-400">
        Prediction Speed
      </p>

      <h2 className="mt-2 text-3xl font-bold text-green-400">
        {fps.toFixed(1)} FPS
      </h2>

    </div>
  );
};

export default FPSCounter;