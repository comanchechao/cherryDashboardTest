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
  const businessContainerRef = useRef<HTMLDivElement>(null);
  const businessTitleRef = useRef<HTMLHeadingElement>(null);

  // State for active tab
  const [activeTab, setActiveTab] = useState<number>(0);

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
        ".business-item",
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

    // Call animation functions when tabs change
    animateTabContent();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeTab]); // Re-run when tabs change

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

                  <span className="  maladroit-font text-xl md:text-5xl lg:text-4xl font-extrabold text-cherry-black leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center">
                    Cherry Revenue Growth
                  </span>

                  <span className="     winky-sans-font text-lg md:text-2xl text-cherry-burgundy relative mb-6">
                    Market Analytics & Revenue Data
                  </span>

                  <p className="  winky-sans-font text-sm md:text-xl text-cherry-burgundy mb-6 max-w-3xl relative">
                    Explore in-depth market analytics, revenue projections, and
                    upcoming features that make Cherry AI a{" "}
                    <span className="   relative">revolutionary platform</span>{" "}
                    in the crypto space.
                  </p>
                </div>

                <div className="  flex flex-col sm:flex-row items-center gap-6 relative z-20">
                  <button
                    onClick={() => {
                      window.open("https://docs.cherrybot.co/", "_blank");
                    }}
                    className="text-white bg-cherry-red    md:py-4 py-2 md:px-10 px-4   rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-2   hover: "
                  >
                    <span className="relative text-lg winky-sans-font text-cherry-cream">
                      View Docs
                    </span>
                    <Icon
                      className="text-cherry-cream"
                      icon="tabler:file-text"
                      width={20}
                      height={20}
                    />
                  </button>

                  <button
                    onClick={() => {
                      window.open("https://t.me/CherryTGBot", "_blank");
                    }}
                    className="bg-cherry-cream   md:py-4 py-2 md:px-10 px-4    rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-2   hover: "
                  >
                    <span className="relative text-lg winky-sans-font text-cherry-burgundy">
                      Explore Cherry Bot
                    </span>
                    <Icon
                      className="text-cherry-burgundy"
                      icon="lucide:bot"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              {/* Right Side - Floating Mascot/Chart */}
              <div className="w-full relative  max-w-4xl lg:p-10 p-4   ">
                <div className="relative z-10   float-element">
                  <img
                    src="https://storage.cherrybot.ai/chart.png"
                    alt="Cherry Analytics"
                    className="h-full  p-10  mx-auto rounded-xl border-4 border-cherry-burgundy  "
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
              className="maladroit-font text-xl md:text-5xl text-cherry-burgundy mb-6 relative inline-block"
            >
              Market Metrics
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font text-lg md:text-xl  md:mt-10 mt-3 text-cherry-burgundy">
              Cherry AI's powerful position in the growing crypto market and our
              impressive platform statistics
            </p>
          </div>

          {/* Stats Tabs */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-6 py-3 rounded-t-lg winky-sans-font text-lg    transition-all duration-300 ${
                  activeTab === 0
                    ? "bg-cherry-red text-white border-t-2 border-x-2 border-cherry-burgundy"
                    : "bg-cherry-cream text-cherry-burgundy border-2 border-cherry-burgundy border-opacity-50"
                }`}
              >
                Market Size
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-6 py-3 rounded-t-lg winky-sans-font text-lg    transition-all duration-300 ${
                  activeTab === 1
                    ? "bg-cherry-red text-white border-t-2 border-x-2 border-cherry-burgundy"
                    : "bg-cherry-cream text-cherry-burgundy border-2 border-cherry-burgundy border-opacity-50"
                }`}
              >
                User Growth
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`px-6 py-3 rounded-t-lg winky-sans-font text-lg    transition-all duration-300 ${
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
                        900K+
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
                        Total Groups
                      </h3>
                    </div>
                  </div>
                  <div className="bg-cherry-burgundy p-6 border-x-4 border-b-4 border-cherry-burgundy rounded-b-2xl">
                    <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 min-h-[14rem] flex flex-col items-center justify-center">
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
                        175K+
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
                        141K+
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
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
                      <p className="winky-sans-font text-5xl    text-cherry-red mb-4">
                        1M+
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
              onClick={() =>
                window.open("https://t.me/cherrycommunity", "_blank")
              }
              rel="noreferrer"
              className="  bg-cherry-red   md:py-4 py-2 md:px-10 px-4  rounded-xl border border-b-6 border-r-6 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-2 hover:translate-x-2 transition-all duration-200 transform-gpu flex items-center gap-2  ] hover:  winky-sans-font text-white"
            >
              <span className="winky-sans-font text-lg text-cherry-cream">
                Learn More
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
        {/* Placeholder for removed trending section that is now in features.tsx */}
        <div
          ref={marketingContainerRef}
          className="marketing-section relative w-full py-20 bg-cherry-cream bg-opacity-80 overflow-hidden"
        >
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
              {/* Left Side - Image */}
              <div className="lg:w-1/2 relative">
                <div className="relative marketing-content z-10">
                  <div className="bg-cherry-red rounded-2xl border-4 border-cherry-burgundy p-8   transform hover:-translate-y-2 transition-all duration-300">
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
                            <p className="winky-sans-font text-4xl    text-cherry-cream mb-1">
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
                            <p className="winky-sans-font text-4xl    text-cherry-cream mb-1">
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
                            <p className="winky-sans-font text-4xl    text-cherry-cream mb-1">
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
                            <p className="winky-sans-font text-4xl    text-cherry-cream mb-1">
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
                          className="bg-cherry-cream    py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2   hover:  winky-sans-font text-cherry-burgundy"
                        >
                          <span>Read Whitepaper</span>
                          <Icon icon="tabler:file-text" className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-1/2 marketing-content">
                <div className="  flex flex-col justify-center items-start bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 md:p-8 relative overflow-hidden transform -rotate-1">
                  <h2 className="maladroit-font text-xl md:text-4xl lg:text-5xl font-extrabold text-cherry-burgundy leading-tight mb-6 relative z-10">
                    Revolutionary Marketing Strategy
                  </h2>

                  <div className="space-y-4 winky-sans-font text-cherry-burgundy">
                    <p className="md:text-lg text-sm relative z-10">
                      Cherry AI's unique approach combines AI-powered analytics
                      with community-driven engagement, creating a powerful
                      marketing engine that consistently outperforms traditional
                      methods.
                    </p>

                    <ul className="space-y-3 relative z-10">
                      <li className="flex items-start gap-3">
                        <div className="w-10 h-10 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl   ">1</span>
                        </div>
                        <p>
                          <span className="  ">Community-First Approach:</span>{" "}
                          Building loyal communities through genuine value and
                          engagement rather than traditional advertising.
                        </p>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="w-10 h-10 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white  text-xl ">2</span>
                        </div>
                        <p>
                          <span className="  ">Data-Driven Decisions:</span>{" "}
                          Utilizing real-time analytics to optimize campaigns
                          and target the most receptive audiences.
                        </p>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="w-10 h-10 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white  text-xl ">3</span>
                        </div>
                        <p>
                          <span className="  ">
                            Cross-Platform Integration:
                          </span>{" "}
                          Seamlessly connecting multiple platforms to create a
                          cohesive ecosystem where users can easily navigate.
                        </p>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="w-10 h-10 mt-1 bg-cherry-red rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl  ">4</span>
                        </div>
                        <p>
                          <span className="  ">Gamified Engagement:</span> Using
                          quest-based systems to boost user participation and
                          retention while driving platform growth.
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
              className="maladroit-font text-xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block"
            >
              Cherry AI Business
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
          </div>

          {/* Business Model Content */}
          <div className="max-w-7xl  mx-auto px-4 space-y-12">
            {/* Monetization Model */}
            <div className="business-item flex flex-col lg:flex-row justify-center items-center gap-8">
              <div className="lg:w-1/2">
                <div className="p-4 bg-cherry-red rounded-2xl border-4 border-cherry-burgundy  ]">
                  <div className="bg-[#7e1331] rounded-xl border-2 border-cherry-burgundy p-6">
                    <p className="winky-sans-font text-lg md:text-xl text-cherry-cream">
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
                    className=" h-[10rem]  rounded-xl border-4 border-cherry-burgundy  ]"
                  />
                </div>{" "}
              </div>
            </div>

            {/* Revenue Projection */}
            <div className="business-item flex flex-col lg:flex-row justify-center items-center gap-8">
              <div className="lg:w-1/2">
                <div className="p-4 bg-cherry-red rounded-2xl border-4 border-cherry-burgundy  ]">
                  <div className="bg-[#7e1331] rounded-xl border-2 border-cherry-burgundy p-6">
                    <p className="winky-sans-font text-lg md:text-xl text-cherry-cream">
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
                    className="h-[10rem] rounded-xl border-4 border-cherry-burgundy  ]"
                  />
                </div>
              </div>
            </div>

            {/* Revenue Streams */}
            <div className="business-item">
              <div className="text-center mb-10">
                <h3 className="maladroit-font text-xl md:text-4xl text-cherry-burgundy mb-4">
                  Cherry AI Revenue
                </h3>
                <p className="winky-sans-font text-lg md:text-xl text-cherry-burgundy max-w-3xl mx-auto">
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
                          <span className="text-green-600   ">$21 billion</span>{" "}
                          by <span className="text-yellow-600   ">2029</span>.
                          With our unique offerings, we're poised to capture
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
                      <h4 className="maladroit-font text-lg md:text-[18px] text-cherry-red">
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
                      <h4 className="maladroit-font text-lg md:text-xl text-cherry-red">
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
                          <span className="text-green-600   ">10 million</span>{" "}
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

              <h3 className="maladroit-font text-xl md:text-4xl text-cherry-cream mb-10 text-center">
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
                            <span className="text-green-400   ">
                              178K installs
                            </span>{" "}
                            and{" "}
                            <span className="text-yellow-400   ">
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
                              <span className="text-yellow-400   ">1.2M</span>
                            </p>
                            <p>
                              Completed Raids:{" "}
                              <span className="text-yellow-400   ">1M</span>
                            </p>
                            <p>
                              Current Revenue:{" "}
                              <span className="text-green-400   ">
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
                            <span className="text-green-400   ">
                              10 million users
                            </span>
                            , Cherry Game is a major driver for user engagement
                            and revenue through task-based monetization.{" "}
                            <span className="text-green-400   ">
                              $0.1 per user
                            </span>{" "}
                            for quest listing, supported by an active user base
                            of{" "}
                            <span className="text-yellow-400   ">
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
                    src="https://storage.cherrybot.ai/P24stats.png"
                    alt="Cherry AI Statistics"
                    className="w-full rounded-xl border-4 border-cherry-burgundy shadow-inner"
                  />
                  <img
                    src="https://storage.cherrybot.ai/P26stats.png"
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
                      <h4 className="maladroit-font text-lg md:text-2xl text-cherry-red">
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
                            <span className="text-green-400    text-2xl">
                              5x
                            </span>{" "}
                            revenue increase within the next five months.
                          </p>
                          <div className="flex flex-col md:flex-row md:gap-12 gap-2">
                            <p>
                              Current:{" "}
                              <span className="text-green-400   ">
                                $500K/month
                              </span>
                            </p>
                            <p>
                              5-Month Projection:{" "}
                              <span className="text-green-400   ">
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
                        <h4 className="maladroit-font text-lg md:text-2xl text-cherry-red">
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
                            <span className="text-green-400   ">
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
                    className="h-[15rem]  mt-14 w-[30rem] rounded-xl border-4 border-cherry-burgundy  ]"
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
