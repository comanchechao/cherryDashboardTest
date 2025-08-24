import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";

export const useWalletConnection = () => {
  const { wallet, connect, disconnect, connected, connecting, publicKey } =
    useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    if (!publicKey || !connection) return;

    try {
      setIsLoading(true);
      const lamports = await connection.getBalance(publicKey);
      const solBalance = lamports / LAMPORTS_PER_SOL;
      setBalance(solBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getWalletInfo = () => {
    if (!wallet || !publicKey) return null;

    return {
      name: wallet.adapter.name,
      icon: wallet.adapter.icon,
      address: publicKey.toString(),
      formattedAddress: formatAddress(publicKey.toString()),
      balance: balance,
      isLoadingBalance: isLoading,
    };
  };

  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setBalance(null);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      throw error;
    }
  };

  return {
    wallet,
    connected,
    connecting,
    publicKey,
    walletInfo: getWalletInfo(),
    connectWallet,
    disconnectWallet,
    fetchBalance,
    formatAddress,
    balance,
    isLoadingBalance: isLoading,
  };
};
