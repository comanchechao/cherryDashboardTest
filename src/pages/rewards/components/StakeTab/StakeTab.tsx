import React, { useState, useEffect } from "react";
import { useWallet } from "../../../../components/BSCWalletProvider";
import { useToastContext } from "../../../../contexts/ToastContext";
import {
  fetchStakingData,
  getBestProvider,
} from "../../../../utils/stakingHelpers";

// Import modular components
import StakingStats from "./StakingStats";
import InformationBoxes from "./InformationBoxes";
import ActionButtons from "./ActionButtons";
import StakingChoice from "./StakingChoice";

interface StakeTabProps {
  onStakeClick: () => void;
  stakingChoice: "points" | "pointsAndAPY" | null;
  onStakingChoiceChange: (choice: "points" | "pointsAndAPY" | null) => void;
}

const StakeTab: React.FC<StakeTabProps> = ({
  onStakeClick,
  stakingChoice,
  onStakingChoiceChange,
}) => {
  const { isConnected, address } = useWallet();
  const { showSuccess, showError } = useToastContext();
  const [eligibility, setEligibility] = useState<{
    eligible?: boolean;
    reason?: string;
    updated?: {
      _id: string;
      address: string;
      __v: number;
      createdAt: string;
      updatedAt: string;
      lastBalance: string;
      windowCheckedAt: string;
      windowEligible: boolean;
      windowFromBlock: number;
      windowMethod: string;
      lastCheckedAt: string;
      lastStakedAmount: string;
      stakePoints: number;
      totalPoints: number;
      balancePoints: number;
      // Legacy fields for backward compatibility
      points?: number;
      holdingSince?: string;
      holdingSinceBlock?: number;
      lastAwardedAt?: string;
    };
    points?: {
      _id: string;
      address: string;
      __v: number;
      createdAt: string;
      updatedAt: string;
      lastBalance: string;
      windowCheckedAt: string;
      windowEligible: boolean;
      windowFromBlock: number;
      windowMethod: string;
      lastCheckedAt: string;
      lastStakedAmount: string;
      stakePoints: number;
      totalPoints: number;
      balancePoints: number;
      points?: number;
      holdingSince?: string;
      holdingSinceBlock?: number;
      lastAwardedAt?: string;
    };
  } | null>(null);
  const [pointsInterval, setPointsInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [countdownInterval, setCountdownInterval] =
    useState<NodeJS.Timeout | null>(null);

  // Staking data state
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [pendingRewards, setPendingRewards] = useState<string>("0");
  const [isInCooldown, setIsInCooldown] = useState<boolean>(false);
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);
  const [unlockStartTime, setUnlockStartTime] = useState<number>(0);
  const [canStartUnlock, setCanStartUnlock] = useState<boolean>(true);
  const [canCancelUnlock, setCanCancelUnlock] = useState<boolean>(false);
  const [canUnstake, setCanUnstake] = useState<boolean>(false);

  // Fetch staking data from contract
  const fetchStakingDataLocal = async (showNotification: boolean = false) => {
    if (!isConnected || !address) return;
    try {
      // Initialize provider - use MetaMask if available, fallback to BSC RPC with failover
      const provider = getBestProvider();

      // Fetch staking data using contract-level cooldown detection
      const stakingData = await fetchStakingData(provider, address);

      // LOG DATA RECEIVED IN COMPONENT
      console.log("🎯 [StakeTab] Received staking data from contract:", {
        stakingData,
        remainingCooldownReceived: stakingData.remainingCooldown,
        isInCooldownReceived: stakingData.isInCooldown,
        isUnlockingReceived: stakingData.isUnlocking,
        unlockStartTimeReceived: stakingData.unlockStartTime,
      });

      setStakedAmount(stakingData.stakedAmount);
      setPendingRewards(stakingData.pendingRewards);
      setIsInCooldown(stakingData.isInCooldown);
      setRemainingCooldown(stakingData.remainingCooldown);
      setUnlockStartTime(stakingData.unlockStartTime);
      setCanStartUnlock(stakingData.canStartUnlock);
      setCanCancelUnlock(stakingData.canCancelUnlock);
      setCanUnstake(stakingData.canUnstake);

      // LOG FINAL STATE SET IN COMPONENT
      console.log("📱 [StakeTab] Final state set in component:", {
        remainingCooldown: stakingData.remainingCooldown,
        isInCooldown: stakingData.isInCooldown,
        isUnlocking: stakingData.isUnlocking,
        unlockStartTime: stakingData.unlockStartTime,
        canStartUnlock: stakingData.canStartUnlock,
        canCancelUnlock: stakingData.canCancelUnlock,
        canUnstake: stakingData.canUnstake,
      });

      // Show success notification only when explicitly requested (user-initiated refresh)
      if (showNotification && parseFloat(stakingData.stakedAmount) > 0) {
        showSuccess(
          "Staking Data Updated ",
          `Your staking data has been refreshed successfully`,
          3000
        );
      }
    } catch (err) {
      console.error("Error fetching staking data:", err);
      showError(
        "Data Fetch Failed",
        "Failed to fetch staking data. Please try again.",
        5000
      );
    }
  };

  useEffect(() => {
    // Debounce initial data fetch to prevent multiple notifications
    const timeoutId = setTimeout(() => {
      fetchStakingDataLocal();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isConnected, address]);

  // Real-time countdown timer for unlock cooldown
  useEffect(() => {
    if (isInCooldown && unlockStartTime > 0 && remainingCooldown > 0) {
      // Clear any existing countdown interval
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      // Start countdown timer that updates every second
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        // Note: unlockStartTime is actually the unlock END time from contract
        const newRemainingTime = Math.max(0, unlockStartTime - currentTime);

        // Debug countdown calculation
        console.log("⏰ [StakeTab] Countdown update:", {
          unlockStartTime,
          currentTime,
          timeDifference: unlockStartTime - currentTime,
          newRemainingTime,
          remainingHours: Math.floor(newRemainingTime / 3600),
          unlockEndDate: new Date(unlockStartTime * 1000).toISOString(),
          currentDate: new Date(currentTime * 1000).toISOString(),
        });

        setRemainingCooldown(newRemainingTime);

        // Update button states based on remaining time
        if (newRemainingTime <= 0) {
          setCanUnstake(true);
          setCanCancelUnlock(false);
          clearInterval(interval);
          setCountdownInterval(null);

          // Show notification that unlock is complete
          showSuccess(
            "Unlock Complete! ✅",
            "You can now unstake your tokens.",
            5000
          );
        } else {
          setCanUnstake(false);
          setCanCancelUnlock(true);
        }
      }, 1000);

      setCountdownInterval(interval);

      // Cleanup function
      return () => {
        clearInterval(interval);
        setCountdownInterval(null);
      };
    } else {
      // Clear countdown if not in cooldown
      if (countdownInterval) {
        clearInterval(countdownInterval);
        setCountdownInterval(null);
      }
    }
  }, [isInCooldown, unlockStartTime, remainingCooldown]);

  const fetchUserPoints = async (walletAddress: string) => {
    try {
      const response = await fetch(
        `https://monitor.cherrypump.com/token/api/wallets/${walletAddress}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const prev = eligibility?.points ?? eligibility?.updated;
      const prevPoints = prev?.balancePoints;
      const prevBalance = prev?.lastBalance;

      if (
        prevPoints !== data.balancePoints ||
        prevBalance !== data.lastBalance
      ) {
        console.log("[Points/Balance Update] New wallet data:", {
          balancePoints: data.balancePoints,
          lastBalance: data.lastBalance,
          stakePoints: data.stakePoints,
          totalPoints: data.totalPoints,
          lastStakedAmount: data.lastStakedAmount,
          fullData: data,
        });

        setEligibility((prevState) => {
          if (prevState?.points) {
            return { ...prevState, points: data };
          } else if (prevState?.updated) {
            return { ...prevState, updated: data };
          } else {
            return { eligible: true, updated: data };
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch user points:", error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchUserPoints(address);
      // Set up interval to refresh staking data every 30 seconds (silent refresh)
      if (stakingChoice === "pointsAndAPY") {
        const stakingInterval = setInterval(() => {
          fetchStakingDataLocal(false); // Silent refresh, no notification
        }, 30000);

        // Cleanup staking interval
        return () => clearInterval(stakingInterval);
      }

      const interval = setInterval(() => {
        fetchUserPoints(address);
      }, 60000);

      setPointsInterval(interval);

      return () => {
        if (interval) {
          clearInterval(interval);
          setPointsInterval(null);
        }
        if (countdownInterval) {
          clearInterval(countdownInterval);
          setCountdownInterval(null);
        }
      };
    } else {
      if (pointsInterval) {
        clearInterval(pointsInterval);
        setPointsInterval(null);
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        setCountdownInterval(null);
      }
    }
  }, [isConnected, address, stakingChoice]);

  // Fetch staking data immediately when user enters APY staking section
  useEffect(() => {
    if (isConnected && address) {
      // Fetch data immediately when entering this section (silent, no notification)
      fetchStakingDataLocal(false);
    }
  }, [isConnected, address]);

  const handleUnstakeSuccess = () => {
    showSuccess(
      "Unlock period has started",
      `Successfully started unlock period for tokens.`,
      7000
    );
  };

  const handleBackToOptions = () => {
    onStakingChoiceChange(null);
    showSuccess("Returning to Options 🔄", "Back to staking choices", 2000);
  };

  // Get current balance and points from API response
  const currentBalance =
    eligibility?.updated?.lastBalance ||
    eligibility?.points?.lastBalance ||
    "0";
  const currentPoints =
    eligibility?.updated?.balancePoints ||
    eligibility?.points?.balancePoints ||
    0;

  // If user hasn't made a choice yet, show the original content
  if (!stakingChoice) {
    return (
      <div className="space-y-6">
        {/* Main Staking Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <h3 className=" text-black text-xl font-bold mb-4 text-center">
              Points Stake
            </h3>
            <StakingStats
              isConnected={isConnected}
              balance={currentBalance}
              points={currentPoints}
            />
          </div>
          <div>
            <h3 className=" text-black text-xl font-bold mb-4 text-center">
              APY Stake
            </h3>
            <StakingStats
              isConnected={isConnected}
              balance={currentBalance}
              points={currentPoints}
              stakedAmount={stakedAmount}
              pendingRewards={pendingRewards}
              apyEarned="5%"
              lockupTime={remainingCooldown}
              aibotEarned={pendingRewards}
              showUnstakeSection={true}
              isUnlocking={isInCooldown}
              canStartUnlock={canStartUnlock}
              canCancelUnlock={canCancelUnlock}
              canUnstake={canUnstake}
              onRefresh={() => fetchStakingDataLocal(true)}
              onUnstakeSuccess={handleUnstakeSuccess}
            />
          </div>
        </div>

        <InformationBoxes />

        <ActionButtons
          onStakeClick={onStakeClick}
          stakedAmount={stakedAmount}
          pendingRewards={pendingRewards}
          isUnlocking={isInCooldown}
          canStartUnlock={canStartUnlock}
          canCancelUnlock={canCancelUnlock}
          canUnstake={canUnstake}
          remainingCooldown={remainingCooldown}
          onRefresh={() => fetchStakingDataLocal(true)}
          onSuccess={handleUnstakeSuccess}
        />
      </div>
    );
  }

  if (stakingChoice === "pointsAndAPY") {
    return (
      <div className="space-y-6">
        {/* Main Staking Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <h3 className="winky-sans-font text-black/70 text-sm mb-4 text-center">
              Points Stake
            </h3>
            <StakingStats
              isConnected={isConnected}
              balance={currentBalance}
              points={currentPoints}
            />
          </div>
          <div>
            <h3 className="winky-sans-font text-black/70 text-sm mb-4 text-center">
              APY Stake
            </h3>
            <StakingStats
              isConnected={isConnected}
              balance={currentBalance}
              points={currentPoints}
              stakedAmount={stakedAmount}
              pendingRewards={pendingRewards}
              apyEarned="5%"
              lockupTime={remainingCooldown}
              aibotEarned={pendingRewards}
              showUnstakeSection={true}
              isUnlocking={isInCooldown}
              canStartUnlock={canStartUnlock}
              canCancelUnlock={canCancelUnlock}
              canUnstake={canUnstake}
              onRefresh={() => fetchStakingDataLocal(true)}
              onUnstakeSuccess={handleUnstakeSuccess}
            />
          </div>
        </div>

        <InformationBoxes />

        {/* Back to Choice Button */}
        <StakingChoice onBackToOptions={() => onStakingChoiceChange(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Staking Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <h3 className="winky-sans-font text-black/70 text-sm mb-4 text-center">
            Points Stake
          </h3>
          <StakingStats
            isConnected={isConnected}
            balance={currentBalance}
            points={currentPoints}
          />
        </div>
        <div>
          <h3 className="winky-sans-font text-black/70 text-sm mb-4 text-center">
            APY Stake
          </h3>
          <StakingStats
            isConnected={isConnected}
            balance={currentBalance}
            points={currentPoints}
            stakedAmount={stakedAmount}
            pendingRewards={pendingRewards}
            apyEarned="5%"
            lockupTime={remainingCooldown}
            aibotEarned={pendingRewards}
            showUnstakeSection={true}
            isUnlocking={isInCooldown}
            canStartUnlock={canStartUnlock}
            canCancelUnlock={canCancelUnlock}
            canUnstake={canUnstake}
            onRefresh={() => fetchStakingDataLocal(true)}
            onUnstakeSuccess={handleUnstakeSuccess}
          />
        </div>
      </div>

      <InformationBoxes />

      {/* Action Buttons */}
      <ActionButtons
        onStakeClick={onStakeClick}
        onBackToOptions={handleBackToOptions}
        showBackButton={true}
        stakedAmount={stakedAmount}
        pendingRewards={pendingRewards}
        isUnlocking={isInCooldown}
        canStartUnlock={canStartUnlock}
        canCancelUnlock={canCancelUnlock}
        canUnstake={canUnstake}
        remainingCooldown={remainingCooldown}
        onRefresh={() => fetchStakingDataLocal(true)}
        onSuccess={handleUnstakeSuccess}
      />
    </div>
  );
};

export default StakeTab;
