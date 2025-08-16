import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "../css/cherry.css";
import "../css/hero-animations.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Insights: React.FC = () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Refs for animation elements
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statsTitleRef = useRef<HTMLHeadingElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const marketingContainerRef = useRef<HTMLDivElement>(null);
  const trendingContainerRef = useRef<HTMLDivElement>(null);
  const featuresTitleRef = useRef<HTMLHeadingElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const partnersContainerRef = useRef<HTMLDivElement>(null);
  const partnersTitleRef = useRef<HTMLHeadingElement>(null);
  const partnersContentRef = useRef<HTMLDivElement>(null);
  const tokenomicsContainerRef = useRef<HTMLDivElement>(null);
  const tokenomicsTitleRef = useRef<HTMLHeadingElement>(null);
  const tokenomicsContentRef = useRef<HTMLDivElement>(null);
  const businessContainerRef = useRef<HTMLDivElement>(null);
  const businessTitleRef = useRef<HTMLHeadingElement>(null);

  // State for active tab
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activePartner, setActivePartner] = useState<number>(0);

  // Partner data
  const partners = [
    {
      name: "PinkSale",
      logo: "https://storage.cherrybot.ai/PinkSaleLogo.png",
      description:
        "PinkSale is a decentralized launchpad that empowers projects to raise funds through token sales across multiple blockchain networks. Cherry Bot integrates seamlessly with PinkSale, offering users a faster and more efficient way to track buys and check on-chain data. This partnership helps PinkSale users find the best-performing projects while providing project owners with exposure to Cherry AI's extensive user base.",
      website: "https://www.pinksale.finance/",
    },
    {
      name: "DexView",
      logo: "https://storage.cherrybot.ai/dexviewlogo.png",
      description:
        "DexView is a real-time analytics platform for decentralized exchanges (DEXs), providing users with deep insights into token movements, liquidity pools, and trading volumes. DexView recommends Cherry Bot to its audience due to the valuable features it offers, enhancing the trading experience for users on DEX platforms.",
      website: "https://www.dexview.com/",
    },
    {
      name: "Fjord Foundry",
      logo: "https://storage.cherrybot.ai/FjordFoundryLogo.png",
      description:
        "Fjord Foundry provides decentralized and automated liquidity provision strategies, aiding projects in efficiently managing their liquidity needs. Similar to the partnership with PinkSale, Cherry Bot integrates with Fjord Foundry to offer users tools to track liquidity and on-chain data, helping projects gain visibility in the rapidly evolving web3 space.",
      website: "https://www.fjordfoundry.com/",
    },
    {
      name: "Change Now",
      logo: "https://storage.cherrybot.ai/changenow.png",
      description:
        "ChangeNOW is a non-custodial exchange platform allowing users to swap cryptocurrencies without creating accounts or storing funds on the platform. Through the integration of Cherry Bot, ChangeNOW users can effortlessly track on-chain data directly within Cherry AI's trending channel, making it easier to stay informed about market movements.",
      website: "https://changenow.io/",
    },
    {
      name: "AWS",
      logo: "https://storage.cherrybot.ai/aws.png",
      description:
        "AWS is known for its security, high performance, and accessibility. It currently hosts some of the largest firms in the world including Netflix, Airbnb, NASA, and General Electric. Through an AWS Grant, Cherry AI gains exclusive access to AWS backend services, APIs, and data center features. These resources have helped the protocol become a pioneering force in the AI web3 market.",
      website: "https://aws.amazon.com/",
    },
    {
      name: "NOTCOIN",
      logo: "https://storage.cherrybot.ai/notcoin.png",
      description:
        "Cherry AI and Notcoin have formed a strategic partnership to mutually introduce and promote each other within our respective communities. Notcoin has brought significant traffic and community engagement to Cherry AI through multiple tasks, helping to expand our reach. In return, Cherry AI will be introducing Notcoin to our community.",
      website: "https://notco.in/",
    },
    {
      name: "APE TERMINAL",
      logo: "https://storage.cherrybot.ai/apeterminal.png",
      description:
        "Cherry AI has partnered with Ape Terminal, a leading launchpad, to enhance our mutual exposure and service offerings. Ape Terminal will help Cherry AI gain greater visibility through their extensive network. Additionally, Cherry AI is working on integrating Ape Terminal into our features, enabling us to track their project and include them in our trending lists.",
      website: "https://apeterminal.io/",
    },
  ];

  useEffect(() => {
    // Set initial states
    gsap.set(
      [
        heroContentRef.current,
        ".float-element",
        ".paper-texture",
        ".spin-element",
        ".stat-card",
        ".feature-card",
        ".feature-image",
        ".marketing-content",
        ".pulse-element",
        ".partner-content",
        ".tokenomics-item",
        ".business-item",
        tokenomicsTitleRef.current,
        businessTitleRef.current,
      ],
      { opacity: 0 }
    );

    // Initial hero section animation
    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.5,
    });

    heroTl
      .to(heroContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      })
      .to(
        ".float-element",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
        },
        "-=0.8"
      )
      .to(
        ".paper-texture",
        {
          opacity: 0.3,
          scale: 1,
          duration: 1,
        },
        "-=1"
      )
      .to(
        ".spin-element",
        {
          opacity: 0.3,
          rotation: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
        },
        "-=0.8"
      );

    // Stats section animations
    const statsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: statsContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    statsTimeline
      .to(statsTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(
        ".stat-card",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.5"
      );

    // Features section animations
    const featuresTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trendingContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    featuresTimeline
      .to(featuresTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(
        ".feature-card",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.5"
      )
      .to(
        ".feature-image",
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
        },
        "-=1"
      );

    // Marketing section animations
    const marketingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: marketingContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    marketingTimeline
      .to(".marketing-content", {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
      })
      .to(
        ".marketing-content ul li",
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.5"
      );

    // Business section animations
    const businessTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: businessContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    businessTimeline
      .to(businessTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(
        ".business-item",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
        },
        "-=0.5"
      );

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

    // Partners section animations
    const partnersTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: partnersContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    partnersTimeline
      .to(partnersTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(
        ".partner-tab",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.5"
      )
      .to(
        ".partner-content",
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "-=0.5"
      );

    // Decorative elements animations
    gsap.to(".pulse-element", {
      scrollTrigger: {
        trigger: ".pulse-element",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      scale: 1,
      opacity: 0.3,
      duration: 1,
      stagger: 0.2,
    });

    // Tab content animations
    const animateTabContent = () => {
      // First set initial state
      gsap.set(".tab-content.show .stat-card", { opacity: 0 });

      // Then animate
      gsap.to(".tab-content.show .stat-card", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        clearProps: "all",
      });
    };

    // Animate partner content when changing
    const animatePartnerContent = () => {
      // First set initial state
      gsap.set(".partner-content", { opacity: 0, scale: 0.95 });

      // Then animate
      gsap.to(".partner-content", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        clearProps: "all",
      });
    };

    // Call animation functions when tabs change
    animateTabContent();
    animatePartnerContent();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeTab, activePartner]); // Re-run when tabs change

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
        {/* Hero Section */}
        <div
          ref={heroSectionRef}
          className="  scroll-container1 h-fit flex items-center justify-center relative overflow-hidden"
          id="home"
        >
          <div
            ref={heroContentRef}
            className="  relative z-10 max-w-8xl   my-28 px-4 lg:px-20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              {/* Left Side Content */}
              <div className="md:w-3/5">
                <div className="  flex flex-col justify-center items-start bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 md:p-8 relative overflow-hidden transform rotate-1 mb-8">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 paper-texture"></div>

                  <span className="  maladroit-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-cherry-black leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center">
                    Cherry Revenue Growth
                  </span>

                  <span className="  font-bold winky-sans-font text-2xl md:text-3xl text-cherry-burgundy relative mb-6">
                    Market Analytics & Revenue Data
                    <svg
                      className="absolute bottom-0 left-0 w-full"
                      height="6"
                      viewBox="0 0 100 6"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,5 Q25,0 50,5 T100,5"
                        stroke="#e53935"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </span>

                  <p className="  winky-sans-font text-lg md:text-2xl text-cherry-burgundy mb-6 max-w-3xl relative">
                    Explore in-depth market analytics, revenue projections, and
                    upcoming features that make Cherry AI a{" "}
                    <span className="font-bold relative">
                      revolutionary platform
                      <svg
                        className="absolute bottom-0 left-0 w-full"
                        height="6"
                        viewBox="0 0 100 6"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,5 Q25,0 50,5 T100,5"
                          stroke="#e53935"
                          strokeWidth="3"
                          fill="none"
                        />
                      </svg>
                    </span>{" "}
                    in the crypto space.
                  </p>
                </div>

                <div className="  flex flex-col sm:flex-row items-center gap-6 relative z-20">
                  <button
                    onClick={() => {
                      window.open("https://pad.cherrybot.ai/", "_blank");
                    }}
                    className="text-white bg-cherry-red font-bold py-4 px-8 md:px-12 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-3 hover:translate-x-3 transition-all duration-200 transform-gpu text-xl flex items-center gap-2 shadow-[8px_8px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                  >
                    <span className="relative winky-sans-font text-cherry-white">
                      View Revenue Model
                    </span>
                    <Icon icon="tabler:chart-pie" className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => {
                      window.open("https://t.me/CherryTGBot", "_blank");
                    }}
                    className="bg-cherry-cream font-bold py-4 px-8 md:px-12 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-3 hover:translate-x-3 transition-all duration-200 transform-gpu text-xl flex items-center gap-2 shadow-[8px_8px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                  >
                    <span className="relative winky-sans-font text-cherry-burgundy">
                      Explore Cherry Bot
                    </span>
                    <Icon icon="tabler:robot" className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Right Side - Floating Mascot/Chart */}
              <div className="w-full relative">
                <div className="relative z-10 float-element">
                  <img
                    src="https://storage.cherrybot.ai/chart.png"
                    alt="Cherry Analytics"
                    className="w-full   mx-auto rounded-xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#321017]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div
          ref={statsContainerRef}
          className="stats-section relative w-full py-4 bg-cherry-cream bg-opacity-80 overflow-hidden"
        >
          {/* Section Title */}
          <div className="relative z-10 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
            <h2
              ref={statsTitleRef}
              className="maladroit-font text-5xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block"
            >
              Market Metrics
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font text-xl  mt-10 text-cherry-burgundy">
              Cherry AI's powerful position in the growing crypto market and our
              impressive platform statistics
            </p>
          </div>

          {/* Stats Tabs */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-6 py-3 rounded-t-lg winky-sans-font text-lg font-bold transition-all duration-300 ${
                  activeTab === 0
                    ? "bg-cherry-red text-white border-t-2 border-x-2 border-cherry-burgundy"
                    : "bg-cherry-cream text-cherry-burgundy border-2 border-cherry-burgundy border-opacity-50"
                }`}
              >
                Market Size
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-6 py-3 rounded-t-lg winky-sans-font text-lg font-bold transition-all duration-300 ${
                  activeTab === 1
                    ? "bg-cherry-red text-white border-t-2 border-x-2 border-cherry-burgundy"
                    : "bg-cherry-cream text-cherry-burgundy border-2 border-cherry-burgundy border-opacity-50"
                }`}
              >
                User Growth
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`px-6 py-3 rounded-t-lg winky-sans-font text-lg font-bold transition-all duration-300 ${
                  activeTab === 2
                    ? "bg-cherry-red text-white border-t-2 border-x-2 border-cherry-burgundy"
                    : "bg-cherry-cream text-cherry-burgundy border-2 border-cherry-burgundy border-opacity-50"
                }`}
              >
                Revenue Channels
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsGridRef} className="max-w-6xl mx-auto px-4">
            {/* Market Size Tab Content */}
            <div className={`tab-content ${activeTab === 0 ? "show" : "hide"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Stat Card 1 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Web3 Ads Industry
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        $21B
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Projected market size by 2029, with Cherry AI perfectly
                        positioned to capture significant share
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Addressable Market
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        $3.2B
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Current annual addressable market across all Cherry AI
                        product lines
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Projected Revenue
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        $100M
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Expected revenue generation during the first operational
                        years
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Growth Tab Content */}
            <div className={`tab-content ${activeTab === 1 ? "show" : "hide"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Stat Card 1 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Active Users
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        10M+
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Active users engaging with Cherry AI's ecosystem,
                        driving rapid adoption
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Bot Installations
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        64K+
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Cherry Bot installations across the Telegram ecosystem
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Active Groups
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        46K+
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Active groups using Cherry Bot for community management
                        and engagement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Channels Tab Content */}
            <div className={`tab-content ${activeTab === 2 ? "show" : "hide"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Stat Card 1 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Trending Revenue
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        $500K
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Monthly revenue from trending and raid features with
                        1.2M subscribers
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Quest Monetization
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        $0.1
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Per user cost for quest listings, creating a scalable
                        revenue stream
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="stat-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-cherry-red rounded-t-2xl p-5 border-4 border-cherry-burgundy">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-3 text-center">
                      <h3 className="maladroit-font text-xl text-cherry-burgundy">
                        Completed Raids
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl font-bold text-cherry-red mb-4">
                        366K+
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-center">
                        Successful raids completed, driving engagement and
                        revenue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-action */}
          <div className=" w-full flex justify-center my-20 mx-auto mt-16 text-center px-4">
            <button
              onClick={() => window.open("https://pad.cherrybot.ai/", "_blank")}
              rel="noreferrer"
              className="  bg-cherry-red font-bold py-4 px-12 rounded-xl border border-b-6 border-r-6 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-2 hover:translate-x-2 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[6px_6px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font text-white"
            >
              <span className="winky-sans-font text-lg text-cherry-cream">
                View Our Investor Deck
              </span>
              <Icon
                className="winky-sans-font   text-cherry-cream"
                icon="mdi:file-document-outline"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        {/* Trending Section */}
        <div
          ref={trendingContainerRef}
          className="trending-section relative w-full py-20 bg-gradient-to-b from-cherry-red to-[#7d1231] border-y-4 border-cherry-burgundy overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-16 right-16 w-40 h-40 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain spin-element opacity-10"></div>
            <div className="absolute bottom-40 left-10 w-32 h-32 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain float-element opacity-10"></div>
            <div className="absolute top-40 left-20 w-24 h-24 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-10 rotate-12 pulse-element"></div>
          </div>

          {/* Section Title */}
          <div className="relative z-10 mb-16 text-center max-w-4xl mx-auto px-4">
            <h2
              ref={featuresTitleRef}
              className="maladroit-font text-5xl md:text-6xl text-cherry-cream mb-6 relative inline-block"
            >
              Upcoming Features
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-cream rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font text-xl text-cherry-cream">
              Cherry AI is constantly evolving with innovative features to stay
              ahead of the market
            </p>
          </div>

          {/* Features Grid */}
          <div ref={featuresGridRef} className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature Card 1 */}
              <div className="feature-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg border-4 border-cherry-burgundy">
                <div className="relative bg-gradient-to-br from-cherry-red to-cherry-burgundy p-6 flex flex-col items-center">
                  <div className="absolute top-3 right-3 w-12 h-12 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain spin-element opacity-30"></div>
                  <div className="w-28 h-28 bg-[#7e1331] rounded-full border-4 border-cherry-burgundy shadow-lg flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src="https://storage.cherrybot.ai/AI1.png"
                      className="feature-image w-full h-full object-contain transform transition-all duration-300"
                      alt="AI Customer Support"
                    />
                  </div>
                  <h3 className="feature-title maladroit-font text-xl text-white uppercase mb-2 text-center transition-all duration-300">
                    AI Customer Support
                  </h3>
                  <p className="winky-sans-font text-sm text-cherry-cream text-center">
                    24/7 intelligent support to assist users with their queries
                    and issues
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="feature-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg border-4 border-cherry-burgundy">
                <div className="relative bg-gradient-to-br from-cherry-red to-cherry-burgundy p-6 flex flex-col items-center">
                  <div className="absolute bottom-3 left-3 w-12 h-12 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain float-element opacity-30"></div>
                  <div className="w-28 h-28 bg-[#7e1331] rounded-full border-4 border-cherry-burgundy shadow-lg flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src="https://storage.cherrybot.ai/scanner.png"
                      className="feature-image w-full h-full object-contain transform transition-all duration-300"
                      alt="Token Scanner"
                    />
                  </div>
                  <h3 className="feature-title maladroit-font text-xl text-white uppercase mb-2 text-center transition-all duration-300">
                    Advanced Token Scanner
                  </h3>
                  <p className="winky-sans-font text-sm text-cherry-cream text-center">
                    Deep analysis of tokens with real-time security and
                    performance metrics
                  </p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="feature-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg border-4 border-cherry-burgundy">
                <div className="relative bg-gradient-to-br from-cherry-red to-cherry-burgundy p-6 flex flex-col items-center">
                  <div className="absolute top-3 left-3 w-10 h-10 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-30"></div>
                  <div className="w-28 h-28 bg-[#7e1331] rounded-full border-4 border-cherry-burgundy shadow-lg flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src="https://storage.cherrybot.ai/nft.png"
                      className="feature-image w-full h-full object-contain transform transition-all duration-300"
                      alt="NFT Integration"
                    />
                  </div>
                  <h3 className="feature-title maladroit-font text-xl text-white uppercase mb-2 text-center transition-all duration-300">
                    NFT Integration
                  </h3>
                  <p className="winky-sans-font text-sm text-cherry-cream text-center">
                    Seamless NFT interactions directly within Telegram groups
                  </p>
                </div>
              </div>

              {/* Feature Card 4 */}
              <div className="feature-card transform transition-all duration-300 rounded-2xl overflow-hidden shadow-lg border-4 border-cherry-burgundy">
                <div className="relative bg-gradient-to-br from-cherry-red to-cherry-burgundy p-6 flex flex-col items-center">
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain spin-element opacity-30"></div>
                  <div className="w-28 h-28 bg-[#7e1331] rounded-full border-4 border-cherry-burgundy shadow-lg flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src="https://storage.cherrybot.ai/tracker.png"
                      className="feature-image w-full h-full object-contain transform transition-all duration-300"
                      alt="Airdrop Tracking"
                    />
                  </div>
                  <h3 className="feature-title maladroit-font text-xl text-white uppercase mb-2 text-center transition-all duration-300">
                    Airdrop Tracking
                  </h3>
                  <p className="winky-sans-font text-sm text-cherry-cream text-center">
                    Comprehensive tracking and management of airdrops and
                    giveaways
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="relative z-10 mt-16 text-center">
            <button
              onClick={() =>
                window.open("https://docs.cherrybot.co/", "_blank")
              }
              rel="noreferrer"
              className="bg-cherry-cream font-bold py-4 px-12 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-3 hover:translate-x-3 transition-all duration-200 transform-gpu text-xl inline-flex items-center gap-3 shadow-[8px_8px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font text-cherry-burgundy"
            >
              <span>View Feature Roadmap</span>
              <Icon icon="tabler:route" className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          ref={marketingContainerRef}
          className="marketing-section relative w-full py-20 bg-cherry-cream bg-opacity-80 overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain spin-element opacity-20"></div>
            <div className="absolute bottom-24 left-10 w-24 h-24 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain float-element opacity-20"></div>
            <div className="absolute top-1/3 left-10 w-16 h-16 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-20 rotate-45 pulse-element"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
              {/* Left Side - Image */}
              <div className="lg:w-1/2 relative">
                <div className="relative marketing-content z-10">
                  <div className="bg-cherry-red rounded-2xl border-4 border-cherry-burgundy p-8 shadow-[8px_8px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                    <div className="flex flex-col items-center justify-between gap-8">
                      <h3 className="maladroit-font text-3xl text-cherry-cream mb-3 text-center">
                        Cherry AI's Marketing Edge
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Marketing Metric 1 */}
                        <div className="bg-cherry-burgundy rounded-xl p-5 border-2 border-cherry-cream">
                          <div className="flex flex-col items-center text-center">
                            <Icon
                              icon="tabler:arrow-big-up"
                              className="w-10 h-10 text-cherry-cream mb-2"
                            />
                            <p className="winky-sans-font text-4xl font-bold text-cherry-cream mb-1">
                              320%
                            </p>
                            <p className="winky-sans-font text-sm text-cherry-cream">
                              Higher conversion rate than traditional marketing
                            </p>
                          </div>
                        </div>

                        {/* Marketing Metric 2 */}
                        <div className="bg-cherry-burgundy rounded-xl p-5 border-2 border-cherry-cream">
                          <div className="flex flex-col items-center text-center">
                            <Icon
                              icon="tabler:device-analytics"
                              className="w-10 h-10 text-cherry-cream mb-2"
                            />
                            <p className="winky-sans-font text-4xl font-bold text-cherry-cream mb-1">
                              10.2M
                            </p>
                            <p className="winky-sans-font text-sm text-cherry-cream">
                              Daily impressions across our channels
                            </p>
                          </div>
                        </div>

                        {/* Marketing Metric 3 */}
                        <div className="bg-cherry-burgundy rounded-xl p-5 border-2 border-cherry-cream">
                          <div className="flex flex-col items-center text-center">
                            <Icon
                              icon="tabler:users-group"
                              className="w-10 h-10 text-cherry-cream mb-2"
                            />
                            <p className="winky-sans-font text-4xl font-bold text-cherry-cream mb-1">
                              24K+
                            </p>
                            <p className="winky-sans-font text-sm text-cherry-cream">
                              New users joining weekly
                            </p>
                          </div>
                        </div>

                        {/* Marketing Metric 4 */}
                        <div className="bg-cherry-burgundy rounded-xl p-5 border-2 border-cherry-cream">
                          <div className="flex flex-col items-center text-center">
                            <Icon
                              icon="tabler:chart-pie"
                              className="w-10 h-10 text-cherry-cream mb-2"
                            />
                            <p className="winky-sans-font text-4xl font-bold text-cherry-cream mb-1">
                              42%
                            </p>
                            <p className="winky-sans-font text-sm text-cherry-cream">
                              Market share in the crypto AI space
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <a
                          href="https://docs.cherrybot.co/"
                          target="_blank"
                          rel="noreferrer"
                          className="bg-cherry-cream font-bold py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font text-cherry-burgundy"
                        >
                          <span>Read Whitepaper</span>
                          <Icon icon="tabler:file-text" className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-70 rotate-12 pulse-element"></div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-1/2 marketing-content">
                <div className="  flex flex-col justify-center items-start bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 md:p-8 relative overflow-hidden transform -rotate-1">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 paper-texture"></div>
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-60 -rotate-45 pulse-element"></div>

                  <h2 className="maladroit-font text-3xl md:text-4xl lg:text-5xl font-extrabold text-cherry-burgundy leading-tight mb-6 relative z-10">
                    Revolutionary Marketing Strategy
                  </h2>

                  <div className="space-y-4 winky-sans-font text-cherry-burgundy">
                    <p className="text-lg relative z-10">
                      Cherry AI's unique approach combines AI-powered analytics
                      with community-driven engagement, creating a powerful
                      marketing engine that consistently outperforms traditional
                      methods.
                    </p>

                    <ul className="space-y-3 relative z-10">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <p>
                          <span className="font-bold">
                            Community-First Approach:
                          </span>{" "}
                          Building loyal communities through genuine value and
                          engagement rather than traditional advertising.
                        </p>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <p>
                          <span className="font-bold">
                            Data-Driven Decisions:
                          </span>{" "}
                          Utilizing real-time analytics to optimize campaigns
                          and target the most receptive audiences.
                        </p>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <p>
                          <span className="font-bold">
                            Cross-Platform Integration:
                          </span>{" "}
                          Seamlessly connecting multiple platforms to create a
                          cohesive ecosystem where users can easily navigate.
                        </p>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <p>
                          <span className="font-bold">
                            Gamified Engagement:
                          </span>{" "}
                          Using quest-based systems to boost user participation
                          and retention while driving platform growth.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Cherry AI Business Section */}
        <div
          ref={businessContainerRef}
          className="business-section relative w-full py-20 bg-cherry-cream bg-opacity-80 overflow-hidden border-t-4 border-cherry-burgundy"
        >
          {/* Section Title */}
          <div className="relative z-10 mb-16 text-center max-w-4xl mx-auto px-4">
            <h2
              ref={businessTitleRef}
              className="maladroit-font text-5xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block"
            >
              Cherry AI Business
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
          </div>

          {/* Business Model Content */}
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Monetization Model */}
            <div className="business-item flex flex-col lg:flex-row justify-center items-center gap-8">
              <div className="lg:w-1/2">
                <div className="p-4 bg-cherry-red rounded-2xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017]">
                  <div className="bg-[#7e1331] rounded-xl border-2 border-cherry-burgundy p-6">
                    <p className="winky-sans-font text-xl text-cherry-cream">
                      Cherry AI monetizes Web3 services through ads, trending
                      features, and game engagement, similar to how Google
                      monetizes its Web2 services.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:w-fit flex   gap-4">
                <div className="relative">
                  <img
                    src="https://storage.cherrybot.ai/googlecherry.webp"
                    alt="Google Cherry Comparison"
                    className=" h-[10rem]  rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017]"
                  />
                </div>{" "}
              </div>
            </div>

            {/* Revenue Projection */}
            <div className="business-item flex flex-col lg:flex-row justify-center items-center gap-8">
              <div className="lg:w-1/2">
                <div className="p-4 bg-cherry-red rounded-2xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017]">
                  <div className="bg-[#7e1331] rounded-xl border-2 border-cherry-burgundy p-6">
                    <p className="winky-sans-font text-xl text-cherry-cream">
                      Cherry AI is projected to generate{" "}
                      <span className="text-green-400">$100 million</span> in
                      revenue during its first operational years.
                    </p>
                  </div>
                </div>
              </div>{" "}
              <div className="lg:w-fit flex   gap-4">
                <div className="relative">
                  <img
                    src="https://storage.cherrybot.ai/growthchart.webp"
                    alt="Growth Chart"
                    className="h-[10rem] rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017]"
                  />
                </div>
              </div>
            </div>

            {/* Revenue Streams */}
            <div className="business-item">
              <div className="text-center mb-10">
                <h3 className="maladroit-font text-3xl md:text-4xl text-cherry-burgundy mb-4">
                  Cherry AI Revenue
                </h3>
                <p className="winky-sans-font text-xl text-cherry-burgundy max-w-3xl mx-auto">
                  Cherry AI has the potential to make billions in revenue
                  through all its products and revenue streams
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Web3 Ads */}
                <div className="flex flex-col">
                  <div className="bg-cherry-red h-[5rem] rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                    <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                      <h4 className="maladroit-font text-xl text-cherry-red">
                        Web3 Ads
                      </h4>
                    </div>
                  </div>
                  <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                    <div className="bg-[#7e1331] rounded-lg p-2">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4">
                        <p className="winky-sans-font text-[13.5px] text-cherry-burgundy">
                          Cherry AI is positioned within the rapidly growing
                          Web3 ads industry, which has a projected market size
                          of{" "}
                          <span className="text-green-600 font-bold">
                            $21 billion
                          </span>{" "}
                          by{" "}
                          <span className="text-yellow-600 font-bold">
                            2029
                          </span>
                          . With our unique offerings, we're poised to capture
                          significant market share.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Presale and Launchpad */}
                <div className="flex flex-col">
                  <div className="bg-cherry-red h-[5rem] rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                    <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                      <h4 className="maladroit-font text-[18px] text-cherry-red">
                        Presale and Launchpad Industry
                      </h4>
                    </div>
                  </div>
                  <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                    <div className="bg-[#7e1331] rounded-lg p-2">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4">
                        <p className="winky-sans-font text-cherry-burgundy">
                          The Web3 presale market is another lucrative sector,
                          and Cherry AI is strategically positioned to monetize
                          through our multichain presale tracking and trending
                          features.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Engagement */}
                <div className="flex flex-col">
                  <div className="bg-cherry-red h-[5rem] rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                    <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                      <h4 className="maladroit-font text-xl text-cherry-red">
                        Community Engagement
                      </h4>
                    </div>
                  </div>
                  <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                    <div className="bg-[#7e1331] rounded-lg p-2">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-4">
                        <p className="winky-sans-font text-cherry-burgundy">
                          Cherry AI leverages community-driven features like
                          raids and quests to create new revenue streams. By
                          engaging our{" "}
                          <span className="text-green-600 font-bold">
                            10 million
                          </span>{" "}
                          active users, we drive value for both users and
                          projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Products */}
            <div className="business-item bg-cherry-red rounded-xl border-4 border-cherry-burgundy p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>

              <h3 className="maladroit-font text-3xl md:text-4xl text-cherry-cream mb-10 text-center">
                Cherry AI's Revenue Streams
              </h3>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2 space-y-6">
                  {/* Cherry Bot */}
                  <div className="flex flex-col">
                    <div className="bg-cherry-red rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                        <h4 className="maladroit-font text-xl text-cherry-red">
                          Cherry Bot
                        </h4>
                      </div>
                    </div>
                    <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                      <div className="bg-[#7e1331] rounded-lg p-2">
                        <div className="border-2 border-cherry-burgundy rounded-lg p-4">
                          <p className="winky-sans-font text-cherry-cream">
                            Our flagship product with{" "}
                            <span className="text-green-400 font-bold">
                              170K installs
                            </span>{" "}
                            and{" "}
                            <span className="text-yellow-400 font-bold">
                              143K active groups
                            </span>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cherry AI Trending & Raids */}
                  <div className="flex flex-col">
                    <div className="bg-cherry-red rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                        <h4 className="maladroit-font text-xl text-cherry-red">
                          Cherry AI Trending & Raids
                        </h4>
                      </div>
                    </div>
                    <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                      <div className="bg-[#7e1331] rounded-lg p-2">
                        <div className="border-2 border-cherry-burgundy rounded-lg p-4">
                          <div className="winky-sans-font text-cherry-cream space-y-2">
                            <p>
                              Trending Subscribers:{" "}
                              <span className="text-yellow-400 font-bold">
                                1.2M
                              </span>
                            </p>
                            <p>
                              Completed Raids:{" "}
                              <span className="text-yellow-400 font-bold">
                                366k
                              </span>
                            </p>
                            <p>
                              Current Revenue:{" "}
                              <span className="text-green-400 font-bold">
                                $500K/month
                              </span>{" "}
                              from trending slots and raids.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cherry Quest */}
                  <div className="flex flex-col">
                    <div className="bg-cherry-red rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                        <h4 className="maladroit-font text-xl text-cherry-red">
                          Cherry Quest
                        </h4>
                      </div>
                    </div>
                    <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                      <div className="bg-[#7e1331] rounded-lg p-2">
                        <div className="border-2 border-cherry-burgundy rounded-lg p-4">
                          <p className="winky-sans-font text-cherry-cream">
                            With over{" "}
                            <span className="text-green-400 font-bold">
                              10 million users
                            </span>
                            , Cherry Game is a major driver for user engagement
                            and revenue through task-based monetization.{" "}
                            <span className="text-green-400 font-bold">
                              $0.1 per user
                            </span>{" "}
                            for quest listing, supported by an active user base
                            of{" "}
                            <span className="text-yellow-400 font-bold">
                              10 million
                            </span>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 flex flex-col gap-6 justify-center">
                  <img
                    src="/src/public/P24stats.png"
                    alt="Cherry AI Statistics"
                    className="w-full rounded-xl border-4 border-cherry-burgundy shadow-inner"
                  />
                  <img
                    src="/src/public/P26stats.png"
                    alt="Cherry AI Growth Statistics"
                    className="w-full rounded-xl border-4 border-cherry-burgundy shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Growth Projections */}
            <div className="business-item">
              <div className="bg-cherry-red rounded-xl border-4 border-cherry-burgundy p-6 relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>

                <div className="p-1">
                  <div className="bg-cherry-red rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                    <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                      <h4 className="maladroit-font text-2xl text-cherry-red">
                        Aggressive Expansion
                      </h4>
                    </div>
                  </div>
                  <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                    <div className="bg-[#7e1331] rounded-lg p-2">
                      <div className="border-2 border-cherry-burgundy rounded-lg p-4">
                        <div className="winky-sans-font text-cherry-cream space-y-4">
                          <p>
                            In just three months, we've built a strong user base
                            and revenue stream. With the full rollout of ad
                            services and expanded raid features, we anticipate a{" "}
                            <span className="text-green-400 font-bold text-2xl">
                              5x
                            </span>{" "}
                            revenue increase within the next five months.
                          </p>
                          <div className="flex flex-col md:flex-row md:gap-12 gap-2">
                            <p>
                              Current:{" "}
                              <span className="text-green-400 font-bold">
                                $500K/month
                              </span>
                            </p>
                            <p>
                              5-Month Projection:{" "}
                              <span className="text-green-400 font-bold">
                                $3.3M+/month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row items-center gap-8">
                <div className="lg:w-1/2">
                  <h4 className="winky-sans-font text-xl text-cherry-burgundy mb-4">
                    Projected Revenue Growth
                  </h4>
                  <div className="p-1">
                    <div className="bg-cherry-red rounded-t-xl border-x-4 border-t-4 border-cherry-burgundy p-1">
                      <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3 flex items-center justify-center">
                        <h4 className="maladroit-font text-2xl text-cherry-red">
                          Expanding Features
                        </h4>
                      </div>
                    </div>
                    <div className="bg-cherry-red p-4 border-x-4 border-b-4 border-cherry-burgundy rounded-b-xl">
                      <div className="bg-[#7e1331] rounded-lg p-2">
                        <div className="border-2 border-cherry-burgundy rounded-lg p-4">
                          <p className="winky-sans-font text-cherry-cream">
                            With continued growth and the introduction of new
                            features, we project that within the next five
                            months, Cherry AI could achieve a revenue run rate
                            equivalent to{" "}
                            <span className="text-green-400 font-bold">
                              $8-9 million
                            </span>{" "}
                            annually.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-fit">
                  <img
                    src="https://storage.cherrybot.ai/futuregrowthchart.png"
                    alt="Future Growth Chart"
                    className="h-[15rem]  mt-14 w-[30rem] rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Why CherryAI Section */}
        <div
          ref={tokenomicsContainerRef}
          className="tokenomics-section relative w-full py-20 bg-gradient-to-b from-[#7d1231] to-cherry-burgundy border-t-4 border-cherry-burgundy overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-16 right-16 w-40 h-40 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain spin-element opacity-10"></div>
            <div className="absolute bottom-40 left-10 w-32 h-32 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain float-element opacity-10"></div>
            <div className="absolute top-40 left-20 w-24 h-24 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-10 rotate-12 pulse-element"></div>
          </div>

          {/* Section Title */}
          <div className="relative z-10 mb-10 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
            <h2
              ref={tokenomicsTitleRef}
              className="maladroit-font text-5xl md:text-6xl text-cherry-cream mb-6 relative inline-block"
            >
              Why $AIBOT?
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font text-2xl text-cherry-cream mt-6">
              A Self-Sustaining Ecosystem
            </p>
          </div>

          {/* Tokenomics Content */}
          <div
            ref={tokenomicsContentRef}
            className="max-w-6xl mx-auto px-4 space-y-6"
          >
            {/* Automated Buybacks & Burns */}
            <div className="tokenomics-item flex flex-col lg:flex-row items-start gap-4">
              <div className="lg:w-1/6 flex justify-center">
                <img
                  src="https://storage.cherrybot.ai/burnsystem.webp"
                  alt="Burn System"
                  className="w-24 h-24 object-contain hidden lg:block"
                />
              </div>
              <div className="lg:w-5/6 bg-cherry-red rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                <h3 className="maladroit-font text-2xl text-cherry-cream mb-3">
                  Automated Buybacks & Burns (
                  <span className="text-green-400">20%</span> of Cherry AI
                  Revenue)
                </h3>
                <div className="pl-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Allocated to automated buybacks and burns to support
                      $AIBOT's deflationary mechanism.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Based on current Cherry AI's growth revenue, this could
                      result in <span className="text-green-400">mid-6</span>{" "}
                      figures monthly being bought and burned.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      These actions will help establish price floors without
                      directly impacting token volumes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cherry Bomb */}
            <div className="tokenomics-item flex flex-col lg:flex-row items-start gap-4">
              <div className="lg:w-1/6 flex justify-center">
                <img
                  src="https://storage.cherrybot.ai/cherrybomb.webp"
                  alt="Cherry Bomb"
                  className="w-24 h-24 object-contain hidden lg:block"
                />
              </div>
              <div className="lg:w-5/6 bg-cherry-red rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                <h3 className="maladroit-font text-2xl text-cherry-cream mb-3">
                  Cherry Bomb (<span className="text-green-400">20%</span> of
                  Cherry AI Revenue)
                </h3>
                <div className="pl-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Deployed to assist volume across exchanges and support
                      liquidity pools.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Strategic buybacks will be executed at key price levels to
                      help establish and maintain strong price floors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Staking */}
            <div className="tokenomics-item flex flex-col lg:flex-row items-start gap-4">
              <div className="lg:w-1/6 flex justify-center">
                <img
                  src="https://storage.cherrybot.ai/staking.webp"
                  alt="Staking"
                  className="w-24 h-24 object-contain hidden lg:block"
                />
              </div>
              <div className="lg:w-5/6 bg-cherry-red rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                <h3 className="maladroit-font text-2xl text-cherry-cream mb-3">
                  Staking
                </h3>
                <div className="pl-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Will be used to buy $AIBOT and offer unique staking
                      opportunities with high APR. Stakers can access
                      third-party airdrops, which will be delivered to the
                      highest stakers by pool size.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Additionally, stakers gain access to a private chat room
                      with direct access to the team, enabling them to
                      participate in governance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ads, Project Promotions */}
            <div className="tokenomics-item flex flex-col lg:flex-row items-start gap-4">
              <div className="lg:w-1/6 flex justify-center">
                <img
                  src="https://storage.cherrybot.ai/adds.webp"
                  alt="Ads"
                  className="w-24 h-24 object-contain hidden lg:block"
                />
              </div>
              <div className="lg:w-5/6 bg-cherry-red rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                <h3 className="maladroit-font text-2xl text-cherry-cream mb-3">
                  Ads, Project Promotions, & More
                </h3>
                <div className="pl-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      To access Cherry AI's platform features, including ads and
                      project promotions, users must purchase $AIBOT.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Governance */}
            <div className="tokenomics-item flex flex-col lg:flex-row items-start gap-4">
              <div className="lg:w-1/6 flex justify-center">
                <img
                  src="https://storage.cherrybot.ai/govern.webp"
                  alt="Governance"
                  className="w-24 h-24 object-contain hidden lg:block"
                />
              </div>
              <div className="lg:w-5/6 bg-cherry-red rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#321017] p-6">
                <h3 className="maladroit-font text-2xl text-cherry-cream mb-3">
                  Token Governance
                </h3>
                <div className="pl-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Platform votes, bounties, and other governance activities
                      will be available to all $AIBOT holders.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="ph:asterisk-fill"
                      className="text-cherry-cream text-xl flex-shrink-0 mt-1"
                    />
                    <p className="winky-sans-font text-lg text-cherry-cream">
                      Stakers will receive{" "}
                      <span className="text-green-400">2X</span> the voting
                      power, allowing for greater influence on platform
                      decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Partners & Launchpads Section */}
        <div
          ref={partnersContainerRef}
          className="partners-section relative w-full py-20 bg-cherry-cream bg-opacity-80 overflow-hidden border-t-4 border-cherry-burgundy"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain spin-element opacity-20"></div>
            <div className="absolute bottom-24 left-10 w-24 h-24 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain float-element opacity-20"></div>
            <div className="absolute top-1/3 left-10 w-16 h-16 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain opacity-20 rotate-45 pulse-element"></div>
          </div>

          {/* Section Title */}
          <div className="relative z-10 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
            <h2
              ref={partnersTitleRef}
              className="maladroit-font text-5xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block"
            >
              Partners & Launchpads
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font text-xl mt-10 text-cherry-burgundy">
              Strategic alliances that help Cherry AI expand its reach and
              enhance its ecosystem
            </p>
          </div>

          {/* Partners Content */}
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
            {/* Tabs Buttons */}
            <div className="lg:w-1/2 flex flex-wrap gap-2 justify-center lg:justify-start items-start">
              {partners.map((partner, index) => (
                <button
                  key={partner.name}
                  onClick={() => setActivePartner(index)}
                  className={`partner-tab flex items-center gap-2 m-2 px-8 py-3 rounded-xl border-2 border-cherry-burgundy winky-sans-font hover:transform hover:-translate-y-1 transition-all duration-200 ${
                    activePartner === index
                      ? "bg-cherry-burgundy text-cherry-cream shadow-[4px_4px_0px_#321017]"
                      : "bg-cherry-red text-cherry-cream"
                  }`}
                >
                  <span className="winky-sans-font text-lg text-cherry-cream">
                    {partner.name}
                  </span>
                  <img
                    src={partner.logo}
                    className="w-7 ml-2 object-contain"
                    alt={`${partner.name} Logo`}
                  />
                </button>
              ))}
            </div>

            {/* Partner Content */}
            <div className="lg:w-1/2">
              <div
                ref={partnersContentRef}
                className="partner-content bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 md:p-8 relative overflow-hidden transform rotate-1"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30"></div>

                <h3 className="maladroit-font text-3xl md:text-4xl text-cherry-burgundy mb-4">
                  {partners[activePartner].name}
                </h3>

                <p className="winky-sans-font text-base text-cherry-burgundy mb-6">
                  {partners[activePartner].description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() =>
                      window.open(partners[activePartner].website, "_blank")
                    }
                    className="bg-cherry-red p-3 rounded-full hover:bg-cherry-burgundy transition-all duration-200"
                  >
                    <Icon
                      icon="tabler:world"
                      className="w-8 h-8 text-cherry-cream"
                    />
                  </button>
                  <img
                    src={partners[activePartner].logo}
                    className="w-16 h-16 object-contain"
                    alt={`${partners[activePartner].name} Logo`}
                  />
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

export default Insights;
