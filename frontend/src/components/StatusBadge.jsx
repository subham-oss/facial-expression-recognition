const StatusBadge = ({ prediction }) => {

  let color = "bg-yellow-500";
  let text = "Waiting";

  if (prediction?.success) {
    color = "bg-green-500";
    text = "Detecting";
  }

  if (
    prediction &&
    prediction.success === false &&
    prediction.message === "No face detected"
  ) {
    color = "bg-orange-500";
    text = "No Face";
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4">

      <div
        className={`h-3 w-3 rounded-full ${color} animate-pulse`}
      />

      <span className="font-medium text-white">

        {text}

      </span>

    </div>
  );
};

export default StatusBadge;