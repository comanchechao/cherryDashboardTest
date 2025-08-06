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

  public static getInstance(): RewardsService {
    if (!RewardsService.instance) {
      RewardsService.instance = new RewardsService();
    }
    return RewardsService.instance;
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
}

export default RewardsService.getInstance();
