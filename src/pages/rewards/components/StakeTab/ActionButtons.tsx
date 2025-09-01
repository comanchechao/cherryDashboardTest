import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";
import {
  startUnlock,
  cancelUnlock,
  claimRewards,
  unstake,
  formatCooldownTime,
} from "../../../../utils/stakingHelpers";

interface ActionButtonsProps {
  onStakeClick: () => void;
  onBackToOptions?: () => void;
  showBackButton?: boolean;
  stakedAmount?: string;
  pendingRewards?: string;
  isUnlocking?: boolean;
  canStartUnlock?: boolean;
  canCancelUnlock?: boolean;
  canUnstake?: boolean;
  remainingCooldown?: number;
  onRefresh?: () => void;
  onSuccess?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onStakeClick,
  onBackToOptions,
  showBackButton = false,
  stakedAmount = "0",
  pendingRewards = "0",
  isUnlocking = false,
  canStartUnlock = true,
  canCancelUnlock = false,
  canUnstake = false,
  remainingCooldown = 0,
  onRefresh,
  onSuccess,
}) => {
  const [isStartingUnlock, setIsStartingUnlock] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handleStartUnlock = async () => {
    setIsStartingUnlock(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await startUnlock(web3Provider);
      onRefresh?.();
      onSuccess?.();
    } catch (err: any) {
      console.error("Error starting unlock:", err);
    } finally {
      setIsStartingUnlock(false);
    }
  };

  const handleClaimClick = () => {
    setShowClaimModal(true);
  };

  const handleConfirmClaim = async () => {
    setShowClaimModal(false);
    setIsClaiming(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await claimRewards(web3Provider);
      onRefresh?.();
      onSuccess?.();
    } catch (err: any) {
      console.error("Error claiming rewards:", err);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      // Withdraw all staked tokens
      await unstake(web3Provider, stakedAmount);
      onRefresh?.();
      onSuccess?.();
    } catch (err: any) {
      console.error("Error withdrawing tokens:", err);
    } finally {
      setIsWithdrawing(false);
    }
  };
  const hasStakedTokens = parseFloat(stakedAmount) > 0;
  const hasPendingRewards = parseFloat(pendingRewards) > 0;

  // Debug logging for button states
  console.log("🎯 [ActionButtons] Button states:", {
    hasStakedTokens,
    hasPendingRewards,
    stakedAmount,
    pendingRewards,
    isUnlocking,
    canStartUnlock,
    canCancelUnlock,
    canUnstake,
    remainingCooldown,
  });

  if (showBackButton && onBackToOptions) {
    return (
      <div className="flex justify-center gap-3 flex-wrap">
        <button
          onClick={onBackToOptions}
          className="px-6 py-3 bg-white/10 text-black rounded-sm border border-white/20 hover:bg-white/20 transition-colors duration-200 winky-sans-font flex items-center gap-2"
        >
          <Icon icon="mdi:arrow-left" width={16} height={16} />
          Back to Options
        </button>

        <button
          onClick={onStakeClick}
          className="flex gap-2 items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
        >
          <Icon
            icon="mdi:lock"
            className="w-5 h-5 text-white mr-3 group-hover:scale-110 transition-transform duration-300"
          />
          <span>Stake $AIBOT</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {/* Stake Button */}
      <button
        onClick={onStakeClick}
        className="flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-4 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
      >
        <Icon icon="mdi:lock" className="w-5 h-5 text-white" />
        <span>Stake $AIBOT</span>
      </button>

      {/* Unstake/Unlock Buttons */}
      {hasStakedTokens && (
        <>
          {canStartUnlock && (
            <button
              onClick={handleStartUnlock}
              disabled={isStartingUnlock}
              className="flex items-center cursor-pointer justify-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-900 border border-orange-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isStartingUnlock ? (
                <>
                  <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                  Starting...
                </>
              ) : (
                <>
                  <Icon icon="mdi:lock-open" className="w-5 h-5" />
                  <span>Start Unlock</span>
                </>
              )}
            </button>
          )}

          {isUnlocking && remainingCooldown > 0 && (
            <div className="flex items-center justify-center gap-2 bg-orange-500/10 text-orange-600 border border-orange-500/20 px-4 py-3 rounded-sm winky-sans-font text-sm">
              <Icon icon="mdi:timer-sand" className="w-5 h-5" />
              <span>Unlock: {formatCooldownTime(remainingCooldown)}</span>
            </div>
          )}

          {canUnstake && (
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing}
              className="flex items-center cursor-pointer justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-900 border border-blue-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isWithdrawing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                  Withdrawing...
                </>
              ) : (
                <>
                  <Icon icon="mdi:download" className="w-5 h-5" />
                  <span>Withdraw Tokens</span>
                </>
              )}
            </button>
          )}
        </>
      )}

      {/* Claim Button - Always show when user has staked tokens */}
      {hasStakedTokens && (
        <button
          onClick={handleClaimClick}
          disabled={isClaiming}
          className="flex items-center cursor-pointer justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-900 border border-green-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isClaiming ? (
            <>
              <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
              Claiming...
            </>
          ) : (
            <>
              <Icon icon="mdi:gift" className="w-5 h-5" />
              <span>Claim Rewards</span>
            </>
          )}
        </button>
      )}

      {/* Claim Modal */}
      <AnimatePresence>
        {showClaimModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowClaimModal(false)}
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
              className="bg-[var(--color-bg-primary)] border border-[var(--color-glass-border)] rounded-lg p-8 max-w-md w-full backdrop-blur-sm relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/8 rounded-full animate-float-slow"></div>
                <div
                  className="absolute top-1/2 left-4 w-6 h-6 bg-[var(--color-accent)]/6 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
              {hasPendingRewards ? (
                <>
                  {/* Confirmation Modal */}
                  <div className="text-center mb-6 relative z-10">
                    <Icon
                      icon="mdi:gift"
                      width={60}
                      height={60}
                      className="text-[var(--color-accent)] mx-auto mb-4"
                    />
                    <h3 className="maladroit-font text-2xl text-[var(--color-text-primary)] mb-2">
                      Claim Rewards
                    </h3>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm mb-4">
                      You have{" "}
                      <strong className="text-[var(--color-text-primary)]">
                        {parseFloat(pendingRewards).toFixed(4)} $AIBOT
                      </strong>{" "}
                      in pending rewards.
                    </p>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Are you sure you want to claim your rewards?
                    </p>
                  </div>
                  <div className="flex gap-3 relative z-10">
                    <button
                      onClick={() => setShowClaimModal(false)}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmClaim}
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                    >
                      Claim Now
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* No Rewards Modal */}
                  <div className="text-center mb-6 relative z-10">
                    <Icon
                      icon="mdi:information"
                      width={60}
                      height={60}
                      className="text-[var(--color-accent)] mx-auto mb-4"
                    />
                    <h3 className="maladroit-font text-2xl text-[var(--color-text-primary)] mb-2">
                      No Pending Rewards
                    </h3>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      You have no pending rewards at the moment. Keep your
                      tokens staked to earn rewards over time.
                    </p>
                  </div>
                  <div className="flex justify-center relative z-10">
                    <button
                      onClick={() => setShowClaimModal(false)}
                      className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-10 py-1  rounded-full border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                    >
                      OK
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionButtons;
