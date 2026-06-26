const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <div>

          <h1 className="text-2xl font-bold tracking-wide">

            😊 Facial Expression Recognition

          </h1>

          <p className="mt-1 text-sm text-slate-400">

            Real-Time Emotion Detection using CNN + FastAPI + React

          </p>

        </div>

        <div className="hidden rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-3 md:block">

          <span className="font-semibold text-indigo-400">

            Version 1.0

          </span>

        </div>

      </div>

    </header>
  );
};

export default Navbar;