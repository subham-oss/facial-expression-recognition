const ConfidenceBar = ({ confidence }) => {
  const value = Math.max(0, Math.min(confidence || 0, 100));

  return (
    <div className="mt-6">

      <div className="mb-2 flex justify-between text-sm text-slate-400">
        <span>Confidence</span>
        <span>{value.toFixed(2)}%</span>
      </div>

      <div className="h-4 w-full overflow-hidden rounded-full bg-slate-700">

        <div
          className="h-full rounded-full bg-linear-to-r from-green-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
};

export default ConfidenceBar;