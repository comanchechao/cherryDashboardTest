import {
  useAccount as useWagmiAccount,
  useDisconnect as useWagmiDisconnect,
} from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useState, useEffect } from "react";

export function useReownWallet() {
  const { address: bscAddress, isConnected: isBscConnected } =
    useWagmiAccount();
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();

  const appKitAvailable = Boolean((window as any)?.appKit);

  const appKitHook = appKitAvailable
    ? useAppKit()
    : { open: () => Promise.resolve(), close: () => Promise.resolve() };
  const { open, close } = appKitHook;

  const [, forceUpdate] = useState({});

  const solanaWallet = (window as any)?.solana;
  const solanaAddress = solanaWallet?.publicKey?.toString();
  const isSolanaConnected = Boolean(solanaWallet && solanaWallet.isConnected);

  const isEVMConnected = isBscConnected;
  const evmAddress = bscAddress;

  useEffect(() => {
    console.log("useReownWallet state:", {
      bscAddress,
      isBscConnected,
      solanaAddress,
      isSolanaConnected,
      isEVMConnected,
      evmAddress,
      isConnected: isEVMConnected || isSolanaConnected,
      appKitAvailable,
    });
  }, [
    bscAddress,
    isBscConnected,
    solanaAddress,
    isSolanaConnected,
    isEVMConnected,
    evmAddress,
    appKitAvailable,
  ]);

  const getFormattedAddress = (address: string | undefined) => {
    if (address) {
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    return null;
  };

  const handleDisconnect = async () => {
    try {
      console.log("Starting wallet disconnection...");

      // Disconnect from Solana wallet if connected
      if (solanaWallet && solanaWallet.isConnected) {
        try {
          await solanaWallet.disconnect();
          console.log("Solana wallet disconnected successfully");
        } catch (error) {
          console.error("Error disconnecting Solana wallet:", error);
        }
      }

      // Disconnect from EVM wallet if connected
      if (isEVMConnected) {
        try {
          wagmiDisconnect();
          console.log("EVM wallet disconnected successfully");
        } catch (error) {
          console.error("Error disconnecting EVM wallet:", error);
        }
      }

      // Try to disconnect using AppKit instance directly
      if ((window as any)?.reownAppKit?.disconnect) {
        try {
          await (window as any).reownAppKit.disconnect();
          console.log("AppKit disconnect completed");
        } catch (error) {
          console.error("Error with AppKit disconnect:", error);
        }
      }

      // Close AppKit modal if available
      if (appKitAvailable) {
        try {
          await close();
          console.log("AppKit modal closed");
        } catch (error) {
          console.error("Error closing AppKit modal:", error);
        }
      }

      console.log("Wallet disconnection completed");

      // Force a re-render to update the UI
      forceUpdate({});
    } catch (error) {
      console.error("Error in handleDisconnect:", error);
      // Force a re-render even if there's an error
      forceUpdate({});
    }
  };

  const handleConnect = () => {
    if (!appKitAvailable) {
      console.error("AppKit not available yet");
      return Promise.reject(new Error("AppKit not available yet"));
    }

    console.log("Opening AppKit modal...");
    console.log("AppKit instance:", (window as any).appKit);
    console.log("useAppKit hook:", { open, close });

    try {
      const result = open();
      console.log("AppKit open result:", result);
      return result;
    } catch (error) {
      console.error("Error opening AppKit modal:", error);
      throw error;
    }
  };

  return {
    bscAddress: evmAddress,
    solanaAddress,
    connect: handleConnect,
    disconnect: handleDisconnect,
    isConnected: isEVMConnected || isSolanaConnected,
    isBscConnected: isEVMConnected,
    isSolanaConnected,
    solanaWallet: {
      ...solanaWallet,
      formattedAddress: getFormattedAddress(solanaAddress),
      address: solanaAddress,
    },
    evmAddress,
    isEVMConnected,
    appKitAvailable,
  };
}
