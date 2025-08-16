import React from "react";
import { Icon } from "@iconify/react";

export interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  tokenSymbol: string;
  balance?: string;
  onMax?: () => void;
  tokenIcon?: React.ReactNode;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChange,
  tokenSymbol,
  balance,
  onMax,
  tokenIcon,
}) => {
  return (
    <div className="rounded-3xl bg-cherry-cream shadow-[8px_8px_0px_#321017] p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="text-xs text-cherry-burgundy  winky-sans-font mb-1">
            Amount
          </div>
          <input
            value={amount}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9.]/g, "");
              onChange(v);
            }}
            inputMode="decimal"
            placeholder="0"
            className="w-full bg-transparent outline-none text-cherry-burgundy text-3xl md:text-5xl leading-tight placeholder:text-cherry-burgundy winky-sans-font"
          />
          {balance && (
            <div className="mt-2 text-xs text-cherry-burgundy  winky-sans-font">
              <span>{balance} available</span>
              {onMax && (
                <button
                  type="button"
                  className="ml-2 px-2 py-0.5 text-xs rounded-md bg-cherry-cream/10 border border-cherry-cream/20 text-cherry-burgundy hover:bg-cherry-cream/15"
                  onClick={onMax}
                >
                  Max
                </button>
              )}
            </div>
          )}
        </div>

        <div className="shrink-0">
          <div className="text-xs text-cherry-burgundy  winky-sans-font mb-1">
            Asset
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-cherry-burgundy/60 border-2 border-cherry-burgundy px-3 py-2">
            {tokenIcon ?? (
              <Icon
                icon="ph:coin"
                className="text-cherry-burgundy "
                width={18}
              />
            )}
            <span className="text-cherry-burgundy font-semibold">
              {tokenSymbol}
            </span>
            <Icon
              icon="ph:caret-down-bold"
              width={14}
              className="text-cherry-burgundy "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountInput;
