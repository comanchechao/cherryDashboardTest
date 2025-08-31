import React from "react";
import { Icon } from "@iconify/react";

interface BuybackBurnSectionProps {
  // Add any props if needed
}

const BuybackBurnSection: React.FC<BuybackBurnSectionProps> = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.13)_0%,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(67,103,201,0.09)_0%,transparent_80%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.07) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.07) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-76 h-76 border border-[#4367c9]/18 rounded-full animate-spin-slow"
            style={{ animationDuration: "54s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#4367c9]/13 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "52s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-18 h-18 bg-[var(--color-accent)]/14 rounded-full animate-float"></div>
        <div
          className="absolute bottom-40 right-10 w-14 h-14 bg-[var(--color-accent)]/12 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 bg-[var(--color-accent)]/10 rounded-full animate-float"
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
                Buyback & Burn
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <Icon
              icon="mdi:fire"
              className="text-4xl md:text-6xl text-[var(--color-accent)] animate-pulse"
            />
            <h2 className="maladroit-font text-3xl md:text-4xl lg:text-4xl text-[var(--color-text-primary)] mb-0 relative inline-block">
              $AIBOT Buybacks & Burns
            </h2>
            <Icon
              icon="mdi:trending-up"
              className="text-4xl md:text-6xl text-[var(--color-accent)]"
            />
          </div>
          <p className="winky-sans-font text-lg md:text-xl text-[var(--color-text-secondary)] opacity-90 leading-relaxed">
            Making $AIBOT deflationary and more valuable over time
          </p>
        </div>

        {/* Main Burn Mechanism */}
        <div className="mb-16">
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden shadow-[16px_16px_0px_rgba(67,103,201,0.2)] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[20px_20px_0px_rgba(67,103,201,0.25)]">
            {/* Floating Decorative Elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

            <div className="bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500 opacity-10 rounded-full blur-2xl"></div>

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-[var(--color-glass)] rounded-2xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transform rotate-3">
                    <Icon
                      icon="mdi:fire-circle"
                      className="text-4xl text-[var(--color-accent)]"
                    />
                  </div>
                  <h3 className="maladroit-font text-3xl md:text-3xl lg:text-3xl text-[var(--color-text-primary)] leading-tight">
                    Deflationary by Design
                  </h3>
                  <div className="w-20 h-20 bg-[var(--color-glass)] rounded-2xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transform -rotate-3">
                    <Icon
                      icon="mdi:chart-line"
                      className="text-4xl text-[var(--color-accent)]"
                    />
                  </div>
                </div>

                <div className="bg-[var(--color-glass)]/10 backdrop-blur-sm rounded-2xl border-2 border-[var(--color-glass)]/30 p-8">
                  <p className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed mb-6">
                    <span className="bg-[var(--color-glass)] text-[var(--color-text-primary)] px-3 py-1 rounded-full font-bold mr-2">
                      Key Mechanism:
                    </span>
                    Some of the fees generated by Cherry ecosystem products will
                    be used to buyback and burn $AIBOT. This will make $AIBOT
                    deflationary thus making the tokens more valuable as time
                    goes by.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Burn Process Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Step 1: Fee Collection */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--color-glass)] opacity-20 rounded-full"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <Icon
                      icon="mdi:cash-multiple"
                      className="text-3xl text-green-600"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-xl md:text-xl text-[var(--color-text-primary)] leading-tight">
                      Fee Collection
                    </h3>
                    <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                      Revenue Generation
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Trading bot subscriptions
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Platform advertising revenue
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Gaming and feature fees
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Token Buyback */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 relative overflow-hidden">
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-[var(--color-glass)] opacity-20 rounded-full"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <Icon
                      icon="mdi:shopping"
                      className="text-3xl text-blue-600"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-xl md:text-xl text-[var(--color-text-primary)] leading-tight">
                      Token Buyback
                    </h3>
                    <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                      Market Purchase
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Fees converted to buyback funds
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      $AIBOT purchased from market
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Systematic acquisition process
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Token Burn */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-orange-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 group-hover:-translate-y-2">
              {/* Floating Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                style={{ animationDelay: "1.5s" }}
              ></div>

              <div className="bg-gradient-to-br from-[var(--color-accent)] to-orange-600 p-6 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--color-glass)] opacity-20 rounded-full"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <Icon
                      icon="mdi:fire"
                      className="text-3xl text-[var(--color-accent)] animate-pulse"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
                      Token Burn
                    </h3>
                    <p className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                      Permanent Removal
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Tokens sent to burn address
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Supply permanently reduced
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Deflationary pressure created
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Growth Vision */}
        <div className="relative">
          <div className="bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)]/20 to-[var(--color-accent)]/5 rounded-[4px] border border-[var(--color-glass-border)] overflow-hidden shadow-[16px_16px_0px_rgba(67,103,201,0.2)] transform transition-all duration-300 hover:-translate-y-2">
            {/* Floating Decorative Elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

            <div className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[var(--color-accent)]/5 rounded-full"></div>
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[var(--color-accent)]/5 rounded-full"></div>

              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Icon
                      icon="mdi:rocket-launch"
                      className="text-5xl text-white/80"
                    />
                    <h3 className="maladroit-font text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-tight">
                      Growing the Ecosystem
                    </h3>
                  </div>
                  <div className="w-40 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-green-600 rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* New Products */}
                  <div className="bg-[var(--color-glass)] rounded-2xl border-3 border-[var(--color-glass-border)] p-6 shadow-[6px_6px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-[var(--color-accent)] rounded-xl border-2 border-[var(--color-glass-border)] flex items-center justify-center">
                        <Icon
                          icon="mdi:plus-circle"
                          className="text-2xl text-[var(--color-text-primary)]"
                        />
                      </div>
                      <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                        New Products
                      </h4>
                    </div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      Expanding the Cherry ecosystem with innovative trading
                      tools, gaming features, and community platforms that
                      generate additional revenue streams.
                    </p>
                  </div>

                  {/* Monetizable Features */}
                  <div className="bg-[var(--color-glass)] rounded-2xl border-3 border-[var(--color-glass-border)] p-6 shadow-[6px_6px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-[var(--color-accent)] rounded-xl border-2 border-[var(--color-glass-border)] flex items-center justify-center">
                        <Icon
                          icon="mdi:currency-usd"
                          className="text-2xl text-white"
                        />
                      </div>
                      <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                        Monetizable Features
                      </h4>
                    </div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      Implementing premium features, subscription tiers, and
                      value-added services that increase fee generation across
                      all platform touchpoints.
                    </p>
                  </div>

                  {/* User Acquisition */}
                  <div className="bg-[var(--color-glass)] rounded-2xl border-3 border-[var(--color-glass-border)] p-6 shadow-[6px_6px_0px_rgba(67,103,201,0.15)] transform transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-blue-500 rounded-xl border-2 border-[var(--color-glass-border)] flex items-center justify-center">
                        <Icon
                          icon="mdi:account-group"
                          className="text-2xl text-white"
                        />
                      </div>
                      <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                        User Acquisition
                      </h4>
                    </div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      Strategic marketing campaigns and partnership initiatives
                      to grow the user base, increasing overall platform
                      activity and fee generation.
                    </p>
                  </div>
                </div>

                {/* Value Proposition */}
                <div className="mt-12 text-center">
                  <div className="bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-2xl border-4 border-[var(--color-glass-border)] p-8 shadow-[12px_12px_0px_rgba(67,103,201,0.2)]">
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <Icon
                        icon="mdi:fire"
                        className="text-4xl text-[var(--color-text-primary)] animate-pulse"
                      />
                      <p className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)]">
                        More Growth = More Fees = More Burns = Higher Value
                      </p>
                      <Icon
                        icon="mdi:trending-up"
                        className="text-4xl text-green-600"
                      />
                    </div>
                    <p className="winky-sans-font text-lg text-[var(--color-text-primary)] opacity-90">
                      All ecosystem growth provides more cash flow to buyback
                      and burn more $AIBOT
                    </p>
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

export default BuybackBurnSection;
