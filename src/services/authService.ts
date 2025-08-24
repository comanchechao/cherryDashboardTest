import axios from "axios";
import {
  GenerateWalletChallengeResponse,
  CreateTokenByWalletResponse,
  VerifyTokenResponse,
  WalletChallenge,
} from "../types/auth";

const getAuthBaseURL = () => {
  return "/auth-api"; // This will proxy to your backend
};

const authApiClient = axios.create({
  baseURL: getAuthBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async generateWalletChallenge(
    walletAddress: string
  ): Promise<GenerateWalletChallengeResponse> {
    console.log("🔐 Generating wallet challenge for:", walletAddress);

    try {
      const request = { walletAddress };
      const response =
        await authApiClient.post<GenerateWalletChallengeResponse>(
          "/auth/generateWalletChallenge",
          request
        );

      console.log("✅ Wallet challenge generated successfully");
      return response.data;
    } catch (error: any) {
      console.error("❌ Failed to generate wallet challenge:", error);
      throw error;
    }
  }

  async createTokenByWallet(
    signature: string,
    challenge: WalletChallenge
  ): Promise<CreateTokenByWalletResponse> {
    console.log("🔐 Creating token by wallet signature");

    try {
      const request = { signature, challenge };
      const response = await authApiClient.post<CreateTokenByWalletResponse>(
        "/auth/createTokenByWalletAddress",
        request
      );

      console.log("✅ Token created successfully by wallet");
      return response.data;
    } catch (error: any) {
      console.error("❌ Failed to create token by wallet:", error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    console.log("🔐 Starting verifyToken process...");

    try {
      const request = { token };
      const response = await authApiClient.post<VerifyTokenResponse>(
        "/auth/verifyToken",
        request
      );

      return response.data;
    } catch (error: any) {
      console.error("❌ VerifyToken failed:", error);
      throw error;
    }
  }
}

export default AuthService.getInstance();
