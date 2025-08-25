import { useState, useEffect, useCallback } from "react";

interface WalletInfo {
  name: string;
  icon?: string;
  address: string;
  formattedAddress: string;
  balance: number | null;
  isLoadingBalance: boolean;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWalletConnection = () => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const fetchBalance = useCallback(async (addr: string) => {
    if (!window.ethereum || !addr) return;
    try {
      setIsLoadingBalance(true);
      const wei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [addr, "latest"],
      });
      const eth = parseInt(wei, 16) / 1e18;
      setBalance(eth);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    } finally {
      setIsLoadingBalance(false);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      window.alert("MetaMask is not installed. Please install it to connect.");
      return;
    }
    try {
      setConnecting(true);
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const acc = accounts?.[0];
      if (acc) {
        setAddress(acc);
        setConnected(true);
        fetchBalance(acc);
      }
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
      throw error;
    } finally {
      setConnecting(false);
    }
  }, [fetchBalance]);

  const disconnectWallet = useCallback(async () => {
    // MetaMask does not support programmatic disconnect; clear local state
    setConnected(false);
    setAddress(null);
    setBalance(null);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      const acc = accounts?.[0] ?? null;
      setAddress(acc);
      const isNowConnected = Boolean(acc);
      setConnected(isNowConnected);
      if (acc) fetchBalance(acc);
      else setBalance(null);
    };

    window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
      if (accounts && accounts[0]) {
        handleAccountsChanged(accounts);
      }
    });

    window.ethereum.on?.("accountsChanged", handleAccountsChanged);

    return () => {
      try {
        window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
      } catch {}
    };
  }, [fetchBalance]);

  const walletInfo: WalletInfo | null = address
    ? {
        name: "MetaMask",
        address,
        formattedAddress: formatAddress(address),
        balance,
        isLoadingBalance,
      }
    : null;

  return {
    connected,
    connecting,
    connectWallet,
    disconnectWallet,
    walletInfo,
  };
};

export default useWalletConnection;
