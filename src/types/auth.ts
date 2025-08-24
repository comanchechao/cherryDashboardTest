export interface User {
  id: string;
  walletAddress: string;
  solanaWalletAddress: string;
  auth_date: number;
  username?: string;
  authMethod: "wallet" | "telegram";
}

export interface WalletChallenge {
  message: string;
  walletAddress: string;
  nonce: string;
  iat: number;
  exp: number;
  domain: string;
  version: string;
}

export interface GenerateWalletChallengeResponse {
  success: boolean;
  result: {
    payload: WalletChallenge;
  };
}

export interface CreateTokenByWalletResponse {
  success: boolean;
  result: {
    token: string;
  };
}

export interface VerifyTokenResponse {
  success: boolean;
  result: {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenId: string | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  loginWithWallet: (
    walletAddress: string,
    accessToken: string,
    refreshToken: string,
    tokenId: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateWalletAddress: (newWalletAddress: string) => void;
}
