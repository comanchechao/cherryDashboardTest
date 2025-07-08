import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  tradingPoints: number;
  referralPoints: number;
  totalReferrals: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "434...5d5",
    tradingPoints: 372100277,
    referralPoints: 38644516,
    totalReferrals: 1975316,
  },
  {
    rank: 2,
    userId: "f71...a7e",
    tradingPoints: 302245106,
    referralPoints: 53821778,
    totalReferrals: 19065078,
  },
  {
    rank: 3,
    userId: "931...1bd",
    tradingPoints: 277566355,
    referralPoints: 36667700,
    totalReferrals: 0,
  },
  {
    rank: 4,
    userId: "161...c13",
    tradingPoints: 239127721,
    referralPoints: 37036583,
    totalReferrals: 2349893,
  },
  {
    rank: 5,
    userId: "623...83e",
    tradingPoints: 58781350,
    referralPoints: 216836449,
    totalReferrals: 213049748,
  },
  {
    rank: 6,
    userId: "b83...bb4",
    tradingPoints: 231503492,
    referralPoints: 33668500,
    totalReferrals: 0,
  },
  {
    rank: 7,
    userId: "17f...044",
    tradingPoints: 211468613,
    referralPoints: 35249353,
    totalReferrals: 577653,
  },
  {
    rank: 8,
    userId: "d7e...9f5",
    tradingPoints: 210771848,
    referralPoints: 34667700,
    totalReferrals: 0,
  },
  {
    rank: 9,
    userId: "039...ee2",
    tradingPoints: 202216894,
    referralPoints: 34681768,
    totalReferrals: 12568,
  },
  {
    rank: 10,
    userId: "8a2...f91",
    tradingPoints: 195432108,
    referralPoints: 31245890,
    totalReferrals: 856742,
  },
];

const PointsLeaderboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockLeaderboardData.length / itemsPerPage);

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Icon
            icon="mdi:trophy"
            className="text-cherry-burgundy"
            width={24}
            height={24}
          />
        );
      case 2:
        return (
          <Icon
            icon="mdi:trophy"
            className="text-cherry-burgundy"
            width={22}
            height={22}
          />
        );
      case 3:
        return (
          <Icon
            icon="mdi:trophy"
            className="text-cherry-burgundy"
            width={20}
            height={20}
          />
        );
      default:
        return (
          <span className="winky-sans-font text-lg font-bold text-cherry-burgundy">
            #{rank}
          </span>
        );
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-700 text-white";
      default:
        return "bg-cherry-cream border-2 border-cherry-burgundy text-cherry-burgundy";
    }
  };

  const currentData = mockLeaderboardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#321017] relative">
      {/* Header */}
      <div className="bg-cherry-burgundy px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cherry-cream rounded-full flex items-center justify-center">
            <Icon
              icon="mdi:podium-gold"
              width={28}
              height={28}
              className="text-cherry-burgundy"
            />
          </div>
          <div>
            <h3 className="maladroit-font text-2xl text-cherry-cream">
              Points Leaderboard
            </h3>
            <p className="winky-sans-font text-sm text-cherry-cream opacity-80">
              Top performers by total points earned
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:clock"
            width={16}
            height={16}
            className="text-cherry-cream opacity-70"
          />
          <span className="winky-sans-font text-sm text-cherry-cream opacity-70">
            Updated hourly
          </span>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-cherry-burgundy/10 px-6 py-3 flex items-center justify-between border-b-2 border-cherry-burgundy/20">
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:account-group"
            width={20}
            height={20}
            className="text-cherry-burgundy"
          />
          <span className="winky-sans-font text-sm text-cherry-burgundy">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, mockLeaderboardData.length)}{" "}
            of {mockLeaderboardData.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg winky-sans-font text-sm font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? "bg-cherry-burgundy text-cherry-cream"
                  : "bg-cherry-cream text-cherry-burgundy hover:bg-cherry-burgundy/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-cherry-burgundy/5">
            <tr>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:format-list-numbered"
                    width={16}
                    height={16}
                    className="text-cherry-burgundy"
                  />
                  <span className="winky-sans-font text-sm font-bold text-cherry-burgundy">
                    Rank
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:account"
                    width={16}
                    height={16}
                    className="text-cherry-burgundy"
                  />
                  <span className="winky-sans-font text-sm font-bold text-cherry-burgundy">
                    User ID
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Icon
                    icon="mdi:star"
                    width={16}
                    height={16}
                    className="text-cherry-burgundy"
                  />
                  <span className="winky-sans-font text-sm font-bold text-cherry-burgundy">
                    Total Points
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Icon
                    icon="mdi:chart-line"
                    width={16}
                    height={16}
                    className="text-cherry-burgundy"
                  />
                  <span className="winky-sans-font text-sm font-bold text-cherry-burgundy">
                    Trading
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Icon
                    icon="mdi:account-group"
                    width={16}
                    height={16}
                    className="text-cherry-burgundy"
                  />
                  <span className="winky-sans-font text-sm font-bold text-cherry-burgundy">
                    Referrals
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <motion.tr
                key={entry.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="border-b border-cherry-burgundy/10 hover:bg-cherry-burgundy/5 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadgeColor(
                        entry.rank
                      )}`}
                    >
                      {getRankIcon(entry.rank)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cherry-burgundy rounded-full flex items-center justify-center">
                      <Icon
                        icon="mdi:account"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                    </div>
                    <div>
                      <span className="winky-sans-font font-medium text-cherry-burgundy">
                        {entry.userId}
                      </span>
                      {entry.rank <= 3 && (
                        <div className="flex items-center gap-1 mt-1">
                          <Icon
                            icon="mdi:crown"
                            width={12}
                            height={12}
                            className="text-yellow-500"
                          />
                          <span className="winky-sans-font text-xs text-yellow-600">
                            Top Performer
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:star"
                        width={16}
                        height={16}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font font-bold text-lg text-cherry-burgundy">
                        {formatNumber(
                          entry.tradingPoints + entry.referralPoints
                        )}
                      </span>
                    </div>
                    <span className="winky-sans-font text-xs text-cherry-burgundy/60">
                      {(
                        entry.tradingPoints + entry.referralPoints
                      ).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:chart-line"
                        width={16}
                        height={16}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font font-medium text-cherry-burgundy">
                        {formatNumber(entry.tradingPoints)}
                      </span>
                    </div>
                    <span className="winky-sans-font text-xs text-cherry-burgundy/60">
                      {entry.tradingPoints.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:account-group"
                        width={16}
                        height={16}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font font-medium text-cherry-burgundy">
                        {formatNumber(entry.totalReferrals)}
                      </span>
                    </div>
                    <span className="winky-sans-font text-xs text-cherry-burgundy/60">
                      {entry.totalReferrals.toLocaleString()} refs
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-cherry-burgundy/5 px-6 py-4 flex items-center justify-between border-t-2 border-cherry-burgundy/20">
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:information"
            width={16}
            height={16}
            className="text-cherry-burgundy"
          />
          <span className="winky-sans-font text-sm text-cherry-burgundy">
            Points = Trading Volume + Referral Rewards
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cherry-burgundy rounded-full"></div>
            <span className="winky-sans-font text-xs text-cherry-burgundy">
              Trading Points
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cherry-burgundy rounded-full"></div>
            <span className="winky-sans-font text-xs text-cherry-burgundy">
              Referral Points
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsLeaderboard;
