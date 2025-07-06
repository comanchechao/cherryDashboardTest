import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/cherry.css";
import Navbar from "../layouts/Navbar";
import { Icon } from "@iconify/react";
import Footer from "../layouts/Footer";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define milestone data
const milestones = [
  {
    quarter: "Q2 2024",
    title: "Cherry Launch Phase",
    description: "Full bot launch and strategic partnerships",
    completed: true,
    items: [
      "Cherry Bot Full Launch",
      "Cherry Trending Launch",
      "Pinksale Partnership",
      "Ape Terminal Listing Partnership",
    ],
  },
  {
    quarter: "Q3 2024",
    title: "Cherry Quest Development",
    description: "Building and scaling core infrastructure",
    completed: true,
    items: [
      "Cherry Quest Development",
      "Begin Internal Testing: Cherry Quest",
      "Scale Cherry Bot Infrastructure",
      "Cherry Volume Bot Added",
      "Start Development of Cherry Trader Bot (Telegram)",
    ],
  },
  {
    quarter: "Q4 2024",
    title: "Cherry Quest Launch",
    description:
      "Beta and full launch of Cherry Quest with blockchain integration",
    completed: true,
    items: [
      "Cherry Quest Beta Launch",
      "Servers Scaling & Optimization",
      "Cherry Quest Full Launch",
      "Ton Blockchain Integration",
    ],
  },
  {
    quarter: "Q1 2025",
    title: "Token Economy & Ecosystem Growth",
    description:
      "Finalizing the token economy, building community, and driving global growth.",
    completed: false,
    items: [
      "Finalize $CHERRY economy architecture",
      "Build Community for Airdrop Campaign",
      "Strategic Partnerships for Token Launch",
      "Global Expansion & Ecosystem Growth",
    ],
  },
  {
    quarter: "Q2 2025",
    title: "Token & Trading Platform Launch",
    description: "Public launch of $CHERRY token and trading platform",
    completed: false,
    items: [
      "Cherry Trader Bot Launch on Telegram",
      "$CHERRY Token Public IDO",
      "Cherry Web Trading Platform Beta (with integrated Sniper Tool)",
      "Product Expansion Campaign & CEX Listings",
    ],
  },
  {
    quarter: "Q3 2025",
    title: "AI Integration & Full Platform Launch",
    description:
      "Introducing AI-powered features and launching the full web trading platform.",
    completed: false,
    items: [
      "$CHERRY Token Public Launch",
      "$CHERRY Airdrop Distribution Begins",
      "AI Integration Beta Launch",
      "Best Token Performance Detection",
      "Market Sentiment Tracking",
      "Trade Opportunity Suggestions",
      "Full Launch of Cherry Web Trading Platform",
      "Feedback-Driven Feature Refinement",
    ],
  },
];

