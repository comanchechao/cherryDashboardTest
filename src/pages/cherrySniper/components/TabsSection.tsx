import React, { useState } from "react";
import { Icon } from "@iconify/react";

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"manual" | "autobot">("autobot");

  const handleSnipeNow = () => {
    window.open("https://t.me/cherrySniperBot", "_blank");
  };

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Video Showcase Section */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            {/* Video Container */}
            <div className="w-full">
              <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] md:p-8 p-4 relative overflow-hidden transform transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                {/* Paper texture overlay */}

                {/* Decorative SVG Elements */}
                <svg
                  className="absolute -top-8 -right-8 w-32 h-32 opacity-10 pointer-events-none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="var(--color-accent)"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="var(--color-accent)"
                    opacity="0.2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="10"
                    fill="var(--color-accent)"
                    opacity="0.4"
                  />
                </svg>

                <svg
                  className="absolute -bottom-6 -left-6 w-24 h-24 opacity-10 pointer-events-none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="50,15 60,35 85,35 67,50 75,75 50,60 25,75 33,50 15,35 40,35"
                    fill="var(--color-accent)"
                    opacity="0.3"
                  />
                </svg>

                <div className="relative z-10">
                  <h3 className="text-lg md:text-3xl maladroit-font text-[var(--color-text-primary)] mb-8 text-center">
                    SniperAI Bot Offers Manual & Autobot Modes
                  </h3>

                  {/* Tab Buttons */}
                  <div className="flex gap-2 mb-8">
                    <button
                      onClick={() => setActiveTab("autobot")}
                      className={`flex-1 py-3 px-6 rounded-xl border-4 winky-sans-font transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                        activeTab === "autobot"
                          ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[4px_4px_0px_#321017]"
                          : "bg-[var(--color-glass)] text-[var(--color-text-primary)] border-[var(--color-accent)] hover:bg-[var(--color-glass)]"
                      }`}
                    >
                      <Icon
                        icon="ph:shield-check-bold"
                        width={20}
                        height={20}
                        className={
                          activeTab === "autobot"
                            ? "text-white"
                            : "text-[var(--color-accent)]"
                        }
                      />
                      <span
                        className={
                          activeTab === "autobot"
                            ? "text-white"
                            : "text-[var(--color-text-primary)]"
                        }
                      >
                        Autobot Mode
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("manual")}
                      className={`flex-1 py-3 px-6 rounded-xl border-4 winky-sans-font transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                        activeTab === "manual"
                          ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[4px_4px_0px_#321017]"
                          : "bg-[var(--color-glass)] text-[var(--color-text-primary)] border-[var(--color-accent)] hover:bg-[var(--color-glass)]"
                      }`}
                    >
                      <Icon
                        icon="ph:lightning-bold"
                        width={20}
                        height={20}
                        className={
                          activeTab === "manual"
                            ? "text-white"
                            : "text-[var(--color-accent)]"
                        }
                      />
                      <span
                        className={
                          activeTab === "manual"
                            ? "text-white"
                            : "text-[var(--color-text-primary)]"
                        }
                      >
                        Manual Mode
                      </span>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[200px]">
                    {activeTab === "autobot" && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Stealth Mode Cards */}
                        <div className="grid grid-cols-1 gap-6">
                          {/* Trade in Privacy Card */}
                          <div className="group">
                            <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)] p-6  ] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                              <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                                Automate Buys/Sells
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-70">
                                Set custom parameters with the AI for buys and
                                sells and it will automatically follow them.
                              </p>
                            </div>
                          </div>

                          {/* Non-custodial Wallet Card */}
                          <div className="group">
                            <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)] p-6  ] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                              <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                                Automate Yield Farming
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-70">
                                Instruct the AI to take all profits from trading
                                activity and stake, LP mine or lend them out.
                              </p>
                            </div>
                          </div>

                          {/* Key Security Card */}
                          <div className="group md:col-span-2">
                            <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)] p-6  ] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
                              <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                                Automatic Arbitrage
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-70">
                                Give the AI a list of tokens to arbitrage and
                                the AI will automatically look for arb
                                opportunities across DEXes.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "manual" && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Sniper Mode Cards */}
                        <div className="grid grid-cols-1  gap-6">
                          {/* Extremely Fast Trade Execution Card */}
                          <div className="group">
                            <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)] p-6  ] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                              <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                                Fastest trading bot
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-70">
                                Lightning-fast trade execution with minimal
                                latency and slippage. Strike first, profit
                                faster.
                              </p>
                            </div>
                          </div>

                          {/* Advanced Trading Features Card */}
                          <div className="group">
                            <div className="bg-[var(--color-glass)]   rounded-xl border-4 border-[var(--color-accent)] p-6  ] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                              <div>
                                <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                                  Advanced trading features
                                </h4>
                                <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-70">
                                  Pro-level tools and settings for sophisticated
                                  traders. Maximum precision and control.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Scales with Volume Card */}
                          <div className="group md:col-span-2 ">
                            <div className="bg-[var(--color-glass)]  rounded-xl border-4 border-[var(--color-accent)] p-6  ] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
                              <h4 className="maladroit-font text-xl text-[var(--color-text-primary)]">
                                Scales with volume
                              </h4>
                              <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-70">
                                Automatically adjusts performance and capacity
                                based on trading volume. Maximum efficiency at
                                any scale.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-7">
                    <div className="inline-block">
                      <button
                        onClick={handleSnipeNow}
                        className="  btn-wave-primary  cursor-pointer"
                      >
                        <span className="wave-bg"></span>
                        <span className="wave-left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-auto h-full opacity-100 object-stretch"
                            viewBox="0 0 487 487"
                          >
                            <path
                              fillOpacity=".1"
                              fillRule="nonzero"
                              fill="#FFF"
                              d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                            ></path>
                          </svg>
                        </span>
                        <span className="wave-right">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="object-cover w-full h-full"
                            viewBox="0 0 487 487"
                          >
                            <path
                              fillOpacity=".1"
                              fillRule="nonzero"
                              fill="#FFF"
                              d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                            ></path>
                          </svg>
                        </span>
                        <span className="wave-overlay"></span>
                        <span className="text-white text-lg">Learn More</span>
                        <div className="rounded-full transition-all duration-200"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-[var(--color-glass)] px-6 py-2 rounded-full border-2 border-[var(--color-accent)] winky-sans-font text-[var(--color-text-primary)] font-medium">
            Instant Execution
          </div>
          <div className="bg-[var(--color-glass)] px-6 py-2 rounded-full border-2 border-[var(--color-accent)] winky-sans-font text-[var(--color-text-primary)] font-medium">
            Trade-to-Earn
          </div>
          <div className="bg-[var(--color-glass)] px-6 py-2 rounded-full border-2 border-[var(--color-accent)] winky-sans-font text-[var(--color-text-primary)] font-medium">
            Boosted Pool Rewards
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
