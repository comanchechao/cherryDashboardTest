import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "../../../components/BSCWalletProvider";
import { useToastContext } from "../../../contexts/ToastContext";
// @ts-ignore - ethers import issue
import { ethers } from "ethers";

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
    };
  } | null>(null);
  const [pointsInterval, setPointsInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [activeAPYTab, setActiveAPYTab] = useState<"rewards" | "stakers">(
    "rewards"
  );

  const CONTRACT_ADDRESS = "0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074";
  const BSC_RPC_URL = "https://bsc-dataseed.binance.org";
  const POOL_ID = 409;

  // Contract ABIs
  const STAKING_POOL_ABI = [
    "function poolInfo(uint256) view returns (address stakingToken, address rewardToken, uint256 lastRewardTimestamp, uint256 accTokenPerShare, uint256 startTime, uint256 endTime, uint256 precision, uint256 totalStaked, uint256 totalReward, address owner)",
    "function userInfo(address, uint256) view returns (uint256 amount, uint256 rewardDebt)",
    "function pendingReward(address _user, uint256 poolId) view returns (uint256)",
    "function withdraw(uint256 _amount, uint256 poolId) external",
  ];

  const ERC20_ABI = ["function decimals() view returns (uint8)"];

  // Staking data state
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [pendingRewards, setPendingRewards] = useState<string>("0");
  const [totalStaked, setTotalStaked] = useState<string>("0");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState<number>(18);

  // Fetch staking data from contract
  const fetchStakingData = async () => {
    if (!isConnected || !address) return;

    try {
      // Initialize provider - use MetaMask if available, fallback to BSC RPC
      const provider = window.ethereum
        ? new ethers.providers.Web3Provider(window.ethereum)
        : new ethers.providers.JsonRpcProvider(BSC_RPC_URL);

      const stakingContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        STAKING_POOL_ABI,
        provider
      );

      // Get pool info to get staking token address
      const poolInfo = await stakingContract.poolInfo(POOL_ID);
      const stakingTokenAddress = poolInfo.stakingToken;
      const totalStakedBN = poolInfo.totalStaked;

      // Initialize token contract
      const tokenContract = new ethers.Contract(
        stakingTokenAddress,
        ERC20_ABI,
        provider
      );

      // Fetch decimals
      const decimals = await tokenContract.decimals();
      setTokenDecimals(decimals);

      // Format total staked
      const totalStakedFormatted = ethers.utils.formatUnits(
        totalStakedBN,
        decimals
      );
      setTotalStaked(totalStakedFormatted);

      // Fetch user staked amount
      const userInfo = await stakingContract.userInfo(address, POOL_ID);
      const stakedAmountBN = userInfo.amount;
      const stakedAmountFormatted = ethers.utils.formatUnits(
        stakedAmountBN,
        decimals
      );
      setStakedAmount(stakedAmountFormatted);

      // Fetch pending rewards
      const pendingBN = await stakingContract.pendingReward(address, POOL_ID);
      const pendingFormatted = ethers.utils.formatUnits(pendingBN, decimals);
      setPendingRewards(pendingFormatted);

      // Show success toast for data refresh
      if (parseFloat(stakedAmountFormatted) > 0) {
        showSuccess(
          "Staking Data Updated ",
          `Your staking data has been refreshed successfully`,
          3000
        );
      }
    } catch (err) {
      console.error("Error fetching staking data:", err);
      showError(
        "Data Fetch Failed ❌",
        "Failed to fetch staking data. Please try again.",
        5000
      );
    }
  };

  // Withdraw staked tokens
  const withdrawTokens = async () => {
    if (!isConnected || !address || !withdrawAmount) return;

    const amountBN = ethers.utils.parseUnits(withdrawAmount, tokenDecimals);
    const currentStaked = ethers.utils.parseUnits(stakedAmount, tokenDecimals);

    if (currentStaked.lt(amountBN)) {
      showError(
        "Insufficient Amount ❌",
        "You cannot unstake more than you have staked",
        7000
      );
      return;
    }

    setIsWithdrawing(true);

    try {
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Create a fresh provider and signer for the transaction
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();

      const stakingContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        STAKING_POOL_ABI,
        signer
      );

      const tx = await stakingContract.withdraw(amountBN, POOL_ID);
      await tx.wait();

      // Refresh staking data
      await fetchStakingData();
      setWithdrawAmount("");

      // Show success toast with BSCScan link
      showSuccess(
        "Withdrawal Successful!",
        `Successfully withdrew ${parseFloat(
          withdrawAmount
        ).toLocaleString()} $AIBOT tokens!`,
        7000,
        tx.hash
      );
    } catch (err: any) {
      console.error("Error withdrawing tokens:", err);
      const errorMessage = err.message || "Failed to withdraw tokens";
      showError("Withdrawal Failed ❌", errorMessage, 7000);
    } finally {
      setIsWithdrawing(false);
    }
  };

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
        fetchStakingData();

        // Set up interval to refresh staking data every 30 seconds
        const stakingInterval = setInterval(() => {
          fetchStakingData();
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
    if (isConnected && address && stakingChoice === "pointsAndAPY") {
      // Fetch data immediately when entering this section
      fetchStakingData();
    }
  }, [stakingChoice, isConnected, address]); // This will run whenever stakingChoice changes

  // If user hasn't made a choice yet, show the original content
  if (!stakingChoice) {
    return (
      <div className="space-y-6">
        {/* Main Staking Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Total Staked Card */}
          <div className="flex flex-col bg gap-4">
            <div className="bg-white/5 border h-full border-white/10 rounded-sm p-4 lg:p-6">
              <h3 className="winky-sans-font text-white/70 text-sm mb-2">
                Total Staked
              </h3>
              <div className="maladroit-font text-xl lg:text-2xl text-white mb-4">
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
                  <div className="maladroit-font text-xs text-white">
                    1000 $AIBOT minimum
                  </div>
                </div>
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-white">
                    10 points per 1000 $AIBOT
                  </div>
                </div>
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-white">
                    APY staking coming soon
                  </div>
                </div>
                <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                  <div className="maladroit-font text-xs text-white">
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
              <div className="bg-white/5 border border-white/10 rounded-sm p-4 lg:p-6 h-full">
                <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-white/70 text-sm">
                      Your Stake:
                    </span>
                    <span className="maladroit-font text-2xl lg:text-3xl text-white">
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
                    <span className="maladroit-font text-white/70 text-sm">
                      Cherry Points Earned:
                    </span>
                    <span className="maladroit-font text-2xl lg:text-3xl text-white">
                      {eligibility?.updated?.points ||
                        eligibility?.points?.points ||
                        0}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-white/70 text-sm">
                      Your APR:
                    </span>
                    <span className="maladroit-font text-base lg:text-lg text-white/70">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="maladroit-font text-white/70 text-sm">
                      Lockup Time:
                    </span>
                    <span className="maladroit-font text-base lg:text-lg text-white/70">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-start">
                    <span className="text-white/70 text-sm">
                      $AIBOT Earned:
                    </span>
                    <span className="maladroit-font text-base lg:text-lg text-white/70">
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
          <div className="bg-white/5 border border-white/10 rounded-sm p-3 lg:p-4 flex items-start gap-3">
            <Icon
              icon="mdi:lock"
              width={18}
              height={18}
              className="text-white/70 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="winky-sans-font text-white text-sm">
                Locking $AIBOT set APY for your lock duration. After your lock
                period ends you will continue to earn at the base APY rate.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-sm p-3 lg:p-4 flex items-start gap-3">
            <Icon
              icon="mdi:refresh"
              width={18}
              height={18}
              className="text-white/70 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="winky-sans-font text-white text-sm">
                Staking $AIBOT also grants stakers with AIBOT points which can
                be used to buy lootboxes that contain rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStakeClick}
            className="w-full h-fit sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-[#020e1f] cursor-pointer text-[var(--color-accent)] rounded-sm border border-[var(--color-accent)]/30 hover:from-[var(--color-accent)]/30 hover:to-[var(--color-accent)]/30 transition-all duration-300 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-accent/25"
          >
            <Icon icon="mdi:lock" className="w-5 h-5 text-accent" />
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
          <div className="bg-white/5 border border-white/10 rounded-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="maladroit-font text-xl text-white">
                Your Staking
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="winky-sans-font text-green-400 text-sm font-medium">
                  Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                <div className="winky-sans-font text-white/70 text-xs mb-2 uppercase tracking-wide">
                  Your Staked
                </div>
                <div className="maladroit-font text-xl text-[var(--color-accent)] font-bold">
                  {parseFloat(stakedAmount).toLocaleString()}
                </div>
                <div className="winky-sans-font text-white/60 text-xs mt-1">
                  $AIBOT
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                <div className="winky-sans-font text-white/70 text-xs mb-2 uppercase tracking-wide">
                  Pending Rewards
                </div>
                <div className="maladroit-font text-xl text-green-400 font-bold">
                  {parseFloat(pendingRewards).toFixed(2)}
                </div>
                <div className="winky-sans-font text-white/60 text-xs mt-1">
                  $AIBOT
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                <div className="winky-sans-font text-white/70 text-xs mb-2 uppercase tracking-wide">
                  APR Earned
                </div>
                <div className="maladroit-font text-xl text-green-400 font-bold">
                  5.07%
                </div>
                <div className="winky-sans-font text-white/60 text-xs mt-1">
                  Variable
                </div>
              </div>
            </div>

            {/* Unstake Section */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-4">
              <h4 className="text-white font-medium mb-3 text-center">
                Unstake Tokens
              </h4>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Amount to unstake"
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-white text-sm no-spinner focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  />
                  <button
                    onClick={() => setWithdrawAmount(stakedAmount)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--color-accent)] text-xs hover:text-[var(--color-accent)]/80 transition-colors"
                  >
                    MAX
                  </button>
                </div>
                <button
                  onClick={withdrawTokens}
                  disabled={
                    isWithdrawing ||
                    !withdrawAmount ||
                    parseFloat(withdrawAmount) <= 0
                  }
                  className="w-full cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-3 rounded-sm winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isWithdrawing ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                      Withdrawing...
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

        <div className="flex items-center justify-between ">
          <div className="flex space-x-1 bg-white/5 border border-white/10 rounded-sm p-1">
            <button
              onClick={() => setActiveAPYTab("rewards")}
              className={`px-6 py-2 cursor-pointer rounded-sm text-sm font-medium transition-all duration-200 ${
                activeAPYTab === "rewards"
                  ? "bg-[var(--color-accent)] text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon icon="mdi:gift" width={16} height={16} />
                <span className="winky-sans-font">Rewards</span>
                <span className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs px-2 py-0.5 rounded-full">
                  0
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveAPYTab("stakers")}
              className={`px-6 py-2 cursor-pointer rounded-sm text-sm font-medium transition-all duration-200 ${
                activeAPYTab === "stakers"
                  ? "bg-[var(--color-accent)] text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon icon="mdi:account-group" width={16} height={16} />
                <span className="winky-sans-font">Stakers</span>
                <span className="bg-white/20 text-white/60 text-xs px-2 py-0.5 rounded-full">
                  48
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeAPYTab === "rewards" && (
          <div className="bg-white/5 border border-white/10 rounded-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="maladroit-font text-xl text-white mb-1">
                  reward streams
                </h3>
                <p className="winky-sans-font text-white/60 text-sm">
                  Stake your tokens and subscribe to begin receiving rewards
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={async () => {
                    showSuccess(
                      "Refreshing Data 🔄",
                      "Fetching latest staking information...",
                      2000
                    );
                    await fetchStakingData();
                  }}
                  className="p-2 hover:bg-white/10 rounded-sm transition-colors group"
                  title="Refresh staking data"
                >
                  <Icon
                    icon="mdi:refresh"
                    className="text-white/70 group-hover:text-white transition-colors"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>

            {/* Reward Stream Card with enhanced design */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 hover:bg-white/10 transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="maladroit-font text-white text-lg font-bold">
                        $AIBOT
                      </div>
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full winky-sans-font">
                        Active
                      </div>
                    </div>
                    <div className="winky-sans-font text-white/70 text-sm flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Icon icon="mdi:clock-outline" width={14} height={14} />
                        Ends in 5 months
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon
                          icon="mdi:account-multiple"
                          width={14}
                          height={14}
                        />
                        39 stakers
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="mdi:currency-usd" width={14} height={14} />
                        195M pool
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="maladroit-font text-green-400 text-xl font-bold">
                    5% APR
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeAPYTab === "stakers" && (
          <div className="bg-white/5 border border-white/10 rounded-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="maladroit-font text-xl text-white mb-1">
                  Top Stakers
                </h3>
                <p className="winky-sans-font text-white/60 text-sm">
                  48 active stakers • Total staked: 204M $AIBOT
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/70 text-xs rounded-sm transition-colors winky-sans-font">
                  24h
                </button>
                <button className="px-3 py-1.5 bg-green-500/20 text-green-400 text-xs rounded-sm winky-sans-font">
                  7d
                </button>
                <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/70 text-xs rounded-sm transition-colors winky-sans-font">
                  30d
                </button>
              </div>
            </div>

            {/* Stakers leaderboard placeholder */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div
                  key={rank}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        rank === 1
                          ? "bg-yellow-500/20 text-yellow-400"
                          : rank === 2
                          ? "bg-gray-500/20 text-gray-400"
                          : rank === 3
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      #{rank}
                    </div>
                    <div>
                      <div className="text-white font-medium winky-sans-font">
                        {rank === 1
                          ? "0x1234...5678"
                          : `0x${Math.random()
                              .toString(16)
                              .substr(2, 4)}...${Math.random()
                              .toString(16)
                              .substr(2, 4)}`}
                      </div>
                      <div className="text-white/60 text-xs winky-sans-font">
                        Staking for {Math.floor(Math.random() * 90 + 10)} days
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold winky-sans-font">
                      {(Math.random() * 50 + 10).toFixed(1)}M
                    </div>
                    <div className="text-white/60 text-xs winky-sans-font">
                      $AIBOT
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View all button */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-sm transition-colors winky-sans-font">
                View all stakers
              </button>
            </div>
          </div>
        )}

        {/* Back to Choice Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              onStakingChoiceChange(null);
              showSuccess(
                "Returning to Options 🔄",
                "Back to staking choices",
                2000
              );
            }}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-sm border border-white/20 transition-all duration-200 winky-sans-font flex items-center gap-2"
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
          <div className="bg-white/5 border h-full border-white/10 rounded-sm p-4 lg:p-6">
            <h3 className="winky-sans-font text-white/70 text-sm mb-2">
              Total Staked
            </h3>
            <div className="maladroit-font text-xl lg:text-2xl text-white mb-4">
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
                <div className="maladroit-font text-xs text-white">
                  1000 $AIBOT minimum
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-white">
                  10 points per 1000 $AIBOT
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-white">
                  APY staking coming soon
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center rounded-sm p-2 lg:p-3 text-center">
                <div className="maladroit-font text-xs text-white">
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
            <div className="bg-white/5 border border-white/10 rounded-sm p-4 lg:p-6 h-full">
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-white/70 text-sm">
                    Your Stake:
                  </span>
                  <span className="maladroit-font text-2xl lg:text-3xl text-white">
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
                  <span className="maladroit-font text-white/70 text-sm">
                    Cherry Points Earned:
                  </span>
                  <span className="maladroit-font text-2xl lg:text-3xl text-white">
                    {eligibility?.updated?.points ||
                      eligibility?.points?.points ||
                      0}
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-white/70 text-sm">
                    Your APR:
                  </span>
                  <span className="maladroit-font text-base lg:text-lg text-white/70">
                    Coming Soon
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="maladroit-font text-white/70 text-sm">
                    Lockup Time:
                  </span>
                  <span className="maladroit-font text-base lg:text-lg text-white/70">
                    Coming Soon
                  </span>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <span className="text-white/70 text-sm">$AIBOT Earned:</span>
                  <span className="maladroit-font text-base lg:text-lg text-white/70">
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
        <div className="bg-white/5 border border-white/10 rounded-sm p-3 lg:p-4 flex items-start gap-3">
          <Icon
            icon="mdi:lock"
            width={18}
            height={18}
            className="text-white/70 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="winky-sans-font text-white text-sm">
              Locking $AIBOT set APY for your lock duration. After your lock
              period ends you will continue to earn at the base APY rate.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-sm p-3 lg:p-4 flex items-start gap-3">
          <Icon
            icon="mdi:refresh"
            width={18}
            height={18}
            className="text-white/70 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="winky-sans-font text-white text-sm">
              Staking $AIBOT also grants stakers with AIBOT points which can be
              used to buy lootboxes that contain rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Choice Button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            onStakingChoiceChange(null);
            showSuccess(
              "Returning to Options 🔄",
              "Back to staking choices",
              2000
            );
          }}
          className="px-6 py-3 bg-white/10 text-white rounded-sm border border-white/20 hover:bg-white/20 transition-colors duration-200 winky-sans-font mr-4"
        >
          ← Back to Staking Options
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
