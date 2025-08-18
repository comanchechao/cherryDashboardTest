import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-24 mt-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            {" "}
            <h1 className="maladroit-font text-4xl md:text-6xl text-[var(--color-text-primary)] leading-tight mb-4">
              <span className="text-accent">AI</span> Analytics
            </h1>
            <h1 className="maladroit-font text-4xl md:text-xl text-[var(--color-text-secondary)] leading-tight mb-4">
              Telegram Channel Run By An AI Powered Bot That Finds and Analyzes
              Trending Tokens
            </h1>
          </div>

          {/* Right: Video placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[var(--color-glass)] rounded-2xl border-2 border-[var(--color-accent)] shadow-[6px_6px_0px_rgba(67,103,201,0.25)] p-3 w-full max-w-xl">
              <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-[var(--color-accent)] bg-black/40 flex items-center justify-center">
                <span className="winky-sans-font text-white text-sm md:text-base">
                  Video showcasing the Trending channel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
