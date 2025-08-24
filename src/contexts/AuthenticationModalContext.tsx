import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useWalletConnection } from "../hooks/useWalletConnection";
import { useAuth } from "../components/AuthProvider";

interface AuthenticationModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  onSuccess: () => void;
}

const AuthenticationModalContext = createContext<
  AuthenticationModalContextType | undefined
>(undefined);

interface AuthenticationModalProviderProps {
  children: ReactNode;
}

export const AuthenticationModalProvider: React.FC<
  AuthenticationModalProviderProps
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { connected, disconnectWallet } = useWalletConnection();
  const { isAuthenticated } = useAuth();

  // Auto-open modal when wallet connects but user is not authenticated
  useEffect(() => {
    if (connected && !isAuthenticated && !isOpen) {
      setIsOpen(true);
    }
  }, [connected, isAuthenticated, isOpen]);

  // Auto-close modal when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      setIsOpen(false);
    }
  }, [isAuthenticated, isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // If wallet is connected but not authenticated, disconnect the wallet
    if (connected && !isAuthenticated) {
      disconnectWallet().catch((err) => {
        console.error("Error disconnecting wallet:", err);
      });
    }
  };

  const onSuccess = () => {
    // Additional success handling can be added here
  };

  const contextValue: AuthenticationModalContextType = {
    isOpen,
    openModal,
    closeModal,
    onSuccess,
  };

  return (
    <AuthenticationModalContext.Provider value={contextValue}>
      {children}
    </AuthenticationModalContext.Provider>
  );
};

export const useAuthenticationModal = (): AuthenticationModalContextType => {
  const context = useContext(AuthenticationModalContext);
  if (context === undefined) {
    throw new Error(
      "useAuthenticationModal must be used within an AuthenticationModalProvider"
    );
  }
  return context;
};
