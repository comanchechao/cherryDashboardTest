import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ethers } from "ethers";
import {
  unstake,
  formatCooldownTime,
  startUnlock,
  cancelUnlock,
} from "../../../../utils/stakingHelpers";

interface StakingStatsProps {
  isConnected: boolean;
  balance?: string;
  points?: number;
  // APY staking props
  stakedAmount?: string;
  pendingRewards?: string;
  apyEarned?: string;
  lockupTime?: number;
  aibotEarned?: string;
  showUnstakeSection?: boolean;
  isUnlocking?: boolean;
  canStartUnlock?: boolean;
  canCancelUnlock?: boolean;
  canUnstake?: boolean;
  onRefresh?: () => void;
  onUnstakeSuccess?: () => void;
}

const StakingStats: React.FC<StakingStatsProps> = ({
  isConnected,
  balance,
  points,
  stakedAmount = "0",
  pendingRewards = "0",
  apyEarned = "5%",
  lockupTime = 0,
  aibotEarned = "0",
  showUnstakeSection = false,
  isUnlocking = false,
  canStartUnlock = true,
  canCancelUnlock = false,
  canUnstake = false,
  onRefresh,
  onUnstakeSuccess,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isStartingUnlock, setIsStartingUnlock] = useState(false);
  const [isCancelingUnlock, setIsCancelingUnlock] = useState(false);
  const [isInitiatingUnstake, setIsInitiatingUnstake] = useState(false);

  const handleStartUnlock = async () => {
    setIsStartingUnlock(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await startUnlock(web3Provider);
      onRefresh?.();
      onUnstakeSuccess?.();
    } catch (err: any) {
      console.error("Error starting unlock:", err);
    } finally {
      setIsStartingUnlock(false);
    }
  };

  const handleCancelUnlock = async () => {
    setIsCancelingUnlock(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await cancelUnlock(web3Provider);
      onRefresh?.();
      onUnstakeSuccess?.();
    } catch (err: any) {
      console.error("Error canceling unlock:", err);
    } finally {
      setIsCancelingUnlock(false);
    }
  };

  const handleInitiateUnstake = async () => {
    if (!withdrawAmount) return;
    setIsInitiatingUnstake(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await unstake(web3Provider, withdrawAmount);
      onRefresh?.();
      setWithdrawAmount("");
      onUnstakeSuccess?.();
    } catch (err: any) {
      console.error("Error initiating unstake:", err);
    } finally {
      setIsInitiatingUnstake(false);
    }
  };
  if (!isConnected) {
    return (
      <div className="rounded-sm w-full h-fit overflow-hidden flex flex-col items-center justify-center">
        <img
          src="https://storage.cherrybot.ai/dashboardRobot.png"
          alt="Robot Image"
          className="h-full object-contain"
        />
      </div>
    );
  }

  const displayBalance = (() => {
    if (showUnstakeSection && stakedAmount && parseFloat(stakedAmount) > 0) {
      // APY Stake section: show staked amount from contract
      const balanceNum = parseFloat(stakedAmount);
      return `${
        balanceNum % 1 === 0 ? balanceNum.toFixed(0) : balanceNum.toFixed(2)
      } $AIBOT`;
    } else if (!showUnstakeSection && balance && parseFloat(balance) > 0) {
      // Points Stake section: show lastBalance from API as "Your Stake"
      const balanceNum = parseFloat(balance);
      return `${
        balanceNum % 1 === 0 ? balanceNum.toFixed(0) : balanceNum.toFixed(2)
      } $AIBOT`;
    }
    return "0 $AIBOT";
  })();

  const displayRewards = (() => {
    if (showUnstakeSection && pendingRewards) {
      const rewardsNum = parseFloat(pendingRewards);
      return rewardsNum.toFixed(4);
    }
    return "0.0000";
  })();

  const displayLockupTime = (() => {
    if (showUnstakeSection) {
      if (isUnlocking && lockupTime && lockupTime > 0) {
        // Show remaining countdown time during unlock period
        return formatCooldownTime(lockupTime);
      } else if (isUnlocking && lockupTime <= 0) {
        // Show ready when countdown is complete
        return "Ready to unstake";
      } else if (!isUnlocking && parseFloat(stakedAmount) > 0) {
        // Show no lock when staked but not unlocking
        return "No lock";
      } else {
        // Show no lock for empty state
        return "No lock";
      }
    }
    return "Coming Soon";
  })();

  return (
    <div className="rounded-sm w-full h-full overflow-hidden">
      {/* Your Stake Card */}
      <div className="bg-white/5 border border-black/20 rounded-sm p-4 lg:p-6 h-fit">
        <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
          <div className="flex flex-col justify-between items-start">
            <span className="maladroit-font text-black/70 text-sm">
              Your Stake:
            </span>
            <span className="maladroit-font text-2xl lg:text-3xl text-black">
              {displayBalance}
            </span>
          </div>

          <div className="flex flex-col justify-between items-start">
            <span className="maladroit-font text-black/70 text-sm">
              {showUnstakeSection ? "Pending Rewards:" : "Points Earned:"}
            </span>
            <span className="maladroit-font text-2xl lg:text-3xl text-black">
              {showUnstakeSection
                ? `${displayRewards} $AIBOT`
                : Number(points ?? 0).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col justify-between items-start">
            <span className="maladroit-font text-black/70 text-sm">
              Your APY:
            </span>
            <span className="maladroit-font text-base lg:text-lg text-black/70">
              {apyEarned}
            </span>
          </div>

          <div className="flex flex-col justify-between items-start">
            <span className="maladroit-font text-black/70 text-sm">
              Lockup Time:
            </span>
            <span className="maladroit-font text-base lg:text-lg text-black/70">
              {displayLockupTime}
            </span>
          </div>

          <div className="flex flex-col justify-between items-start">
            <span className="text-black/70 text-sm">
              {showUnstakeSection ? "Status:" : "$AIBOT Earned:"}
            </span>
            <span className="maladroit-font text-base lg:text-lg text-black/70">
              {showUnstakeSection ? (
                <div className="flex items-center gap-2">
                  {isUnlocking ? (
                    <>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-orange-600">Unlocking</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-600">Active</span>
                    </>
                  )}
                </div>
              ) : (
                "Coming Soon"
              )}
            </span>
          </div>
        </div>

        {/* Unstake Section - Only show for APY staking */}
        {showUnstakeSection && parseFloat(stakedAmount) > 0 && (
          <div className="border-t border-black/10 pt-4">
            <h4 className="text-black font-medium mb-3 text-sm">
              {canUnstake
                ? "Unstake Tokens"
                : isUnlocking
                ? "Unlock in Progress"
                : "Start Unstaking"}
            </h4>

            {/* Unlock Status Information */}
            {isUnlocking ? (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-sm p-3 mb-3">
                <div className="flex items-start gap-2">
                  <Icon
                    icon="mdi:timer-sand"
                    width={14}
                    height={14}
                    className="text-orange-600 flex-shrink-0 mt-0.5"
                  />
                  <p className="winky-sans-font text-orange-600 text-xs">
                    Unlock cooldown: {formatCooldownTime(lockupTime || 0)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-sm p-3 mb-3">
                <div className="flex items-start gap-2">
                  <Icon
                    icon="mdi:information-outline"
                    width={14}
                    height={14}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <p className="winky-sans-font text-blue-600 text-xs">
                    24-hour cooldown applies when unstaking
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {canUnstake ? (
                <>
                  <div className="relative">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Amount to unstake"
                      className="w-full bg-white/5 border border-white/20 rounded-sm px-3 py-2 text-black text-xs no-spinner focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                    <button
                      onClick={() => setWithdrawAmount(stakedAmount)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--color-accent)] text-xs hover:text-[var(--color-accent)]/80 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                  <button
                    onClick={handleInitiateUnstake}
                    disabled={
                      isInitiatingUnstake ||
                      !withdrawAmount ||
                      parseFloat(withdrawAmount) <= 0
                    }
                    className="w-full cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-900 border border-red-500/30 px-3 py-2 rounded-sm winky-sans-font text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isInitiatingUnstake ? (
                      <>
                        <div className="animate-spin h-3 w-3 border-b-2 border-current rounded-full"></div>
                        Unstaking...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:arrow-up" width={12} height={12} />
                        Unstake Tokens
                      </>
                    )}
                  </button>
                </>
              ) : isUnlocking ? (
                <button
                  onClick={handleCancelUnlock}
                  disabled={isCancelingUnlock}
                  className="w-full cursor-pointer bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-900 border border-yellow-500/30 px-3 py-2 rounded-sm winky-sans-font text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCancelingUnlock ? (
                    <>
                      <div className="animate-spin h-3 w-3 border-b-2 border-current rounded-full"></div>
                      Canceling...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:close" width={12} height={12} />
                      Cancel Unlock
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleStartUnlock}
                  disabled={isStartingUnlock}
                  className="w-full cursor-pointer bg-orange-500/20 hover:bg-orange-500/30 text-orange-900 border border-orange-500/30 px-3 py-2 rounded-sm winky-sans-font text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isStartingUnlock ? (
                    <>
                      <div className="animate-spin h-3 w-3 border-b-2 border-current rounded-full"></div>
                      Starting Unlock...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:lock-open" width={12} height={12} />
                      Start 24h Unlock
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakingStats;
