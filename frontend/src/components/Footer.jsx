const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-700 py-6">

      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} Facial Expression Recognition
          </p>

          <p>
            Built with React • FastAPI • TensorFlow • OpenCV
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;