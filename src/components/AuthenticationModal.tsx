import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletConnection } from "../hooks/useWalletConnection";
import { useAuth } from "./AuthProvider";
import { useToastContext } from "../contexts/ToastContext";
import authService from "../services/authService";

interface AuthenticationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const { publicKey, signMessage } = useWallet();
  const { walletInfo, connected } = useWalletConnection();
  const { loginWithWallet, isAuthenticated } = useAuth();
  const { showSuccess } = useToastContext();

  useEffect(() => {
    if (open && !isAuthenticated) {
      setCurrentStep(1);
      setError(null);
      setIsProcessing(false);
    }
  }, [open]);

  const handleAuthenticate = async () => {
    if (!connected || !publicKey || !walletInfo) {
      setError("Wallet not connected");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const walletAddress = walletInfo.address;

      // Step 2: Generate Challenge
      setCurrentStep(2);
      const challengeResponse = await authService.generateWalletChallenge(
        walletAddress
      );
      if (!challengeResponse.success) {
        throw new Error("Failed to generate wallet challenge");
      }
      const challenge = challengeResponse.result.payload;

      // Step 3: Sign Message
      setCurrentStep(3);
      const messageToSign = `${challenge.message}\n${challenge.walletAddress}\n${challenge.nonce}\n${challenge.iat}\n${challenge.exp}\n${challenge.domain}\n${challenge.version}`;
      const messageBytes = new TextEncoder().encode(messageToSign);

      if (!signMessage) {
        throw new Error("Wallet does not support message signing");
      }

      const signature = await signMessage(messageBytes);
      const signatureHex = Array.from(signature)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Step 4: Verify and Get Tokens
      setCurrentStep(4);
      const tokenResponse = await authService.createTokenByWallet(
        signatureHex,
        challenge
      );
      if (!tokenResponse.success) {
        throw new Error("Failed to create token with wallet signature");
      }

      const { token } = tokenResponse.result;
      const verifyResult = await authService.verifyToken(token);
      if (!verifyResult.success) {
        throw new Error("Failed to verify wallet token");
      }

      const { accessToken, refreshToken, tokenId } = verifyResult.result;
      await loginWithWallet(walletAddress, accessToken, refreshToken, tokenId);

      setCurrentStep(5);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Authentication failed:", error);
      let errorMessage = "Failed to authenticate with wallet";
      if (error.message.includes("User rejected")) {
        errorMessage = "Message signing was rejected by user";
      }
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          icon: "ph:wallet-fill",
          title: "Wallet Authentication Required",
          message:
            "To access your features, we need to authenticate your wallet by signing a message.",
          buttonText: "Authenticate Wallet",
        };
      case 2:
        return {
          icon: "eos-icons:loading",
          title: "Generating Challenge",
          message: "Creating a secure challenge for your wallet to sign...",
          buttonText: "Processing...",
        };
      case 3:
        return {
          icon: "mingcute:signature-line",
          title: "Sign Message",
          message:
            "Please sign the message in your wallet popup. This proves you own the wallet.",
          buttonText: "Signature...",
        };
      case 4:
        return {
          icon: "eos-icons:loading",
          title: "Verifying Signature",
          message:
            "Verifying your signature and creating your secure session...",
          buttonText: "Verifying...",
        };
      case 5:
        return {
          icon: "mingcute:check-line",
          title: "Authentication Successful",
          message: "Your wallet has been successfully authenticated!",
          buttonText: "Success!",
        };
      default:
        return {
          icon: "ph:wallet-fill",
          title: "Wallet Authentication",
          message: "Please authenticate your wallet to continue.",
          buttonText: "Authenticate",
        };
    }
  };

  const stepConfig = getStepConfig();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="glass-effect border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden ">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-2xl"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#020e1f] via-[var(--color-accent)] to-[#020e1f]"></div>

        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center">
            <div
              className={`w-20 h-20 bg-[#020e1f] rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm ${
                currentStep === 2 || currentStep === 4 ? " " : " "
              }`}
            >
              <Icon icon={stepConfig.icon} className="w-10 h-10 text-accent" />
            </div>
          </div>

          <div className="space-y-3 animate-fadeInUp">
            <h3 className="maladroit-font text-2xl text-white">
              {stepConfig.title}
            </h3>
            <p className="winky-sans-font text-white/70 text-sm leading-relaxed">
              {stepConfig.message}
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm animate-fadeInUp">
              <div className="flex items-center gap-2">
                <Icon
                  icon="ph:warning-circle"
                  className="w-5 h-5 text-red-400"
                />
                <p className="winky-sans-font text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {walletInfo && (
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm animate-fadeInUp">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="ph:wallet-fill" className="w-4 h-4 text-accent" />
                <p className="winky-sans-font text-white/50 text-xs uppercase tracking-wider">
                  Wallet Address
                </p>
              </div>
              <p className="font-mono text-white text-sm bg-white/5 px-3 py-2 rounded border border-white/10">
                {walletInfo.formattedAddress}
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border border-white/20 rounded-lg disabled:opacity-50 winky-sans-font text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-sm    "
            >
              Cancel
            </button>
            <button
              onClick={handleAuthenticate}
              disabled={isProcessing || currentStep > 1}
              className="flex-1 px-6 py-3 bg-accent text-white rounded-lg disabled:opacity-50 winky-sans-font font-medium cursor-pointer hover:from-accent/90 hover:to-[#020e1f]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/25    "
            >
              {stepConfig.buttonText}
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 pt-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-accent shadow-lg shadow-accent/50"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;
