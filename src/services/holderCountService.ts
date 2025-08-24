interface HolderCountResponse {
  jsonrpc: string;
  id: number;
  result: {
    blockchain: string;
    contractAddress: string;
    tokenDecimals: number;
    holderCountHistory: Array<{
      holderCount: number;
      totalAmount: string;
      totalAmountRawInteger: string;
      totalAmountUsd: string;
      lastUpdatedAt: string;
    }>;
    latestHoldersCount: number;
    syncStatus: {
      timestamp: number;
      lag: string;
      status: string;
    };
  };
}

interface HolderCountData {
  holderCount: number;
  totalAmount: string;
  syncStatus: string;
}

class HolderCountService {
  private readonly API_URL =
    "https://rpc.ankr.com/multichain/47d3fc61ed9b1793dfbf0bfd5b26127969a61fc2d0e759964cd190d137cc88fd";
  private readonly CONTRACT_ADDRESS =
    "0x96adaa33e175f4a7f20c099730bc78dd0b45745b";

  async getHolderCount(): Promise<HolderCountData> {
    try {
      const requestData = {
        id: 1,
        jsonrpc: "2.0",
        method: "ankr_getTokenHoldersCount",
        params: {
          blockchain: "bsc",
          contractAddress: this.CONTRACT_ADDRESS,
          pageSize: 0,
        },
      };

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HolderCountResponse = await response.json();

      if (data.result && typeof data.result.latestHoldersCount === "number") {
        return {
          holderCount: data.result.latestHoldersCount,
          totalAmount: data.result.holderCountHistory[0]?.totalAmount || "0",
          syncStatus: data.result.syncStatus.status,
        };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching holder count:", error);
      throw error; // Re-throw the error instead of returning fallback
    }
  }
}

export default new HolderCountService();
