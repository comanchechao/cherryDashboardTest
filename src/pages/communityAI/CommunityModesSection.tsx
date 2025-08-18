import React, { useState } from "react";
import { Icon } from "@iconify/react";

const CommunityModesSection: React.FC = () => {
  const [activeCommunityTab, setActiveCommunityTab] = useState<
    "V1" | "V2" | "V3"
  >("V1");

  return (
    <div className="section_sniper_spotlight py-16 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
        <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="winky-sans-font text-xl text-[var(--color-text-secondary)]/90">
            CherryAI Bot will be creating AI powered digital robots to help
            manage Telegram communities. These will be launched in 3 versions -
            V1 is already deployed.
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {["V1", "V2", "V3"].map((version) => (
              <button
                key={version}
                onClick={() =>
                  setActiveCommunityTab(version as "V1" | "V2" | "V3")
                }
                className={`px-6 py-3 rounded-[4px] cursor-pointer winky-sans-font transition-all duration-300 transform hover:-translate-y-1 ${
                  activeCommunityTab === version
                    ? "bg-[var(--color-accent)] text-white border-2 border-[var(--color-accent)] shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                    : "bg-[var(--color-glass)] text-[var(--color-text-primary)] border-2 border-[var(--color-glass-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                }`}
              >
                Community AI {version}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)] max-w-4xl mx-auto">
            {/* Floating Decorative Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

            <div className="relative z-10">
              {activeCommunityTab === "V1" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                      <Icon
                        icon="mdi:robot"
                        className="text-white object-contain"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        Community AI V1
                      </h4>
                      <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-sm leading-relaxed">
                        The V1 is already launched its a community management
                        bot that uses machine learning to upgrade its database.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeCommunityTab === "V2" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                      <Icon
                        icon="mdi:chat-processing"
                        className="text-white object-contain"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        Community AI V2
                      </h4>
                      <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-sm leading-relaxed">
                        Community AI bots will be able to not only manage the
                        community but also will be able to answer specific
                        questions related to the project like a regular person.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeCommunityTab === "V3" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                      <Icon
                        icon="mdi:blockchain"
                        className="text-white object-contain"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="winky-sans-font text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        Community AI V3
                      </h4>
                      <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-sm leading-relaxed">
                        Community AI bots will be able to scrape real time data
                        from blockchains so they can answer token and smart
                        contract related questions as well.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityModesSection;
