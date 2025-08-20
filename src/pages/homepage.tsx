import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import "../css/cherry.css";
import "../css/homepage.css";
import "../css/index.css";
import "../css/feature-cards.css";
import "../css/hero-animations.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import RevenueStreams from "../components/RevenueStreams";
import VideoPlayer from "../components/VideoPlayer";
import BinanceSupportSection from "../components/BinanceSupportSection";
import MarketForcast from "../components/MarketForcast";
import { StatCards, CommunityDataModels } from "./homepage/components";

const customAnimations = `
  @keyframes wiggle {
    0%, 100% { transform: rotate(-1deg); }
    50% { transform: rotate(1deg); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes floatExtra {
    0% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-90px) translateX(0); }
    50% { transform: translateY(-90px) translateX(90px); }
  
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HomePage: React.FC = () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Partner data
  const partners = [
    {
      name: "PancakeSwap",
      logo: "/pancakeSwapLogo.png",
      description:
        "PancakeSwap is a leading DEX on BNB Chain. Cherry has integrated PancakeSwap into our tech stack—powering on-chain tracking, liquidity insights, and seamless campaign activations across our products.",
      website: "https://pancakeswap.finance/",
    },
    {
      name: "Binance Wallet",
      logo: "/binanceLogo.png",
      description:
        "Binance Wallet has supported Cherry with fundraising initiatives and is integrated into our tech stack, enabling smoother user onboarding and wallet connectivity across our products.",
      website: "https://www.binance.com/en/web3wallet",
    },
    {
      name: "Meteora",
      logo: "/meteoraLogo.png",
      description:
        "Meteora is integrated into Cherry's tech stack, enhancing liquidity, automation, and on-chain data capabilities across our suite.",
      website: "https://www.meteora.ag/",
    },
    {
      name: "NOTCOIN",
      logo: "https://storage.cherrybot.ai/notcoin.png",
      description:
        "Cherry AI and Notcoin have formed a strategic partnership to mutually introduce and promote each other within our respective communities. Notcoin has brought significant traffic and community engagement to Cherry AI through multiple tasks, helping to expand our reach. In return, Cherry AI will be introducing Notcoin to our community.",
      website: "https://notco.in/",
    },
    {
      name: "COIN TERMINAL",
      logo: "https://storage.cherrybot.ai/coinTerminal.webp",
      description:
        "Cherry AI has partnered with Coin Terminal, a leading launchpad, to enhance our mutual exposure and service offerings. Coin Terminal will help Cherry AI gain greater visibility through their extensive network. Additionally, Cherry AI is working on integrating Coin Terminal into our features, enabling us to track their project and include them in our trending lists.",
      website: "https://www.cointerminal.com/",
    },
    {
      name: "Fjord Foundry",
      logo: "https://storage.cherrybot.ai/FjordFoundryLogo.png",
      description:
        "Fjord Foundry provides decentralized and automated liquidity provision strategies, aiding projects in efficiently managing their liquidity needs. Similar to the partnership with PinkSale, Cherry Bot integrates with Fjord Foundry to offer users tools to track liquidity and on-chain data, helping projects gain visibility in the rapidly evolving web3 space.",
      website: "https://www.fjordfoundry.com/",
    },
    {
      name: "AWS",
      logo: "https://storage.cherrybot.ai/aws.png",
      description:
        "AWS is known for its security, high performance, and accessibility. It currently hosts some of the largest firms in the world including Netflix, Airbnb, NASA, and General Electric. Through an AWS Grant, Cherry AI gains exclusive access to AWS backend services, APIs, and data center features. These resources have helped the protocol become a pioneering force in the AI web3 market.",
      website: "https://aws.amazon.com/",
    },
    {
      name: "BITCOINOS",
      logo: "https://storage.cherrybot.ai/Bos.webp",
      description:
        "BitcoinOS is a modular Bitcoin Layer 2 that brings smart contract capability and scalability to the Bitcoin network. By partnering with Cherry, BitcoinOS benefits from our AI tracking tools and Telegram bot integrations to monitor on-chain activity and drive community engagement for ecosystem projects. This collaboration enables builders on BitcoinOS to gain early visibility and market traction directly within the Cherry network.",
      website: "https://bitcoinos.build/",
    },
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
  ];

  const [heroAnimated, setHeroAnimated] = useState(false);

  const featureCard1Ref = useRef<HTMLDivElement>(null);
  const featureCard2Ref = useRef<HTMLDivElement>(null);
  const featureCard3Ref = useRef<HTMLDivElement>(null);
  const featureCard4Ref = useRef<HTMLDivElement>(null);

  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const partnersContainerRef = useRef<HTMLDivElement>(null);
  const partnersTitleRef = useRef<HTMLHeadingElement>(null);

  // Newsletter subscription states
  // const [email, setEmail] = useState<string>("");
  // const [isSubscribing, setIsSubscribing] = useState(false);
  // const [successToastVisible, setSuccessToastVisible] = useState(false);
  // const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
  //   useState(false);

  const [activeTab] = useState<"manual" | "autobot">("manual");

  const [activePartner, setActivePartner] = useState<number>(0);

  // Embla carousel setup
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

 
  const handleExploreBot = () => {
    window.open("https://t.me/CherryTGBot", "_blank");
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);

    // Video setup is now handled by VideoPlayer components

    setTimeout(() => {
      setHeroAnimated(true);

      // Set initial states for all hero elements
      gsap.set(
        [
          ".hero-content-wrapper",
          ".vintage-paper",
          ".hero-title-main",
          ".hero-subtitle",
          ".hero-description",
          ".hero-buttons",
          ".hero-mascot",
          ".decorative-elements div",
        ],
        {
          opacity: 0,
        }
      );

      // Set specific initial transforms
      gsap.set(".hero-content-wrapper", { y: 30 });
      gsap.set(".vintage-paper", { y: 20, scale: 0.95, rotation: -2 });
      gsap.set(".hero-title-main", { y: 15 });
      gsap.set(".hero-subtitle", { y: 15 });
      gsap.set(".hero-description", { y: 15 });
      gsap.set(".hero-buttons", { y: 15 });
      gsap.set(".hero-mascot", { y: 80, scale: 0.9 });
      gsap.set(".hero_floor", { scaleY: 0, transformOrigin: "bottom" });
      gsap.set(".decorative-elements div", { scale: 0.6, rotation: 10 });

      const heroTimeline = gsap.timeline();

      heroTimeline.to(".hero-content-wrapper", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Paper unfold animation
      heroTimeline.to(
        ".vintage-paper",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        0.2
      );

      // Hero floor animation
      heroTimeline.to(
        ".hero_floor",
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2
      );

      // Title animations
      heroTimeline.to(
        ".hero-title-main",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        0.8
      );

      heroTimeline.to(
        ".hero-subtitle",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.0
      );

      heroTimeline.to(
        ".hero-description",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.2
      );

      // Button animations
      heroTimeline.to(
        ".hero-buttons",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.4
      );

      // Mascot bounce in animation
      heroTimeline.to(
        ".hero-mascot",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        0.5
      );

      // Decorative elements animations
      heroTimeline.to(
        ".decorative-elements div",
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        1.6
      );

      // Setup continuous animations
      gsap.to(".hero-mascot", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".vintage-paper", {
        y: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Add GSAP hover animations for vintage-paper
      const vintagePaper = document.querySelector(".vintage-paper");
      if (vintagePaper) {
        vintagePaper.addEventListener("mouseenter", () => {
          gsap.to(vintagePaper, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        vintagePaper.addEventListener("mouseleave", () => {
          gsap.to(vintagePaper, {
            rotation: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    }, 100);

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
        ".partner-content",
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "-=0.5"
      );

    // Call animation function
    animatePartnerContent();

    try {
      // Section title animation
      gsap.to(sectionTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: "top 80%",
        },
      });

      // Feature cards animation
      const featureCards = document.querySelectorAll(".feature-card");

      featureCards.forEach((card, index) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.2 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      const spotlightSections = document.querySelectorAll(
        ".section_sniper_spotlight"
      );

      spotlightSections.forEach((section) => {
        const spotlightContentRef = section.querySelector(
          "[data-spotlight-content]"
        );
        const spotlightVideoRef = section.querySelector(
          "[data-spotlight-video]"
        );

        if (spotlightContentRef && spotlightVideoRef) {
          gsap.fromTo(
            spotlightContentRef,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
              },
            }
          );

          gsap.fromTo(
            spotlightVideoRef,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
              },
            }
          );

          const paperElement =
            spotlightVideoRef.querySelector(".vintage-paper");
          if (paperElement) {
            gsap.to(paperElement, {
              y: -10,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      });

      // Upcoming Features section animation
      const upcomingFeaturesSection = document.querySelector(
        ".wrapper_sections > div:nth-last-child(2)"
      );
      if (upcomingFeaturesSection) {
        gsap.fromTo(
          upcomingFeaturesSection,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: upcomingFeaturesSection,
              start: "top 100%",
            },
          }
        );

        const videoContainer =
          upcomingFeaturesSection.querySelector(".rounded-2xl");
        if (videoContainer) {
          gsap.fromTo(
            videoContainer,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              scale: 0.9,
              duration: 0.8,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: videoContainer,
                start: "top 85%",
              },
            }
          );
        }
      }

      // Add hover animations to the feature cards
      featureCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card.querySelector("img"), {
            y: -10,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card.querySelector("img"), {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    } catch (error) {
      console.error("Animation error:", error);
    }

    // Cleanup event listeners
    return () => {
      const elements = [
        featureCard1Ref.current,
        featureCard2Ref.current,
        featureCard3Ref.current,
        featureCard4Ref.current,
      ];

      elements.forEach((element) => {
        if (element) {
          element.replaceWith(element.cloneNode(true));
        }
      });

      const scrollButtons = [
        document.getElementById("scrollButton"),
        document.getElementById("scrollButton2"),
        document.getElementById("scrollButton3"),
      ];

      scrollButtons.forEach((button) => {
        if (button) {
          button.replaceWith(button.cloneNode(true));
        }
      });

      gsap.killTweensOf(".hero-mascot");
      gsap.killTweensOf(".vintage-paper");

      // Clean up vintage-paper hover listeners
      const vintagePaper = document.querySelector(".vintage-paper");
      if (vintagePaper) {
        vintagePaper.replaceWith(vintagePaper.cloneNode(true));
      }
    };
  }, [activePartner]);

  return (
    <>
      <div id="triggerXoverFlow" className=" ">
        <div
          ref={heroSectionRef}
          className={`hero_section  scroll-container1 ${
            heroAnimated ? "hero-animated" : ""
          }`}
          id="home"
        >
          <Navbar />

          {/* Radial Energy Field Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-[var(--color-accent)]/20 via-[var(--color-bg-secondary)]/40 to-[var(--color-bg-primary)] opacity-60"></div>

            {/* Concentric Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-[800px] h-[800px] border border-[var(--color-accent)]/10 rounded-full animate-spin-slow"></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--color-accent)]/8 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "30s",
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[var(--color-accent)]/6 rounded-full animate-spin-slow"
                style={{ animationDuration: "25s" }}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-[var(--color-accent)]/40 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float-slow"></div>
            <div
              className="absolute bottom-40 left-1/4 w-4 h-4 bg-[var(--color-accent)]/50 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[var(--color-accent)]/35 rounded-full animate-float-slow"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div className=" w-full flex  pt-48 lg:flex-row flex-col items-end lg:items-start h-full relative z-10">
            <div className="  w-full mx-auto">
              <div className="hero-content-wrapper flex  flex-col lg:flex-row items-center h-full lg:h-auto mb-16 relative z-10 px-10">
                <div className="flex lg:w-1/2 w-full items-start justify-center flex-col px-16">
                  <div className="  ">
                    <h1 className="maladroit-font flex items-center justify-start text-5xl md:text-6xl lg:text-6xl font-bold text-[var(--color-text-primary)] leading-tight   max-w-4xl mx-auto">
                      Cherry
                      <span className="text-[var(--color-accent)]">
                        AI
                      </span>{" "}
                      <span className="ml-3">Robot</span>
                      <span className="block relative">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
                      </span>
                    </h1>

                    <p className="hero-description my-10 text-left text-lg lg:text-2xl text-[var(--color-text-secondary)]/80   max-w-3xl mx-auto leading-7">
                      Ecosystem of products that gather data to build data
                      models for AI powered robots.
                    </p>
                  </div>

                  <div className="hero-buttons w-full flex flex-col sm:flex-row items-start justify-start gap-6 mb-9">
                    <button
                      onClick={() => {
                        window.open("/dashboard");
                      }}
                      className="btn-wave-primary cursor-pointer w-96 px-24 justify-self-start"
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
                      <span className="btn-text">Dashboard</span>
                    </button>
                  </div>
                </div>

                <div className="relative lg:w-1/2 w-full max-w-4xl mx-auto">
                  <div className="w-full aspect-[16/9] bg-transparent  relative overflow-hidden">
                    {/* Panel Content Placeholder */}
                    <div className="relative w-full h-full pt-12">
                      <VideoPlayer
                        src="/loop.mp4"
                        className="w-full h-auto max-h-[60vh] object-cover"
                        autoPlay={true}
                      />
                    </div>
                    {/* Inner Glow Effect */}
                  </div>

                  {/* Floating Left Toolbar */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" ">
          <div
            ref={partnersContainerRef}
            id="partners"
            className=" h-full relative w-full py-12 md:px-0 px-4 overflow-hidden"
          >
            {/* Advanced Background Effects */}
            <div className="absolute inset-0">
              {/* Multi-layered Radial Gradients */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(67,103,201,0.12)_0%,transparent_60%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(67,103,201,0.08)_0%,transparent_60%)]"></div>

              {/* Animated Grid Pattern */}
              <div className="absolute inset-0 opacity-15">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                  }}
                ></div>
              </div>
            </div>

            {/* Floating Elements Layer */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Orbital Rings */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-80 h-80 border border-[#4367c9]/15 rounded-full animate-spin-slow"
                  style={{ animationDuration: "40s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#4367c9]/10 rounded-full animate-spin-slow"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "35s",
                  }}
                ></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-20 left-1/4 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>
              <div
                className="absolute top-40 right-1/3 w-3 h-3 bg-[var(--color-accent)]/40 rounded-full animate-float-slow"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-[var(--color-accent)]/35 rounded-full animate-float"
                style={{ animationDelay: "3s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/25 rounded-full animate-float-slow"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="relative z-10 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
              <h2
                ref={partnersTitleRef}
                className="maladroit-font text-3xl md:text-5xl text-[var(--color-text-primary)] mb-6 relative inline-block"
              >
                Partners & Integrations
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
              </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row z-30 gap-8">
              {/* Partners Tabs - Left Side */}
              <div className="lg:w-full grid lg:grid-cols-5 grid-cols-2 place-items-center gap-3  ">
                {partners.map((partner, index) => (
                  <button
                    key={partner.name}
                    onClick={() => {
                      setActivePartner(index);
                      gsap.set(".partner-content", { opacity: 0 });
                      gsap.to(".partner-content", {
                        opacity: 1,
                        duration: 0.8,
                        clearProps: "all",
                      });
                    }}
                    className={`partner-tab flex items-center w-full gap-3 px-6 py-4 justify-center rounded-[2px] border transition-all duration-300 hover:transform hover:-translate-y-1 ${
                      activePartner === index
                        ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[0_8px_32px_rgba(67,103,201,0.3)]"
                        : "bg-[var(--color-glass)]   text-[var(--color-text-primary)] border-[var(--color-glass-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                    }`}
                  >
                    <span className="winky-sans-font    text-sm md:text-lg font-medium">
                      {partner.name}
                    </span>
                    <img
                      src={partner.logo}
                      className="w-10 md:ml-2 object-contain"
                      alt={`${partner.name} Logo`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <MarketForcast />
          <StatCards
            id="features"
            title="CherryAI Bot Ecosystem Users"
            stats={[
              { value: "200K+", label: "Active Communities" },
              { value: "8M+", label: "Daily Prompts" },
              { value: "815K+", label: "Active Users" },
              { value: "100K+", label: "Daily Users" },
            ]}
            className="!mt-24"
          />
        </div>
        <div className="section_sniper_spotlight py-24 relative overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0">
            {/* Multi-layered Radial Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-18">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(67,103,201,0.09) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(67,103,201,0.09) 1px, transparent 1px)`,
                  backgroundSize: "70px 70px",
                }}
              ></div>
            </div>
          </div>

          {/* Floating Elements Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-72 h-72 border border-[#4367c9]/18 rounded-full animate-spin-slow"
                style={{ animationDuration: "42s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-[#4367c9]/12 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "36s",
                }}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--color-accent)]/10 rounded-full animate-float   "></div>
            <div
              className="absolute bottom-40 right-10 w-16 h-16 bg-[var(--color-accent)]/8 rounded-full animate-float   "
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/4 w-12 h-12 bg-[var(--color-accent)]/6 rounded-full animate-float   "
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* Connection Lines SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="sniperConnectionGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.05"
                  />
                </linearGradient>
              </defs>
              <path
                d="M50 50 Q 150 30 250 50 T 450 50"
                stroke="url(#sniperConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#sniperConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Header Section */}
            <div className="text-center mb-16" data-spotlight-content>
              {/* Eyebrow Badge */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-[var(--color-accent)]/10   border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform -  hover:rotate-0 transition-all duration-300">
                  <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                    SniperAI Bot
                  </span>
                </div>
              </div>

              {/* Main Title */}
              <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
                Using Trading Activity To Build Data Models For AI Robots
              </h2>

              {/* Description Card */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                  <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                    CherryAI Bot has created 2 products for traders, a trading
                    bot and an analytics bot with 815k+ combined users. The data
                    gathered from the usage of these products will be used to
                    build data models for AI powered robots.
                  </p>

                  {/* Bottom Decorative Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                </div>
              </div>
            </div>

            {/* Video Showcase Section */}
            <div className="mb-20" data-spotlight-video>
              <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                {/* Video Container */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                  {/* Desktop Video Container */}
                  <div className="md:block hidden bg-[var(--color-glass)] p-4    rounded-[20px] p-2 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                    <div className="relative aspect-video overflow-hidden rounded-[16px]  ">
                      <VideoPlayer
                        src="/sniperRobot.mp4"
                        className="w-full h-auto max-h-[60vh] object-cover"
                        autoPlay={true}
                      />
                    </div>
                  </div>

                  {/* CTA Section */}
                </div>

                {/* Tabs Section */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[28px] p-8 relative overflow-hidden transform md:  hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl maladroit-font text-[var(--color-text-primary)] mb-8 text-center">
                        Trading Data Can Supercharge The Neural Networks of
                        Robots
                      </h3>

                      {/* Tab Content */}
                      <div className="min-h-[400px]">
                        {activeTab === "manual" && (
                          <div className="space-y-4 animate-fadeIn">
                            {/* Fastest Trading Bot Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="mdi:brain"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Pattern Recognition
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Data gathered from trading activity can be
                                    used to build data models that help robots
                                    recognize patterns similar to humans.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Advanced Trading Features Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="hugeicons:game-controller-03"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Game Theory
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Trading data provides excellent game theory
                                    data models that AI robots can use to better
                                    predict human reactions.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Scales with Volume Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="mdi:chart-line"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Behavior Recognition
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Data on traders can be a goldmine for
                                    behavior recognition, which is essentially
                                    spotting patterns in how humans act under
                                    certain conditions.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Management AI Section */}
        <div
          id="community"
          className="section_sniper_spotlight lg:py-24 relative overflow-hidden"
        >
          {/* Advanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Multi-layered Radial Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.11)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(67,103,201,0.07)_0%,transparent_70%)]"></div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-14 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(67,103,201,0.07) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(67,103,201,0.07) 1px, transparent 1px)`,
                  backgroundSize: "75px 75px",
                }}
              ></div>
            </div>
          </div>

          {/* Floating Elements Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-68 h-68 border border-[#4367c9]/14 rounded-full animate-spin-slow"
                style={{ animationDuration: "44s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-[#4367c9]/9 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "39s",
                }}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/10 rounded-full animate-float   "></div>
            <div
              className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/8 rounded-full animate-float   "
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-accent)]/6 rounded-full animate-float   "
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* Connection Lines SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="managementConnectionGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.05"
                  />
                </linearGradient>
              </defs>
              <path
                d="M50 50 Q 150 30 250 50 T 450 50"
                stroke="url(#managementConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#managementConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
              {/* Left side - Video Container */}{" "}
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-content
              >
                <div className="spotlight-content-wrapper">
                  {/* Eyebrow Badge */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-[var(--color-accent)]/10   border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform -  hover:rotate-0 transition-all duration-300">
                      <span className="text-xl md:text-lg winky-sans-font text-[var(--color-accent)]">
                        Community AI
                      </span>
                    </div>
                  </div>

                  {/* Main Title */}
                  <h2 className="text-2xl md:text-4xl text-center maladroit-font text-[var(--color-text-primary)] mb-6">
                    200k+ Communities Contributing Data For Digital Robots
                  </h2>

                  {/* Description */}
                  <p className="winky-sans-font text-xl text-[var(--color-text-secondary)]/90 mb-8">
                    Community AI Bots gather data from Web3 communities to build
                    three different types of data models for AI powered robots.
                  </p>

                  {/* Info Modal */}
                  <CommunityDataModels />

                  {/* CTA Button */}
                  <button
                    onClick={handleExploreBot}
                    className="btn-wave-primary cursor-pointer flex items-center mt-4 gap-2 text-xl"
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
                    <span className="btn-text">Explore Cherry Bot</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
             
              {/* Right side - Content */}
            </div>
          </div>
        </div>
 
        <BinanceSupportSection />
        {/* Cherry AI in the News Section */}
        <div className="news-section relative w-full py-20 mt-16 md:mt-8 bg-opacity-80 overflow-hidden">
          {/* Floating Elements Layer */}
          <div className="absolute inset-0   pointer-events-none">
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-88 h-88 border border-[#4367c9]/22 rounded-full animate-spin-slow"
                style={{ animationDuration: "35s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#4367c9]/17 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "30s",
                }}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-accent)]/20 rounded-full animate-float pointer-events-none"></div>
            <div
              className="absolute bottom-24 left-10 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full animate-float pointer-events-none"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-1/3 left-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full rotate-45 animate-float pointer-events-none"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* Connection Lines SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="newsConnectionGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-accent)"
                    stopOpacity="0.05"
                  />
                </linearGradient>
              </defs>
              <path
                d="M50 50 Q 150 30 250 50 T 450 50"
                stroke="url(#newsConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#newsConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>

          {/* Section Title */}
          <div className="relative z-20 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
            <h2 className="maladroit-font text-xl md:text-6xl text-[var(--color-text-primary)] mb-6 relative inline-block">
              Cherry AI in the News
            </h2>
          </div>

          {/* News Carousel */}
          <div className="max-w-7xl z-20 xl:max-w-[90rem] w-full mx-auto px-4">
            <style>{`
              .embla {
                overflow: hidden;
                padding: 0.75rem;
              }
              .embla__container {
                display: flex;
                align-items: stretch;
              }
              .embla__slide {
                min-width: 0;
                display: flex;
                align-items: stretch;
              }
              
              /* Default/Mobile (sm) - Full width cards */
              .embla__container {
                gap: 1rem;
              }
              .embla__slide {
                flex: 0 0 100%;
                max-width: 320px;
                margin: 0 auto;
              }
              
              /* Tablet (md) - Show 1-2 cards */
              @media (min-width: 768px) {
                .embla__container {
                  gap: 1.25rem;
                }
                .embla__slide {
                  flex: 0 0 calc(100% - 2rem);
                  max-width: 400px;
                }
              }
              
              /* Desktop (lg) - Show 2-3 cards */
              @media (min-width: 1024px) {
                .embla__container {
                  gap: 1.5rem;
                  justify-content: flex-start;
                }
                .embla__slide {
                  flex: 0 0 320px;
                  max-width: 320px;
                }
              }
              
              /* Large Desktop (xl) - Show 3-4 cards */
              @media (min-width: 1280px) {
                .embla__container {
                  gap: 1.875rem;
                }
                .embla__slide {
                  flex: 0 0 320px;
                }
              }
              
              /* Extra Large (2xl) - Show 4+ cards */
              @media (min-width: 1536px) {
                .embla__container {
                  gap: 2rem;
                }
                .embla__slide {
                  flex: 0 0 320px;
                }
              }
              
              /* Card responsiveness */
              .embla__slide .card-content {
                width: 100%;
                max-width: 320px;
                margin: 0 auto;
              }
              
              @media (max-width: 640px) {
                .embla__slide .card-content {
                  max-width: 300px;
                }
              }
              
              @media (min-width: 768px) and (max-width: 1023px) {
                .embla__slide .card-content {
                  max-width: 350px;
                }
              }
            `}</style>
            <div className="embla w-full" ref={emblaRef}>
              <div className="embla__container">
                {/* AP News Card */}
                <div className="embla__slide">
                  <div className="card-content h-[29rem] w-full flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full px-6 lg:p-10 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/aplogo.svg"
                        className="h-full object-cover"
                        alt="AP News Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        AP News
                      </h3>
                      <a
                        href="https://apnews.com/press-release/globenewswire-mobile/telegram-cherry-ai-cherry-trading-bot-9e438e6311a24fbd00c74e6c15e88538"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Business Insider Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full px-3 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/bInsider.svg"
                        className="w-full object-cover"
                        alt="Business Insider Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Business Insider
                      </h3>
                      <a
                        href="https://markets.businessinsider.com/news/stocks/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido-1034590807"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Morningstar Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full px-3 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/morningstar.svg"
                        className="w-full object-cover"
                        alt="Morningstar Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Morningstar
                      </h3>
                      <a
                        href="https://www.morningstar.com/news/globe-newswire/9423501/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Benzinga Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full 2xl:px-20 overflow-hidden bg-[#0b2242] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/benzinga.png"
                        className="w-full object-cover"
                        alt="Benzinga Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Benzinga
                      </h3>
                      <a
                        href="https://www.benzinga.com/pressreleases/25/04/g44844966/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Coin Telegraph Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/coinTelegraph.jpg"
                        className="h-full object-cover"
                        alt="Coin Telegraph Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Coin Telegraph
                      </h3>
                      <a
                        href="https://cointelegraph.com/press-releases/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* CoinCu Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#222222] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/coincu.png"
                        className="w-full object-cover"
                        alt="CoinCu Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        CoinCu
                      </h3>
                      <a
                        href="https://coincu.com/332913-cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* NewsBTC Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/newsbtc.png"
                        className="w-full object-cover"
                        alt="NewsBTC Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        NewsBTC
                      </h3>
                      <a
                        href="https://www.newsbtc.com/press-releases/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* TechBullion Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/techB.png"
                        className="w-full object-cover"
                        alt="TechBullion Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        TechBullion
                      </h3>
                      <a
                        href="https://techbullion.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Blockopedia Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/block.png"
                        className="w-full object-cover"
                        alt="Blockopedia Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Blockopedia
                      </h3>
                      <a
                        href="https://blockopedia.org/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Stelareum Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/stelareum.svg"
                        className="w-full object-cover"
                        alt="Stelareum Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Stelareum
                      </h3>
                      <a
                        href="https://www.stelareum.io/en/wallet/blog/cherry-ai-a-revenue-backed-infrastructure-layer.html"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* The Bittimes Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/thebittimes.webp"
                        className="w-full object-cover"
                        alt="The Bittimes Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        The Bittimes
                      </h3>
                      <a
                        href="https://thebittimes.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido-tbt114039.html"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* CoinGabbar Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-gray-100 h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/coingabbar.png"
                        className="w-full object-cover"
                        alt="CoinGabbar Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        CoinGabbar
                      </h3>
                      <a
                        href="https://www.coingabbar.com/en/crypto-sponsored/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Captain Altcoin Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-gray-100 h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/captain.png"
                        className="w-full object-cover"
                        alt="Captain Altcoin Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Captain Altcoin
                      </h3>
                      <a
                        href="https://captainaltcoin.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* CoinMarketCap Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/coinmarketcap.svg"
                        className="w-full object-cover"
                        alt="CoinMarketCap Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        CoinMarketCap
                      </h3>
                      <a
                        href="https://coinmarketcap.com/community/articles/680252991235d9597fd7d36f/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>

                {/* Binance Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <div className="w-full p-10 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="https://storage.cherrybot.ai/binance.svg"
                        className="w-full object-cover"
                        alt="Binance Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                        Binance
                      </h3>
                      <a
                        href="https://app.binance.com/uni-qr/cart/23086862847145?r=22537208&l=en&uco=cZfRmUfvvPMs9bE0-EKROQ&uc=app_square_share_link&us=copylink/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RevenueStreams />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
