import React from "react";
import { Icon } from "@iconify/react";

interface HeroSectionProps {
  handleExploreBot: () => void;
  handleViewTrending: () => void;
  handleStartQuesting: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  handleExploreBot,
  handleViewTrending,
  handleStartQuesting,
}) => {
  return (
    <div
      className="hero_section scroll-container1 relative overflow-hidden"
      id="home"
    >
      {/* Radial Energy Field Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--color-accent)]/20 via-[var(--color-bg-secondary)]/40 to-[var(--color-bg-primary)] opacity-60"></div>

        {/* Concentric Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] border border-[var(--color-accent)]/10 rounded-full animate-spin-slow"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--color-accent)]/8 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "30s",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[var(--color-accent)]/6 rounded-full animate-spin-slow"
            style={{ animationDuration: "25s" }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-[var(--color-accent)]/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float-slow"></div>
        <div
          className="absolute bottom-40 left-1/4 w-4 h-4 bg-[var(--color-accent)]/50 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[var(--color-accent)]/35 rounded-full animate-float-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="w-full flex pt-20 lg:flex-row flex-col items-end lg:items-start h-screen relative z-10">
        <div className="w-full mx-auto">
          <div className="hero-content-wrapper flex flex-col items-center h-screen lg:h-auto mb-16 relative z-10 px-10">
            <div className="flex w-1/2 items-start justify-center flex-col px-16">
              <div className="mb-16">
                <h1 className="maladroit-font flex items-center justify-start text-5xl md:text-6xl lg:text-4xl   text-[var(--color-text-primary)] leading-tight mb-2 max-w-4xl mx-auto">
                  Cherry
                  <span className="text-[var(--color-accent)] ml-1">
                    {" "}
                    Features
                  </span>
                  <span className="block relative">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
                  </span>
                </h1>

                <p className="hero-description text-left text-sm lg:text-lg text-[var(--color-text-secondary)]/80 mb-9 max-w-3xl mx-auto leading-7">
                  Discover our comprehensive suite of tools built to transform
                  Web3 trading, community growth, and token engagement.
                </p>
              </div>

              <div className="hero-buttons mb-10 w-full flex flex-col sm:flex-row items-center justify-center gap-6 mb-9">
                <button
                  onClick={handleExploreBot}
                  className="btn-wave-primary cursor-pointer w-full"
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
                  <span className="btn-text">Community Bot</span>
                </button>

                <button
                  onClick={handleViewTrending}
                  className="btn-wave-secondary cursor-pointer w-full"
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
                        fill="currentColor"
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
                        fill="currentColor"
                        d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                      ></path>
                    </svg>
                  </span>
                  <span className="wave-overlay"></span>
                  <span className="btn-text">AI Trending</span>
                </button>
              </div>

              <div className="flex flex-wrap w-full items-center justify-center gap-6 mb-10">
                <div className="relative text-[var(--color-text-primary)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 py-3 px-6 rounded-xl flex items-center gap-2 winky-sans-font">
                  <Icon
                    icon="uil:chart"
                    width={20}
                    height={20}
                    className="text-[var(--color-accent)]"
                  />
                  <span className="text-[var(--color-accent)]">
                    Cherry Trade
                  </span>
                  <span className="absolute -top-2 -right-7 bg-[var(--color-accent)] text-white text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
