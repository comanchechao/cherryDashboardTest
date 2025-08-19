import React from "react";

interface TokenOverviewSectionProps {
  // Add any props if needed
}

const TokenOverviewSection: React.FC<TokenOverviewSectionProps> = () => {
  return (
    <div className="section_sniper_spotlight pt-24 relative overflow-hidden">
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
      <div className="w-full flex pt-10 lg:px-44 px-4 lg:flex-row flex-col items-end lg:items-start  relative z-10">
        <div className="w-full flex items-center lg:flex-row flex-col justify-around my-20 mx-auto">
          <div className="  flex  justify-around  items-center  lg:h-auto mb-4 relative z-10 px-10">
            <div className="flex w-full max-w-7xl items-start justify-center flex-col  lg:px-6">
              <div className="mb-16">
                <h1 className="maladroit-font flex items-center justify-start text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] leading-tight mb-2 max-w-4xl mx-auto">
                  $<span className="text-accent">AI</span>BOT
                </h1>

                <p className="  text-left text-lg lg:text-xl text-[var(--color-text-secondary)]/80 mb-1 max-w-xl mx-auto leading-5">
                  The fuel of the Cherry ecosystem — powering trades, rewards,
                  and growth across all our tools
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative  max-w-xl rounded-[20px] p-4 bg-[var(--color-bg-secondary)]/40 border border-[var(--color-accent)]/20">
              <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_0_24px_rgba(67,103,201,0.25)]"></div>
              <div className="aspect-[16/9] flex items-center justify-center rounded-[12px]  ">
                <img
                  src="/staking.webp"
                  alt="Market Forecast Chart"
                  className="w-full h-auto object-contain rounded-[12px]"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default TokenOverviewSection;
