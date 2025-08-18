import React from "react";
import { Icon } from "@iconify/react";

const StatsSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="maladroit-font text-2xl md:text-2xl text-center text-[var(--color-text-primary)] mb-8">
          Growth Stats
        </h3>
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-6 md:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  value: "1.2M+",
                  label: "Subscribers",
                  sub: "watching what trends",
                  icon: "mdi:account-group",
                },
                {
                  value: "825K+",
                  label: "Projects",
                  sub: "tracked in real time",
                  icon: "mdi:cube-outline",
                },
                {
                  value: "$150M+",
                  label: "Volume",
                  sub: "simulated across the ecosystem",
                  icon: "mdi:currency-usd",
                },
                {
                  value: "46K+",
                  label: "Holders",
                  sub: "added via Cherry Volume Bot",
                  icon: "mdi:account-multiple-check",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-sm p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center flex-shrink-0">
                    <Icon
                      icon={s.icon}
                      className="text-[var(--color-accent)]"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="maladroit-font text-4xl text-[var(--color-text-primary)] leading-tight truncate">
                      {s.value}
                    </div>
                    <div className="winky-sans-font text-sm text-[var(--color-text-secondary)] leading-tight">
                      {s.label}
                    </div>
                    <div className="winky-sans-font text-[11px] text-[var(--color-text-secondary)]/80 mt-1 leading-tight truncate">
                      {s.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button className="bg-[var(--color-glass)] cursor-pointer text-[var(--color-text-primary)] px-6 py-3 rounded-sm border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 winky-sans-font">
                View Trending
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
