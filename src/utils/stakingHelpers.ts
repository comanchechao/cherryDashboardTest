import { BigNumber, Contract, ethers } from "ethers";

// Addresses from staking-react.ts
export const STAKING_ADDRESS = "0x98aBda27FC27Ad5DF0555789824CE3780071a728";
export const TOKEN_ADDRESS = "0x96AdaA33e175F4A7f20c099730bc78dd0B45745B";

// BSC configuration with QuickNode as main endpoint
export const BSC_RPC_URLS = [
  "https://boldest-fluent-yard.bsc.quiknode.pro/03f66e9b4ec1eb73d278a7951e1ee60b36353f63/",
];

// Legacy export for backward compatibility
export const BSC_RPC_URL = BSC_RPC_URLS[0];

// ABIs from staking-react.ts
const stakingAbi = [
  "function stakingToken() view returns (address)",
  "function stake(uint256 _amount) returns (uint256)",
  "function withdraw(uint256 amount) returns (uint256)",
  "function claim() returns (uint256)",
  "function getEarnedRewardTokens(address _staker) view returns (uint256)",
  "function stakeAmount(address _staker) view returns (uint256)",
  "function lockTimePeriod() view returns (uint48)",
  "function startUnlock() returns (bool)",
  "function cancelUnlock() returns (bool)",
  "function getUnlockTime(address _staker) view returns (uint256)",
];

const erc20Abi = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function approve(address,uint256) returns (bool)",
  "function allowance(address,address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

// Types
export interface StakingData {
  stakedAmount: string;
  pendingRewards: string;
  isInCooldown: boolean;
  cooldownStartTime: number;
  remainingCooldown: number;
  canUnstake: boolean;
  isUnlocking: boolean;
  unlockStartTime: number;
  canStartUnlock: boolean;
  canCancelUnlock: boolean;
}

export interface CooldownInfo {
  cooldownStartTime: number;
  isInCooldown: boolean;
  remainingCooldown: number;
}

// RPC Provider with automatic fallback
class BSCProviderWithFallback extends ethers.providers.JsonRpcProvider {
  private currentUrlIndex = 0;
  private readonly maxRetries = BSC_RPC_URLS.length;

  constructor() {
    super(BSC_RPC_URLS[0]);
  }

  async send(method: string, params: Array<any>): Promise<any> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const result = await super.send(method, params);
        // Log successful RPC switch if we're not on the first URL
        if (this.currentUrlIndex !== 0 && attempt === 0) {
          console.log(
            `Successfully switched to RPC: ${
              BSC_RPC_URLS[this.currentUrlIndex]
            }`
          );
        }
        return result;
      } catch (error: any) {
        lastError = error;
        const currentUrl = BSC_RPC_URLS[this.currentUrlIndex];
        console.warn(
          `RPC ${currentUrl} failed (attempt ${attempt + 1}/${
            this.maxRetries
          }):`,
          error.message
        );

        // Move to next RPC URL
        this.currentUrlIndex = (this.currentUrlIndex + 1) % BSC_RPC_URLS.length;

        // Update the connection to use the new URL
        (this as any).connection = { url: BSC_RPC_URLS[this.currentUrlIndex] };

        // If it's a rate limiting error (429) or network error, try next RPC immediately
        if (
          error.code === 429 ||
          error.code === -32005 ||
          error.message?.includes("rate limit")
        ) {
          console.log(
            `Rate limit detected, switching to: ${
              BSC_RPC_URLS[this.currentUrlIndex]
            }`
          );
          continue;
        }

        // For other errors, still try the next RPC but with a small delay
        if (attempt < this.maxRetries - 1) {
          console.log(`Trying next RPC: ${BSC_RPC_URLS[this.currentUrlIndex]}`);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    }

    // If all RPCs failed, throw the last error
    console.error("All BSC RPC endpoints exhausted");
    throw new Error(
      `All BSC RPC endpoints failed. Last error: ${
        lastError?.message || "Unknown error"
      }`
    );
  }
}

// Create a BSC provider with fallback support
export function createBSCProvider(): ethers.providers.JsonRpcProvider {
  return new BSCProviderWithFallback();
}

