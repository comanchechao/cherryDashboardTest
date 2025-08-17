import React from "react";
import { Icon } from "@iconify/react";

interface WhyHoldSectionProps {
  // Add any props if needed
}

const WhyHoldSection: React.FC<WhyHoldSectionProps> = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(67,103,201,0.09)_0%,transparent_65%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(67,103,201,0.05)_0%,transparent_65%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.05) 1px, transparent 1px)`,
              backgroundSize: "85px 85px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-60 h-60 border border-[#4367c9]/10 rounded-full animate-spin-slow"
            style={{ animationDuration: "48s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border border-[#4367c9]/7 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "45s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-40 right-10 w-8 h-8 bg-[var(--color-accent)]/8 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-[var(--color-accent)]/6 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

              <h3 className="maladroit-font text-xl md:text-3xl text-[var(--color-text-primary)] mb-6 text-center relative z-10">
                Why Hold $AIBOT?
              </h3>

              <div className="space-y-6 relative z-10">
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-6 border-2 border-[var(--color-accent)]/30">
                  <p className="winky-sans-font text-sm md:text-lg text-white text-center">
                    Because it earns while you play, trade, and grow.
                  </p>
                </div>
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-6 border-2 border-[var(--color-accent)]/30">
                  <p className="winky-sans-font text-sm md:text-lg text-white text-center">
                    Because it's the gateway to exclusive tools.
                  </p>
                </div>
                <div className="bg-[var(--color-accent)]/20 rounded-xl p-6 border-2 border-[var(--color-accent)]/30">
                  <p className="winky-sans-font text-sm md:text-lg text-white text-center">
                    And because... let's be honest — it's built different.
                  </p>
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
            </div>
          </div>

          {/* Right Video */}
          <div className="lg:w-fit">
            <div className="relative w-full mx-auto bg-[var(--color-glass)] rounded-[4px] border border-[var(--color-glass-border)] overflow-hidden shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300">
              <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-b-lg relative overflow-hidden">
                <video
                  src="https://storage.cherrybot.ai/diamond.mp4"
                  className="w-full h-auto max-h-[60vh] object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyHoldSection;
