"use client";

import { createAppKit } from "@reown/appkit/react";
import { useEffect, useRef, useState } from "react";
import { appKitConfig } from "../config/reownAppKit";

interface AppKitProviderProps {
  children: React.ReactNode;
}

let appKitInitialized = false;
let appKitInstance: any = null;

export function AppKitProvider({ children }: AppKitProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!appKitInitialized && !initializedRef.current) {
      try {
        console.log("Initializing AppKit with config:", appKitConfig);

        appKitInstance = createAppKit(appKitConfig);
        console.log("Reown AppKit initialized successfully:", appKitInstance);
        (window as any).appKit = appKitInstance;

        (window as any).reownAppKit = {
          instance: appKitInstance,
          disconnect: async () => {
            try {
              if (
                appKitInstance &&
                typeof appKitInstance.disconnect === "function"
              ) {
                await appKitInstance.disconnect();
              }

              if (
                appKitInstance &&
                typeof appKitInstance.close === "function"
              ) {
                await appKitInstance.close();
              }

              console.log("AppKit disconnect completed");
            } catch (error) {
              console.error("AppKit disconnect error:", error);
            }
          },
        };

        appKitInitialized = true;
        initializedRef.current = true;
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Reown AppKit:", error);
        console.error("Config that failed:", appKitConfig);
      }
    } else if (appKitInitialized) {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "16px",
        }}
      >
        Initializing wallet connection...
      </div>
    );
  }

  return <>{children}</>;
}
