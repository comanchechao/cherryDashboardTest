import axios from "axios";
import {
  VerifyTokenRequest,
  VerifyTokenResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  LogoutResponse,
} from "../types/auth";

const getAuthBaseURL = () => {
  return "/auth-api";
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

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    console.log("🔐 [Auth Service] Starting verifyToken process...", {
      tokenLength: token.length,
      timestamp: new Date().toISOString(),
    });

    try {
      const request: VerifyTokenRequest = { token };

      console.log("📤 [Auth Service] Sending verifyToken request:", {
        endpoint: "/auth/verifyToken",
        tokenLength: token.length,
      });

      const response = await authApiClient.post<VerifyTokenResponse>(
        "/auth/verifyToken",
        request
      );

      return response.data;
    } catch (error: any) {
      if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
        console.error(
          "❌ [Auth Service] CORS/Network Error - Auth API not accessible:",
          {
            error: "CORS policy blocking request to auth API",
            endpoint: getAuthBaseURL() + "/auth/verifyToken",
            solution:
              "Backend needs to add CORS headers, or restart dev server if proxy was just added",
          }
        );
        throw new Error(
          "Authentication service unavailable (CORS/Network error)"
        );
      }

      console.error("❌ [Auth Service] VerifyToken failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        tokenLength: token.length,
      });
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    console.log("🔄 [Auth Service] Starting refreshToken process...", {
      refreshTokenLength: refreshToken.length,
      timestamp: new Date().toISOString(),
    });

    try {
      const request: RefreshTokenRequest = { refreshToken };

      console.log("📤 [Auth Service] Sending refreshToken request:", {
        endpoint: "/auth/refreshToken",
        refreshTokenLength: refreshToken.length,
      });

      const response = await authApiClient.post<RefreshTokenResponse>(
        "/auth/refreshToken",
        request
      );

      // RefreshToken successful - detailed logging removed to reduce noise

      return response.data;
    } catch (error: any) {
      console.error("❌ [Auth Service] RefreshToken failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        refreshTokenLength: refreshToken.length,
      });
      throw error;
    }
  }

  async logout(refreshToken: string): Promise<LogoutResponse> {
    console.log("🚪 [Auth Service] Starting logout process...", {
      refreshTokenLength: refreshToken.length,
      timestamp: new Date().toISOString(),
    });

    try {
      const request: LogoutRequest = { refreshToken };

      console.log("📤 [Auth Service] Sending logout request:", {
        endpoint: "/auth/logoutToken",
        refreshTokenLength: refreshToken.length,
      });

      const response = await authApiClient.post<LogoutResponse>(
        "/auth/logoutToken",
        request
      );

      return response.data;
    } catch (error: any) {
      console.error("❌ [Auth Service] Logout failed:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        refreshTokenLength: refreshToken.length,
      });
      throw error;
    }
  }

  async loginWithToken(token: string): Promise<VerifyTokenResponse> {
    console.log("🚀 [Auth Service] Starting token-based login...", {
      tokenLength: token.length,
      timestamp: new Date().toISOString(),
    });

    try {
      console.log("🔐 [Auth Service] Using provided token for verification");

      const verifyResult = await this.verifyToken(token);

      if (!verifyResult.success) {
        throw new Error("Failed to verify token");
      }

      console.log("🎉 [Auth Service] Token verification successful!");

      return verifyResult;
    } catch (error: any) {
      console.error("💥 [Auth Service] Token-based login failed:", {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }
}

export default AuthService.getInstance();
