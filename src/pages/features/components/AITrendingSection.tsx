import React from "react";
import { Icon } from "@iconify/react";

interface AITrendingSectionProps {
  handleViewTrending: () => void;
}

const AITrendingSection: React.FC<AITrendingSectionProps> = ({
  handleViewTrending,
}) => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(67,103,201,0.13)_0%,transparent_58%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(67,103,201,0.08)_0%,transparent_58%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-16">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)`,
              backgroundSize: "65px 65px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-76 h-76 border border-[#4367c9]/16 rounded-full animate-spin-slow"
            style={{ animationDuration: "41s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 border border-[#4367c9]/11 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "37s",
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
              id="trendingConnectionGradient"
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
            stroke="url(#trendingConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#trendingConnectionGradient)"
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
                AI Analytics
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            AI Bot That Presents and Analyzes Trending Token
          </h2>

          {/* Description Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                Uses AI to automatically find and filter onchain data to find
                trending tokens. Also offers a chat bot where you can ask
                questions and details about trending tokens.
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="feature-card flex-1 group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/lunchpadcherry.webp"
                    alt="Presale/Launchpad Trending"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                  <h3 className="text-lg md:text-2xl mb-3 maladroit-font text-[var(--color-text-primary)] text-center">
                    Presale/Launchpad Trending
                  </h3>
                </div>
                <div className="h-1 w-32 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-center flex-grow text-sm md:text-[19px] mt-5">
                  Spot promising tokens before launch and rank them by early
                  traction, volume velocity, and holder growth.
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card flex-1 group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/launch.webp"
                    alt="Prelaunch Trending"
                    className="w-20 h-20 object-contain mt-6"
                  />
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                  <h3 className="text-lg md:text-2xl mb-4 maladroit-font text-[var(--color-text-primary)] text-center">
                    Prelaunch Trending
                  </h3>
                </div>
                <div className="h-1 w-32 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-center flex-grow text-sm md:text-[19px] mt-5">
                  Get early access to pre-launch projects backed by real user
                  interest, bot signals, and dev activity.
                </p>

                <div className="w-12 h-12 mx-auto mt-6 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain animate-spin-slow opacity-30"></div>
              </div>
            </div>
          </div>

          <div className="feature-card flex-1 group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1.5s" }}
              ></div>

              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/airdrop.webp"
                    alt="AI Token Tracking"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                  <h3 className="text-lg md:text-2xl mb-4 maladroit-font text-[var(--color-text-primary)] text-center">
                    AI Token Tracking + Volume Boosting
                  </h3>
                </div>
                <div className="h-1 w-32 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-center flex-grow text-sm md:text-[19px]">
                  Cherry AI scans live market data to detect real momentum — and
                  our Volume Bot can help you simulate volume and holder
                  activity to push tokens to the top organically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Stats Section */}
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden">
          {/* Floating Decorative Elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

          <div className="relative z-10">
            <h3 className="text-2xl mb-6 maladroit-font text-[var(--color-text-primary)] text-center">
              Growth Stats
            </h3>
            <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-[var(--color-accent)] mb-8 rounded-full"></div>
            <p className="text-center text-[var(--color-text-secondary)] winky-sans-font text-lg mb-8">
              Trusted by top launchpads, traders, and meme creators to drive
              early momentum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="stat-card text-center p-6 bg-[var(--color-accent)]/20 backdrop-blur-sm rounded-xl border border-[var(--color-accent)]/30">
                <div className="text-4xl winky-sans-font text-green-500 mb-2">
                  1.2M+
                </div>
                <p className="text-[var(--color-text-primary)] winky-sans-font text-lg">
                  Subscribers
                </p>
                <p className="text-[var(--color-text-secondary)] winky-sans-font mt-2 text-sm">
                  watching what trends
                </p>
              </div>

              <div className="stat-card text-center p-6 bg-[var(--color-accent)]/20 backdrop-blur-sm rounded-xl border border-[var(--color-accent)]/30">
                <div className="text-4xl winky-sans-font text-green-500 mb-2">
                  825K+
                </div>
                <p className="text-[var(--color-text-primary)] winky-sans-font text-lg">
                  Projects
                </p>
                <p className="text-[var(--color-text-secondary)] winky-sans-font mt-2 text-sm">
                  tracked in real time
                </p>
              </div>

              <div className="stat-card text-center p-6 bg-[var(--color-accent)]/20 backdrop-blur-sm rounded-xl border border-[var(--color-accent)]/30">
                <div className="text-4xl winky-sans-font text-yellow-500 mb-2">
                  $150M+
                </div>
                <p className="text-[var(--color-text-primary)] winky-sans-font text-lg">
                  Volume
                </p>
                <p className="text-[var(--color-text-secondary)] winky-sans-font mt-2 text-sm">
                  simulated across the ecosystem
                </p>
              </div>

              <div className="stat-card text-center p-6 bg-[var(--color-accent)]/20 backdrop-blur-sm rounded-xl border border-[var(--color-accent)]/30">
                <div className="text-4xl winky-sans-font text-yellow-500 mb-2">
                  46K+
                </div>
                <p className="text-[var(--color-text-primary)] winky-sans-font text-lg">
                  Holders
                </p>
                <p className="text-[var(--color-text-secondary)] winky-sans-font mt-2 text-sm">
                  added via Cherry Volume Bot
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 w-full flex items-center justify-center text-center">
            <button
              onClick={handleViewTrending}
              className="text-white bg-[var(--color-accent)] md:py-4 py-3 lg:px-16 px-4 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font mx-auto shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
            >
              <span className="text-white text-lg">View Trending</span>
              <Icon
                className="text-white"
                icon="icon-park-twotone:blockchain"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Bottom Decorative Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
        </div>
      </div>
    </div>
  );
};

export default AITrendingSection;
