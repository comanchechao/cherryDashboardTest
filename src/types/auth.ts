export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  result: {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  result: {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
  };
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  result: {
    message: string;
  };
}

// Auth State Types

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TelegramUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenId: string | null;
  telegramId: number | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}
