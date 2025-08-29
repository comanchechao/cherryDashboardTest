import React from "react";
import { Icon } from "@iconify/react";

type TabType =
  | "home"
  | "stake"
  | "stakingLeaderboard"
  | "pointsStored"
  | "stakingTiers";

interface RewardsSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const RewardsSidebar: React.FC<RewardsSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <aside className="w-64 hidden md:flex flex-col justify-between bg-white/5 border border-white/10 rounded-sm p-4 backdrop-blur-sm">
      <div>
        <div className="maladroit-font text-xl text-white mb-4 px-2">
          <img
            src="https://storage.cherrybot.ai/cherryTextLogo.webp"
            alt="CherryAI"
            className="w-full object-contain"
          />
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => onTabChange("home")}
            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm text-left transition ${
              activeTab === "home"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white"
            }`}
          >
            <Icon icon="mdi:home" width={20} height={20} />
            <span className="winky-sans-font">Home</span>
          </button>
          <button
            onClick={() => onTabChange("stake")}
            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm text-left transition ${
              activeTab === "stake"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white"
            }`}
          >
            <Icon icon="mdi:finance" width={20} height={20} />
            <span className="winky-sans-font">Stake $AIBOT</span>
          </button>
          <button
            onClick={() => onTabChange("stakingLeaderboard")}
            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm text-left transition ${
              activeTab === "stakingLeaderboard"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white"
            }`}
          >
            <Icon icon="tabler:trophy" width={20} height={20} />
            <span className="winky-sans-font">Staking Leaderboard</span>
          </button>
          <button
            onClick={() => onTabChange("pointsStored")}
            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm text-left transition ${
              activeTab === "pointsStored"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white"
            }`}
          >
            <Icon icon="mdi:database" width={20} height={20} />
            <span className="winky-sans-font">Point Store</span>
          </button>
          <button
            onClick={() => onTabChange("stakingTiers")}
            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm text-left transition ${
              activeTab === "stakingTiers"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white"
            }`}
          >
            <Icon icon="mdi:layers" width={20} height={20} />
            <span className="winky-sans-font">Staking Tiers</span>
          </button>
          <div className="h-px bg-white/10 my-4" />
        </nav>
      </div>
      <div className="px-2">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-sm text-left transition hover:bg-white/5 text-white">
          <Icon icon="mdi:logout" width={20} height={20} />
          <span className="winky-sans-font">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default RewardsSidebar;
