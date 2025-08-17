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
import VideoPlayer from "../components/VideoPlayer";
import RevenueStreams from "../components/RevenueStreams";

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
  
  .animate-floatExtra {
    animation: floatExtra 2s ease-in-out infinite;
  }
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
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

  const featureCardsRef = useRef<HTMLDivElement>(null);
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

  const [activeTab, setActiveTab] = useState<"manual" | "autobot">("manual");

  const [activePartner, setActivePartner] = useState<number>(0);
  const [activeCommunityTab, setActiveCommunityTab] = useState<string>("V1");

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

  const handleGetListed = () => {
    window.open("https://t.me/CherryTrendingBot", "_blank");
  };
  const handleExploreBot = () => {
    window.open("https://t.me/CherryTGBot", "_blank");
  };

  // const handleStartQuesting = () => {
  //     window.open("https://t.me/cherrygame_io_bot", "_blank");
  //   };

  const handleViewTrending = () => {
    window.open("https://t.me/cherrytrending", "_blank");
  };

  const handleSnipeNow = () => {
    window.open("https://t.me/cherrySniperBot", "_blank");
  };

  // const handleNewsletterSubscribe = async (emailValue: string) => {
  //   if (!emailValue.trim()) {
  //     console.log("Email is required");
  //     return;
  //   }

  //   setIsSubscribing(true);
  //   try {
  //     const response = await fetch(
  //       "https://cherrytest-production.up.railway.app/email/newsletter",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: emailValue,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("Newsletter subscription response:", data);

  //     if (response.ok) {
  //       console.log("Successfully subscribed to newsletter");
  //       setSuccessToastVisible(true);
  //       setTimeout(() => setSuccessToastVisible(false), 3000);
  //       setEmail("");
  //     } else {
  //       console.log("Failed to subscribe:", data);
  //       // Check if email is already subscribed
  //       if (data.message === "Email already subscribed") {
  //         setAlreadySubscribedToastVisible(true);
  //         setTimeout(() => setAlreadySubscribedToastVisible(false), 3000);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error subscribing to newsletter:", error);
  //   } finally {
  //     setIsSubscribing(false);
  //   }
  // };

  // Refs for all videos

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

          <div className=" w-full flex  pt-48 lg:flex-row flex-col items-end lg:items-start h-screen relative z-10">
            <div className="  w-full mx-auto">
              <div className="hero-content-wrapper flex  flex-col lg:flex-row items-center h-screen lg:h-auto mb-16 relative z-10 px-10">
                <div className="flex lg:w-1/2 w-full items-start justify-center flex-col px-16">
                  <div className=" mb-16">
                    <h1 className="maladroit-font flex items-center justify-start text-5xl md:text-6xl lg:text-8xl font-bold text-[var(--color-text-primary)] leading-tight mb-2 max-w-4xl mx-auto">
                      Cherry
                      <span className="text-[var(--color-accent)]">AI</span>
                      <span className="block relative">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
                      </span>
                    </h1>

                    <p className="hero-description text-left text-lg lg:text-2xl text-[var(--color-text-secondary)]/80 mb-9 max-w-3xl mx-auto leading-7">
                      AI powered ecosystem for digital robotics that empowers
                      Web3 traders and communities.
                    </p>
                  </div>

                  <div className="hero-buttons w-full flex flex-col sm:flex-row items-center justify-center gap-6 mb-9">
                    <button
                      onClick={() => {
                        window.open("https://t.me/CherryTGBot", "_blank");
                      }}
                      className="btn-wave-primary cursor-pointer w-full"
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
                      <span className="btn-text">Start with Cherry</span>
                    </button>

                    <button
                      onClick={() => {
                        window.open("https://docs.cherrybot.co/", "_blank");
                      }}
                      className="btn-wave-secondary cursor-pointer w-full"
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
                            fill="currentColor"
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
                            fill="currentColor"
                            d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                          ></path>
                        </svg>
                      </span>
                      <span className="wave-overlay"></span>
                      <span className="btn-text">Learn More</span>
                    </button>
                  </div>
                </div>

                <div className="relative lg:w-1/2 w-full max-w-4xl mx-auto">
                  <div className="w-full aspect-[16/9] bg-transparent rounded-[36px] relative overflow-hidden">
                    {/* Panel Content Placeholder */}
                    <div className="relative w-full h-full pt-12">
                      <video
                        src="/output.mp4"
                        className="absolute transform overflow-hidden   inset-0 w-full   h-full object-cover rounded-[36px]"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 rounded-[36px] shadow-[inset_0_0_24px_rgba(67,103,201,0.3)] pointer-events-none"></div>
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
            className=" h-full relative w-full py-44 md:px-0 px-4 overflow-hidden"
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
          <div
            ref={sectionTitleRef}
            className="flex opacity-0 mt-24 flex-col items-center justify-center w-full md:px-0 px-8 relative"
          >
            {/* Floating Elements Layer */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Orbital Rings */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-64 h-64 border border-[#4367c9]/12 rounded-full animate-spin-slow"
                  style={{ animationDuration: "45s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#4367c9]/8 rounded-full animate-spin-slow"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "38s",
                  }}
                ></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-10 left-1/3 w-2.5 h-2.5 bg-[var(--color-accent)]/40 rounded-full animate-float"></div>
              <div
                className="absolute top-20 right-1/4 w-3 h-3 bg-[var(--color-accent)]/35 rounded-full animate-float-slow"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute bottom-10 left-1/4 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float"
                style={{ animationDelay: "2.5s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[var(--color-accent)]/25 rounded-full animate-float-slow"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>

            {/* Main Title */}
            <h2 className="transform translate-y-8 text-center maladroit-font text-xl lg:text-5xl text-[var(--color-text-primary)] mb-8 relative z-10 max-w-6xl">
              Built for Traders, Devs, and Degens
              <div className="absolute -bottom-5 left-1/2  transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
            </h2>

            {/* Subtitle */}
            <h2 className="text-[var(--color-text-secondary)]/80 my-10 winky-sans-font md:text-xl text-sm text-center max-w-3xl leading-relaxed relative mt-10 z-10">
              Explore our powerful Web3 suite — from real-time trading tools to
              viral discovery bots and gamified earning.
            </h2>

            {/* Floating Decorative Elements */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-3 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col gap-2">
                <div className="w-9 h-9 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center hover:bg-[var(--color-accent)]/30 transition-colors cursor-pointer">
                  <svg
                    className="w-5 h-5 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="w-9 h-9 bg-[var(--color-accent)]/20 rounded-[12px] flex items-center justify-center hover:bg-[var(--color-accent)]/30 transition-colors cursor-pointer">
                  <svg
                    className="w-5 h-5 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Connection Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
              <defs>
                <linearGradient
                  id="titleConnectionGradient"
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
                stroke="url(#titleConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#titleConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>
          <div className="w-full px-8 md:px-10 lg:px-24 bg-transparent   py-12   mx-auto">
            <div
              ref={featureCardsRef}
              className="relative gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              id="features"
            >
              <div
                ref={featureCard1Ref}
                className="feature-card opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full group">
                  {/* Card Body */}
                  <div className="flex flex-col items-center bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full p-6">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                    {/* Connection Lines SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <defs>
                        <linearGradient
                          id="card1Gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M20 20 Q 60 10 100 20 T 180 20"
                        stroke="url(#card1Gradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-full border-4 border-[var(--color-accent)]/30 shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                          <img
                            src="https://storage.cherrybot.ai/chara_bot.svg"
                            alt="Management Bot"
                            className="w-full h-full object-contain mt-6 animate-float"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side with Content */}
                    <div className="p-4 w-full md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-10">
                      <div className="mb-6">
                        <h3 className="text-[25px] mb-4 maladroit-font text-[var(--color-text-primary)] transform transition-all duration-300">
                          Community Bots
                        </h3>
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60 mb-4 rounded-full mx-auto md:mx-0"></div>
                        <p className="text-[var(--color-text-secondary)]/90 winky-sans-font text-lg transition-all duration-300">
                          Digital robots that use AI to manage and communicate
                          with your community.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleExploreBot}
                          className="btn-wave-primary cursor-pointer flex items-center gap-2"
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
                          <span className="btn-text">Explore CherryBot</span>
                        </button>
                      </div>

                      {/* Bottom Decorative Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
                ref={featureCard2Ref}
                className="feature-card opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full group">
                  <div className="flex flex-col items-center bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full p-6">
                    <div
                      className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <defs>
                        <linearGradient
                          id="card2Gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M20 20 Q 60 10 100 20 T 180 20"
                        stroke="url(#card2Gradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </svg>

                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-full border-4 border-[var(--color-accent)]/30 shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                          <img
                            src="https://storage.cherrybot.ai/chara_earn.svg"
                            alt="Cherry Quest"
                            className="w-full h-full object-contain mt-6 animate-float"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 w-full md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-10">
                      <div className="mb-6">
                        <h3 className="text-[25px] mb-4 maladroit-font text-[var(--color-text-primary)] transform transition-all duration-300">
                          Cherry Quest
                        </h3>
                        <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60 mb-4 rounded-full mx-auto md:mx-0"></div>
                        <p className="text-[var(--color-text-secondary)]/90 winky-sans-font text-lg transition-all duration-300">
                          Gamify your growth with task rewards.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleStartQuesting}
                          className="btn-wave-primary cursor-pointer flex items-center gap-2"
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
                          <span className="btn-text">Start Questing</span>
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* Feature Card 3 - Cherry AI Trending */}
              <div
                ref={featureCard3Ref}
                className="feature-card opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full group">
                  {/* Card Body */}
                  <div className="flex flex-col items-center bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[4px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full p-6">
                    {/* Floating Decorative Elements */}
                    <div
                      className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                      style={{ animationDelay: "1.5s" }}
                    ></div>

                    {/* Connection Lines SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <defs>
                        <linearGradient
                          id="card3Gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M20 20 Q 60 10 100 20 T 180 20"
                        stroke="url(#card3Gradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: "0.6s" }}
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-full border-4 border-[var(--color-accent)]/30 shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                          <img
                            src="https://storage.cherrybot.ai/chara_trending.svg"
                            alt="Cherry AI Trending"
                            className="w-full h-full object-contain mt-6 animate-float"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side with Content */}
                    <div className="p-4 w-full md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-10">
                      <div className="mb-6">
                        <h3 className="text-[25px] mb-4 maladroit-font text-[var(--color-text-primary)] transform transition-all duration-300">
                          Analytics AI
                        </h3>
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60 mb-4 rounded-full mx-auto md:mx-0"></div>
                        <p className="text-[var(--color-text-secondary)]/90 winky-sans-font text-lg transition-all duration-300">
                          elegram channel run by an AI powered bot that finds
                          and analyzes trending tokens.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleViewTrending}
                          className="btn-wave-primary cursor-pointer flex items-center gap-2"
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
                          <span className="btn-text">View Trending</span>
                        </button>
                      </div>

                      {/* Bottom Decorative Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={featureCard4Ref}
                className="feature-card opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full group">
                  {/* Card Body */}
                  <div className="flex flex-col items-center bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[3px] overflow-hidden hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full p-6">
                    {/* Floating Decorative Elements */}
                    <div
                      className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"
                      style={{ animationDelay: "2s" }}
                    ></div>

                    {/* Connection Lines SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <defs>
                        <linearGradient
                          id="card4Gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-accent)"
                            stopOpacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M20 20 Q 60 10 100 20 T 180 20"
                        stroke="url(#card4Gradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: "0.9s" }}
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-full border-4 border-[var(--color-accent)]/30 shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                          <img
                            src="https://storage.cherrybot.ai/cherrySniper.webp"
                            alt="SniperAI Bot"
                            className="w-full h-full object-contain mt-6 animate-float"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side with Content */}
                    <div className="p-4 w-full md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-10">
                      <div className="mb-6">
                        <h3 className="text-[25px] mb-4 maladroit-font text-[var(--color-text-primary)] transform transition-all duration-300">
                          SniperAI Bot
                        </h3>
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60 mb-4 rounded-full mx-auto md:mx-0"></div>
                        <p className="text-[var(--color-text-secondary)]/90 winky-sans-font text-lg transition-all duration-300">
                          Telegram based trading bot that offers an AI chatbot
                          to automate trading.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleSnipeNow}
                          className="btn-wave-primary cursor-pointer flex items-center gap-2"
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
                          <span className="btn-text">Trade Now</span>
                        </button>
                      </div>

                      {/* Bottom Decorative Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center"></div>
          </div>
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
                Fastest Trade Executions And AI Powered Trading
              </h2>

              {/* Description Card */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                  <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                    SniperAI Bot is a digital robot that offers traders and
                    snipers with 2 modes: Manual and Autobot mode. Manual is a
                    classic Telegram based trading bot. Autobot mode offers
                    traders with a Telegram based chat robot that you can give
                    details and parameters for trading tokens and it will use
                    automatically begin trading or even yield farming based on
                    your parameters.
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
                  <div className="md:block hidden bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-2 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                    <div className="relative aspect-video overflow-hidden rounded-[16px] border-2 border-[var(--color-accent)]/30">
                      <img
                        src="/sniperModes.webp"
                        alt="cherrySniper"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>
                  </div>

                  {/* CTA Section */}
                  <div className="text-center mt-10" data-spotlight-cta>
                    <div className="inline-block">
                      <button
                        onClick={handleSnipeNow}
                        className="btn-wave-primary cursor-pointer flex items-center gap-3"
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
                        <span className="btn-text text-xl">Learn More</span>
                        <Icon
                          icon="mdi:arrow-right"
                          className="text-white"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[28px] p-8 relative overflow-hidden transform md:  hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl maladroit-font text-[var(--color-text-primary)] mb-8 text-center">
                        SniperAI Bot Offers Manual & Autobot Modes
                      </h3>

                      {/* Tab Buttons */}
                      <div className="flex gap-2 mb-8">
                        <button
                          onClick={() => setActiveTab("manual")}
                          className={`flex-1 py-3 px-6 rounded-[4px] cursor-pointer winky-sans-font transition-all duration-300 transform hover:-translate-y-1 ${
                            activeTab === "manual"
                              ? "bg-[var(--color-accent)] text-white border-2 border-[var(--color-accent)] shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                              : "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/20"
                          }`}
                        >
                          Manual
                        </button>
                        <button
                          onClick={() => setActiveTab("autobot")}
                          className={`flex-1 py-3 px-6 rounded-[4px] cursor-pointer winky-sans-font transition-all duration-300 transform hover:-translate-y-1 ${
                            activeTab === "autobot"
                              ? "bg-[var(--color-accent)] text-white border-2 border-[var(--color-accent)] shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                              : "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/20"
                          }`}
                        >
                          Autobot
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="min-h-[400px]">
                        {activeTab === "autobot" && (
                          <div className="space-y-4 animate-fadeIn">
                            {/* Trade in Privacy Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="mdi:shield-key"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Automate Buys/Sells
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Set custom parameters with the AI for buys
                                    and sells and it will automatically follow
                                    them.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Non-custodial Wallet Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="mdi:wallet"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Automate Yield Farming
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Instruct the AI to take all profits from
                                    trading activity and stake, LP mine or lend
                                    them out.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Key Security Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex items-start lg:items-center flex-col md:flex-row gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="mdi:key"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Automatic Arbitrage
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Give the AI a list of tokens to arbitrage
                                    and the AI will automatically look for arb
                                    opportunities across DEXes.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "manual" && (
                          <div className="space-y-4 animate-fadeIn">
                            {/* Fastest Trading Bot Card */}
                            <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-[16px] flex items-center justify-center">
                                    <Icon
                                      icon="mdi:speedometer"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Fastest trading bot
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Lightning-fast trade execution with minimal
                                    latency and slippage
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
                                      icon="mdi:shield-key"
                                      className=" text-white object-contain"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-[var(--color-text-primary)] mb-1">
                                    Advanced trading features
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Pro-level tools and settings for
                                    sophisticated traders
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
                                    AI Powered Analytics
                                  </h4>
                                  <p className="winky-sans-font text-[var(--color-text-secondary)]/80 text-sm">
                                    Uses AI to gather and filter real time data
                                    on token listings, launches and price
                                    fluctuations to help snipers and traders.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Management AI Section */}
        <div className="section_sniper_spotlight lg:py-24 relative overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0">
            {/* Multi-layered Radial Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.11)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(67,103,201,0.07)_0%,transparent_70%)]"></div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-14">
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
              {/* Left side - Video Container */}
              <div className="w-full flex h-full  justify-center items-center">
                {/* Desktop Video Container */}
                <div className="relative h-full   overflow-hidden ">
                  <img
                    src="/phone.webp"
                    alt="cherrySniper"
                    className="  h-full object-contain"
                  />

                  {/* Floating Decorative Elements */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>
                </div>
              </div>

              {/* Right side - Content */}
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-content
              >
                <div className="spotlight-content-wrapper">
                  {/* Eyebrow Badge */}
                  <div className="flex items-center justify-start mb-6">
                    <div className="bg-[var(--color-accent)]/10   border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform -  hover:rotate-0 transition-all duration-300">
                      <span className="text-xl md:text-lg winky-sans-font text-[var(--color-accent)]">
                        Community AI
                      </span>
                    </div>
                  </div>

                  {/* Main Title */}
                  <h2 className="text-2xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-6">
                    AI Powered Telegram Bots For Communities
                  </h2>

                  {/* Description */}
                  <p className="winky-sans-font text-xl text-[var(--color-text-secondary)]/90 mb-8">
                    CherryAI Bot will be creating AI powered digital robots to
                    help manage Telegram communities. These will be launched in
                    3 versions - V1 is already deployed.
                  </p>

                  {/* Community AI Tabs */}
                  <div className="w-full">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {["V1", "V2", "V3"].map((version) => (
                        <button
                          key={version}
                          onClick={() => setActiveCommunityTab(version)}
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
                    <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
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
                                  The V1 is already launched its a community
                                  management bot that uses machine learning to
                                  upgrade its database.
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
                                  Community AI bots will be able to not only
                                  manage the community but also will be able to
                                  answer specific questions related to the
                                  project like a regular person.
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
                                  Community AI bots will be able to scrape real
                                  time data from blockchains so they can answer
                                  token and smart contract related questions as
                                  well.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

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
            </div>
          </div>
        </div>

        {/* AI Trending Section */}
        <div className="section_sniper_spotlight py-24 relative overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0">
            {/* Multi-layered Radial Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(67,103,201,0.13)_0%,transparent_58%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(67,103,201,0.08)_0%,transparent_58%)]"></div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-16">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)`,
                  backgroundSize: "65px 65px",
                }}
              ></div>
            </div>
          </div>

          {/* Floating Elements Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-76 h-76 border border-[#4367c9]/16 rounded-full animate-spin-slow"
                style={{ animationDuration: "41s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 border border-[#4367c9]/11 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "37s",
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
                  id="trendingConnectionGradient"
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
                stroke="url(#trendingConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#trendingConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-center">
              {/* Left side - Text content */}
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-content
              >
                <div className="spotlight-content-wrapper">
                  {/* Eyebrow Badge */}
                  <div className="flex items-center mb-6">
                    <div className="bg-[var(--color-accent)]/10   border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform -  hover:rotate-0 transition-all duration-300">
                      <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                        AI Analytics
                      </span>
                    </div>
                  </div>

                  {/* Main Title */}
                  <h2 className="text-2xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-6">
                    AI Bot That Presents and Analyzes Trending Token.
                  </h2>

                  {/* Description Card */}
                  <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[4px] p-6 mb-8 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                    <p className="winky-sans-font text-sm md:text-2xl text-[var(--color-text-secondary)]/90 leading-relaxed relative z-10">
                      Uses AI to automatically find and filter onchain data to
                      find trending tokens. Also offers a chat bot where you can
                      ask questions and details about trending tokens.
                    </p>

                    {/* Bottom Decorative Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                  </div>

                  {/* Two Column Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* For Users Column */}
                    <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform -  hover:rotate-0 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-3">
                            <Icon
                              icon="mdi:account-group"
                              className="text-white"
                              width={20}
                              height={20}
                            />
                          </div>
                          <h3 className="text-xl maladroit-font text-[var(--color-text-primary)]">
                            For Users
                          </h3>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={12}
                                height={12}
                              />
                            </div>
                            <p className="winky-sans-font text-[var(--color-text-secondary)]/90 font-medium">
                              Accurate and real time on chain signals
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={12}
                                height={12}
                              />
                            </div>
                            <p className="winky-sans-font text-[var(--color-text-secondary)]/90 font-medium">
                              Powered by decentralized computers
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={12}
                                height={12}
                              />
                            </div>
                            <p className="winky-sans-font text-[var(--color-text-secondary)]/90 font-medium">
                              Zero reliance on centralized oracles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* For Teams Column */}
                    <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[20px] p-6 relative overflow-hidden transform   hover:rotate-0 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(67,103,201,0.15)]">
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-3">
                            <Icon
                              icon="mdi:account-multiple"
                              className="text-white"
                              width={20}
                              height={20}
                            />
                          </div>
                          <h3 className="text-xl maladroit-font text-[var(--color-text-primary)]">
                            For Teams
                          </h3>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="winky-sans-font text-[var(--color-text-secondary)]/90 font-medium">
                              Boost visibility through real performance
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="winky-sans-font text-[var(--color-text-secondary)]/90 font-medium">
                              Paid placements and ads
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="winky-sans-font text-[var(--color-text-secondary)]/90 font-medium">
                              Transparent ranking algorithms
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleGetListed}
                    className="btn-wave-primary cursor-pointer flex items-center gap-2 text-xl"
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
                    <span className="btn-text">Get Listed</span>
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

              {/* Right side - Image */}
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-video
              >
                <div className="bg-[var(--color-glass)] mb-12 lg:h-[37rem] w-fit   border border-[var(--color-glass-border)] rounded-[20px] p-2 relative overflow-hidden transform    transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                  <div className="relative w-fit h-full transform rounded-[16px] border-2 border-[var(--color-accent)]/30">
                    <img
                      src="https://storage.cherrybot.ai/trending.webp"
                      alt="Cherry Trending"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Floating Decorative Elements */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="section_sniper_spotlight lg:px-0 px-4 py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(67,103,201,0.15)_0%,transparent_52%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(67,103,201,0.09)_0%,transparent_52%)]"></div>

            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(67,103,201,0.09) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(67,103,201,0.09) 1px, transparent 1px)`,
                  backgroundSize: "55px 55px",
                }}
              ></div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-84 h-84 border border-[#4367c9]/20 rounded-full animate-spin-slow"
                style={{ animationDuration: "38s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-[#4367c9]/15 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "33s",
                }}
              ></div>
            </div>

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full   "></div>
            <div
              className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/10 rounded-full animate-float   "
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/8 rounded-full animate-float   "
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-accent)]/6 rounded-full animate-float   "
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="questConnectionGradient"
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
                stroke="url(#questConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#questConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:px-32 gap-12 items-center justify-center">
              <div className="order-1 lg:order-2" data-spotlight-video>
                <div className="bg-[var(--color-glass)] lg:h-[37rem] lg:w-[20rem] w-full   border border-[var(--color-glass-border)] rounded-[20px] p-2 relative overflow-hidden transform   transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                  <div className="relative w-full h-full transform rounded-[16px] border-2 border-[var(--color-accent)]/30">
                    <img
                      src="https://storage.cherrybot.ai/cherryGame.webp"
                      alt="Cherry Quest Game"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>
                </div>
              </div>

              <div className="order-2" data-spotlight-content>
                <div className="spotlight-content-wrapper">
                  <div className="flex items-center mb-6">
                    <span className="text-3xl winky-sans-font text-[var(--color-accent)]">
                      Cherry Quest
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-6">
                    Click. Raid. Earn. Repeat.
                  </h2>

                  <p className="winky-sans-font text-xl text-[var(--color-text-secondary)]/90 mb-8">
                    The Cherry Game is your daily dose of degen dopamine. Mine
                    coins, upgrade cards, and raid to win $AIBOT.
                  </p>

                  <button
                    onClick={handleStartQuesting}
                    className="btn-wave-primary cursor-pointer flex items-center gap-2 text-xl"
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
                    <span className="btn-text">S2 Coming Soon</span>
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
            </div>
          </div>
        </div> */}
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
            <p className="winky-sans-font md:text-xl text-sm md:mt-10 mt-3 text-[var(--color-text-secondary)]/90">
              Major publications covering CHERRY's revolutionary impact on the
              crypto industry
            </p>
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
        {/* <div className="mt-32 relative transform translate-y-16 transition-all duration-1000">
          <div className="relative w-full py-20 bg-gradient-to-b from-[var(--color-accent)]/20 to-[var(--color-accent)]/10 border-y border-[var(--color-accent)]/20 overflow-hidden">
             <div className="absolute inset-0">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(67,103,201,0.17)_0%,transparent_45%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(67,103,201,0.11)_0%,transparent_45%)]"></div>

               <div className="absolute inset-0 opacity-24">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(67,103,201,0.11) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(67,103,201,0.11) 1px, transparent 1px)`,
                    backgroundSize: "45px 45px",
                  }}
                ></div>
              </div>
            </div>

             <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-92 h-92 border border-[#4367c9]/24 rounded-full animate-spin-slow"
                  style={{ animationDuration: "32s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-68 h-68 border border-[#4367c9]/19 rounded-full animate-spin-slow"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "28s",
                  }}
                ></div>
              </div>

               <div className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full animate-float   "></div>
              <div
                className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/15 rounded-full animate-float   "
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full animate-float   "
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>

             <div className="absolute inset-0 pointer-events-none opacity-15">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="featuresConnectionGradient"
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
                  stroke="url(#featuresConnectionGradient)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M50 100 Q 150 80 250 100 T 450 100"
                  stroke="url(#featuresConnectionGradient)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                  style={{ animationDelay: "0.7s" }}
                />
              </svg>
            </div>

             <div className="relative z-10 mb-16 text-center max-w-4xl mx-auto px-4">
              <h2 className="maladroit-font text-xl md:text-6xl text-[var(--color-text-primary)] mb-6 relative inline-block">
                Upcoming Features
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
              </h2>
              <p className="winky-sans-font lg:text-xl text-sm text-[var(--color-text-secondary)]/90">
                Full control. Pro-level settings. Fastest execution on Solana.
                All in one powerful trading UI — connected to your wallet.
              </p>
            </div>

             <div className="max-w-7xl mx-auto px-4">
              <div className="w-full lg:px-44 my-3">
                <div className="relative rounded-[28px] bg-[var(--color-glass)]   border border-[var(--color-glass-border)] overflow-hidden shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transform hover:-translate-y-2 transition-all duration-300">
                   <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                  <div className="block md:hidden">
                    <VideoPlayer
                      src="/output.mp4"
                      className="w-full h-auto max-h-[60vh] object-cover"
                      autoPlay={true}
                    />
                  </div>
                  <div className="hidden md:block">
                    <VideoPlayer
                      src="/output.mp4"
                      className="w-full h-auto max-h-[60vh] object-cover"
                      autoPlay={true}
                    />
                  </div>

                   <div className="absolute bottom-0 z-30 left-0 right-0 p-3 bg-[var(--color-glass)]/90 backdrop-blur-sm border-t border-[var(--color-accent)]/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <button
                      className="bg-[var(--color-accent)] text-white py-2 px-4 rounded-[16px] border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 winky-sans-font flex items-center gap-2 whitespace-nowrap shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
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

                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                </div>
              </div>
            </div>

             <div className="relative z-10 mt-16 max-w-2xl mx-auto px-4">
              <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] p-8 relative overflow-hidden">
                 <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>
                <div
                  className="absolute -bottom-16 -left-16 w-32 h-32 bg-[var(--color-accent)]/15 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>

                <h3 className="winky-sans-font md:text-2xl text-xl text-[var(--color-text-primary)] mb-4 text-center">
                  Subscribe to our newsletter
                </h3>
                <p className="winky-sans-font text-[var(--color-text-secondary)]/90 mb-6 text-center">
                  Be the first to know when new Cherry features launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow py-3 px-4 rounded-[16px] border-2 border-[var(--color-accent)]/30 focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none bg-[var(--color-bg-secondary)]/50 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/60"
                  />
                  <button
                    onClick={() => handleNewsletterSubscribe(email)}
                    disabled={isSubscribing}
                    className="bg-[var(--color-accent)] text-white py-3 px-6 rounded-[16px] border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 winky-sans-font flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                  >
                    <span className="text-white">
                      {isSubscribing ? "Subscribing..." : "Subscribe"}
                    </span>
                    <Icon
                      icon={isSubscribing ? "mdi:loading" : "mdi:bell"}
                      width={20}
                      height={20}
                      className={`text-white ${
                        isSubscribing ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>

                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
              </div>
            </div>
          </div>
        </div> */}
        <div
          ref={heroSectionRef}
          className="scroll-container1 h-fit flex items-center justify-center relative overflow-hidden"
          id="home"
        >
          {/* Floating Elements Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-96 h-96 border border-[#4367c9]/26 rounded-full animate-spin-slow"
                style={{ animationDuration: "29s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-[#4367c9]/21 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "25s",
                }}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full animate-float   "></div>
            <div
              className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/15 rounded-full animate-float   "
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full animate-float   "
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* Connection Lines SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="revenueConnectionGradient"
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
                stroke="url(#revenueConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M50 100 Q 150 80 250 100 T 450 100"
                stroke="url(#revenueConnectionGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-8xl my-28 px-4 lg:px-20 my-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              {/* Left Side Content */}
              <div className="md:w-3/5">
                <div className="flex flex-col justify-center items-start bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] p-6 md:p-8 relative overflow-hidden transform mb-8 hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300">
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                  <span className="maladroit-font text-xl md:text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center">
                    Cherry Revenue Growth
                  </span>

                  <span className="winky-sans-font text-lg md:text-2xl text-[var(--color-accent)] relative mb-6">
                    Market Analytics & Revenue Data
                  </span>

                  <p className="winky-sans-font text-sm md:text-xl text-[var(--color-text-secondary)]/90 mb-6 max-w-3xl relative">
                    Explore in-depth market analytics, revenue projections, and
                    upcoming features that make Cherry AI a{" "}
                    <span className="relative text-[var(--color-accent)]">
                      revolutionary platform
                    </span>{" "}
                    in the crypto space.
                  </p>

                  {/* Bottom Decorative Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 relative z-20">
                  <button
                    onClick={() => {
                      window.location.href = "/userGrowth";
                    }}
                    className="btn-wave-primary cursor-pointer flex items-center gap-2 text-xl"
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
                    <span className="btn-text">Learn More</span>
                    <Icon
                      className="text-white"
                      icon="tabler:chart-pie"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              {/* Right Side - Floating Mascot/Chart */}
              <div className="w-full max-w-4xl relative lg:p-10 p-4">
                <div className="relative z-10 float-element">
                  <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)]  rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] p-10 hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2">
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                    <img
                      src="https://storage.cherrybot.ai/chart.png"
                      alt="Cherry Analytics"
                      className="h-full mx-auto"
                    />
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
