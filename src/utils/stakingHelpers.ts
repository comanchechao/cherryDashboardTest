import { BigNumber, Contract, ethers } from "ethers";

// Addresses from staking-react.ts
export const STAKING_ADDRESS = "0xF33a3A93C787989aa45426fE77c04555B8452C43";
export const TOKEN_ADDRESS = "0x96AdaA33e175F4A7f20c099730bc78dd0B45745B";

// BSC configuration
export const BSC_RPC_URL = "https://bsc-dataseed.binance.org";

// ABIs from staking-react.ts
const stakingAbi = [
  "function stakingToken() view returns (address)",
  "function stake(uint256 _amount) returns (uint256)",
  "function withdraw(uint256 amount) returns (uint256)",
  "function claim() returns (uint256)",
  "function getEarnedRewardTokens(address _staker) view returns (uint256)",
  "function stakeAmount(address _staker) view returns (uint256)",
  "function lockTimePeriod() view returns (uint48)",
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
}

export interface CooldownInfo {
  cooldownStartTime: number;
  isInCooldown: boolean;
  remainingCooldown: number;
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
    // Get user staked amount and earned rewards
    const [stakedResult, earnedResult, lockTimePeriod] = await Promise.all([
      getUserStaked(provider as ethers.providers.Web3Provider, userAddress),
      getUserEarned(provider as ethers.providers.Web3Provider, userAddress),
      getLockTimePeriod(provider as ethers.providers.Web3Provider),
    ]);

    // Calculate cooldown info based on lock time period
    const cooldownInfo = getCooldownInfo(lockTimePeriod);

    return {
      stakedAmount: stakedResult.formatted,
      pendingRewards: earnedResult.formatted,
      isInCooldown: cooldownInfo.isInCooldown,
      cooldownStartTime: cooldownInfo.cooldownStartTime,
      remainingCooldown: cooldownInfo.remainingCooldown,
      canUnstake: cooldownInfo.remainingCooldown <= 0,
    };
  } catch (error) {
    console.error("Error fetching staking data:", error);
    // Return default values on error
    return {
      stakedAmount: "0",
      pendingRewards: "0",
      isInCooldown: false,
      cooldownStartTime: 0,
      remainingCooldown: 0,
      canUnstake: true,
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
