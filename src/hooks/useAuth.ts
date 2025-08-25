import { AuthContextType } from "../types/auth";

const noop = async () => {};
const noopSync = () => {};

const unauthenticatedAuth: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenId: null,
  error: null,
  loginWithWallet: noop,
  logout: noop,
  clearError: noopSync,
  updateWalletAddress: noopSync,
};

export const useAuth = (): AuthContextType => {
  return unauthenticatedAuth;
};

export default useAuth;
