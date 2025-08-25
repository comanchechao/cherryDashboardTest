import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useWalletConnection } from "../hooks/useWalletConnection";

const WalletConnectionManager: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { connected, connecting, connectWallet, disconnectWallet, walletInfo } =
    useWalletConnection();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConnectWallet = () => {
    connectWallet();
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  if (connected && walletInfo) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-pink-500/20 text-white px-4 py-2 rounded-sm border border-accent/30 backdrop-blur-sm hover:from-accent/30 hover:to-pink-500/30 transition-all duration-300 winky-sans-font"
        >
          <Icon icon="ph:wallet-fill" className="w-5 h-5 text-accent" />
          <span>{walletInfo.formattedAddress}</span>
          <Icon
            icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
            className="w-4 h-4 text-accent"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 glass-effect border border-white/10 rounded-lg shadow-lg p-2 z-50 backdrop-blur-sm">
            <button
              onClick={() => {
                navigator.clipboard.writeText(walletInfo.address);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 text-left hover:bg-white/5 rounded-lg winky-sans-font text-white/70 hover:text-white transition-all duration-300"
            >
              <Icon icon="mdi:content-copy" className="w-4 h-4 text-white/60" />
              <span className="text-sm">Copy Address</span>
            </button>
            <div className="border-t border-white/10 my-2"></div>
            <button
              onClick={handleDisconnectWallet}
              className="w-full flex items-center gap-2 p-2 text-left hover:bg-red-500/10 rounded-lg text-red-400 winky-sans-font transition-all duration-300"
            >
              <Icon icon="mdi:logout" className="w-4 h-4" />
              <span className="text-sm">Disconnect Wallet</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!connected) {
    if (connecting) {
      return (
        <button
          disabled
          className="flex items-center space-x-2 bg-white/10 text-white/50 px-4 py-2 rounded-sm border border-white/10 opacity-50 winky-sans-font"
        >
          <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />
          <span>Connecting...</span>
        </button>
      );
    }

    return (
      <button
        onClick={handleConnectWallet}
        className="flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-pink-500/20 text-white px-4 py-2 rounded-sm border border-accent/30 backdrop-blur-sm hover:from-accent/30 hover:to-pink-500/30 transition-all duration-300 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-accent/25  "
      >
        <Icon icon="ph:wallet-fill" className="w-5 h-5 text-accent" />
        <span>Connect Wallet</span>
      </button>
    );
  }

  return null;
};

export default WalletConnectionManager;
