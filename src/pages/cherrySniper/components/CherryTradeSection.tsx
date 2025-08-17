import React, { useState } from "react";
import { Icon } from "@iconify/react";
import VideoPlayer from "../../../components/VideoPlayer";

const CherryTradeSection: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubscribe = async (emailValue: string) => {
    if (!emailValue.trim()) {
      console.log("Email is required");
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch(
        "https://cherrytest-production.up.railway.app/email/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
          }),
        }
      );

      const data = await response.json();
      console.log("Newsletter subscription response:", data);

      if (response.ok) {
        console.log("Successfully subscribed to newsletter");
        setEmail("");
      } else {
        console.log("Failed to subscribe:", data);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-10 md:pb-20">
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated SVG Background */}
            <svg
              className="absolute top-0 left-0 w-full h-full z-0"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
            >
              {/* Animated wave paths */}
              <path
                d="M0,400 Q300,350 600,450 T1200,400"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeOpacity="0.15"
                strokeDasharray="20,20"
                style={{ animation: "dash-animate 40s linear infinite" }}
              />
              <path
                d="M0,300 Q300,450 600,350 T1200,300"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeOpacity="0.12"
                strokeDasharray="15,25"
                style={{
                  animation: "dash-animate 30s linear infinite reverse",
                }}
              />
              <path
                d="M0,500 Q400,300 800,500 T1200,500"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeOpacity="0.08"
                strokeDasharray="10,15"
                style={{ animation: "dash-animate 50s linear infinite" }}
              />
            </svg>

            {/* Decorative shapes */}
            <div
              className="absolute top-20 left-20"
              style={{ animation: "spin-orbital 15s linear infinite" }}
            >
              <div className="w-16 h-16 bg-[var(--color-accent)] opacity-10 rounded-full"></div>
            </div>
            <div
              className="absolute bottom-40 right-20"
              style={{
                animation: "spin-orbital 20s linear infinite reverse",
              }}
            >
              <div className="w-24 h-24 bg-[var(--color-accent)] opacity-10 rounded-full"></div>
            </div>
            <div
              className="absolute top-1/2 left-1/4"
              style={{ animation: "pulse-gentle 8s ease-in-out infinite" }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                opacity="0.08"
              >
                <circle cx="50" cy="50" r="40" fill="var(--color-accent)" />
                <path
                  d="M50,10 C22.4,10 0,32.4 0,60 C0,74.6 6.4,87.8 16.5,97.2"
                  stroke="var(--color-accent)"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
            <div
              className="absolute top-1/3 right-1/4"
              style={{ animation: "pulse-gentle 6s ease-in-out infinite 1s" }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" opacity="0.1">
                <rect
                  x="10"
                  y="10"
                  width="60"
                  height="60"
                  rx="15"
                  fill="var(--color-accent)"
                />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="z-10 flex flex-col   w-full relative   ">
            {/* Title Card */}
            <div className="w-full flex lg:flex-row flex-col ">
              <div className="flex flex-col justify-center items-start   p-8 md:p-10 relative  ">
                <h2 className="maladroit-font text-xl md:text-4xl   text-[var(--color-text-primary)] leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center mb-1 text-left">
                  Cherry Web Trading Platform{" "}
                  <span className="maladroit-font text-lg md:text-sm text-[var(--color-accent)] mb-6 inline-block relative">
                    Coming Soon
                  </span>
                </h2>

                <p className="winky-sans-font text-xl text-[var(--color-text-secondary)] my-1 max-w-3xl text-left">
                  Experience lightning-fast trades, real-time analytics, and
                  exclusive rewards – all in one place
                </p>
                <div className="flex flex-wrap justify-start gap-4 mt-2">
                  <button
                    onClick={() => {
                      const element = document.getElementById(
                        "newsletter-signup-trade"
                      );
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className="btn-wave-primary cursor-pointer"
                  >
                    <span className="wave-bg"></span>
                    <span className="wave-left"></span>

                    <span className="text-white">Join Early Access</span>
                    <Icon
                      className="text-white"
                      icon="mdi:arrow-right"
                      width={20}
                      height={20}
                    />
                  </button>
                  <button
                    onClick={() =>
                      window.open("https://t.me/CherrySniperBot", "_blank")
                    }
                    className="btn-wave-primary cursor-pointer"
                  >
                    <span className="text-[var(--color-text-primary)]">
                      Try SniperAI Bot
                    </span>
                    <Icon
                      className="text-[var(--color-text-primary)]"
                      icon="ic:baseline-telegram"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="w-full px-10 lg:px-44 my-3">
                <div className="relative rounded-2xl border-4 border-[var(--color-accent)] overflow-hidden shadow-[12px_12px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/30 to-transparent z-10 pointer-events-none"></div>

                  <VideoPlayer
                    src="https://storage.cherrybot.ai/cherryTrade.mp4"
                    className="w-full h-auto max-h-[60vh] object-cover"
                    autoPlay={true}
                  />

                  {/* Info Bar */}
                  <div className="absolute bottom-0 z-30 left-0 right-0 p-3 bg-[var(--color-glass)]/90 backdrop-blur-sm border-t-2 border-[var(--color-accent)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <button
                      className="bg-[var(--color-accent)] text-white py-1 px-3 rounded-xl border border-b-4 border-r-4 border-[var(--color-accent)] hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2 whitespace-nowrap"
                      onClick={() =>
                        window.open(
                          "https://docs.cherrybot.co/cherry-trade",
                          "_blank"
                        )
                      }
                    >
                      <span className="text-white">Learn More</span>
                      <Icon
                        className="text-white"
                        icon="mdi:book-open-variant"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4 max-w-4xl mx-auto">
              {/* Instant Swap Card */}
              <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)]   p-6 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-accent)] rounded-full mb-4">
                  <Icon
                    icon="mdi:flash-outline"
                    className="text-white"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="winky-sans-font text-xl text-[var(--color-text-primary)] mb-3">
                  Instant Swap Execution
                </h3>
                <p className="winky-sans-font text-[var(--color-text-secondary)]/80">
                  Execute trades with unparalleled speed and precision.
                </p>
              </div>

              {/* Real-Time Analytics Card */}
              <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)]  p-6 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-accent)] rounded-full mb-4">
                  <Icon
                    icon="mdi:chart-areaspline"
                    className="text-white"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="winky-sans-font text-xl text-[var(--color-text-primary)] mb-3">
                  Real-Time Analytics
                </h3>
                <p className="winky-sans-font text-[var(--color-text-secondary)]/80">
                  Monitor market trends and your portfolio in real-time.
                </p>
              </div>

              {/* Reward System Card */}
              <div className="bg-[var(--color-glass)] rounded-xl border-4 border-[var(--color-accent)]   p-6 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-accent)] rounded-full mb-4">
                  <Icon
                    icon="mdi:gift-outline"
                    className="text-white"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="winky-sans-font text-xl text-[var(--color-text-primary)] mb-3">
                  Reward System
                </h3>
                <p className="winky-sans-font text-[var(--color-text-secondary)]/80">
                  Earn points and unlock exclusive rewards as you trade.
                </p>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <div className="feature-tag px-6 py-3 bg-[var(--color-glass)] rounded-full border-2 border-[var(--color-accent)] shadow-[4px_4px_0px_#321017] flex items-center gap-2 transition-all duration-200">
                <Icon
                  icon="mdi:robot"
                  className="text-[var(--color-accent)]"
                  width={24}
                  height={24}
                />
                <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
                  AI Trading Bots
                </span>
              </div>
              <div className="feature-tag px-6 py-3 bg-[var(--color-glass)] rounded-full border-2 border-[var(--color-accent)] shadow-[4px_4px_0px_#321017] flex items-center gap-2 transition-all duration-200">
                <Icon
                  icon="mdi:chart-line"
                  className="text-[var(--color-accent)]"
                  width={24}
                  height={24}
                />
                <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
                  Advanced Analytics
                </span>
              </div>
              <div className="feature-tag px-6 py-3 bg-[var(--color-glass)] rounded-full border-2 border-[var(--color-accent)] shadow-[4px_4px_0px_#321017] flex items-center gap-2 transition-all duration-200">
                <Icon
                  icon="mdi:security"
                  className="text-[var(--color-accent)]"
                  width={24}
                  height={24}
                />
                <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
                  Secure Trading
                </span>
              </div>
              <div className="feature-tag px-6 py-3 bg-[var(--color-glass)] rounded-full border-2 border-[var(--color-accent)] shadow-[4px_4px_0px_#321017] flex items-center gap-2 transition-all duration-200">
                <Icon
                  icon="mdi:swap-horizontal"
                  className="text-[var(--color-accent)]"
                  width={24}
                  height={24}
                />
                <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
                  Multi-chain Support
                </span>
              </div>
              <div className="feature-tag px-6 py-3 bg-[var(--color-glass)] rounded-full border-2 border-[var(--color-accent)] shadow-[4px_4px_0px_#321017] flex items-center gap-2 transition-all duration-200">
                <Icon
                  icon="mdi:flash"
                  className="text-[var(--color-accent)]"
                  width={24}
                  height={24}
                />
                <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
                  Real-time Alerts
                </span>
              </div>
              <div className="feature-tag px-6 py-3 bg-[var(--color-glass)] rounded-full border-2 border-[var(--color-accent)] shadow-[4px_4px_0px_#321017] flex items-center gap-2 transition-all duration-200">
                <Icon
                  icon="mdi:wallet"
                  className="text-[var(--color-accent)]"
                  width={24}
                  height={24}
                />
                <span className="winky-sans-font font-medium text-[var(--color-text-primary)]">
                  DeFi Integration
                </span>
              </div>
            </div>

            <div className="w-full flex mt-20 items-center justify-center">
              <button
                onClick={() => {
                  document
                    .getElementById("newsletter-signup-trade")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[var(--color-accent)] text-white py-3 px-6 rounded-xl border border-b-4 border-r-4 border-[var(--color-accent)] hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center justify-center gap-2"
              >
                <span className="text-white">
                  Stay Ahead of the Curve – Launching Soon
                </span>
                <Icon
                  className="text-white"
                  icon="mdi:bell"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CherryTradeSection;
