import React from "react";

const MarketForcast: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 p-8">
        <img
          src="/forcastBG.webp"
          alt="Market Forecast Background"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="maladroit-font text-2xl md:text-4xl text-[var(--color-text-primary)] leading-tight mb-4">
              Digital Robotics Offers a $1.8 Trillion Opportunity
            </h2>
            <p className="winky-sans-font text-base md:text-lg text-[var(--color-text-secondary)]/90 leading-relaxed">
              The global robotics market is projected to grow from $110 billion
              in 2024 to nearly $1.8 trillion by 2034 at a 31.85% CAGR. Demand
              is rising in manufacturing, logistics, and healthcare. Falling
              costs and smarter AI are making robots more capable and
              transformative.
            </p>{" "}
            <button
              onClick={() => {
                window.open("/robotics");
              }}
              className="btn-wave-primary cursor-pointer flex items-center mt-4 gap-2 text-xl"
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
              <span className="btn-text">Learn More</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>{" "}
          </div>

          {/* Right Visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xl rounded-[20px] p-4 bg-[var(--color-bg-secondary)]/40 border border-[var(--color-accent)]/20">
              <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_0_24px_rgba(67,103,201,0.25)]"></div>
              <div className="aspect-[16/9] flex items-center justify-center rounded-[12px]  ">
                <img
                  src="/chart.webp"
                  alt="Market Forecast Chart"
                  className="w-full h-auto object-contain rounded-[12px]"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketForcast;
