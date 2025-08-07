import axios from "axios";

interface LeaderboardResponse {
  success: boolean;
  result: {
    leaderboards: Array<{
      points: string;
      totalUsdVolume: string;
      tier: string;
      wallet: string;
    }>;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    isLastPage: boolean;
  };
  error?: string;
}

interface LeaderboardParams {
  telegramId: string;
  pageNumber: number;
  pageSize: number;
}

interface UpdateBalanceResponse {
  success: boolean;
  result?: Array<{
    id: string;
    parentId: string | null;
    confirmedBalance: string;
    address: string;
    token: {
      name: string;
      title: string;
      symbol: string;
      contractAddress: string;
      unitDecimals: number;
      decimalsToShow: number;
    };
    key: {
      label: string;
      selectedWallet: boolean;
    };
    confirmedBalanceUSD?: string;
  }>;
  userPoint?: {
    points: number;
    totalUsdVolume: number;
    tier: string;
  };
  error?: string;
}

interface ReferralInfo {
  referralCode: string;
  referralLink: string;
  totalReferrals?: number;
  totalEarnings?: number;
}

interface ReferralResponse {
  success: boolean;
  result: {
    referralInfo: ReferralInfo;
  };
  error?: string;
}

const getRewardsBaseURL = () => {
  return "/auth-api";
};

const rewardsApiClient = axios.create({
  baseURL: getRewardsBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

class RewardsService {
  private static instance: RewardsService;
  private referralCache = new Map<
    string,
    { data: ReferralInfo; timestamp: number }
  >();

  public static getInstance(): RewardsService {
    if (!RewardsService.instance) {
      RewardsService.instance = new RewardsService();
    }
    return RewardsService.instance;
  }

  private isCacheValid(timestamp: number): boolean {
    const cacheAge = Date.now() - timestamp;
    const cacheValidityDuration = 5 * 60 * 1000; // 5 minutes
    return cacheAge < cacheValidityDuration;
  }

  async getPublicLeaderboards(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<LeaderboardResponse> {
    console.log("🏆 [Rewards Service] Fetching public leaderboards...", {
      pageNumber,
      pageSize,
      timestamp: new Date().toISOString(),
    });

    try {
      const params = {
        pageNumber,
        pageSize,
      };

      console.log("📤 [Rewards Service] Sending public leaderboards request:", {
        endpoint: "/user/getLeaderboards",
        params,
      });

      const response = await rewardsApiClient.get<LeaderboardResponse>(
        "/user/getLeaderboards",
        {
          params,
        }
      );

      console.log("✅ [Rewards Service] Public leaderboards response:", {
        success: response.data.success,
        totalCount: response.data.result?.totalCount,
        usersCount: response.data.result?.leaderboards?.length,
        pageNumber: response.data.result?.pageNumber,
        pageSize: response.data.result?.pageSize,
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ [Rewards Service] GetPublicLeaderboards failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        pageNumber,
        pageSize,
      });
      throw error;
    }
  }

  async getLeaderboards(
    telegramId: string,
    pageNumber: number = 1,
    pageSize: number = 10,
    accessToken: string
  ): Promise<LeaderboardResponse> {
    console.log("🏆 [Rewards Service] Fetching leaderboards...", {
      telegramId,
      pageNumber,
      pageSize,
      timestamp: new Date().toISOString(),
    });

    try {
      const params: LeaderboardParams = {
        telegramId,
        pageNumber,
        pageSize,
      };

      console.log("📤 [Rewards Service] Sending leaderboards request:", {
        endpoint: "/user/getLeaderboards",
        params,
      });

      const response = await rewardsApiClient.get<LeaderboardResponse>(
        "/user/getLeaderboards",
        {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("✅ [Rewards Service] Leaderboards response:", {
        success: response.data.success,
        totalCount: response.data.result?.totalCount,
        usersCount: response.data.result?.leaderboards?.length,
        pageNumber: response.data.result?.pageNumber,
        pageSize: response.data.result?.pageSize,
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ [Rewards Service] GetLeaderboards failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        telegramId,
        pageNumber,
        pageSize,
      });
      throw error;
    }
  }

  async updateBalance(
    telegramId: string,
    accessToken: string
  ): Promise<UpdateBalanceResponse> {
    console.log("💰 [Rewards Service] Updating balance...", {
      telegramId,
      timestamp: new Date().toISOString(),
    });

    try {
      console.log("📤 [Rewards Service] Sending updateBalance request:", {
        endpoint: "/wallet/updateBalance",
        telegramId,
      });

      const response = await rewardsApiClient.post<UpdateBalanceResponse>(
        "/wallet/updateBalance",
        {
          telegramId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("✅ [Rewards Service] UpdateBalance response:", {
        success: response.data.success,
        result: response.data.result,
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ [Rewards Service] UpdateBalance failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        telegramId,
      });
      throw error;
    }
  }

  async getReferralInfo(
    telegramId: string,
    accessToken: string
  ): Promise<ReferralInfo> {
    const cacheKey = `referral_${telegramId}`;
    const cachedData = this.referralCache.get(cacheKey);

    // Check if we have valid cached data
    if (cachedData && this.isCacheValid(cachedData.timestamp)) {
      console.log(
        `📦 [Rewards Service] Using cached referral info for user: ${telegramId}`
      );
      return cachedData.data;
    }

    // If no valid cache, fetch from API
    console.log(
      `🔄 [Rewards Service] Fetching fresh referral info for user: ${telegramId}`
    );

    try {
      console.log("📤 [Rewards Service] Sending getReferralInfo request:", {
        endpoint: "/user/getReferralInfo",
        telegramId,
      });

      const response = await rewardsApiClient.get<ReferralResponse>(
        "/user/getReferralInfo",
        {
          params: {
            telegramId: telegramId,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const referralInfo = response.data.result.referralInfo;

      // Cache the new data
      this.referralCache.set(cacheKey, {
        data: referralInfo,
        timestamp: Date.now(),
      });

      console.log("✅ [Rewards Service] ReferralInfo response:", {
        success: response.data.success,
        referralCode: referralInfo.referralCode,
        referralLink: referralInfo.referralLink,
      });

      console.log(
        `💾 [Rewards Service] Cached referral info for user: ${telegramId}`
      );
      return referralInfo;
    } catch (error: any) {
      console.error("❌ [Rewards Service] GetReferralInfo failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        telegramId,
      });

      // If we have stale cache data, return it as fallback
      if (cachedData) {
        console.log(
          `⚠️ [Rewards Service] Using stale cached referral info for user: ${telegramId}`
        );
        return cachedData.data;
      }

      throw error;
    }
  }
}

export default RewardsService.getInstance();