// Helper function to get the best available provider (Web3 or fallback BSC)
export function getBestProvider(
  preferWeb3: boolean = true
): ethers.providers.Provider {
  if (preferWeb3 && window.ethereum) {
    try {
      return new ethers.providers.Web3Provider(window.ethereum);
    } catch (error) {
      console.warn(
        "Failed to create Web3Provider, falling back to BSC RPC:",
        error
      );
      return createBSCProvider();
    }
  }
  return createBSCProvider();
}

// Test function to validate RPC endpoints (useful for debugging)
export async function testBSCRPCs(): Promise<
  {
    url: string;
    status: "success" | "failed";
    latency?: number;
    error?: string;
  }[]
> {
  const results = [];

  for (const url of BSC_RPC_URLS) {
    const startTime = Date.now();
    try {
      const provider = new ethers.providers.JsonRpcProvider(url);
      await provider.getBlockNumber();
      const latency = Date.now() - startTime;
      results.push({ url, status: "success" as const, latency });
      console.log(`✅ ${url} - ${latency}ms`);
    } catch (error: any) {
      results.push({ url, status: "failed" as const, error: error.message });
      console.log(`❌ ${url} - ${error.message}`);
    }
  }

  return results;
}

// Helper functions from staking-react.ts
function getStaking(provider: ethers.providers.Provider | ethers.Signer) {
  return new Contract(STAKING_ADDRESS, stakingAbi, provider);
}

function getToken(provider: ethers.providers.Provider | ethers.Signer) {
  return new Contract(TOKEN_ADDRESS, erc20Abi, provider);
}

export async function getSigner(provider: ethers.providers.Web3Provider) {
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

// Fetch staking data with cooldown information
export async function fetchStakingData(
  provider: ethers.providers.Provider,
  userAddress: string
): Promise<StakingData> {
  try {
    console.log("🚀 [fetchStakingData] Starting data fetch for:", userAddress);

    // Get user staked amount, earned rewards, and unlock status
    const [stakedResult, earnedResult, lockTimePeriod, unlockStatus] =
      await Promise.all([
        getUserStaked(provider as ethers.providers.Web3Provider, userAddress),
        getUserEarned(provider as ethers.providers.Web3Provider, userAddress),
        getLockTimePeriod(provider as ethers.providers.Web3Provider),
        getUnlockStatus(provider, userAddress),
      ]);

    // Calculate cooldown info based on lock time period
    const cooldownInfo = getCooldownInfo(lockTimePeriod);

    const finalData = {
      stakedAmount: stakedResult.formatted,
      pendingRewards: earnedResult.formatted,
      isInCooldown: unlockStatus.isUnlocking,
      cooldownStartTime: unlockStatus.unlockStartTime,
      remainingCooldown: unlockStatus.remainingCooldown,
      canUnstake: unlockStatus.canUnstake,
      isUnlocking: unlockStatus.isUnlocking,
      unlockStartTime: unlockStatus.unlockStartTime,
      canStartUnlock: unlockStatus.canStartUnlock,
      canCancelUnlock: unlockStatus.canCancelUnlock,
    };

    // LOG FINAL DATA BEING SENT TO UI
    console.log("📤 [fetchStakingData] Final data being sent to UI:", {
      ...finalData,
      lockTimePeriodFromContract: lockTimePeriod,
      cooldownInfoCalculated: cooldownInfo,
      stakedResultRaw: stakedResult,
      earnedResultRaw: earnedResult,
    });

    return finalData;
  } catch (error) {
    console.error("❌ [fetchStakingData] Error fetching staking data:", error);
    // Return default values on error
    return {
      stakedAmount: "0",
      pendingRewards: "0",
      isInCooldown: false,
      cooldownStartTime: 0,
      remainingCooldown: 0,
      canUnstake: true,
      isUnlocking: false,
      unlockStartTime: 0,
      canStartUnlock: true,
      canCancelUnlock: false,
    };
  }
}

// Get cooldown information based on lock time period
export function getCooldownInfo(lockTimePeriodSeconds: number): CooldownInfo {
  const isInCooldown = false;
  const cooldownStartTime = 0;
  const remainingCooldown = lockTimePeriodSeconds;

  return {
    cooldownStartTime,
    isInCooldown,
    remainingCooldown,
  };
}

// Functions from staking-react.ts
export async function getUserEarned(
  provider: ethers.providers.Web3Provider,
  account?: string
): Promise<{ raw: BigNumber; formatted: string; symbol?: string }> {
  try {
    const signer = await getSigner(provider);
    const staking = getStaking(signer);
    const token = getToken(signer);
    const addr = account ?? (await signer.getAddress());

    const [earned, decimals, symbol] = await Promise.all([
      staking.getEarnedRewardTokens(addr),
      token.decimals(),
      token.symbol().catch(() => ""),
    ]);
    const formatted = ethers.utils.formatUnits(earned, decimals);
    return { raw: earned, formatted, symbol: symbol || undefined };
  } catch (error) {
    console.error("Error getting user earned rewards:", error);
    return { raw: ethers.BigNumber.from(0), formatted: "0", symbol: undefined };
  }
}

export async function getUserStaked(
  provider: ethers.providers.Web3Provider,
  account?: string
): Promise<{ raw: BigNumber; formatted: string }> {
  try {
    const signer = await getSigner(provider);
    const staking = getStaking(signer);
    const token = getToken(signer);
    const addr = account ?? (await signer.getAddress());
    const [staked, decimals] = await Promise.all([
      staking.stakeAmount(addr),
      token.decimals(),
    ]);
    const formatted = ethers.utils.formatUnits(staked, decimals);
    return { raw: staked, formatted };
  } catch (error) {
    console.error("Error getting user staked amount:", error);
    return { raw: ethers.BigNumber.from(0), formatted: "0" };
  }
}

export async function getLockTimePeriod(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  const staking = getStaking(provider);
  const value = await staking.lockTimePeriod();

  // Handle different return types - could be BigNumber, number, or string
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return parseInt(value, 10);
  } else if (value && typeof value.toNumber === "function") {
    return value.toNumber();
  } else if (value && typeof value.toString === "function") {
    return parseInt(value.toString(), 10);
  } else {
    console.warn("Unexpected lockTimePeriod return type:", typeof value, value);
    return 0; // Default to 0 if we can't parse it
  }
}

