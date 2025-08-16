import React from "react";
import { Icon } from "@iconify/react";

interface CherryAirdropProps {
  userPoints: number;
}

const CherryAirdrop: React.FC<CherryAirdropProps> = ({ userPoints }) => {
  const estimatedTokens = Math.floor(userPoints * 0.1);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mobile Design */}
      <div className="lg:hidden">
        <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy p-6 shadow-[8px_8px_0px_#321017]">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-cherry-burgundy rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon
                icon="mdi:parachute"
                width={28}
                height={28}
                className="text-cherry-cream"
              />
            </div>
            <h2 className="maladroit-font text-2xl text-cherry-burgundy mb-2">
              AIBOT Airdrop
            </h2>
            <p className="winky-sans-font text-sm text-cherry-burgundy/70">
              Convert your points to $AIBOT tokens
            </p>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4 mb-6">
            {/* Points Card */}
            <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cherry-red rounded-lg border-2 border-cherry-burgundy flex items-center justify-center">
                    <Icon
                      icon="mdi:star-circle"
                      className="text-lg text-cherry-cream"
                    />
                  </div>
                  <div>
                    <p className="winky-sans-font text-sm text-cherry-burgundy/70">
                      Your Points
                    </p>
                    <p className="maladroit-font text-xl text-cherry-burgundy font-bold">
                      {formatNumber(userPoints)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tokens Card */}
            <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cherry-red rounded-lg border-2 border-cherry-burgundy flex items-center justify-center">
                    <Icon
                      icon="mdi:coin"
                      className="text-lg text-cherry-cream"
                    />
                  </div>
                  <div>
                    <p className="winky-sans-font text-sm text-cherry-burgundy/70">
                      Est. $AIBOT
                    </p>
                    <p className="maladroit-font text-xl text-cherry-burgundy font-bold">
                      {formatNumber(estimatedTokens)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <button
            disabled
            className="w-full bg-cherry-burgundy/20 text-cherry-burgundy/50 py-4 px-6 rounded-xl border-2 border-cherry-burgundy/30 cursor-not-allowed winky-sans-font font-medium flex items-center justify-center gap-3"
          >
            <Icon icon="mdi:clock" width={20} height={20} />
            <span>Convert Coming Soon</span>
          </button>
        </div>
      </div>

      {/* Desktop Design */}
      <div className="hidden lg:block">
        <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy p-8 shadow-[8px_8px_0px_#321017]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-cherry-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon
                icon="mdi:parachute"
                width={36}
                height={36}
                className="text-cherry-cream"
              />
            </div>
            <h2 className="maladroit-font text-3xl text-cherry-burgundy mb-3">
              AIBOT Airdrop
            </h2>
            <p className="winky-sans-font text-lg text-cherry-burgundy/70">
              Convert your points to $AIBOT tokens
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cherry-burgundy mb-2">
                {formatNumber(userPoints)}
              </div>
              <div className="winky-sans-font text-lg text-cherry-burgundy/70">
                Your Points
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-cherry-burgundy mb-2">
                {formatNumber(estimatedTokens)}
              </div>
              <div className="winky-sans-font text-lg text-cherry-burgundy/70">
                Est. $AIBOT
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <div className="text-center">
            <button
              disabled
              className="bg-cherry-burgundy/20 text-cherry-burgundy/50 px-8 py-4 rounded-xl border-2 border-cherry-burgundy/30 cursor-not-allowed winky-sans-font font-medium flex items-center gap-3 mx-auto"
            >
              <Icon icon="mdi:clock" width={20} height={20} />
              Convert Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CherryAirdrop;
