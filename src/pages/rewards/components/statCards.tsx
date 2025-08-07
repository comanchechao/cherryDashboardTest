import React from "react";
import { Icon } from "@iconify/react";

interface StatCardsProps {
  userPoints?: number;
}

const StatCards: React.FC<StatCardsProps> = ({ userPoints = 0 }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      {/* Points Section */}
      <div className="bg-black rounded-xl border border-gray-700 overflow-hidden shadow-lg relative">
        <div className="bg-gray-900 px-4 py-2">
          <h3 className="winky-sans-font text-sm text-white flex items-center gap-2">
            <Icon
              icon="mdi:check-circle"
              width={16}
              height={16}
              className="text-cherry-red"
            />
            Points
          </h3>
        </div>

        <div className="p-4 w-full  mt-4 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-28">
            <Icon
              icon="mdi:account-group"
              width={77}
              height={77}
              className="text-cherry-red mb-2"
            />
            <span className="winky-sans-font text-4xl font-bold text-white">
              {userPoints.toLocaleString()} Points
            </span>
          </div>
        </div>
      </div>

      {/* Quests Section */}
      <div className="bg-black rounded-xl border border-gray-700 overflow-hidden shadow-lg relative">
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
          <h3 className="winky-sans-font text-sm text-white flex items-center gap-2">
            <Icon
              icon="mdi:sword"
              width={16}
              height={16}
              className="text-cherry-red"
            />
            Quests
          </h3>
          <div className="bg-gray-700 rounded-full px-2 py-1">
            <span className="winky-sans-font text-xs text-gray-300">
              Points Breakdown
            </span>
          </div>
        </div>

        <div className="p-4">
          {/* Quest List */}
          <div className="space-y-2 mb-4">
            {/* New Quests */}
            <div className="bg-gray-900 rounded p-2 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:chart-line"
                    width={12}
                    height={12}
                    className="text-gray-500"
                  />
                  <span className="winky-sans-font text-xs font-bold text-white">
                    TRADE $10 in volume
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  +1 point
                </span>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-2 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:chart-line"
                    width={12}
                    height={12}
                    className="text-gray-500"
                  />
                  <span className="winky-sans-font text-xs font-bold text-white">
                    Trade $1,000 more in Volume
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  +50 Points
                </span>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-2 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:chart-line"
                    width={12}
                    height={12}
                    className="text-gray-500"
                  />
                  <span className="winky-sans-font text-xs font-bold text-white">
                    Trade $5,000 more in Volume
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  200 Points
                </span>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-2 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:account-group"
                    width={12}
                    height={12}
                    className="text-gray-500"
                  />
                  <span className="winky-sans-font text-xs font-bold text-white">
                    Refer and earn 50 point on every $100 trade
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  +50 Points
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
