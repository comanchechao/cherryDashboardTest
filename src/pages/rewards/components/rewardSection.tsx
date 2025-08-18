import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import rewardsService from "../../../services/rewardsService";

interface RewardSectionProps {
  toastVisible: boolean;
  setToastVisible: (visible: boolean) => void;
  successToastVisible: boolean;
  setSuccessToastVisible: (visible: boolean) => void;
  alreadySubscribedToastVisible: boolean;
  setAlreadySubscribedToastVisible: (visible: boolean) => void;
  showAchievementsModal: boolean;
  setShowAchievementsModal: (show: boolean) => void;
  handleTrade: () => void;
  handleLogout: () => void;
  copyToClipboard: (text: string) => void;
  userAchievement: {
    badge: string;
    level: number;
    points: number;
    volume: string;
    nextBadge: string;
    nextVolume: string;
    nextPoints: number;
    progress: number;
  };
  userWalletInfo?: {
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
  } | null;
  telegramId?: string;
  accessToken?: string;
}

const RewardSection: React.FC<RewardSectionProps> = ({
  toastVisible,
  successToastVisible,
  alreadySubscribedToastVisible,
  setShowAchievementsModal,
  handleTrade,
  handleLogout,
  copyToClipboard,
  userAchievement,
  userWalletInfo,
  telegramId,
  accessToken,
}) => {
  const [referralInfo, setReferralInfo] = useState<{
    referralCode: string;
    referralLink: string;
    refId?: string;
    totalReferrals?: number;
    totalEarnings?: number;
  } | null>(null);
  const [referralLoading, setReferralLoading] = useState(false);

  // Fetch referral info when component mounts
  useEffect(() => {
    const fetchReferralInfo = async () => {
      if (!telegramId || !accessToken) {
        console.log(
          "⚠️ [RewardSection] No telegramId or accessToken available for referral info"
        );
        return;
      }

      setReferralLoading(true);
      try {
        console.log("🔄 [RewardSection] Fetching referral info...", {
          telegramId,
        });
        const referralData = await rewardsService.getReferralInfo(
          telegramId,
          accessToken
        );
        setReferralInfo(referralData);
        console.log("✅ [RewardSection] Referral info fetched:", referralData);
      } catch (error) {
        console.error(
          "❌ [RewardSection] Failed to fetch referral info:",
          error
        );
        // Set a fallback referral link
        setReferralInfo({
          referralCode: "ref_default",
          referralLink: "https://t.me/CherrySniperBot?start=ref_default",
        });
      } finally {
        setReferralLoading(false);
      }
    };

    fetchReferralInfo();
  }, [telegramId, accessToken]);

  const getAchievementData = () => {
    if (!userWalletInfo) {
      return userAchievement;
    }

    const volume = userWalletInfo.totalUsdVolume;
    const points = userWalletInfo.userPoints;
    const tier = userWalletInfo.tier;

    // Define achievement thresholds
    const achievements = [
      { name: "Default", volume: 0, points: 0 },
      { name: "Bronze", volume: 1000, points: 50 },
      { name: "Silver", volume: 5000, points: 200 },
      { name: "Gold", volume: 10000, points: 500 },
      { name: "Platinum", volume: 50000, points: 1500 },
      { name: "Diamond", volume: 100000, points: 3500 },
      { name: "Ruby", volume: 250000, points: 8000 },
      { name: "Emerald", volume: 500000, points: 20000 },
      { name: "Legendary", volume: 1000000, points: 50000 },
    ];

    // Find current achievement
    const currentAchievement =
      achievements.find((achievement) => achievement.name === tier) ||
      achievements[0];

    // Find next achievement
    const nextAchievement =
      achievements.find((achievement) => achievement.volume > volume) ||
      achievements[achievements.length - 1];

    // Calculate progress
    const progress =
      nextAchievement.volume > currentAchievement.volume
        ? Math.min(
            100,
            ((volume - currentAchievement.volume) /
              (nextAchievement.volume - currentAchievement.volume)) *
              100
          )
        : 100;

    return {
      badge: currentAchievement.name,
      level: achievements.findIndex((a) => a.name === tier) + 1,
      points: points,
      volume: `$${volume.toLocaleString()}`,
      nextBadge: nextAchievement.name,
      nextVolume: `$${nextAchievement.volume.toLocaleString()}`,
      nextPoints: nextAchievement.points,
      progress: Math.round(progress),
    };
  };

  const achievementData = getAchievementData();
  const walletAddress = userWalletInfo?.solAddress || " ";

  return (
    <div className="section_sniper_spotlight py-24 w-full flex flex-col items-center justify-center   relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6">
        {/* Custom Toast for Copy */}
        <div
          className={`fixed top-10 right-10 z-50 bg-[var(--color-glass)] backdrop-blur-md border border-[var(--color-glass-border)] rounded-[10px] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <Icon
            icon="mdi:check-circle"
            className="text-green-500"
            width={24}
            height={24}
          />
          <div className="flex flex-col">
            <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
              Copied!
            </span>
            <span className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-90">
              Wallet address copied to clipboard
            </span>
          </div>
        </div>

        {/* Success Toast for Newsletter */}
        <div
          className={`fixed top-10 right-10 z-50 bg-[var(--color-glass)] backdrop-blur-md border border-green-500/50 rounded-[10px] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
            successToastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <Icon
            icon="mdi:check-circle"
            className="text-green-600"
            width={24}
            height={24}
          />
          <div className="flex flex-col">
            <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
              Success!
            </span>
            <span className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-90">
              Successfully subscribed to newsletter
            </span>
          </div>
        </div>

        {/* Already Subscribed Toast */}
        <div
          className={`fixed top-10 right-10 z-50 bg-[var(--color-glass)] backdrop-blur-md border border-orange-500/50 rounded-[10px] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
            alreadySubscribedToastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <Icon
            icon="mdi:information"
            className="text-orange-600"
            width={24}
            height={24}
          />
          <div className="flex flex-col">
            <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
              Already Subscribed!
            </span>
            <span className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-90">
              This email is already subscribed to our newsletter
            </span>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-[var(--color-glass)] mx-auto border border-[var(--color-glass-border)] w-full rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] mb-12">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold maladroit-font text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
              <Icon
                icon="solar:card-bold"
                width={28}
                height={28}
                className="text-[var(--color-accent)]"
              />
              Rewards Dashboard
            </h2>

            {/* Wallet Content */}
            <div className="space-y-6">
              <div className="flex items-center w-full justify-start gap-3">
                <button
                  onClick={handleLogout}
                  className="bg-[var(--color-accent)] text-white py-2 px-6 rounded-xl border border-b-4 border-r-4 border-[var(--color-accent)] hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2   hover: "
                >
                  <span className="winky-sans-font text-white">Logout</span>
                  <Icon
                    icon="mdi:logout"
                    width={20}
                    height={20}
                    className="text-white/90"
                  />
                </button>{" "}
                <button
                  onClick={handleTrade}
                  className="bg-[var(--color-glass)] text-[var(--color-text-primary)] py-2 px-6 rounded-xl border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 transform-gpu flex items-center gap-2"
                >
                  <span className="winky-sans-font">TRADE</span>
                  <Icon
                    icon="duo-icons:coin-stack"
                    width={20}
                    height={20}
                    className="text-[var(--color-accent)]"
                  />
                </button>
              </div>
              {/* Referral and Wallet Section */}
              <div className="my-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Referral Link Card */}
                  <div className="bg-[var(--color-glass)] rounded-lg border border-[var(--color-glass-border)] p-4 w-full lg:w-auto flex-grow">
                    <label className="winky-sans-font text-[var(--color-text-secondary)] font-medium mb-2 block">
                      Your Referral Link
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg px-3 py-2 font-mono text-sm text-[var(--color-text-primary)] relative overflow-hidden">
                        <div className="absolute inset-0 referral-shimmer"></div>
                        <span className="relative z-10 truncate block">
                          {referralLoading ? (
                            <span className="text-[var(--color-text-secondary)]">
                              Loading referral link...
                            </span>
                          ) : referralInfo?.refId ? (
                            `https://t.me/cherrysniperbot?start=r-${referralInfo.refId}`
                          ) : (
                            "https://t.me/cherrysniperbot?start=r-default"
                          )}
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          copyToClipboard(
                            referralInfo?.refId
                              ? `https://t.me/cherrysniperbot?start=r-${referralInfo.refId}`
                              : "https://t.me/cherrysniperbot?start=r-default"
                          )
                        }
                        disabled={referralLoading}
                        className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg border border-b-4 border-r-4 border-[var(--color-accent)] transition-all duration-200 transform-gpu winky-sans-font flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon
                          icon="mdi:content-copy"
                          width={18}
                          height={18}
                          className="text-white/90"
                        />
                        <span className="text-white">Copy</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Wallet Address Card */}
                  <div className="bg-[var(--color-glass)] rounded-lg border border-[var(--color-glass-border)] p-4 w-full lg:w-auto flex-grow">
                    <label className="winky-sans-font text-[var(--color-text-secondary)] font-medium mb-2 block">
                      Your Wallet Address
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="winky-sans-font text-[var(--color-text-secondary)]">
                        W1
                      </span>
                      <div
                        className="flex-1 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg px-3 py-2 font-mono text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10 cursor-pointer transition-colors flex items-center relative overflow-hidden"
                        onClick={() => copyToClipboard(walletAddress)}
                      >
                        <span className="truncate relative z-10">
                          {walletAddress}
                        </span>
                        <span className="ml-2 text-xs text-[var(--color-text-secondary)] opacity-70 relative z-10 hidden sm:inline">
                          (Tap to copy)
                        </span>
                        <div className="absolute inset-0 referral-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement System */}
              <div className="bg-[var(--color-glass)] rounded-xl   lg:p-5 relative">
                <div className="flex items-center justify-center w-full">
                  {/* Left side - Current Achievement */}
                  <div className="w-full">
                    <h4 className="maladroit-font m-2 lg:text-xl text-sm text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                      <Icon
                        icon="ph:trophy-bold"
                        className="text-[var(--color-accent)]"
                        width={24}
                        height={24}
                      />
                      Your Achievement Progress
                    </h4>

                    <div className="bg-[var(--color-glass)] rounded-lg p-5 border border-[var(--color-glass-border)] mb-4">
                      <div className="flex justify-center items-center flex-col">
                        <div className="w-24 h-24 bg-[var(--color-glass)] rounded-full border border-[var(--color-glass-border)] flex items-center justify-center mb-3 relative">
                          {achievementData.badge === "Default" ? (
                            <Icon
                              icon="mdi:account-circle"
                              className="text-[var(--color-text-primary)] animate-pulse-slow"
                              width={80}
                              height={80}
                            />
                          ) : (
                            <img
                              src={`https://storage.cherrybot.ai/${achievementData.badge}.png`}
                              alt={`${achievementData.badge} Badge`}
                              className="w-20 h-20 object-contain animate-pulse-slow"
                            />
                          )}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center border border-[var(--color-glass-border)]">
                            <span className="winky-sans-font text-xs text-white">
                              {achievementData.level}
                            </span>
                          </div>
                        </div>
                        <p className="winky-sans-font text-[var(--color-text-primary)] text-center mb-1">
                          {achievementData.badge} Level Achieved!
                        </p>
                        <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm text-center">
                          {achievementData.volume} trading volume reached
                        </p>

                        {/* Progress to next level */}
                        <div className="w-full mt-4">
                          <div className="flex justify-between items-center winky-sans-font text-sm text-[var(--color-text-secondary)] mb-2">
                            <span>Progress to {achievementData.nextBadge}</span>
                            <span>{achievementData.progress}%</span>
                          </div>
                          <div className="w-full h-3 bg-black/10 border border-[var(--color-glass-border)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--color-accent)]"
                              style={{
                                width: `${achievementData.progress}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center winky-sans-font text-xs text-[var(--color-text-secondary)] mt-1 opacity-70">
                            <span>Current: {achievementData.volume}</span>
                            <span>Next: {achievementData.nextVolume}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wallet Stats Section styled like gaming cards */}
                    {userWalletInfo && (
                      <>
                        {/* Mobile Design */}
                        <div className="lg:hidden group relative mb-4">
                          <div className="relative bg-[var(--color-glass)] rounded-2xl border border-[var(--color-glass-border)] overflow-hidden transform transition-all duration-300">
                            {/* Header */}
                            <div className="p-4 border-b border-[var(--color-glass-border)]">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[var(--color-glass)] rounded-xl border border-[var(--color-glass-border)] flex items-center justify-center">
                                  <Icon
                                    icon="mdi:wallet"
                                    className="text-2xl text-[var(--color-accent)]"
                                  />
                                </div>
                                <div>
                                  <h3 className="maladroit-font text-lg text-[var(--color-text-primary)] leading-tight">
                                    Your Wallet Stats
                                  </h3>
                                  <p className="text-[var(--color-text-secondary)] text-xs winky-sans-font flex items-center gap-1 mt-1">
                                    <Icon
                                      icon="mdi:chart-line"
                                      className="text-sm"
                                    />
                                    Trading Performance
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              <div className="bg-[var(--color-glass)] rounded-xl border border-[var(--color-glass-border)] p-4 mb-4">
                                {/* SOL Balance Card */}
                                <div className="bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)] mb-4">
                                  <div className="flex items-center gap-3 flex-col">
                                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="token-branded:solana"
                                        className="text-lg text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                        SOL Balance
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs">
                                        {parseFloat(
                                          userWalletInfo.solBalance
                                        ).toFixed(3)}{" "}
                                        SOL
                                      </p>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs opacity-70">
                                        {userWalletInfo.solAddress.substring(
                                          0,
                                          6
                                        )}
                                        ...
                                        {userWalletInfo.solAddress.substring(
                                          userWalletInfo.solAddress.length - 4
                                        )}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <span className="bg-[var(--color-accent)] text-white px-2 py-1 rounded-full text-sm winky-sans-font font-bold">
                                        $
                                        {parseFloat(
                                          userWalletInfo.solBalanceUSD
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="space-y-3">
                                  {/* Points Card */}
                                  <div className="flex items-center gap-3 bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                                    <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="mdi:star-circle"
                                        className="text-lg text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                        Points
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs">
                                        {userWalletInfo.userPoints.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Volume Card */}
                                  <div className="flex items-center gap-3 bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                                    <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="mdi:chart-line"
                                        className="text-lg text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                        Volume
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs">
                                        $
                                        {userWalletInfo.totalUsdVolume.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Tier Card */}
                                  <div className="flex items-center gap-3 bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                                    <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="mdi:medal"
                                        className="text-lg text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                        Tier
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs">
                                        {userWalletInfo.tier}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Tokens Section */}
                                {userWalletInfo.tokens.length > 0 && (
                                  <div className="mt-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Icon
                                        icon="mdi:coins"
                                        className="text-lg text-[var(--color-accent)]"
                                      />
                                      <h5 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                        Your Tokens (
                                        {userWalletInfo.tokens.length})
                                      </h5>
                                    </div>
                                    <div className="space-y-2">
                                      {userWalletInfo.tokens.map(
                                        (token, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center flex-col gap-3 bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]"
                                          >
                                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                              <Icon
                                                icon="mdi:coin"
                                                className="text-sm text-white"
                                              />
                                            </div>
                                            <div className="flex-1">
                                              <div className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                                ${token.symbol}
                                              </div>
                                              <div className="winky-sans-font text-[var(--color-text-secondary)] text-xs opacity-70">
                                                {token.name}
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <div className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                                {parseFloat(
                                                  token.balance
                                                ).toFixed(2)}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Design */}
                        <div className="hidden lg:block group relative mb-4">
                          <div className="relative bg-[var(--color-glass)] rounded-3xl border border-[var(--color-glass-border)] overflow-hidden transform transition-all duration-300">
                            <div className="p-6 border-b border-[var(--color-glass-border)]">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[var(--color-glass)] rounded-2xl border border-[var(--color-glass-border)] flex items-center justify-center">
                                  <Icon
                                    icon="mdi:wallet"
                                    className="text-3xl text-[var(--color-accent)]"
                                  />
                                </div>
                                <div>
                                  <h3 className="maladroit-font text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
                                    Your Wallet Stats
                                  </h3>
                                  <p className="text-[var(--color-text-secondary)] text-sm winky-sans-font flex items-center gap-2 mt-1">
                                    <Icon
                                      icon="mdi:chart-line"
                                      className="text-lg"
                                    />
                                    Trading Performance
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="bg-[var(--color-glass)] rounded-sm p-6 mb-4">
                                {/* SOL Balance Card */}
                                <div className="flex items-center gap-4 bg-[var(--color-glass)] rounded-xl p-4 border border-[var(--color-glass-border)] mb-4">
                                  <div className="w-12 h-12 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                    <Icon
                                      icon="token-branded:solana"
                                      className="text-2xl text-white"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                                      SOL Balance
                                    </h4>
                                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                                      {parseFloat(
                                        userWalletInfo.solBalance
                                      ).toFixed(3)}{" "}
                                      SOL
                                    </p>
                                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs opacity-70">
                                      {userWalletInfo.solAddress.substring(
                                        0,
                                        6
                                      )}
                                      ...
                                      {userWalletInfo.solAddress.substring(
                                        userWalletInfo.solAddress.length - 4
                                      )}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="bg-[var(--color-accent)] text-white px-3 py-1 rounded-full text-xl winky-sans-font font-bold">
                                      $
                                      {parseFloat(
                                        userWalletInfo.solBalanceUSD
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Points Card */}
                                  <div className="flex items-center gap-3 bg-[var(--color-glass)] rounded-xl p-4 border border-[var(--color-glass-border)]">
                                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="mdi:star-circle"
                                        className="text-xl text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                                        Points
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                                        {userWalletInfo.userPoints.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Volume Card */}
                                  <div className="flex items-center gap-3 bg-[var(--color-glass)] rounded-xl p-4 border border-[var(--color-glass-border)]">
                                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="mdi:chart-line"
                                        className="text-xl text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                                        Volume
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                                        $
                                        {userWalletInfo.totalUsdVolume.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Tier Card */}
                                  <div className="flex items-center gap-3 bg-[var(--color-glass)] rounded-xl p-4 border border-[var(--color-glass-border)]">
                                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                      <Icon
                                        icon="mdi:medal"
                                        className="text-xl text-white"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                                        Tier
                                      </h4>
                                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                                        {userWalletInfo.tier}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Tokens Section */}
                                {userWalletInfo.tokens.length > 0 && (
                                  <div className="mt-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <Icon
                                        icon="mdi:coins"
                                        className="text-xl text-[var(--color-accent)]"
                                      />
                                      <h5 className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                                        Your Tokens (
                                        {userWalletInfo.tokens.length})
                                      </h5>
                                    </div>
                                    <div className="space-y-2">
                                      {userWalletInfo.tokens.map(
                                        (token, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center gap-3 bg-[var(--color-glass)] rounded-xl p-3 border border-[var(--color-glass-border)]"
                                          >
                                            <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg border border-[var(--color-glass-border)] flex items-center justify-center">
                                              <Icon
                                                icon="mdi:coin"
                                                className="text-lg text-white"
                                              />
                                            </div>
                                            <div className="flex-1">
                                              <div className="winky-sans-font text-[var(--color-text-primary)] font-bold text-lg">
                                                ${token.symbol}
                                              </div>
                                              <div className="winky-sans-font text-[var(--color-text-secondary)] text-xs opacity-70">
                                                {token.name}
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <div className="winky-sans-font text-[var(--color-text-primary)] font-bold text-sm">
                                                {parseFloat(
                                                  token.balance
                                                ).toFixed(2)}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>{" "}
                <div className="  ">
                  {" "}
                  <motion.button
                    whileHover={{
                      y: -2,
                      boxShadow: "6px 6px 0px #321017",
                    }}
                    onClick={() => setShowAchievementsModal(true)}
                    className="bg-cherry-red !my-2 text-white px-2 py-1 rounded-xl border border-b-2 border-r-2 border-cherry-burgundy    transition-all duration-200 transform-gpu     winky-sans-font flex items-center gap-2"
                  >
                    <Icon
                      icon="mdi:information"
                      width={20}
                      height={20}
                      className="text-cherry-cream"
                    />
                    <span className="text-cherry-cream text-xs">
                      Learn More about the achievement system
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardSection;
