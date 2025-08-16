import React, { useState } from "react";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import FromToSelector, {
  NetworkOption,
} from "./components/bridge/FromToSelector";
import AmountInput from "./components/bridge/AmountInput";
import { Icon } from "@iconify/react";
import {
  sendFromSolanaToBsc,
  sendFromBscToSolana,
} from "../../services/bridgeService";
import { useReownWallet } from "../../hooks/useReownWallet";

const NETWORKS: NetworkOption[] = [
  {
    id: "bsc",
    name: "BSC",
    icon: <Icon icon="cryptocurrency-color:bnb" width="30" height="30" />,
  },
  {
    id: "sol",
    name: "Solana",
    icon: <Icon icon="token-branded:solana" width="33" height="33" />,
  },
];

const BridgePage: React.FC = () => {
  const [fromId, setFromId] = useState<string>("bsc");
  const [toId, setToId] = useState<string>("sol");
  const [amount, setAmount] = useState<string>("1");
  const [bridgeError, setBridgeError] = useState<string | null>(null);

  const { bscAddress, solanaAddress, connect, isConnected, solanaWallet } =
    useReownWallet();

  // Debug logging for wallet state
  console.log("Bridge wallet state:", {
    isConnected,
    bscAddress,
    solanaAddress,
    solanaWallet: solanaWallet?.formattedAddress,
  });

  const handleBridge = async () => {
    try {
      setBridgeError(null);

      if (!isConnected) {
        await connect();
        return;
      }

      const programId = "9wRgub9f2P6zkAF9LR1hepuwGpo9gbdeTPU2dUQ7T1Le";

      const recipient = toId === "bsc" ? bscAddress : solanaAddress;

      if (!recipient) {
        setBridgeError(
          "Recipient address not found. Please ensure your wallet is connected."
        );
        return;
      }

      if (fromId === "sol" && toId === "bsc") {
        await sendFromSolanaToBsc({
          wallet: solanaWallet,
          oftProgramId: programId,
          recipientAddress: recipient,
          amount: Number(amount || 0),
        });
      } else if (fromId === "bsc" && toId === "sol") {
        await sendFromBscToSolana({
          wallet: solanaWallet,
          oftProgramId: programId,
          recipientAddress: recipient,
          amount: Number(amount || 0),
        });
      }
    } catch (e) {
      console.error(e);
      setBridgeError((e as Error)?.message || "Bridge operation failed");
    }
  };

  const content = (
    <div className="min-h-screen text-cherry-cream bg-cherry-cream">
      <div className="hider top"></div>
      <div className="hider"></div>
      <div id="triggerXoverFlow1" className="wrapper_main h-full">
        <div className="overlay_color">
          <div className="overlay_stroke"></div>
        </div>
      </div>
      <div
        id="triggerXoverFlow"
        className="wrapper_sections wrapper-container bg-cherry-cream"
      >
        <Navbar />

        <div className="mx-auto max-w-4xl px-4 pt-14 pb-24">
          <div className="text-center mb-6">
            <h1 className="maladroit-font text-3xl md:text-5xl tracking-wide">
              Bridge Assets
            </h1>
            <p className="winky-sans-font text-cherry-cream/80 mt-2">
              Move your assets securely between chains with a clean, simple flow
            </p>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-cherry-red via-[#7e1331] to-cherry-burgundy border-4 border-cherry-burgundy shadow-[12px_12px_0px_#321017] p-4 space-y-4">
            <div className="rounded-2xl bg-[var(--color-cherry-burgundy)]40 border-2 border-cherry-burgundy p-3">
              <FromToSelector
                networks={NETWORKS}
                fromNetworkId={fromId}
                toNetworkId={toId}
                onChange={({ fromNetworkId, toNetworkId }) => {
                  setFromId(fromNetworkId);
                  setToId(toNetworkId);
                }}
              />
            </div>

            <div className="rounded-2xl bg-[var(--color-cherry-burgundy)]40 border-2 border-cherry-burgundy p-3">
              <AmountInput
                amount={amount}
                onChange={setAmount}
                tokenSymbol="$AIBOT"
                tokenIcon={
                  <img
                    src="/cherryLogo.png"
                    width={20}
                    height={20}
                    alt="$AIBOT"
                  />
                }
                balance={"0 AIBOT"}
              />
            </div>
          </div>

          {bridgeError && (
            <div className="mt-4 p-3 bg-red-600/80 border border-red-400 rounded-lg text-white text-sm">
              {bridgeError}
            </div>
          )}

          <div className="mt-8">
            <button
              type="button"
              onClick={handleBridge}
              className={`w-full h-12 rounded-2xl border-4 text-cherry-cream winky-sans-font font-bold tracking-wide shadow-[8px_8px_0px_#321017] transition-all duration-200 ${
                isConnected
                  ? "bg-gradient-to-br from-cherry-red cursor-pointer via-[#7e1331] to-cherry-burgundy border-cherry-burgundy hover:-translate-y-0.5 hover:shadow-[10px_10px_0px_#321017] active:translate-y-0 active:shadow-[6px_6px_0px_#321017]"
                  : "bg-gradient-to-br from-cherry-red cursor-pointer via-[#7e1331] to-cherry-burgundy border-cherry-burgundy hover:-translate-y-0.5 hover:shadow-[10px_10px_0px_#321017] active:translate-y-0 active:shadow-[6px_6px_0px_#321017]"
              }`}
            >
              {isConnected ? "Bridge" : "Connect Wallet"}
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );

  return content;
};

export default BridgePage;
