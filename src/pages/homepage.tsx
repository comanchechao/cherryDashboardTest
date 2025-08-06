import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import "../css/cherry.css";
import "../css/homepage.css";
import "../css/index.css";
import "../css/feature-cards.css";
import "../css/hero-animations.css";
import { Link } from "react-router-dom";
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
      name: "BANANA GUN BOT",
      logo: "https://storage.cherrybot.ai/BananaGunLogo.png",
      description:
        "Banana Gun is a Telegram sniper bot known for its powerful MEV protection and lightning-fast execution. Our partnership with Banana Gun allows seamless integration of Cherry's tracking and community engagement tools, offering their users added insights, custom leaderboards, and campaign activations directly within Telegram. Together, we boost the efficiency and discoverability of on-chain activity.",
      website: "https://bananagun.io/",
    },
    {
      name: "MAESTRO BOT",
      logo: "https://storage.cherrybot.ai/MaestroLogo.png",
      description:
        "Maestro Bot is a multi-chain trading bot built for precision, security, and speed. With Cherry, Maestro users gain access to enhanced token visibility, volume support, and custom quest integrations—turning every trade into an opportunity for rewards and growth. This partnership fuels on-chain activity while strengthening community engagement through Cherry Quest and Trending tools.",
      website: "https://maestrobots.com/",
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
  const partnersContentRef = useRef<HTMLDivElement>(null);

  // Newsletter subscription states
  const [email, setEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);

  const [activeTab, setActiveTab] = useState<"Cherry" | "speed">("Cherry");

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

  const handleGetListed = () => {
    window.open("https://t.me/CherryTrendingBot", "_blank");
  };
  const handleExploreBot = () => {
    window.open("https://t.me/CherryTGBot", "_blank");
  };

  const handleStartQuesting = () => {
    window.open("https://t.me/cherrygame_io_bot", "_blank");
  };

  const handleViewTrending = () => {
    window.open("https://t.me/cherrytrending", "_blank");
  };

  const handleSnipeNow = () => {
    window.open("https://t.me/cherrySniperBot", "_blank");
  };

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
        setSuccessToastVisible(true);
        setTimeout(() => setSuccessToastVisible(false), 3000);
        setEmail("");
      } else {
        console.log("Failed to subscribe:", data);
        // Check if email is already subscribed
        if (data.message === "Email already subscribed") {
          setAlreadySubscribedToastVisible(true);
          setTimeout(() => setAlreadySubscribedToastVisible(false), 3000);
        }
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

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
      <div className="overlay"></div>
      <div className="hider top"></div>
      <div className="hider"></div>

      <div id="triggerXoverFlow1" className="wrapper_main h-full">
        <div className="overlay_color">
          <div className="overlay_stroke"></div>
        </div>
      </div>

      <div
        id="triggerXoverFlow"
        className="wrapper_sections  wrapper-container"
      >
        {/* Success Toast for Newsletter */}
        <div
          className={`fixed top-20 right-10 z-50 bg-green-100 border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_#22c55e] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
            successToastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <Icon
            icon="mdi:check-circle"
            className="text-green-600"
            width={24}
            height={24}
          />
          <div className="flex flex-col">
            <span className="winky-sans-font font-medium text-green-800">
              Success!
            </span>
            <span className="winky-sans-font text-sm text-green-700 opacity-90">
              Successfully subscribed to newsletter
            </span>
          </div>
        </div>

        {/* Already Subscribed Toast */}
        <div
          className={`fixed top-10 right-10 z-50 bg-orange-100 border-4 border-orange-500 rounded-xl shadow-[4px_4px_0px_#f97316] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
            alreadySubscribedToastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <Icon
            icon="mdi:information"
            className="text-orange-600"
            width={24}
            height={24}
          />
          <div className="flex flex-col">
            <span className="winky-sans-font font-medium text-orange-800">
              Already Subscribed!
            </span>
            <span className="winky-sans-font text-sm text-orange-700 opacity-90">
              This email is already subscribed to our newsletter
            </span>
          </div>
        </div>

        <div className="section_menu">
          <a href="#home" className="menu_nav w-button">
            HOME
          </a>
          <a id="aboutBtn" className="menu_nav w-button">
            ABOUT
          </a>
          <Link to="/features" className="menu_nav w-button" id="featuresBtn">
            FEATURES
          </Link>
          <a id="partnersBtn" className="menu_nav w-button">
            PARTNERS
          </a>
          <a
            href="https://pad.cherrybot.ai/"
            target="_blank"
            rel="noreferrer"
            className="menu_nav w-button"
          >
            IDO
          </a>
          <a id="cherryTokenBtn" className="menu_nav w-button">
            $AIBOT
          </a>
          <a
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
          <a href="#" className="back w-button">
            BACK
          </a>
        </div>

        <div
          ref={heroSectionRef}
          className={`hero_section scroll-container1 ${
            heroAnimated ? "hero-animated" : ""
          }`}
          id="home"
        >
          <Navbar />
          <div className="hero_content flex pt-36 lg:flex-row  flex-col  items-end lg:items-start justify-start h-screen">
            <div className="max-w-4xl 2xl:max-w-7xl mx-auto ">
              <div className="hero-content-wrapper h-screen lg:h-auto  mb-16  relative z-10  px-10">
                <div className="vintage-paper 2xl:w-[60rem]  w-full  flex flex-col justify-center items-start bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 relative overflow-hidden transform  rotate-1 mb-8">
                  <span className="hero-title-main maladroit-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-cherry-black leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center">
                    Cherry AI
                  </span>
                  <span className="hero-subtitle   winky-sans-font lg:text-3xl text-2xl text-cherry-burgundy relative mb-6">
                    The Alpha Engine of Web3
                  </span>
                  <p className="hero-description animate-pulse winky-sans-font text-lg 2xl:text-2xl text-cherry-burgundy mb-1 max-w-3xl relative">
                    Trade faster. Grow louder. Earn more.
                  </p>{" "}
                  <p className="hero-description animate-pulse winky-sans-font text-lg 2xl:text-2xl text-cherry-burgundy mb-6 max-w-3xl relative">
                    Trading tools, trending boosts, raids and rewards — all in
                    one place.
                  </p>
                </div>

                <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 relative z-20">
                  <button
                    onClick={() => {
                      window.open("https://t.me/CherryTGBot", "_blank");
                    }}
                    className="text-white bg-cherry-red   py-2 px-4 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl! flex items-center gap-2 shadow-[2px_2px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                  >
                    <span className="relative winky-sans-font text-cherry-white">
                      Start with Cherry
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      window.open("https://docs.cherrybot.co/", "_blank");
                    }}
                    className="bg-cherry-cream    py-2 px-4 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl! flex items-center gap-2 shadow-[2px_2px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                  >
                    <span className="relative winky-sans-font text-cherry-burgundy">
                      Learn More
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              src="https://storage.cherrybot.ai/hero_mascot.svg"
              alt=""
              className="cherry hero-mascot w-1/2 lg:max-w-4xl md:max-w-2xl animate-float  hidden md:block"
            />
          </div>
          <div className="hero_floor"></div>
        </div>

        <div className="banner_1">
          <div className="banner_1_in">
            <div className="marquee-container flex items-center justify-around">
              <div className="marquee-content flex items-center justify-center winky-sans-font">
                <div className="flex items-center ">
                  <span className="bold-text mr-6">MANAGE</span>
                  <span className="bold-text mr-6">TRACK</span>
                  <span className="bold-text mr-6">RAID</span>
                  <span className="bold-text mr-6">EARN</span>
                </div>{" "}
              </div>{" "}
              <div className="marquee-content flex items-center justify-center winky-sans-font">
                <div className="flex items-center ">
                  <span className="bold-text mr-6">MANAGE</span>
                  <span className="bold-text mr-6">TRACK</span>
                  <span className="bold-text mr-6">RAID</span>
                  <span className="bold-text mr-6">EARN</span>
                </div>{" "}
              </div>{" "}
              <div className="marquee-content flex items-center justify-center winky-sans-font">
                <div className="flex items-center ">
                  <span className="bold-text mr-6">MANAGE</span>
                  <span className="bold-text mr-6">TRACK</span>
                  <span className="bold-text mr-6">RAID</span>
                  <span className="bold-text mr-6">EARN</span>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="section_about" id="about">
          <img
            src="https://storage.cherrybot.ai/cherry_rocket.svg"
            loading="lazy"
            alt=""
            className=" absolute -top-32 lg:-top-64 w-52 lg:w-96 object-contain left-3  animate-float "
          />

          {/* Partners & Launchpads Section */}
          <div
            ref={partnersContainerRef}
            className="partners-section min-h-[50rem] relative w-full py-20 md:px-0 px-4   bg-opacity-80 overflow-hidden  "
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 pointer-events-none left-0 w-full h-full">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-cherry-red opacity-20 rounded-full animate-float pointer-events-none"></div>
              <div
                className="absolute bottom-24 left-10 w-24 h-24 bg-cherry-red opacity-20 rounded-full animate-float pointer-events-none"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/3 left-10 w-16 h-16 bg-cherry-red opacity-20 rounded-full rotate-45 animate-float pointer-events-none"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Section Title */}
            <div className="relative z-10 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
              <h2
                ref={partnersTitleRef}
                className="maladroit-font text-2xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block"
              >
                Partners & Launchpads
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
              </h2>
              <p className="winky-sans-font text-xl mt-10 text-cherry-burgundy">
                Strategic alliances that help CHERRY expand its reach and
                enhance its ecosystem
              </p>
            </div>

            {/* Partners Content */}
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
              {/* Tabs Buttons */}
              <div className="lg:w-1/2 flex flex-wrap gap-2 justify-start lg:justify-start items-start">
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
                    className={`partner-tab flex items-center gap-2 m-2 md:px-8 px-2   justify-center py-3 rounded-xl border-2 border-cherry-burgundy winky-sans-font hover:transform hover:-translate-y-1 transition-all duration-200 ${
                      activePartner === index
                        ? "bg-cherry-burgundy text-cherry-cream shadow-[4px_4px_0px_#321017]"
                        : "bg-cherry-red text-cherry-cream"
                    }`}
                  >
                    <span className="winky-sans-font hidden md:block text-lg text-cherry-cream">
                      {partner.name}
                    </span>
                    <img
                      src={partner.logo}
                      className="w-7 md:ml-2 object-contain"
                      alt={`${partner.name} Logo`}
                    />
                  </button>
                ))}
              </div>

              {/* Partner Content */}
              <div className="lg:w-1/2">
                <div
                  ref={partnersContentRef}
                  className="partner-content bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 md:p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 md:rotate-1"
                >
                  <div className="absolute  pointer-events-none top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30"></div>

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
          <div
            ref={sectionTitleRef}
            className="flex opacity-0 flex-col items-center justify-center w-full md:px-0 px-8"
          >
            <h2 className=" transform translate-y-8 text-center   maladroit-font text-xl lg:text-5xl text-cherry-burgundy mb-12">
              Built for Traders, Devs, and Degens
            </h2>
            <h2 className="text-cherry-burgundy winky-sans-font md:text-xl text-sm ">
              Explore our powerful Web3 suite — from real-time trading tools to
              viral discovery bots and gamified earning.
            </h2>
          </div>
          <div className="w-full px-8 md:px-10 lg:px-24   py-12   mx-auto">
            <div
              ref={featureCardsRef}
              className="relative gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              id="features"
            >
              {/* Feature Card 1 - CherryBot */}
              <div
                ref={featureCard1Ref}
                className="feature-card bg-cherry-cream pz opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full">
                  {/* Card Body */}
                  <div className="flex flex-col   items-center bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[12px_12px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full">
                    {/* SVG Background Shape */}
                    <svg
                      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                      viewBox="0 0 800 400"
                      preserveAspectRatio="none"
                      style={{ transform: "rotate(90deg) scale(1.5)" }}
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
                          id="cardPattern1"
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
                      <path
                        d="M0,0 L350,0 Q450,100 350,200 Q250,320 350,400 L0,400 Z"
                        fill="url(#cardGrad1)"
                      />
                      <path
                        d="M0,0 L350,0 Q450,100 350,200 Q250,320 350,400 L0,400 Z"
                        fill="url(#cardPattern1)"
                        fillOpacity="0.8"
                      />
                      <circle
                        cx="150"
                        cy="80"
                        r="40"
                        fill="#E53935"
                        fillOpacity="0.08"
                      />
                      <circle
                        cx="50"
                        cy="200"
                        r="60"
                        fill="#E53935"
                        fillOpacity="0.05"
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-cherry-red to-cherry-burgundy rounded-full border-4 border-cherry-burgundy shadow-lg transform transition-all duration-300 hover:rotate-6">
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
                        <h3 className="text-[25px]   mb-4 maladroit-font text-cherry-burgundy transform transition-all duration-300">
                          Management Bot
                        </h3>
                        <div className="h-1 w-24 bg-cherry-red mb-4 rounded-full red-line mx-auto md:mx-0"></div>
                        <p className="text-cherry-burgundy winky-sans-font text-lg transition-all duration-300">
                          Mod your TG & track buys live.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleExploreBot}
                          className="text-white bg-cherry-red   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                        >
                          <span className="text-white">Explore CherryBot</span>
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
              {/* Feature Card 2 - Cherry Quest */}
              <div
                ref={featureCard2Ref}
                className="feature-card bg-cherry-cream opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full">
                  {/* Card Body */}
                  <div className="flex flex-col   items-center bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[12px_12px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full">
                    {/* SVG Background Shape */}
                    <svg
                      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                      viewBox="0 0 800 400"
                      preserveAspectRatio="none"
                      style={{ transform: "rotate(90deg) scale(1.5)" }}
                    >
                      <defs>
                        <linearGradient
                          id="cardGrad2"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FFF3DD" />
                          <stop offset="100%" stopColor="#F8ECD1" />
                        </linearGradient>
                        <pattern
                          id="cardPattern2"
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
                      <path
                        d="M0,0 L350,0 Q450,100 350,200 Q250,320 350,400 L0,400 Z"
                        fill="url(#cardGrad2)"
                      />
                      <path
                        d="M0,0 L350,0 Q450,100 350,200 Q250,320 350,400 L0,400 Z"
                        fill="url(#cardPattern2)"
                        fillOpacity="0.8"
                      />
                      <circle
                        cx="150"
                        cy="80"
                        r="40"
                        fill="#E53935"
                        fillOpacity="0.08"
                      />
                      <circle
                        cx="50"
                        cy="200"
                        r="60"
                        fill="#E53935"
                        fillOpacity="0.05"
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-cherry-red to-cherry-burgundy rounded-full border-4 border-cherry-burgundy shadow-lg transform transition-all duration-300 hover:rotate-6">
                          <img
                            src="https://storage.cherrybot.ai/chara_earn.svg"
                            alt="Cherry Quest"
                            className="w-full h-full object-contain mt-6 animate-float"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side with Content */}
                    <div className="p-4 w-full md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-10">
                      <div className="mb-6">
                        <h3 className="text-[25px]   mb-4 maladroit-font text-cherry-burgundy transform transition-all duration-300">
                          Cherry Quest
                        </h3>
                        <div className="h-1 w-24 bg-cherry-red mb-4 rounded-full red-line mx-auto md:mx-0"></div>
                        <p className="text-cherry-burgundy winky-sans-font text-lg   transition-all duration-300">
                          Gamify your growth with task rewards.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleStartQuesting}
                          className="text-white bg-cherry-red   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                        >
                          <span className="text-white">Start Questing</span>
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
              {/* Feature Card 3 - Cherry AI Trending */}
              <div
                ref={featureCard3Ref}
                className="feature-card bg-cherry-cream opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full">
                  {/* Card Body */}
                  <div className="flex flex-col   items-center bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[12px_12px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full">
                    {/* SVG Background Shape */}
                    <svg
                      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                      viewBox="0 0 800 400"
                      preserveAspectRatio="none"
                      style={{ transform: "rotate(90deg) scale(1.5)" }}
                    >
                      <defs>
                        <linearGradient
                          id="cardGrad3"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FFF3DD" />
                          <stop offset="100%" stopColor="#F8ECD1" />
                        </linearGradient>
                        <pattern
                          id="cardPattern3"
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
                      <path
                        d="M0,0 L380,0 Q500,50 380,180 Q280,300 380,400 L0,400 Z"
                        fill="url(#cardGrad3)"
                      />
                      <path
                        d="M0,0 L380,0 Q500,50 380,180 Q280,300 380,400 L0,400 Z"
                        fill="url(#cardPattern3)"
                        fillOpacity="0.8"
                      />
                      <circle
                        cx="120"
                        cy="130"
                        r="60"
                        fill="#E53935"
                        fillOpacity="0.06"
                      />
                      <circle
                        cx="80"
                        cy="280"
                        r="40"
                        fill="#E53935"
                        fillOpacity="0.08"
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-cherry-red to-cherry-burgundy rounded-full border-4 border-cherry-burgundy shadow-lg transform transition-all duration-300 hover:rotate-6">
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
                        <h3 className="text-[25px]   mb-4 maladroit-font text-cherry-burgundy transform transition-all duration-300">
                          AI Trending
                        </h3>
                        <div className="h-1 w-24 bg-cherry-red mb-4 rounded-full red-line mx-auto md:mx-0"></div>
                        <p className="text-cherry-burgundy winky-sans-font text-lg transition-all duration-300">
                          Boost token momentum with exposure.
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleViewTrending}
                          className="text-white bg-cherry-red   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                        >
                          <span className="text-white">View Trending</span>
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
              <div
                ref={featureCard4Ref}
                className="feature-card bg-cherry-cream opacity-0 transform translate-y-16 h-full"
              >
                <div className="relative h-full">
                  {/* Card Body */}
                  <div className="flex flex-col   items-center bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:shadow-[12px_12px_0px_#321017] transition-all duration-300 transform hover:-translate-y-2 card-body relative h-full">
                    {/* SVG Background Shape */}
                    <svg
                      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                      viewBox="0 0 800 400"
                      preserveAspectRatio="none"
                      style={{ transform: "rotate(90deg) scale(1.5)" }}
                    >
                      <defs>
                        <linearGradient
                          id="cardGrad4"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FFF3DD" />
                          <stop offset="100%" stopColor="#F8ECD1" />
                        </linearGradient>
                        <pattern
                          id="cardPattern4"
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
                      <path
                        d="M0,0 L380,0 Q500,50 380,180 Q280,300 380,400 L0,400 Z"
                        fill="url(#cardGrad4)"
                      />
                      <path
                        d="M0,0 L380,0 Q500,50 380,180 Q280,300 380,400 L0,400 Z"
                        fill="url(#cardPattern4)"
                        fillOpacity="0.8"
                      />
                      <circle
                        cx="120"
                        cy="130"
                        r="60"
                        fill="#E53935"
                        fillOpacity="0.06"
                      />
                      <circle
                        cx="80"
                        cy="280"
                        r="40"
                        fill="#E53935"
                        fillOpacity="0.08"
                      />
                    </svg>

                    {/* Left Side with Image */}
                    <div className="p-4 flex items-center justify-center w-full md:w-auto relative z-10">
                      <div className="relative image-container">
                        <div className="w-36 h-36 overflow-hidden md:w-44 md:h-44 flex items-center justify-center bg-gradient-to-br from-cherry-red to-cherry-burgundy rounded-full border-4 border-cherry-burgundy shadow-lg transform transition-all duration-300 hover:rotate-6">
                          <img
                            src="https://storage.cherrybot.ai/cherrySniper.webp"
                            alt="Cherry Sniper"
                            className="w-full h-full object-contain mt-6 animate-float"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side with Content */}
                    <div className="p-4 w-full md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-10">
                      <div className="mb-6">
                        <h3 className="text-[25px]   mb-4 maladroit-font text-cherry-burgundy transform transition-all duration-300">
                          Cherry Sniper
                        </h3>
                        <div className="h-1 w-24 bg-cherry-red mb-4 rounded-full red-line mx-auto md:mx-0"></div>
                        <p className="text-cherry-burgundy winky-sans-font text-lg transition-all duration-300">
                          Fastest Solana sniper, trade-to-earn
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={handleSnipeNow}
                          className="text-white bg-cherry-red   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                        >
                          <span className="text-white">Trade Now</span>
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
            </div>
            <div className="w-full flex justify-center items-center"></div>
          </div>
        </div>
        <div className="section_sniper_spotlight py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cherry-red opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cherry-cream opacity-0 rounded-full blur-3xl"></div>

          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="CherryPattern"
                  patternUnits="userSpaceOnUse"
                  width="80"
                  height="80"
                  patternTransform="rotate(25)"
                >
                  <circle cx="40" cy="40" r="2" fill="#d6024d" />
                  <circle cx="20" cy="20" r="1.5" fill="#d6024d" />
                  <circle cx="60" cy="60" r="1.5" fill="#d6024d" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#CherryPattern)" />
            </svg>
          </div>

          {/* Floating decorative elements */}
          <div
            className="absolute top-20 left-10 bg-cherry-red opacity-10 rounded-full w-20 h-20 animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 bg-cherry-red opacity-10 rounded-full right-10 w-16 h-16 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bg-cherry-red top-1/3 right-1/4 w-12 h-12 opacity-10 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Header Section */}
            <div className="text-center mb-16" data-spotlight-content>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] px-6 py-3 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                  <span className="text-xl md:text-xl   winky-sans-font text-cherry-burgundy">
                    Cherry Sniper
                  </span>
                </div>
              </div>

              <h2 className="text-xl md:text-3xl   maladroit-font text-cherry-red mb-8 leading-tight">
                Fastest Trade Executions or Trade in Privacy
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300">
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

                  <p className="winky-sans-font text-sm md:text-2xl text-cherry-burgundy leading-relaxed relative z-10">
                    Cherry Sniper will be the first trading bot that offer 2
                    trading modes: Sniper and Stealth. Sniper mode is entirely
                    focused on speed and advanced trading features while Stealth
                    focuses on privacy and being non custodial.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Showcase Section */}
            <div className="mb-20" data-spotlight-video>
              <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                {/* Video Container */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                  <div className="relative block md:hidden rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-cherry-burgundy/30 to-transparent z-10 pointer-events-none"></div>

                    <img
                      src="https://storage.cherrybot.ai/sniperImage.webp"
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                  <div className="md:block hidden bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-2 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/sniperImage.webp"
                        alt="cherrySniper"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>{" "}
                  {/* CTA Section */}
                  <div className="text-center mt-10" data-spotlight-cta>
                    <div className="inline-block">
                      <button
                        onClick={handleSnipeNow}
                        className="text-white bg-cherry-red   py-2 px-8 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu  flex items-center gap-3 shadow-[2px_2px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font group"
                      >
                        <span className="text-white text-xl">Learn More</span>
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
                  <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden transform md:rotate-1 hover:rotate-0 transition-all duration-300">
                    {/* Paper texture overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl maladroit-font text-cherry-burgundy mb-8 text-center">
                        Two Modes: Stealth & Sniper
                      </h3>

                      {/* Tab Buttons */}
                      <div className="flex gap-2 mb-8">
                        <button
                          onClick={() => setActiveTab("Cherry")}
                          className={`flex-1 py-3 px-6 rounded-xl border-4 winky-sans-font transition-all duration-300 transform hover:-translate-y-1 ${
                            activeTab === "Cherry"
                              ? "bg-cherry-red text-white border-cherry-burgundy shadow-[4px_4px_0px_#321017]"
                              : "bg-cherry-cream text-cherry-burgundy border-cherry-burgundy hover:bg-cherry-cream"
                          }`}
                        >
                          Stealth
                        </button>
                        <button
                          onClick={() => setActiveTab("speed")}
                          className={`flex-1 py-3 px-6 rounded-xl border-4 winky-sans-font transition-all duration-300 transform hover:-translate-y-1 ${
                            activeTab === "speed"
                              ? "bg-cherry-red text-white border-cherry-burgundy shadow-[4px_4px_0px_#321017]"
                              : "bg-cherry-cream text-cherry-burgundy border-cherry-burgundy hover:bg-cherry-cream"
                          }`}
                        >
                          Sniper
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="min-h-[400px]">
                        {activeTab === "Cherry" && (
                          <div className="space-y-4 animate-fadeIn">
                            {/* Trade in Privacy Card */}
                            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://storage.cherrybot.ai/Privacy.png"
                                    alt="Trade in Privacy"
                                    className="w-12 h-12 object-contain"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-cherry-burgundy mb-1">
                                    Trade in Privacy
                                  </h4>
                                  <p className="winky-sans-font text-cherry-burgundy opacity-80 text-sm">
                                    Your trades stay completely private with
                                    decentralized servers
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Non-custodial Wallet Card */}
                            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://storage.cherrybot.ai/Wallet.png"
                                    alt="Non-custodial wallet"
                                    className="w-12 h-12 object-contain"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-cherry-burgundy mb-1">
                                    Non custodial
                                  </h4>
                                  <p className="winky-sans-font text-cherry-burgundy opacity-80 text-sm">
                                    You maintain full control of your private
                                    keys and funds
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Key Security Card */}
                            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
                              <div className="relative z-10 flex items-start lg:items-center flex-col md:flex-row gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://storage.cherrybot.ai/keys.png"
                                    alt="Key Security"
                                    className="w-12 h-12 object-contain"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-cherry-burgundy mb-1">
                                    No one has access to your keys
                                  </h4>
                                  <p className="winky-sans-font text-cherry-burgundy opacity-80 text-sm">
                                    Complete privacy and security for your
                                    private keys
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "speed" && (
                          <div className="space-y-4 animate-fadeIn">
                            {/* Fastest Trading Bot Card */}
                            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://storage.cherrybot.ai/Fast.png"
                                    alt="Fastest Trading Bot"
                                    className="w-12 h-12 object-contain"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-cherry-burgundy mb-1">
                                    Fastest trading bot
                                  </h4>
                                  <p className="winky-sans-font text-cherry-burgundy opacity-80 text-sm">
                                    Lightning-fast trade execution with minimal
                                    latency and slippage
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Advanced Trading Features Card */}
                            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://storage.cherrybot.ai/Privacy2.png"
                                    alt="Advanced Trading Features"
                                    className="w-12 h-12 object-contain"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-cherry-burgundy mb-1">
                                    Advanced trading features
                                  </h4>
                                  <p className="winky-sans-font text-cherry-burgundy opacity-80 text-sm">
                                    Pro-level tools and settings for
                                    sophisticated traders
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Scales with Volume Card */}
                            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>
                              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://storage.cherrybot.ai/Rewards.png"
                                    alt="Scales with Volume"
                                    className="w-12 h-12 object-contain"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg maladroit-font text-cherry-burgundy mb-1">
                                    Scales with volume
                                  </h4>
                                  <p className="winky-sans-font text-cherry-burgundy opacity-80 text-sm">
                                    Automatically adjusts performance and
                                    capacity based on trading volume
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
        {/* Sniper Spotlight Section */}
        <div className="section_sniper_spotlight lg:py-24 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="spotlightPattern"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                  patternTransform="rotate(35)"
                >
                  <circle cx="30" cy="30" r="3" fill="#E53935" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#spotlightPattern)" />
            </svg>
          </div>

          {/* Floating decorative cherries */}
          <div
            className="absolute top-20 left-10 bg-cherry-red opacity-10 rounded-full w-16 h-16   animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 bg-cherry-red opacity-10 rounded-full right-10 w-12 h-12   animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bg-cherry-red top-1/2 right-1/4 w-32 h-32 opacity-10 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12   items-center justify-center">
              {/* Left side - Text content */}
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-video
              >
                <div className="relative block md:hidden rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-cherry-burgundy/30 to-transparent z-10 pointer-events-none"></div>

                  <VideoPlayer
                    src="https://storage.cherrybot.ai/cherryManage_compressed.mp4"
                    poster="https://storage.cherrybot.ai/cherryManage.webp"
                    className="w-full h-auto max-h-[60vh] object-cover"
                    autoPlay={true}
                  />
                </div>
                <div className="bg-cherry-cream md:block hidden rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-2 relative overflow-hidden transform -rotate-1 hover:rotate-0 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-cherry-burgundy">
                    <VideoPlayer
                      src="https://storage.cherrybot.ai/cherryManage.mp4"
                      poster="https://storage.cherrybot.ai/cherryManage.webp"
                      className="w-full h-auto max-h-[60vh] object-cover"
                      autoPlay={true}
                    />
                  </div>
                </div>
              </div>
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-content
              >
                <div className="spotlight-content-wrapper">
                  <div className="flex items-center justify-start mb-4">
                    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] px-6 py-3 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                      <span className="text-xl md:text-xl   winky-sans-font text-cherry-burgundy">
                        Management Bot
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-4xl   maladroit-font text-cherry-burgundy mb-6">
                    Auto-mod your TG. Track buys. Launch raids.
                  </h2>

                  <p className="winky-sans-font text-xl text-cherry-burgundy mb-8">
                    Keep your Telegram sharp — track buys live, trigger raid
                    calls, and manage your community like a pro.
                  </p>

                  <button
                    onClick={handleExploreBot}
                    className="text-white bg-cherry-red   py-3 px-7 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                  >
                    <span className="text-white">Explore Cherry Bot</span>
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

              {/* Right side - Video */}
            </div>
          </div>
        </div>

        <div className="section_sniper_spotlight py-24 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="spotlightPattern"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                  patternTransform="rotate(35)"
                >
                  <circle cx="30" cy="30" r="3" fill="#E53935" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#spotlightPattern)" />
            </svg>
          </div>

          {/* Floating decorative cherries */}
          <div
            className="absolute top-20 left-10 bg-cherry-red opacity-10 rounded-full w-16 h-16   animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 bg-cherry-red opacity-10 rounded-full right-10 w-12 h-12   animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bg-cherry-red top-1/2 right-1/4 w-32 h-32 opacity-10 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row    items-center justify-center">
              {/* Left side - Text content */}{" "}
              <div
                className=" w-full flex justify-center items-center"
                data-spotlight-content
              >
                <div className="spotlight-content-wrapper">
                  <div className="flex items-center mb-3">
                    <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] px-6 py-3 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                      <span className="text-xl   winky-sans-font text-cherry-burgundy">
                        Cherry Trending
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-4xl   maladroit-font text-cherry-burgundy mb-6">
                    Accurate Data, Powered by Decentralization.
                  </h2>

                  <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 mb-8 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300">
                    {/* Paper texture overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

                    <p className="winky-sans-font text-sm md:text-2xl text-cherry-burgundy leading-relaxed relative z-10">
                      Most trending tools rely on third-party data sources or
                      oracles, but these sources can sometimes provide
                      inaccurate or out-of-date information. Cherry trending
                      utilizes decentralized computation power to directly
                      gather, curate and present on-chain data, so that it
                      always provides accurate and real-time on-chain data.
                    </p>
                  </div>

                  {/* Two Column Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* For Users Column */}
                    <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform -rotate-1 hover:rotate-0 transition-all duration-300">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center mr-3">
                            <Icon
                              icon="mdi:account-group"
                              className="text-white"
                              width={20}
                              height={20}
                            />
                          </div>
                          <h3 className="text-xl   maladroit-font text-cherry-burgundy">
                            For Users
                          </h3>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cherry-red rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={12}
                                height={12}
                              />
                            </div>
                            <p className="winky-sans-font text-cherry-burgundy font-medium">
                              Accurate and real time on chain signals
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cherry-red rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={12}
                                height={12}
                              />
                            </div>
                            <p className="winky-sans-font text-cherry-burgundy font-medium">
                              Powered by decentralized computers
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cherry-red rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={12}
                                height={12}
                              />
                            </div>
                            <p className="winky-sans-font text-cherry-burgundy font-medium">
                              Zero reliance on centralized oracles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* For Teams Column */}
                    <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10"></div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center mr-3">
                            <Icon
                              icon="mdi:account-multiple"
                              className="text-white"
                              width={20}
                              height={20}
                            />
                          </div>
                          <h3 className="text-xl   maladroit-font text-cherry-burgundy">
                            For Teams
                          </h3>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cherry-red rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="winky-sans-font text-cherry-burgundy font-medium">
                              Boost visibility through real performance
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cherry-red rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="winky-sans-font text-cherry-burgundy font-medium">
                              Paid placements and ads
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-cherry-red rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                              <Icon
                                icon="mdi:check"
                                className="text-white"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="winky-sans-font text-cherry-burgundy font-medium">
                              Transparent ranking algorithms
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGetListed}
                    className="text-white bg-cherry-red   py-3 px-7 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-2 shadow-[2px_2px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                  >
                    <span className="text-white">Get Listed</span>
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
              <div
                className="w-full flex justify-center items-center"
                data-spotlight-video
              >
                <div className="  bg-cherry-cream mb-12   lg:h-[37rem] w-fit rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-2 relative overflow-hidden transform lg:rotate-3 hover:rotate-0 transition-all duration-300">
                  <div className="relative   w-fit h-full transform rounded-lg border-2 border-cherry-burgundy">
                    <img
                      src="https://storage.cherrybot.ai/trending.webp"
                      alt="Cherry Trending"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section_sniper_spotlight lg:px-0 px-4 py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cherry-red opacity-10 rounded-full blur-3xl"></div>

          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="spotlightPattern"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                  patternTransform="rotate(35)"
                >
                  <circle cx="30" cy="30" r="3" fill="#E53935" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#spotlightPattern)" />
            </svg>
          </div>

          {/* Floating decorative cherries */}
          <div
            className="absolute top-20 left-10 bg-cherry-red opacity-10 rounded-full w-16 h-16   animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 bg-cherry-red opacity-10 rounded-full right-10 w-12 h-12   animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bg-cherry-red top-1/2 right-1/4 w-32 h-32 opacity-10 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row  lg:px-32 gap-12 items-center justify-center">
              {/* Left side - Text content */}{" "}
              <div className="order-1 lg:order-2" data-spotlight-video>
                <div className="  bg-cherry-cream lg:h-[37rem] lg:w-[20rem] w-full rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-2 relative overflow-hidden transform lg:-rotate-3 hover:rotate-0 transition-all duration-300">
                  <div className="relative   w-full h-full transform rounded-lg border-2 border-cherry-burgundy">
                    <img
                      src="https://storage.cherrybot.ai/cherryGame.webp"
                      alt="Cherry Trending"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-2  " data-spotlight-content>
                <div className="spotlight-content-wrapper">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl   winky-sans-font text-cherry-burgundy">
                      Cherry Quest
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl   maladroit-font text-cherry-burgundy mb-6">
                    Click. Raid. Earn. Repeat.
                  </h2>

                  <p className="winky-sans-font text-xl text-cherry-burgundy mb-8">
                    The Cherry Game is your daily dose of degen dopamine. Mine
                    coins, upgrade cards, and raid to win $AIBOT.
                  </p>

                  <button
                    onClick={handleStartQuesting}
                    className="text-white bg-cherry-red   py-3 px-7 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font"
                  >
                    <span className="text-white">S2 Coming Soon</span>
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
              {/* Right side - Video */}
            </div>
          </div>
        </div>
        {/* Cherry AI in the News Section */}
        <div className="news-section relative w-full py-20 mt-16 md:mt-8   bg-opacity-80 overflow-hidden   ">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-cherry-red opacity-20 rounded-full animate-float pointer-events-none"></div>
            <div
              className="absolute bottom-24 left-10 w-24 h-24 bg-cherry-red opacity-20 rounded-full animate-float pointer-events-none"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-1/3 left-10 w-16 h-16 bg-cherry-red opacity-20 rounded-full rotate-45 animate-float pointer-events-none"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* Section Title */}
          <div className="relative z-20 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
            <h2 className="maladroit-font text-xl md:text-6xl text-cherry-burgundy mb-6 relative inline-block">
              Cherry AI in the News
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-red rounded-full transform"></div>
            </h2>
            <p className="winky-sans-font md:text-xl text-sm md:mt-10 mt-3 text-cherry-burgundy">
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
                  <div className="card-content h-[29rem] w-full flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full px-6 lg:p-10 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/aplogo.svg"
                        className="h-full object-cover"
                        alt="AP News Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        AP News
                      </h3>
                      <a
                        href="https://apnews.com/press-release/globenewswire-mobile/telegram-cherry-ai-cherry-trading-bot-9e438e6311a24fbd00c74e6c15e88538"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Insider Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full px-3 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/bInsider.svg"
                        className="w-full object-cover"
                        alt="Business Insider Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Business Insider
                      </h3>
                      <a
                        href="https://markets.businessinsider.com/news/stocks/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido-1034590807"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Morningstar Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full px-3 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/morningstar.svg"
                        className="w-full object-cover"
                        alt="Morningstar Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Morningstar
                      </h3>
                      <a
                        href="https://www.morningstar.com/news/globe-newswire/9423501/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Benzinga Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full 2xl:px-20 overflow-hidden bg-[#0b2242] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/benzinga.png"
                        className="w-full object-cover"
                        alt="Benzinga Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Benzinga
                      </h3>
                      <a
                        href="https://www.benzinga.com/pressreleases/25/04/g44844966/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Coin Telegraph Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/coinTelegraph.jpg"
                        className="h-full object-cover"
                        alt="Coin Telegraph Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Coin Telegraph
                      </h3>
                      <a
                        href="https://cointelegraph.com/press-releases/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* CoinCu Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#222222] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/coincu.png"
                        className="w-full object-cover"
                        alt="CoinCu Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        CoinCu
                      </h3>
                      <a
                        href="https://coincu.com/332913-cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* NewsBTC Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/newsbtc.png"
                        className="w-full object-cover"
                        alt="NewsBTC Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        NewsBTC
                      </h3>
                      <a
                        href="https://www.newsbtc.com/press-releases/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* TechBullion Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/techB.png"
                        className="w-full object-cover"
                        alt="TechBullion Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        TechBullion
                      </h3>
                      <a
                        href="https://techbullion.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Blockopedia Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/block.png"
                        className="w-full object-cover"
                        alt="Blockopedia Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Blockopedia
                      </h3>
                      <a
                        href="https://blockopedia.org/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stelareum Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/stelareum.svg"
                        className="w-full object-cover"
                        alt="Stelareum Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Stelareum
                      </h3>
                      <a
                        href="https://www.stelareum.io/en/wallet/blog/cherry-ai-a-revenue-backed-infrastructure-layer.html"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* The Bittimes Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/thebittimes.webp"
                        className="w-full object-cover"
                        alt="The Bittimes Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        The Bittimes
                      </h3>
                      <a
                        href="https://thebittimes.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido-tbt114039.html"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* CoinGabbar Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-gray-100 h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/coingabbar.png"
                        className="w-full object-cover"
                        alt="CoinGabbar Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        CoinGabbar
                      </h3>
                      <a
                        href="https://www.coingabbar.com/en/crypto-sponsored/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Captain Altcoin Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 2xl:px-20 overflow-hidden bg-gray-100 h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/captain.png"
                        className="w-full object-cover"
                        alt="Captain Altcoin Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Captain Altcoin
                      </h3>
                      <a
                        href="https://captainaltcoin.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* CoinMarketCap Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 overflow-hidden bg-white h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/coinmarketcap.svg"
                        className="w-full object-cover"
                        alt="CoinMarketCap Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        CoinMarketCap
                      </h3>
                      <a
                        href="https://coinmarketcap.com/community/articles/680252991235d9597fd7d36f/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Binance Card */}
                <div className="embla__slide">
                  <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 rounded-3xl border-4 border-cherry-burgundy bg-cherry-red shadow-[8px_8px_0px_#321017]">
                    <div className="w-full p-10 overflow-hidden bg-[#1f2a2e] h-1/2 flex items-center justify-center rounded-3xl border-2 border-cherry-burgundy">
                      <img
                        src="https://storage.cherrybot.ai/binance.svg"
                        className="w-full object-cover"
                        alt="Binance Logo"
                      />
                    </div>
                    <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                      <h3 className="maladroit-font text-xl xl:text-2xl text-cherry-cream uppercase">
                        Binance
                      </h3>
                      <a
                        href="https://app.binance.com/uni-qr/cart/23086862847145?r=22537208&l=en&uco=cZfRmUfvvPMs9bE0-EKROQ&uc=app_square_share_link&us=copylink/"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherry-burgundy text-cherry-cream px-8 py-3 rounded-xl border-2 border-cherry-cream hover:bg-[#620f20] hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold"
                      >
                        <span>Read Article</span>
                        <Icon
                          icon="tabler:external-link"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="  mt-32 relative   transform translate-y-16 transition-all duration-1000">
          <div className="  relative w-full py-20 bg-gradient-to-b from-cherry-red to-[#7d1231] border-y-4 border-cherry-burgundy overflow-hidden">
            {/* Section Title */}
            <div className="relative z-10 mb-16 text-center max-w-4xl mx-auto px-4">
              <h2 className="maladroit-font text-xl md:text-6xl text-cherry-cream mb-6 relative inline-block">
                Upcoming Features
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-cherry-cream rounded-full transform"></div>
              </h2>
              <p className="winky-sans-font lg:text-xl text-sm text-cherry-cream">
                Full control. Pro-level settings. Fastest execution on Solana.
                All in one powerful trading UI — connected to your wallet.
              </p>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4">
              <div className="w-full lg:px-44 my-3">
                <div className="  relative rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-cherry-burgundy/30 to-transparent z-10 pointer-events-none"></div>

                  <div className="block md:hidden">
                    <VideoPlayer
                      src="https://storage.cherrybot.ai/cherryTrade_compressed.mp4"
                      className="w-full h-auto max-h-[60vh] object-cover"
                      autoPlay={true}
                    />
                  </div>
                  <div className="hidden md:block">
                    <VideoPlayer
                      src="https://storage.cherrybot.ai/cherryTrade.mp4"
                      className="w-full h-auto max-h-[60vh] object-cover"
                      autoPlay={true}
                    />
                  </div>

                  {/* Info Bar */}
                  <div className="absolute bottom-0 z-30 left-0 right-0 p-3  bg-cherry-cream/90 backdrop-blur-sm border-t-2 border-cherry-burgundy flex flex-col md:flex-row justify-between items-center gap-4">
                    <button
                      className="bg-cherry-red text-white   py-1 px-3 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu   hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2 whitespace-nowrap"
                      onClick={() =>
                        window.open(
                          "https://docs.cherrybot.co/cherry-trade",
                          "_blank"
                        )
                      }
                    >
                      <span className="text-cherry-cream">Learn More</span>
                      <Icon
                        className="text-cherry-cream"
                        icon="mdi:book-open-variant"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="relative z-10 mt-16 max-w-2xl mx-auto px-4">
              <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>

                <h3 className="winky-sans-font md:text-2xl text-xl text-cherry-burgundy   mb-4 text-center">
                  Subscribe to our newsletter
                </h3>
                <p className="winky-sans-font text-cherry-burgundy mb-6 text-center">
                  Be the first to know when new Cherry features launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow py-3 px-4 rounded-xl border-2 border-cherry-burgundy focus:ring-2 focus:ring-cherry-red focus:outline-none"
                  />
                  <button
                    onClick={() => handleNewsletterSubscribe(email)}
                    disabled={isSubscribing}
                    className="bg-cherry-red text-white   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-cherry-cream">
                      {isSubscribing ? "Subscribing..." : "Subscribe"}
                    </span>
                    <Icon
                      icon={isSubscribing ? "mdi:loading" : "mdi:bell"}
                      width={20}
                      height={20}
                      className={`text-cherry-cream ${
                        isSubscribing ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={heroSectionRef}
          className="  scroll-container1 h-fit flex items-center justify-center relative overflow-hidden"
          id="home"
        >
          <div className="  relative z-10 max-w-8xl   my-28 px-4 lg:px-20">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              {/* Left Side Content */}
              <div className="md:w-3/5">
                <div className="  flex flex-col justify-center items-start bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 md:p-8 relative overflow-hidden transform rotate-1 mb-8">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 paper-texture"></div>

                  <span className="  maladroit-font text-xl md:text-3xl lg:text-4xl font-extrabold text-cherry-black leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center">
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
                      window.location.href = "/userGrowth";
                    }}
                    className="text-white bg-cherry-red    md:py-4 py-2 md:px-10 px-4   rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu text-xl flex items-center gap-2 shadow-[2px_2px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                  >
                    <span className="relative text-lg winky-sans-font text-cherry-cream">
                      Learn More
                    </span>
                    <Icon
                      className="text-cherry-cream"
                      icon="tabler:chart-pie"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              {/* Right Side - Floating Mascot/Chart */}
              <div className="w-full max-w-4xl relative  lg:p-10 p-4   ">
                <div className="relative z-10   float-element">
                  <img
                    src="https://storage.cherrybot.ai/chart.png"
                    alt="Cherry Analytics"
                    className="h-full  p-10  mx-auto rounded-xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#321017]"
                  />
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
