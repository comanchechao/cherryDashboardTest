import React from "react";
import { Icon } from "@iconify/react";

interface StatCardsProps {
  userPoints?: number;
}

const StatCards: React.FC<StatCardsProps> = ({ userPoints = 0 }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Points Section */}
      <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-6 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

        <div className="relative z-10">
          <div className="bg-[var(--color-accent)]/20 rounded-lg px-4 py-2 mb-4">
            <h3 className="winky-sans-font text-sm text-[var(--color-accent)] flex items-center gap-2">
              <Icon
                icon="mdi:check-circle"
                width={16}
                height={16}
                className="text-[var(--color-accent)]"
              />
              Points
            </h3>
          </div>

          <div className="p-4 w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-28">
              <Icon
                icon="mdi:account-group"
                width={77}
                height={77}
                className="text-[var(--color-accent)] mb-2"
              />
              <span className="winky-sans-font text-4xl font-bold text-[var(--color-text-primary)]">
                {userPoints.toLocaleString()} Points
              </span>
            </div>
          </div>
        </div>

        {/* Quests Section */}
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-6 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

          <div className="relative z-10">
            <div className="bg-[var(--color-accent)]/20 rounded-lg px-4 py-2 mb-4 flex items-center justify-between">
              <h3 className="winky-sans-font text-sm text-[var(--color-accent)] flex items-center gap-2">
                <Icon
                  icon="mdi:sword"
                  width={16}
                  height={16}
                  className="text-[var(--color-accent)]"
                />
                Quests
              </h3>
              <div className="bg-[var(--color-accent)]/30 rounded-full px-2 py-1">
                <span className="winky-sans-font text-xs text-[var(--color-accent)]">
                  Points Breakdown
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* New Quests */}
              <div className="bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:chart-line"
                      width={12}
                      height={12}
                      className="text-[var(--color-accent)]"
                    />
                    <span className="winky-sans-font text-xs font-bold text-[var(--color-text-primary)]">
                      TRADE $10 in volume
                    </span>
                  </div>
                  <span className="winky-sans-font text-xs text-[var(--color-accent)]">
                    +1 point
                  </span>
                </div>
              </div>
              <div className="bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:chart-line"
                      width={12}
                      height={12}
                      className="text-[var(--color-accent)]"
                    />
                    <span className="winky-sans-font text-xs font-bold text-[var(--color-text-primary)]">
                      Trade $1,000 more in Volume
                    </span>
                  </div>
                  <span className="winky-sans-font text-xs text-[var(--color-accent)]">
                    +50 Points
                  </span>
                </div>
              </div>
              <div className="bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:chart-line"
                      width={12}
                      height={12}
                      className="text-[var(--color-accent)]"
                    />
                    <span className="winky-sans-font text-xs font-bold text-[var(--color-text-primary)]">
                      Trade $5,000 more in Volume
                    </span>
                  </div>
                  <span className="winky-sans-font text-xs text-[var(--color-accent)]">
                    200 Points
                  </span>
                </div>
              </div>
              <div className="bg-[var(--color-glass)] rounded-lg p-3 border border-[var(--color-glass-border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:account-group"
                      width={12}
                      height={12}
                      className="text-[var(--color-accent)]"
                    />
                    <span className="winky-sans-font text-xs font-bold text-[var(--color-text-primary)]">
                      Refer and earn 50 point on every $100 trade
                    </span>
                  </div>
                  <span className="winky-sans-font text-xs text-[var(--color-accent)]">
                    +50 Points
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
