import React from "react";

const MarketForcast: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-20 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.12)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.08)_0%,transparent_55%)]"></div>

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
            className="w-80 h-80 border border-[var(--color-accent)]/15 rounded-full animate-spin-slow"
            style={{ animationDuration: "40s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-[var(--color-accent)]/10 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "34s" }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="maladroit-font text-2xl md:text-4xl text-[var(--color-text-primary)] leading-tight mb-4">
              Digital Robotics Is a $35 Billion Industry
            </h2>
            <p className="winky-sans-font text-base md:text-lg text-[var(--color-text-secondary)]/90 leading-relaxed">
              The global robotics market is projected to grow from $93 billion
              in 2024 to nearly $400 billion by 2035 at a 14% CAGR. Demand is
              rising in manufacturing, logistics, and healthcare. Falling costs
              and smarter AI are making robots more capable and transformative.
            </p>
          </div>

          {/* Right Visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xl rounded-[20px] p-4 bg-[var(--color-bg-secondary)]/40 border border-[var(--color-accent)]/20">
              <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_0_24px_rgba(67,103,201,0.25)]"></div>
              <div className="aspect-[16/9] flex items-center justify-center rounded-[12px]  ">
                <img
                  src="/chart.webp"
                  alt="Market Forecast Chart"
                  className="w-full h-auto object-contain rounded-[12px]"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketForcast;
