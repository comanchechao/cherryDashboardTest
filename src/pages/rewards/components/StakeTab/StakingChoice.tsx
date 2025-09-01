import React from "react";
import { Icon } from "@iconify/react";

interface StakingChoiceProps {
  onBackToOptions: () => void;
}

const StakingChoice: React.FC<StakingChoiceProps> = ({ onBackToOptions }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onBackToOptions}
        className="px-6 py-3 cursor-pointer bg-white/10 hover:bg-white/20 text-black rounded-sm border border-white/20 transition-all duration-200 winky-sans-font flex items-center gap-2"
      >
        <Icon icon="mdi:arrow-left" width={16} height={16} />
        Back to Staking Options
      </button>
    </div>
  );
};

export default StakingChoice;
