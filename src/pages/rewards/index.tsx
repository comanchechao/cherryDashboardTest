import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import RewardSection from "./components/rewardSection";
import StatCards from "./components/statCards";
import Leaderboard from "./components/leaderboard";
import PointsLeaderboard from "./components/pointsLeaderboard";
import CherryAirdrop from "./components/cherryAirdrop";

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

const mockLeaderboardData = [
  {
    wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    type: "tier 1",
    solEarn: 45.8,
  },
  {
    wallet: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
    type: "tier 2",
    solEarn: 32.4,
    isUser: true,
  },
  {
    wallet: "0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69",
    type: "tier 1",
    solEarn: 28.7,
  },
  {
    wallet: "0x1efF47bc3a10a45D4B230B5d10E37751FE6AA718",
    type: "tier 3",
    solEarn: 15.2,
  },
  {
    wallet: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    type: "tier 2",
    solEarn: 12.9,
  },
  {
    wallet: "0x85f8578EaE6f4D931fa80F8F0e2A4Cb3148DB4Cf",
    type: "tier 1",
    solEarn: 8.6,
  },
  {
    wallet: "0x3E3a3D69dc33BAc797814EF91909D40a1356cfB3",
    type: "tier 3",
    solEarn: 7.3,
  },
  {
    wallet: "0x4B5565c1CD1DEFEb31042606B673182F085Efe2D",
    type: "tier 2",
    solEarn: 5.1,
  },
  {
    wallet: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    type: "tier 1",
    solEarn: 3.8,
  },
  {
    wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    type: "tier 3",
    solEarn: 2.4,
  },
];

const userAchievement = {
  badge: "Diamond",
  level: 5,
  points: 98400,
  volume: "$100,000+",
  nextBadge: "Ruby",
  nextVolume: "$250,000",
  nextPoints: 8000,
  progress: 85,
};

