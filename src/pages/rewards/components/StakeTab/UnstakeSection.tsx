import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ethers } from "ethers";
import {
  unstake,
  formatCooldownTime,
  startUnlock,
  cancelUnlock,
} from "../../../../utils/stakingHelpers";

interface UnstakeSectionProps {
  stakedAmount: string;
  pendingRewards: string;
  isInCooldown: boolean;
  remainingCooldown: number;
  points?: number;
  isUnlocking?: boolean;
  canStartUnlock?: boolean;
  canCancelUnlock?: boolean;
  canUnstake?: boolean;
  onRefresh: () => void;
  onUnstakeSuccess: () => void;
}

const UnstakeSection: React.FC<UnstakeSectionProps> = ({
  stakedAmount,
  pendingRewards,
  isInCooldown,
  remainingCooldown,
  points,
  isUnlocking = false,
  canStartUnlock = true,
  canCancelUnlock = false,
  canUnstake = false,
  onRefresh,
  onUnstakeSuccess,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isInitiatingUnstake, setIsInitiatingUnstake] = useState(false);
  const [isStartingUnlock, setIsStartingUnlock] = useState(false);
  const [isCancelingUnlock, setIsCancelingUnlock] = useState(false);

  const handleStartUnlock = async () => {
    setIsStartingUnlock(true);

    try {
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Create a fresh provider and signer for the transaction
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      // Start unlock cooldown
      await startUnlock(web3Provider);

      // Refresh staking data
      await onRefresh();
      onUnstakeSuccess();
    } catch (err: any) {
      console.error("Error starting unlock:", err);
      // Error handling should be done by parent component
    } finally {
      setIsStartingUnlock(false);
    }
  };

  const handleCancelUnlock = async () => {
    setIsCancelingUnlock(true);

    try {
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Create a fresh provider and signer for the transaction
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      // Cancel unlock cooldown
      await cancelUnlock(web3Provider);

      // Refresh staking data
      await onRefresh();
      onUnstakeSuccess();
    } catch (err: any) {
      console.error("Error canceling unlock:", err);
      // Error handling should be done by parent component
    } finally {
      setIsCancelingUnlock(false);
    }
  };

  const handleInitiateUnstake = async () => {
    if (!withdrawAmount) return;

    const amountBN = ethers.utils.parseUnits(withdrawAmount, 18);
    const currentStaked = ethers.utils.parseUnits(stakedAmount, 18);

    if (currentStaked.lt(amountBN)) {
      // This should be handled by the parent component's toast context
      return;
    }

    setIsInitiatingUnstake(true);

    try {
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Create a fresh provider and signer for the transaction
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      // Unstake tokens
      await unstake(web3Provider, withdrawAmount);

      // Refresh staking data
      await onRefresh();
      setWithdrawAmount("");
      onUnstakeSuccess();
    } catch (err: any) {
      console.error("Error initiating unstake:", err);
      // Error handling should be done by parent component
    } finally {
      setIsInitiatingUnstake(false);
    }
  };

  return (
    <div className="bg-white/5 border border-black/20 rounded-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="maladroit-font text-xl text-black">Your Staking</h3>
        <div className="flex items-center justify-center">
          {isInCooldown ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
              <Icon
                icon="mdi:timer-sand"
                className="text-orange-400"
                width={14}
                height={14}
              />
              <span className="winky-sans-font text-orange-400 text-sm font-medium">
                Cooldown
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="winky-sans-font text-green-600 text-sm font-medium">
                Active
              </span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className="p-2 hover:bg-white/10 rounded-sm transition-colors group"
              title="Refresh staking data"
            >
              <Icon
                icon="mdi:refresh"
                className="text-black/70 group-hover:text-black transition-colors"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/5 border border-black/20 rounded-sm p-4">
          <div className="winky-sans-font text-black/70 text-xs mb-2 uppercase tracking-wide">
            Your Staked
          </div>
          <div className="maladroit-font text-xl text-[var(--color-accent)] font-bold">
            {parseFloat(stakedAmount).toLocaleString()}
          </div>
          <div className="winky-sans-font text-black/60 text-xs mt-1">
            $AIBOT
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-4">
          <div className="winky-sans-font text-black/70 text-xs mb-2 uppercase tracking-wide">
            Pending Rewards
          </div>
          <div className="maladroit-font text-xl text-green-600 font-bold">
            {parseFloat(pendingRewards).toFixed(2)}
          </div>
          <div className="winky-sans-font text-black/60 text-xs mt-1">
            $AIBOT
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-4">
          <div className="winky-sans-font text-black/70 text-xs mb-2 uppercase tracking-wide">
            APY Earned
          </div>
          <div className="maladroit-font text-xl text-green-600 font-bold">
            5%
          </div>
          <div className="winky-sans-font text-black/60 text-xs mt-1">
            Variable
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-4">
          <div className="winky-sans-font text-black/70 text-xs mb-2 uppercase tracking-wide">
            Points
          </div>
          <div className="maladroit-font text-xl text-yellow-400 font-bold">
            {Number(points ?? 0).toFixed(2)}
          </div>
          <div className="winky-sans-font text-black/60 text-xs mt-1">
            Points Earned
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-4">
          <div className="winky-sans-font text-black/70 text-xs mb-2 uppercase tracking-wide">
            Lock Duration
          </div>
          <div className="maladroit-font text-lg font-bold text-blue-400">
            {remainingCooldown > 0
              ? formatCooldownTime(remainingCooldown)
              : "No lock"}
          </div>
          <div className="winky-sans-font text-black/60 text-xs mt-1">
            Per staking period
          </div>
        </div>
      </div>

      {/* Unlock Status Information */}
      {isUnlocking ? (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-sm p-4 mb-4">
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:timer-sand"
              width={18}
              height={18}
              className="text-orange-600 flex-shrink-0"
            />
            <div>
              <p className="winky-sans-font font-bold text-orange-600 text-sm">
                Unlock cooldown active. You can unstake after{" "}
                {formatCooldownTime(remainingCooldown)}. Your $AIBOT rewards
                stop accruing during the cooldown.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-sm p-4 mb-4">
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:clock-outline"
              width={18}
              height={18}
              className="text-blue-600 flex-shrink-0"
            />
            <div>
              <p className="winky-sans-font font-bold text-blue-600 text-sm">
                You can start unstaking at any time. Once initiated, a 24-hour
                cooldown applies and your $AIBOT rewards stop accruing during
                the cooldown.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Unstake Section */}
      <div className="bg-white/5 border border-black/20 rounded-sm p-4">
        <h4 className="text-black font-medium mb-3 text-center">
          {canUnstake
            ? "Unstake Tokens"
            : isUnlocking
            ? "Unlock in Progress"
            : "Start Unstaking"}
        </h4>

        <div className="space-y-3">
          {canUnstake ? (
            <>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Amount to unstake"
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-black text-sm no-spinner focus:border-[var(--color-accent)] focus:outline-none transition-colors"
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
                className="w-full cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-900 border border-red-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isInitiatingUnstake ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                    Unstaking...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:arrow-up" width={16} height={16} />
                    Unstake Tokens
                  </>
                )}
              </button>
            </>
          ) : isUnlocking ? (
            <div className="space-y-3">
              <div className="text-center">
                <p className="winky-sans-font text-orange-600 text-sm mb-3">
                  Unlock cooldown: {formatCooldownTime(remainingCooldown)}
                </p>
              </div>
              <button
                onClick={handleCancelUnlock}
                disabled={isCancelingUnlock}
                className="w-full cursor-pointer bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-900 border border-yellow-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCancelingUnlock ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                    Canceling...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:close" width={16} height={16} />
                    Cancel Unlock
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartUnlock}
              disabled={isStartingUnlock}
              className="w-full cursor-pointer bg-orange-500/20 hover:bg-orange-500/30 text-orange-900 border border-orange-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isStartingUnlock ? (
                <>
                  <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                  Starting Unlock...
                </>
              ) : (
                <>
                  <Icon icon="mdi:lock-open" width={16} height={16} />
                  Start 24h Unlock
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnstakeSection;
