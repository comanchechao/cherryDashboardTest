import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "./AuthProvider";
import { useWalletConnection } from "../hooks/useWalletConnection";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAuthenticationModal } from "../contexts/AuthenticationModalContext";

const WalletAuth: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    isAuthenticated,
    isLoading: authLoading,
    user,
    error: authError,
    logout,
    clearError,
  } = useAuth();
  const { connecting, connected, disconnectWallet } = useWalletConnection();
  const { setVisible } = useWalletModal();
  const { openModal } = useAuthenticationModal();

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

  const handleDisconnectWallet = async () => {
    setIsDropdownOpen(false);
    try {
      await disconnectWallet();
      await logout();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const handleConnectWallet = async () => {
    if (!connected) {
      setVisible(true);
      return;
    }

    if (!isAuthenticated) {
      openModal();
    }
  };

  if (authLoading) {
    return (
      <button
        disabled
        className="flex items-center space-x-2 bg-white/10 text-white/50 px-4 py-2 rounded-sm border border-white/10 opacity-50 winky-sans-font"
      >
        <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />
        <span>Checking...</span>
      </button>
    );
  }

  if (connected && !isAuthenticated) {
    return null; // Let WalletConnectionManager handle this
  }

  if (isAuthenticated && user && user.authMethod === "wallet") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white px-4 py-2 rounded-sm border border-green-500/30 backdrop-blur-sm hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 winky-sans-font"
        >
          <Icon icon="ph:wallet-fill" className="w-5 h-5 text-green-400" />
          <span>
            {user.walletAddress.substring(0, 4)}...
            {user.walletAddress.substring(user.walletAddress.length - 4)}
          </span>
          <Icon
            icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
            className="w-4 h-4 text-green-400"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 glass-effect border border-white/10 rounded-lg shadow-lg p-2 z-50 backdrop-blur-sm">
            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-2 backdrop-blur-sm">
                <p className="text-red-400 text-sm mb-2 winky-sans-font">
                  {authError}
                </p>
                <button
                  onClick={clearError}
                  className="text-red-400 text-xs underline winky-sans-font hover:text-red-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}

            <button
              onClick={handleDisconnectWallet}
              className="w-full flex items-center gap-2 p-2 text-left hover:bg-red-500/10 rounded-lg text-red-400 winky-sans-font transition-all duration-300"
            >
              <Icon icon="mdi:logout" className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!connected) {
    return (
      <button
        onClick={handleConnectWallet}
        className="flex items-center gap-3 px-5 py-3 bg-[#020e1f] cursor-pointer text-[var(--color-accent)] rounded-sm border border-[var(--color-accent)]/30   hover:from-[var(--color-accent)]/30 hover:to-[var(--color-accent)]/30 transition-all duration-300 winky-sans-font font-medium shadow-lg hover:shadow-xl hover:shadow-accent/25  "
      >
        <Icon icon="ph:wallet-fill" className="w-5 h-5 text-accent" />
        <span>{connecting ? "Connecting..." : "Connect Wallet"}</span>
      </button>
    );
  }

  return null;
};

export default WalletAuth;
