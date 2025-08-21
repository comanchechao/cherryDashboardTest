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
import rewardsService from "../../services/rewardsService";

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

const Rewards: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "home" | "stake" | "comingSoon" | "leaderboard" | "rewards" | "airdrop"
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

  const { isAuthenticated, accessToken, telegramId, logout } = useAuth();

  // Fetch and process the latest wallet balance and user points
  const updateUserBalance = async () => {
    if (!isAuthenticated || !accessToken || !telegramId) {
      console.log(
        "🔒 [Rewards] User not authenticated, skipping balance update"
      );
      return;
    }

    try {
      console.log(
        "💰 [Rewards] Updating user balance for telegram ID:",
        telegramId
      );

      const balanceResponse = await rewardsService.updateBalance(
        telegramId.toString(),
        accessToken
      );

      console.log("✅ [Rewards] UpdateBalance API response:", {
        success: balanceResponse.success,
        result: balanceResponse.result,
      });

      if (balanceResponse.success && balanceResponse.result) {
        // Find the SOL wallet (parentId is null for SOL)
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

  // Fetch leaderboards on page enter
  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLeaderboardLoading(true);

        let response;

        if (isAuthenticated && accessToken && telegramId) {
          console.log(
            "🏆 [Rewards] Fetching authenticated leaderboards for telegram ID:",
            telegramId
          );
          response = await rewardsService.getLeaderboards(
            telegramId.toString(),
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

        // Store the leaderboard data and pagination info
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
  }, [isAuthenticated, accessToken, telegramId, currentPage]);

  // Ensure wallet points are fresh when opening the Airdrop tab
  useEffect(() => {
    if (activeTab === "airdrop") {
      updateUserBalance();
    }
  }, [activeTab]);

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
      // The logout function already shows a success toast
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
                      onClick={() => setActiveTab("home")}
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
                      onClick={() => setActiveTab("stake")}
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
                      onClick={() => setActiveTab("comingSoon")}
                      className={`w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-sm  text-left transition ${
                        activeTab === "comingSoon"
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      <Icon icon="mdi:clock" width={20} height={20} />
                      <span className="winky-sans-font">Coming Soon</span>
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
                    {activeTab === "comingSoon" && "Coming Soon"}
                    {activeTab === "leaderboard" && "Leaderboard"}
                    {activeTab === "rewards" && "Rewards"}
                    {activeTab === "airdrop" && "Airdrop"}
                  </h2>
                  <button
                    onClick={() => {
                      window.open(
                        "https://t.me/cherrysniperbot?start=login_cherry",
                        "_blank"
                      );
                    }}
                    className="bg-white/10 cursor-pointer hover:bg-white/20 text-white px-4 py-2 rounded-sm  border border-white/10 winky-sans-font"
                  >
                    Connect Wallet
                  </button>
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
                          <div className="winky-sans-font text-white/70 text-sm mb-2">
                            Total $AIBOT Holders
                          </div>
                          <div className="maladroit-font text-3xl text-white">
                            2,400
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
                      <div className="bg-white/5 border border-white/10 rounded-2xl">
                        <div className="border-b border-white/10 px-4 py-3">
                          <h3 className="maladroit-font text-2xl text-white">
                            Buy $AIBOT
                          </h3>
                        </div>
                        <div className="p-4 overflow-x-auto">
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
                              {/* Binance Row */}
                              <tr className="hover:bg-white/5 transition-colors duration-200">
                                <td className="py-3 pr-4 flex items-center gap-3">
                                  <a
                                    href="https://www.binance.com/en/alpha/bsc/0x96adaa33e175f4a7f20c099730bc78dd0b45745b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                  >
                                    <img
                                      src="/binanceAlpha.png"
                                      className="h-7 object-contain rounded"
                                      alt="Binance Logo"
                                    />
                                  </a>
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $863,449
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $0.006765{" "}
                                </td>
                                <td className="py-3 pr-4 text-right">
                                  <button
                                    onClick={() => {
                                      window.open(
                                        "https://www.binance.com/en/alpha/bsc/0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
                                        "_blank"
                                      );
                                    }}
                                    className="px-3 py-2 rounded-sm text-sm border bg-amber-400 text-black border-amber-400 hover:bg-amber-300 transition-colors duration-200"
                                  >
                                    Buy $AIBOT
                                  </button>
                                </td>
                              </tr>
                              {/* MEXC Row */}
                              <tr className="hover:bg-white/5 transition-colors duration-200">
                                <td className="py-3 pr-4 flex items-center gap-3">
                                  <a
                                    href="https://www.mexc.com/exchange/AIBOT_USDT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                  >
                                    <img
                                      src="/mexc.png"
                                      className="h-6 object-contain rounded"
                                      alt="MEXC Logo"
                                    />
                                  </a>
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $433,633
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $0.00688
                                </td>
                                <td className="py-3 pr-4 text-right">
                                  <button
                                    onClick={() => {
                                      window.open(
                                        "https://www.mexc.com/exchange/AIBOT_USDT",
                                        "_blank"
                                      );
                                    }}
                                    className="px-3 py-2 rounded-sm text-sm border bg-white/10 text-white border-white/10 hover:bg-white/20 transition-colors duration-200"
                                  >
                                    Buy $AIBOT
                                  </button>
                                </td>
                              </tr>
                              {/* Gate.io Row */}
                              <tr className="hover:bg-white/5 transition-colors duration-200">
                                <td className="py-3 pr-4 flex items-center gap-3">
                                  <a
                                    href="https://www.gate.com/trade/AIBOT_USDT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                  >
                                    <img
                                      src="/gate.png"
                                      className="h-5 object-contain rounded"
                                      alt="Gate.io Logo"
                                    />
                                  </a>
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $1,477,004
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $0.006758
                                </td>
                                <td className="py-3 pr-4 text-right">
                                  <button
                                    onClick={() => {
                                      window.open(
                                        "https://www.gate.com/trade/AIBOT_USDT",
                                        "_blank"
                                      );
                                    }}
                                    className="px-3 py-2 rounded-sm text-sm border bg-white/10 text-white border-white/10 hover:bg-white/20 transition-colors duration-200"
                                  >
                                    Buy $AIBOT
                                  </button>
                                </td>
                              </tr>{" "}
                              <tr className="hover:bg-white/5 transition-colors duration-200">
                                <td className="py-3 pr-4 flex items-center gap-3">
                                  <a
                                    href="https://pancakeswap.finance/swap?outputCurrency=0x96adaa33e175f4a7f20c099730bc78dd0b45745b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 flex items-center  gap-2 text-lg  maladroit-font transition-opacity"
                                  >
                                    <img
                                      src="/pancakeSwapLogo.png"
                                      className="h-5 object-contain rounded"
                                      alt="Gate.io Logo"
                                    />
                                    <h2>Pancake Swap</h2>
                                  </a>
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $4,009,422{" "}
                                </td>
                                <td className="py-3 pr-4 text-white/80">
                                  $0.006786
                                </td>
                                <td className="py-3 pr-4 text-right">
                                  <button
                                    onClick={() => {
                                      window.open(
                                        "https://pancakeswap.finance/swap?outputCurrency=0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
                                        "_blank"
                                      );
                                    }}
                                    className="px-3 py-2 rounded-sm text-sm border bg-white/10 text-white border-white/10 hover:bg-white/20 transition-colors duration-200"
                                  >
                                    Buy $AIBOT
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                        <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                          <h3 className="winky-sans-font text-white/70 text-sm mb-2">
                            Total Staked
                          </h3>
                          <div className="maladroit-font text-4xl text-white mb-4">
                            16,470,984.70
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
                                18% APY
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Robot Image Card */}
                        <div className=" rounded-sm w-full h-full overflow-hidden flex items-center justify-center">
                          <img
                            src="/dashboardRobot.png"
                            alt="Robot Image"
                            className="h-full   object-contain"
                          />
                        </div>
                      </div>

                      {/* Information Boxes */}
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
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "comingSoon" && (
                    <motion.div
                      key="comingSoon"
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
                            icon="mdi:rocket-launch"
                            width={80}
                            height={80}
                            className="text-white/70 mx-auto mb-6  "
                          />
                          <h3 className="maladroit-font text-4xl text-white mb-4">
                            Exciting Features Coming Soon!
                          </h3>
                          <p className="winky-sans-font text-white/80 text-lg max-w-2xl mx-auto">
                            We're working hard to bring you the next generation
                            of CherryAI features. Stay tuned for revolutionary
                            updates that will transform your trading experience.
                          </p>
                        </div>
                      </div>

                      {/* Newsletter Signup */}
                      <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                        <h4 className="maladroit-font text-2xl text-white mb-4">
                          Stay Updated
                        </h4>
                        <p className="winky-sans-font text-white/70 text-lg mb-6">
                          Get notified when these features launch and receive
                          exclusive early access!
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
                            telegramId={telegramId?.toString()}
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
