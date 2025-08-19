import React from "react";
import "../css/cherry.css";
import "../css/hero-animations.css";
import "../css/cherryWebApp.css";

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--color-accent)]/15 via-[var(--color-bg-secondary)]/30 to-[var(--color-bg-primary)]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-[700px] h-[700px] border border-[var(--color-accent)]/12 rounded-full animate-spin-slow"
            style={{ animationDuration: "38s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-[var(--color-accent)]/10 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          ></div>
        </div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-[var(--color-accent)]/15 rounded-full animate-float"></div>
        <div
          className="absolute bottom-28 right-24 w-12 h-12 bg-[var(--color-accent)]/12 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-8">
        <h1 className="maladroit-font text-4xl md:text-6xl text-[var(--color-text-primary)] mb-4">
          Auto Mode
        </h1>
        <p className="winky-sans-font text-lg md:text-2xl text-[var(--color-text-secondary)]/90 mb-8">
          Coming Soon
        </p>

        <div className="inline-block">
          <a
            href="/"
            className="btn-wave-primary cursor-pointer flex items-center gap-3"
          >
            <span className="wave-bg"></span>
            <span className="wave-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-full opacity-100 object-stretch"
                viewBox="0 0 487 487"
              >
                <path
                  fillOpacity=".1"
                  fillRule="nonzero"
                  fill="#FFF"
                  d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                ></path>
              </svg>
            </span>
            <span className="wave-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="object-cover w-full h-full"
                viewBox="0 0 487 487"
              >
                <path
                  fillOpacity=".1"
                  fillRule="nonzero"
                  fill="#FFF"
                  d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                ></path>
              </svg>
            </span>
            <span className="wave-overlay"></span>
            <span className="btn-text text-lg">Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
