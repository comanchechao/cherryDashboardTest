import React from "react";
import { Icon } from "@iconify/react";

interface StakingSystemSectionProps {
  // Add any props if needed
}

const StakingSystemSection: React.FC<StakingSystemSectionProps> = () => {
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
                Staking System
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            Cherry Points, Staking Tiers & Loot Boxes
          </h2>
          <p className="winky-sans-font text-sm md:text-lg text-[var(--color-text-secondary)] mt-6 opacity-80">
            Unlock rewards through our gamified staking system
          </p>
        </div>

        {/* Gaming Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Cherry Points Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 p-8 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-[var(--color-glass)] rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[var(--color-glass)] rounded-full opacity-30"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-20 h-20 bg-[var(--color-glass)] rounded-2xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)] rotate-3 group-hover:rotate-6 transition-transform">
                    <Icon
                      icon="mdi:star-circle"
                      className="text-4xl text-[var(--color-accent)]"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
                      Cherry Points
                    </h3>
                    <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90 flex items-center gap-2 mt-2">
                      <Icon icon="mdi:lightning-bolt" className="text-lg" />
                      Earn & Redeem System
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-[var(--color-accent)]/20 rounded-2xl border-3 border-[var(--color-accent)]/30 p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      icon="mdi:account-star"
                      className="text-2xl text-[var(--color-accent)]"
                    />
                    <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                      How it Works
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                        $AIBOT stakers automatically earn Cherry Points
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                        Redeem points for valuable rewards from the Cherry store
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                        Boost your staking tier by burning Cherry Points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loot Boxes Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/80 via-[var(--color-accent)]/60 to-[var(--color-accent)]/80 rounded-[4px] blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[10px_10px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="bg-gradient-to-br from-[var(--color-accent)]/80 via-[var(--color-accent)]/60 to-[var(--color-accent)]/80 p-8 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 border-4 border-[var(--color-glass)] rounded-xl opacity-20 rotate-12"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[var(--color-glass)] rounded-lg opacity-30 rotate-45"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-20 h-20 bg-[var(--color-glass)] rounded-2xl border-4 border-[var(--color-accent)] flex items-center justify-center shadow-[4px_4px_0px_rgba(67,103,201,0.2)] -rotate-3 group-hover:-rotate-6 transition-transform">
                    <Icon
                      icon="mdi:treasure-chest"
                      className="text-4xl text-[var(--color-accent)]"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
                      Loot Boxes
                    </h3>
                    <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90 flex items-center gap-2 mt-2">
                      <Icon icon="mdi:gift" className="text-lg" />
                      Surprise Rewards
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-[var(--color-accent)]/20 rounded-2xl border-3 border-[var(--color-accent)]/30 p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      icon="mdi:shopping"
                      className="text-2xl text-[var(--color-accent)]"
                    />
                    <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                      Cherry Store
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                        Purchase using Cherry Points from the store
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                        Sourced from the community Loot Pool
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                        Can contain large amounts of $AIBOT tokens
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiered System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loot Box Tiers */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-[4px] border border-[var(--color-glass-border)] overflow-hidden shadow-[12px_12px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 hover:-translate-y-1">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="bg-[var(--color-glass)] p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[var(--color-accent)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                      <Icon
                        icon="mdi:package-variant"
                        className="text-3xl text-[var(--color-text-primary)]"
                      />
                    </div>
                    <div>
                      <h3 className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
                        Tiered Loot Boxes
                      </h3>
                      <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-80">
                        3 Exciting Tiers
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Standard Tier */}
                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-gray-300">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-gray-400 flex items-center justify-center">
                        <Icon
                          icon="mdi:package"
                          className="text-2xl text-gray-600"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="winky-sans-font text-gray-800 font-bold text-lg">
                          Standard
                        </h4>
                        <p className="winky-sans-font text-gray-600 text-sm">
                          Basic rewards, lowest cost
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm winky-sans-font">
                          Low Cost
                        </span>
                      </div>
                    </div>

                    {/* Rare Tier */}
                    <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border-2 border-blue-300">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg border-2 border-blue-400 flex items-center justify-center">
                        <Icon
                          icon="mdi:package-variant"
                          className="text-2xl text-blue-600"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="winky-sans-font text-blue-800 font-bold text-lg">
                          Rare
                        </h4>
                        <p className="winky-sans-font text-blue-600 text-sm">
                          Better rewards, moderate cost
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm winky-sans-font">
                          Mid Cost
                        </span>
                      </div>
                    </div>

                    {/* Legendary Tier */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border-2 border-green-400">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg border-2 border-green-500 flex items-center justify-center">
                        <Icon
                          icon="mdi:treasure-chest"
                          className="text-2xl text-green-800"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="winky-sans-font text-green-800 font-bold text-lg">
                          Legendary
                        </h4>
                        <p className="winky-sans-font text-green-700 text-sm">
                          Highest rewards, premium cost
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-gradient-to-r from-green-300 to-blue-300 text-green-800 px-3 py-1 rounded-full text-sm winky-sans-font">
                          High Cost
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Staking Tiers */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-[4px] border border-[var(--color-glass-border)] overflow-hidden shadow-[12px_12px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 hover:-translate-y-1">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="bg-[var(--color-glass)] p-8 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[var(--color-accent)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                      <Icon
                        icon="mdi:crown"
                        className="text-3xl text-[var(--color-text-primary)]"
                      />
                    </div>
                    <div>
                      <h3 className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] leading-tight">
                        Staking Tiers
                      </h3>
                      <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-80">
                        Unlock Higher Rewards
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Legionary */}
                    <div className="flex items-center gap-4 bg-[var(--color-glass)] rounded-xl p-4 border-2 border-[var(--color-glass-border)]">
                      <div className="w-12 h-12 bg-[var(--color-glass)] rounded-lg border-2 border-[var(--color-glass-border)] flex items-center justify-center">
                        <Icon
                          icon="mdi:shield"
                          className="text-2xl text-[var(--color-accent)]"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                          Legionary
                        </h4>
                        <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm opacity-80">
                          Base tier staking
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-[var(--color-glass)] text-[var(--color-text-primary)] px-3 py-1 rounded-full text-sm winky-sans-font border border-[var(--color-glass-border)]">
                          1x Rate
                        </span>
                      </div>
                    </div>

                    {/* Centurion */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-[var(--color-glass)] to-[var(--color-accent)]/10 rounded-xl p-4 border-2 border-[var(--color-accent)]">
                      <div className="w-12 h-12 bg-[var(--color-accent)] rounded-lg border-2 border-[var(--color-glass-border)] flex items-center justify-center">
                        <Icon
                          icon="mdi:shield-star"
                          className="text-2xl text-[var(--color-text-primary)]"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                          Centurion
                        </h4>
                        <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm opacity-80">
                          Enhanced staking rewards
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-[var(--color-accent)] text-[var(--color-text-primary)] px-3 py-1 rounded-full text-sm winky-sans-font">
                          2x Rate
                        </span>
                      </div>
                    </div>

                    {/* Legatus */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]">
                      <div className="w-12 h-12 bg-[var(--color-accent)] rounded-lg border-2 border-[var(--color-glass-border)] flex items-center justify-center">
                        <Icon
                          icon="mdi:crown"
                          className="text-2xl text-[var(--color-text-primary)]"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                          Legatus
                        </h4>
                        <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm opacity-80">
                          Premium tier benefits
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-[var(--color-accent)] text-[var(--color-text-primary)] px-3 py-1 rounded-full text-sm winky-sans-font">
                          3x Rate
                        </span>
                      </div>
                    </div>
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

export default StakingSystemSection;
