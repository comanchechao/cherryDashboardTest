import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { AuthState, AuthContextType, User } from "../types/auth";

const STORAGE_KEYS = {
  USER: "wallet_user",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  TOKEN_ID: "token_id",
} as const;

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "LOGIN_SUCCESS";
      payload: {
        user: User;
        accessToken: string;
        refreshToken: string;
        tokenId: string;
      };
    }
  | { type: "LOGOUT" }
  | {
      type: "UPDATE_WALLET_ADDRESS";
      payload: { walletAddress: string };
    };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenId: null,
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
        error: null,
      };

    case "UPDATE_WALLET_ADDRESS":
      if (!state.user) return state;
      const updatedUser = {
        ...state.user,
        walletAddress: action.payload.walletAddress,
        id: action.payload.walletAddress,
        username: `${action.payload.walletAddress.substring(
          0,
          6
        )}...${action.payload.walletAddress.substring(
          action.payload.walletAddress.length - 4
        )}`,
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return { ...state, user: updatedUser };

    case "LOGOUT":
      return { ...initialState };

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

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedAccessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const savedRefreshToken = localStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
      );
      const savedTokenId = localStorage.getItem(STORAGE_KEYS.TOKEN_ID);

      if (savedUser && savedAccessToken && savedRefreshToken && savedTokenId) {
        const user = JSON.parse(savedUser) as User;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user,
            accessToken: savedAccessToken,
            refreshToken: savedRefreshToken,
            tokenId: savedTokenId,
          },
        });
      }
    } catch (error) {
      console.error("Error loading saved auth data:", error);
      localStorage.clear();
    }
  }, []);

  const saveAuthData = (
    user: User,
    accessToken: string,
    refreshToken: string,
    tokenId: string
  ) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.TOKEN_ID, tokenId);
  };

  const clearStoredAuthData = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });
    clearStoredAuthData();
    dispatch({ type: "LOGOUT" });
  };

  const loginWithWallet = async (
    walletAddress: string,
    accessToken: string,
    refreshToken: string,
    tokenId: string
  ): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const user: User = {
        id: walletAddress,
        walletAddress: walletAddress,
        solanaWalletAddress: walletAddress,
        auth_date: Math.floor(Date.now() / 1000),
        username: `${walletAddress.substring(0, 6)}...${walletAddress.substring(
          walletAddress.length - 4
        )}`,
        authMethod: "wallet",
      };

      saveAuthData(user, accessToken, refreshToken, tokenId);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, accessToken, refreshToken, tokenId },
      });
    } catch (error: any) {
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Failed to login with wallet",
      });
    }
  };

  const updateWalletAddress = (newWalletAddress: string): void => {
    dispatch({
      type: "UPDATE_WALLET_ADDRESS",
      payload: { walletAddress: newWalletAddress },
    });
  };

  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const contextValue: AuthContextType = {
    ...state,
    loginWithWallet,
    logout,
    clearError,
    updateWalletAddress,
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
