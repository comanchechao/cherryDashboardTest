import React from "react";
import { Icon } from "@iconify/react";

const CherryAirdrop: React.FC = () => {
  const userPoints = 0;
  const estimatedTokens = Math.floor(userPoints * 0.1);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy p-8 shadow-[8px_8px_0px_#321017] text-center">
        <div className="w-16 h-16 bg-cherry-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon
            icon="mdi:parachute"
            width={32}
            height={32}
            className="text-cherry-cream"
          />
        </div>

        <h2 className="maladroit-font text-3xl text-cherry-burgundy mb-2">
          Cherry Airdrop
        </h2>

        <p className="winky-sans-font text-cherry-burgundy/70 mb-8">
          Convert your points to $CHERRY tokens
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-2xl font-bold text-cherry-burgundy mb-1">
              {formatNumber(userPoints)}
            </div>
            <div className="winky-sans-font text-sm text-cherry-burgundy/70">
              Your Points
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-cherry-burgundy mb-1">
              {formatNumber(estimatedTokens)}
            </div>
            <div className="winky-sans-font text-sm text-cherry-burgundy/70">
              Est. $CHERRY
            </div>
          </div>
        </div>

        <button
          disabled
          className="bg-cherry-burgundy/20 text-cherry-burgundy/50 px-8 py-3 rounded-xl border-2 border-cherry-burgundy/30 cursor-not-allowed winky-sans-font font-medium flex items-center gap-2 mx-auto"
        >
          <Icon icon="mdi:clock" width={20} height={20} />
          Convert Coming Soon
        </button>
      </div>
    </div>
  );
};

export default CherryAirdrop;
