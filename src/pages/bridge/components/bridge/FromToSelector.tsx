import React, { useMemo } from "react";
import { Icon } from "@iconify/react";

export type NetworkOption = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  badgeText?: string;
};

export interface FromToSelectorProps {
  networks: NetworkOption[];
  fromNetworkId: string;
  toNetworkId: string;
  onChange: (params: { fromNetworkId: string; toNetworkId: string }) => void;
}

const SelectorButton: React.FC<{
  label: string;
  network?: NetworkOption;
}> = ({ label, network }) => {
  return (
    <div
      className={
        "flex items-center justify-between w-full rounded-2xl bg-cherry-cream border-2 border-cherry-burgundy shadow-[6px_6px_0px_#321017] px-4 py-3"
      }
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--color-cherry-burgundy)]/20  ">
          {network?.icon ?? (
            <Icon
              icon="ph:planet"
              className="text-cherry-burgundy/80"
              width={20}
            />
          )}
        </div>
        <div className="text-left">
          <div className="text-xs text-cherry-burgundy  winky-sans-font">
            {label}
          </div>
          <div className="text-cherry-burgundy font-semibold tracking-wide">
            {network?.name ?? "Select network"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dropdown removed: only two networks; swap button is sufficient

const FromToSelector: React.FC<FromToSelectorProps> = ({
  networks,
  fromNetworkId,
  toNetworkId,
  onChange,
}) => {
  // Dropdowns removed; no local open state needed

  const from = useMemo(
    () => networks.find((n) => n.id === fromNetworkId),
    [networks, fromNetworkId]
  );
  const to = useMemo(
    () => networks.find((n) => n.id === toNetworkId),
    [networks, toNetworkId]
  );

  const swap = () =>
    onChange({ fromNetworkId: toNetworkId, toNetworkId: fromNetworkId });

  return (
    <div className="relative">
      <div className="rounded-3xl  p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
          <div className="relative">
            <SelectorButton label="From" network={from} />
          </div>

          <div className="relative">
            <SelectorButton label="To" network={to} />
          </div>

          <button
            type="button"
            onClick={swap}
            className="group md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 relative mx-auto -mt-1 md:mt-0 h-10 w-10 rounded-full bg-[#2a1116] border border-cherry-cream/20 flex items-center justify-center hover:bg-cherry-cream/10 transition duration-200 ease-out hover:scale-105 active:scale-95"
            aria-label="Swap networks"
            title="Swap"
          >
            <Icon
              icon="ph:arrows-left-right"
              className="text-cherry-cream  transition-transform duration-200 group-hover:rotate-90"
              width={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FromToSelector;
