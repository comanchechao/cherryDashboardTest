import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../layouts/Navbar";
import Footer from "../../../layouts/Footer";
import UnifiedAuth from "../../../components/UnifiedAuth";
import RewardsSidebar from "./RewardsSidebar";
import MobileTabs from "./MobileTabs";
import HomeTab from "./HomeTab";
import StakeTab from "./StakeTab";
import StakeModal from "./StakeModal";
import PlaceholderTab from "./PlaceholderTab";

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
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `;

type TabType =
  | "home"
  | "stake"
  | "stakingLeaderboard"
  | "pointsStored"
  | "stakingTiers";

const RewardsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [stakingChoice, setStakingChoice] = useState<
    "points" | "pointsAndAPY" | null
  >(null);

  // Function to handle tab changes and update URL hash
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);

    // Update URL hash without page reload
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${tab}`);
    } else {
      // Fallback for older browsers
      window.location.hash = `#${tab}`;
    }
  };

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
        ].includes(hash)
      ) {
        setActiveTab(hash as TabType);
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

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);
    return () => {
      styleSheet.remove();
    };
  }, []);

  const handleStakingChoice = (choice: "points" | "pointsAndAPY") => {
    setStakingChoice(choice);
    setShowStakeModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "stake":
        return (
          <StakeTab
            onStakeClick={() => setShowStakeModal(true)}
            stakingChoice={stakingChoice}
            onStakingChoiceChange={setStakingChoice}
          />
        );
      case "stakingLeaderboard":
        return (
          <PlaceholderTab
            icon="tabler:trophy"
            title="Staking Leaderboard Coming Soon!"
          />
        );
      case "pointsStored":
        return (
          <PlaceholderTab
            icon="mdi:database"
            title="Points Stored Coming Soon!"
          />
        );
      case "stakingTiers":
        return (
          <PlaceholderTab
            icon="mdi:layers"
            title="Staking Tiers Coming Soon!"
          />
        );
      default:
        return <HomeTab />;
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
              {/* Left Sidebar */}
              <RewardsSidebar
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Main Content */}
              <div className="flex-1">
                {/* Header Bar */}
                <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col gap-3 bg-white/5 border border-white/10 rounded-sm px-4 py-3 mb-6">
                  <h2 className="maladroit-font text-2xl md:text-3xl text-white">
                    {activeTab === "home" && "Home"}
                    {activeTab === "stake" && "Stake $AIBOT"}
                    {activeTab === "stakingLeaderboard" &&
                      "Staking Leaderboard"}
                    {activeTab === "pointsStored" && "Point Store"}
                    {activeTab === "stakingTiers" && "Staking Tiers"}
                  </h2>
                  <UnifiedAuth />
                </div>

                {/* Mobile Tabs */}
                <MobileTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stake Modal */}
      <StakeModal
        isOpen={showStakeModal}
        onClose={() => setShowStakeModal(false)}
        onStakingChoice={handleStakingChoice}
      />

      <Footer />
    </>
  );
};

export default RewardsLayout;
