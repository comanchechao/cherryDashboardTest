import React from "react";

const BinanceSupportSection: React.FC = () => {
  return (
    <div
      id="binance-support"
      className="section_sniper_spotlight py-20 relative overflow-hidden"
    >
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
          className="absolute top-1/3 text-white right-1/4 w-2.5 h-2.5 bg-[var(--color-accent)]/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
<h3 className="text-center my-5 text-lg md:text-2xl" >Official Binance Wallet IDO</h3>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Glass container with grid layout to mimic provided design */}
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] overflow-hidden backdrop-blur-xl">
          {/* Top Row - Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left descriptive card */}
            <div className="relative p-6 md:p-10">
            <div className="flex items-center justify-between mt-8">
             
             <div className="mb-6     rounded-full flex items-center justify-center  ">
               <img
                 src="/cherryTextLogo.webp"
                 className="w-64 object-contain"
                 alt="CherryAI Logo"
               />
             </div>
           </div>
              {/* Accent line */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-8 rounded-sm bg-[var(--color-accent)]"></span>
                <span className="winky-sans-font text-sm md:text-base text-[var(--color-text-secondary)]/90">
                  CherryAI is the first AI powered ecosystem for robotics on
                  Web3 that fundraised with the help of
                  <span className="ml-2 text-[var(--color-text-primary)] font-semibold">
                    Binance
                  </span>
                  .
                </span>
              </div>

        

              {/* Soft halo */}
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 rounded-full blur-3xl bg-[var(--color-accent)]/10"></div>
            </div>

            {/* Right - Big users number */}
            <div className="relative p-6 md:p-10 flex flex-col items-center justify-center bg-[var(--color-bg-secondary)]/30 border-t lg:border-t-0 lg:border-l border-[var(--color-glass-border)]">
              <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 rounded-full blur-3xl bg-[var(--color-accent)]/10"></div>
              <p className="maladroit-font text-3xl md:text-5xl lg:text-6xl text-[var(--color-accent)] text-center">
                280,000,000+
              </p>
              <p className="winky-sans-font text-xs md:text-sm text-[var(--color-text-secondary)]/80 mt-2 tracking-wide uppercase text-center">
                Users and Community Members
              </p>
            </div>
          </div>

          {/* Middle Row - Daily Volume strip */}
          <div className="relative border-t border-[var(--color-glass-border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
              <div className="p-6 md:p-8 flex items-center">
                <h3 className="winky-sans-font text-lg md:text-2xl text-[var(--color-text-secondary)]/80 uppercase tracking-wide">
                  Binance Ecosystem Daily Volume
                </h3>
              </div>
              <div className="relative p-6 md:p-8 flex items-center justify-end overflow-hidden">
                {/* Bar chart backdrop */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-40"
                  preserveAspectRatio="none"
                >
                  {Array.from({ length: 120 }).map((_, i) => (
                    <rect
                      key={i}
                      x={(i / 120) * 100 + "%"}
                      y={Math.random() * 50 + 30}
                      width="1"
                      height={Math.random() * 60 + 20}
                      fill="currentColor"
                      className="text-[var(--color-accent)]/25"
                    />
                  ))}
                </svg>
                <div className="relative">
                  <span className="maladroit-font text-3xl md:text-5xl lg:text-5xl text-[var(--color-text-primary)]">
                    $137.44 Billion
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - TVL */}
          <div className="relative border-t border-[var(--color-glass-border)] p-6 md:p-8">
            <div className="flex items-center justify-around   gap-6">
              <div className="maladroit-font text-2xl md:text-5xl text-[var(--color-accent)]">
                $7.25 Billion
              </div>
              {/* Decorative hash marks */}
              <div className=" maladroit-font text-2xl md:text-5xl text-[var(--color-text-primary)]/90">
                TVL on BSC
              </div>{" "}
              <div className="  z-20">
                <div className="w  rounded-full    ">
                  <img
                    src="/binanceLogo.png"
                    alt="Binance Logo"
                    className="w-60   object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Binance Logo in Corner Right */}
      </div>
    </div>
  );
};

export default BinanceSupportSection;
