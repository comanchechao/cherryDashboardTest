import React, { useState } from "react";
import { Icon } from "@iconify/react";

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"manual" | "autobot">("autobot");

  const handleSnipeNow = () => {
    window.open("https://t.me/cherrySniperBot", "_blank");
  };

  return (
    <div className="section_sniper_spotlight pt-24 relative overflow-hidden">
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
              <h2 className="text-2xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-4 text-center">
                Using Real Trading Data To Build Digital Robots
              </h2>
              <p className="winky-sans-font text-base md:text-lg text-[var(--color-text-secondary)]/90 mb-8 text-center max-w-3xl mx-auto">
                People using the manual mode of the trading bot contribute data.
                This data is used to create data models to build digital trading
                robots.
              </p>
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
                  {/* Tab Buttons */}
                  <div className="flex gap-2 mb-8">
                    <button
                      onClick={() => setActiveTab("autobot")}
                      className={`flex-1 py-3 px-6 rounded-sm border winky-sans-font transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                        activeTab === "autobot"
                          ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]  "
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
                      className={`flex-1 py-3 px-6 rounded-sm border winky-sans-font transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                        activeTab === "manual"
                          ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]  "
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
                  <div className="min-h-[100px]">
                    {activeTab === "manual" && (
                      <div className="animate-fadeIn">
                        <div className="bg-[var(--color-glass)] rounded-sm border border-[var(--color-accent)] p-6 transition-all duration-200 relative overflow-hidden">
                          <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-2">
                            Manual Mode
                          </h4>
                          <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-90">
                            Manual mode is a traditional trading bot and it has
                            15k+ users that are contributing data. This trading
                            bot offers high speed trading and extremely low
                            fees.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "autobot" && (
                      <div className="animate-fadeIn">
                        <div className="bg-[var(--color-glass)] rounded-sm border border-[var(--color-accent)] p-6 transition-all duration-200 relative overflow-hidden">
                          <h4 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-2">
                            Autobot Mode
                          </h4>
                          <p className="winky-sans-font text-[var(--color-text-secondary)] text-opacity-90">
                            An AI powered digital robot that allows you to set
                            trading parameters. This robot is specifically
                            designed for traders and focuses on spot/leverage
                            trading and yield farming.
                          </p>
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
      </div>
    </div>
  );
};

export default TabsSection;
