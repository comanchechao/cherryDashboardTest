import React from "react";
import { Icon } from "@iconify/react";

const StatsSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-6 md:py-10 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[8px] p-6 md:p-8 relative overflow-hidden">
          {/* subtle grid */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,white_2px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10">
            <h3 className="maladroit-font text-xl md:text-2xl text-center text-[var(--color-text-primary)] mb-8">
              Growth, User Engagement & Adoption
            </h3>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Active Groups Protected */}
              <div className="flex items-center gap-4 md:justify-center">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
                  <Icon
                    icon="mdi:shield-check"
                    className="text-[var(--color-accent)]"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="leading-tight">
                  <div className="maladroit-font text-3xl text-[var(--color-text-primary)]">
                    141K+
                  </div>
                  <div className="winky-sans-font text-sm text-[var(--color-text-secondary)]">
                    Active Groups Protected
                  </div>
                </div>
              </div>

              {/* Raids Executed */}
              <div className="flex items-center gap-4 md:justify-center">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
                  <Icon
                    icon="mdi:sword-cross"
                    className="text-[var(--color-accent)]"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="leading-tight">
                  <div className="maladroit-font text-3xl text-[var(--color-text-primary)]">
                    1M+
                  </div>
                  <div className="winky-sans-font text-sm text-[var(--color-text-secondary)]">
                    Raids Executed
                  </div>
                </div>
              </div>

              {/* Projects Trust Us */}
              <div className="flex items-center gap-4 md:justify-center">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
                  <Icon
                    icon="mdi:badge"
                    className="text-[var(--color-accent)]"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="leading-tight">
                  <div className="maladroit-font text-3xl text-[var(--color-text-primary)]">
                    175K+
                  </div>
                  <div className="winky-sans-font text-sm text-[var(--color-text-secondary)]">
                    Projects Trust Us
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <button className="bg-[var(--color-glass)] text-[var(--color-text-primary)] px-6 py-3 rounded-xl border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 winky-sans-font flex items-center gap-2">
                <span>Explore CherryBot</span>
                <Icon icon="mdi:robot" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
