import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useToastContext } from "../contexts/ToastContext";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  balance: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export function BSCWalletProvider({ children }: { children: ReactNode }) {
  const { showSuccess, showError } = useToastContext();
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isConnected = !!address;

  const saveConnectionState = (addr: string | null, bal: string | null) => {
    if (addr && bal) {
      localStorage.setItem("wallet_connected", "true");
      localStorage.setItem("wallet_address", addr);
      localStorage.setItem("wallet_balance", bal);
    } else {
      localStorage.removeItem("wallet_connected");
      localStorage.removeItem("wallet_address");
      localStorage.removeItem("wallet_balance");
    }
  };

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const connect = async () => {
    // Better MetaMask detection
    const ethereum = (window as any).ethereum;

    // Debug logging
    console.log("MetaMask Detection Debug:");
    console.log("window.ethereum exists:", !!ethereum);
    console.log("ethereum.isMetaMask:", ethereum?.isMetaMask);
    console.log("ethereum.selectedAddress:", ethereum?.selectedAddress);

    if (ethereum && ethereum.isMetaMask) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAddress(account);

        const balHex = await ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });
        const bal = (parseInt(balHex, 16) / 10 ** 18).toFixed(4);
        setBalance(bal);

        // Save connection state to localStorage
        saveConnectionState(account, bal);

        showSuccess("Wallet Connected", `${formatAddress(account)} connected`);
      } catch (error: any) {
        if (error.code === 4001) {
          showError(
            "Connection Rejected",
            "You rejected the wallet connection request"
          );
        } else {
          showError(
            "Connection Failed",
            error.message || "Failed to connect wallet"
          );
        }
        console.error("Wallet connection error:", error);
      }
    } else if (ethereum) {
      // Ethereum provider exists but not MetaMask
      showError("MetaMask Required", "Please use MetaMask wallet to continue");
    } else {
      // No ethereum provider detected
      showError(
        "MetaMask Required",
        "Please install MetaMask extension to continue"
      );
      // Open MetaMask download page
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(null);
    saveConnectionState(null, null);
    showSuccess("Wallet Disconnected", "You have disconnected your wallet");
  };

  const checkExistingConnection = useCallback(async () => {
    if (!isInitialized) {
      const wasConnected = localStorage.getItem("wallet_connected") === "true";
      if (wasConnected) {
        const storedAddress = localStorage.getItem("wallet_address");
        const storedBalance = localStorage.getItem("wallet_balance");
        if (storedAddress) setAddress(storedAddress);
        if (storedBalance) setBalance(storedBalance);
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    checkExistingConnection();
  }, [checkExistingConnection]);

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum && ethereum.isMetaMask && isInitialized) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (address) {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            ethereum
              .request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
              })
              .then((balHex: string) => {
                const bal = (parseInt(balHex, 16) / 10 ** 18).toFixed(4);
                setBalance(bal);
                // Update localStorage with new account data
                saveConnectionState(accounts[0], bal);
              })
              .catch(console.error);
          } else {
            setAddress(null);
            setBalance(null);
            saveConnectionState(null, null);
            showSuccess(
              "Wallet Disconnected",
              "You have disconnected your wallet"
            );
          }
        }
      };

      const handleChainChanged = () => {
        // Reload the page when chain changes to ensure proper state
        window.location.reload();
      };

      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);

      return () => {
        try {
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("chainChanged", handleChainChanged);
        } catch {}
      };
    }
  }, [isInitialized, showSuccess, address]);

  const value = {
    address,
    isConnected,
    connect,
    disconnect,
    balance,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
