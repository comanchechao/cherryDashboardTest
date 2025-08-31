import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "../../../components/BSCWalletProvider";
import { useToastContext } from "../../../contexts/ToastContext";
// @ts-ignore - ethers import issue
import { ethers } from "ethers";
import {
  fetchStakingData,
  unstake,
  formatCooldownTime,
  BSC_RPC_URL,
} from "../../../utils/stakingHelpers";

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
      points: number;
      holdingSince: string;
      holdingSinceBlock: number;
      lastAwardedAt: string;
      lastBalance?: string;
      updatedAt: string;
      windowCheckedAt: string;
      windowEligible: boolean;
      windowFromBlock: number;
      windowMethod: string;
      lastCheckedAt?: string;
      stakePoints?: number;
    };
    points?: {
      _id: string;
      address: string;
      points: number;
      holdingSince: string;
      holdingSinceBlock: number;
      lastAwardedAt: string;
      lastBalance?: string;
      updatedAt: string;
      windowCheckedAt: string;
      windowEligible: boolean;
      windowFromBlock: number;
      windowMethod: string;
      lastCheckedAt?: string;
      stakePoints?: number;
    };
  } | null>(null);
  const [pointsInterval, setPointsInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  // Staking data state
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [pendingRewards, setPendingRewards] = useState<string>("0");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isInitiatingUnstake, setIsInitiatingUnstake] = useState(false);

  // Cooldown state
  const [isInCooldown, setIsInCooldown] = useState<boolean>(false);
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);

  // Fetch staking data from contract
  const fetchStakingDataLocal = async () => {
    if (!isConnected || !address) return;
    try {
      // Initialize provider - use MetaMask if available, fallback to BSC RPC
      const provider = window.ethereum
        ? new ethers.providers.Web3Provider(window.ethereum)
        : new ethers.providers.JsonRpcProvider(BSC_RPC_URL);

      // Fetch staking data using contract-level cooldown detection
      const stakingData = await fetchStakingData(provider, address);

      setStakedAmount(stakingData.stakedAmount);
      setPendingRewards(stakingData.pendingRewards);
      setIsInCooldown(stakingData.isInCooldown);
      setRemainingCooldown(stakingData.remainingCooldown);

      // Show success toast for data refresh
      if (parseFloat(stakingData.stakedAmount) > 0) {
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
    fetchStakingDataLocal();
  }, [isConnected, address]);

  // Handle initiating unstaking (starts cooldown period)
  const handleInitiateUnstake = async () => {
    if (!isConnected || !address || !withdrawAmount) return;

    const amountBN = ethers.utils.parseUnits(withdrawAmount, 18);
    const currentStaked = ethers.utils.parseUnits(stakedAmount, 18);

    if (currentStaked.lt(amountBN)) {
      showError(
        "Insufficient Amount",
        "You cannot unstake more than you have staked",
        7000
      );
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
      const receipt = await unstake(web3Provider, withdrawAmount);

      showSuccess(
        "Unstake Successful! ✅",
        `Successfully unstaked ${withdrawAmount} $AIBOT tokens.`,
        7000,
        receipt.transactionHash
      );

      // Refresh staking data
      await fetchStakingDataLocal();
      setWithdrawAmount("");
    } catch (err: any) {
      console.error("Error initiating unstake:", err);

      // Check if the error is due to tokens being locked
      if (
        err.message &&
        err.message.includes("staked tokens are still locked")
      ) {
        showError(
          "Tokens Still Locked",
          "Your staked tokens are still in the lock period. Please wait for the lock period to end before unstaking.",
          10000
        );
      } else {
        const errorMessage = err.message || "Failed to initiate unstake";
        showError("Unstake Failed ❌", errorMessage, 7000);
      }
    } finally {
      setIsInitiatingUnstake(false);
    }
  };

  // Legacy withdraw function (fallback)

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
      const prevPoints = prev?.points;
      const prevBalance = prev?.lastBalance;

      if (prevPoints !== data.points || prevBalance !== data.lastBalance) {
        console.log("[Points/Balance Update] New wallet data:", data);

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
      // Also fetch staking data if user has staked with APY
      if (stakingChoice === "pointsAndAPY") {
        fetchStakingDataLocal();

        // Set up interval to refresh staking data every 30 seconds
        const stakingInterval = setInterval(() => {
          fetchStakingDataLocal();
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
      };
    } else {
      if (pointsInterval) {
        clearInterval(pointsInterval);
        setPointsInterval(null);
      }
    }
  }, [isConnected, address, stakingChoice]); // Added stakingChoice dependency

  // Fetch staking data immediately when user enters APY staking section
  useEffect(() => {
    if (isConnected && address) {
      // Fetch data immediately when entering this section
      fetchStakingDataLocal();
    }
  }, [isConnected, address]); // This will run whenever stakingChoice changes

  // If user hasn't made a choice yet, show the original content
  if (!stakingChoice) {
    return (
      <div className="space-y-6">
        {/* Main Staking Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Total Staked Card */}
          <div className="flex flex-col bg gap-4">
            <div className="bg-white/5 border h-full border-black/20 rounded-sm p-4 lg:p-6">
              <h3 className="winky-sans-font text-black/70 text-sm mb-2">
                Total Staked
              </h3>
              <div className="maladroit-font text-xl lg:text-2xl text-black mb-4">
                {(() => {
                  const balance =
                    eligibility?.updated?.lastBalance ||
                    eligibility?.points?.lastBalance;
                  if (balance && parseFloat(balance) >= 1000) {
                    const balanceNum = parseFloat(balance);
                    return `${
                      balanceNum % 1 === 0
                        ? balanceNum.toFixed(0)
                        : balanceNum.toFixed(2)
                    } $AIBOT`;
                  }
                  return "0 $AIBOT";
                })()}
              </div>

              {/* Graph Placeholder */}
              <div className="w-full h-32 lg:h-40 rounded-sm mb-4 flex items-center justify-center">
                <img
                  src="https://storage.cherrybot.ai/chartFake.png"
                  alt="Chart"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* APY Rates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-black">
                    1000 $AIBOT minimum
                  </div>
                </div>
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-black">
                    10 points per 1000 $AIBOT
                  </div>
                </div>
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-black">
                    APY staking coming soon
                  </div>
                </div>
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-black">
                    Staking lockups coming soon
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isConnected ? (
            <div className="rounded-sm w-full h-fit overflow-hidden flex flex-col items-center justify-center">
              <img
                src="https://storage.cherrybot.ai/dashboardRobot.png"
                alt="Robot Image"
                className="h-full object-contain"
              />
            </div>
          ) : (
            <div className="rounded-sm w-full h-full overflow-hidden">
              {/* Your Stake Card */}
              <div className="bg-white/5 border border-black/20 rounded-sm p-4 lg:p-6 h-full">
                <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-black/70 text-sm">
                      Your Stake:
                    </span>
                    <span className="maladroit-font text-2xl lg:text-3xl text-black">
                      {(() => {
                        const balance =
                          eligibility?.updated?.lastBalance ||
                          eligibility?.points?.lastBalance;
                        if (balance && parseFloat(balance) >= 1000) {
                          const balanceNum = parseFloat(balance);
                          return `${
                            balanceNum % 1 === 0
                              ? balanceNum.toFixed(0)
                              : balanceNum.toFixed(2)
                          } $AIBOT`;
                        }
                        return "0 $AIBOT";
                      })()}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-black/70 text-sm">
                      Points Earned:
                    </span>
                    <span className="maladroit-font text-2xl lg:text-3xl text-black">
                      {Number(
                        eligibility?.updated?.points ??
                          eligibility?.points?.points ??
                          0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-black/70 text-sm">
                      Your APR:
                    </span>
                    <span className="maladroit-font text-base lg:text-lg text-black/70">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-black/70 text-sm">
                      Lockup Time:
                    </span>
                    <span className="maladroit-font text-base lg:text-lg text-black/70">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="text-black/70 text-sm">
                      $AIBOT Earned:
                    </span>
                    <span className="maladroit-font text-base lg:text-lg text-black/70">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Information Boxes */}
        <div className="space-y-3 lg:space-y-4">
          <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4 flex items-start gap-3">
            <Icon
              icon="mdi:lock"
              width={18}
              height={18}
              className="text-black/70 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="winky-sans-font text-black text-sm">
                Locking $AIBOT set APY for your lock duration. After your lock
                period ends you will continue to earn at the base APY rate.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4 flex items-start gap-3">
            <Icon
              icon="mdi:refresh"
              width={18}
              height={18}
              className="text-black/70 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="winky-sans-font text-black text-sm">
                Staking $AIBOT also grants stakers with AIBOT points which can
                be used to buy lootboxes that contain rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStakeClick}
            className="w-full h-fit sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 cursor-pointer text-white rounded-sm border border-[var(--color-accent)] transition-all duration-200 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-[var(--color-accent)]/25 transform hover:-translate-y-0.5"
          >
            <Icon icon="mdi:lock" className="w-5 h-5 text-white" />
            <span>Stake $AIBOT</span>
          </button>
        </div>
      </div>
    );
  }

  if (stakingChoice === "pointsAndAPY") {
    return (
      <div className="space-y-6">
        {/* User Staking Info & Unstake Section */}
        {parseFloat(stakedAmount) > 0 && (
          <div className="bg-white/5 border border-black/20 rounded-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="maladroit-font text-xl text-black">
                Your Staking
              </h3>
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
                    onClick={async () => {
                      await fetchStakingDataLocal();
                    }}
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
                  APR Earned
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
                  {Number(
                    eligibility?.updated?.stakePoints ??
                      eligibility?.points?.stakePoints ??
                      eligibility?.updated?.points ??
                      eligibility?.points?.points ??
                      0
                  ).toFixed(2)}
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

            {/* Cooldown Information */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-sm p-4 mb-4">
              <div className="flex items-start gap-3">
                <Icon
                  icon="mdi:clock-outline"
                  width={18}
                  height={18}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <h5 className="winky-sans-font text-blue-600 text-sm font-medium mb-1">
                    Staking Lock Period
                  </h5>
                  <p className="winky-sans-font text-blue-600 text-sm">
                    After staking, your tokens are locked for a specific period.
                    You cannot unstake until the lock period expires. Once the
                    lock period ends, you can unstake your tokens immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Unstake Section */}
            <div className="bg-white/5 border border-black/20 rounded-sm p-4">
              <h4 className="text-black font-medium mb-3 text-center">
                Unstake Tokens
              </h4>

              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        )}

        {/* Back to Choice Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              onStakingChoiceChange(null);
            }}
            className="px-6 py-3 cursor-pointer bg-white/10 hover:bg-white/20 text-black rounded-sm border border-white/20 transition-all duration-200 winky-sans-font flex items-center gap-2"
          >
            <Icon icon="mdi:arrow-left" width={16} height={16} />
            Back to Staking Options
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Staking Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Total Staked Card */}
        <div className="flex flex-col bg gap-4">
          <div className="bg-white/5 border h-full border-black/20 rounded-sm p-4 lg:p-6">
            <h3 className="winky-sans-font text-black/70 text-sm mb-2">
              Total Staked
            </h3>
            <div className="maladroit-font text-xl lg:text-2xl text-black mb-4">
              {(() => {
                const balance =
                  eligibility?.updated?.lastBalance ||
                  eligibility?.points?.lastBalance;
                if (balance && parseFloat(balance) >= 1000) {
                  const balanceNum = parseFloat(balance);
                  return `${
                    balanceNum % 1 === 0
                      ? balanceNum.toFixed(0)
                      : balanceNum.toFixed(2)
                  } $AIBOT`;
                }
                return "0 $AIBOT";
              })()}
            </div>

            {/* Graph Placeholder */}
            <div className="w-full h-32 lg:h-40 rounded-sm mb-4 flex items-center justify-center">
              <img
                src="https://storage.cherrybot.ai/chartFake.png"
                alt="Chart"
                className="w-full h-full object-contain"
              />
            </div>

            {/* APY Rates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-black">
                  1000 $AIBOT minimum
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-black">
                  10 points per 1000 $AIBOT
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-black">
                  APY staking coming soon
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-black">
                  Staking lockups coming soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isConnected ? (
          <div className="rounded-sm w-full h-fit overflow-hidden flex flex-col items-center justify-center">
            <img
              src="https://storage.cherrybot.ai/dashboardRobot.png"
              alt="Robot Image"
              className="h-full object-contain"
            />
          </div>
        ) : (
          <div className="rounded-sm w-full h-full overflow-hidden">
            {/* Your Stake Card */}
            <div className="bg-white/5 border border-black/20 rounded-sm p-4 lg:p-6 h-full">
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-black/70 text-sm">
                    Your Stake:
                  </span>
                  <span className="maladroit-font text-2xl lg:text-3xl text-black">
                    {(() => {
                      const balance =
                        eligibility?.updated?.lastBalance ||
                        eligibility?.points?.lastBalance;
                      if (balance && parseFloat(balance) >= 1000) {
                        const balanceNum = parseFloat(balance);
                        return `${
                          balanceNum % 1 === 0
                            ? balanceNum.toFixed(0)
                            : balanceNum.toFixed(2)
                        } $AIBOT`;
                      }
                      return "0 $AIBOT";
                    })()}
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-black/70 text-sm">
                    Points Earned:
                  </span>
                  <span className="maladroit-font text-2xl lg:text-3xl text-black">
                    {eligibility?.updated?.points ||
                      eligibility?.points?.points ||
                      0}
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-black/70 text-sm">
                    Your APR:
                  </span>
                  <span className="maladroit-font text-base lg:text-lg text-black/70">
                    Coming Soon
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-black/70 text-sm">
                    Lockup Time:
                  </span>
                  <span className="maladroit-font text-base lg:text-lg text-black/70">
                    Coming Soon
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="text-black/70 text-sm">$AIBOT Earned:</span>
                  <span className="maladroit-font text-base lg:text-lg text-black/70">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Information Boxes */}
      <div className="space-y-3 lg:space-y-4">
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4 flex items-start gap-3">
          <Icon
            icon="mdi:lock"
            width={18}
            height={18}
            className="text-black/70 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="winky-sans-font text-black text-sm">
              Locking $AIBOT set APY for your lock duration. After your lock
              period ends you will continue to earn at the base APY rate.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4 flex items-start gap-3">
          <Icon
            icon="mdi:refresh"
            width={18}
            height={18}
            className="text-black/70 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="winky-sans-font text-black text-sm">
              Staking $AIBOT also grants stakers with AIBOT points which can be
              used to buy lootboxes that contain rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 flex-wrap">
        <button
          onClick={() => {
            onStakingChoiceChange(null);
            showSuccess(
              "Returning to Options 🔄",
              "Back to staking choices",
              2000
            );
          }}
          className="px-6 py-3 bg-white/10 text-black rounded-sm border border-white/20 hover:bg-white/20 transition-colors duration-200 winky-sans-font flex items-center gap-2"
        >
          <Icon icon="mdi:arrow-left" width={16} height={16} />
          Back to Options
        </button>

        <button
          onClick={onStakeClick}
          className="px-6 py-3 bg-[#020e1f] cursor-pointer text-[var(--color-accent)] rounded-sm border border-[var(--color-accent)]/30 hover:from-[var(--color-accent)]/30 hover:to-[var(--color-accent)]/30 transition-all duration-300 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-accent/25"
        >
          <Icon icon="mdi:lock" className="w-5 h-5 text-accent mr-2" />
          <span>Stake $AIBOT</span>
        </button>
      </div>
    </div>
  );
};

export default StakeTab;
