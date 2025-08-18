import React from "react";

const CherryTradeSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-10 md:pb-20">
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated SVG Background */}
            <svg
              className="absolute top-0 left-0 w-full h-full z-0"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
            >
              {/* Animated wave paths */}
              <path
                d="M0,400 Q300,350 600,450 T1200,400"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeOpacity="0.15"
                strokeDasharray="20,20"
                style={{ animation: "dash-animate 40s linear infinite" }}
              />
              <path
                d="M0,300 Q300,450 600,350 T1200,300"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeOpacity="0.12"
                strokeDasharray="15,25"
                style={{
                  animation: "dash-animate 30s linear infinite reverse",
                }}
              />
              <path
                d="M0,500 Q400,300 800,500 T1200,500"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeOpacity="0.08"
                strokeDasharray="10,15"
                style={{ animation: "dash-animate 50s linear infinite" }}
              />
            </svg>

            {/* Decorative shapes */}
            <div
              className="absolute top-20 left-20"
              style={{ animation: "spin-orbital 15s linear infinite" }}
            >
              <div className="w-16 h-16 bg-[var(--color-accent)] opacity-10 rounded-full"></div>
            </div>
            <div
              className="absolute bottom-40 right-20"
              style={{
                animation: "spin-orbital 20s linear infinite reverse",
              }}
            >
              <div className="w-24 h-24 bg-[var(--color-accent)] opacity-10 rounded-full"></div>
            </div>
            <div
              className="absolute top-1/2 left-1/4"
              style={{ animation: "pulse-gentle 8s ease-in-out infinite" }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                opacity="0.08"
              >
                <circle cx="50" cy="50" r="40" fill="var(--color-accent)" />
                <path
                  d="M50,10 C22.4,10 0,32.4 0,60 C0,74.6 6.4,87.8 16.5,97.2"
                  stroke="var(--color-accent)"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
            <div
              className="absolute top-1/3 right-1/4"
              style={{ animation: "pulse-gentle 6s ease-in-out infinite 1s" }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" opacity="0.1">
                <rect
                  x="10"
                  y="10"
                  width="60"
                  height="60"
                  rx="15"
                  fill="var(--color-accent)"
                />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="z-10 flex flex-col   w-full relative   ">
            {/* Title Card */}
            <div className="w-full flex lg:flex-row items-start justify-around flex-col  lg:px-44">
              <div className="flex flex-col justify-center items-start   p-8 md:p-10 relative  ">
                <h2 className="maladroit-font text-xl md:text-7xl   text-[var(--color-text-primary)] leading-tight   origin-center mb-1 text-left">
                  Community AI Bots
                </h2>
                <p className="text-left text-xl text-[var(--color-text-secondary)]">
                  Manage and Engage With Communities on Telegram
                </p>
                <button className="btn-wave-secondary mt-6 cursor-pointer">
                  Learn More
                </button>
              </div>

              <div className="w-fit px-10 my-3">
                <div className="relative rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                  <img
                    src="/phone.webp"
                    className="h-[20rem] object-contain -scale-x-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CherryTradeSection;
