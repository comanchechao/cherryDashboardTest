import React from "react";
import { Icon } from "@iconify/react";

interface ManagementBotSectionProps {
  handleExploreBot: () => void;
}

const ManagementBotSection: React.FC<ManagementBotSectionProps> = ({
  handleExploreBot,
}) => {
  return (
    <div className="section_sniper_spotlight lg:py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.11)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(67,103,201,0.07)_0%,transparent_70%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-14">
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

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16" data-spotlight-content>
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
              <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                Community AI
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            AI Powered Telegram Bots For Communities
          </h2>

          {/* Description Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                The Cherry Bot is one of the most comprehensive Telegram bots
                ever made for community management. It offers a suite of
                services that ensure your community is managed more effectively
                than any other Telegram bot available today.
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="feature-card group">
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full p-6">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="https://storage.cherrybot.ai/securitycherry.webp"
                    alt="Security Portal"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <h3 className="text-2xl mb-4 maladroit-font text-[var(--color-text-primary)]">
                  Security Portal
                </h3>
                <div className="h-1 w-16 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-sm">
                  Keep your group and community secure with advanced moderation
                  tools and filters. Our security portal ensures that your
                  Telegram groups are free from spam, malicious links, and
                  disruptive behavior.
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
                    src="https://storage.cherrybot.ai/raidcherry.webp"
                    alt="Raid Feature"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <h3 className="text-2xl mb-4 maladroit-font text-[var(--color-text-primary)]">
                  Raid Feature
                </h3>
                <div className="h-1 w-16 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-sm">
                  Plan and execute community raids, gaining exposure to Cherry's
                  massive community of{" "}
                  <span className="text-green-500">10 million</span> users. This
                  feature integrates seamlessly with Cherry Quest.
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
                    src="https://storage.cherrybot.ai/lunchpadcherry.webp"
                    alt="Multichain Buy Bot"
                    className="w-24 h-24 object-contain mt-4"
                  />
                </div>

                <h3 className="text-2xl mb-4 maladroit-font text-[var(--color-text-primary)]">
                  Multichain Buy Bot
                </h3>
                <div className="h-1 w-16 mx-auto bg-[var(--color-accent)] mb-4 rounded-full"></div>

                <p className="text-[var(--color-text-secondary)] winky-sans-font text-sm">
                  Monitor on-chain buys effortlessly across multiple chains.
                  Track presales and multichain purchases in real-time, ensuring
                  you never miss a crucial market opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden">
          {/* Floating Decorative Elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

          <div className="relative z-10">
            <h3 className="text-lg md:text-3xl mb-6 maladroit-font text-[var(--color-text-primary)] text-center">
              Growth, User Engagement & Adoption
            </h3>
            <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-[var(--color-accent)] mb-8 rounded-full"></div>

            <div className="grid grid-cols-1 lg:place-items-center place-items-start md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center text-center">
                <div className="flex justify-center items-center w-fit">
                  <div className="flex flex-row text-center p-3 bg-transparent gap-1">
                    <div className="flex justify-center bg-[var(--color-accent)]/20 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[var(--color-accent)]/30 p-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                      <div className="relative flex lg:items-center items-start justify-center w-[70px] h-[70px] bg-[var(--color-accent)]/20 rounded-xl p-1 icon-container">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 rounded-xl p-[2px] icon-border"></div>
                          <Icon
                            icon="solar:shield-bold"
                            width="50"
                            height="50"
                            style={{ color: "var(--color-accent)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-5xl winky-sans-font text-green-500 mb-2">
                    141K+
                  </div>
                  <p className="text-[var(--color-text-primary)] winky-sans-font">
                    Active Groups Protected
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex justify-center items-center w-fit">
                  <div className="flex flex-row text-center p-3 bg-transparent gap-1">
                    <div className="flex justify-center bg-[var(--color-accent)]/20 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[var(--color-accent)]/30 p-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                      <div className="relative flex items-center justify-center w-[70px] h-[70px] bg-[var(--color-accent)]/20 rounded-xl p-1 icon-container">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 rounded-xl p-[2px] icon-border"></div>
                          <Icon
                            icon="material-symbols:swords"
                            width="50"
                            height="50"
                            style={{ color: "var(--color-accent)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-5xl winky-sans-font text-yellow-500 mb-2">
                    1M+
                  </div>
                  <p className="text-[var(--color-text-primary)] winky-sans-font">
                    Raids Executed
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex justify-center items-center w-fit">
                  <div className="flex flex-row text-center p-3 bg-transparent gap-1">
                    <div className="flex justify-center bg-[var(--color-accent)]/20 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[var(--color-accent)]/30 p-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                      <div className="relative flex items-center justify-center w-[70px] h-[70px] bg-[var(--color-accent)]/20 rounded-xl p-1 icon-container">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 rounded-xl p-[2px] icon-border"></div>
                          <Icon
                            icon="ph:seal-check-bold"
                            width="50"
                            height="50"
                            style={{ color: "var(--color-accent)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-5xl winky-sans-font text-yellow-500 mb-2">
                    175K+
                  </div>
                  <p className="text-[var(--color-text-primary)] winky-sans-font">
                    Projects Trust Us
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 w-full flex items-center justify-center text-center">
              <button
                onClick={handleExploreBot}
                className="text-white bg-[var(--color-accent)] md:py-4 py-3 lg:px-16 px-4 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font mx-auto shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
              >
                <span className="text-white text-lg">Explore CherryBot</span>
                <Icon
                  className="text-white"
                  icon="lucide:bot"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* Bottom Decorative Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ManagementBotSection;