// Stake function from staking-react.ts
export async function stake(
  provider: ethers.providers.Web3Provider,
  amount: string // decimal string in token units, e.g., "100.5"
) {
  const signer = await getSigner(provider);
  const staking = getStaking(signer);
  const token = getToken(signer);

  const decimals: number = await token.decimals();
  const value = ethers.utils.parseUnits(amount, decimals);

  const owner = await signer.getAddress();
  const allowance: BigNumber = await token.allowance(owner, STAKING_ADDRESS);
  if (allowance.lt(value)) {
    const approveTx = await token.approve(STAKING_ADDRESS, value);
    await approveTx.wait();
  }
  const tx = await staking.stake(value);
  return tx.wait();
}

// Unstake function from staking-react.ts
export async function unstake(
  provider: ethers.providers.Web3Provider,
  amount: string // decimal string in token units
) {
  const signer = await getSigner(provider);
  const staking = getStaking(signer);
  const token = getToken(signer);
  const decimals: number = await token.decimals();
  const value = ethers.utils.parseUnits(amount, decimals);
  const tx = await staking.withdraw(value);
  return tx.wait();
}

// Claim rewards function from staking-react.ts
export async function claimRewards(provider: ethers.providers.Web3Provider) {
  const signer = await getSigner(provider);
  const staking = getStaking(signer);
  const tx = await staking.claim();
  return tx.wait();
}

// Start unlock cooldown
export async function startUnlock(provider: ethers.providers.Web3Provider) {
  console.log("🔓 [startUnlock] Starting unlock transaction...");
  const signer = await getSigner(provider);
  const staking = getStaking(signer);
  const tx = await staking.startUnlock();
  console.log("⏳ [startUnlock] Transaction sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("✅ [startUnlock] Transaction confirmed:", {
    transactionHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed?.toString(),
  });
  return receipt;
}

