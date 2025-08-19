import React from "react";

const BinanceSupportSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-20 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.13)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(67,103,201,0.08)_0%,transparent_55%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px),\n                                    linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-80 h-80 border border-[var(--color-accent)]/16 rounded-full animate-spin-slow"
            style={{ animationDuration: "40s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-[var(--color-accent)]/10 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "34s" }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-[var(--color-accent)]/25 rounded-full animate-float"></div>
        <div
          className="absolute bottom-24 right-1/3 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full animate-float"
          style={{ animationDelay: "1.2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[var(--color-accent)]/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[28px] p-8 md:p-12 overflow-hidden backdrop-blur-xl">
          {/* Accents */}
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center mb-5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[6px] px-4 py-1">
                <span className="winky-sans-font text-[var(--color-accent)] text-sm">
                  Binance Ecosystem
                </span>
              </div>
              <h2 className="maladroit-font text-2xl md:text-4xl text-[var(--color-text-primary)] leading-tight mb-4">
                The First Digital Robotics Ecosystem Supported By The Binance
                Ecosystem
              </h2>
              <p className="winky-sans-font text-base md:text-lg text-[var(--color-text-secondary)]/90 leading-relaxed">
                Binance has the largest web3 community and userbase with 280
                million+ users. CherryAI being the first project in digital
                robotics that Binance directly helped with fundraising through
                their wallet IDO is uniquely positioned to benefit from their
                large userbase and community.
              </p>
            </div>

            {/* Right Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm rounded-[20px] p-4 bg-[var(--color-bg-secondary)]/40 border border-[var(--color-accent)]/20">
                <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_0_24px_rgba(67,103,201,0.25)]"></div>
                <div className="aspect-[4/3] flex items-center justify-center rounded-[12px]  ">
                  <img
                    src="/binance.webp"
                    alt="Binance"
                    className="m w-full object-contain rounded-[12px]"
                  />
                </div>
                <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
                <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinanceSupportSection;
