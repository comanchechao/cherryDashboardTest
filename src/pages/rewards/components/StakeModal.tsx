import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useWallet } from "../../../components/BSCWalletProvider";
import BSCWalletButton from "../../../components/BSCWalletButton";
import { useToastContext } from "../../../contexts/ToastContext";
// import axios from "axios"; // Commented out for testing - eligibility always true
// @ts-ignore - ethers import issue
import { ethers } from "ethers";
import {
  STAKING_ADDRESS,
  TOKEN_ADDRESS,
  getBestProvider,
  stake,
} from "../../../utils/stakingHelpers";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStakingChoice: (choice: "points" | "pointsAndAPY") => void;
  onSuccessfulStaking?: (
    choice: "points" | "pointsAndAPY",
    amount: string
  ) => void;
}

// Contract ABIs
// const STAKING_POOL_ABI = [
//   "function poolInfo(uint256) view returns (address stakingToken, address rewardToken, uint256 lastRewardTimestamp, uint256 accTokenPerShare, uint256 startTime, uint256 endTime, uint256 precision, uint256 totalStaked, uint256 totalReward, address owner)",
//   "function userInfo(address, uint256) view returns (uint256 amount, uint256 rewardDebt)",
//   "function deposit(uint256 _amount, uint256 poolId) external",
//   "function poolLength() view returns (uint256)",
// ];

const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
];

const CONTRACT_ADDRESS = STAKING_ADDRESS;

type ModalStep = "setup" | "choice" | "apy" | "success";

