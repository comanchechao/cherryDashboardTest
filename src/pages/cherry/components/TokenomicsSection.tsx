import React from "react";

interface TokenomicsSectionProps {
  // Add any props if needed
}

const TokenomicsSection: React.FC<TokenomicsSectionProps> = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16" data-spotlight-content>
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
              <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                Tokenomics
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            Why $AIBOT?
          </h2>
          <p className="winky-sans-font text-lg md:text-2xl text-[var(--color-text-secondary)] mt-6">
            A Self-Sustaining Ecosystem
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Staking */}
          <div className="group">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <div className="bg-[var(--color-accent)] p-6 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full"></div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <img
                      src="https://storage.cherrybot.ai/staking.webp"
                      alt="Staking"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-sm md:text-2xl text-[var(--color-text-primary)] leading-tight">
                      Staking
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                    Will be used to buy $AIBOT and offer unique staking
                    opportunities with high APR. Stakers can access third-party
                    airdrops, which will be delivered to the highest stakers by
                    pool size.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                    Additionally, stakers gain access to a private chat room
                    with direct access to the team, enabling them to participate
                    in governance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ads, Project Promotions */}
          <div className="group">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full">
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
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full"></div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <img
                      src="https://storage.cherrybot.ai/adds.webp"
                      alt="Ads"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-sm md:text-2xl text-[var(--color-text-primary)] leading-tight">
                      Ads & Promotions
                    </h3>
                    <span className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                      Platform Features
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                    To access CHERRY's platform features, including ads and
                    project promotions, users must purchase $AIBOT.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Token Governance - Full Width */}
          <div className="group md:col-span-2">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2">
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
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-[var(--color-accent)]/15 rounded-full"></div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-glass-border)] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <img
                      src="https://storage.cherrybot.ai/govern.webp"
                      alt="Governance"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="maladroit-font text-sm md:text-2xl text-[var(--color-text-primary)] leading-tight">
                      Token Governance
                    </h3>
                    <span className="text-[var(--color-text-primary)] text-sm winky-sans-font opacity-90">
                      Community Driven Decisions
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                      Platform votes, bounties, and other governance activities
                      will be available to all $AIBOT holders.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] leading-relaxed">
                      Stakers will receive{" "}
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        2X
                      </span>{" "}
                      the voting power, allowing for greater influence on
                      platform decisions.
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

export default TokenomicsSection;
