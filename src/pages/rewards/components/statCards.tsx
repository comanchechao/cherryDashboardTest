import React from "react";
import { Icon } from "@iconify/react";

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* SOL Rewards Chart Section */}
      <div className="bg-black rounded-xl border border-gray-700 overflow-hidden shadow-lg relative">
        <div className="bg-gray-900 px-4 py-2">
          <h3 className="winky-sans-font text-sm text-white flex items-center gap-2">
            <Icon
              icon="mdi:chart-line"
              width={16}
              height={16}
              className="text-cherry-red"
            />
            SOL Rewards
          </h3>
        </div>

        <div className="p-4">
          <div className="text-center mb-3">
            <div className="winky-sans-font text-lg font-bold text-white mb-1">
              1 SOL
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="mb-3">
            <div className="bg-gray-900 rounded p-2">
              <div className="flex items-end justify-center gap-1 h-12">
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "30%" }}
                ></div>
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "45%" }}
                ></div>
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "60%" }}
                ></div>
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "25%" }}
                ></div>
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "80%" }}
                ></div>
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "55%" }}
                ></div>
                <div
                  className="w-3 bg-cherry-red rounded-t-sm"
                  style={{ height: "90%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Chart Period Labels */}
          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span>Jul 1</span>
            <span>Jul 2</span>
            <span>Jul 3</span>
            <span>Jul 4</span>
            <span>Jul 5</span>
            <span>Jul 6</span>
            <span>Jul 7</span>
            <span>Jul 8</span>
          </div>

          {/* SOL Balance Display */}
          <div className="text-center">
            <div className="winky-sans-font text-sm text-gray-300 mb-1">
              0.5 SOL
            </div>
            <div className="winky-sans-font text-xs text-gray-500">0 SOL</div>
          </div>
        </div>
      </div>

      {/* Claim Section */}
      <div className="bg-black rounded-xl border border-gray-700 overflow-hidden shadow-lg relative">
        <div className="bg-gray-900 px-4 py-2">
          <h3 className="winky-sans-font text-sm text-white flex items-center gap-2">
            <Icon
              icon="mdi:check-circle"
              width={16}
              height={16}
              className="text-cherry-red"
            />
            Claim
          </h3>
        </div>

        <div className="p-4">
          {/* Claim Stats */}
          <div className="grid grid-cols-2  gap-2 mb-6">
            <div className="bg-gray-900 rounded-lg h-28 p-2 flex items-center justify-center text-center border border-gray-700">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon icon="token-branded:solana" width={29} height={29} />
                <span className="winky-sans-font text-2xl font-bold text-white">
                  SOL: +0
                </span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg h-28 p-2 flex items-center justify-center text-center border border-gray-700">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon
                  icon="mdi:account-group"
                  width={29}
                  height={29}
                  className="text-cherry-red"
                />
                <span className="winky-sans-font text-2xl font-bold text-white">
                  Points: +0
                </span>
              </div>
            </div>
          </div>

          {/* Claim Button */}
          <button className="bg-cherry-red w-full   hover:bg-cherry-red/80 duration-300 transform-gpu transition-all   rounded-lg p-3 text-center mb-1">
            <div className="winky-sans-font text-sm font-bold text-white">
              Nothing to Claim
            </div>
          </button>
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
            {/* Quest 1 */}
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
                    Refer 3 more people
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  +1,500
                </span>
              </div>
            </div>

            {/* Quest 2 */}
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
                    Trade 5 more SOL in Volume
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  +1,000
                </span>
              </div>
            </div>

            {/* Quest 3 */}
            <div className="bg-gray-900 rounded p-2 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:swap-horizontal"
                    width={12}
                    height={12}
                    className="text-gray-500"
                  />
                  <span className="winky-sans-font text-xs font-bold text-white">
                    Make 10 more transactions
                  </span>
                </div>
                <span className="winky-sans-font text-xs text-gray-400">
                  +200
                </span>
              </div>
            </div>
          </div>

          {/* Total Points Display */}
          <button className="bg-cherry-red w-full  hover:bg-cherry-red/80 duration-300 transform-gpu transition-all   rounded-lg p-3 text-center mb-1">
            <div className="winky-sans-font text-sm font-bold text-white">
              2,700 Points
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
