import React from "react";
import { Icon } from "@iconify/react";

const InformationBoxes: React.FC = () => {
  return (
    <div className="space-y-3 lg:space-y-4">
      <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4 flex items-start gap-3">
        <Icon
          icon="mdi:lock"
          width={18}
          height={18}
          className="text-black/70 mt-0.5 flex-shrink-0"
        />
        <div>
          <p className="winky-sans-font text-black text-sm">
            Locking $AIBOT set APY for your lock duration. After your lock
            period ends you will continue to earn at the base APY rate.
          </p>
        </div>
      </div>

      <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4 flex items-start gap-3">
        <Icon
          icon="mdi:refresh"
          width={18}
          height={18}
          className="text-black/70 mt-0.5 flex-shrink-0"
        />
        <div>
          <p className="winky-sans-font text-black text-sm">
            Staking $AIBOT also grants stakers with AIBOT points which can be
            used to buy lootboxes that contain rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationBoxes;
