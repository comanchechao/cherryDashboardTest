import React from "react";
import { Icon } from "@iconify/react";

interface RevenueModelSectionProps {
  // Add any props if needed
}

const RevenueModelSection: React.FC<RevenueModelSectionProps> = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.12)_0%,transparent_75%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.08)_0%,transparent_75%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-16">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)`,
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
            className="w-80 h-80 border border-[#4367c9]/16 rounded-full animate-spin-slow"
            style={{ animationDuration: "50s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#4367c9]/12 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "48s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-18 h-18 bg-[var(--color-accent)]/12 rounded-full animate-float"></div>
        <div
          className="absolute bottom-40 right-10 w-14 h-14 bg-[var(--color-accent)]/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 bg-[var(--color-accent)]/8 rounded-full animate-float"
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
                Revenue Model
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            $AIBOT is at The Center of the Entire $AIBOT Economy
          </h2>
          <p className="winky-sans-font text-sm md:text-lg text-[var(--color-text-secondary)] mt-6 opacity-90 leading-relaxed">
            Every trade, ad, promotion made using Cherry ecosystem products
            generates fees that add value to $AIBOT
          </p>
        </div>

        {/* Revenue Flow Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Fee Generation */}
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transform transition-all duration-300 hover:-translate-y-2">
            {/* Floating Decorative Elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

            <div className="bg-[var(--color-accent)] p-6 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                  <Icon
                    icon="mdi:cash-multiple"
                    className="text-3xl text-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <h3 className="maladroit-font text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
                    Fee Generation
                  </h3>
                  <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                    Multiple Revenue Streams
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:trending-up"
                  className="text-xl text-[var(--color-accent)] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] font-semibold mb-1">
                    Trading Fees
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    Generated from bot subscriptions and trading activities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:bullhorn"
                  className="text-xl text-[var(--color-accent)] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] font-semibold mb-1">
                    Advertising Revenue
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    From promoted posts and platform advertisements
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:gamepad-variant"
                  className="text-xl text-[var(--color-accent)] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] font-semibold mb-1">
                    Game Revenue
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    In-game purchases and premium features
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buyback Mechanism */}
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transform transition-all duration-300 hover:-translate-y-2">
            {/* Floating Decorative Elements */}
            <div
              className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="bg-[var(--color-accent)] p-6 relative overflow-hidden">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                  <Icon
                    icon="mdi:recycle"
                    className="text-3xl text-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <h3 className="maladroit-font text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
                    Buyback & Burn
                  </h3>
                  <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                    Value Creation Process
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30">
                <p className="winky-sans-font text-[var(--color-text-secondary)] text-center font-semibold">
                  Most fees generated by the Cherry ecosystem are used to
                  buyback $AIBOT tokens
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <Icon
                    icon="mdi:arrow-right-bold"
                    className="text-3xl text-[var(--color-accent)] mx-auto mb-2"
                  />
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                    More fees = More buybacks
                  </p>
                </div>
              </div>
              <div className="bg-blue-100 rounded-xl p-4 border-2 border-blue-400">
                <p className="winky-sans-font text-blue-800 text-center font-semibold">
                  Creating consistent value for $AIBOT holders
                </p>
              </div>
            </div>
          </div>

          {/* Loot Pool Distribution */}
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transform transition-all duration-300 hover:-translate-y-2">
            {/* Floating Decorative Elements */}
            <div
              className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
              style={{ animationDelay: "1.5s" }}
            ></div>

            <div className="bg-[var(--color-accent)] p-6 relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                  <Icon
                    icon="mdi:treasure-chest"
                    className="text-3xl text-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <h3 className="maladroit-font text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
                    Loot Pools
                  </h3>
                  <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                    Community Rewards
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:star"
                  className="text-xl text-[var(--color-accent)] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] font-semibold mb-1">
                    Staker Rewards
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    Bought back $AIBOT tokens distributed to stakers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:chart-line"
                  className="text-xl text-[var(--color-accent)] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] font-semibold mb-1">
                    Ecosystem Growth
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    Funds used to expand the $AIBOT ecosystem
                  </p>
                </div>
              </div>
              <div className="bg-[var(--color-accent)]/20 rounded-xl p-4 border-2 border-[var(--color-accent)]/30">
                <p className="winky-sans-font text-[var(--color-text-secondary)] text-center font-semibold text-sm">
                  The more the ecosystem grows, the more value flows back to
                  holders
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-8">
          <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
            <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
              Ecosystem Growth
            </span>
          </div>
        </div>
        {/* Value Flow Diagram */}
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden">
          {/* Floating Decorative Elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

          <h3 className="maladroit-font text-2xl md:text-4xl text-[var(--color-text-primary)] mb-8 text-center relative z-10">
            Cherry Ecosystem Value Flow
          </h3>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[var(--color-accent)] rounded-full border-4 border-[var(--color-glass-border)] flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(67,103,201,0.2)]">
                <Icon
                  icon="mdi:cog"
                  className="text-3xl text-[var(--color-text-primary)]"
                />
              </div>
              <p className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg mb-2">
                Ecosystem Activity
              </p>
              <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                Trading, Gaming, Ads
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block">
              <Icon
                icon="mdi:arrow-right-bold"
                className="text-4xl text-[var(--color-accent)]"
              />
            </div>
            <div className="lg:hidden">
              <Icon
                icon="mdi:arrow-down-bold"
                className="text-4xl text-[var(--color-accent)]"
              />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[var(--color-accent)] rounded-full border-4 border-[var(--color-glass-border)] flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(67,103,201,0.2)]">
                <Icon
                  icon="mdi:cash-multiple"
                  className="text-3xl text-[var(--color-text-primary)]"
                />
              </div>
              <p className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg mb-2">
                Fee Generation
              </p>
              <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                Revenue Collection
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block">
              <Icon
                icon="mdi:arrow-right-bold"
                className="text-4xl text-[var(--color-accent)]"
              />
            </div>
            <div className="lg:hidden">
              <Icon
                icon="mdi:arrow-down-bold"
                className="text-4xl text-[var(--color-accent)]"
              />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[var(--color-accent)] rounded-full border-4 border-[var(--color-glass-border)] flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(67,103,201,0.2)]">
                <Icon
                  icon="mdi:recycle"
                  className="text-3xl text-[var(--color-text-primary)]"
                />
              </div>
              <p className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg mb-2">
                $AIBOT Buyback
              </p>
              <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                Token Acquisition
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block">
              <Icon
                icon="mdi:arrow-right-bold"
                className="text-4xl text-[var(--color-accent)]"
              />
            </div>
            <div className="lg:hidden">
              <Icon
                icon="mdi:arrow-down-bold"
                className="text-4xl text-[var(--color-accent)]"
              />
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[var(--color-accent)] rounded-full border-4 border-[var(--color-glass-border)] flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(67,103,201,0.2)]">
                <Icon
                  icon="mdi:treasure-chest"
                  className="text-3xl text-[var(--color-text-primary)]"
                />
              </div>
              <p className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg mb-2">
                Value Distribution
              </p>
              <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                Rewards & Growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueModelSection;
