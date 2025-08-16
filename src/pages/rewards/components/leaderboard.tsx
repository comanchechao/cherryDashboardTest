import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  TableRowSkeleton,
  CardSkeleton,
  HeaderSkeleton,
} from "../../../components/Skeleton";

interface LeaderboardItem {
  wallet: string;
  tier: string;
  points: string;
  totalUsdVolume: string;
}

interface LeaderboardProps {
  leaderboardData: LeaderboardItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboardData,
  loading,
}) => {
  const formatWallet = (wallet: string) => {
    return `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`;
  };

  const formatVolume = (volume: string) => {
    const num = parseFloat(volume);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    } else {
      return `$${num.toFixed(0)}`;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "diamond":
        return "bg-gradient-to-r from-blue-400 to-purple-500 text-white";
      case "ruby":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
      case "emerald":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white";
      case "platinum":
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case "gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case "silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case "bronze":
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-cherry-red text-cherry-cream";
    }
  };

  // Calculate the rank for the top 10
  const getRankForIndex = (index: number) => {
    return index + 1;
  };

  if (loading) {
    return (
      <div className="bg-cherry-cream rounded-2xl border-4 border-[#111929] overflow-hidden shadow-[8px_8px_0px_#111929] relative mb-8">
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Table Skeleton for large screens */}
        <div className="hidden lg:block p-6 overflow-x-auto">
          <table className="w-full winky-sans-font">
            <thead>
              <tr className="border-b-2 border-cherry-burgundy">
                <th className="px-4 py-3 text-left text-cherry-burgundy">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-cherry-burgundy">
                  Wallet
                </th>
                <th className="px-4 py-3 text-center text-cherry-burgundy">
                  Tier
                </th>
                <th className="px-4 py-3 text-right text-cherry-burgundy">
                  Points
                </th>
                <th className="px-4 py-3 text-right text-cherry-burgundy">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, index) => (
                <TableRowSkeleton key={index} columns={5} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Skeleton */}
        <div className="lg:hidden p-4 space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cherry-cream rounded-2xl border-4 border-[#111929] overflow-hidden shadow-[8px_8px_0px_#111929] relative mb-8">
      {/* Header */}
      <div className="bg-black px-4 lg:px-6 py-4 flex items-center justify-between">
        <h3 className="maladroit-font text-sm lg:text-2xl text-cherry-cream flex items-center gap-2">
          <Icon
            icon="tabler:trophy"
            width={28}
            height={28}
            className="text-cherry-red animate-pulse"
          />
          Top 10 Traders
        </h3>
        <div className="winky-sans-font text-sm text-cherry-cream opacity-80 hidden sm:block">
          Updated hourly
        </div>
      </div>

      {/* Table for large screens */}
      <div className="hidden lg:block p-6 overflow-x-auto">
        <table className="w-full winky-sans-font">
          <thead>
            <tr className="border-b-2 border-cherry-burgundy">
              <th className="px-4 py-3 text-left text-cherry-burgundy">Rank</th>
              <th className="px-4 py-3 text-left text-cherry-burgundy">
                Wallet
              </th>
              <th className="px-4 py-3 text-center text-cherry-burgundy">
                Tier
              </th>
              <th className="px-4 py-3 text-right text-cherry-burgundy">
                Points
              </th>
              <th className="px-4 py-3 text-right text-cherry-burgundy">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="border-b border-cherry-burgundy border-opacity-20 hover:bg-cherry-burgundy hover:bg-opacity-10 transition-colors"
              >
                <td className="px-4 py-3 text-cherry-burgundy font-bold">
                  #{getRankForIndex(index)}
                </td>
                <td className="px-4 py-3 text-cherry-burgundy">
                  <div className="flex items-center">
                    <span>{formatWallet(item.wallet)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                      item.tier
                    )}`}
                  >
                    {item.tier}
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-cherry-burgundy font-bold">
                  {parseInt(item.points).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-cherry-burgundy">
                  {formatVolume(item.totalUsdVolume)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden p-4 space-y-3">
        {leaderboardData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-cherry-burgundy bg-opacity-5 rounded-lg p-3 border border-cherry-burgundy border-opacity-20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="winky-sans-font text-cherry-cream font-bold">
                #{getRankForIndex(index)}
              </span>
              <div
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                  item.tier
                )}`}
              >
                {item.tier}
              </div>
            </div>
            <div className="text-sm text-cherry-cream mb-1">
              {formatWallet(item.wallet)}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cherry-cream">
                <span className="font-bold">
                  {parseInt(item.points).toLocaleString()}
                </span>{" "}
                points
              </span>
              <span className="text-cherry-cream">
                {formatVolume(item.totalUsdVolume)} Volume
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls - Commented out for top 10 only */}
      {/* {totalPages > 1 && (
        <div className="p-4 border-t lg:block hidden border-cherry-burgundy border-opacity-20">
          <div className="flex items-center justify-between">
            <div className="winky-sans-font text-sm text-cherry-burgundy">
              Showing {(currentPage - 1) * 10 + 1} -{" "}
              {Math.min(currentPage * 10, totalCount)} of {totalCount} users
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg border-2 border-cherry-burgundy font-bold transition-all duration-200 transform-gpu shadow-[2px_2px_0px_#321017] hover:shadow-[1px_1px_0px_#321017] winky-sans-font flex items-center gap-1 ${
                  currentPage === 1
                    ? "bg-cherry-burgundy/20 text-cherry-burgundy/50 cursor-not-allowed"
                    : "bg-cherry-cream text-cherry-burgundy hover:bg-cherry-burgundy hover:text-cherry-cream hover:translate-y-0.5 hover:translate-x-0.5"
                }`}
              >
                <Icon icon="mdi:chevron-left" width={16} height={16} />
                Prev
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg border-2 font-bold transition-all duration-200 transform-gpu shadow-[2px_2px_0px_#321017] hover:shadow-[1px_1px_0px_#321017] winky-sans-font flex items-center justify-center ${
                        pageNum === currentPage
                          ? "bg-cherry-red text-cherry-cream border-cherry-red shadow-[1px_1px_0px_#321017]"
                          : "bg-cherry-cream text-cherry-burgundy border-cherry-burgundy hover:bg-cherry-burgundy hover:text-cherry-cream hover:translate-y-0.5 hover:translate-x-0.5"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg border-2 border-cherry-burgundy font-bold transition-all duration-200 transform-gpu shadow-[2px_2px_0px_#321017] hover:shadow-[1px_1px_0px_#321017] winky-sans-font flex items-center gap-1 ${
                  currentPage === totalPages
                    ? "bg-cherry-burgundy/20 text-cherry-burgundy/50 cursor-not-allowed"
                    : "bg-cherry-cream text-cherry-burgundy hover:bg-cherry-burgundy hover:text-cherry-cream hover:translate-y-0.5 hover:translate-x-0.5"
                }`}
              >
                Next
                <Icon icon="mdi:chevron-right" width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="lg:hidden p-4 border-t border-cherry-burgundy border-opacity-20">
          <div className="flex flex-col gap-3">
            <div className="winky-sans-font text-sm text-cherry-burgundy text-center">
              Page {currentPage} of {totalPages} • {totalCount} total users
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border-2 border-cherry-burgundy font-bold transition-all duration-200 transform-gpu shadow-[2px_2px_0px_#321017] hover:shadow-[1px_1px_0px_#321017] winky-sans-font flex items-center gap-1 ${
                  currentPage === 1
                    ? "bg-cherry-burgundy/20 text-cherry-burgundy/50 cursor-not-allowed"
                    : "bg-cherry-cream text-cherry-burgundy hover:bg-cherry-burgundy hover:text-cherry-cream hover:translate-y-0.5 hover:translate-x-0.5"
                }`}
              >
                <Icon icon="mdi:chevron-left" width={16} height={16} />
                Prev
              </button>

              <div className="px-4 py-2 bg-cherry-red text-cherry-cream rounded-lg border-2 border-cherry-red font-bold winky-sans-font">
                {currentPage}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border-2 border-cherry-burgundy font-bold transition-all duration-200 transform-gpu shadow-[2px_2px_0px_#321017] hover:shadow-[1px_1px_0px_#321017] winky-sans-font flex items-center gap-1 ${
                  currentPage === totalPages
                    ? "bg-cherry-burgundy/20 text-cherry-burgundy/50 cursor-not-allowed"
                    : "bg-cherry-cream text-cherry-burgundy hover:bg-cherry-burgundy hover:text-cherry-cream hover:translate-y-0.5 hover:translate-x-0.5"
                }`}
              >
                Next
                <Icon icon="mdi:chevron-right" width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Leaderboard;
