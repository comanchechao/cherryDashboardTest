import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { bsc, bscTestnet, solana, solanaTestnet } from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const projectId = "7979f202993857b9f290d2512c6994dd";

if (!projectId) {
  throw new Error(
    "Invalid projectId. Please set a valid Reown Cloud project ID."
  );
}

const metadata = {
  name: "Cherry Bridge",
  description: "Bridge tokens between Solana and BSC",
  url:
    typeof window !== "undefined" ? window.location.origin : "http://localhost",
  icons: ["/cherryLogo.png"],
};

// Networks
const evmNetworks = [bsc, bscTestnet];
const solNetworks = [solana, solanaTestnet];
const allNetworks: any = [...evmNetworks, ...solNetworks] as any;

// Debug logging for networks
console.log("Configured networks:", {
  evmNetworks: evmNetworks.map((n) => ({ id: n.id, name: n.name })),
  solNetworks: solNetworks.map((n) => ({
    id: n.id,
    name: n.name,
    rpcUrls: (n as any).rpcUrls,
    chainId: (n as any).chainId,
  })),
  allNetworks: allNetworks.map((n: any) => ({
    id: n.id,
    name: n.name,
    rpcUrls: n.rpcUrls,
    chainId: n.chainId,
  })),
});

export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks: evmNetworks as any,
} as any);

export const solanaAdapter = new SolanaAdapter({
  registerWalletStandard: true,
  rpcEndpoints: {
    mainnet: "https://api.mainnet-beta.solana.com",
    testnet: "https://api.testnet.solana.com",
    devnet: "https://api.devnet.solana.com",
  },
} as any);

export const wagmiConfig = wagmiAdapter.wagmiConfig;

console.log("Wagmi adapter config:", wagmiAdapter);
console.log("Wagmi config:", wagmiConfig);

export const appKitConfig = {
  adapters: [wagmiAdapter as any, solanaAdapter as any] as any,
  networks: allNetworks,
  projectId,
  metadata,
  features: {
    analytics: true,
    emailShowWallets: true,
    email: false,
    socials: false as const,
  },
};
