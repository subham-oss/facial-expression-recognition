const emoji = {
  angry: "😠",
  disgust: "🤢",
  fear: "😨",
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  surprise: "😲",
};

const EmotionHistory = ({ history }) => {
  return (
    <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-5">

      <h3 className="mb-4 text-lg font-semibold text-white">
        Recent Predictions
      </h3>

      {history.length === 0 ? (
        <p className="text-slate-400">
          No predictions yet.
        </p>
      ) : (
        <div className="space-y-2">

          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2"
            >
              <span className="text-xl">
                {emoji[item.emotion]}
              </span>

              <span className="capitalize text-white">
                {item.emotion}
              </span>

              <span className="text-green-400">
                {item.confidence.toFixed(1)}%
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default EmotionHistory;