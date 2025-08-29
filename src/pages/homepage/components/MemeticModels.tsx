import React, { useState } from "react";

const MemeticModels: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="section_sniper_spotlight py-20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.12)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.08)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <button
            onClick={() => setOpen((v) => !v)}
            className="px-6 py-3 rounded-[6px] border border-[var(--color-accent)]/40 bg-[var(--color-glass)] text-[var(--color-text-primary)] winky-sans-font hover:bg-[var(--color-accent)]/10 transition-colors"
          >
            Memetic Models
          </button>
        </div>

        {/* Reveal Card */}
        {open && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Image */}
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[16px] overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src="https://storage.cherrybot.ai/phoneTrending.webp"
                  alt="Robot holding a phone"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Text in centered card */}
            <div className="flex w-full justify-center">
              <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[16px] p-6 max-w-xl text-center">
                <p className="winky-sans-font text-[var(--color-text-primary)]/90 text-lg leading-relaxed mb-4">
                  Memes are like compressed signals of sentiment — they spread
                  when people resonate with an idea emotionally.
                </p>
                <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-base leading-relaxed">
                  If a robot can parse and model memes, it can: Understand
                  cultural context so its interactions don’t feel “robotic.”
                  React in real-time to viral narratives that drive politics, or
                  consumer behavior.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeticModels;
