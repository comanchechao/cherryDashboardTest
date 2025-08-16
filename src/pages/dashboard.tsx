import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/cherry.css";
import "../css/homepage.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import ToastContainer from "../components/ToastContainer";
import { useToast } from "../hooks/useToast";

interface TokenInfo {
  name: string;
  ticker: string;
  marketCap: string;
  holders: string;
  price: string;
  volume1h: string;
  volume24h: string;
  liquidity: string;
  imageUrl: string;
}

const Dashboard: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<
    "empty" | "creating" | "final"
  >("empty");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [postsPerDay, setPostsPerDay] = useState<string>("1");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [botCanJoinCommunity, setBotCanJoinCommunity] =
    useState<boolean>(false);
  const [selectedBoosts, setSelectedBoosts] = useState<string[]>([]);
  const [originalBoosts, setOriginalBoosts] = useState<string[]>([]);

  const { toasts, showSuccess, showError, hideToast } = useToast();
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const tokenDetailsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const progressStepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Smooth scroll to progress steps when step changes
  useEffect(() => {
    if (currentStage === "creating" && progressStepsRef.current) {
      setTimeout(() => {
        progressStepsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 300); // Small delay to allow step transition animation to start
    }
  }, [currentStep, currentStage]);

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  const stepVariants = {
    initial: {
      opacity: 0,
      x: 50,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -50,
    },
  };

  const stepTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4,
  };

  const steps = [
    { id: "token-info", label: "Token Info", icon: "mdi:coin" },
    { id: "description", label: "Description", icon: "mdi:text-box" },
    { id: "options", label: "Options", icon: "mdi:cog" },
  ];

  const handleCreateProject = () => {
    setCurrentStage("creating");
    setCurrentStep(0);
  };

  const handleContractScan = async () => {
    if (!contractAddress.trim()) {
      showError("Invalid Input", "Please enter a contract address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/search/?q=${contractAddress.trim()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch token data");
      }

      const data = await response.json();

      if (!data.pairs || data.pairs.length === 0) {
        showError(
          "Token Not Found",
          "No token data found for this contract address"
        );
        return;
      }

      // Get the pair with highest liquidity (usually the most reliable)
      const bestPair = data.pairs.reduce((prev: any, current: any) => {
        return (current.liquidity?.usd || 0) > (prev.liquidity?.usd || 0)
          ? current
          : prev;
      });

      const tokenInfo: TokenInfo = {
        name: bestPair.baseToken?.name || "Unknown Token",
        ticker: bestPair.baseToken?.symbol || "UNKNOWN",
        marketCap: bestPair.marketCap
          ? `$${bestPair.marketCap.toLocaleString()}`
          : "N/A",
        holders: "N/A", // DexScreener doesn't provide holder count
        price: bestPair.priceUsd
          ? `$${parseFloat(bestPair.priceUsd).toFixed(6)}`
          : "N/A",
        volume1h: bestPair.volume?.h1
          ? `$${bestPair.volume.h1.toLocaleString()}`
          : "N/A",
        volume24h: bestPair.volume?.h24
          ? `$${bestPair.volume.h24.toLocaleString()}`
          : "N/A",
        liquidity: bestPair.liquidity?.usd
          ? `$${bestPair.liquidity.usd.toLocaleString()}`
          : "N/A",
        imageUrl: bestPair.info?.imageUrl || "",
      };

      setTokenInfo(tokenInfo);
      showSuccess(
        "Token Scanned!",
        `Successfully loaded ${tokenInfo.name} (${tokenInfo.ticker}) data`
      );

      // Smooth scroll to token details section after successful scan
      setTimeout(() => {
        if (tokenDetailsRef.current) {
          tokenDetailsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (err) {
      showError(
        "Scan Failed",
        "Failed to scan contract. Please check the address and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmTokenInfo = () => {
    if (tokenInfo) {
      setCurrentStep(1);
    }
  };

  const calculateRemainingCharacters = () => {
    if (!tokenInfo) return 280;

    // Calculate characters used by token info
    const tokenInfoText = `${tokenInfo.ticker} | MC: ${
      tokenInfo.marketCap
    } | Holders: ${tokenInfo.holders} | Price: ${
      tokenInfo.price
    } | Contract: ${contractAddress.slice(0, 8)}...`;
    const usedChars = tokenInfoText.length;
    const remaining = 280 - usedChars;

    return Math.max(0, remaining);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    const maxChars = calculateRemainingCharacters();

    if (newValue.length <= maxChars) {
      setDescription(newValue);
    }
  };

  const handleConfirmDescription = () => {
    if (description.trim()) {
      setCurrentStep(2);
      showSuccess(
        "Description Saved!",
        "Project description has been saved successfully"
      );
    } else {
      showError(
        "Description Required",
        "Please enter a description for your project"
      );
    }
  };

  const toggleBoost = (boostType: string) => {
    setSelectedBoosts((prev) =>
      prev.includes(boostType)
        ? prev.filter((b) => b !== boostType)
        : [...prev, boostType]
    );
  };

  const handleFinalizeProject = () => {
    if (!buyAmount.trim()) {
      showError("Buy Amount Required", "Please enter a buy amount");
      return;
    }

    showSuccess(
      "Project Created!",
      "Your project has been successfully created and is now live!"
    );

    // Here you would typically send the data to your backend
    console.log({
      tokenInfo,
      description,
      buyAmount,
      postsPerDay,
      botCanJoinCommunity,
      selectedBoosts,
    });

    setTimeout(() => {
      setOriginalBoosts([...selectedBoosts]);
      setCurrentStage("final");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }, 1500);
  };

  const handleEditProject = () => {
    setCurrentStage("creating");
    setCurrentStep(2); // Go back to options step
  };

  const getNewBoosts = () => {
    return selectedBoosts.filter((boost) => !originalBoosts.includes(boost));
  };

  const hasNewBoosts = () => {
    return getNewBoosts().length > 0;
  };

  const handleConfirmBoosts = () => {
    const newBoosts = getNewBoosts();
    showSuccess(
      "Boosts Confirmed!",
      `Added ${newBoosts.length} new boost${
        newBoosts.length > 1 ? "s" : ""
      } to your project`
    );

    // Update original boosts to include the new ones
    setOriginalBoosts([...selectedBoosts]);
  };

  const boostOptions = [
    {
      id: "trending",
      label: "Trending",
      icon: "mdi:trending-up",
    },
    {
      id: "volume",
      label: "Volume",
      icon: "mdi:chart-bar",
    },
    {
      id: "holders",
      label: "Holders",
      icon: "mdi:account-group",
    },
    {
      id: "ads",
      label: "Ads",
      icon: "mdi:bullhorn",
    },
    {
      id: "sniper",
      label: "Sniper Campaign",
      icon: "mdi:target",
    },
  ];

  const renderEmptyDashboard = () => (
    <motion.div
      key="empty-dashboard"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-cherry-cream to-cherry-cream/50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cherry-red opacity-10 rounded-full animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-cherry-red opacity-10 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/4 w-12 h-12 bg-cherry-red opacity-10 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Empty State */}
          <div className="bg-cherry-burgundy rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-12 relative overflow-hidden transform hover:rotate-0 transition-all duration-300">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

            <div className="relative z-10">
              {/* Empty State SVG */}
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-cherry-cream shadow-lg">
                  <Icon
                    icon="line-md:folder-plus-twotone"
                    className="text-cherry-red"
                    width={64}
                    height={64}
                  />
                </div>
              </div>

              <h2 className="maladroit-font text-2xl md:text-3xl text-cherry-cream mb-4">
                No Active Projects
              </h2>

              <p className="winky-sans-font text-lg text-cherry-cream mb-8 max-w-2xl mx-auto">
                You don't have any active projects yet. Create your first
                project to get started with the Cherry AI platform.
              </p>

              {/* Wallet Connection Section */}

              <div className="space-y-6">
                <div className="bg-cherry-cream rounded-xl border-4 border-yellow-400 p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Icon
                      icon="mdi:wallet"
                      className="text-cherry-red mr-3"
                      width={32}
                      height={32}
                    />
                    <h3 className="maladroit-font text-xl text-cherry-burgundy">
                      Connect Wallet to Continue
                    </h3>
                  </div>
                  <p className="winky-sans-font text-cherry-burgundy mb-4">
                    Connect your Solana wallet to start creating AI projects
                  </p>
                </div>

                <motion.button className="text-white bg-cherry-red py-4 px-8 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-3 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font mx-auto disabled:opacity-50 disabled:cursor-not-allowed">
                  <>
                    <span className="text-cherry-cream">Connect Wallet</span>
                  </>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProgressSteps = () => (
    <div
      ref={progressStepsRef}
      className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                  index <= currentStep
                    ? "bg-cherry-red border-cherry-burgundy text-cherry-cream"
                    : "bg-cherry-cream border-cherry-burgundy text-cherry-burgundy"
                }`}
              >
                {index < currentStep ? (
                  <Icon icon="mdi:check" width={24} height={24} />
                ) : (
                  <Icon icon={step.icon} width={24} height={24} />
                )}
              </div>

              <div className="ml-3">
                <p
                  className={`winky-sans-font font-medium ${
                    index <= currentStep
                      ? "text-cherry-red"
                      : "text-cherry-burgundy"
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-1 w-96 rounded-full ${
                    index < currentStep
                      ? "bg-cherry-red"
                      : "bg-cherry-burgundy opacity-30"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTokenInfoStep = () => (
    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center mr-4">
            <Icon
              icon="mdi:coin"
              className="text-cherry-cream"
              width={24}
              height={24}
            />
          </div>
          <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-burgundy">
            Token Information
          </h3>
        </div>

        <p className="winky-sans-font text-lg text-cherry-burgundy mb-6">
          Enter your token's contract address to scan and verify the token
          information. Supports Solana, Ethereum, BSC, and other major
          blockchains via DexScreener.
        </p>

        <div className="mb-6">
          <label className="block winky-sans-font text-cherry-burgundy font-medium mb-2">
            Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter contract address (e.g., 7vsKatZ8BAKXXb16ZZMJyg9X3iLn8Zpq4yBPg8mWBLMd)"
            className="w-full py-3 px-4 rounded-xl border-4 border-cherry-burgundy focus:ring-4 focus:ring-cherry-red focus:ring-opacity-30 focus:outline-none winky-sans-font"
          />
        </div>

        <motion.button
          onClick={handleContractScan}
          disabled={isLoading}
          className="bg-cherry-red text-white py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? (
            <>
              <Icon
                icon="mdi:loading"
                className="animate-spin text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Scanning...</span>
            </>
          ) : (
            <>
              <Icon
                icon="mdi:magnify"
                className="text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Scan Contract</span>
            </>
          )}
        </motion.button>

        {tokenInfo && (
          <motion.div
            ref={tokenDetailsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl mt-4 p-6 mb-6"
          >
            {/* Token Header with Image */}
            <div className="flex items-center mb-6">
              {tokenInfo.imageUrl && (
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-cherry-burgundy mr-4 flex-shrink-0">
                  <img
                    src={tokenInfo.imageUrl}
                    alt={tokenInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div>
                <h4 className="maladroit-font text-xl text-cherry-burgundy mb-1">
                  {tokenInfo.name}
                </h4>
                <h4 className="maladroit-font text-xl text-cherry-burgundy mb-1">
                  ${tokenInfo.ticker}
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:tag" width={16} height={16} />
                  Name:
                </span>
                <span className="winky-sans-font text-cherry-burgundy">
                  {tokenInfo.name}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:ticket" width={16} height={16} />
                  Ticker:
                </span>
                <span className="winky-sans-font text-cherry-burgundy font-bold">
                  ${tokenInfo.ticker}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:chart-line" width={16} height={16} />
                  Market Cap:
                </span>
                <span className="winky-sans-font text-cherry-burgundy">
                  {tokenInfo.marketCap}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:water" width={16} height={16} />
                  Liquidity:
                </span>
                <span className="winky-sans-font text-cherry-burgundy">
                  {tokenInfo.liquidity}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:account-group" width={16} height={16} />
                  Holders:
                </span>
                <span className="winky-sans-font text-cherry-burgundy">
                  {tokenInfo.holders}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:currency-usd" width={16} height={16} />
                  Price:
                </span>
                <span className="winky-sans-font text-cherry-burgundy font-bold">
                  {tokenInfo.price}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:clock" width={16} height={16} />
                  Volume (1h):
                </span>
                <span className="winky-sans-font text-cherry-burgundy">
                  {tokenInfo.volume1h}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy">
                <span className="winky-sans-font font-medium text-cherry-burgundy flex items-center gap-2">
                  <Icon icon="mdi:calendar" width={16} height={16} />
                  Volume (24h):
                </span>
                <span className="winky-sans-font text-cherry-burgundy">
                  {tokenInfo.volume24h}
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleConfirmTokenInfo}
              className="w-full !mt-6 bg-cherry-red text-white py-3   px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center justify-center gap-2"
            >
              <Icon
                icon="mdi:check"
                className="text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Confirm & Continue</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderDescriptionStep = () => {
    const remainingChars = calculateRemainingCharacters();
    const tokenInfoPreview = tokenInfo
      ? `${tokenInfo.ticker} | MC: ${tokenInfo.marketCap} | Holders: ${
          tokenInfo.holders
        } | Price: ${tokenInfo.price} | Contract: ${contractAddress.slice(
          0,
          8
        )}...`
      : "";
    const fullPreview =
      tokenInfoPreview + (description ? " | " + description : "");

    return (
      <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center mr-4">
              <Icon
                icon="mdi:text-box"
                className="text-cherry-cream"
                width={24}
                height={24}
              />
            </div>
            <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-burgundy">
              Project Description
            </h3>
          </div>

          <p className="winky-sans-font text-lg text-cherry-burgundy mb-6">
            Create a compelling description for your project. This will include
            your token information and your custom description within X's
            280-character limit.
          </p>

          {/* Token Info Preview */}
          {tokenInfo && (
            <div className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl p-4 mb-6">
              <h4 className="winky-sans-font font-medium text-cherry-burgundy mb-3 flex items-center gap-2">
                <Icon icon="mdi:information" width={18} height={18} />
                Auto-included Token Information ({tokenInfoPreview.length}{" "}
                characters):
              </h4>
              <div className="bg-cherry-burgundy rounded-lg p-3 font-mono text-sm text-cherry-cream border-2 border-cherry-burgundy">
                {tokenInfoPreview}
              </div>
            </div>
          )}

          {/* Description Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block winky-sans-font text-cherry-burgundy font-medium">
                Your Description
              </label>
              <span
                className={`winky-sans-font text-sm ${
                  remainingChars < 20 ? "text-red-600" : "text-cherry-burgundy"
                }`}
              >
                {description.length}/{remainingChars} characters remaining
              </span>
            </div>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder={`Add your project description here... (${remainingChars} characters available)`}
              className="w-full h-32 py-3 px-4 rounded-xl border-4 border-cherry-burgundy focus:ring-4 focus:ring-cherry-red focus:ring-opacity-30 focus:outline-none winky-sans-font resize-none"
              rows={4}
            />
          </div>

          {/* Full Preview */}
          <div className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl p-4 mb-6">
            <h4 className="winky-sans-font font-medium text-cherry-burgundy mb-3 flex items-center gap-2">
              <Icon icon="mdi:eye" width={18} height={18} />
              Full Post Preview ({fullPreview.length}/280 characters):
            </h4>
            <div className="bg-cherry-burgundy rounded-lg p-4 font-mono text-sm text-cherry-cream border-2 border-cherry-burgundy min-h-[80px]">
              {fullPreview || (
                <span className="italic opacity-60">
                  Your post preview will appear here...
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={() => setCurrentStep(0)}
              className="bg-cherry-burgundy text-cherry-cream py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-red hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center gap-2"
            >
              <Icon
                icon="mdi:arrow-left"
                className="text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Back</span>
            </motion.button>

            <motion.button
              onClick={handleConfirmDescription}
              disabled={!description.trim()}
              className="flex-1 bg-cherry-red text-white py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon
                icon="mdi:check"
                className="text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Confirm & Continue</span>
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  const renderOptionsStep = () => {
    return (
      <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center mr-4">
              <Icon
                icon="mdi:cog"
                className="text-cherry-cream"
                width={24}
                height={24}
              />
            </div>
            <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-burgundy">
              Project Options
            </h3>
          </div>

          {/* Previous Description Display */}
          <div className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl p-4 mb-6">
            <h4 className="winky-sans-font font-medium text-cherry-burgundy mb-3 flex items-center gap-2">
              <Icon
                icon="mdi:check-circle"
                width={18}
                height={18}
                className="text-green-600"
              />
              Confirmed Description:
            </h4>
            <div className="bg-cherry-burgundy rounded-lg p-3 font-mono text-sm text-cherry-cream border-2 border-cherry-burgundy">
              {tokenInfo &&
                `${tokenInfo.ticker} | MC: ${tokenInfo.marketCap} | Holders: ${
                  tokenInfo.holders
                } | Price: ${
                  tokenInfo.price
                } | Contract: ${contractAddress.slice(0, 8)}...`}
              {description && ` | ${description}`}
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Buy Amount */}
            <div>
              <label className="block winky-sans-font text-cherry-burgundy font-medium mb-2">
                Buy Amount (SOL)
              </label>
              <input
                type="number"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                placeholder="0.1"
                step="0.01"
                min="0"
                className="w-full py-3 px-4 rounded-xl border-4 border-cherry-burgundy focus:ring-4 focus:ring-cherry-red focus:ring-opacity-30 focus:outline-none winky-sans-font"
              />
            </div>

            {/* Posts Per Day */}
            <div>
              <label className="block winky-sans-font text-cherry-burgundy font-medium mb-2">
                X Posts Per Day
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full py-3 px-4 rounded-xl border-4 border-cherry-burgundy bg-cherry-cream winky-sans-font text-cherry-burgundy font-medium flex items-center justify-between hover:border-cherry-red transition-colors duration-200 focus:ring-4 focus:ring-cherry-red focus:ring-opacity-30 focus:outline-none"
                >
                  <span>
                    {postsPerDay} post{postsPerDay !== "1" ? "s" : ""} per day
                  </span>
                  <Icon
                    icon={
                      isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"
                    }
                    className="text-xl text-cherry-burgundy"
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-full mt-2 bg-cherry-cream border-4 border-cherry-burgundy rounded-xl shadow-[4px_4px_0px_#321017] z-50 overflow-hidden"
                    >
                      {["1", "2", "3", "5", "10"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setPostsPerDay(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full py-3 px-4 text-left winky-sans-font font-medium hover:bg-cherry-cream transition-colors duration-200 border-b-2 border-cherry-burgundy last:border-b-0 ${
                            postsPerDay === option
                              ? "bg-cherry-burgundy  "
                              : "  hover:text-cherry-burgundy"
                          }`}
                        >
                          <span
                            className={`${
                              postsPerDay === option
                                ? "text-cherry-cream"
                                : "text-cherry-burgundy hover:text-cherry-burgundy"
                            }`}
                          >
                            {option} post{option !== "1" ? "s" : ""} per day
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bot Community Option */}
          <div className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="botCommunity"
                checked={botCanJoinCommunity}
                onChange={(e) => setBotCanJoinCommunity(e.target.checked)}
                className="w-5 h-5 text-cherry-red border-2 border-cherry-burgundy rounded focus:ring-cherry-red"
              />
              <label
                htmlFor="botCommunity"
                className="winky-sans-font text-cherry-burgundy font-medium flex items-center gap-2"
              >
                <Icon icon="mdi:robot" width={20} height={20} />
                Bot can join X community
              </label>
            </div>
            <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80 mt-2 ml-8">
              Allow our bot to participate in X community discussions and
              engagements
            </p>
          </div>

          {/* Boost Options - Clean and Simple */}
          <div className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

            {/* Clean header */}
            <div className="relative z-10 text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <Icon
                  icon="mdi:rocket-launch"
                  className="text-cherry-red mr-3"
                  width={28}
                  height={28}
                />
                <h4 className="maladroit-font text-2xl text-cherry-burgundy font-bold">
                  BOOST YOUR PROJECT
                </h4>
                <Icon
                  icon="mdi:rocket-launch"
                  className="text-cherry-red ml-3"
                  width={28}
                  height={28}
                />
              </div>
              <p className="winky-sans-font text-cherry-burgundy text-lg font-medium">
                Supercharge your project's visibility and engagement
              </p>
              <div className="mt-3 inline-block bg-yellow-400 text-cherry-burgundy px-4 py-2 rounded-xl font-bold text-sm border-2 border-cherry-burgundy shadow-[2px_2px_0px_#321017]">
                <Icon
                  icon="mdi:star"
                  className="inline mr-1"
                  width={16}
                  height={16}
                />
                PREMIUM FEATURES
              </div>
            </div>

            {/* Boost options grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boostOptions.map((boost) => (
                <motion.div
                  key={boost.id}
                  onClick={() => toggleBoost(boost.id)}
                  className={`cursor-pointer p-4 rounded-xl border-4 transition-all duration-200 transform hover:translate-y-[-2px] ${
                    selectedBoosts.includes(boost.id)
                      ? "bg-cherry-burgundy border-yellow-400 shadow-[4px_4px_0px_#321017]"
                      : "bg-cherry-burgundy border-cherry-burgundy hover:border-cherry-red shadow-[2px_2px_0px_#321017] hover:shadow-[4px_4px_0px_#321017]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center border-2 border-cherry-burgundy">
                      <Icon
                        icon={boost.icon}
                        className="text-cherry-cream"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex-1">
                      <h5
                        className={`winky-sans-font font-bold ${
                          selectedBoosts.includes(boost.id)
                            ? "text-cherry-cream"
                            : "text-cherry-cream"
                        }`}
                      >
                        {boost.label}
                      </h5>
                      {selectedBoosts.includes(boost.id) && (
                        <div className="flex items-center gap-1 mt-1">
                          <Icon
                            icon="mdi:check-circle"
                            className="text-yellow-400"
                            width={16}
                            height={16}
                          />
                          <span className="text-xs text-yellow-400 font-medium">
                            SELECTED
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 text-center mt-6">
              <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80">
                Select multiple boost options to maximize your project's reach
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={() => setCurrentStep(1)}
              className="bg-cherry-burgundy text-cherry-cream py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-red hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center gap-2"
            >
              <Icon
                icon="mdi:arrow-left"
                className="text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Back</span>
            </motion.button>

            <motion.button
              onClick={handleFinalizeProject}
              disabled={!buyAmount.trim()}
              className="flex-1 bg-cherry-red text-white py-4 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
            >
              <Icon
                icon="mdi:rocket-launch"
                className="text-cherry-cream"
                width={24}
                height={24}
              />
              <span className="text-cherry-cream">CREATE MY PROJECT</span>
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  const renderFinalDashboard = () => (
    <motion.div
      key="final-dashboard"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen w-full bg-gradient-to-br from-cherry-cream to-cherry-cream/50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cherry-red opacity-10 rounded-full animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-cherry-red opacity-10 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Project Summary */}
          {tokenInfo && (
            <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

              <div className="relative z-10">
                {/* Token Header */}
                <div className="flex items-center mb-6">
                  {tokenInfo.imageUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-cherry-burgundy mr-4 flex-shrink-0">
                      <img
                        src={tokenInfo.imageUrl}
                        alt={tokenInfo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="maladroit-font text-2xl text-cherry-burgundy mb-1">
                      {tokenInfo.name}
                    </h2>
                    <p className="winky-sans-font text-lg text-cherry-burgundy font-bold">
                      ${tokenInfo.ticker}
                    </p>
                  </div>
                </div>

                {/* Token Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-cherry-cream border-2 border-cherry-burgundy rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        icon="mdi:chart-line"
                        width={20}
                        height={20}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font text-sm font-medium text-cherry-burgundy">
                        Market Cap
                      </span>
                    </div>
                    <p className="winky-sans-font text-lg font-bold text-cherry-burgundy">
                      {tokenInfo.marketCap}
                    </p>
                  </div>

                  <div className="bg-cherry-cream border-2 border-cherry-burgundy rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        icon="mdi:currency-usd"
                        width={20}
                        height={20}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font text-sm font-medium text-cherry-burgundy">
                        Price
                      </span>
                    </div>
                    <p className="winky-sans-font text-lg font-bold text-cherry-burgundy">
                      {tokenInfo.price}
                    </p>
                  </div>

                  <div className="bg-cherry-cream border-2 border-cherry-burgundy rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        icon="mdi:water"
                        width={20}
                        height={20}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font text-sm font-medium text-cherry-burgundy">
                        Liquidity
                      </span>
                    </div>
                    <p className="winky-sans-font text-lg font-bold text-cherry-burgundy">
                      {tokenInfo.liquidity}
                    </p>
                  </div>

                  <div className="bg-cherry-cream border-2 border-cherry-burgundy rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        icon="mdi:account-group"
                        width={20}
                        height={20}
                        className="text-cherry-red"
                      />
                      <span className="winky-sans-font text-sm font-medium text-cherry-burgundy">
                        Holders
                      </span>
                    </div>
                    <p className="winky-sans-font text-lg font-bold text-cherry-burgundy">
                      {tokenInfo.holders}
                    </p>
                  </div>
                </div>

                {/* Project Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Description */}
                  <div className="bg-cherry-burgundy border-4 border-cherry-burgundy rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon
                        icon="mdi:text-box"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <h3 className="winky-sans-font text-lg font-bold text-cherry-cream">
                        Description
                      </h3>
                    </div>
                    <p className="winky-sans-font text-sm text-cherry-cream leading-relaxed">
                      {description || "No description provided"}
                    </p>
                  </div>

                  {/* Settings */}
                  <div className="bg-cherry-burgundy border-4 border-cherry-burgundy rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon
                        icon="mdi:cog"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <h3 className="winky-sans-font text-lg font-bold text-cherry-cream">
                        Settings
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="winky-sans-font text-sm text-cherry-cream">
                          Posts per day:
                        </span>
                        <span className="winky-sans-font text-sm font-bold text-yellow-400">
                          {postsPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="winky-sans-font text-sm text-cherry-cream">
                          Buy amount:
                        </span>
                        <span className="winky-sans-font text-sm font-bold text-yellow-400">
                          {buyAmount} SOL
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="winky-sans-font text-sm text-cherry-cream">
                          Community bot:
                        </span>
                        <span className="winky-sans-font text-sm font-bold text-yellow-400">
                          {botCanJoinCommunity ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Boosts */}
                  <div className="bg-cherry-burgundy border-4 border-cherry-burgundy rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon
                        icon="mdi:rocket-launch"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <h3 className="winky-sans-font text-lg font-bold text-cherry-cream">
                        Active Boosts
                      </h3>
                    </div>
                    {selectedBoosts.length > 0 ? (
                      <div className="space-y-2">
                        {selectedBoosts.map((boostId) => {
                          const boost = boostOptions.find(
                            (b) => b.id === boostId
                          );
                          return boost ? (
                            <div
                              key={boostId}
                              className="flex items-center gap-2"
                            >
                              <Icon
                                icon={boost.icon}
                                width={16}
                                height={16}
                                className="text-yellow-400"
                              />
                              <span className="winky-sans-font text-sm text-cherry-cream">
                                {boost.label}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="winky-sans-font text-sm text-cherry-cream opacity-70">
                        No boosts selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Boost Options */}
          <div className="bg-cherry-cream border-4 border-cherry-burgundy rounded-xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

            <div className="relative z-10">
              <div className="text-center mb-4">
                <h3 className="maladroit-font text-xl text-cherry-burgundy mb-2">
                  Need More Boost?
                </h3>
                <p className="winky-sans-font text-cherry-burgundy">
                  Upgrade your project with additional boost options
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {boostOptions.map((boost) => (
                  <div
                    key={boost.id}
                    onClick={() => toggleBoost(boost.id)}
                    className={`p-3 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                      selectedBoosts.includes(boost.id)
                        ? "bg-cherry-burgundy border-yellow-400 text-cherry-cream"
                        : "bg-cream border-cherry-burgundy text-cherry-burgundy hover:border-cherry-red"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon icon={boost.icon} width={24} height={24} />
                      <span className="winky-sans-font text-xs  font-medium">
                        {boost.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Confirm Boost Button - Only show when new boosts are selected */}
              {hasNewBoosts() && (
                <div className="text-center mt-4">
                  <motion.button
                    onClick={handleConfirmBoosts}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-cherry-red text-white py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center gap-2 mx-auto font-bold"
                  >
                    <Icon
                      icon="mdi:check-circle"
                      className="text-cherry-cream"
                      width={20}
                      height={20}
                    />
                    <span className="text-cherry-cream">Confirm Boost</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <motion.button
              onClick={handleEditProject}
              className="bg-cherry-burgundy text-cherry-cream py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-red hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font flex items-center gap-2 mx-auto"
            >
              <Icon
                icon="mdi:pencil"
                className="text-cherry-cream"
                width={20}
                height={20}
              />
              <span className="text-cherry-cream">Edit My Project</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCreatingDashboard = () => (
    <motion.div
      key="creating-dashboard"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen w-full bg-gradient-to-br from-cherry-cream to-cherry-cream/50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cherry-red opacity-10 rounded-full animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-cherry-red opacity-10 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Progress Steps */}
          {renderProgressSteps()}

          {/* Step Content */}
          <div ref={stepContainerRef}>
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={stepVariants}
                  transition={stepTransition}
                >
                  {renderTokenInfoStep()}
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={stepVariants}
                  transition={stepTransition}
                >
                  {renderDescriptionStep()}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={stepVariants}
                  transition={stepTransition}
                >
                  {renderOptionsStep()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Main dashboard content
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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

        <AnimatePresence mode="wait">
          {currentStage === "empty" && renderEmptyDashboard()}
          {currentStage === "creating" && renderCreatingDashboard()}
          {currentStage === "final" && renderFinalDashboard()}
        </AnimatePresence>

        <Footer />
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onHideToast={hideToast} />
    </motion.div>
  );
};

export default Dashboard;