type SetupSubStep = "wallet" | "info" | "eligibility";
type APYSubStep = "amount" | "approval" | "staking";

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  onClose,
  onStakingChoice,
  onSuccessfulStaking,
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>("setup");
  const [setupSubStep, setSetupSubStep] = useState<SetupSubStep>("wallet");
  const [apySubStep, setApySubStep] = useState<APYSubStep>("amount");
  const [stakingChoice, setStakingChoice] = useState<
    "points" | "pointsAndAPY" | null
  >(null);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [allowance, setAllowance] = useState<string>("0");
  const [tokenDecimals, setTokenDecimals] = useState<number>(18);

  // Loading states
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [eligibilityLoading, setEligibilityLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [networkInfo, setNetworkInfo] = useState<{
    chainId: number;
    name: string;
  } | null>(null);

  // Transaction hashes
  const [approvalTxHash, setApprovalTxHash] = useState<string>("");
  const [stakingTxHash, setStakingTxHash] = useState<string>("");

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

  // Initialize provider - use MetaMask if available, fallback to BSC RPC
  // Note: For transactions, we'll create fresh Web3Provider instances to avoid signer issues
  const provider = getBestProvider();

  // Progress steps configuration
  const steps: { key: ModalStep; label: string; icon: string }[] = [
    { key: "setup", label: "Setup", icon: "mdi:account-check" },
    { key: "choice", label: "Options", icon: "mdi:layers" },
    { key: "apy", label: "5% APY", icon: "mdi:percent" },
    { key: "success", label: "Complete", icon: "mdi:check-all" },
  ];

  // Setup sub-steps
  const setupSubSteps: { key: SetupSubStep; label: string; icon: string }[] = [
    { key: "wallet", label: "Connect", icon: "mdi:wallet" },
    { key: "info", label: "Info", icon: "mdi:information" },
    { key: "eligibility", label: "Eligibility", icon: "mdi:check-circle" },
  ];

  // APY sub-steps
  const apySubSteps: { key: APYSubStep; label: string; icon: string }[] = [
    { key: "amount", label: "Amount", icon: "mdi:currency-usd" },
    { key: "approval", label: "Approve", icon: "mdi:check" },
    { key: "staking", label: "Stake", icon: "mdi:lock" },
  ];

  // Get current step index
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.key === currentStep);
  };

  // Check if user is on BSC network and auto-switch if needed
  const checkNetwork = async () => {
    if (!window.ethereum) return true; // Skip check if no MetaMask

    try {
      const network = await provider.getNetwork();
      const BSC_CHAIN_ID = 56; // BSC Mainnet

      if (network.chainId !== BSC_CHAIN_ID) {
        // Try to switch to BSC Mainnet automatically
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }], // BSC Mainnet chain ID in hex
          });

          // Update network info after successful switch
          setTimeout(async () => {
            try {
              const newNetwork = await provider.getNetwork();
              const getNetworkName = (chainId: number) => {
                switch (chainId) {
                  case 1:
                    return "Ethereum Mainnet";
                  case 56:
                    return "BSC Mainnet";
                  case 97:
                    return "BSC Testnet";
                  case 137:
                    return "Polygon";
                  case 43114:
                    return "Avalanche";
                  default:
                    return `Network ${chainId}`;
                }
              };
              setNetworkInfo({
                chainId: newNetwork.chainId,
                name: getNetworkName(newNetwork.chainId),
              });
            } catch (err) {
              console.error("Error updating network info:", err);
            }
          }, 1000);

          return true;
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "BSC Mainnet",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });

              // Update network info after successful add
              setTimeout(async () => {
                try {
                  const newNetwork = await provider.getNetwork();
                  const getNetworkName = (chainId: number) => {
                    switch (chainId) {
                      case 1:
                        return "Ethereum Mainnet";
                      case 56:
                        return "BSC Mainnet";
                      case 97:
                        return "BSC Testnet";
                      case 137:
                        return "Polygon";
                      case 43114:
                        return "Avalanche";
                      default:
                        return `Network ${chainId}`;
                    }
                  };
                  setNetworkInfo({
                    chainId: newNetwork.chainId,
                    name: getNetworkName(newNetwork.chainId),
                  });
                } catch (err) {
                  console.error("Error updating network info:", err);
                }
              }, 1000);

              return true;
            } catch (addError) {
              console.error("Error adding BSC network:", addError);
              setError(
                "Please manually switch to BSC Mainnet in MetaMask to continue"
              );
              return false;
            }
          } else if (switchError.code === 4001) {
            // User rejected the request
            setError("Please switch to BSC Mainnet to continue");
            return false;
          } else {
            console.error("Error switching network:", switchError);
            setError("Please switch to BSC Mainnet to continue");
            return false;
          }
        }
      }
      return true;
    } catch (err) {
      console.error("Error checking network:", err);
      return true; // Continue anyway
    }
  };

  // Fetch token data (balance, allowance, decimals)
  const fetchTokenData = async () => {
    if (!isConnected || !address) return;

    const isCorrectNetwork = await checkNetwork();
    if (!isCorrectNetwork) return;

    try {
      console.log("Fetching token data...");
      console.log("Contract Address:", CONTRACT_ADDRESS);
      console.log("Token Address:", TOKEN_ADDRESS);
      console.log("User Address:", address);

      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        ERC20_ABI,
        provider
      );

      const decimals = await tokenContract.decimals();
      console.log("Token decimals:", decimals);
      setTokenDecimals(decimals);

      const balanceBN = await tokenContract.balanceOf(address);
      const balanceFormatted = ethers.utils.formatUnits(balanceBN, decimals);
      console.log("Token balance:", balanceFormatted);
      setTokenBalance(balanceFormatted);

      const allowanceBN = await tokenContract.allowance(
        address,
        CONTRACT_ADDRESS
      );
      const allowanceFormatted = ethers.utils.formatUnits(
        allowanceBN,
        decimals
      );
      console.log("Token allowance:", allowanceFormatted);
      setAllowance(allowanceFormatted);
    } catch (err: any) {
      console.error("Error fetching token data:", err);
      setError(
        "Failed to fetch token data. Make sure you're on BSC Mainnet and try again."
      );
    }
  };

  // Approve tokens
  const approveTokens = async () => {
    if (!isConnected || !address || !stakeAmount) return;

    // Check network first
    const isCorrectNetwork = await checkNetwork();
    if (!isCorrectNetwork) return;

    setIsApproving(true);
    setError("");

    try {
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Create a fresh provider and signer for the transaction
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();

      // Initialize token contract with signer
      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        ERC20_ABI,
        signer
      );

      const amountBN = ethers.utils.parseUnits(stakeAmount, tokenDecimals);
      const tx = await tokenContract.approve(CONTRACT_ADDRESS, amountBN);

      setApprovalTxHash(tx.hash);
      await tx.wait();

      // Show success toast with BSCScan link
      showSuccess(
        "Approval Successful!",
        `Tokens approved for staking. Transaction confirmed on BSC.`,
        7000, // 7 seconds
        tx.hash // This will create a BSCScan link
      );

      // Refresh allowance
      await fetchTokenData();
      setApySubStep("staking");
    } catch (err: any) {
      console.error("Error approving tokens:", err);
      const errorMessage = err.message || "Failed to approve tokens";
      setError(errorMessage);

      // Show error toast
      showError(
        "Approval Failed",
        errorMessage,
        7000 // 7 seconds
      );
    } finally {
      setIsApproving(false);
    }
  };

  // Stake tokens
  const stakeTokens = async () => {
    if (!isConnected || !address || !stakeAmount) return;

    // Check network first
    const isCorrectNetwork = await checkNetwork();
    if (!isCorrectNetwork) return;

    setIsStaking(true);
    setError("");

    try {
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Create a fresh provider and signer for the transaction
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      // Use the stake function from stakingHelpers
      const receipt = await stake(web3Provider, stakeAmount);

      setStakingTxHash(receipt.transactionHash);

      showSuccess(
        "Staking Successful!  ",
        `Successfully staked ${parseFloat(
          stakeAmount
        ).toLocaleString()} $AIBOT tokens with 5% APY!`,
        7000,
        receipt.transactionHash
      );

      // Update parent component now that staking is complete
      if (stakingChoice) {
        onStakingChoice(stakingChoice);
      }

      setCurrentStep("success");
    } catch (err: any) {
      console.error("Error staking tokens:", err);
      const errorMessage = err.message || "Failed to stake tokens";
      setError(errorMessage);

      // Show error toast
      showError(
        "Staking Failed ❌",
        errorMessage,
        7000 // 7 seconds
      );
    } finally {
      setIsStaking(false);
    }
  };

  // Run eligibility check
  const runEligibilityCheck = async () => {
    if (!isConnected || !address) return;

    setEligibilityLoading(true);
    setEligibility({
      eligible: true,
    });
    setError("");
    setEligibilityLoading(false);

    // try {
    //   const payload = { address };
    //   const res = await axios.post(
    //     "https://monitor.cherrypump.com/token/api/wallets/check",
    //     payload,
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       maxBodyLength: Infinity,
    //     }
    //   );

    //   if (res.data.points) {
    //     setEligibility({
    //       eligible: true,
    //       reason: "Points already awarded recently, timer active",
    //       points: res.data.points,
    //     });
    //   } else {
    //     setEligibility(res.data);
    //   }
    // } catch (err: any) {
    //   console.error("[Eligibility API] Error:", err);
    //   setEligibility({
    //     eligible: false,
    //     reason: "Eligibility check failed",
    //   });
    // } finally {
    //   setEligibilityLoading(false);
    // }
  };

  useEffect(() => {
    if (isConnected && currentStep === "setup" && setupSubStep === "wallet") {
      setSetupSubStep("info");
    }
  }, [isConnected, currentStep, setupSubStep]);

  useEffect(() => {
    if (
      currentStep === "setup" &&
      setupSubStep === "eligibility" &&
      isConnected &&
      address
    ) {
      runEligibilityCheck();
    }
  }, [currentStep, setupSubStep, isConnected, address]);

  useEffect(() => {
    if (
      currentStep === "apy" &&
      apySubStep === "amount" &&
      stakingChoice === "pointsAndAPY"
    ) {
      fetchTokenData();
    }
  }, [currentStep, apySubStep, stakingChoice]);

  // Check network when modal opens (passive check only - no auto-switching)
  useEffect(() => {
    if (isOpen && isConnected) {
      // Only update network info for display, don't trigger network switching
      const passiveNetworkCheck = async () => {
        if (!window.ethereum) return;

        try {
          const network = await provider.getNetwork();

          // Update network info for display
          const getNetworkName = (chainId: number) => {
            switch (chainId) {
              case 1:
                return "Ethereum Mainnet";
              case 56:
                return "BSC Mainnet";
              case 97:
                return "BSC Testnet";
              case 137:
                return "Polygon";
              case 43114:
                return "Avalanche";
              default:
                return `Network ${chainId}`;
            }
          };

          setNetworkInfo({
            chainId: network.chainId,
            name: getNetworkName(network.chainId),
          });
        } catch (err) {
          console.error("Error checking network:", err);
        }
      };

      passiveNetworkCheck();
    }
  }, [isOpen, isConnected]);

  const handleClose = () => {
    setCurrentStep("setup");
    setSetupSubStep("wallet");
    setApySubStep("amount");
    setStakingChoice(null);
    setStakeAmount("");
    setError("");
    setApprovalTxHash("");
    setStakingTxHash("");
    setEligibility(null);
    setNetworkInfo(null);
    onClose();
  };

  const handleStakingChoice = (choice: "points" | "pointsAndAPY") => {
    setStakingChoice(choice);

    if (choice === "points") {
      // For points only, update parent and close modal
      onStakingChoice(choice);
      handleClose();
    } else {
      // For APY, continue to APY step but don't update parent yet
      // Parent will be updated when staking is completed
      setCurrentStep("apy");
      setApySubStep("amount");
    }
  };

  const handleAmountSubmit = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    const amountNum = parseFloat(stakeAmount);
    const balanceNum = parseFloat(tokenBalance);

    if (amountNum > balanceNum) {
      setError("Insufficient balance");
      return;
    }

    // Check if approval is needed
    const currentAllowance = parseFloat(allowance);
    if (currentAllowance >= amountNum) {
      // Already approved, skip to staking
      setApySubStep("staking");
    } else {
      // Need approval first
      setApySubStep("approval");
    }

    setError("");
  };

  const ProgressStepper = () => {
    const currentIndex = getCurrentStepIndex();

    const visibleSteps =
      stakingChoice === "pointsAndAPY"
        ? steps
        : steps.filter((step) => step.key !== "apy");

    return (
      <div className="mb-8">
        {/* Main Progress Steps */}
        <div className="flex items-center justify-between mb-4">
          {visibleSteps.map((step, index) => {
            const stepIndex = steps.findIndex((s) => s.key === step.key);
            const isActive = stepIndex === currentIndex;
            const isCompleted = stepIndex < currentIndex;
            const isAccessible = stepIndex <= currentIndex;

            return (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-black"
                      : isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isAccessible
                      ? "border-[var(--color-accent)]/40 text-[var(--color-accent)]"
                      : "border-[var(--color-accent)]/30 text-[var(--color-accent)]/70"
                  }`}
                >
                  {isCompleted ? (
                    <Icon icon="mdi:check" width={20} height={20} />
                  ) : (
                    <Icon
                      icon={step.icon}
                      className={
                        isActive ? "text-white" : "text-[var(--color-accent)]"
                      }
                      width={20}
                      height={20}
                    />
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div
                    className={`text-xs font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-accent)]"
                        : isCompleted
                        ? "text-green-600"
                        : isAccessible
                        ? "text-[var(--color-accent)]/70"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
                {index < visibleSteps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-colors duration-200 ${
                      stepIndex < currentIndex
                        ? "bg-green-500"
                        : "bg-[var(--color-accent)]/30"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Setup Sub-Steps */}
        {currentStep === "setup" && (
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-3">
            <div className="flex items-center justify-between">
              {setupSubSteps.map((subStep, index) => {
                const isActive = subStep.key === setupSubStep;
                const isCompleted =
                  (subStep.key === "wallet" &&
                    (setupSubStep === "info" ||
                      setupSubStep === "eligibility")) ||
                  (subStep.key === "info" && setupSubStep === "eligibility");

                return (
                  <div key={subStep.key} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200 ${
                        isActive
                          ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-black"
                          : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-[var(--color-accent)]/40 text-[var(--color-accent)]"
                      }`}
                    >
                      {isCompleted ? (
                        <Icon icon="mdi:check" width={12} height={12} />
                      ) : (
                        <Icon
                          icon={subStep.icon}
                          className={
                            isActive
                              ? "text-white"
                              : "text-[var(--color-accent)]"
                          }
                          width={12}
                          height={12}
                        />
                      )}
                    </div>
                    <div className="ml-1 hidden sm:block">
                      <div
                        className={`text-xs transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-accent)]"
                            : isCompleted
                            ? "text-green-600"
                            : "text-[var(--color-accent)]"
                        }`}
                      >
                        {subStep.label}
                      </div>
                    </div>
                    {index < setupSubSteps.length - 1 && (
                      <div
                        className={`w-4 h-0.5 mx-1 transition-colors duration-200 ${
                          isCompleted
                            ? "bg-green-500"
                            : "bg-[var(--color-accent)]/30"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* APY Sub-Steps */}
        {currentStep === "apy" && (
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-3">
            <div className="flex items-center justify-between">
              {apySubSteps.map((subStep, index) => {
                const isActive = subStep.key === apySubStep;
                const isCompleted =
                  (subStep.key === "amount" &&
                    (apySubStep === "approval" || apySubStep === "staking")) ||
                  (subStep.key === "approval" && apySubStep === "staking");

                return (
                  <div key={subStep.key} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200 ${
                        isActive
                          ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-black"
                          : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-[var(--color-accent)]/40 text-[var(--color-accent)]"
                      }`}
                    >
                      {isCompleted ? (
                        <Icon icon="mdi:check" width={12} height={12} />
                      ) : (
                        <Icon
                          icon={subStep.icon}
                          className={
                            isActive
                              ? "text-white"
                              : "text-[var(--color-accent)]"
                          }
                          width={12}
                          height={12}
                        />
                      )}
                    </div>
                    <div className="ml-1 hidden sm:block">
                      <div
                        className={`text-xs transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-accent)]"
                            : isCompleted
                            ? "text-green-600"
                            : "text-[var(--color-accent)]"
                        }`}
                      >
                        {subStep.label}
                      </div>
                    </div>
                    {index < apySubSteps.length - 1 && (
                      <div
                        className={`w-4 h-0.5 mx-1 transition-colors duration-200 ${
                          isCompleted
                            ? "bg-green-500"
                            : "bg-[var(--color-accent)]/30"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
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
            className="bg-[var(--color-bg-primary)] border border-[var(--color-glass-border)] rounded-lg p-8 max-w-xl w-full backdrop-blur-sm max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 right-4 w-16 h-16 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-[var(--color-accent)]/8 rounded-full animate-float-slow"></div>
              <div
                className="absolute top-1/2 left-4 w-8 h-8 bg-[var(--color-accent)]/6 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
            {/* Header */}
            <div className="text-center mb-6 relative z-10">
              <Icon
                icon="mdi:wallet"
                width={60}
                height={60}
                className="text-[var(--color-accent)] mx-auto mb-4"
              />
              <h3 className="maladroit-font text-2xl text-[var(--color-text-primary)] mb-2">
                Stake $AIBOT
              </h3>
              {networkInfo && (
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                      networkInfo.chainId === 56
                        ? "bg-green-500/20 text-green-600 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    <Icon
                      icon={
                        networkInfo.chainId === 56
                          ? "mdi:check-circle"
                          : "mdi:alert-circle"
                      }
                      width={12}
                      height={12}
                      className="mr-1"
                    />
                    {networkInfo.name}
                  </div>
                  {networkInfo.chainId !== 56 && (
                    <button
                      onClick={() => checkNetwork()}
                      className="text-xs bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/30 text-[var(--color-accent)] px-3 py-1 rounded-full border border-[var(--color-accent)]/30 transition-all duration-200 flex items-center gap-1"
                    >
                      <Icon icon="mdi:swap-horizontal" width={12} height={12} />
                      Switch to BSC
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Progress Stepper */}
            <ProgressStepper />

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 relative overflow-hidden">
                <div className="absolute top-2 right-2 w-4 h-4 bg-red-500/20 rounded-full animate-ping"></div>
                <Icon
                  icon="mdi:alert-circle"
                  width={20}
                  height={20}
                  className="text-red-400 inline mr-2"
                />
                <span className="winky-sans-font text-red-400 text-sm">
                  {error}
                </span>
              </div>
            )}

            {/* Step Content */}
            <div className="space-y-6">
              {currentStep === "setup" && setupSubStep === "wallet" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 flex items-center justify-center flex-col text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <Icon
                    icon="mdi:wallet-off"
                    width={60}
                    height={60}
                    className="text-[var(--color-text-secondary)] mx-auto mb-4"
                  />
                  <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm mb-4">
                    Connect your wallet to continue
                  </p>
                  <BSCWalletButton />
                </div>
              )}

              {currentStep === "setup" && setupSubStep === "info" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    <Icon
                      icon="mdi:information"
                      width={60}
                      height={60}
                      className="text-[var(--color-accent)] mx-auto mb-4"
                    />
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                      <Icon
                        icon="mdi:alert-circle"
                        width={24}
                        height={24}
                        className="text-yellow-800 inline mr-2"
                      />
                      <span className="winky-sans-font text-yellow-800 text-sm">
                        Buying or Selling $AIBOT during staking could increase
                        or decrease the rate that you earn points
                      </span>
                    </div>
                    <p className="winky-sans-font text-[var(--color-accent)] text-sm">
                      Please read the information above carefully before
                      proceeding to stake your $AIBOT tokens.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setSetupSubStep("eligibility")}
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {currentStep === "setup" && setupSubStep === "eligibility" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    {eligibilityLoading ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin h-8 w-8 border-b-2 border-[var(--color-accent)] rounded-full"></div>
                        <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                          Checking eligibility...
                        </p>
                      </div>
                    ) : (
                      <>
                        <Icon
                          icon={
                            eligibility?.eligible
                              ? "mdi:check-circle"
                              : "mdi:close-circle"
                          }
                          width={60}
                          height={60}
                          className={`${
                            eligibility?.eligible
                              ? "text-green-600"
                              : "text-red-400"
                          } mx-auto mb-4`}
                        />
                        <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-4">
                          Eligibility Check
                        </h4>
                        {eligibility?.eligible ? (
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                            <Icon
                              icon="mdi:check-circle"
                              width={24}
                              height={24}
                              className="text-green-600 inline mr-2"
                            />
                            <span className="winky-sans-font text-green-600 text-sm">
                              You are eligible to stake $AIBOT!
                            </span>
                          </div>
                        ) : (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                            <Icon
                              icon="mdi:close-circle"
                              width={24}
                              height={24}
                              className="text-red-400 inline mr-2"
                            />
                            <span className="winky-sans-font text-red-400 text-sm">
                              Not eligible - You need at least 1000 $AIBOT
                              tokens
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSetupSubStep("info")}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                    >
                      Back
                    </button>
                    {eligibility?.eligible ? (
                      <button
                        onClick={() => setCurrentStep("choice")}
                        className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={handleClose}
                        className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              )}

              {currentStep === "choice" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    <Icon
                      icon="mdi:layers"
                      width={60}
                      height={60}
                      className="text-[var(--color-accent)] mx-auto mb-4"
                    />
                    <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-4">
                      Choose your staking option
                    </h4>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-4">
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm mb-3">
                        <strong className="text-[var(--color-text-primary)]">
                          AI Bot points:
                        </strong>{" "}
                        Only rewards points and tokens will remain in your
                        wallet
                      </p>
                      <button
                        onClick={() => handleStakingChoice("points")}
                        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-4 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                      >
                        AI Bot Points Only
                      </button>
                    </div>
                    <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-4">
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm mb-3">
                        <strong className="text-[var(--color-text-primary)]">
                          Points and APY:
                        </strong>{" "}
                        You will earn points and 5% APY, and the tokens will be
                        sent to smart contract
                      </p>
                      <button
                        onClick={() => handleStakingChoice("pointsAndAPY")}
                        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-4 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                      >
                        AI Bot Points + 5% APY
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCurrentStep("setup");
                        setSetupSubStep("eligibility");
                      }}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {currentStep === "apy" && apySubStep === "amount" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-4">
                      Enter Stake Amount
                    </h4>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--color-text-secondary)]">
                          Balance:
                        </span>
                        <span className="text-[var(--color-text-primary)] font-medium">
                          {parseFloat(tokenBalance).toLocaleString()} $AIBOT
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          placeholder="0.0"
                          className="w-full bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm px-4 py-1 text-[var(--color-text-primary)] text-lg no-spinner focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                        />
                        <button
                          onClick={() => setStakeAmount(tokenBalance)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--color-accent)] text-sm hover:text-[var(--color-accent)]/80 transition-colors"
                        >
                          MAX
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentStep("choice")}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAmountSubmit}
                      disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {currentStep === "apy" && apySubStep === "approval" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    <Icon
                      icon="fa:check"
                      width={60}
                      height={60}
                      className="text-[var(--color-accent)] mx-auto mb-4"
                    />
                    <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-4">
                      Approve Tokens
                    </h4>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Approve {parseFloat(stakeAmount).toLocaleString()} $AIBOT
                      tokens for staking
                    </p>
                  </div>

                  {approvalTxHash && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                      <Icon
                        icon="mdi:link"
                        width={16}
                        height={16}
                        className="text-blue-400 inline mr-2"
                      />
                      <span className="text-blue-400 text-sm">
                        Transaction: {approvalTxHash.slice(0, 10)}...
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setApySubStep("amount")}
                      disabled={isApproving}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200 disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={approveTokens}
                      disabled={isApproving}
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isApproving ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                          Approving...
                        </>
                      ) : (
                        "Approve Tokens"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {currentStep === "apy" && apySubStep === "staking" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    <Icon
                      icon="mdi:lock"
                      width={60}
                      height={60}
                      className="text-green-600 mx-auto mb-4"
                    />
                    <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-4">
                      Stake Tokens
                    </h4>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                      Stake {parseFloat(stakeAmount).toLocaleString()} $AIBOT
                      tokens to earn 5% APY
                    </p>
                  </div>

                  {stakingTxHash && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                      <Icon
                        icon="mdi:link"
                        width={16}
                        height={16}
                        className="text-blue-400 inline mr-2"
                      />
                      <span className="text-blue-400 text-sm">
                        Transaction: {stakingTxHash.slice(0, 10)}...
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setApySubStep("approval")}
                      disabled={isStaking}
                      className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200 disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={stakeTokens}
                      disabled={isStaking}
                      className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isStaking ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-b-2 border-current rounded-full"></div>
                          Staking...
                        </>
                      ) : (
                        "Stake Now"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {currentStep === "success" && (
                <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
                  <div className="text-center mb-6">
                    <Icon
                      icon="mdi:check-all"
                      width={60}
                      height={60}
                      className="text-green-600 mx-auto mb-4"
                    />
                    <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-4">
                      Staking Successful! 🎉
                    </h4>
                    <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm mb-4">
                      You have successfully staked{" "}
                      {parseFloat(stakeAmount).toLocaleString()} $AIBOT tokens
                    </p>

                    {stakingTxHash && (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                        <Icon
                          icon="mdi:link"
                          width={16}
                          height={16}
                          className="text-blue-400 inline mr-2"
                        />
                        <span className="text-blue-400 text-sm">
                          Transaction: {stakingTxHash.slice(0, 8)}...
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {stakingChoice === "pointsAndAPY" ? (
                      <>
                        <button
                          onClick={() => {
                            handleClose();
                            // Automatically redirect to stake tab to show dashboard
                            if (onSuccessfulStaking) {
                              onSuccessfulStaking(stakingChoice, stakeAmount);
                            }
                          }}
                          className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                        >
                          View Dashboard
                        </button>
                        <button
                          onClick={handleClose}
                          className="flex-1 bg-[var(--color-glass)] hover:bg-[var(--color-glass-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-sm border border-[var(--color-glass-border)] winky-sans-font transition-all duration-200"
                        >
                          Close
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleClose}
                        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-6 py-3 rounded-sm border border-[var(--color-accent)] cursor-pointer winky-sans-font font-medium transition-all duration-200"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StakeModal;
