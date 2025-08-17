import React from "react";
import { Icon } from "@iconify/react";

interface CherryQuestSectionProps {
  handleStartQuesting: () => void;
}

const CherryQuestSection: React.FC<CherryQuestSectionProps> = ({
  handleStartQuesting,
}) => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(67,103,201,0.15)_0%,transparent_52%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(67,103,201,0.09)_0%,transparent_52%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.09) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.09) 1px, transparent 1px)`,
              backgroundSize: "55px 55px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-84 h-84 border border-[#4367c9]/20 rounded-full animate-spin-slow"
            style={{ animationDuration: "38s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-[#4367c9]/15 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "33s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full"></div>
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
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
              id="questConnectionGradient"
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
            stroke="url(#questConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#questConnectionGradient)"
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
                Cherry Quest
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            Cherry Quest Platform
          </h2>

          {/* Description Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                The Cherry Quest Platform offers founders a unique opportunity
                to engage with a highly active and targeted Web3 community. By
                setting up tasks and quests on our platform, founders can
                directly connect with potential investors, educate users about
                their projects, and drive meaningful engagement.
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/checklistcherry.webp"
                    alt="Set Up Quests"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <h3 className="text-lg md:text-2xl mb-4 maladroit-font text-[var(--color-text-primary)] text-center">
                  Set Up Quests
                </h3>
                <div className="h-1 w-32 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-center flex-grow text-sm md:text-[19px]">
                  Founders can create tasks and quests on Cherry to attract
                  users to their app, offering rewards as incentives.
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card group">
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
                    src="https://storage.cherrybot.ai/checkcherry.png"
                    alt="Quest to Earn"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <h3 className="text-lg md:text-2xl mb-4 maladroit-font text-[var(--color-text-primary)] text-center">
                  Quest to Earn
                </h3>
                <div className="h-1 w-32 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-center flex-grow text-sm md:text-[19px]">
                  Users complete quests to earn rewards, engaging with the
                  Cherry platform.
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card group">
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
                    src="https://storage.cherrybot.ai/compcherry.png"
                    alt="Competition and Challenges"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <h3 className="text-lg md:text-2xl mb-4 maladroit-font text-[var(--color-text-primary)] text-center">
                  Competition & Challenges
                </h3>
                <div className="h-1 w-32 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-center flex-grow">
                  Compete in leaderboards to earn rewards based on performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement and Growth Stats */}
        <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] border border-[var(--color-accent)]/30 overflow-hidden p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient
                  id="radialPattern"
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
              <rect width="100%" height="100%" fill="url(#radialPattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg md:text-2xl mb-6 maladroit-font text-white text-center">
              Engagement and Growth Stats
            </h3>
            <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-white mb-8 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="stat-card text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-5xl winky-sans-font text-green-400 mb-2">
                  10M+
                </div>
                <p className="text-white winky-sans-font text-xl">Users</p>
              </div>

              <div className="stat-card text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-5xl winky-sans-font text-green-400 mb-2">
                  300K+
                </div>
                <p className="text-white winky-sans-font text-xl">
                  Daily Active Users
                </p>
              </div>

              <div className="stat-card text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-5xl winky-sans-font text-green-400 mb-2">
                  1000+
                </div>
                <p className="text-white winky-sans-font text-xl">
                  Daily Tasks
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 w-full flex items-center justify-center text-center">
            <button
              onClick={handleStartQuesting}
              className="text-white bg-[var(--color-accent)] md:py-4 py-3 lg:px-16 px-4 rounded-xl border border-white/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font mx-auto shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
            >
              <span className="text-white text-lg">Start Questing</span>
              <Icon
                className="text-white"
                icon="mdi:trophy-outline"
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

export default CherryQuestSection;
