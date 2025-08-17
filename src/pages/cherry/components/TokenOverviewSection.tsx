import React from "react";
import { Icon } from "@iconify/react";

interface TokenOverviewSectionProps {
  // Add any props if needed
}

const TokenOverviewSection: React.FC<TokenOverviewSectionProps> = () => {
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

      <div className="max-w-7xl mx-auto px-6">
        {/* What is $AIBOT */}
        <div className="flex flex-col items-start gap-8 mb-16">
          <div className="lg:w-full">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <h3 className="maladroit-font text-lg md:text-2xl text-[var(--color-text-primary)] mb-4 relative z-10">
                What is $AIBOT?
              </h3>
              <p className="winky-sans-font text-sm md:text-lg text-[var(--color-text-secondary)]/90   relative z-10">
                $AIBOT is the native token of the CHERRY ecosystem. From trading
                bots to community tools and gamified quests, $AIBOT is what ties
                it all together.
              </p>
              <p className="winky-sans-font text-sm md:text-lg text-[var(--color-text-secondary)]/90 relative z-10">
                Whether you're a trader, project founder, or degen gamer —
                $AIBOT gives you utility, access, and rewards.
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>

          {/* $AIBOT Utility */}
          <div className="lg:w-full">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              <h3 className="maladroit-font text-3xl md:text-4xl text-[var(--color-text-primary)] mb-8 text-center flex items-center justify-center gap-3 relative z-10">
                <Icon icon="fa-solid:cogs" />
                $AIBOT Utility
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
                {/* Bot Upgrades & Features */}
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30 h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:robot-happy"
                      className="text-3xl text-[var(--color-accent)] flex-shrink-0"
                    />
                    <h4 className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] font-bold">
                      Bot Upgrades & Features
                    </h4>
                  </div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm md:text-base">
                    Use $AIBOT to unlock advanced trade tools, priority trending
                    slots, and more.
                  </p>
                </div>

                {/* Game Rewards & Boosts */}
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30 h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="ion:game-controller"
                      className="text-3xl text-[var(--color-accent)] flex-shrink-0"
                    />
                    <h4 className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] font-bold">
                      Game Rewards & Boosts
                    </h4>
                  </div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm md:text-base">
                    Earn and spend $AIBOT inside the Cherry Tap Game. Use it for
                    mining boosts, card upgrades, and power-ups.
                  </p>
                </div>

                {/* Airdrop Eligibility */}
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30 h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="icon-park-solid:parachute"
                      className="text-3xl text-[var(--color-accent)] flex-shrink-0"
                    />
                    <h4 className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] font-bold">
                      Airdrop Eligibility
                    </h4>
                  </div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm md:text-base">
                    Holding or earning $AIBOT through trading and game
                    activities increases your airdrop and reward chances.
                  </p>
                </div>

                {/* Fee Sharing */}
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30 h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:cash-sync"
                      className="text-3xl text-[var(--color-accent)] flex-shrink-0"
                    />
                    <h4 className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] font-bold">
                      Fee Sharing{" "}
                      <span className="text-xs align-top">(Coming Soon)</span>
                    </h4>
                  </div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm md:text-base">
                    Top Sniper and Trending users may get access to
                    revenue-sharing based on leaderboard rankings and token
                    volume.
                  </p>
                </div>

                {/* Buyback and Burn */}
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30 h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:fire-circle"
                      className="text-3xl text-[var(--color-accent)] flex-shrink-0"
                    />
                    <h4 className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] font-bold">
                      Buyback & Burn
                    </h4>
                  </div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm md:text-base mb-2">
                    All profits from Cherry Trending (via ads and promoted
                    posts) are used to buy back and burn $AIBOT tokens.
                  </p>
                </div>

                {/* Staking Level System */}
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30 h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:trophy-award"
                      className="text-3xl text-[var(--color-accent)] flex-shrink-0"
                    />
                    <h4 className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] font-bold">
                      Staking Level System
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1">
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm md:text-base mb-2">
                        All profits from the cherry Trading Bot (from
                        subscriptions and fees) are used to reward $AIBOT
                        stakers.
                      </p>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[var(--color-accent)]/20 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[var(--color-accent)]/30 p-3">
                        <h5 className="font-bold text-[var(--color-text-primary)] mb-1 winky-sans-font flex items-center gap-2">
                          <Icon icon="mdi:arrow-up-bold-hexagon-outline" /> XP &
                          Levels
                        </h5>
                        <ul className="list-disc list-inside space-y-1 winky-sans-font text-[var(--color-text-secondary)] text-sm">
                          <li>10-level staking system.</li>
                          <li>Earn XP based on amount staked.</li>
                          <li>Unstaking resets current XP bar.</li>
                        </ul>
                      </div>
                      <div className="bg-[var(--color-accent)]/20 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[var(--color-accent)]/30 p-3">
                        <h5 className="font-bold text-[var(--color-text-primary)] mb-1 winky-sans-font flex items-center gap-2">
                          <Icon icon="mdi:treasure-chest" /> Store & Loot Boxes
                        </h5>
                        <ul className="list-disc list-inside space-y-1 winky-sans-font text-[var(--color-text-secondary)] text-sm">
                          <li>Earn Store Points from staking.</li>
                          <li>Buy 5 types of loot boxes.</li>
                          <li>Higher levels unlock better boxes.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenOverviewSection;
