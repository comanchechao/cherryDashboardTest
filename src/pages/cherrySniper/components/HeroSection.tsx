import React from "react";
import { Icon } from "@iconify/react";
import VideoPlayer from "../../../components/VideoPlayer";

const HeroSection: React.FC = () => {
  const handleSnipeNow = () => {
    window.open("https://t.me/cherrySniperBot", "_blank");
  };

  return (
    <div className="  flex lg:flex-row flex-col py-24 relative overflow-hidden">
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

      <div className="w-full lg:flex-row flex-col  flex mx-auto px-6">
        <div className="text-center mt-16 lg:w-1/2   w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold maladroit-font text-[var(--color-text-primary)] mb-6 leading-tight">
            SniperAI Bot
          </h1>
          <p className="text-xl md:text-2xl winky-sans-font text-[var(--color-text-secondary)] mb-8 max-w-4xl mx-auto">
            The fastest way to snipe tokens on Solana. Lightning-fast execution,
            advanced features, and unbeatable speed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:px-24 justify-center items-center">
            <button
              onClick={handleSnipeNow}
              className="btn-wave-primary cursor-pointer w-full"
            >
              <span className="flex items-center gap-2">
                <Icon icon="mdi:rocket" className="text-xl" />
                Snipe Now
              </span>
            </button>

            <button className="btn-wave-secondary cursor-pointer w-full">
              <span className="flex items-center gap-2">
                <Icon icon="mdi:play-circle" className="text-xl" />
                Watch Demo
              </span>
            </button>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="  z-10 lg:w-1/2 w-full  ">
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-6 relative overflow-hidden hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold maladroit-font text-[var(--color-text-primary)] mb-4 text-center">
                See SniperAI Bot in Action
              </h3>
              <VideoPlayer
                src="/sniperAd.mp4"
                className="w-full h-auto max-h-[60vh] object-cover"
                autoPlay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
