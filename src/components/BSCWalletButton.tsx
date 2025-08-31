import React from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "./BSCWalletProvider";

const BSCWalletButton: React.FC = () => {
  const { address, isConnected, connect, disconnect, balance } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2 bg-[var(--color-glass)] text-[var(--color-text-primary)] px-4 py-2 rounded-sm border border-[var(--color-accent)] backdrop-blur-sm transition-all duration-200 winky-sans-font shadow-lg">
        <Icon
          icon="ph:wallet-fill"
          className="w-5 h-5 text-[var(--color-accent)]"
        />
        <span>{formatAddress(address)}</span>
        {balance && (
          <span className="text-xs text-[var(--color-accent)]/80">
            {balance} BNB
          </span>
        )}
        <button
          onClick={disconnect}
          className="ml-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <Icon icon="mdi:logout" className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className="flex items-center cursor-pointer space-x-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white px-4 py-2 rounded-sm border border-[var(--color-accent)] backdrop-blur-sm transition-all duration-200 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-[var(--color-accent)]/25 transform hover:-translate-y-0.5"
    >
      <Icon icon="ph:wallet-fill" className="w-5 h-5 text-white" />
      <span>Connect Wallet</span>
    </button>
  );
};

export default BSCWalletButton;
