import React from "react";
import CommunityDataModels from "./CommunityDataModels";

const CommunitySection: React.FC = () => {
  const handleExploreBot = () => {
    window.open("https://t.me/cherrysniperbot", "_blank");
  };

  return (
    <div
      id="community"
      className="section_sniper_spotlight lg:py-24 relative overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.11)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(67,103,201,0.07)_0%,transparent_70%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-14 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.07) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.07) 1px, transparent 1px)`,
              backgroundSize: "75px 75px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-68 h-68 border border-[#4367c9]/14 rounded-full animate-spin-slow"
            style={{ animationDuration: "44s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-[#4367c9]/9 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "39s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/8 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-accent)]/6 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Connection Lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="managementConnectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--color-accent)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--color-accent)"
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>
          <path
            d="M50 50 Q 150 30 250 50 T 450 50"
            stroke="url(#managementConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#managementConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.7s" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Left side - Content */}
          <div
            className="w-full flex justify-center items-center"
            data-spotlight-content
          >
            <div className="spotlight-content-wrapper">
              {/* Eyebrow Badge */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
                  <span className="text-xl md:text-lg winky-sans-font text-[var(--color-accent)]">
                    Community AI
                  </span>
                </div>
              </div>
              {/* Main Title */}
              <h2 className="text-2xl md:text-4xl text-center maladroit-font text-[var(--color-text-primary)] mb-6">
                200k+ Communities Contributing Data For Digital Robots
              </h2>
              {/* Description */}
              <p className="winky-sans-font text-xl text-[var(--color-text-secondary)]/90 mb-8">
                Community AI Bots gather data from Web3 communities to build
                three different types of data models for AI powered robots.
              </p>
              {/* Info Modal */}
              <CommunityDataModels />
              {/* CTA Button */}
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={handleExploreBot}
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
                  <span className="btn-text">Explore Cherry Robot</span>
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
