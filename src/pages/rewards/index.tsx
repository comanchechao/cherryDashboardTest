import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import RewardSection from "./components/rewardSection";
import AchievementsModal from "./components/AchievementsModal";
import StatCards from "./components/statCards";
import Leaderboard from "./components/leaderboard";
// import PointsLeaderboard from "./components/pointsLeaderboard";
import CherryAirdrop from "./components/cherryAirdrop";
import { useAuth } from "../../components/AuthProvider";
import UnifiedAuth from "../../components/UnifiedAuth";
import rewardsService from "../../services/rewardsService";
import { useWalletConnection } from "../../hooks/useWalletConnection";

const customAnimations = `
    @keyframes float-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    @keyframes pulse-gentle {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes spin-orbital {
      from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
      to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
    }
    @keyframes dash-animate {
      to { stroke-dashoffset: -100; }
    }
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
    @keyframes bounce-subtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes glow-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(214, 2, 77, 0.3); }
      50% { box-shadow: 0 0 30px rgba(214, 2, 77, 0.6); }
    }
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    .referral-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200px 100%;
      animation: shimmer 2s infinite;
    }
    .referral-glow {
      animation: glow-pulse 3s ease-in-out infinite;
    }
    .referral-bounce {
      animation: bounce-subtle 2s ease-in-out infinite;
    }
  `;

