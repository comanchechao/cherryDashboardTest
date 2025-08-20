import React from "react";
import { Icon } from "@iconify/react";

const CherrySniperSection: React.FC = () => {
  const handleSnipeNow = () => {
    window.open("https://t.me/cherrySniperBot", "_blank");
  };

  return (
    <div className="section_sniper_spotlight pt-24 relative overflow-hidden">
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
            Fastest Trade Executions And AI Powered Trading
          </h2>

          {/* Description Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                SniperAI Bot is a digital robot that offers traders and snipers
                with 2 modes: Manual and Autobot mode. Manual is a classic
                Telegram based trading bot. Autobot mode offers traders with a
                Telegram based chat robot that you can give details and
                parameters for trading tokens and it will use automatically
                begin trading or even yield farming based on your parameters.
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full p-6">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="relative z-10 text-center">
                <h3 className="text-2xl mb-4 maladroit-font text-[var(--color-text-primary)]">
                  Instant Swap Execution
                </h3>
                <div className="h-1 w-16 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font">
                  Experience lightning-fast trades with SniperAI Bot's optimized
                  routing and low-latency infrastructure. Designed for rapid
                  token launches and volatile markets.
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full p-6">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/cherryPoints.webp"
                    alt="Points & Rewards System"
                    className="w-24 h-24 animate-float object-contain mt-12"
                  />
                </div>

                <h3 className="text-2xl mb-4 maladroit-font text-[var(--color-text-primary)]">
                  Points & Rewards System
                </h3>
                <div className="h-1 w-16 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font">
                  Engage in trading and earn points with every $10 in volume.
                  Accumulate points to climb the leaderboard and unlock
                  exclusive rewards.
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full p-6">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1.5s" }}
              ></div>

              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/points.webp"
                    alt="Pool Boost Program"
                    className="w-20 h-20 object-contain animate-float mt-7"
                  />
                </div>

                <h3 className="text-2xl mb-4 maladroit-font text-[var(--color-text-primary)]">
                  Pool Boost Program
                </h3>
                <div className="h-1 w-16 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font">
                  Benefit from our Pool Boost initiative, where select liquidity
                  pools offer an additional 5% bonus on trades.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Trading Features */}
        <div className="bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent)]/5 rounded-[4px] border border-[var(--color-accent)]/30 overflow-hidden p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient
                  id="sniperRadialPattern"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#sniperRadialPattern)"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl mb-6 maladroit-font text-white text-center">
              Advanced Trading Features
            </h3>
            <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-white mb-8 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="stat-card text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl winky-sans-font text-green-400 mb-2">
                  🎯
                </div>
                <h4 className="text-white winky-sans-font text-xl mb-3">
                  Graduation Sniper
                </h4>
                <p className="text-white/90 winky-sans-font text-sm">
                  With our migration sniper, you're never too late to the party.
                  Be the first to get in or secure profits.
                </p>
              </div>

              <div className="stat-card text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl winky-sans-font text-green-400 mb-2">
                  🪙
                </div>
                <h4 className="text-white winky-sans-font text-xl mb-3">
                  Copytrade
                </h4>
                <p className="text-white/90 winky-sans-font text-sm">
                  Let others do the heavy lifting. Copy the trades of a
                  profitable trader automatically.
                </p>
              </div>

              <div className="stat-card text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl winky-sans-font text-green-400 mb-2">
                  🤖
                </div>
                <h4 className="text-white winky-sans-font text-xl mb-3">
                  No MEV Triggers
                </h4>
                <p className="text-white/90 winky-sans-font text-sm">
                  Cherry utilizes MEV-resistant execution paths with
                  frontrunning and sandwiching protection.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 w-full flex flex-col md:flex-row gap-6 items-center justify-center text-center">
            <button
              onClick={handleSnipeNow}
              className="text-white bg-[var(--color-accent)] md:py-4 py-3 md:px-16 px-4 rounded-xl border border-white/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font mx-auto shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
            >
              <span className="text-white text-lg">Try SniperAI Bot</span>
              <Icon
                className="text-white"
                icon="ph:crosshair-simple-bold"
                width={24}
                height={24}
              />
            </button>

            <button className="text-white bg-[var(--color-accent)]/80 md:py-4 py-3 md:px-16 px-4 rounded-xl border border-white/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font mx-auto shadow-[0_8px_24px_rgba(67,103,201,0.3)]">
              <span className="text-white text-lg">Learn More</span>
              <Icon
                className="text-white"
                icon="streamline-plump:global-learning-remix"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CherrySniperSection;
