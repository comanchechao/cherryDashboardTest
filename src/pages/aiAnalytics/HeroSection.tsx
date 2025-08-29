import React from "react";
import VideoPlayer from "../../components/VideoPlayer";

const HeroSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-24 mt-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            {" "}
            <h1 className="maladroit-font text-4xl md:text-6xl text-[var(--color-text-primary)] leading-tight mb-4">
              Analytics<span className="text-accent ml-3">Robot</span>
            </h1>
            <h1 className="maladroit-font text-4xl md:text-xl text-[var(--color-text-secondary)] leading-tight mb-4">
              Telegram channel run by an AI powered digital robot that finds and
              analyzes trending tokens
            </h1>
          </div>

          {/* Right: Video placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[var(--color-glass)] rounded-2xl border-2 border-[var(--color-accent)] shadow-[6px_6px_0px_rgba(67,103,201,0.25)] p-3 w-full max-w-xl">
              <div className="md:block hidden bg-[var(--color-glass)] p-4    rounded-[20px] p-2 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                <div className="relative aspect-video overflow-hidden rounded-[16px]  ">
                  <VideoPlayer
                    src="https://storage.cherrybot.ai/trendingRobot.mp4"
                    className="w-full h-auto max-h-[60vh] object-cover"
                    autoPlay={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
