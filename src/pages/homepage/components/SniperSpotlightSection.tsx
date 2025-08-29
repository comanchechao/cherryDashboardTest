import React, { useState } from "react";
import { Icon } from "@iconify/react";
import VideoPlayer from "../../../components/VideoPlayer";

const SniperSpotlightSection: React.FC = () => {
  const [activeTab] = useState<"manual" | "autobot">("manual");

  const handleExploreBot = () => {
    window.open("https://t.me/cherrysniperbot", "_blank");
  };

  const handleExploreAnalytics = () => {
    window.open("https://t.me/cherrytrending", "_blank");
  };

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-18">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.09) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.09) 1px, transparent 1px)`,
              backgroundSize: "70px 70px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-72 h-72 border border-[#4367c9]/18 rounded-full animate-spin-slow"
            style={{ animationDuration: "42s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-[#4367c9]/12 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "36s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-40 right-10 w-16 h-16 bg-[var(--color-accent)]/8 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-[var(--color-accent)]/6 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Connection Lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="sniperConnectionGradient"
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
            stroke="url(#sniperConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#sniperConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.7s" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16" data-spotlight-content>
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
              <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                SniperAI Bot
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            Using Trading Activity To Build Data Models For AI Robots
          </h2>

          {/* Description Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                CherryAI Bot has created 2 products for traders, a trading bot
                and an analytics bot with 815k+ combined users. The data
                gathered from the usage of these products will be used to build
                data models for AI powered robots.
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>
        </div>

        {/* Video Showcase Section */}
        <div className="mb-2" data-spotlight-video>
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            {/* Video Container */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
              {/* Desktop Video Container */}
              <div className="md:block hidden bg-[var(--color-glass)] p-4 rounded-[20px] p-2 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                <div className="relative aspect-video overflow-hidden rounded-[16px]">
                  <VideoPlayer
                    src="https://storage.cherrybot.ai/sniperRobot.mp4"
                    className="w-full h-auto max-h-[60vh] object-cover"
                    autoPlay={true}
                  />
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[28px] p-8 relative overflow-hidden transform md:hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                {/* Floating Decorative Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl maladroit-font text-[var(--color-text-primary)] mb-8 text-center">
                    Trading Data Can Supercharge The Neural Networks of Robots
                  </h3>

                  {/* Tab Content */}
                  <div className="min-h-[400px]">
                    {activeTab === "manual" && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Pattern Recognition Card */}
                        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                <Icon
                                  icon="mdi:brain"
                                  className="text-white object-contain"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                Pattern Recognition
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                Data gathered from trading activity can be used
                                to build data models that help robots recognize
                                patterns similar to humans.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Game Theory Card */}
                        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                <Icon
                                  icon="hugeicons:game-controller-03"
                                  className="text-white object-contain"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                Game Theory
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                Trading data provides excellent game theory data
                                models that AI robots can use to better predict
                                human reactions.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Behavior Recognition Card */}
                        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                <Icon
                                  icon="mdi:chart-line"
                                  className="text-white object-contain"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                Behavior Recognition
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                Data on traders can be a goldmine for behavior
                                recognition, which is essentially spotting
                                patterns in how humans act under certain
                                conditions.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex w-full items-center justify-center gap-4">
                          <button
                            onClick={handleExploreAnalytics}
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
                            <span className="btn-text">
                              Explore AI Analytics
                            </span>
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
                            <span className="btn-text">Explore SniperAI</span>
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SniperSpotlightSection;