// Cancel unlock cooldown
export async function cancelUnlock(provider: ethers.providers.Web3Provider) {
  console.log("❌ [cancelUnlock] Starting cancel unlock transaction...");
  const signer = await getSigner(provider);
  const staking = getStaking(signer);
  const tx = await staking.cancelUnlock();
  console.log("⏳ [cancelUnlock] Transaction sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("✅ [cancelUnlock] Transaction confirmed:", {
    transactionHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed?.toString(),
  });
  return receipt;
}

// Get unlock status for a user
export async function getUnlockStatus(
  provider: ethers.providers.Provider,
  userAddress: string
): Promise<{
  isUnlocking: boolean;
  unlockStartTime: number;
  canStartUnlock: boolean;
  canCancelUnlock: boolean;
  canUnstake: boolean;
  remainingCooldown: number;
}> {
  try {
    const staking = getStaking(provider);
    const unlockTime = await staking.getUnlockTime(userAddress);

    // LOG ALL RAW DATA
    console.log("🔍 [getUnlockStatus] Raw contract data:", {
      userAddress,
      unlockTimeRaw: unlockTime,
      unlockTimeString: unlockTime.toString(),
      unlockTimeBigNumber: unlockTime.toBigInt?.() || "N/A",
      unlockTimeHex: unlockTime.toHexString(),
    });

    const unlockTimeString = unlockTime.toString();
    const MAX_UINT48 = "281474976710655"; // 0xffffffffffff

    // Check if this is the max value (indicating no unlock time set or cancelled)
    const isMaxValue =
      unlockTimeString === MAX_UINT48 ||
      unlockTime.eq(ethers.constants.MaxUint256);

    console.log("🔍 [getUnlockStatus] Value analysis:", {
      unlockTimeString,
      MAX_UINT48,
      isMaxValue,
      isZero: unlockTime.isZero(),
    });

    let unlockEndTime: number;
    let isUnlocking: boolean;

    if (isMaxValue || unlockTime.isZero()) {
      // No unlock time set or cancelled unlock
      unlockEndTime = 0;
      isUnlocking = false;
    } else {
      // Valid unlock end time (when unlock period completes)
      unlockEndTime = unlockTime.toNumber();
      isUnlocking = true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const cooldownPeriod = 24 * 60 * 60; // 24 hours in seconds

    // Calculate remaining cooldown time
    // Note: unlockEndTime from contract is when the unlock period completes
    const remainingCooldown = isUnlocking
      ? Math.max(0, unlockEndTime - currentTime)
      : 0;

    const canUnstake = isUnlocking && remainingCooldown <= 0;
    const canStartUnlock = !isUnlocking;
    const canCancelUnlock = isUnlocking && remainingCooldown > 0;

    // LOG ALL CALCULATED VALUES
    console.log("📊 [getUnlockStatus] Calculated values:", {
      unlockEndTime,
      currentTime,
      cooldownPeriod,
      isUnlocking,
      remainingCooldown,
      canUnstake,
      canStartUnlock,
      canCancelUnlock,
      timeDifference: isUnlocking ? unlockEndTime - currentTime : 0,
      unlockEndTimeDate:
        isUnlocking && unlockEndTime > 0
          ? new Date(unlockEndTime * 1000).toISOString()
          : "N/A",
      currentTimeDate: new Date(currentTime * 1000).toISOString(),
    });

    return {
      isUnlocking,
      unlockStartTime: unlockEndTime, // Keep interface the same for compatibility
      canStartUnlock,
      canCancelUnlock,
      canUnstake,
      remainingCooldown,
    };
  } catch (error) {
    console.error("❌ [getUnlockStatus] Error getting unlock status:", error);
    return {
      isUnlocking: false,
      unlockStartTime: 0,
      canStartUnlock: true,
      canCancelUnlock: false,
      canUnstake: false,
      remainingCooldown: 0,
    };
  }
}

// Legacy function names for compatibility
export const initiateUnstake = unstake;
export const completeUnstake = claimRewards;

// Format cooldown time for display
export function formatCooldownTime(remainingSeconds: number): string {
  if (remainingSeconds <= 0) return "Ready to unstake";

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

// Check if user can complete unstaking
export function canCompleteUnstake(cooldownInfo: CooldownInfo): boolean {
  return cooldownInfo.isInCooldown && cooldownInfo.remainingCooldown <= 0;
}