// This component is now accessible via /dashboard route
const Rewards: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);

  const [modalPhase, setModalPhase] = useState<"info" | "eligibility">("info");
  const [isEligible] = useState(true); // For now, set to true as requested
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "stake"
    | "stakingLeaderboard"
    | "pointsStored"
    | "stakingTiers"
    | "leaderboard"
    | "rewards"
    | "airdrop"
  >("home");
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [userWalletInfo, setUserWalletInfo] = useState<{
    solAddress: string;
    solBalance: string;
    solBalanceUSD: string;
    tokens: Array<{
      symbol: string;
      balance: string;
      name: string;
    }>;
    userPoints: number;
    totalUsdVolume: number;
    tier: string;
  } | null>(null);

  // Cherry stats state (contains both holder count and market data)
  const [cherryStats, setCherryStats] = useState<any>(null);
  const [cherryStatsLoading, setCherryStatsLoading] = useState(false);

  const { isAuthenticated, user, accessToken, logout } = useAuth();
  const { connected } = useWalletConnection();

  // Function to handle tab changes and update URL hash
  const handleTabChange = (
    tab:
      | "home"
      | "stake"
      | "stakingLeaderboard"
      | "pointsStored"
      | "stakingTiers"
      | "leaderboard"
      | "rewards"
      | "airdrop"
  ) => {
    setActiveTab(tab);

    // Update URL hash without page reload
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${tab}`);
    } else {
      // Fallback for older browsers
      window.location.hash = `#${tab}`;
    }
  };

  const getExchangeLogo = (exchangeName: string) => {
    if (exchangeName.includes("Pancake")) {
      return "/pancakeSwapLogo.png";
    } else if (exchangeName.includes("Binance")) {
      return "/binanceLogo1.png";
    } else if (exchangeName.includes("MEXC")) {
      return "/mexc.png";
    } else if (exchangeName.includes("Gate")) {
      return "/gate.png";
    }
    return "";
  };

  const fetchCherryStats = async () => {
    try {
      setCherryStatsLoading(true);

      if (!accessToken) {
        console.log("No access token available, skipping cherry stats fetch");
        return;
      }

      const response = await fetch(
        "https://sniper.cherrybot.ai/api/v1/stats/cherry",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCherryStats(data);
    } catch (error) {
      console.error("Failed to fetch cherry stats:", error);
    } finally {
      setCherryStatsLoading(false);
    }
  };

  const updateUserBalance = async () => {
    if (!isAuthenticated || !accessToken || !user) {
      console.log(
        "🔒 [Rewards] User not authenticated, skipping balance update"
      );
      return;
    }

    try {
      console.log(
        "💰 [Rewards] Updating user balance for wallet address:",
        user.walletAddress
      );

      const balanceResponse = await rewardsService.updateBalance(
        user.walletAddress,
        accessToken!
      );

      console.log("✅ [Rewards] UpdateBalance API response:", {
        success: balanceResponse.success,
        result: balanceResponse.result,
      });

      if (balanceResponse.success && balanceResponse.result) {
        const solWallet = balanceResponse.result.find(
          (wallet) => wallet.parentId === null
        );
        const tokenWallets = balanceResponse.result.filter(
          (wallet) => wallet.parentId !== null
        );

        if (solWallet) {
          const processedWalletInfo = {
            solAddress: solWallet.address,
            solBalance: solWallet.confirmedBalance,
            solBalanceUSD: solWallet.confirmedBalanceUSD || "0",
            tokens: tokenWallets.map((wallet) => ({
              symbol: wallet.token.symbol,
              balance: wallet.confirmedBalance,
              name: wallet.token.name,
            })),
            userPoints: balanceResponse.userPoint?.points || 0,
            totalUsdVolume: balanceResponse.userPoint?.totalUsdVolume || 0,
            tier: balanceResponse.userPoint?.tier || "Default",
          };

          setUserWalletInfo(processedWalletInfo);

          console.log("💰 [Rewards] Processed wallet info:", {
            solAddress: processedWalletInfo.solAddress,
            solBalance: processedWalletInfo.solBalance,
            solBalanceUSD: processedWalletInfo.solBalanceUSD,
            tokensCount: processedWalletInfo.tokens.length,
            userPoints: processedWalletInfo.userPoints,
            tier: processedWalletInfo.tier,
          });
        }
      }
    } catch (error: any) {
      console.error("❌ [Rewards] Failed to update balance:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  };

  const userAchievement = {
    badge: "Diamond",
    level: 5,
    points: 98400,
    volume: "$100,000",
    nextBadge: "Ruby",
    nextVolume: "$250,000",
    nextPoints: 150000,
    progress: 75,
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);
    return () => {
      styleSheet.remove();
    };
  }, []);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLeaderboardLoading(true);

        let response;

        if (isAuthenticated && accessToken && user?.walletAddress) {
          console.log(
            "🏆 [Rewards] Fetching authenticated leaderboards for wallet:",
            user.walletAddress
          );
          response = await rewardsService.getLeaderboards(
            user.walletAddress,
            currentPage, // pageNumber
            10, // pageSize
            accessToken
          );
        } else {
          console.log(
            "🏆 [Rewards] Fetching public leaderboards (unauthenticated)"
          );
          response = await rewardsService.getPublicLeaderboards(
            currentPage, // pageNumber
            10 // pageSize
          );
        }

        console.log("✅ [Rewards] Leaderboards API response:", {
          success: response.success,
          totalUsers: response.result?.totalCount,
          usersInPage: response.result?.leaderboards?.length,
          pageInfo: {
            pageNumber: response.result?.pageNumber,
            pageSize: response.result?.pageSize,
            totalPages: response.result?.totalPages,
            isLastPage: response.result?.isLastPage,
          },
          sampleUser: response.result?.leaderboards?.[0],
        });

        if (response.success && response.result?.leaderboards) {
          setLeaderboardData(response.result.leaderboards);
          setTotalPages(response.result.totalPages || 1);
          setTotalCount(response.result.totalCount || 0);
        }
      } catch (error: any) {
        console.error("❌ [Rewards] Failed to fetch leaderboards:", {
          error: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchLeaderboards();
    updateUserBalance();
  }, [isAuthenticated, accessToken, user?.walletAddress, currentPage]);

  useEffect(() => {
    if (activeTab === "airdrop") {
      updateUserBalance();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchCherryStats(); // Fetch cherry stats on startup

    const statsInterval = setInterval(fetchCherryStats, 300000); // Update every 5 minutes

    return () => {
      clearInterval(statsInterval);
    };
  }, [accessToken]);

  // Sync with URL hash on page load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash &&
        [
          "home",
          "stake",
          "stakingLeaderboard",
          "pointsStored",
          "stakingTiers",
          "leaderboard",
          "rewards",
          "airdrop",
        ].includes(hash)
      ) {
        setActiveTab(hash as any);
      }
    };

    // Check initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTrade = () => {
    window.open("https://t.me/cherrysniperbot", "_blank");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="section_sniper_spotlight py-24 relative overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Navbar />
          <div className="relative mt-8">
            <div className="flex gap-6">
              {/* Left Sidebar Tabs */}
              <aside className="w-64 hidden md:flex flex-col justify-between bg-white/5 border border-white/10 rounded-sm  p-4 backdrop-blur-sm">
                <div>
                  <div className="maladroit-font text-xl text-white mb-4 px-2">
                    <img
                      src="/cherryTextLogo.webp"
                      alt="CherryAI"
                      className="w-full   object-contain"
                    />
                  </div>
                  <nav className="space-y-2">
                    <button
                      onClick={() => handleTabChange("home")}
                      className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                        activeTab === "home"
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      <Icon icon="mdi:home" width={20} height={20} />
                      <span className="winky-sans-font">Home</span>
                    </button>
                    <button
                      onClick={() => handleTabChange("stake")}
                      className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                        activeTab === "stake"
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      <Icon icon="mdi:finance" width={20} height={20} />
                      <span className="winky-sans-font">Stake $AIBOT</span>
                    </button>
                    <button
                      onClick={() => handleTabChange("stakingLeaderboard")}
                      className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                        activeTab === "stakingLeaderboard"
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      <Icon icon="tabler:trophy" width={20} height={20} />
                      <span className="winky-sans-font">
                        Staking Leaderboard
                      </span>
                    </button>
                    <button
                      onClick={() => handleTabChange("pointsStored")}
                      className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                        activeTab === "pointsStored"
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      <Icon icon="mdi:database" width={20} height={20} />
                      <span className="winky-sans-font">Points Stored</span>
                    </button>
                    <button
                      onClick={() => handleTabChange("stakingTiers")}
                      className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                        activeTab === "stakingTiers"
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      <Icon icon="mdi:layers" width={20} height={20} />
                      <span className="winky-sans-font">Staking Tiers</span>
                    </button>
                    <div className="h-px bg-white/10 my-4" />
                    {/* <button
                        onClick={() => setActiveTab("leaderboard")}
                        className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                          activeTab === "leaderboard"
                            ? "bg-white/10 text-white"
                            : "hover:bg-white/5 text-white"
                        }`}
                      >
                        <Icon icon="tabler:trophy" width={20} height={20} />
                        <span className="winky-sans-font">Leaderboard</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("rewards")}
                        className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                          activeTab === "rewards"
                            ? "bg-white/10 text-white"
                            : "hover:bg-white/5 text-white"
                        }`}
                      >
                        <Icon icon="mdi:gift" width={20} height={20} />
                        <span className="winky-sans-font">Rewards</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("airdrop")}
                        className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                          activeTab === "airdrop"
                            ? "bg-white/10 text-white"
                            : "hover:bg-white/5 text-white"
                        }`}
                      >
                        <Icon icon="mdi:airplane" width={20} height={20} />
                        <span className="winky-sans-font">Airdrop</span>
                      </button> */}
                  </nav>
                </div>
                <div className="px-2">
                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition hover:bg-white/5 text-white"
                    >
                      <Icon icon="mdi:logout" width={20} height={20} />
                      <span className="winky-sans-font">Log Out</span>
                    </button>
                  )}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Header Bar */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-sm px-4 py-3 mb-6">
                  <h2 className="maladroit-font text-2xl md:text-3xl text-white">
                    {activeTab === "home" && "Home"}
                    {activeTab === "stake" && "Stake $AIBOT"}
                    {activeTab === "stakingLeaderboard" &&
                      "Staking Leaderboard"}
                    {activeTab === "pointsStored" && "Point Store"}
                    {activeTab === "stakingTiers" && "Staking Tiers"}
                    {activeTab === "leaderboard" && "Leaderboard"}
                    {activeTab === "rewards" && "Rewards"}
                    {activeTab === "airdrop" && "Airdrop"}
                  </h2>
                  <UnifiedAuth />
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "home" && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="winky-sans-font text-white/70 text-sm">
                              Total $AIBOT Holders
                            </div>
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            {cherryStatsLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400"></div>
                                <span className="text-2xl">...</span>
                              </div>
                            ) : cherryStats?.result?.holders ? (
                              <div>
                                {cherryStats.result.holders.toLocaleString()}
                              </div>
                            ) : (
                              <div>-</div>
                            )}
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                          <div className="winky-sans-font text-white/70 text-sm mb-2">
                            Total $AIBOT Stakers
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            -
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                          <div className="winky-sans-font text-white/70 text-sm mb-2">
                            Total $AIBOT Staked
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            -
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                          <div className="winky-sans-font text-white/70 text-sm mb-2">
                            APR
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            5% - 17%
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                          <div className="winky-sans-font text-white/70 text-sm mb-2">
                            $AIBOT BuyBacks
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            -
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                          <div className="winky-sans-font text-white/70 text-sm mb-2">
                            $AIBOT Burns
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            -
                          </div>
                        </div>
                      </div>

                      {/* Buy Section */}
                      <div className="bg-white/5 border border-white/10 rounded-sm">
                        <div className="border-b border-white/10 px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <h3 className="maladroit-font text-2xl text-white">
                              Buy $AIBOT
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          {cherryStatsLoading ? (
                            <div className="flex justify-center items-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
                            </div>
                          ) : cherryStats?.result?.markets &&
                            cherryStats.result.markets.length > 0 ? (
                            <table className="min-w-full">
                              <thead>
                                <tr className="text-left text-white/60 winky-sans-font text-sm">
                                  <th className="py-2 pr-4">Exchange</th>
                                  <th className="py-2 pr-4">24h Volume</th>
                                  <th className="py-2 pr-4">Price</th>
                                  <th className="py-2 pr-4"></th>
                                </tr>
                              </thead>
                              <tbody className="text-white winky-sans-font">
                                {(() => {
                                  const filteredMarkets = [];

                                  const binanceAlpha =
                                    cherryStats.result.markets.find((m: any) =>
                                      m.exchangeName.includes("Binance")
                                    );
                                  if (binanceAlpha)
                                    filteredMarkets.push(binanceAlpha);

                                  const mexc = cherryStats.result.markets.find(
                                    (m: any) => m.exchangeName.includes("MEXC")
                                  );
                                  if (mexc) filteredMarkets.push(mexc);

                                  const gate = cherryStats.result.markets.find(
                                    (m: any) => m.exchangeName.includes("Gate")
                                  );
                                  if (gate) filteredMarkets.push(gate);

                                  const pancakeSwap =
                                    cherryStats.result.markets.find(
                                      (m: any) =>
                                        m.exchangeName.includes("Pancake") &&
                                        m.rank === 1
                                    );
                                  if (pancakeSwap)
                                    filteredMarkets.push(pancakeSwap);

                                  return filteredMarkets.map(
                                    (market: any, index: number) => (
                                      <tr
                                        key={market.marketId}
                                        className="hover:bg-white/5 transition-colors duration-200"
                                      >
                                        <td className="py-3 pr-4 flex items-center gap-3">
                                          <a
                                            href={market.marketUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:opacity-80 transition-opacity flex items-center gap-2"
                                          >
                                            <img
                                              src={getExchangeLogo(
                                                market.exchangeName
                                              )}
                                              className="h-6 object-contain rounded"
                                              alt={`${market.exchangeName} Logo`}
                                            />
                                            <span className="text-sm">
                                              {market.exchangeName}
                                            </span>
                                          </a>
                                        </td>
                                        <td className="py-3 pr-4 text-white/80">
                                          ${market.volumeUsd.toLocaleString()}
                                        </td>
                                        <td className="py-3 pr-4 text-white/80">
                                          ${market.price.toFixed(6)}
                                        </td>
                                        <td className="py-3 pr-4 text-right">
                                          <button
                                            onClick={() => {
                                              window.open(
                                                market.marketUrl,
                                                "_blank"
                                              );
                                            }}
                                            className={`px-3 py-2 rounded-sm text-sm border transition-colors duration-200 ${
                                              market.exchangeName.includes(
                                                "Binance"
                                              )
                                                ? "bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-300"
                                                : index === 0
                                                ? "bg-white/10 text-white border-white/10 hover:bg-white/20"
                                                : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                                            }`}
                                          >
                                            Buy $AIBOT
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  );
                                })()}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center py-8 text-white/60">
                              <div className="mb-3">
                                No market data available
                              </div>
                              <button
                                onClick={fetchCherryStats}
                                className="px-4 py-2 text-sm border border-white/20 text-white/80 hover:bg-white/10 transition-colors duration-200 rounded"
                              >
                                Try Again
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Placeholder panel to match layout spacing */}
                      <div className="bg-white/5 border border-white/10 rounded-sm h-40">
                        <div className="flex items-start justify-start p-4 h-full">
                          <div className=" maladroit-font  text-[var(--color-text-primary)] text-xl mb-2">
                            $AIBOT Burn TXs
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "stake" && (
                    <motion.div
                      key="stake"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Main Staking Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Total Staked Card */}
                        <div className="flex flex-col gap-4">
                          {" "}
                          <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                            <h3 className="winky-sans-font text-white/70 text-sm mb-2">
                              Total Staked
                            </h3>
                            <div className="maladroit-font text-2xl text-white mb-4">
                              - $AIBOT
                            </div>

                            {/* Graph Placeholder */}
                            <div className="w-full h-40   rounded-sm mb-4 flex items-center justify-center">
                              <img
                                src="/chartFake.png"
                                alt="Chart"
                                className="w-full h-full object-contain"
                              />
                              {/* Place chart image here later */}
                            </div>

                            {/* APY Rates Grid */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/5 rounded-sm p-3 text-center">
                                <div className="winky-sans-font text-white/70 text-xs mb-1">
                                  Base
                                </div>
                                <div className="maladroit-font text-lg text-white">
                                  5% APY
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-sm p-3 text-center">
                                <div className="winky-sans-font text-white/70 text-xs mb-1">
                                  30D Lock
                                </div>
                                <div className="maladroit-font text-lg text-white">
                                  10% APY
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-sm p-3 text-center">
                                <div className="winky-sans-font text-white/70 text-xs mb-1">
                                  6M Lock
                                </div>
                                <div className="maladroit-font text-lg text-white">
                                  14% APY
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-sm p-3 text-center">
                                <div className="winky-sans-font text-white/70 text-xs mb-1">
                                  1Y Lock
                                </div>
                                <div className="maladroit-font text-lg text-white">
                                  17% APY
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Robot Image Card */}
                        </div>
                        {!connected ? (
                          <div className=" rounded-sm w-full h-fit overflow-hidden flex flex-col items-center justify-center">
                            <img
                              src="/dashboardRobot.png"
                              alt="Robot Image"
                              className="h-full object-contain mb-4"
                            />
                          </div>
                        ) : (
                          <div className=" rounded-sm w-full h-full overflow-hidden">
                            {/* Your Stake Card */}
                            <div className="bg-white/5 border border-white/10 rounded-sm p-6 h-full">
                              <h3 className="maladroit-font text-white/70 text-sm mb-4">
                                Your Stake
                              </h3>

                              <div className="space-y-4 mb-6">
                                <div className="flex flex-col justify-between items-start">
                                  <span className="maladroit-font text-white/70 text-sm">
                                    Your Stake:
                                  </span>
                                  <span className="maladroit-font text-3xl text-white">
                                    1000 $AIBOT
                                  </span>
                                </div>

                                <div className="flex flex-col justify-between items-start">
                                  <span className="maladroit-font text-white/70 text-sm">
                                    Cherry Points Earned:
                                  </span>
                                  <span className="maladroit-font text-3xl text-white">
                                    400
                                  </span>
                                </div>

                                <div className="flex flex-col justify-between items-start">
                                  <span className="maladroit-font text-white/70 text-sm">
                                    Your APR:
                                  </span>
                                  <span className="maladroit-font text-lg text-white/70">
                                    Coming Soon
                                  </span>
                                </div>

                                <div className="flex flex-col justify-between items-start">
                                  <span className="maladroit-font text-white/70 text-sm">
                                    Lockup Time:
                                  </span>
                                  <span className="maladroit-font text-lg text-white/70">
                                    Coming Soon
                                  </span>
                                </div>

                                <div className="flex flex-col justify-between items-start">
                                  <span className="text-white/70 text-white/70 text-sm">
                                    $AIBOT Earned:
                                  </span>
                                  <span className="maladroit-font text-lg text-white/70">
                                    Coming Soon
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="space-y-4">
                          <div className="bg-white/5 border border-white/10 rounded-sm p-4 flex items-start gap-3">
                            <Icon
                              icon="mdi:lock"
                              width={20}
                              height={20}
                              className="text-white/70 mt-0.5"
                            />
                            <div>
                              <p className="winky-sans-font text-white text-sm">
                                Locking $AIBOT set APY for your lock duration.
                                After your lock period ends you will continue to
                                earn at the base APY rate.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-sm p-4 flex items-start gap-3">
                            <Icon
                              icon="mdi:refresh"
                              width={20}
                              height={20}
                              className="text-white/70 mt-0.5"
                            />
                            <div>
                              <p className="winky-sans-font text-white text-sm">
                                Staking $AIBOT also grants stakers with CherryAI
                                points which can be used to buy lootboxes that
                                contain rewards.
                              </p>
                            </div>
                          </div>
                        </div>{" "}
                        <div className="flex h-fit justify-center">
                          <button
                            onClick={() => {
                              setShowStakeModal(true);
                              setModalPhase("info");
                            }}
                            className="flex items-center gap-3 px-6 py-3 bg-[#020e1f] cursor-pointer text-[var(--color-accent)] rounded-sm border border-[var(--color-accent)]/30 hover:from-[var(--color-accent)]/30 hover:to-[var(--color-accent)]/30 transition-all duration-300 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-accent/25"
                          >
                            <Icon
                              icon="mdi:lock"
                              className="w-5 h-5 text-accent"
                            />
                            <span>Stake $AIBOT</span>
                          </button>
                        </div>
                      </div>

                      {/* Information Boxes */}
                    </motion.div>
                  )}
                  {activeTab === "stakingLeaderboard" && (
                    <motion.div
                      key="stakingLeaderboard"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Hero Section */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-8 text-center">
                        <div className="mb-6">
                          <Icon
                            icon="tabler:trophy"
                            width={60}
                            height={60}
                            className="text-white/70 mx-auto mb-6  "
                          />
                          <h3 className="maladroit-font text-2xl text-white mb-4">
                            Staking Leaderboard Coming Soon!
                          </h3>
                        </div>
                      </div>

                      {/* Newsletter Signup */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                        <h4 className="maladroit-font text-2xl text-white mb-4">
                          Stay Updated
                        </h4>
                        <p className="winky-sans-font text-white/70 text-lg mb-6">
                          Get notified when the staking leaderboard launches and
                          receive exclusive early access!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 winky-sans-font focus:outline-none focus:border-white/40"
                          />
                          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-sm border border-white/20 winky-sans-font transition-all duration-200 hover:scale-105">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "pointsStored" && (
                    <motion.div
                      key="pointsStored"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Hero Section */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-8 text-center">
                        <div className="mb-6">
                          <Icon
                            icon="mdi:database"
                            width={60}
                            height={60}
                            className="text-white/70 mx-auto mb-6  "
                          />
                          <h3 className="maladroit-font text-2xl text-white mb-4">
                            Points Stored Coming Soon!
                          </h3>
                        </div>
                      </div>

                      {/* Newsletter Signup */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                        <h4 className="maladroit-font text-2xl text-white mb-4">
                          Stay Updated
                        </h4>
                        <p className="winky-sans-font text-white/70 text-lg mb-6">
                          Get notified when the points storage system launches
                          and receive exclusive early access!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 winky-sans-font focus:outline-none focus:border-white/40"
                          />
                          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-sm border border-white/20 winky-sans-font transition-all duration-200 hover:scale-105">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "stakingTiers" && (
                    <motion.div
                      key="stakingTiers"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Hero Section */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-8 text-center">
                        <div className="mb-6">
                          <Icon
                            icon="mdi:layers"
                            width={60}
                            height={60}
                            className="text-white/70 mx-auto mb-6  "
                          />
                          <h3 className="maladroit-font text-2xl text-white mb-4">
                            Staking Tiers Coming Soon!
                          </h3>
                        </div>
                      </div>

                      {/* Newsletter Signup */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                        <h4 className="maladroit-font text-2xl text-white mb-4">
                          Stay Updated
                        </h4>
                        <p className="winky-sans-font text-white/70 text-lg mb-6">
                          Get notified when the staking tiers system launches
                          and receive exclusive early access!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 winky-sans-font focus:outline-none focus:border-white/40"
                          />
                          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-sm border border-white/20 winky-sans-font transition-all duration-200 hover:scale-105">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "leaderboard" && (
                    <motion.div
                      key="leaderboard"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <Leaderboard
                        leaderboardData={leaderboardData}
                        loading={leaderboardLoading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                      />
                      {/* <PointsLeaderboard /> */}
                    </motion.div>
                  )}

                  {activeTab === "rewards" && (
                    <motion.div
                      key="rewards"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {!isAuthenticated ? (
                        <div className="bg-cherry-cream w-full rounded-sm border-4 border-[#111929] overflow-hidden shadow-[8px_8px_0px_#111929] relative mb-8">
                          {/* Header */}
                          <div className="bg-black px-4 lg:px-6 py-4 flex items-center justify-between">
                            <h3 className="maladroit-font text-sm lg:text-2xl text-white flex items-center gap-2">
                              <Icon
                                icon="mdi:gift"
                                width={28}
                                height={28}
                                className="text-cherry-red  "
                              />
                              Your Rewards Dashboard
                            </h3>
                          </div>

                          {/* Login Prompt */}
                          <div className="p-8 text-center">
                            <div className="mb-6">
                              <Icon
                                icon="mdi:lock"
                                width={64}
                                height={64}
                                className="text-white mx-auto mb-4"
                              />
                              <h4 className="maladroit-font text-2xl text-white mb-4">
                                Login Required
                              </h4>
                              <p className="winky-sans-font text-white text-lg mb-6">
                                Please log in to your account to view your
                                personal rewards dashboard
                              </p>
                            </div>

                            <div className="bg-cherry-burgundy/10 rounded-sm  p-6 mb-6 border-2 border-cherry-burgundy">
                              <h5 className="winky-sans-font text-white font-bold mb-3">
                                What you'll see:
                              </h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Icon
                                    icon="mdi:check-circle"
                                    className="text-cherry-red"
                                    width={16}
                                    height={16}
                                  />
                                  <span className="winky-sans-font text-white">
                                    Your trading points and achievements
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    icon="mdi:check-circle"
                                    className="text-cherry-red"
                                    width={16}
                                    height={16}
                                  />
                                  <span className="winky-sans-font text-white">
                                    Wallet balance and token holdings
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    icon="mdi:check-circle"
                                    className="text-cherry-red"
                                    width={16}
                                    height={16}
                                  />
                                  <span className="winky-sans-font text-white">
                                    Referral earnings and commission
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    icon="mdi:check-circle"
                                    className="text-cherry-red"
                                    width={16}
                                    height={16}
                                  />
                                  <span className="winky-sans-font text-white">
                                    Exclusive rewards and airdrops
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                window.open(
                                  "https://t.me/cherrysniperbot?start=login_cherry",
                                  "_blank"
                                );
                              }}
                              className="bg-cherry-red text-white font-bold py-4 px-8 rounded-sm  border-2 border-cherry-burgundy hover:border-b-4 hover:border-r-4 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu   hover:  winky-sans-font flex items-center justify-center gap-3 mx-auto"
                            >
                              <Icon
                                icon="ic:baseline-telegram"
                                width={24}
                                height={24}
                                className="text-white"
                              />
                              <span className="text-white">Connect Wallet</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <RewardSection
                            toastVisible={toastVisible}
                            setToastVisible={setToastVisible}
                            successToastVisible={successToastVisible}
                            setSuccessToastVisible={setSuccessToastVisible}
                            alreadySubscribedToastVisible={
                              alreadySubscribedToastVisible
                            }
                            setAlreadySubscribedToastVisible={
                              setAlreadySubscribedToastVisible
                            }
                            showAchievementsModal={showAchievementsModal}
                            setShowAchievementsModal={setShowAchievementsModal}
                            handleTrade={handleTrade}
                            handleLogout={handleLogout}
                            copyToClipboard={copyToClipboard}
                            userAchievement={userAchievement}
                            userWalletInfo={userWalletInfo}
                            telegramId={user?.walletAddress}
                            accessToken={accessToken || undefined}
                          />
                          <StatCards
                            userPoints={userWalletInfo?.userPoints || 0}
                          />
                        </>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "airdrop" && (
                    <motion.div
                      key="airdrop"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {!isAuthenticated ? (
                        <div className="bg-cherry-cream rounded-sm border-4 border-[#111929] overflow-hidden shadow-[8px_8px_0px_#111929] relative mb-8">
                          {/* Header */}
                          <div className="bg-black px-4 lg:px-6 py-4 flex items-center justify-between">
                            <h3 className="maladroit-font text-sm lg:text-2xl text-white flex items-center gap-2">
                              <Icon
                                icon="mdi:airplane"
                                width={28}
                                height={28}
                                className="text-cherry-red  "
                              />
                              Airdrop – Login Required
                            </h3>
                          </div>

                          {/* Login Prompt */}
                          <div className="p-8 text-center">
                            <div className="mb-6">
                              <Icon
                                icon="mdi:lock"
                                width={64}
                                height={64}
                                className="text-white mx-auto mb-4"
                              />
                              <h4 className="maladroit-font text-2xl text-white mb-4">
                                Login to View Your Points
                              </h4>
                              <p className="winky-sans-font text-white text-lg mb-6">
                                Sign in with Telegram to see your points and
                                estimated $AIBOT tokens
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                window.open(
                                  "https://t.me/cherrysniperbot?start=login_cherry",
                                  "_blank"
                                );
                              }}
                              className="bg-cherry-red text-white font-bold py-4 px-8 rounded-sm  border-2 border-cherry-burgundy hover:border-b-4 hover:border-r-4 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu   hover:  winky-sans-font flex items-center justify-center gap-3 mx-auto"
                            >
                              <Icon
                                icon="ic:baseline-telegram"
                                width={24}
                                height={24}
                                className="text-white"
                              />
                              <span className="text-white">
                                Login with Telegram
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <CherryAirdrop
                          userPoints={userWalletInfo?.userPoints || 0}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full flex gap-10 h-auto items-start flex-col lg:flex-row justify-center">
                  {/* How It Works Modal */}
                  {showHowItWorksModal && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                      onClick={() => setShowHowItWorksModal(false)}
                    >
                      <div
                        className="bg-cherry-cream rounded-sm border-4 border-cherry-burgundy   max-w-md w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Modal Header */}
                        <div className="bg-black px-6 py-4 flex items-center justify-between">
                          <h3 className="maladroit-font text-xl text-white flex items-center gap-2">
                            <Icon
                              icon="mdi:lightbulb"
                              width={24}
                              height={24}
                              className="text-white"
                            />
                            How It Works
                          </h3>
                          <button
                            onClick={() => setShowHowItWorksModal(false)}
                            className="text-white hover:text-cherry-red transition-colors"
                          >
                            <Icon icon="mdi:close" width={24} height={24} />
                          </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                          <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="winky-sans-font text-sm text-white font-bold">
                                  1
                                </span>
                              </div>
                              <div>
                                <h4 className="winky-sans-font text-base leading-tight text-white    ">
                                  Share Your Link
                                </h4>
                                <p className="winky-sans-font text-white text-sm">
                                  Share your unique referral link with friends
                                  and family
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="winky-sans-font text-sm text-white font-bold">
                                  2
                                </span>
                              </div>
                              <div>
                                <h4 className="winky-sans-font text-base leading-tight text-white    ">
                                  They Start Trading
                                </h4>
                                <p className="winky-sans-font text-white text-sm">
                                  Your friends sign up and start trading using
                                  SniperAI Bot
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="winky-sans-font text-sm text-white font-bold">
                                  3
                                </span>
                              </div>
                              <div>
                                <h4 className="winky-sans-font text-base leading-tight text-white    ">
                                  You Earn Commission
                                </h4>
                                <p className="winky-sans-font text-white text-sm">
                                  You earn up to 55% commission on all their
                                  trading fees automatically
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Earnings Breakdown */}
                          <div className="bg-cherry-burgundy/10  rounded-sm p-4 mb-6">
                            <h5 className="winky-sans-font text-white font-bold mb-3">
                              Commission Breakdown:
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="winky-sans-font text-white">
                                  Direct Referrals:
                                </span>
                                <span className="winky-sans-font text-white font-bold">
                                  55%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="winky-sans-font text-white">
                                  Indirect Referrals:
                                </span>
                                <span className="winky-sans-font text-white font-bold">
                                  5%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="winky-sans-font text-white">
                                  Extended Network:
                                </span>
                                <span className="winky-sans-font text-white font-bold">
                                  2.5%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <button
                            onClick={() => {
                              copyToClipboard(
                                "https://t.me/CherrySniperBot?start=ref_GihKTmp"
                              );
                              setShowHowItWorksModal(false);
                            }}
                            className="w-full bg-cherry-red text-white font-bold py-3 px-6 rounded-sm  border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu   hover:  winky-sans-font flex items-center justify-center gap-2"
                          >
                            <Icon
                              icon="mdi:content-copy"
                              width={20}
                              height={20}
                              className="text-white"
                            />
                            <span className="text-white">Copy and Start</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Achievements Modal */}
                  <AchievementsModal
                    visible={showAchievementsModal}
                    onClose={() => setShowAchievementsModal(false)}
                  />

                  {/* Stake AIBOT Modal */}
                  <AnimatePresence>
                    {showStakeModal && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowStakeModal(false)}
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                          }}
                          className="bg-[#020e1f] border border-white/10 rounded-lg p-8 max-w-md w-full backdrop-blur-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {modalPhase === "info" && (
                            <div className="text-center mb-6">
                              <Icon
                                icon="mdi:wallet"
                                width={60}
                                height={60}
                                className="text-accent mx-auto mb-4"
                              />
                              <h3 className="maladroit-font text-2xl text-white mb-2">
                                Stake $AIBOT
                              </h3>
                            </div>
                          )}

                          {!connected ? (
                            <div className="space-y-4">
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                                <Icon
                                  icon="mdi:wallet-off"
                                  width={40}
                                  height={40}
                                  className="text-white/50 mx-auto mb-3"
                                />
                                <p className="winky-sans-font text-white/70 text-sm mb-4">
                                  You need to connect your wallet to stake
                                  $AIBOT
                                </p>
                                <UnifiedAuth />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {modalPhase === "info" ? (
                                /* Info Phase */
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                  <div className="text-center mb-6">
                                    <Icon
                                      icon="mdi:information"
                                      width={60}
                                      height={60}
                                      className="text-blue-400 mx-auto mb-4"
                                    />

                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                                      <Icon
                                        icon="mdi:alert-circle"
                                        width={24}
                                        height={24}
                                        className="text-yellow-400 inline mr-2"
                                      />
                                      <span className="winky-sans-font text-yellow-400 text-sm">
                                        Buying or Selling $AIBOT during staking
                                        could increase or decrease the rate that
                                        you earn points
                                      </span>
                                    </div>
                                    <p className="winky-sans-font text-white/70 text-sm">
                                      Please read the information above
                                      carefully before proceeding to stake your
                                      $AIBOT tokens.
                                    </p>
                                  </div>

                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => setShowStakeModal(false)}
                                      className="flex-1 bg-white/10  cursor-pointer hover:bg-white/20 text-white px-6 py-3 rounded-sm border border-white/20 winky-sans-font transition-all duration-200"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => setModalPhase("eligibility")}
                                      className="flex-1 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)]/30 cursor-pointer winky-sans-font font-medium transition-all duration-200 hover:bg-[var(--color-accent)]/80"
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                /* Eligibility Phase */
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                  <div className="text-center mb-6">
                                    <Icon
                                      icon={
                                        isEligible
                                          ? "mdi:check-circle"
                                          : "mdi:close-circle"
                                      }
                                      width={60}
                                      height={60}
                                      className={
                                        isEligible
                                          ? "text-green-400 mx-auto mb-4"
                                          : "text-red-400 mx-auto mb-4"
                                      }
                                    />
                                    <h4 className="maladroit-font text-xl text-white mb-4">
                                      Eligibility Check
                                    </h4>
                                    {isEligible ? (
                                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                                        <Icon
                                          icon="mdi:check-circle"
                                          width={24}
                                          height={24}
                                          className="text-green-400 inline mr-2"
                                        />
                                        <span className="winky-sans-font text-green-400 text-sm">
                                          You are eligible to stake $AIBOT!
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                                        <Icon
                                          icon="mdi:close-circle"
                                          width={24}
                                          height={24}
                                          className="text-red-400 inline mr-2"
                                        />
                                        <span className="winky-sans-font text-red-400 text-sm">
                                          Minimum amount of $AIBOT required is
                                          1000
                                        </span>
                                      </div>
                                    )}
                                    <p className="winky-sans-font text-white/70 text-sm mb-6">
                                      {isEligible
                                        ? "You meet all the requirements to participate in staking. You can now proceed to stake your tokens."
                                        : "You need to have at least 1000 $AIBOT tokens to be eligible for staking."}
                                    </p>
                                  </div>

                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => setModalPhase("info")}
                                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm border border-white/20 winky-sans-font transition-all duration-200 cursor-pointer"
                                    >
                                      Back
                                    </button>
                                    {isEligible ? (
                                      <button
                                        onClick={() => setShowStakeModal(false)}
                                        className="flex-1 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)]/30 cursor-pointer winky-sans-font font-medium transition-all duration-200 hover:bg-[var(--color-accent)]/80"
                                      >
                                        Stake
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => setShowStakeModal(false)}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm border border-white/20 winky-sans-font transition-all duration-200"
                                      >
                                        Close
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rewards;
