import React from "react";
import { Icon } from "@iconify/react";

interface AIBOTUtilitySectionProps {
  // Add any props if needed
}

const AIBOTUtilitySection: React.FC<AIBOTUtilitySectionProps> = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(67,103,201,0.10)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(67,103,201,0.06)_0%,transparent_70%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-13">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.06) 1px, transparent 1px)`,
              backgroundSize: "78px 78px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-72 h-72 border border-[#4367c9]/14 rounded-full animate-spin-slow"
            style={{ animationDuration: "52s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-[#4367c9]/10 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "50s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/12 rounded-full animate-float"></div>
        <div
          className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-[var(--color-accent)]/8 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16" data-spotlight-content>
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
              <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                Token Utility
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Icon
              icon="mdi:cog"
              className="text-3xl text-[var(--color-accent)]"
            />
            <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] leading-tight">
              $AIBOT Utility
            </h2>
          </div>
          <p className="winky-sans-font text-sm md:text-lg text-[var(--color-text-secondary)] mt-6 opacity-80">
            Discover the power and versatility of the $AIBOT token
          </p>
        </div>

        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Bot Upgrades & Features */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center">
                    <Icon icon="mdi:robot" className="text-white text-xl" />
                  </div>
                  <h3 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                    Bot Upgrades & Features
                  </h3>
                </div>
                <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                  Use $AIBOT to unlock advanced trade tools, priority trending
                  slots, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Game Rewards & Boosts */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center">
                    <Icon
                      icon="mdi:gamepad-variant"
                      className="text-white text-xl"
                    />
                  </div>
                  <h3 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                    Game Rewards & Boosts
                  </h3>
                </div>
                <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                  Earn and spend $AIBOT inside the Cherry Tap Game. Use it for
                  mining boosts, card upgrades, and power-ups.
                </p>
              </div>
            </div>
          </div>

          {/* Airdrop Eligibility */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center">
                    <Icon
                      icon="mdi:diamond-stone"
                      className="text-white text-xl"
                    />
                  </div>
                  <h3 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                    Airdrop Eligibility
                  </h3>
                </div>
                <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                  Holding or earning $AIBOT through trading and game activities
                  increases your airdrop and reward chances.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Fee Sharing */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center">
                    <Icon
                      icon="mdi:currency-usd-off"
                      className="text-white text-xl"
                    />
                  </div>
                  <h3 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                    Fee Sharing (Coming Soon)
                  </h3>
                </div>
                <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                  Top Sniper and Trending users may get access to
                  revenue-sharing based on leaderboard rankings and token
                  volume.
                </p>
              </div>
            </div>
          </div>

          {/* Buyback & Burn */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center">
                    <Icon icon="mdi:fire" className="text-white text-xl" />
                  </div>
                  <h3 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                    Buyback & Burn
                  </h3>
                </div>
                <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                  All profits from Cherry Trending (via ads and promoted posts)
                  are used to buy back and burn $AIBOT tokens.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Full Width Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                  <Icon icon="mdi:star" className="text-white text-2xl" />
                </div>
                <h3 className="winky-sans-font text-2xl font-semibold text-[var(--color-text-primary)]">
                  Staking Level System
                </h3>
              </div>
              <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed mb-8 text-lg">
                All profits from the cherry Trading Bot (from subscriptions and
                fees) are used to reward $AIBOT stakers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* XP & Levels */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[var(--color-accent)]/20 rounded-[10px] flex items-center justify-center">
                      <Icon
                        icon="mdi:plus-circle"
                        className="text-white text-lg"
                      />
                    </div>
                    <h4 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                      XP & Levels
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        10-level staking system.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        Earn XP based on amount staked.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        Unstaking resets current XP bar.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Store & Loot Boxes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[var(--color-accent)]/20 rounded-[10px] flex items-center justify-center">
                      <Icon
                        icon="mdi:package-variant"
                        className="text-white text-lg"
                      />
                    </div>
                    <h4 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)]">
                      Store & Loot Boxes
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        Earn Store Points from staking.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        Buy 5 types of loot boxes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        Higher levels unlock better boxes.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBOTUtilitySection;
