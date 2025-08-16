import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, queryClient } from "../config/reownAppKit";
import { AppKitProvider } from "./AppKitProvider";

interface UnifiedWalletProviderProps {
  children: React.ReactNode;
}

function UnifiedWalletProvider({ children }: UnifiedWalletProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider>{children}</AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default UnifiedWalletProvider;
