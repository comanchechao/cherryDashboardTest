import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/cherry.css";
import Navbar from "../layouts/Navbar";
import { Icon } from "@iconify/react";
import Footer from "../layouts/Footer";

const Features: React.FC = () => {
  // Refs for animation
  const heroRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const questRef = useRef<HTMLDivElement>(null);
  const sniperRef = useRef<HTMLDivElement>(null);
  const upcomingFeaturesRef = useRef<HTMLDivElement>(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0", "translate-y-16");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all refs
    const elements = [
      heroRef,
      botRef,
      trendingRef,
      questRef,
      sniperRef,
      upcomingFeaturesRef,
    ];
    elements.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Cleanup
    return () => {
      elements.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Handler functions for CTAs
  const handleExploreBot = () => {
    window.open("https://t.me/CherryTGBot", "_blank");
  };

  const handleViewTrending = () => {
    window.open("https://t.me/cherrytrending", "_blank");
  };

  const handleStartQuesting = () => {
    window.open("https://t.me/cherrygame_io_bot", "_blank");
  };

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
        <div className="section_menu">
          <a
            data-w-id="87ad386c-0ced-5924-521f-7494012d2c31"
            href="#home"
            className="menu_nav w-button"
          >
            HOME
          </a>
          <a
            data-w-id="7d8f886b-0585-318b-7e93-b06c2d583f20"
            className="menu_nav w-button"
            id="aboutBtn"
          >
            ABOUT
          </a>
          <Link to="/features" className="menu_nav w-button" id="featuresBtn">
            FEATURES
          </Link>
          <a
            data-w-id="d7a0aea0-e993-cbf1-34dd-b40546be337d"
            className="menu_nav w-button"
            id="partnersBtn"
          >
            PARTNERS
          </a>
          <a
            href="https://pad.cherrybot.ai/"
            target="_blank"
            rel="noreferrer"
            className="menu_nav w-button"
            id="cherryTokenBtn"
          >
            IDO
          </a>
          <a
            data-w-id="2ba2cf4a-0b9f-9de3-1531-186224626ad9"
            className="menu_nav w-button"
            id="cherryTokenBtn"
          >
            $AIBOT
          </a>
          <a
            data-w-id="b4f5159c-2aa8-980c-c2c7-debaa8ed221d"
            href="https://docs.cherrybot.co/"
            target="_blank"
            rel="noreferrer"
            className="menu_nav w-button"
          >
            docs
          </a>
          <Link to="/careers" className="menu_nav w-button">
            CAREERS
          </Link>
          <a
            data-w-id="faf18f25-7349-a299-8d71-0263824f1e35"
            href="#"
            className="back w-button"
          >
            BACK
          </a>
        </div>
        <Navbar />
        <div className="max-w-8xl mx-auto lg:px-0 px-5 pt-16">
          <div
            ref={heroRef}
            className="relative  max-w-[88rem] mt-10 mx-auto   opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="relative bg-cherry-cream rounded-3xl border-4 border-cherry-burgundy overflow-hidden p-8 md:p-12">
              <svg
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="heroPattern"
                    patternUnits="userSpaceOnUse"
                    width="40"
                    height="40"
                    patternTransform="rotate(45)"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="3"
                      fill="#E53935"
                      fillOpacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heroPattern)" />
              </svg>

              <div className="relative z-10 mt-10 flex flex-col  items-center">
                <div className="   md:pr-8  md:mb-0">
                  <h3 className="maladroit-font text-center  mx-auto text-2xl md:text-4xl   text-cherry-burgundy mb-3">
                    Cherry AI Ecosystem
                  </h3>
                </div>

                <div className=" w-fit md:px-44 my-3   ">
                  <p className="winky-sans-font !text-[14px] text-center md:text-xl text-cherry-burgundy mb-8">
                    Discover our comprehensive suite of tools built to transform
                    Web3 trading, community growth, and token engagement. From
                    managing groups to discovering the next big memecoin — trade
                    smarter, earn rewards, and grow faster with Cherry.
                  </p>

                  <div className="flex flex-wrap w-full items-center justify-center gap-6">
                    <div
                      onClick={handleExploreBot}
                      className="cursor-pointer text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                    >
                      <Icon
                        icon="lucide:bot"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <span className="text-cherry-cream">Management Bot</span>
                    </div>
                    <div
                      onClick={handleViewTrending}
                      className="text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                    >
                      <Icon
                        icon="icon-park-twotone:blockchain"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <span className="text-cherry-cream">AI Trending</span>
                    </div>
                    <div
                      onClick={handleStartQuesting}
                      className="cursor-pointer text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                    >
                      <Icon
                        icon="mdi:trophy-outline"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <span className="text-cherry-cream">Cherry Quest</span>
                    </div>
                    <div className="relative text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font">
                      <Icon
                        icon="uil:chart"
                        width={20}
                        height={20}
                        className="text-cherry-cream"
                      />
                      <span className="text-cherry-cream">Cherry Trade</span>
                      <span className="absolute -top-2 -right-7 bg-cherry-burgundy text-cherry-cream text-xs px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>{" "}
                    <Link to="/cherrySniper">
                      <div className="cursor-pointer text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font">
                        <Icon
                          icon="ph:crosshair-simple-bold"
                          width={20}
                          height={20}
                          className="text-cherry-cream"
                        />
                        <span className="text-cherry-cream">Cherry Sniper</span>{" "}
                        <span className="absolute -top-3 -right-7 bg-cherry-burgundy text-cherry-cream text-xs px-2 py-1 rounded-full">
                          NEW
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="sniper"
            ref={sniperRef}
            className="mt-32 max-w-[88rem] mx-auto relative opacity-0  transform translate-y-16 transition-all duration-1000"
          >
            <div className="text-center mb-16">
              <h2 className="maladroit-font text-4xl md:text-5xl   text-cherry-burgundy mb-3">
                Cherry Sniper
              </h2>
              <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
              <p className="winky-sans-font text-sm md:text-xl max-w-3xl mx-auto text-cherry-burgundy">
                Cherry Sniper offers advanced trading tools for Web3
                enthusiasts, providing lightning-fast execution, rewarding
                participation, and enhanced liquidity options to give traders a
                competitive edge in the market.
              </p>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="feature-card group">
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2">
                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="cardGrad2"
                            x1="100%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFF3DD" />
                            <stop offset="100%" stopColor="#F8ECD1" />
                          </linearGradient>
                          <pattern
                            id="cardDots2"
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30"
                            patternTransform="rotate(-45)"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="2"
                              fill="#E53935"
                              fillOpacity="0.2"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#cardGrad2)"
                        />
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#cardDots2)"
                          fillOpacity="0.8"
                        />
                      </svg>

                      <div className="relative z-10 p-6">
                        <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <img
                            src="https://storage.cherrybot.ai/cherrySniper.webp"
                            alt="Prelaunch Trending"
                            className="w-20 h-20 object-contain animate-float mt-7"
                          />
                        </div>

                        <div className="flex w-full flex-col items-center justify-center">
                          <h3 className="text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                            Instant Swap Execution
                          </h3>
                        </div>
                        <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                        <p className="text-cherry-burgundy winky-sans-font text-center flex-grow">
                          Experience lightning-fast trades with Cherry Sniper's
                          optimized routing and low-latency infrastructure.
                          Designed for rapid token launches and volatile
                          markets, our system ensures your transactions are
                          executed promptly, giving you a competitive edge.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="feature-card group">
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2">
                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="cardGrad2"
                            x1="100%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFF3DD" />
                            <stop offset="100%" stopColor="#F8ECD1" />
                          </linearGradient>
                          <pattern
                            id="cardDots2"
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30"
                            patternTransform="rotate(-45)"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="2"
                              fill="#E53935"
                              fillOpacity="0.2"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#cardGrad2)"
                        />
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#cardDots2)"
                          fillOpacity="0.8"
                        />
                      </svg>

                      <div className="relative z-10 p-6">
                        <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <img
                            src="https://storage.cherrybot.ai/cherryPoints.webp"
                            alt="Raid Feature"
                            className="w-24 h-24 animate-float object-contain mt-12"
                          />
                        </div>

                        <div className="flex w-full flex-col items-center justify-center">
                          <h3 className="text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                            Points & Rewards System
                          </h3>
                        </div>
                        <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                        <p className="text-cherry-burgundy winky-sans-font text-center flex-grow">
                          Engage in trading and earn points with every $10 in
                          volume. Accumulate points to climb the leaderboard and
                          unlock exclusive rewards, including Cherry token
                          airdrops and other incentives. This gamified approach
                          encourages active participation and rewards consistent
                          traders.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="feature-card group">
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2">
                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="cardGrad2"
                            x1="100%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFF3DD" />
                            <stop offset="100%" stopColor="#F8ECD1" />
                          </linearGradient>
                          <pattern
                            id="cardDots2"
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30"
                            patternTransform="rotate(-45)"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="2"
                              fill="#E53935"
                              fillOpacity="0.2"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#cardGrad2)"
                        />
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#cardDots2)"
                          fillOpacity="0.8"
                        />
                      </svg>

                      <div className="relative z-10 p-6">
                        <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <img
                            src="https://storage.cherrybot.ai/points.webp"
                            alt="Prelaunch Trending"
                            className="w-20 h-20 object-contain animate-float mt-7"
                          />
                        </div>

                        <div className="flex w-full flex-col items-center justify-center">
                          <h3 className="text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                            Pool Boost Program
                          </h3>
                        </div>
                        <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                        <p className="text-cherry-burgundy winky-sans-font text-center flex-grow">
                          Benefit from our Pool Boost initiative, where select
                          liquidity pools offer an additional 5% bonus on
                          trades. This feature incentivizes trading in specific
                          pools, enhancing liquidity and providing traders with
                          added value.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 relative">
                  <div className="bg-gradient-to-r from-cherry-red to-cherry-burgundy rounded-2xl border-4 border-cherry-burgundy overflow-hidden p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient
                            id="sniperRadialPattern"
                            cx="50%"
                            cy="50%"
                            r="50%"
                            fx="50%"
                            fy="50%"
                          >
                            <stop
                              offset="0%"
                              stopColor="white"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="white"
                              stopOpacity="0"
                            />
                          </radialGradient>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#sniperRadialPattern)"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-2xl   mb-6 maladroit-font text-cherry-burgundy text-center">
                        Advanced Trading Features
                      </h3>
                      <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                          <div className="text-3xl   winky-sans-font text-green-500 mb-2">
                            🎯
                          </div>
                          <h4 className="text-white winky-sans-font text-xl   mb-3">
                            Graduation Sniper
                          </h4>
                          <p className="text-white winky-sans-font text-sm">
                            With our migration sniper, you're never too late to
                            the party. Be the first to get in or secure profits.
                          </p>
                        </div>

                        <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                          <div className="text-3xl   winky-sans-font text-green-500 mb-2">
                            🪙
                          </div>
                          <h4 className="text-white winky-sans-font text-xl   mb-3">
                            Copytrade
                          </h4>
                          <p className="text-white winky-sans-font text-sm">
                            Let others do the heavy lifting. Copy the trades of
                            a profitable trader (or traders) automatically,
                            while enjoying the same safety features.
                          </p>
                        </div>
                        <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                          <div className="text-3xl   winky-sans-font text-green-500 mb-2">
                            🤖
                          </div>
                          <h4 className="text-white winky-sans-font text-xl   mb-3">
                            No MEV Triggers
                          </h4>
                          <p className="text-white winky-sans-font text-sm">
                            Cherry utilizes MEV-resistant execution paths with
                            frontrunning and sandwiching protection, meaning
                            your limit orders are safe with us.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 w-full flex-col md:flex-row gap-10 flex items-center justify-center text-center">
                      <button
                        onClick={() =>
                          window.open("https://t.me/cherrySniperBot", "_blank")
                        }
                        className="text-white bg-cherry-red   md:py-4 py-3 md:px-16 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font mx-auto"
                      >
                        <span className="text-white text-lg">
                          Try Cherry Sniper
                        </span>
                        <Icon
                          className="text-white"
                          icon="ph:crosshair-simple-bold"
                          width={24}
                          height={24}
                        />
                      </button>
                      <Link to="/cherrySniper">
                        <button className="text-white bg-cherry-red   md:py-4 py-3 md:px-16 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font mx-auto">
                          <span className="text-white text-lg">Learn More</span>
                          <Icon
                            className="text-white"
                            icon="streamline-plump:global-learning-remix"
                            width={24}
                            height={24}
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="bot"
            ref={botRef}
            className="mt-32 max-w-[88rem] mx-auto relative opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="text-center mb-16">
              <h2 className="maladroit-font text-2xl md:text-5xl   text-cherry-burgundy mb-3">
                Management Bot
              </h2>
              <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
              <p className="winky-sans-font text-sm md:text-xl max-w-3xl mx-auto text-cherry-burgundy  ">
                The Cherry Bot is one of the most comprehensive Telegram bots
                ever made for community management. It offers a suite of
                services that ensure your community is managed more effectively
                than any other Telegram bot available todday.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="feature-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="cardGrad1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="cardDots1"
                        patternUnits="userSpaceOnUse"
                        width="30"
                        height="30"
                        patternTransform="rotate(45)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="2"
                          fill="#E53935"
                          fillOpacity="0.2"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cardGrad1)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots1)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6">
                    <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/securitycherry.webp"
                        alt="Security Portal"
                        className="w-24 h-24 object-contain mt-4"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                      <h3 className="text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                        Security Portal
                      </h3>
                    </div>
                    <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center text-[14px]">
                      Keep your group and community secure with advanced
                      moderation tools and filters. Our security portal ensures
                      that your Telegram groups are free from spam, malicious
                      links, and disruptive behavior.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="cardGrad2"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="cardDots2"
                        patternUnits="userSpaceOnUse"
                        width="30"
                        height="30"
                        patternTransform="rotate(-45)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="2"
                          fill="#E53935"
                          fillOpacity="0.2"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cardGrad2)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots2)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6">
                    <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/raidcherry.webp"
                        alt="Raid Feature"
                        className="w-24 h-24 object-contain mt-4"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                      <h3 className="text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                        Raid Feature
                      </h3>
                    </div>
                    <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center text-[17px]">
                      Plan and execute community raids, gaining exposure to
                      Cherry's massive community of
                      <span className="text-green-500"> 10 million </span>
                      users. This feature integrates seamlessly with Cherry
                      Quest.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="cardGrad3"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="cardDots3"
                        patternUnits="userSpaceOnUse"
                        width="40"
                        height="40"
                        patternTransform="rotate(30)"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="3"
                          fill="#E53935"
                          fillOpacity="0.15"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cardGrad3)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots3)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6">
                    <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/lunchpadcherry.webp"
                        alt="Multichain Buy Bot"
                        className="w-24 h-24 object-contain mt-4"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                      <h3 className="text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                        Multichain Buy Bot
                      </h3>
                    </div>
                    <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center text-[17px]">
                      Monitor on-chain buys effortlessly across multiple chains.
                      Track presales and multichain purchases in real-time,
                      ensuring you never miss a crucial market opportunity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden p-8">
              <h3 className="text-lg md:text-3xl   mb-6 maladroit-font text-cherry-burgundy text-center">
                Growth, User Engagement & Adoption
              </h3>
              <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>

              <div className="grid grid-cols-1 lg:place-items-center place-items-start md:grid-cols-3 gap-8">
                <div className="flex   items-center justify-center text-center">
                  <div className="flex justify-center items-center w-fit">
                    <div className="flex flex-row text-center p-3 bg-transparent gap-1">
                      <div className="flex justify-center bg-[#331118] backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[rgba(255,255,255,0.125)] p-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <div className="relative flex lg:items-center items-start justify-center w-[70px] h-[70px] bg-[#331118] rounded-xl p-1 icon-container">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-xl p-[2px] icon-border"></div>

                            <Icon
                              icon="solar:shield-bold"
                              width="50"
                              height="50"
                              style={{ color: "#f21e5b" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-5xl winky-sans-font   text-green-500 mb-2">
                      141K+
                    </div>
                    <p className="text-cherry-burgundy winky-sans-font">
                      Active Groups Protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex justify-center items-center w-fit">
                    <div className="flex flex-row text-center p-3 bg-transparent gap-1">
                      <div className="flex justify-center bg-[#331118] backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[rgba(255,255,255,0.125)] p-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <div className="relative flex items-center justify-center w-[70px] h-[70px] bg-[#331118] rounded-xl p-1 icon-container">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-xl p-[2px] icon-border"></div>

                            <Icon
                              icon="material-symbols:swords"
                              width="50"
                              height="50"
                              style={{ color: "#f21e5b" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-5xl winky-sans-font   text-yellow-500 mb-2">
                      1M+
                    </div>
                    <p className="text-cherry-burgundy winky-sans-font">
                      Raids Executed
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex justify-center items-center w-fit">
                    <div className="flex flex-row text-center p-3 bg-transparent gap-1">
                      <div className="flex justify-center bg-[#331118] backdrop-blur-[20px] backdrop-saturate-[180%] rounded-xl border border-[rgba(255,255,255,0.125)] p-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <div className="relative flex items-center justify-center w-[70px] h-[70px] bg-[#331118] rounded-xl p-1 icon-container">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-xl p-[2px] icon-border"></div>

                            <Icon
                              icon="ph:seal-check-bold"
                              width="50"
                              height="50"
                              style={{ color: "#f21e5b" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl winky-sans-font   text-yellow-500 mb-2">
                      175K+
                    </div>
                    <p className="text-cherry-burgundy winky-sans-font">
                      Projects Trust Us
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 w-full flex items-center justify-center text-center">
                <button
                  onClick={handleExploreBot}
                  className="text-white bg-cherry-red   md:py-4 py-3 lg:px-16 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font mx-auto"
                >
                  <span className="text-white text-lg">Explore CherryBot</span>
                  <Icon
                    className="text-white"
                    icon="lucide:bot"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            id="trending"
            ref={trendingRef}
            className="mt-32 max-w-[88rem] mx-auto relative opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="text-center mb-16">
              <h2 className="maladroit-font text-xl md:text-5xl   text-cherry-burgundy mb-3">
                AI Trending Algorithms
              </h2>
              <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
              <p className="winky-sans-font text-sm md:text-xl max-w-3xl mx-auto text-cherry-burgundy">
                Discover tokens that move — and make sure yours does too.
              </p>
              <p className="winky-sans-font text-sm md:text-lg max-w-4xl mx-auto text-cherry-burgundy mt-4">
                Cherry AI Trending highlights top-performing and upcoming tokens
                across multiple chains, using smart signals like prelaunch
                activity, on-chain data, and simulated volume boosts. Our tools
                don't just track momentum — they help create it.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mt-16">
              <div className="feature-card flex-1 group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="trendGrad1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="trendDots1"
                        patternUnits="userSpaceOnUse"
                        width="30"
                        height="30"
                        patternTransform="rotate(45)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="2"
                          fill="#E53935"
                          fillOpacity="0.2"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#trendGrad1)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#trendDots1)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/lunchpadcherry.webp"
                        alt="Presale Trending"
                        className="w-24 h-24 object-contain mt-4"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                      <h3 className="text-lg md:text-2xl  mb-3 maladroit-font text-cherry-burgundy text-center">
                        Presale/Launchpad Trending
                      </h3>
                    </div>
                    <div className="h-1 w-32 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center flex-grow text-sm md:text-[19px] mt-5">
                      Spot promising tokens before launch and rank them by early
                      traction, volume velocity, and holder growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card flex-1 group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="trendGrad2"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="trendDots2"
                        patternUnits="userSpaceOnUse"
                        width="30"
                        height="30"
                        patternTransform="rotate(-45)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="2"
                          fill="#E53935"
                          fillOpacity="0.2"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#trendGrad2)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#trendDots2)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/launch.webp"
                        alt="Prelaunch Trending"
                        className="w-20 h-20 object-contain mt-6"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                      <h3 className="text-lg md:text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                        Prelaunch Trending
                      </h3>
                    </div>
                    <div className="h-1 w-32 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center flex-grow text-sm md:text-[19px] mt-5">
                      Get early access to pre-launch projects backed by real
                      user interest, bot signals, and dev activity.
                    </p>

                    <div className="w-12 h-12 mx-auto mt-6 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain animate-spin-slow opacity-30"></div>
                  </div>
                </div>
              </div>

              <div className="feature-card flex-1 group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="trendGrad3"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="trendDots3"
                        patternUnits="userSpaceOnUse"
                        width="40"
                        height="40"
                        patternTransform="rotate(30)"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="3"
                          fill="#E53935"
                          fillOpacity="0.15"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#trendGrad3)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#trendDots3)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/airdrop.webp"
                        alt="AI Token Tracking"
                        className="w-24 h-24 object-contain mt-4"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                      <h3 className="text-lg md:text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                        AI Token Tracking + Volume Boosting
                      </h3>
                    </div>
                    <div className="h-1 w-32 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center flex-grow text-sm md:text-[19px]">
                      Cherry AI scans live market data to detect real momentum —
                      and our Volume Bot can help you simulate volume and holder
                      activity to push tokens to the top organically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 relative">
              <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden p-8 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                  <svg
                    className="w-full h-48"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18.17 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
                      opacity=".25"
                      fill="#E53935"
                    />
                    <path
                      d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
                      opacity=".5"
                      fill="#E53935"
                    />
                    <path
                      d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z"
                      fill="#E53935"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl   mb-6 maladroit-font text-cherry-burgundy text-center">
                    Growth Stats
                  </h3>
                  <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
                  <p className="text-center text-cherry-burgundy winky-sans-font text-lg mb-8">
                    Trusted by top launchpads, traders, and meme creators to
                    drive early momentum.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                      <div className="text-4xl   winky-sans-font text-green-500 mb-2">
                        1.2M+
                      </div>
                      <p className="text-white winky-sans-font text-lg">
                        Subscribers
                      </p>
                      <p className="text-white winky-sans-font mt-2 text-sm">
                        watching what trends
                      </p>
                    </div>

                    <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                      <div className="text-4xl   winky-sans-font text-green-500 mb-2">
                        825K+
                      </div>
                      <p className="text-white winky-sans-font text-lg">
                        Projects
                      </p>
                      <p className="text-white winky-sans-font mt-2 text-sm">
                        tracked in real time
                      </p>
                    </div>

                    <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                      <div className="text-4xl   winky-sans-font text-yellow-500 mb-2">
                        $150M+
                      </div>
                      <p className="text-white winky-sans-font text-lg">
                        Volume
                      </p>
                      <p className="text-white winky-sans-font mt-2 text-sm">
                        simulated across the ecosystem
                      </p>
                    </div>

                    <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                      <div className="text-4xl   winky-sans-font text-yellow-500 mb-2">
                        46K+
                      </div>
                      <p className="text-white winky-sans-font text-lg">
                        Holders
                      </p>
                      <p className="text-white winky-sans-font mt-2 text-sm">
                        added via Cherry Volume Bot
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 w-full flex items-center justify-center text-center">
                  <button
                    onClick={handleViewTrending}
                    className="text-white bg-cherry-red   md:py-4 py-3 lg:px-16 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font mx-auto"
                  >
                    <span className="text-white text-lg">View Trending</span>
                    <Icon
                      className="text-white"
                      icon="icon-park-twotone:blockchain"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            id="quest"
            ref={questRef}
            className="mt-32 mb-20 max-w-[88rem] mx-auto relative opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="text-center mb-16">
              <h2 className="maladroit-font text-4xl md:text-5xl   text-cherry-burgundy mb-3">
                Cherry Quest Platform
              </h2>
              <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
              <p className="winky-sans-font text-sm md:text-xl max-w-3xl mx-auto text-cherry-burgundy">
                The Cherry Quest Platform offers founders a unique opportunity
                to engage with a highly active and targeted Web3 community. By
                setting up tasks and quests on our platform, founders can
                directly connect with potential investors, educate users about
                their projects, and drive meaningful engagement.
              </p>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="feature-card group">
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 h-full">
                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <img
                            src="https://storage.cherrybot.ai/checklistcherry.webp"
                            alt="Set Up Quests"
                            className="w-24 h-24 object-contain mt-4"
                          />
                        </div>

                        <h3 className="text-lg md:text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                          Set Up Quests
                        </h3>
                        <div className="h-1 w-32 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                        <p className="text-cherry-burgundy winky-sans-font text-center flex-grow text-sm md:text-[19px]">
                          Founders can create tasks and quests on Cherry to
                          attract users to their app, offering rewards as
                          incentives.
                        </p>
                      </div>

                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <pattern
                            id="questPattern1"
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30"
                            patternTransform="rotate(45)"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="2"
                              fill="#E53935"
                              fillOpacity="0.2"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#questPattern1)"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="feature-card group">
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 h-full">
                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <img
                            src="https://storage.cherrybot.ai/checkcherry.png"
                            alt="Quest to Earn"
                            className="w-24 h-24 object-contain mt-4"
                          />
                        </div>

                        <h3 className="text-lg md:text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                          Quest to Earn
                        </h3>
                        <div className="h-1 w-32 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                        <p className="text-cherry-burgundy winky-sans-font text-center flex-grow text-sm md:text-[19px]">
                          Users complete quests to earn rewards, engaging with
                          the Cherry platform.
                        </p>
                      </div>

                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <pattern
                            id="questPattern2"
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30"
                            patternTransform="rotate(-45)"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="2"
                              fill="#E53935"
                              fillOpacity="0.2"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#questPattern2)"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="feature-card group">
                    <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[8px_8px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 h-full">
                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <div className="w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <img
                            src="https://storage.cherrybot.ai/compcherry.png"
                            alt="Competition and Challenges"
                            className="w-24 h-24 object-contain mt-4"
                          />
                        </div>

                        <h3 className="text-lg md:text-2xl   mb-4 maladroit-font text-cherry-burgundy text-center">
                          Competition & Challenges
                        </h3>
                        <div className="h-1 w-32 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                        <p className="text-cherry-burgundy winky-sans-font text-center flex-grow">
                          Compete in leaderboards to earn rewards based on
                          performance.
                        </p>
                      </div>

                      <svg
                        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <pattern
                            id="questPattern3"
                            patternUnits="userSpaceOnUse"
                            width="40"
                            height="40"
                            patternTransform="rotate(30)"
                          >
                            <circle
                              cx="20"
                              cy="20"
                              r="3"
                              fill="#E53935"
                              fillOpacity="0.15"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#questPattern3)"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-16 relative">
                  <div className="bg-gradient-to-r from-cherry-red to-cherry-burgundy rounded-2xl border-4 border-cherry-burgundy overflow-hidden p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient
                            id="radialPattern"
                            cx="50%"
                            cy="50%"
                            r="50%"
                            fx="50%"
                            fy="50%"
                          >
                            <stop
                              offset="0%"
                              stopColor="white"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="white"
                              stopOpacity="0"
                            />
                          </radialGradient>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#radialPattern)"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-lg md:text-2xl   mb-6 maladroit-font text-cherry-burgundy text-center">
                        Engagement and Growth Stats
                      </h3>
                      <div className="h-1 w-64 md:w-96 p-1 mx-auto bg-cherry-red mb-8 rounded-full"></div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                          <div className="text-5xl   winky-sans-font text-green-500 mb-2">
                            10M+
                          </div>
                          <p className="text-white winky-sans-font text-xl">
                            Users
                          </p>
                        </div>

                        <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                          <div className="text-5xl   winky-sans-font text-green-500 mb-2">
                            300K+
                          </div>
                          <p className="text-white winky-sans-font text-xl">
                            Daily Active Users
                          </p>
                        </div>
                        <div className="stat-card text-center p-6 bg-cherry-burgundy rounded-xl shadow-inner">
                          <div className="text-5xl   winky-sans-font text-green-500 mb-2">
                            1000+
                          </div>
                          <p className="text-white winky-sans-font text-xl">
                            Daily Tasks
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 w-full flex items-center justify-center text-center">
                      <button
                        onClick={handleStartQuesting}
                        className="text-white bg-cherry-red   md:py-4 py-3 lg:px-16 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font mx-auto"
                      >
                        <span className="text-white text-lg">
                          Start Questing
                        </span>
                        <Icon
                          className="text-white"
                          icon="mdi:trophy-outline"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-24 text-center max-w-[88rem] mx-auto">
            <div className="relative inline-block">
              <h2 className="maladroit-font text-2xl md:text-3xl    text-cherry-burgundy mb-3 relative z-10">
                Discover the Cherry AI Ecosystem Today
              </h2>
            </div>

            <p className="winky-sans-font text-lg lg:text-xl max-w-xl mx-auto text-cherry-burgundy mb-10">
              Join our growing community and unlock the power of Web3 with our
              suite of innovative tools and features.
            </p>

            <div className="flex flex-wrap w-full items-center justify-center gap-6">
              <div
                onClick={handleExploreBot}
                className="cursor-pointer text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
              >
                <Icon
                  icon="lucide:bot"
                  width={20}
                  height={20}
                  className="text-cherry-cream"
                />
                <span className="text-cherry-cream">Management Bot</span>
              </div>
              <div
                onClick={handleViewTrending}
                className="text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
              >
                <Icon
                  icon="icon-park-twotone:blockchain"
                  width={20}
                  height={20}
                  className="text-cherry-cream"
                />
                <span className="text-cherry-cream">AI Trending</span>
              </div>
              <div
                onClick={handleStartQuesting}
                className="cursor-pointer text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
              >
                <Icon
                  icon="mdi:trophy-outline"
                  width={20}
                  height={20}
                  className="text-cherry-cream"
                />
                <span className="text-cherry-cream">Cherry Quest</span>
              </div>
              <div className="relative text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font">
                <Icon
                  icon="uil:chart"
                  width={20}
                  height={20}
                  className="text-cherry-cream"
                />
                <span className="text-cherry-cream">Cherry Trade</span>
                <span className="absolute -top-2 -right-7 bg-cherry-burgundy text-cherry-cream text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>{" "}
              <Link to="/cherrySniper">
                <div className="cursor-pointer text-cherry-burgundy bg-cherry-red   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font">
                  <Icon
                    icon="ph:crosshair-simple-bold"
                    width={20}
                    height={20}
                    className="text-cherry-cream"
                  />
                  <span className="text-cherry-cream">Cherry Sniper</span>
                  <span className="absolute -top-3 -right-7 bg-cherry-burgundy text-cherry-cream text-xs px-2 py-1 rounded-full">
                    NEW
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Features;
