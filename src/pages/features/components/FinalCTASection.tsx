import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface FinalCTASectionProps {
  handleExploreBot: () => void;
  handleViewTrending: () => void;
  handleStartQuesting: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  handleExploreBot,
  handleViewTrending,
  handleStartQuesting,
}) => {
  return (
    <div className="my-24 text-center max-w-[88rem] mx-auto relative overflow-hidden">
      <div className="relative z-10">
        <div className="relative inline-block">
          <h2 className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] mb-3 relative z-10">
            Discover the Cherry AI Ecosystem Today
          </h2>
        </div>

        <p className="winky-sans-font text-lg lg:text-xl max-w-xl mx-auto text-[var(--color-text-secondary)] mb-10">
          Join our growing community and unlock the power of Web3 with our suite
          of innovative tools and features.
        </p>

        <div className="flex flex-wrap w-full items-center justify-center gap-6">
          <button
            onClick={handleExploreBot}
            className="cursor-pointer text-[var(--color-text-primary)] bg-[var(--color-accent)] py-3 px-6 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
          >
            <Icon
              icon="lucide:bot"
              width={20}
              height={20}
              className="text-white"
            />
            <span className="text-white">Management Bot</span>
          </button>

          <button
            onClick={handleViewTrending}
            className="text-[var(--color-text-primary)] bg-[var(--color-accent)] py-3 px-6 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
          >
            <Icon
              icon="icon-park-twotone:blockchain"
              width={20}
              height={20}
              className="text-white"
            />
            <span className="text-white">AI Trending</span>
          </button>

          <button
            onClick={handleStartQuesting}
            className="cursor-pointer text-[var(--color-text-primary)] bg-[var(--color-accent)] py-3 px-6 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
          >
            <Icon
              icon="mdi:trophy-outline"
              width={20}
              height={20}
              className="text-white"
            />
            <span className="text-white">Cherry Quest</span>
          </button>

          <div className="relative text-[var(--color-text-primary)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 py-3 px-6 rounded-xl flex items-center gap-2 winky-sans-font">
            <Icon
              icon="uil:chart"
              width={20}
              height={20}
              className="text-[var(--color-accent)]"
            />
            <span className="text-[var(--color-accent)]">Cherry Trade</span>
            <span className="absolute -top-2 -right-7 bg-[var(--color-accent)] text-white text-xs px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

          <Link to="/cherrySniper">
            <div className="cursor-pointer text-[var(--color-text-primary)] bg-[var(--color-accent)] py-3 px-6 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 winky-sans-font shadow-[0_8px_24px_rgba(67,103,201,0.3)]">
              <Icon
                icon="ph:crosshair-simple-bold"
                width={20}
                height={20}
                className="text-white"
              />
              <span className="text-white">SniperAI Bot</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
