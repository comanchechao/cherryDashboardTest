import React from "react";

interface StakingOverviewProps {
  balance?: string;
}

const StakingOverview: React.FC<StakingOverviewProps> = ({ balance }) => {
  const displayBalance = (() => {
    if (balance && parseFloat(balance) >= 1000) {
      const balanceNum = parseFloat(balance);
      return `${
        balanceNum % 1 === 0 ? balanceNum.toFixed(0) : balanceNum.toFixed(2)
      } $AIBOT`;
    }
    return "0 $AIBOT";
  })();

  return (
    <div className="flex flex-col bg gap-4">
      <div className="bg-white/5 border h-[28.7rem] border-black/20 rounded-sm p-4 lg:p-6">
        <h3 className="winky-sans-font text-black/70 text-sm mb-2">
          Total Staked
        </h3>
        <div className="maladroit-font text-xl lg:text-2xl text-black mb-4">
          {displayBalance}
        </div>

        {/* Graph Placeholder */}
        <div className="w-full h-32 lg:h-40 rounded-sm mb-4 flex items-center justify-center">
          <img
            src="https://storage.cherrybot.ai/chartFake.png"
            alt="Chart"
            className="w-full h-full object-contain"
          />
        </div>

        {/* APY Rates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
          <div className="bg-white/5 flex border border-black/20 items-center justify-center rounded-sm p-2 lg:p-3 text-center">
            <div className="maladroit-font text-xs text-black">
              1000 $AIBOT minimum
            </div>
          </div>
          <div className="bg-white/5 flex border border-black/20 items-center justify-center rounded-sm p-2 lg:p-3 text-center">
            <div className="maladroit-font text-xs text-black">
              10 points per 1000 $AIBOT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingOverview;
