import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface LeaderboardItem {
  wallet: string;
  type: string;
  solEarn: number;
  isUser?: boolean;
}

interface LeaderboardProps {
  mockLeaderboardData: LeaderboardItem[];
  showAllLeaderboard: boolean;
  setShowAllLeaderboard: (show: boolean) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  mockLeaderboardData,
  showAllLeaderboard,
  setShowAllLeaderboard,
}) => {
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
          Trader Leaderboard
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
              <th className="px-4 py-3 text-left text-cherry-burgundy  ">
                Wallet
              </th>
              <th className="px-4 py-3 text-center text-cherry-burgundy  ">
                Type
              </th>
              <th className="px-4 py-3 text-right text-cherry-burgundy  ">
                SOL Earn
              </th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboardData.slice(0, 6).map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`border-b border-cherry-burgundy border-opacity-20 hover:bg-cherry-burgundy hover:bg-opacity-10 transition-colors ${
                  item.isUser ? "bg-opacity-10" : ""
                }`}
              >
                <td className="px-4 py-3 text-cherry-burgundy">
                  <div className="flex items-center">
                    <span className={item.isUser ? " " : ""}>
                      {item.wallet.substring(0, 6)}...
                      {item.wallet.substring(item.wallet.length - 4)}
                      {item.isUser && " (You)"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-cherry-burgundy">
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === "tier 1"
                        ? "bg-cherry-red text-cherry-cream"
                        : item.type === "tier 2"
                        ? "bg-cherry-red text-cherry-cream"
                        : "bg-cherry-red text-cherry-cream"
                    }`}
                  >
                    {item.type}
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-cherry-burgundy  ">
                  {item.solEarn.toFixed(1)} SOL
                </td>
              </motion.tr>
            ))}

            {/* Additional rows with smooth transition */}
            <AnimatePresence mode="wait">
              {showAllLeaderboard && (
                <>
                  {mockLeaderboardData.slice(6).map((item, index) => (
                    <motion.tr
                      key={index + 6}
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className={`border-b border-cherry-burgundy border-opacity-20 hover:bg-cherry-burgundy hover:bg-opacity-10 transition-colors ${
                        item.isUser ? "bg-opacity-10" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-cherry-burgundy">
                        <div className="flex items-center">
                          <span className={item.isUser ? " " : ""}>
                            {item.wallet.substring(0, 6)}...
                            {item.wallet.substring(item.wallet.length - 4)}
                            {item.isUser && " (You)"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-cherry-burgundy">
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cherry-red text-cherry-cream">
                          {item.type}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-cherry-burgundy  ">
                        {item.solEarn.toFixed(1)} SOL
                      </td>
                    </motion.tr>
                  ))}
                </>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="lg:hidden p-4 space-y-3">
        {mockLeaderboardData.slice(0, 6).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`winky-sans-font rounded-xl border-2 p-4 ${
              item.isUser
                ? "bg-cherry-red/10 border-cherry-red"
                : "bg-cherry-cream/60 border-[#111929]/20"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-cherry-burgundy font-medium">
                <Icon icon="mdi:wallet-outline" className="opacity-70" />
                <span>
                  {item.wallet.substring(0, 6)}...
                  {item.wallet.substring(item.wallet.length - 4)}
                  {item.isUser && " (You)"}
                </span>
              </div>
              <div className="text-right text-cherry-burgundy font-bold">
                {item.solEarn.toFixed(1)} SOL
              </div>
            </div>
            <div>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cherry-red text-cherry-cream">
                {item.type}
              </div>
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {showAllLeaderboard &&
            mockLeaderboardData.slice(6).map((item, index) => (
              <motion.div
                key={index + 6}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className={`winky-sans-font rounded-xl border-2 p-4 ${
                  item.isUser
                    ? "bg-cherry-red/10 border-cherry-red"
                    : "bg-cherry-cream/60 border-[#111929]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-cherry-burgundy font-medium">
                    <Icon icon="mdi:wallet-outline" className="opacity-70" />
                    <span>
                      {item.wallet.substring(0, 6)}...
                      {item.wallet.substring(item.wallet.length - 4)}
                      {item.isUser && " (You)"}
                    </span>
                  </div>
                  <div className="text-right text-cherry-burgundy font-bold">
                    {item.solEarn.toFixed(1)} SOL
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cherry-red text-cherry-cream">
                    {item.type}
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* See More/See Less Button */}
      <div className="flex justify-center p-6">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAllLeaderboard(!showAllLeaderboard)}
          className="bg-cherry-red text-white px-6 py-3 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2"
        >
          <span className="text-cherry-cream">
            {showAllLeaderboard ? "See Less" : "See More"}
          </span>
          <Icon
            icon={showAllLeaderboard ? "mdi:chevron-up" : "mdi:chevron-down"}
            width={20}
            height={20}
            className="text-cherry-cream transition-transform duration-300"
          />
        </motion.button>
      </div>
    </div>
  );
};

export default Leaderboard;