const Rewards: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showAllLeaderboard, setShowAllLeaderboard] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "rewards" | "leaderboard" | "airdrop"
  >("rewards");

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);
    return () => {
      styleSheet.remove();
    };
  }, []);

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

  return (
    <>
      {" "}
      <div className="overlay"></div>
      <div className="hider top"></div>
      <div className="hider"></div>
      <div id="triggerXoverFlow1" className="wrapper_main h-full">
        <div className="overlay_color">
          <div className="overlay_stroke"></div>
        </div>
      </div>
      <div id="triggerXoverFlow" className="wrapper_sections wrapper-container">
        <Navbar />
        <div className=" max-w-[88rem] 2xl:max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-9 pt-28 pb-12">
          <div className="relative">
            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex items-center gap-1 bg-cherry-cream rounded-2xl border-4 border-black p-2 w-fit shadow-[6px_6px_0px_#121a2a]">
                <button
                  onClick={() => setActiveTab("rewards")}
                  className={`px-6 py-3 rounded-xl winky-sans-font font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === "rewards"
                      ? "bg-black text-cherry-cream shadow-[2px_2px_0px_#121a2a] transform translate-y-0.5"
                      : "text-cherry-burgundy hover:bg-cherry-burgundy/10"
                  }`}
                >
                  <Icon
                    icon="mdi:gift"
                    className={`${
                      activeTab === "rewards" ? "text-cherry-cream" : ""
                    }`}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`hidden lg:block ${
                      activeTab === "rewards" ? "text-cherry-cream" : ""
                    }`}
                  >
                    Rewards
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className={`px-6 py-3 rounded-xl winky-sans-font font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === "leaderboard"
                      ? "bg-black text-cherry-cream shadow-[2px_2px_0px_#321017] transform translate-y-0.5"
                      : "text-cherry-burgundy hover:bg-cherry-burgundy/10"
                  }`}
                >
                  <Icon
                    icon="tabler:trophy"
                    className={`${
                      activeTab === "leaderboard" ? "text-cherry-cream" : ""
                    }`}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`hidden lg:block ${
                      activeTab === "leaderboard" ? "text-cherry-cream" : ""
                    }`}
                  >
                    Leaderboard
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("airdrop")}
                  className={`px-6 py-3 rounded-xl winky-sans-font font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === "airdrop"
                      ? "bg-black text-cherry-cream shadow-[2px_2px_0px_#321017] transform translate-y-0.5"
                      : "text-cherry-burgundy hover:bg-cherry-burgundy/10"
                  }`}
                >
                  <Icon
                    icon="mdi:parachute"
                    className={`${
                      activeTab === "airdrop" ? "text-cherry-cream" : ""
                    }`}
                    width={20}
                    height={20}
                  />
                  <span
                    className={`hidden lg:block ${
                      activeTab === "airdrop" ? "text-cherry-cream" : ""
                    }`}
                  >
                    Cherry Airdrop
                  </span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "rewards" && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
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
                    copyToClipboard={copyToClipboard}
                    userAchievement={userAchievement}
                  />
                  <StatCards />
                  <Leaderboard
                    mockLeaderboardData={mockLeaderboardData}
                    showAllLeaderboard={showAllLeaderboard}
                    setShowAllLeaderboard={setShowAllLeaderboard}
                  />
                </motion.div>
              )}

              {activeTab === "leaderboard" && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PointsLeaderboard />
                </motion.div>
              )}

              {activeTab === "airdrop" && (
                <motion.div
                  key="airdrop"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CherryAirdrop />
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
                    className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[12px_12px_0px_#321017] max-w-md w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="bg-black px-6 py-4 flex items-center justify-between">
                      <h3 className="maladroit-font text-xl text-cherry-cream flex items-center gap-2">
                        <Icon
                          icon="mdi:lightbulb"
                          width={24}
                          height={24}
                          className="text-cherry-cream"
                        />
                        How It Works
                      </h3>
                      <button
                        onClick={() => setShowHowItWorksModal(false)}
                        className="text-cherry-cream hover:text-cherry-red transition-colors"
                      >
                        <Icon icon="mdi:close" width={24} height={24} />
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="winky-sans-font text-sm text-cherry-cream font-bold">
                              1
                            </span>
                          </div>
                          <div>
                            <h4 className="winky-sans-font text-base leading-tight text-cherry-burgundy    ">
                              Share Your Link
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Share your unique referral link with friends and
                              family
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="winky-sans-font text-sm text-cherry-cream font-bold">
                              2
                            </span>
                          </div>
                          <div>
                            <h4 className="winky-sans-font text-base leading-tight text-cherry-burgundy    ">
                              They Start Trading
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Your friends sign up and start trading using
                              Cherry Sniper
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="winky-sans-font text-sm text-cherry-cream font-bold">
                              3
                            </span>
                          </div>
                          <div>
                            <h4 className="winky-sans-font text-base leading-tight text-cherry-burgundy    ">
                              You Earn Commission
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              You earn up to 55% commission on all their trading
                              fees automatically
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Earnings Breakdown */}
                      <div className="bg-cherry-burgundy/10 rounded-lg p-4 mb-6">
                        <h5 className="winky-sans-font text-cherry-burgundy font-bold mb-3">
                          Commission Breakdown:
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="winky-sans-font text-cherry-burgundy">
                              Direct Referrals:
                            </span>
                            <span className="winky-sans-font text-cherry-burgundy font-bold">
                              55%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="winky-sans-font text-cherry-burgundy">
                              Indirect Referrals:
                            </span>
                            <span className="winky-sans-font text-cherry-burgundy font-bold">
                              5%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="winky-sans-font text-cherry-burgundy">
                              Extended Network:
                            </span>
                            <span className="winky-sans-font text-cherry-burgundy font-bold">
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
                        className="w-full bg-cherry-red text-white font-bold py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center justify-center gap-2"
                      >
                        <Icon
                          icon="mdi:content-copy"
                          width={20}
                          height={20}
                          className="text-cherry-cream"
                        />
                        <span className="text-cherry-cream">
                          Copy and Start
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements Modal */}
              <AnimatePresence>
                {showAchievementsModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowAchievementsModal(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-cherry-cream rounded-2xl   shadow-[12px_12px_0px_#121a2a] max-w-5xl w-full max-h-[90vh]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Modal Header */}
                      <div className="bg-black px-6 py-4 flex items-center rounded-lg justify-between">
                        <h3 className="maladroit-font text-xl text-cherry-cream flex items-center gap-2">
                          <Icon
                            icon="ph:medal-bold"
                            width={24}
                            height={24}
                            className="text-cherry-cream"
                          />
                          Achievement Levels
                        </h3>
                        <button
                          onClick={() => setShowAchievementsModal(false)}
                          className="text-cherry-cream hover:text-cherry-red transition-colors"
                        >
                          <Icon icon="mdi:close" width={24} height={24} />
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="p-4">
                        <div className="mb-4">
                          <p className="winky-sans-font text-cherry-burgundy text-sm mb-3">
                            Unlock achievements by reaching trading volume
                            milestones. Each level grants bonus points and
                            exclusive rewards.
                          </p>
                        </div>

                        {/* Achievement List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Bronze.png"
                              alt="Bronze Badge"
                              className="w-14 h-14 object-contain mb-2"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Bronze
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $1,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +50 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Silver.png"
                              alt="Silver Badge"
                              className="w-14 h-14 object-contain mb-2"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Silver
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $5,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +200 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Gold.png"
                              alt="Gold Badge"
                              className="w-14 h-14 object-contain mb-2"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Gold
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $10,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +500 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Platinum.png"
                              alt="Platinum Badge"
                              className="w-14 h-14 object-contain mb-2"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Platinum
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $50,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +1,500 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Diamond.png"
                              alt="Diamond Badge"
                              className="w-14 h-14 object-contain mb-2"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Diamond
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $100,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +3,500 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Ruby.png"
                              alt="Ruby Badge"
                              className="w-14 h-14 object-contain mb-2"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Ruby
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $250,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +8,000 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Emerald.png"
                              alt="Emerald Badge"
                              className="w-16 h-16 object-contain mb-3"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Emerald
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $500,000 Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +20,000 Points
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                            className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4 hover:shadow-[4px_4px_0px_#321017] transition-all duration-200 flex flex-col items-center text-center"
                          >
                            <img
                              src="https://storage.cherrybot.ai/Legendary.png"
                              alt="Legendary Badge"
                              className="w-16 h-16 object-contain mb-3"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold mb-1">
                              Legendary
                            </h4>
                            <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80 mb-2">
                              $1,000,000+ Volume
                            </p>
                            <span className="winky-sans-font text-cherry-red font-bold">
                              +50,000 Points
                            </span>
                          </motion.div>
                        </div>

                        {/* Additional Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.3 }}
                          className="mt-4 p-3 bg-cherry-burgundy/10 rounded-lg border-2 border-cherry-burgundy"
                        >
                          <h5 className="winky-sans-font text-cherry-burgundy font-bold mb-2">
                            How It Works:
                          </h5>
                          <div className="space-y-1 text-sm">
                            <p className="winky-sans-font text-cherry-burgundy">
                              • Each achievement unlocks immediately when you
                              reach the volume threshold
                            </p>
                            <p className="winky-sans-font text-cherry-burgundy">
                              • Bonus points are awarded once per achievement
                              level
                            </p>
                            <p className="winky-sans-font text-cherry-burgundy">
                              • Higher achievements unlock exclusive rewards and
                              benefits
                            </p>
                            <p className="winky-sans-font text-cherry-burgundy  ">
                              • Every $10 in volume = +1 point
                            </p>
                            <p className="winky-sans-font text-cherry-burgundy   ">
                              • Top users by points win Cherry Airdrop and bot
                              revenue rewards
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Rewards;
