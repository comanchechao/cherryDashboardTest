import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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

  const isConnected = !!address;

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAddress(account);

        const balHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });
        const bal = (parseInt(balHex, 16) / 10 ** 18).toFixed(4);
        setBalance(bal);

        showSuccess("Wallet Connected", `${formatAddress(account)} connected`);
      } catch (error: any) {
        showError(
          "Connection Cancelled",
          "Wallet connection was not completed"
        );
        console.error("User rejected connection");
      }
    } else {
      showError("MetaMask Required", "Please install MetaMask to continue");
      alert("Please install MetaMask!");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(null);
    showSuccess("Wallet Disconnected", "You have disconnected your wallet");
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            const acct = accounts[0];
            setAddress(acct);
            window.ethereum
              .request({
                method: "eth_getBalance",
                params: [acct, "latest"],
              })
              .then((balHex: string) => {
                setBalance((parseInt(balHex, 16) / 10 ** 18).toFixed(4));
              });
          }
        });

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
          setBalance(null);
          showSuccess(
            "Wallet Disconnected",
            "You have disconnected your wallet"
          );
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        try {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
        } catch {}
      };
    }
  }, [showSuccess]);

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
