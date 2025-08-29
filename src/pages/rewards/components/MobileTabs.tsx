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
    <div className="md:hidden mb-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-1">
        <div className="flex flex-wrap overflow-x-auto space-x-1 scrollbar-hide">
          <button
            onClick={() => onTabChange("home")}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "home"
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:home"
                width={16}
                height={16}
                className={
                  activeTab === "home" ? "text-white" : "text-white/70"
                }
              />
              <span className="winky-sans-font xs:hidden">Home</span>
            </div>
          </button>
          <button
            onClick={() => onTabChange("stake")}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "stake"
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:finance"
                width={16}
                height={16}
                className={
                  activeTab === "stake" ? "text-white" : "text-white/70"
                }
              />
              <span className="winky-sans-font xs:hidden">Stake</span>
            </div>
          </button>
          <button
            onClick={() => onTabChange("stakingLeaderboard")}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "stakingLeaderboard"
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="tabler:trophy"
                width={16}
                height={16}
                className={
                  activeTab === "stakingLeaderboard"
                    ? "text-white"
                    : "text-white/70"
                }
              />
              <span className="winky-sans-font xs:hidden">Leaderboard</span>
            </div>
          </button>
          <button
            onClick={() => onTabChange("pointsStored")}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "pointsStored"
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:database"
                width={16}
                height={16}
                className={
                  activeTab === "pointsStored" ? "text-white" : "text-white/70"
                }
              />
              <span className="winky-sans-font xs:hidden">Points</span>
            </div>
          </button>
          <button
            onClick={() => onTabChange("stakingTiers")}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "stakingTiers"
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:layers"
                width={16}
                height={16}
                className={
                  activeTab === "stakingTiers" ? "text-white" : "text-white/70"
                }
              />
              <span className="winky-sans-font hiddem">Tiers</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileTabs;
