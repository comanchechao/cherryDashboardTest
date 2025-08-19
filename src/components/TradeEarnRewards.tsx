import React from "react";
import VideoPlayer from "./VideoPlayer";

const TradeEarnRewards: React.FC = () => {
  return (
    <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
      {/* Floating Background Elements */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>
      <div className="absolute top-1/2 -left-16 w-20 h-20 bg-[var(--color-accent)]/15 rounded-full animate-pulse"></div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="rewardPattern"
              patternUnits="userSpaceOnUse"
              width="60"
              height="60"
              patternTransform="rotate(15)"
            >
              <circle cx="30" cy="30" r="2" fill="var(--color-accent)" />
              <path
                d="M15,15 L45,45 M45,15 L15,45"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rewardPattern)" />
        </svg>

        {/* Floating reward icons */}
        <div
          className="absolute top-20 left-10 opacity-10"
          style={{
            animation: "float-slow 6s ease-in-out infinite",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="var(--color-accent)"
          >
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
          </svg>
        </div>

        <div
          className="absolute bottom-32 right-16 opacity-10"
          style={{
            animation: "float-slow 8s ease-in-out infinite 2s",
          }}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="var(--color-accent)"
          >
            <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
          </svg>
        </div>

        <div
          className="absolute top-1/2 left-20 opacity-8"
          style={{
            animation: "pulse-gentle 10s ease-in-out infinite 1s",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="var(--color-accent)"
          >
            <path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Layout - Left Text/Button, Right Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Side - Text and Button */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="maladroit-font text-4xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
                Trade, Train Data Models and Earn
              </h2>
              <p className="winky-sans-font text-lg text-[var(--color-text-secondary)] leading-relaxed">
                Users of the manual version of the trading bot help CherryAI
                build data models for digital robots specializing in trading.
              </p>{" "}
              <p className="winky-sans-font text-lg text-[var(--color-text-secondary)] leading-relaxed">
                Users of the manual version can earn points from their trading
                activity which they can use for rewards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className=" btn-wave-primary cursor-pointer ">
                <span>Start Trading Now</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
                </svg>
              </button>
              <button className="btn-wave-secondary cursor-pointer">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[var(--color-glass)] rounded-2xl border-2 border-[var(--color-accent)] shadow-[6px_6px_0px_rgba(67,103,201,0.3)] p-3 transform hover:rotate-1 transition-all duration-300 max-w-3xl w-full">
              <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-[var(--color-accent)]">
                <VideoPlayer
                  src="https://storage.cherrybot.ai/SniperEarn.mp4"
                  className="w-full h-full object-cover"
                  autoPlay={true}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
      </div>
    </div>
  );
};

export default TradeEarnRewards;
