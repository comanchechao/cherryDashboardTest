import React from "react";
import { Icon } from "@iconify/react";

type TabType =
  | "home"
  | "stake"
  | "stakingLeaderboard"
  | "pointsStored"
  | "stakingTiers";

interface MobileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileTabs: React.FC<MobileTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="lg:hidden mb-6">
      <div className="glass-effect rounded-xl p-2 border border-[var(--color-border)]">
        <div className="flex space-x-1">
          <button
            onClick={() => onTabChange("home")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "home"
                ? "bg-[var(--color-accent)] text-white shadow-lg transform scale-[1.02]"
                : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <Icon icon="mdi:home" width={18} height={18} />
            <span className="winky-sans-font">Home</span>
          </button>

          <button
            onClick={() => onTabChange("stake")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "stake"
                ? "bg-[var(--color-accent)] text-white shadow-lg transform scale-[1.02]"
                : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <Icon icon="mdi:finance" width={18} height={18} />
            <span className="winky-sans-font">Stake</span>
          </button>

          <button
            onClick={() => onTabChange("stakingLeaderboard")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "stakingLeaderboard"
                ? "bg-[var(--color-accent)] text-white shadow-lg transform scale-[1.02]"
                : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <Icon icon="tabler:trophy" width={18} height={18} />
            <span className="winky-sans-font">Leaderboard</span>
          </button>

          <button
            onClick={() => onTabChange("pointsStored")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "pointsStored"
                ? "bg-[var(--color-accent)] text-white shadow-lg transform scale-[1.02]"
                : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <Icon icon="mdi:database" width={18} height={18} />
            <span className="winky-sans-font">Store</span>
          </button>

          <button
            onClick={() => onTabChange("stakingTiers")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "stakingTiers"
                ? "bg-[var(--color-accent)] text-white shadow-lg transform scale-[1.02]"
                : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <Icon icon="mdi:layers" width={18} height={18} />
            <span className="winky-sans-font">Tiers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileTabs;