const Roadmap: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const rocketCherryRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const achievementsListRef = useRef<HTMLUListElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<number>(3); // Q1 2025 is the first "in progress" milestone
  const [activeTab, setActiveTab] = useState<string>("sniper"); // Added state to track active tab

  // Newsletter subscription state
  const [email, setEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);

  const handleTrySniper = () => {
    window.location.href = "https://t.me/cherrysniperbot";
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

  const handleJoinWaitlist = () => {
    const element = document.getElementById("newsletter-signup-roadmap");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useLayoutEffect(() => {
    const swiperCssLink = document.createElement("link");
    swiperCssLink.rel = "stylesheet";
    swiperCssLink.href =
      "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    document.head.appendChild(swiperCssLink);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.async = true;

    script.onload = () => {
      const initSwiper = document.createElement("script");
      initSwiper.textContent = `
        var newsSwiper = new Swiper(".newsSwiper", {
          slidesPerView: 3,
          spaceBetween: 30,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          effect: "slide",
          loop: true,
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
        });
      `;
      document.body.appendChild(initSwiper);
    };

    document.body.appendChild(script);

    let ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      const imageContainer = imageContainerRef.current;
      const rocketCherry = rocketCherryRef.current;
      const timeline = timelineRef.current;

      if (scrollContainer && imageContainer && rocketCherry) {
        const totalWidth = imageContainer.scrollWidth - window.innerWidth;
        const slowerMovementDistance = totalWidth * 0.2;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainer,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 4,
            pin: true,
            onEnter: () => {
              gsap.fromTo(
                rocketCherry,
                { opacity: 0 },
                { opacity: 1, duration: 0.7 }
              );
              document
                .getElementById("triggerXoverFlow")
                ?.classList.remove("overflow-x-hidden");

              document
                .getElementById("triggerXoverFlow1")
                ?.classList.remove("overflow-x-hidden");
            },
            onEnterBack: () =>
              gsap.to(rocketCherry, { opacity: 1, duration: 0.8 }),
            onLeaveBack: () =>
              gsap.to(rocketCherry, { opacity: 0, duration: 0.5 }),
            onLeave: () => gsap.to(rocketCherry, { opacity: 0, duration: 0.5 }),
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          scrollContainer,
          { x: 0 },
          { x: -totalWidth, ease: "none" }
        ).to(rocketCherry, { x: slowerMovementDistance, ease: "none" }, 0);
      }

      if (timeline) {
        gsap.from(".milestone-item", {
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
          },
        });

        gsap.from(".timeline-track", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
          },
        });

        gsap.from(".milestone-connector", {
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
          },
        });
      }
    });

    return () => {
      ctx.revert();
      document.head.removeChild(swiperCssLink);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleMilestoneClick = (index: number) => {
    setActiveMilestone(index);

    if (achievementsListRef.current) {
      const tl = gsap.timeline();

      tl.set(achievementsListRef.current.children, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        rotation: -2,
      });

      tl.to(achievementsListRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        stagger: 0.1,
        duration: 1,
        ease: "elastic.out(1, 2)",
      });

      achievementsListRef.current.childNodes.forEach((child, i) => {
        if (child instanceof HTMLElement) {
          tl.to(
            child,
            {
              boxShadow: "0 0 15px rgba(255, 133, 133, 0.8)",
              duration: 1,
              delay: i * 0.1 + 0.4,
            },
            "<"
          );

          tl.to(child, {
            boxShadow: "0 0 0 rgba(255, 133, 133, 0)",
            duration: 1,
            clearProps: "boxShadow",
          });
        }
      });
    }
  };

  useEffect(() => {
    const timelineElements = document.querySelectorAll(
      ".milestone-item, .timeline-track, .milestone-connector"
    );
    timelineElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
      }
    });

    // Add custom keyframes to document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.head.appendChild(styleSheet);

    if (achievementsListRef.current) {
      const tl = gsap.timeline();

      tl.set(achievementsListRef.current.children, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        rotation: -2,
      });

      tl.to(achievementsListRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        stagger: 0.1,
        duration: 1,
        ease: "elastic.out(1, 2)",
      });

      // Add highlight effect to each item
      achievementsListRef.current.childNodes.forEach((child, i) => {
        if (child instanceof HTMLElement) {
          tl.to(
            child,
            {
              boxShadow: "0 0 15px rgba(255, 133, 133, 0.8)",
              duration: 1,
              delay: i * 0.1 + 0.4,
            },
            "<"
          );

          tl.to(child, {
            boxShadow: "0 0 0 rgba(255, 133, 133, 0)",
            duration: 1,
            clearProps: "boxShadow",
          });
        }
      });
    }

    // Initialize tab animation
    animateTabContent(activeTab);

    // Clean up
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, [activeTab]); // Added activeTab as dependency

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
            $Cherry
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
        <div className="hero_section scroll-container1" id="home">
          <div className="header">
            <Navbar />

            {/* Success Toast for Newsletter */}
            <div
              className={`fixed top-10 right-10 z-50 bg-green-100 border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_#22c55e] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
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

            <div className="text-center   mt-16 mb-10 w-full flex items-center justify-center text-cherry-burgundy">
              <h2 className="text-2xl lg:text-5xl maladroit-font">
                Cherry AI's Roadmap
              </h2>
            </div>

            {/* Milestone Timeline Section - Mobile Optimized */}
            <div className="max-w-[88rem] my-20 mx-auto lg:px-4">
              {/* Desktop Version */}
              <div className="hidden lg:flex flex-col bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] lg:p-6 p-2 relative overflow-hidden transform lg:rotate-1">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold maladroit-font text-cherry-burgundy mb-3">
                    Our Journey So Far
                  </h3>
                  <p className="winky-sans-font text-cherry-burgundy text-lg">
                    Track our progress as we build the future of AI-powered
                    crypto tools.
                  </p>
                </div>

                {/* Timeline track */}
                <div ref={timelineRef} className="relative py-8">
                  <div className="timeline-track absolute h-2 bg-cherry-burgundy top-1/2 left-0 right-0 -translate-y-1/2 rounded-full"></div>

                  {/* Milestone points */}
                  <div className="flex justify-between relative z-10">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="milestone-item flex flex-col items-center cursor-pointer group"
                        onClick={() => handleMilestoneClick(index)}
                      >
                        <div
                          className={`milestone-connector w-7 h-7 rounded-full border-4 border-cherry-burgundy flex items-center justify-center 
                            ${
                              milestone.completed
                                ? "bg-cherry-red"
                                : "bg-cherry-cream"
                            } 
                            ${
                              activeMilestone === index
                                ? "ring-4 ring-cherry-red ring-opacity-50 scale-125"
                                : ""
                            }
                            transition-all duration-300 hover:scale-110 group-hover:shadow-lg relative
                            after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-ping after:bg-cherry-red after:opacity-40 after:scale-125 after:z-[-1] after:duration-[1.5s]
                            ${
                              activeMilestone === index
                                ? "after:opacity-30"
                                : "after:opacity-0"
                            }
                          `}
                        >
                          {milestone.completed && (
                            <svg
                              className="w-3 h-3 text-white"
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
                          )}

                          {/* Tooltip indicating clickability */}
                          <div className="absolute w-24 -top-10 left-1/2 -translate-x-1/2 bg-cherry-burgundy text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            Click to view
                          </div>
                        </div>
                        <div
                          className={`mt-2 text-xs font-bold winky-sans-font text-cherry-burgundy group-hover:scale-110 transition-all duration-300
                          ${
                            activeMilestone === index
                              ? "text-cherry-red font-extrabold scale-110"
                              : ""
                          }
                        `}
                        >
                          {milestone.quarter}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active milestone details */}
                <div className="mt-6 p-6 bg-cherry-burgundy bg-opacity-60 rounded-lg border-2 border-cherry-burgundy relative overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] h-full transition-all duration-500 transform">
                        <h4 className="text-2xl font-bold maladroit-font text-cherry-burgundy mb-2 transition-all duration-300">
                          {milestones[activeMilestone].title}
                        </h4>
                        <div className="h-1 w-16 bg-cherry-red mb-3 rounded-full transform origin-left transition-all duration-500"></div>
                        <p className="winky-sans-font text-lg text-cherry-burgundy mb-2 transition-all duration-300">
                          {milestones[activeMilestone].description}
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                              milestones[activeMilestone].completed
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            {milestones[activeMilestone].completed ? (
                              <Icon
                                icon="lets-icons:check-ring-round"
                                width="28"
                                height="28"
                              />
                            ) : (
                              <Icon
                                icon="tabler:progress"
                                width="28"
                                height="28"
                              />
                            )}
                          </div>
                          <span className="text-xl winky-sans-font font-bold transition-all duration-300">
                            {milestones[activeMilestone].completed
                              ? "Completed"
                              : "In Progress"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] h-full">
                        <h4 className="text-xl font-bold maladroit-font text-cherry-burgundy mb-3">
                          Milestone Achievements
                        </h4>
                        <ul
                          ref={achievementsListRef}
                          className="space-y-3 transition-all flex items-center justify-center flex-col ml-0 !pl-0 duration-800"
                        >
                          {milestones[activeMilestone].items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start w-full bg-cherry-red p-2 rounded-full gap-3"
                            >
                              <Icon
                                icon="lets-icons:check-ring-round"
                                width="28"
                                height="28"
                                className="text-cherry-cream"
                              />
                              <span className="winky-sans-font lg:text-lg text-sm text-cherry-cream">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex justify-between mt-6">
                          <button
                            onClick={() =>
                              activeMilestone > 0 &&
                              handleMilestoneClick(activeMilestone - 1)
                            }
                            className={`text-cherry-burgundy bg-cherry-cream py-2 px-4 rounded-lg border-2 border-cherry-burgundy hover:bg-cherry-red hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
                              activeMilestone === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={activeMilestone === 0}
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 12H5M5 12L12 19M5 12L12 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-sm winky-sans-font font-bold">
                              Previous
                            </span>
                          </button>

                          <button
                            onClick={() =>
                              activeMilestone < milestones.length - 1 &&
                              handleMilestoneClick(activeMilestone + 1)
                            }
                            className={`text-cherry-burgundy bg-cherry-cream py-2 px-4 rounded-lg border-2 border-cherry-burgundy hover:bg-cherry-red hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
                              activeMilestone === milestones.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={activeMilestone === milestones.length - 1}
                          >
                            <span className="text-sm winky-sans-font font-bold">
                              Next
                            </span>
                            <svg
                              className="w-4 h-4"
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

              {/* Mobile Version - Vertical Timeline */}
              <div className="lg:hidden px-2 sm:px-4">
                <div className="bg-cherry-cream rounded-lg border-3 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] p-3 sm:p-4 relative overflow-hidden">
                  <div className="mb-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold maladroit-font text-cherry-burgundy mb-2">
                      Our Journey So Far
                    </h3>
                    <p className="winky-sans-font text-cherry-burgundy text-sm sm:text-base px-2">
                      Track our progress as we build the future of AI-powered
                      crypto tools.
                    </p>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative px-1.2">
                    {/* Vertical line */}
                    <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-cherry-burgundy rounded-full"></div>

                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`relative flex items-start mb-6 last:mb-0 cursor-pointer transition-all duration-300 ${
                          activeMilestone === index ? "active-milestone" : ""
                        }`}
                        onClick={() => handleMilestoneClick(index)}
                      >
                        {/* Timeline dot */}
                        <div className="relative z-10 flex-shrink-0 mr-3 sm:mr-4">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 border-cherry-burgundy flex items-center justify-center transition-all duration-300 active:scale-95 ${
                              milestone.completed
                                ? "bg-cherry-red"
                                : "bg-cherry-cream"
                            } ${
                              activeMilestone === index
                                ? "ring-2 ring-cherry-red ring-opacity-50 scale-110 shadow-lg"
                                : ""
                            }`}
                          >
                            {milestone.completed ? (
                              <Icon
                                icon="lets-icons:check-ring-round"
                                width="16"
                                height="16"
                                className="text-white sm:w-5 sm:h-5"
                              />
                            ) : (
                              <Icon
                                icon="tabler:progress"
                                width="16"
                                height="16"
                                className="text-cherry-burgundy sm:w-5 sm:h-5"
                              />
                            )}
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 min-w-0">
                          <div
                            className={`bg-cherry-cream rounded-lg border-2 border-cherry-burgundy shadow-[2px_2px_0px_#321017] p-3 sm:p-4 transition-all duration-300 active:scale-98 ${
                              activeMilestone === index
                                ? "bg-cherry-red bg-opacity-10 border-cherry-red shadow-[3px_3px_0px_#321017] ring-1 ring-cherry-red ring-opacity-30"
                                : ""
                            }`}
                          >
                            {/* Quarter badge */}
                            <div className="inline-block bg-cherry-burgundy text-cherry-cream px-2 py-1 rounded-full text-xs sm:text-sm font-bold winky-sans-font mb-3">
                              {milestone.quarter}
                            </div>

                            <h4 className="text-base sm:text-lg font-bold maladroit-font text-cherry-burgundy mb-2 leading-tight">
                              {milestone.title}
                            </h4>

                            <p className="winky-sans-font text-cherry-burgundy text-xs sm:text-sm mb-3 opacity-80 leading-relaxed">
                              {milestone.description}
                            </p>

                            {/* Tap indicator for inactive milestones */}
                            {activeMilestone !== index && (
                              <div className="flex items-center gap-1 text-cherry-burgundy opacity-60 mb-2">
                                <Icon
                                  icon="material-symbols:touch-app"
                                  width="14"
                                  height="14"
                                />
                                <span className="text-xs winky-sans-font">
                                  Tap to view details
                                </span>
                              </div>
                            )}

                            {/* Collapsible achievements */}
                            <div
                              className={`transition-all duration-500 overflow-hidden ${
                                activeMilestone === index
                                  ? "max-h-screen opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              <div className="border-t border-cherry-burgundy pt-3 mt-3">
                                <h5 className="text-xs sm:text-sm font-bold winky-sans-font text-cherry-burgundy mb-3 flex items-center gap-1">
                                  <Icon
                                    icon="material-symbols:check-circle"
                                    width="14"
                                    height="14"
                                  />
                                  Achievements:
                                </h5>
                                <div className="space-y-2">
                                  {milestone.items.map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-2 bg-cherry-red bg-opacity-90 text-cherry-cream p-2.5 rounded-lg text-xs sm:text-sm winky-sans-font leading-relaxed"
                                    >
                                      <Icon
                                        icon="lets-icons:check-ring-round"
                                        width="14"
                                        height="14"
                                        className="text-cherry-cream flex-shrink-0 mt-0.5"
                                      />
                                      <span className="flex-1">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Status indicator */}
                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-cherry-burgundy border-opacity-30">
                              <div
                                className={`w-2.5 h-2.5 rounded-full ${
                                  milestone.completed
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              ></div>
                              <span className="text-xs winky-sans-font font-bold text-cherry-burgundy">
                                {milestone.completed
                                  ? "Completed"
                                  : "In Progress"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex justify-center gap-3 mt-6 pt-4 border-t-2 border-cherry-burgundy">
                    <button
                      onClick={() =>
                        activeMilestone > 0 &&
                        handleMilestoneClick(activeMilestone - 1)
                      }
                      className={`text-cherry-burgundy bg-cherry-cream py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg border-2 border-cherry-burgundy transition-all duration-300 active:scale-95 flex items-center gap-2 winky-sans-font font-bold text-xs sm:text-sm touch-manipulation ${
                        activeMilestone === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "shadow-[2px_2px_0px_#321017] active:shadow-[1px_1px_0px_#321017] active:translate-x-0.5 active:translate-y-0.5"
                      }`}
                      disabled={activeMilestone === 0}
                    >
                      <Icon
                        icon="mdi:chevron-up"
                        width="16"
                        height="16"
                        className="sm:w-5 sm:h-5"
                      />
                      <span className="hidden xs:inline">Previous</span>
                      <span className="xs:hidden">Prev</span>
                    </button>

                    <div className="flex items-center px-3 py-1 bg-cherry-burgundy text-cherry-cream rounded-full text-xs font-bold winky-sans-font">
                      {activeMilestone + 1} / {milestones.length}
                    </div>

                    <button
                      onClick={() =>
                        activeMilestone < milestones.length - 1 &&
                        handleMilestoneClick(activeMilestone + 1)
                      }
                      className={`text-cherry-burgundy bg-cherry-cream py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg border-2 border-cherry-burgundy transition-all duration-300 active:scale-95 flex items-center gap-2 winky-sans-font font-bold text-xs sm:text-sm touch-manipulation ${
                        activeMilestone === milestones.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : "shadow-[2px_2px_0px_#321017] active:shadow-[1px_1px_0px_#321017] active:translate-x-0.5 active:translate-y-0.5"
                      }`}
                      disabled={activeMilestone === milestones.length - 1}
                    >
                      <span className="hidden xs:inline">Next</span>
                      <span className="xs:hidden">Next</span>
                      <Icon
                        icon="mdi:chevron-down"
                        width="16"
                        height="16"
                        className="sm:w-5 sm:h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* Changelog Section */}
              <div className="max-w-[88rem] my-20 mx-auto px-4">
                <div className="flex flex-col bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] lg:p-6 p-2 relative overflow-hidden transform lg:-rotate-1">
                  <div className="mb-6 relative z-10">
                    <h3 className="md:text-3xl text-xl font-bold maladroit-font text-cherry-burgundy mb-3">
                      Product Changelog
                    </h3>
                    <p className="winky-sans-font text-cherry-burgundy md:text-lg text-sm">
                      Stay up to date with the latest improvements and features
                      added to our ecosystem.
                    </p>
                  </div>

                  <div className="relative z-10">
                    {/* Tab inputs (hidden) */}
                    <div className="flex border-b-4 border-cherry-burgundy">
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
                        className={`py-2 px-6 rounded-t-lg border-t-2 border-l-2 border-r-2 border-cherry-burgundy font-bold winky-sans-font relative overflow-hidden cursor-pointer mr-2 transition-all duration-300     ${
                          activeTab === "sniper"
                            ? "bg-cherry-red text-white  "
                            : "bg-cherry-cream text-cherry-burgundy"
                        }`}
                      >
                        Cherry Sniper
                      </label>

                      <label
                        htmlFor="trade"
                        className={`py-2 px-6 rounded-t-lg border-t-2 border-l-2 border-r-2 border-cherry-burgundy font-bold winky-sans-font relative overflow-hidden cursor-pointer transition-all duration-300   ${
                          activeTab === "trade"
                            ? "bg-cherry-red text-white  "
                            : "bg-cherry-cream text-cherry-burgundy"
                        }`}
                      >
                        Cherry Trade
                      </label>
                    </div>

                    {/* Tab content */}
                    <div className="mt-6">
                      {/* Cherry Sniper content */}
                      <div className="tab-content sniper-content hidden">
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Left Side - Changelog */}
                          <div className="md:w-2/5 space-y-6">
                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Version 2.2.3
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    June 8, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>
                                  Integrated API for showing limit and DCA
                                  orders in UI
                                </li>
                                <li>
                                  Added closing functionality for DCA and limit
                                  orders
                                </li>
                                <li>
                                  Implemented USD validation in validatePrice
                                  API
                                </li>
                                <li>
                                  Enhanced DCA order management and changes
                                </li>
                              </ul>
                            </div>

                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Version 2.2.1
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    June 5, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>Added custom RPC endpoint configuration</li>
                                <li>
                                  Implemented DCA and limit order failure
                                  notifications
                                </li>
                                <li>
                                  Enhanced blockchain connectivity options
                                </li>
                              </ul>
                            </div>

                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Version 2.1.5
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    June 1, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>Fixed custom fee calculation issues</li>
                                <li>
                                  Removed embedded links after buy/sell
                                  transactions
                                </li>
                                <li>
                                  Code optimization and performance improvements
                                </li>
                              </ul>
                            </div>

                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Version 2.1.3
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    May 28, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>Added editing for DCA and limit orders</li>
                                <li>Fixed UI responsiveness issues</li>
                                <li>Improved transaction confirmation speed</li>
                              </ul>
                            </div>

                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Version 2.1.0
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    May 25, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>
                                  Added APIs for listing DCA & limit orders in
                                  UI
                                </li>
                                <li>Implemented new dashboard layout</li>
                                <li>Enhanced order history tracking</li>
                              </ul>
                            </div>

                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Version 2.0.5
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    May 20, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>
                                  Fixed price calculation for USD in limit and
                                  DCA orders
                                </li>
                                <li>Improved gas optimization</li>
                                <li>Added support for additional EVM chains</li>
                              </ul>
                            </div>
                          </div>

                          {/* Right Side - Screenshot */}
                          <div className="md:w-3/5">
                            <div className="bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[8px_8px_0px_#321017] h-fit">
                              <div className="overflow-hidden rounded-lg border-2 border-cherry-burgundy sniper-image">
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
                                <h4 className="md:text-xl text-lg font-bold maladroit-font text-cherry-burgundy">
                                  Cherry Sniper Dashboard
                                </h4>
                                <p className="winky-sans-font my-2 text-cherry-burgundy">
                                  The Fastest Way to Trade on Solana.
                                </p>
                                <button
                                  onClick={handleTrySniper}
                                  className="inline-block mt-4 text-white bg-cherry-red font-bold py-2 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                                >
                                  <span className="flex text-cherry-cream items-center gap-2">
                                    Try Cherry Sniper
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
                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Coming Soon
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    June 15, 2025
                                  </span>
                                </div>
                              </div>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>
                                  Advanced trading interface with live charts
                                </li>
                                <li>Multi-chain portfolio management</li>
                                <li>AI-powered trade suggestions</li>
                              </ul>
                            </div>

                            <div className="changelog-item bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[4px_4px_0px_#321017] relative">
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
                                  <h5 className="font-bold winky-sans-font text-cherry-burgundy">
                                    Development Update
                                  </h5>
                                  <span className="text-sm text-gray-600">
                                    June 1, 2025
                                  </span>
                                </div>
                              </div>
                              <p className="text-cherry-burgundy winky-sans-font mb-2">
                                Cherry Trade is currently in development with
                                the following features planned:
                              </p>
                              <ul className="space-y-2 ml-6 list-disc text-cherry-burgundy winky-sans-font">
                                <li>Seamless integration with Cherry Sniper</li>
                                <li>
                                  Custom trading strategies and automation
                                </li>
                                <li>Social trading and strategy sharing</li>
                              </ul>
                            </div>
                          </div>

                          {/* Right Side - Mockup */}
                          <div className="md:w-3/5">
                            <div className="bg-cherry-cream p-4 rounded-lg border-2 border-cherry-burgundy shadow-[8px_8px_0px_#321017] h-full">
                              <div className="relative overflow-hidden rounded-lg border-2 border-cherry-burgundy bg-gray-900 h-80 flex items-center justify-center trade-mockup">
                                {/* Placeholder for Cherry Trade mockup */}
                                <div className="absolute inset-0 flex items-center justify-center bg-cherry-burgundy">
                                  <div className="relative z-20 p-6 text-center">
                                    <h3 className="md:text-2xl text-lg font-bold maladroit-font text-cherry-cream mb-2">
                                      Coming Soon
                                    </h3>
                                    <p className="winky-sans-font text-cherry-cream mb-4">
                                      The next evolution in AI-powered crypto
                                      trading
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 text-center">
                                <h4 className="md:text-xl text-lg font-bold maladroit-font text-cherry-burgundy">
                                  Cherry Trade Platform
                                </h4>
                                <p className="winky-sans-font my-2 text-cherry-burgundy">
                                  Sign up for early access to our revolutionary
                                  trading platform
                                </p>
                                <button
                                  onClick={handleJoinWaitlist}
                                  className="inline-block mt-4 text-white bg-cherry-red font-bold py-2 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu winky-sans-font shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                                >
                                  <span className="flex text-cherry-cream items-center gap-2">
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

            {/* Newsletter signup section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div
                id="newsletter-signup-roadmap"
                className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-8 relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>

                <div className="relative z-10 text-center">
                  <img
                    src="https://storage.cherrybot.ai/cherrySniper.webp"
                    alt="Cherry AI"
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="maladroit-font md:text-3xl text-xl font-bold text-cherry-burgundy mb-4">
                    Join the Cherry Trade Waitlist
                  </h3>
                  <p className="winky-sans-font md:text-lg text-sm text-cherry-burgundy mb-8 max-w-2xl mx-auto">
                    Be among the first to experience our revolutionary Web3
                    trading platform. Get early access, exclusive features, and
                    priority support.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow py-3 px-4 rounded-xl border-2 border-cherry-burgundy focus:ring-2 focus:ring-cherry-red focus:outline-none winky-sans-font"
                    />
                    <button
                      onClick={() => handleNewsletterSubscribe(email)}
                      disabled={isSubscribing}
                      className="bg-cherry-red text-white font-bold py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-cherry-cream">
                        {isSubscribing ? "Joining..." : "Join Waitlist"}
                      </span>
                      <Icon
                        icon={isSubscribing ? "mdi:loading" : "mdi:rocket"}
                        width={20}
                        height={20}
                        className={`text-cherry-cream ${
                          isSubscribing ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center gap-2 text-cherry-burgundy">
                      <Icon
                        icon="mdi:flash"
                        className="text-cherry-red"
                        width={16}
                        height={16}
                      />
                      <span className="winky-sans-font">Early Access</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-cherry-burgundy">
                      <Icon
                        icon="mdi:star"
                        className="text-cherry-red"
                        width={16}
                        height={16}
                      />
                      <span className="winky-sans-font">
                        Exclusive Features
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-cherry-burgundy">
                      <Icon
                        icon="mdi:headset"
                        className="text-cherry-red"
                        width={16}
                        height={16}
                      />
                      <span className="winky-sans-font">Priority Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="relative overflow-x-hidden">
              <img
                ref={rocketCherryRef}
                src="https://storage.cherrybot.ai/rocketCherry.png"
                className="lg:w-96 w-56 fixed left-14 opacity-0 bottom-20 z-50 object-contain pointer-events-none"
                alt="Rocket Cherry"
                id="rocketCherry"
              />
              <div
                ref={scrollContainerRef}
                className="h-screen relative scroll-container w-full"
              >
                <div
                  className="flex aboveImageContainer items-center w-full overflow-x-scroll overflow-y-hidden"
                  style={{ width: "8400px" }}
                >
                  <div
                    ref={imageContainerRef}
                    className="image-container h-full"
                    style={{ width: "8400px" }}
                  >
                    <picture>
                      <source
                        className="h-screen w-auto object-fill"
                        srcSet="https://storage.cherrybot.ai/phoneRoadmap.webp"
                        media="(max-width: 768px)"
                      />
                      <img
                        className="h-screen w-auto object-fill"
                        src="https://storage.cherrybot.ai/width1.webp"
                        alt="Roadmap Image"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div> */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
