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
        return "bg-cherry-red text-white";
    }
  };

  // Calculate the rank for the top 10
  const getRankForIndex = (index: number) => {
    return index + 1;
  };

  if (loading) {
    return (
      <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] mb-8">
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

        <div className="relative z-10">
          {/* Header Skeleton */}
          <HeaderSkeleton />

          {/* Table Skeleton for large screens */}
          <div className="hidden lg:block p-6 overflow-x-auto">
            <table className="w-full winky-sans-font">
              <thead>
                <tr className="border-b-2 border-cherry-burgundy">
                  <th className="px-4 py-3 text-left text-white">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-white">
                    Wallet
                  </th>
                  <th className="px-4 py-3 text-center text-white">
                    Tier
                  </th>
                  <th className="px-4 py-3 text-right text-white">
                    Points
                  </th>
                  <th className="px-4 py-3 text-right text-white">
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
      </div>
    );
  }

  return (
    <div className="bg-cherry-cream rounded-2xl border-4 border-[#111929] overflow-hidden shadow-[8px_8px_0px_#111929] relative mb-8">
      {/* Header */}
      <div className="bg-black px-4 lg:px-6 py-4 flex items-center justify-between">
        <h3 className="maladroit-font text-sm lg:text-2xl text-white flex items-center gap-2">
          <Icon
            icon="tabler:trophy"
            width={28}
            height={28}
            className="text-cherry-red animate-pulse"
          />
          Top 10 Traders
        </h3>
        <div className="winky-sans-font text-sm text-white opacity-80 hidden sm:block">
          Updated hourly
        </div>
      </div>

      {/* Table for large screens */}
      <div className="hidden lg:block p-6 overflow-x-auto">
        <table className="w-full winky-sans-font">
          <thead>
            <tr className="border-b-2 border-cherry-burgundy">
              <th className="px-4 py-3 text-left text-white">Rank</th>
              <th className="px-4 py-3 text-left text-white">
                Wallet
              </th>
              <th className="px-4 py-3 text-center text-white">
                Tier
              </th>
              <th className="px-4 py-3 text-right text-white">
                Points
              </th>
              <th className="px-4 py-3 text-right text-white">
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
                <td className="px-4 py-3 text-white font-bold">
                  #{getRankForIndex(index)}
                </td>
                <td className="px-4 py-3 text-white">
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
                <td className="px-4 py-3 text-right text-white font-bold">
                  {parseInt(item.points).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-white">
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
              <span className="winky-sans-font text-white font-bold">
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
            <div className="text-sm text-white mb-1">
              {formatWallet(item.wallet)}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white">
                <span className="font-bold">
                  {parseInt(item.points).toLocaleString()}
                </span>{" "}
                points
              </span>
              <span className="text-white">
                {formatVolume(item.totalUsdVolume)} Volume
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
