import React, { useState, useEffect } from "react";
import gsap from "gsap";

const ProductChangelogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("sniper");

  const handleTrySniper = () => {
    window.location.href = "https://t.me/cherrysniperbot";
  };

  const handleJoinWaitlist = () => {
    const element = document.getElementById("newsletter-signup-roadmap");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    animateTabContent(tab);
  };

  const animateTabContent = (tab: string) => {
    gsap.set(".tab-content", { display: "none", opacity: 0 });

    const activeContent = document.querySelector(`.${tab}-content`);
    if (activeContent) {
      gsap.set(activeContent, { display: "block" });

      const tl = gsap.timeline();

      tl.fromTo(
        activeContent,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      tl.fromTo(
        `${tab === "sniper" ? ".changelog-item" : ".changelog-item"}`,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      tl.fromTo(
        `${tab === "sniper" ? ".sniper-image" : ".trade-mockup"}`,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );
    }
  };

  useEffect(() => {
    // Initialize tab animation
    animateTabContent(activeTab);
  }, [activeTab]);

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>

      <div className="max-w-[88rem] mb-20 mx-auto px-4">
        <div className="flex flex-col bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] lg:p-6 p-2 relative overflow-hidden transform   transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
          <div className="mb-6 relative z-10">
            <h3 className="md:text-3xl text-xl font-bold maladroit-font text-[var(--color-text-primary)] mb-3">
              Product Changelog
            </h3>
            <p className="winky-sans-font text-[var(--color-text-secondary)] md:text-lg text-sm">
              Stay up to date with the latest improvements and features added to
              our ecosystem.
            </p>
          </div>

          <div className="relative z-10">
            {/* Tab inputs (hidden) */}
            <div className="flex border-b-4 border-[var(--color-accent)]">
              <input
                type="radio"
                name="tabs"
                id="sniper"
                className="hidden peer/sniper"
                defaultChecked
                onChange={() => handleTabChange("sniper")}
              />
              <input
                type="radio"
                name="tabs"
                id="trade"
                className="hidden peer/trade"
                onChange={() => handleTabChange("trade")}
              />

              {/* Tab buttons/labels */}
              <label
                htmlFor="sniper"
                className={`py-2 px-6 rounded-t-lg border-t-2 border-l-2 border-r-2 border-[var(--color-accent)] font-bold winky-sans-font relative overflow-hidden cursor-pointer mr-2 transition-all duration-300 ${
                  activeTab === "sniper"
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-glass)] text-[var(--color-text-primary)]"
                }`}
              >
                SniperAI Bot
              </label>

              <label
                htmlFor="trade"
                className={`py-2 px-6 rounded-t-lg border-t-2 border-l-2 border-r-2 border-[var(--color-accent)] font-bold winky-sans-font relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeTab === "trade"
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-glass)] text-[var(--color-text-primary)]"
                }`}
              >
                Cherry Trade
              </label>
            </div>

            {/* Tab content */}
            <div className="mt-6">
              {/* SniperAI Bot content */}
              <div className="tab-content sniper-content hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Side - Changelog */}
                  <div className="md:w-2/5 space-y-6">
                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain animate-float opacity-40"></div>
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Version 2.2.3
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            June 8, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>
                          Integrated API for showing limit and DCA orders in UI
                        </li>
                        <li>
                          Added closing functionality for DCA and limit orders
                        </li>
                        <li>Implemented USD validation in validatePrice API</li>
                        <li>Enhanced DCA order management and changes</li>
                      </ul>
                    </div>

                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Version 2.2.1
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            June 5, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>Added custom RPC endpoint configuration</li>
                        <li>
                          Implemented DCA and limit order failure notifications
                        </li>
                        <li>Enhanced blockchain connectivity options</li>
                      </ul>
                    </div>

                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Version 2.1.5
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            June 1, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>Fixed custom fee calculation issues</li>
                        <li>
                          Removed embedded links after buy/sell transactions
                        </li>
                        <li>Code optimization and performance improvements</li>
                      </ul>
                    </div>

                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Version 2.1.3
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            May 28, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>Added editing for DCA and limit orders</li>
                        <li>Fixed UI responsiveness issues</li>
                        <li>Improved transaction confirmation speed</li>
                      </ul>
                    </div>

                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Version 2.1.0
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            May 25, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>Added APIs for listing DCA & limit orders in UI</li>
                        <li>Implemented new dashboard layout</li>
                        <li>Enhanced order history tracking</li>
                      </ul>
                    </div>

                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Version 2.0.5
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            May 20, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>
                          Fixed price calculation for USD in limit and DCA
                          orders
                        </li>
                        <li>Improved gas optimization</li>
                        <li>Added support for additional EVM chains</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Side - Screenshot */}
                  <div className="md:w-3/5">
                    <div className="bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   h-fit">
                      <div className="overflow-hidden rounded-lg border-2 border-[var(--color-accent)] sniper-image">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source
                            src="https://storage.cherrybot.ai/sniperModes.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="md:text-xl text-lg font-bold maladroit-font text-[var(--color-text-primary)]">
                          SniperAI Bot Dashboard
                        </h4>
                        <p className="winky-sans-font my-2 text-[var(--color-text-secondary)]">
                          The Fastest Way to Trade on Solana.
                        </p>
                        <button
                          onClick={handleTrySniper}
                          className="inline-block mt-4 text-white bg-[var(--color-accent)] font-bold py-2 px-6 rounded-xl border border-b-4 border-r-4 border-[var(--color-accent)] hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font   hover: "
                        >
                          <span className="flex text-white items-center gap-2">
                            Try SniperAI Bot
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cherry Trade content */}
              <div className="tab-content trade-content hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Side - Changelog */}
                  <div className="md:w-2/5 space-y-6">
                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Coming Soon
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            June 15, 2025
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>Advanced trading interface with live charts</li>
                        <li>Multi-chain portfolio management</li>
                        <li>AI-powered trade suggestions</li>
                      </ul>
                    </div>

                    <div className="changelog-item bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   relative">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold winky-sans-font text-[var(--color-text-primary)]">
                            Development Update
                          </h5>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            June 1, 2025
                          </span>
                        </div>
                      </div>
                      <p className="text-[var(--color-text-secondary)] winky-sans-font mb-2">
                        Cherry Trade is currently in development with the
                        following features planned:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc text-[var(--color-text-secondary)] winky-sans-font">
                        <li>Seamless integration with SniperAI Bot</li>
                        <li>Custom trading strategies and automation</li>
                        <li>Social trading and strategy sharing</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Side - Mockup */}
                  <div className="md:w-3/5">
                    <div className="bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   h-full">
                      <div className="relative overflow-hidden rounded-lg border-2 border-[var(--color-accent)] bg-gray-900 h-80 flex items-center justify-center trade-mockup">
                        {/* Placeholder for Cherry Trade mockup */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-accent)]">
                          <div className="relative z-20 p-6 text-center">
                            <h3 className="md:text-2xl text-lg font-bold maladroit-font text-white mb-2">
                              Coming Soon
                            </h3>
                            <p className="winky-sans-font text-white mb-4">
                              The next evolution in AI-powered crypto trading
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="md:text-xl text-lg font-bold maladroit-font text-[var(--color-text-primary)]">
                          Cherry Trade Platform
                        </h4>
                        <p className="winky-sans-font my-2 text-[var(--color-text-secondary)]">
                          Sign up for early access to our revolutionary trading
                          platform
                        </p>
                        <button
                          onClick={handleJoinWaitlist}
                          className="inline-block mt-4 text-white bg-[var(--color-accent)] font-bold py-2 px-6 rounded-xl border border-b-4 border-r-4 border-[var(--color-accent)] hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font   hover: "
                        >
                          <span className="flex text-white items-center gap-2">
                            Join Waitlist
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductChangelogSection;
