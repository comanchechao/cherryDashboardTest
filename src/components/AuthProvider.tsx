import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { AuthState, AuthContextType, TelegramUser } from "../types/auth";
import authService from "../services/authService";
import {
  extractDataFromUrl,
  clearTokenFromUrl,
  hasTokenInUrl,
} from "../utils/tokenExtractor";
import { useToastContext } from "../contexts/ToastContext";

const STORAGE_KEYS = {
  USER: "telegram_auth_user",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  TOKEN_ID: "token_id",
  TELEGRAM_ID: "telegram_id",
} as const;

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "LOGIN_SUCCESS";
      payload: {
        user: TelegramUser;
        accessToken: string;
        refreshToken: string;
        tokenId: string;
        telegramId: number;
      };
    }
  | { type: "LOGOUT" }
  | {
      type: "REFRESH_SUCCESS";
      payload: { accessToken: string; refreshToken: string; tokenId: string };
    };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenId: null,
  telegramId: null,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        tokenId: action.payload.tokenId,
        telegramId: action.payload.telegramId,
        error: null,
      };

    case "REFRESH_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        tokenId: action.payload.tokenId,
        error: null,
      };

    case "LOGOUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { showError, showSuccess, showInfo } = useToastContext();

  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tokenRefreshListenerRef = useRef<((event: CustomEvent) => void) | null>(
    null
  );
  const authErrorListenerRef = useRef<((event: CustomEvent) => void) | null>(
    null
  );
  const refreshAuthRef = useRef<(() => Promise<void>) | null>(null);

  const scheduleTokenRefresh = useCallback(() => {
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
    }

    if (state.isAuthenticated && state.refreshToken) {
      console.log(
        "⏰ [Auth Provider] Scheduling proactive token refresh in 9 minutes..."
      );

      refreshTimerRef.current = setInterval(async () => {
        console.log(
          "🔄 [Auth Provider] Proactive token refresh triggered (9-minute timer)"
        );

        try {
          if (refreshAuthRef.current) {
            await refreshAuthRef.current();
            console.log(
              "✅ [Auth Provider] Proactive token refresh successful"
            );
          }
        } catch (error) {
          console.error(
            "❌ [Auth Provider] Proactive token refresh failed:",
            error
          );
        }
      }, 9 * 60 * 1000);
    }
  }, [state.isAuthenticated, state.refreshToken]);

  useEffect(() => {
    const handleTokenRefreshed = (event: CustomEvent) => {
      console.log(
        "🎉 [Auth Provider] Token refreshed automatically by API interceptor"
      );

      const { accessToken, refreshToken, tokenId } = event.detail;

      dispatch({
        type: "REFRESH_SUCCESS",
        payload: { accessToken, refreshToken, tokenId },
      });

      scheduleTokenRefresh();
    };

    const handleAuthError = async (event: CustomEvent) => {
      console.log(
        "❌ [Auth Provider] Auth error from API interceptor:",
        event.detail
      );

      if (event.detail.shouldLogout) {
        showError(
          "Session Expired",
          "Your session has expired. Please login again."
        );

        if (refreshTimerRef.current) {
          clearInterval(refreshTimerRef.current);
          refreshTimerRef.current = null;
        }

        clearStoredAuthData();
        dispatch({ type: "LOGOUT" });
      }
    };

    tokenRefreshListenerRef.current = handleTokenRefreshed;
    authErrorListenerRef.current = handleAuthError;

    window.addEventListener(
      "tokenRefreshed",
      handleTokenRefreshed as unknown as EventListener
    );
    window.addEventListener(
      "authError",
      handleAuthError as unknown as EventListener
    );

    return () => {
      if (tokenRefreshListenerRef.current) {
        window.removeEventListener(
          "tokenRefreshed",
          tokenRefreshListenerRef.current as unknown as EventListener
        );
      }
      if (authErrorListenerRef.current) {
        window.removeEventListener(
          "authError",
          authErrorListenerRef.current as unknown as EventListener
        );
      }
    };
  }, [showError, scheduleTokenRefresh]);

  useEffect(() => {
    scheduleTokenRefresh();

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [scheduleTokenRefresh]);

  useEffect(() => {
    console.log("🔄 [Auth Provider] Initializing...");

    if (hasTokenInUrl()) {
      console.log(
        "🔗 [Auth Provider] Token found in URL, attempting automatic login..."
      );

      const { token, telegramId } = extractDataFromUrl();
      if (token) {
        clearTokenFromUrl();

        showInfo("Processing Login", "Authenticating with Telegram...");

        loginWithUrlToken(token, telegramId)
          .then(() => {
            showSuccess(
              "Login Successful",
              "You have been authenticated with Telegram"
            );
          })
          .catch((error) => {
            // Check if this is a token expiration error that was already handled
            const errorMessage =
              error.response?.data?.error?.message || error.message;
            if (
              errorMessage &&
              errorMessage.includes("Token has expired (older than 15 minutes)")
            ) {
              // Don't show generic error toast - specific toast already shown in loginWithUrlToken
              return;
            }

            showError(
              "Login Failed",
              error.message || "Failed to authenticate with Telegram"
            );
          });
        return;
      }
    }

    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedAccessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const savedRefreshToken = localStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
      );
      const savedTokenId = localStorage.getItem(STORAGE_KEYS.TOKEN_ID);
      const savedTelegramId = localStorage.getItem(STORAGE_KEYS.TELEGRAM_ID);

      if (
        savedUser &&
        savedAccessToken &&
        savedRefreshToken &&
        savedTokenId &&
        savedTelegramId
      ) {
        const user = JSON.parse(savedUser) as TelegramUser;

        console.log("✅ [Auth Provider] Found saved auth data:", {
          userId: user.id,
          username: user.username,
          hasAccessToken: !!savedAccessToken,
          hasRefreshToken: !!savedRefreshToken,
          tokenId: savedTokenId,
          telegramId: savedTelegramId,
        });

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user,
            accessToken: savedAccessToken,
            refreshToken: savedRefreshToken,
            tokenId: savedTokenId,
            telegramId: parseInt(savedTelegramId, 10),
          },
        });
      } else {
        console.log("ℹ️ [Auth Provider] No saved auth data found");
      }
    } catch (error) {
      console.error("❌ [Auth Provider] Error loading saved auth data:", error);
      clearStoredAuthData();
    }
  }, []);

  const saveAuthData = (
    user: TelegramUser,
    accessToken: string,
    refreshToken: string,
    tokenId: string,
    telegramId: number
  ) => {
    console.log("💾 [Auth Provider] Saving auth data to localStorage...", {
      userId: user.id,
      username: user.username,
      tokenId,
      telegramId,
    });

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.TOKEN_ID, tokenId);
    localStorage.setItem(STORAGE_KEYS.TELEGRAM_ID, telegramId.toString());
  };

  const clearStoredAuthData = () => {
    console.log("🗑️ [Auth Provider] Clearing stored auth data...");

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const loginWithUrlToken = async (
    token: string,
    telegramId: number | null
  ): Promise<void> => {
    console.log("🚀 [Auth Provider] Starting URL token-based login...", {
      tokenLength: token.length,
      telegramId: telegramId || "not provided",
    });

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const result = await authService.loginWithToken(token);

      if (!result.success) {
        throw new Error("Authentication failed");
      }

      const { accessToken, refreshToken, tokenId } = result.result;

      // Use the real Telegram ID from URL if available, fallback to hardcoded
      const user: TelegramUser = {
        id: telegramId || 1401138577, // Use real ID or fallback
        first_name: telegramId ? "User" : "User", // You could enhance this later
        auth_date: Math.floor(Date.now() / 1000),
        hash: "verified",
      };

      console.log("✅ [Auth Provider] Using Telegram user data:", {
        id: user.id,
        isRealId: !!telegramId,
        firstName: user.first_name,
      });

      saveAuthData(
        user,
        accessToken,
        refreshToken,
        tokenId,
        telegramId || 1401138577
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user,
          accessToken,
          refreshToken,
          tokenId,
          telegramId: telegramId || 1401138577,
        },
      });

      console.log("🎉 [Auth Provider] URL token login successful!");
    } catch (error: any) {
      console.error("💥 [Auth Provider] URL token login failed:", {
        error: error.message,
        response: error.response?.data,
        timestamp: new Date().toISOString(),
      });

      // Check for specific token expiration error
      const errorMessage =
        error.response?.data?.error?.message || error.message;

      if (
        errorMessage &&
        errorMessage.includes("Token has expired (older than 15 minutes)")
      ) {
        showError(
          "Login Link Expired",
          "This login link has expired (older than 15 minutes). Please get a new login link from Telegram."
        );
        dispatch({ type: "SET_ERROR", payload: "Login link expired" });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: errorMessage || "Login failed",
        });
      }

      clearStoredAuthData();

      throw error;
    }
  };

  const login = async (): Promise<void> => {
    console.log("🚀 [Auth Provider] Manual login - checking for URL token...");

    const { token: urlToken, telegramId } = extractDataFromUrl();
    if (urlToken) {
      console.log("🔗 [Auth Provider] Found token in URL, using it for login");
      clearTokenFromUrl();
      await loginWithUrlToken(urlToken, telegramId);
      return;
    }

    showInfo(
      "Login Required",
      "Please use a valid Telegram login link to authenticate"
    );

    return;
  };

  const logout = async (): Promise<void> => {
    console.log("🚪 [Auth Provider] Starting logout process...");

    dispatch({ type: "SET_LOADING", payload: true });

    // Clear refresh timer
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    try {
      if (state.refreshToken) {
        await authService.logout(state.refreshToken);
        console.log("✅ [Auth Provider] Backend logout successful");
      }
    } catch (error: any) {
      console.error(
        "⚠️ [Auth Provider] Backend logout failed (continuing with local logout):",
        error.message
      );
    }

    clearStoredAuthData();
    dispatch({ type: "LOGOUT" });

    showSuccess("Logged Out", "You have been successfully logged out");

    console.log("✅ [Auth Provider] Logout complete");
  };

  const refreshAuth = async (): Promise<void> => {
    console.log("🔄 [Auth Provider] Starting token refresh...");

    if (!state.refreshToken) {
      console.error("❌ [Auth Provider] No refresh token available");
      dispatch({ type: "SET_ERROR", payload: "No refresh token available" });
      return;
    }

    try {
      const result = await authService.refreshToken(state.refreshToken);

      if (!result.success) {
        throw new Error("Token refresh failed");
      }

      const { accessToken, refreshToken, tokenId } = result.result;

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.TOKEN_ID, tokenId);
      localStorage.setItem(
        STORAGE_KEYS.TELEGRAM_ID,
        state.telegramId?.toString() || "1401138577"
      );

      dispatch({
        type: "REFRESH_SUCCESS",
        payload: { accessToken, refreshToken, tokenId },
      });

      console.log("✅ [Auth Provider] Token refresh successful:", { tokenId });

      scheduleTokenRefresh();
    } catch (error: any) {
      console.error("❌ [Auth Provider] Token refresh failed:", {
        error: error.message,
        response: error.response?.data,
      });

      // Check for specific token expiration errors
      const errorMessage =
        error.response?.data?.error?.message || error.message;

      if (errorMessage && errorMessage.includes("Token has expired")) {
        showError(
          "Session Expired",
          "Your session has expired. Please login again with a new Telegram link."
        );
        dispatch({
          type: "SET_ERROR",
          payload: "Session expired. Please login again.",
        });
      } else {
        showError(
          "Authentication Error",
          "Failed to refresh your session. Please login again."
        );
        dispatch({
          type: "SET_ERROR",
          payload: "Session expired. Please login again.",
        });
      }

      await logout();
    }
  };

  // Assign refreshAuth to ref for use in timer
  refreshAuthRef.current = refreshAuth;

  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
