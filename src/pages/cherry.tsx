import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import "../css/cherry.css";
import "../css/hero-animations.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CherryToken: React.FC = () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Refs for animation elements
  const tokenSectionRef = useRef<HTMLDivElement>(null);
  const tokenTitleRef = useRef<HTMLHeadingElement>(null);
  const tokenomicsContainerRef = useRef<HTMLDivElement>(null);
  const tokenomicsTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Set initial states
    gsap.set(
      [
        tokenTitleRef.current,
        ".token-item",
        ".tokenomics-item",
        tokenomicsTitleRef.current,
      ],
      { opacity: 0, y: 50 }
    );

    // Initial token section animation
    const tokenTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.5,
    });

    tokenTl
      .to(tokenTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      })
      .to(
        ".token-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.8"
      );

    // Token items scroll animations
    const tokenTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#tokenSection",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tokenTimeline.to(".token-item", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
    });

    // Tokenomics section animations
    const tokenomicsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: tokenomicsContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tokenomicsTimeline
      .to(tokenomicsTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(
        ".tokenomics-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.5"
      );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="overlay"></div>
      <div className="hider top"></div>
      <div className="hider"></div>

      <div id="triggerXoverFlow1" className="wrapper_main h-full">
        <div className="overlay_color">
          <div className="overlay_stroke"></div>
        </div>
      </div>

      <div id="triggerXoverFlow" className="wrapper_sections wrapper-container">
        <Navbar />

        {/* $CHERRY Token Section */}
        <div
          ref={tokenSectionRef}
          id="tokenSection"
          className="token-section relative w-full py-20 bg-cherry-cream overflow-hidden"
        >
          {/* Section Title */}
          <div className="relative z-10 mb-10 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
            <h2
              ref={tokenTitleRef}
              className="maladroit-font text-xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block"
            >
              $CHERRY Token
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font lg:text-xl text-sm text-cherry-burgundy mt-6">
              The fuel of the Cherry ecosystem — powering trades, rewards, and
              growth across all our tools
            </p>
          </div>

          {/* Token Content */}
          <div className="max-w-6xl mx-auto px-4 space-y-12">
            {/* What is $CHERRY */}
            <div className="flex flex-col items-start gap-8 token-item">
              <div className="lg:w-full">
                <div className="bg-cherry-red rounded-2xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                  <h3 className="maladroit-font text-lg md:text-2xl text-cherry-cream mb-4">
                    🧩 What is $CHERRY?
                  </h3>
                  <p className="winky-sans-font text-sm md:text-lg text-cherry-cream mb-4">
                    $CHERRY is the native token of the CHERRY ecosystem. From
                    trading bots to community tools and gamified quests, $CHERRY
                    is what ties it all together.
                  </p>
                  <p className="winky-sans-font text-sm md:text-lg text-cherry-cream">
                    Whether you're a trader, project founder, or degen gamer —
                    $CHERRY gives you utility, access, and rewards.
                  </p>
                </div>
              </div>
              <div className="lg:w-full">
                <div className="bg-cherry-burgundy rounded-2xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                  <h3 className="maladroit-font text-3xl md:text-4xl text-cherry-cream mb-8 text-center flex items-center justify-center gap-3">
                    <Icon icon="fa-solid:cogs" />
                    $CHERRY Utility
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {/* Card 1: Bot Upgrades & Features */}
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          icon="mdi:robot-happy"
                          className="text-3xl text-cherry-cream flex-shrink-0"
                        />
                        <h4 className="winky-sans-font text-lg md:text-xl text-cherry-cream font-bold">
                          Bot Upgrades & Features
                        </h4>
                      </div>
                      <p className="winky-sans-font text-cherry-cream text-sm md:text-base">
                        Use $CHERRY to unlock advanced trade tools, priority
                        trending slots, and more.
                      </p>
                    </div>

                    {/* Card 2: Game Rewards & Boosts */}
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          icon="ion:game-controller"
                          className="text-3xl text-cherry-cream flex-shrink-0"
                        />
                        <h4 className="winky-sans-font text-lg md:text-xl text-cherry-cream font-bold">
                          Game Rewards & Boosts
                        </h4>
                      </div>
                      <p className="winky-sans-font text-cherry-cream text-sm md:text-base">
                        Earn and spend $CHERRY inside the Cherry Tap Game. Use
                        it for mining boosts, card upgrades, and power-ups.
                      </p>
                    </div>

                    {/* Card 3: Airdrop Eligibility */}
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          icon="icon-park-solid:parachute"
                          className="text-3xl text-cherry-cream flex-shrink-0"
                        />
                        <h4 className="winky-sans-font text-lg md:text-xl text-cherry-cream font-bold">
                          Airdrop Eligibility
                        </h4>
                      </div>
                      <p className="winky-sans-font text-cherry-cream text-sm md:text-base">
                        Holding or earning $CHERRY through trading and game
                        activities increases your airdrop and reward chances.
                      </p>
                    </div>

                    {/* Card 4: Fee Sharing */}
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-3">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          icon="mdi:cash-sync"
                          className="text-3xl text-cherry-cream flex-shrink-0"
                        />
                        <h4 className="winky-sans-font text-lg md:text-xl text-cherry-cream font-bold">
                          Fee Sharing{" "}
                          <span className="text-xs align-top">
                            (Coming Soon)
                          </span>
                        </h4>
                      </div>
                      <p className="winky-sans-font text-cherry-cream text-sm md:text-base">
                        Top Sniper and Trending users may get access to
                        revenue-sharing based on leaderboard rankings and token
                        volume.
                      </p>
                    </div>

                    {/* Card 5: Buyback and Burn */}
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-3">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          icon="mdi:fire-circle"
                          className="text-3xl text-cherry-cream flex-shrink-0"
                        />
                        <h4 className="winky-sans-font text-lg md:text-xl text-cherry-cream font-bold">
                          Buyback & Burn
                        </h4>
                      </div>
                      <p className="winky-sans-font text-cherry-cream text-sm md:text-base mb-2">
                        All profits from Cherry Trending (via ads and promoted
                        posts) are used to buy back and burn $CHERRY tokens.
                      </p>
                    </div>

                    {/* Card 6: Staking Level System */}
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream h-full flex flex-col transition-transform transform hover:-translate-y-1 lg:col-span-6 md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          icon="mdi:trophy-award"
                          className="text-3xl text-cherry-cream flex-shrink-0"
                        />
                        <h4 className="winky-sans-font text-lg md:text-xl text-cherry-cream font-bold">
                          Staking Level System
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-1">
                          <p className="winky-sans-font text-cherry-cream text-sm md:text-base mb-2">
                            All profits from the cherry Trading Bot (from
                            subscriptions and fees) are used to reward $CHERRY
                            stakers.
                          </p>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-cherry-burgundy/50 rounded-lg p-3">
                            <h5 className="font-bold text-cherry-cream mb-1 winky-sans-font flex items-center gap-2">
                              <Icon icon="mdi:arrow-up-bold-hexagon-outline" />{" "}
                              XP & Levels
                            </h5>
                            <ul className="list-disc list-inside space-y-1 winky-sans-font text-cherry-cream text-sm">
                              <li>10-level staking system.</li>
                              <li>Earn XP based on amount staked.</li>
                              <li>Unstaking resets current XP bar.</li>
                            </ul>
                          </div>
                          <div className="bg-cherry-burgundy/50 rounded-lg p-3">
                            <h5 className="font-bold text-cherry-cream mb-1 winky-sans-font flex items-center gap-2">
                              <Icon icon="mdi:treasure-chest" /> Store & Loot
                              Boxes
                            </h5>
                            <ul className="list-disc list-inside space-y-1 winky-sans-font text-cherry-cream text-sm">
                              <li>Earn Store Points from staking.</li>
                              <li>Buy 5 types of loot boxes.</li>
                              <li>Higher levels unlock better boxes.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tokenomics Section */}
            <div
              id="tokenomicsSection"
              ref={tokenomicsContainerRef}
              className="tokenomics-section relative w-full rounded-2xl py-20 bg-gradient-to-b from-[#7d1231] to-cherry-burgundy border-t-4 border-cherry-burgundy overflow-hidden"
            >
              {/* Section Title */}
              <div className="relative z-10 mb-10 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
                <h2
                  ref={tokenomicsTitleRef}
                  className="maladroit-font text-xl md:text-6xl text-cherry-cream mb-6 relative inline-block"
                >
                  Why $CHERRY?
                  <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
                </h2>
                <p className="winky-sans-font text-lg md:text-2xl text-cherry-cream mt-6">
                  A Self-Sustaining Ecosystem
                </p>
              </div>

              {/* Tokenomics Content */}
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Staking */}
                  <div className="tokenomics-item group">
                    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] hover:shadow-[12px_12px_0px_#5d4037] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full">
                      <div className="bg-cherry-red p-6 relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cherry-burgundy opacity-20 rounded-full"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cherry-burgundy opacity-10 rounded-full"></div>

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#321017]">
                            <img
                              src="https://storage.cherrybot.ai/staking.webp"
                              alt="Staking"
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-sm md:text-2xl text-cherry-cream leading-tight">
                              Staking
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="bg-green-400 text-cherry-black px-3 py-1 rounded-full text-sm winky-sans-font">
                                10%
                              </span>
                              <span className="text-cherry-cream text-sm winky-sans-font opacity-90">
                                of Revenue
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cherry-red rounded-full mt-2 flex-shrink-0"></div>
                          <p className="winky-sans-font text-cherry-burgundy leading-relaxed">
                            Will be used to buy $CHERRY and offer unique staking
                            opportunities with high APR. Stakers can access
                            third-party airdrops, which will be delivered to the
                            highest stakers by pool size.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cherry-red rounded-full mt-2 flex-shrink-0"></div>
                          <p className="winky-sans-font text-cherry-burgundy leading-relaxed">
                            Additionally, stakers gain access to a private chat
                            room with direct access to the team, enabling them
                            to participate in governance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ads, Project Promotions */}
                  <div className="tokenomics-item group">
                    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] hover:shadow-[12px_12px_0px_#5d4037] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full">
                      <div className="bg-cherry-red p-6 relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cherry-burgundy opacity-20 rounded-full"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cherry-burgundy opacity-10 rounded-full"></div>

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#321017]">
                            <img
                              src="https://storage.cherrybot.ai/adds.webp"
                              alt="Ads"
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-sm md:text-2xl text-cherry-cream leading-tight">
                              Ads & Promotions
                            </h3>
                            <span className="text-cherry-cream text-sm winky-sans-font opacity-90">
                              Platform Features
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cherry-red rounded-full mt-2 flex-shrink-0"></div>
                          <p className="winky-sans-font text-cherry-burgundy leading-relaxed">
                            To access CHERRY's platform features, including ads
                            and project promotions, users must purchase $CHERRY.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Token Governance - Full Width */}
                  <div className="tokenomics-item group md:col-span-2">
                    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] hover:shadow-[12px_12px_0px_#5d4037] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                      <div className="bg-cherry-red p-6 relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cherry-burgundy opacity-20 rounded-full"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cherry-burgundy opacity-10 rounded-full"></div>
                        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cherry-burgundy opacity-15 rounded-full"></div>

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#321017]">
                            <img
                              src="https://storage.cherrybot.ai/govern.webp"
                              alt="Governance"
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-sm md:text-2xl text-cherry-cream leading-tight">
                              Token Governance
                            </h3>
                            <span className="text-cherry-cream text-sm winky-sans-font opacity-90">
                              Community Driven Decisions
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-cherry-red rounded-full mt-2 flex-shrink-0"></div>
                            <p className="winky-sans-font text-cherry-burgundy leading-relaxed">
                              Platform votes, bounties, and other governance
                              activities will be available to all $CHERRY
                              holders.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-cherry-red rounded-full mt-2 flex-shrink-0"></div>
                            <p className="winky-sans-font text-cherry-burgundy leading-relaxed">
                              Stakers will receive{" "}
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                2X
                              </span>{" "}
                              the voting power, allowing for greater influence
                              on platform decisions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tokenomics Overview */}
            <div className="token-item bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
              <h3 className="maladroit-font text-xl md:text-3xl text-cherry-burgundy mb-6 text-center">
                Tokenomics Overview
              </h3>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-cherry-red text-cherry-cream">
                      <th className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        Allocation
                      </th>
                      <th className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        TGE (%)
                      </th>
                      <th className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        Amount
                      </th>
                      <th className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        Price ($)
                      </th>
                      <th className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        Raise ($)
                      </th>
                      <th className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        Vesting
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Seed
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        6.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        60,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.0090
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $540,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then linear over 12 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Early Community Round
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        1.50%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        15,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.0200
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $300,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then linear over 6 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Community Rewards
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        15.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        150,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        15% TGE, then linear over 18 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Staking
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        10.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        100,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        15% TGE, then linear over 18 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Marketing & Partnerships
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12.58%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        125,800,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        1 month cliff, then linear over 18 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Reserves
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        15.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        150,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        18 month cliff, then linear over 18 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Liquidity
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        10.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        100,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        100% at TGE then unlocked as needed
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        KOL Round
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        5.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        50,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.050
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $2,500,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then 30%, then linear over 6 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Partners
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        4.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        40,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.012
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $480,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then 40%, then linear over 2 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        VC #1
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        0.75%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        7,500,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.020
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $150,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then 100%
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        VC #2
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        1.67%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        16,670,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.009
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $150,030
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then linear over 12 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        VC #3
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        1.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        10,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $0.009
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        $90,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        12 months cliff, then linear over 12 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Advisory
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        7.50%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        75,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        18 month cliff then linear over 12 months
                      </td>
                    </tr>
                    <tr className="bg-cherry-cream">
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font   ">
                        Team
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        10.00%
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        100,000,000
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        -
                      </td>
                      <td className="p-4 border-2 border-cherry-burgundy winky-sans-font">
                        18 month cliff then linear over 12 months
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-3 px-2">
                {[
                  {
                    allocation: "Seed",
                    tge: "6.00%",
                    amount: "60,000,000",
                    price: "$0.0090",
                    raise: "$540,000",
                    vesting: "12 months cliff, then Linear over 12 months",
                  },
                  {
                    allocation: "Early Community Round",
                    tge: "1.50%",
                    amount: "15,000,000",
                    price: "$0.0200",
                    raise: "$300,000",
                    vesting: "12 months cliff, then Linear over 6 months",
                  },
                  {
                    allocation: "Community Rewards",
                    tge: "15.00%",
                    amount: "150,000,000",
                    price: "-",
                    raise: "-",
                    vesting: "15% TGE, then linear over 18 months",
                  },
                  {
                    allocation: "Staking",
                    tge: "10.00%",
                    amount: "100,000,000",
                    price: "-",
                    raise: "-",
                    vesting: "15% TGE, then linear over 18 months",
                  },
                  {
                    allocation: "Marketing & Partnerships",
                    tge: "12.58%",
                    amount: "125,800,000",
                    price: "-",
                    raise: "-",
                    vesting: "1 month cliff, then linear over 18 months",
                  },
                  {
                    allocation: "Reserves",
                    tge: "15.00%",
                    amount: "150,000,000",
                    price: "-",
                    raise: "-",
                    vesting: "18 month cliff, then linear over 18 months",
                  },
                  {
                    allocation: "Liquidity",
                    tge: "10.00%",
                    amount: "100,000,000",
                    price: "-",
                    raise: "-",
                    vesting: "100% at TGE then unlocked as needed",
                  },
                  {
                    allocation: "KOL Round",
                    tge: "5.00%",
                    amount: "50,000,000",
                    price: "$0.050",
                    raise: "$2,500,000",
                    vesting:
                      "12 months cliff, then 30%, then linear over 6 months",
                  },
                  {
                    allocation: "Partners",
                    tge: "4.00%",
                    amount: "40,000,000",
                    price: "$0.012",
                    raise: "$480,000",
                    vesting:
                      "12 months cliff, then 40%, then linear over 2 months",
                  },
                  {
                    allocation: "VC #1",
                    tge: "0.75%",
                    amount: "7,500,000",
                    price: "$0.020",
                    raise: "$150,000",
                    vesting: "12 months cliff, then 100%",
                  },
                  {
                    allocation: "VC #2",
                    tge: "1.67%",
                    amount: "16,670,000",
                    price: "$0.009",
                    raise: "$150,030",
                    vesting: "12 months cliff, then linear over 12months",
                  },
                  {
                    allocation: "VC #3",
                    tge: "1.00%",
                    amount: "10,000,000",
                    price: "$0.009",
                    raise: "$90,000",
                    vesting: "12 months cliff, then linear over 12months",
                  },
                  {
                    allocation: "Advisory",
                    tge: "7.50%",
                    amount: "75,000,000",
                    price: "-",
                    raise: "-",
                    vesting: "18 month cliff then linear over 12 months",
                  },
                  {
                    allocation: "Team",
                    tge: "10.00%",
                    amount: "100,000,000",
                    price: "-",
                    raise: "-",
                    vesting: "18 month cliff then linear over 12 months",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-cherry-cream border-2 border-cherry-burgundy rounded-xl p-3 shadow-[3px_3px_0px_#321017] overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-cherry-red rounded-lg p-2 mb-3 -mx-1">
                      <h4 className="winky-sans-font text-base    text-cherry-cream text-center">
                        {item.allocation}
                      </h4>
                    </div>

                    {/* Content Grid - Optimized for mobile */}
                    <div className="space-y-2">
                      {/* Top Row - TGE and Amount */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-cherry-burgundy bg-opacity-10 rounded-lg p-2">
                          <div className="text-xs    text-cherry-cream mb-1">
                            TGE
                          </div>
                          <div className="winky-sans-font text-sm font-semibold text-cherry-cream">
                            {item.tge}
                          </div>
                        </div>
                        <div className="bg-cherry-burgundy bg-opacity-10 rounded-lg p-2">
                          <div className="text-xs    text-cherry-cream mb-1">
                            Amount
                          </div>
                          <div className="winky-sans-font text-xs font-semibold text-cherry-cream break-all">
                            {item.amount}
                          </div>
                        </div>
                      </div>

                      {/* Middle Row - Price and Raise (only if not "-") */}
                      {(item.price !== "-" || item.raise !== "-") && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-cherry-burgundy bg-opacity-10 rounded-lg p-2">
                            <div className="text-xs    text-cherry-cream mb-1">
                              Price
                            </div>
                            <div className="winky-sans-font text-sm font-semibold text-cherry-cream">
                              {item.price}
                            </div>
                          </div>
                          <div className="bg-cherry-burgundy bg-opacity-10 rounded-lg p-2">
                            <div className="text-xs    text-cherry-cream mb-1">
                              Raise
                            </div>
                            <div className="winky-sans-font text-sm font-semibold text-cherry-cream">
                              {item.raise}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Row - Vesting (Full Width) */}
                      <div className="bg-cherry-burgundy bg-opacity-10 rounded-lg p-2">
                        <div className="text-xs    text-cherry-cream mb-1">
                          Vesting
                        </div>
                        <div className="winky-sans-font text-xs leading-relaxed text-cherry-cream">
                          {item.vesting}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Hold $CHERRY */}
            <div className="token-item flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-cherry-red rounded-2xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                  <h3 className="maladroit-font text-xl md:text-3xl text-cherry-cream mb-4 text-center">
                    Why Hold $CHERRY?
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream">
                      <p className="winky-sans-font text-sm md:text-lg text-cherry-cream text-center">
                        Because it earns while you play, trade, and grow.
                      </p>
                    </div>
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream">
                      <p className="winky-sans-font text-sm md:text-lg text-cherry-cream text-center">
                        Because it's the gateway to exclusive tools.
                      </p>
                    </div>
                    <div className="bg-[#7e1331] rounded-xl p-4 border-2 border-cherry-cream">
                      <p className="winky-sans-font text-sm md:text-lg text-cherry-cream text-center">
                        And because... let's be honest — it's built different.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-fit">
                <div className="relative w-full mx-auto bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transition-all duration-300">
                  <div className="w-full h-full bg-[#1a1a2e] rounded-b-lg relative overflow-hidden">
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

            {/* Cherry Ecosystem Revenue Model */}
            <div className="token-item relative w-full py-10 bg-gradient-to-br from-cherry-red via-[#7e1331] to-cherry-burgundy rounded-2xl border-4 border-cherry-burgundy overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-cherry-cream opacity-10 rounded-full"></div>
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cherry-burgundy opacity-20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cherry-cream opacity-5 rounded-full"></div>

              {/* Section Title */}
              <div className="relative z-10 mb-16 text-center max-w-5xl mx-auto px-4">
                <h2 className="maladroit-font text-2xl md:text-xl lg:text-2xl text-cherry-cream mb-2 relative inline-block">
                  $CHERRY is at The Center of the Entire $CHERRY Economy
                  <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-cream rounded-full transform opacity-80"></div>
                </h2>
                <p className="winky-sans-font text-sm md:text-lg text-cherry-cream mt-2 opacity-90 leading-relaxed">
                  Every trade, ad, promotion made using Cherry ecosystem
                  products generates fees that add value to $CHERRY
                </p>
              </div>

              {/* Revenue Flow Section */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  {/* Fee Generation */}
                  <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#321017] overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#321017]">
                    <div className="bg-cherry-burgundy p-6 relative overflow-hidden">
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-cherry-red opacity-20 rounded-full"></div>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-cherry-cream rounded-full border-4 border-cherry-red flex items-center justify-center shadow-[4px_4px_0px_#d6024d]">
                          <Icon
                            icon="mdi:cash-multiple"
                            className="text-3xl text-cherry-burgundy"
                          />
                        </div>
                        <div>
                          <h3 className="maladroit-font text-xl md:text-2xl text-cherry-cream leading-tight">
                            Fee Generation
                          </h3>
                          <p className="text-cherry-cream text-sm winky-sans-font opacity-90">
                            Multiple Revenue Streams
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="mdi:trending-up"
                          className="text-xl text-cherry-red mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="winky-sans-font text-cherry-burgundy font-semibold mb-1">
                            Trading Fees
                          </p>
                          <p className="winky-sans-font text-cherry-burgundy text-sm leading-relaxed">
                            Generated from bot subscriptions and trading
                            activities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="mdi:bullhorn"
                          className="text-xl text-cherry-red mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="winky-sans-font text-cherry-burgundy font-semibold mb-1">
                            Advertising Revenue
                          </p>
                          <p className="winky-sans-font text-cherry-burgundy text-sm leading-relaxed">
                            From promoted posts and platform advertisements
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="mdi:gamepad-variant"
                          className="text-xl text-cherry-red mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="winky-sans-font text-cherry-burgundy font-semibold mb-1">
                            Game Revenue
                          </p>
                          <p className="winky-sans-font text-cherry-burgundy text-sm leading-relaxed">
                            In-game purchases and premium features
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buyback Mechanism */}
                  <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#321017] overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#321017]">
                    <div className="bg-cherry-red p-6 relative overflow-hidden">
                      <div className="absolute -top-8 -left-8 w-24 h-24 bg-cherry-burgundy opacity-20 rounded-full"></div>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center shadow-[4px_4px_0px_#321017]">
                          <Icon
                            icon="mdi:recycle"
                            className="text-3xl text-cherry-red"
                          />
                        </div>
                        <div>
                          <h3 className="maladroit-font text-xl md:text-2xl text-cherry-cream leading-tight">
                            Buyback & Burn
                          </h3>
                          <p className="text-cherry-cream text-sm winky-sans-font opacity-90">
                            Value Creation Process
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-cherry-burgundy bg-opacity-10 rounded-xl p-4 border-2 border-cherry-red">
                        <p className="winky-sans-font text-cherry-cream text-center font-semibold">
                          Most fees generated by the Cherry ecosystem are used
                          to buyback $CHERRY tokens
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <Icon
                            icon="mdi:arrow-right-bold"
                            className="text-3xl text-cherry-red mx-auto mb-2"
                          />
                          <p className="winky-sans-font text-cherry-burgundy text-sm">
                            More fees = More buybacks
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-100 rounded-xl p-4 border-2 border-green-400">
                        <p className="winky-sans-font text-green-800 text-center font-semibold">
                          Creating consistent value for $CHERRY holders
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Loot Pool Distribution */}
                  <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#321017] overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#321017]">
                    <div className="bg-cherry-burgundy p-6 relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cherry-cream opacity-20 rounded-full"></div>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-cherry-cream rounded-full border-4 border-cherry-red flex items-center justify-center shadow-[4px_4px_0px_#d6024d]">
                          <Icon
                            icon="mdi:treasure-chest"
                            className="text-3xl text-cherry-burgundy"
                          />
                        </div>
                        <div>
                          <h3 className="maladroit-font text-xl md:text-2xl text-cherry-cream leading-tight">
                            Loot Pools
                          </h3>
                          <p className="text-cherry-cream text-sm winky-sans-font opacity-90">
                            Community Rewards
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="mdi:star"
                          className="text-xl text-cherry-red mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="winky-sans-font text-cherry-burgundy font-semibold mb-1">
                            Staker Rewards
                          </p>
                          <p className="winky-sans-font text-cherry-burgundy text-sm leading-relaxed">
                            Bought back $CHERRY tokens distributed to stakers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="mdi:chart-line"
                          className="text-xl text-cherry-red mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="winky-sans-font text-cherry-burgundy font-semibold mb-1">
                            Ecosystem Growth
                          </p>
                          <p className="winky-sans-font text-cherry-burgundy text-sm leading-relaxed">
                            Funds used to expand the $CHERRY ecosystem
                          </p>
                        </div>
                      </div>
                      <div className="bg-cherry-burgundy bg-opacity-10 rounded-xl p-4 border-2 border-cherry-red">
                        <p className="winky-sans-font text-cherry-cream text-center font-semibold text-sm">
                          The more the ecosystem grows, the more value flows
                          back to holders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Value Flow Diagram */}
                <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#321017] p-8 relative overflow-hidden">
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cherry-burgundy opacity-10 rounded-full"></div>

                  <h3 className="maladroit-font text-2xl md:text-4xl text-cherry-burgundy mb-8 text-center relative z-10">
                    Cherry Ecosystem Value Flow
                  </h3>

                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-cherry-red rounded-full border-4 border-cherry-burgundy flex items-center justify-center mb-4 shadow-[4px_4px_0px_#321017]">
                        <Icon
                          icon="mdi:cog"
                          className="text-3xl text-cherry-cream"
                        />
                      </div>
                      <p className="winky-sans-font text-cherry-burgundy font-bold text-lg mb-2">
                        Ecosystem Activity
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-sm">
                        Trading, Gaming, Ads
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:block">
                      <Icon
                        icon="mdi:arrow-right-bold"
                        className="text-4xl text-cherry-red"
                      />
                    </div>
                    <div className="lg:hidden">
                      <Icon
                        icon="mdi:arrow-down-bold"
                        className="text-4xl text-cherry-red"
                      />
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-cherry-burgundy rounded-full border-4 border-cherry-red flex items-center justify-center mb-4 shadow-[4px_4px_0px_#d6024d]">
                        <Icon
                          icon="mdi:cash-multiple"
                          className="text-3xl text-cherry-cream"
                        />
                      </div>
                      <p className="winky-sans-font text-cherry-burgundy font-bold text-lg mb-2">
                        Fee Generation
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-sm">
                        Revenue Collection
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:block">
                      <Icon
                        icon="mdi:arrow-right-bold"
                        className="text-4xl text-cherry-red"
                      />
                    </div>
                    <div className="lg:hidden">
                      <Icon
                        icon="mdi:arrow-down-bold"
                        className="text-4xl text-cherry-red"
                      />
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-cherry-red rounded-full border-4 border-cherry-burgundy flex items-center justify-center mb-4 shadow-[4px_4px_0px_#321017]">
                        <Icon
                          icon="mdi:recycle"
                          className="text-3xl text-cherry-cream"
                        />
                      </div>
                      <p className="winky-sans-font text-cherry-burgundy font-bold text-lg mb-2">
                        $CHERRY Buyback
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-sm">
                        Token Acquisition
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:block">
                      <Icon
                        icon="mdi:arrow-right-bold"
                        className="text-4xl text-cherry-red"
                      />
                    </div>
                    <div className="lg:hidden">
                      <Icon
                        icon="mdi:arrow-down-bold"
                        className="text-4xl text-cherry-red"
                      />
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-cherry-burgundy rounded-full border-4 border-cherry-red flex items-center justify-center mb-4 shadow-[4px_4px_0px_#d6024d]">
                        <Icon
                          icon="mdi:treasure-chest"
                          className="text-3xl text-cherry-cream"
                        />
                      </div>
                      <p className="winky-sans-font text-cherry-burgundy font-bold text-lg mb-2">
                        Value Distribution
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-sm">
                        Rewards & Growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cherry Points & Staking System */}
            <div className="token-item relative w-full py-16 bg-cherry-cream overflow-hidden">
              {/* Gaming-themed background elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzMyMTAxNyIgb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-50"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cherry-red opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cherry-burgundy opacity-5 rounded-full blur-3xl"></div>

              {/* Section Title */}
              <div className="relative z-10 mb-12 text-center max-w-4xl mx-auto px-4">
                <h2 className="maladroit-font text-3xl md:text-3xl lg:text-3xl text-cherry-burgundy mb-2 relative inline-block">
                  Cherry Points, Staking Tiers & Loot Boxes
                </h2>
                <p className="winky-sans-font text-sm md:text-lg text-cherry-burgundy mt-2 opacity-80">
                  Unlock rewards through our gamified staking system
                </p>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Gaming Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {/* Cherry Points Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cherry-red to-cherry-burgundy rounded-3xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative bg-cherry-burgundy rounded-3xl border-4 border-cherry-burgundy overflow-hidden shadow-[10px_10px_0px_#321017] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_#321017]">
                      <div className="bg-gradient-to-br from-cherry-red via-[#7e1331] to-cherry-burgundy p-8 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-cherry-cream rounded-full opacity-20"></div>
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cherry-cream rounded-full opacity-30"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-20 h-20 bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[4px_4px_0px_#321017] rotate-3 group-hover:rotate-6 transition-transform">
                            <Icon
                              icon="mdi:star-circle"
                              className="text-4xl text-cherry-red"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-cream leading-tight">
                              Cherry Points
                            </h3>
                            <p className="text-cherry-cream text-sm winky-sans-font opacity-90 flex items-center gap-2 mt-2">
                              <Icon
                                icon="mdi:lightning-bolt"
                                className="text-lg"
                              />
                              Earn & Redeem System
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="bg-cherry-cream rounded-2xl border-3 border-cherry-burgundy p-6 mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon
                              icon="mdi:account-star"
                              className="text-2xl text-cherry-red"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold text-lg">
                              How it Works
                            </h4>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-cherry-red rounded-full"></div>
                              <p className="winky-sans-font text-cherry-burgundy text-sm">
                                $CHERRY stakers automatically earn Cherry Points
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-cherry-red rounded-full"></div>
                              <p className="winky-sans-font text-cherry-burgundy text-sm">
                                Redeem points for valuable rewards from the
                                Cherry store
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-cherry-red rounded-full"></div>
                              <p className="winky-sans-font text-cherry-burgundy text-sm">
                                Boost your staking tier by burning Cherry Points
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loot Boxes Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cherry-burgundy via-[#7e1331] to-cherry-burgundy rounded-3xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative bg-cherry-burgundy rounded-3xl border-4 border-cherry-burgundy overflow-hidden shadow-[10px_10px_0px_#321017] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_#321017]">
                      <div className="bg-gradient-to-br from-cherry-burgundy via-[#7e1331] to-cherry-burgundy p-8 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-20 h-20 border-4 border-cherry-cream rounded-xl opacity-20 rotate-12"></div>
                        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-cherry-cream rounded-lg opacity-30 rotate-45"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-20 h-20 bg-cherry-cream rounded-2xl border-4 border-cherry-red flex items-center justify-center shadow-[4px_4px_0px_#d6024d] -rotate-3 group-hover:-rotate-6 transition-transform">
                            <Icon
                              icon="mdi:treasure-chest"
                              className="text-4xl text-cherry-burgundy"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-cream leading-tight">
                              Loot Boxes
                            </h3>
                            <p className="text-cherry-cream text-sm winky-sans-font opacity-90 flex items-center gap-2 mt-2">
                              <Icon icon="mdi:gift" className="text-lg" />
                              Surprise Rewards
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="bg-cherry-cream rounded-2xl border-3 border-cherry-burgundy p-6 mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon
                              icon="mdi:shopping"
                              className="text-2xl text-cherry-red"
                            />
                            <h4 className="winky-sans-font text-cherry-burgundy font-bold text-lg">
                              Cherry Store
                            </h4>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-cherry-red rounded-full"></div>
                              <p className="winky-sans-font text-cherry-burgundy text-sm">
                                Purchase using Cherry Points from the store
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-cherry-red rounded-full"></div>
                              <p className="winky-sans-font text-cherry-burgundy text-sm">
                                Sourced from the community Loot Pool
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-cherry-red rounded-full"></div>
                              <p className="winky-sans-font text-cherry-burgundy text-sm">
                                Can contain large amounts of $CHERRY tokens
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tiered System */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Loot Box Tiers */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-cherry-red to-cherry-burgundy rounded-3xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform transition-all duration-300 hover:-translate-y-1">
                      <div className="bg-cherry-cream p-8 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-cherry-red rounded-xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[4px_4px_0px_#321017]">
                              <Icon
                                icon="mdi:package-variant"
                                className="text-3xl text-cherry-cream"
                              />
                            </div>
                            <div>
                              <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-burgundy leading-tight">
                                Tiered Loot Boxes
                              </h3>
                              <p className="text-cherry-burgundy text-sm winky-sans-font opacity-80">
                                3 Exciting Tiers
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {/* Standard Tier */}
                            <div className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-gray-300">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-gray-400 flex items-center justify-center">
                                <Icon
                                  icon="mdi:package"
                                  className="text-2xl text-gray-600"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="winky-sans-font text-gray-800 font-bold text-lg">
                                  Standard
                                </h4>
                                <p className="winky-sans-font text-gray-600 text-sm">
                                  Basic rewards, lowest cost
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm winky-sans-font">
                                  Low Cost
                                </span>
                              </div>
                            </div>

                            {/* Rare Tier */}
                            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border-2 border-blue-300">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg border-2 border-blue-400 flex items-center justify-center">
                                <Icon
                                  icon="mdi:package-variant"
                                  className="text-2xl text-blue-600"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="winky-sans-font text-blue-800 font-bold text-lg">
                                  Rare
                                </h4>
                                <p className="winky-sans-font text-blue-600 text-sm">
                                  Better rewards, moderate cost
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm winky-sans-font">
                                  Mid Cost
                                </span>
                              </div>
                            </div>

                            {/* Legendary Tier */}
                            <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-400">
                              <div className="w-12 h-12 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-lg border-2 border-yellow-500 flex items-center justify-center">
                                <Icon
                                  icon="mdi:treasure-chest"
                                  className="text-2xl text-yellow-800"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="winky-sans-font text-yellow-800 font-bold text-lg">
                                  Legendary
                                </h4>
                                <p className="winky-sans-font text-yellow-700 text-sm">
                                  Highest rewards, premium cost
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 text-yellow-800 px-3 py-1 rounded-full text-sm winky-sans-font">
                                  High Cost
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Staking Tiers */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-cherry-burgundy to-[#7e1331] rounded-3xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform transition-all duration-300 hover:-translate-y-1">
                      <div className="bg-cherry-cream p-8 relative overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-cherry-burgundy opacity-10 rounded-full"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-cherry-burgundy rounded-xl border-4 border-cherry-red flex items-center justify-center shadow-[4px_4px_0px_#d6024d]">
                              <Icon
                                icon="mdi:crown"
                                className="text-3xl text-cherry-cream"
                              />
                            </div>
                            <div>
                              <h3 className="maladroit-font text-2xl md:text-3xl text-cherry-burgundy leading-tight">
                                Staking Tiers
                              </h3>
                              <p className="text-cherry-burgundy text-sm winky-sans-font opacity-80">
                                Unlock Higher Rewards
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {/* Legionary */}
                            <div className="flex items-center gap-4 bg-cherry-cream rounded-xl p-4 border-2 border-cherry-burgundy">
                              <div className="w-12 h-12 bg-cherry-cream rounded-lg border-2 border-cherry-burgundy flex items-center justify-center">
                                <Icon
                                  icon="mdi:shield"
                                  className="text-2xl text-cherry-burgundy"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="winky-sans-font text-cherry-burgundy font-bold text-lg">
                                  Legionary
                                </h4>
                                <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80">
                                  Base tier staking
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-cherry-cream text-cherry-burgundy px-3 py-1 rounded-full text-sm winky-sans-font border border-cherry-burgundy">
                                  1x Rate
                                </span>
                              </div>
                            </div>

                            {/* Centurion */}
                            <div className="flex items-center gap-4 bg-gradient-to-r from-cherry-cream to-cherry-red/10 rounded-xl p-4 border-2 border-cherry-red">
                              <div className="w-12 h-12 bg-cherry-red rounded-lg border-2 border-cherry-burgundy flex items-center justify-center">
                                <Icon
                                  icon="mdi:shield-star"
                                  className="text-2xl text-cherry-cream"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="winky-sans-font text-cherry-burgundy font-bold text-lg">
                                  Centurion
                                </h4>
                                <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80">
                                  Enhanced staking rewards
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-cherry-red text-cherry-cream px-3 py-1 rounded-full text-sm winky-sans-font">
                                  2x Rate
                                </span>
                              </div>
                            </div>

                            {/* Legatus */}
                            <div className="flex items-center gap-4 bg-gradient-to-r from-cherry-burgundy/10 to-cherry-burgundy/20 rounded-xl p-4 border-2 border-cherry-burgundy">
                              <div className="w-12 h-12 bg-cherry-burgundy rounded-lg border-2 border-cherry-red flex items-center justify-center">
                                <Icon
                                  icon="mdi:crown"
                                  className="text-2xl text-cherry-cream"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="winky-sans-font text-cherry-burgundy font-bold text-lg">
                                  Legatus
                                </h4>
                                <p className="winky-sans-font text-cherry-burgundy text-sm opacity-80">
                                  Premium tier benefits
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-cherry-burgundy text-cherry-cream px-3 py-1 rounded-full text-sm winky-sans-font">
                                  3x Rate
                                </span>
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

            {/* $CHERRY Buyback & Burn Section */}
            <div className="token-item relative w-full py-20   overflow-hidden">
              {/* Fire/Burn themed background elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-6 h-6 bg-cherry-red rounded-full opacity-20 animate-pulse"></div>
                <div
                  className="absolute top-32 right-20 w-4 h-4 bg-cherry-red rounded-full opacity-30 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-20 left-32 w-5 h-5 bg-cherry-red rounded-full opacity-25 animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute bottom-40 right-10 w-3 h-3 bg-cherry-red rounded-full opacity-35 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cherry-cream opacity-5 rounded-full blur-3xl"></div>

              {/* Section Title */}
              <div className="relative z-10 mb-16 text-center max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Icon
                    icon="mdi:fire"
                    className="text-4xl md:text-6xl text-cherry-red animate-pulse"
                  />
                  <h2 className="maladroit-font text-3xl md:text-4xl lg:text-4xl text-cherry-burgundy mb-0 relative inline-block">
                    $CHERRY Buybacks & Burns
                  </h2>
                  <Icon
                    icon="mdi:trending-up"
                    className="text-4xl md:text-6xl text-cherry-cream"
                  />
                </div>
                <p className="winky-sans-font text-lg md:text-xl text-cherry-burgundy opacity-90 leading-relaxed">
                  Making $CHERRY deflationary and more valuable over time
                </p>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Main Burn Mechanism */}
                <div className="mb-16">
                  <div className="bg-cherry-cream rounded-3xl border-4 border-cherry-red overflow-hidden shadow-[16px_16px_0px_#d6024d] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[20px_20px_0px_#d6024d]">
                    <div className="bg-gradient-to-br from-cherry-red via-[#7e1331] to-cherry-burgundy p-8 md:p-12 relative overflow-hidden">
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500 opacity-10 rounded-full blur-2xl"></div>

                      <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-6 mb-8">
                          <div className="w-20 h-20 bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[6px_6px_0px_#321017] transform rotate-3">
                            <Icon
                              icon="mdi:fire-circle"
                              className="text-4xl text-cherry-red"
                            />
                          </div>
                          <h3 className="maladroit-font text-3xl md:text-3xl lg:text-3xl text-cherry-cream leading-tight">
                            Deflationary by Design
                          </h3>
                          <div className="w-20 h-20 bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[6px_6px_0px_#321017] transform -rotate-3">
                            <Icon
                              icon="mdi:chart-line"
                              className="text-4xl text-green-600"
                            />
                          </div>
                        </div>

                        <div className="bg-cherry-cream/10 backdrop-blur-sm rounded-2xl border-2 border-cherry-cream/30 p-8">
                          <p className="winky-sans-font text-lg md:text-xl text-cherry-cream leading-relaxed mb-6">
                            <span className="bg-cherry-cream text-cherry-burgundy px-3 py-1 rounded-full font-bold mr-2">
                              Key Mechanism:
                            </span>
                            Some of the fees generated by Cherry ecosystem
                            products will be used to buyback and burn $CHERRY.
                            This will make $CHERRY deflationary thus making the
                            tokens more valuable as time goes by.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Burn Process Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                  {/* Step 1: Fee Collection */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#321017] transform transition-all duration-300 group-hover:-translate-y-2">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-cherry-cream opacity-20 rounded-full"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-cherry-cream rounded-xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[4px_4px_0px_#321017]">
                            <Icon
                              icon="mdi:cash-multiple"
                              className="text-3xl text-green-600"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-xl md:text-xl text-cherry-cream leading-tight">
                              Fee Collection
                            </h3>
                            <p className="text-cherry-cream text-sm winky-sans-font opacity-90">
                              Revenue Generation
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Trading bot subscriptions
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Platform advertising revenue
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Gaming and feature fees
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Token Buyback */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#321017] transform transition-all duration-300 group-hover:-translate-y-2">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 relative overflow-hidden">
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-cherry-cream opacity-20 rounded-full"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-cherry-cream rounded-xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[4px_4px_0px_#321017]">
                            <Icon
                              icon="mdi:shopping"
                              className="text-3xl text-blue-600"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-xl md:text-xl text-cherry-cream leading-tight">
                              Token Buyback
                            </h3>
                            <p className="text-cherry-cream text-sm winky-sans-font opacity-90">
                              Market Purchase
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Fees converted to buyback funds
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              $CHERRY purchased from market
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Systematic acquisition process
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Token Burn */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cherry-red to-orange-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#321017] transform transition-all duration-300 group-hover:-translate-y-2">
                      <div className="bg-gradient-to-br from-cherry-red to-orange-600 p-6 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-cherry-cream opacity-20 rounded-full"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-cherry-cream rounded-xl border-4 border-cherry-burgundy flex items-center justify-center shadow-[4px_4px_0px_#321017]">
                            <Icon
                              icon="mdi:fire"
                              className="text-3xl text-cherry-red animate-pulse"
                            />
                          </div>
                          <div>
                            <h3 className="maladroit-font text-xl md:text-2xl text-cherry-cream leading-tight">
                              Token Burn
                            </h3>
                            <p className="text-cherry-cream text-sm winky-sans-font opacity-90">
                              Permanent Removal
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-cherry-red rounded-full animate-pulse"></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Tokens sent to burn address
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 bg-cherry-red rounded-full animate-pulse"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Supply permanently reduced
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 bg-cherry-red rounded-full animate-pulse"
                              style={{ animationDelay: "1s" }}
                            ></div>
                            <p className="winky-sans-font text-cherry-burgundy text-sm">
                              Deflationary pressure created
                            </p>
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

        <Footer />
      </div>
    </>
  );
};

export default CherryToken;
