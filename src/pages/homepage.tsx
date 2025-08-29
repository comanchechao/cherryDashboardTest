import React, { useEffect, useState, useRef } from "react";

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
import {
  StatCards,
  Dexes,
  RoboticProfile,
  PartnersSection,
  SniperSpotlightSection,
  CommunitySection,
  NewsSection,
} from "./homepage/components";

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

  const [heroAnimated, setHeroAnimated] = useState(false);

  const featureCard1Ref = useRef<HTMLDivElement>(null);
  const featureCard2Ref = useRef<HTMLDivElement>(null);
  const featureCard3Ref = useRef<HTMLDivElement>(null);
  const featureCard4Ref = useRef<HTMLDivElement>(null);

  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const partnersContainerRef = useRef<HTMLDivElement>(null);
  const partnersTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);

    setTimeout(() => {
      setHeroAnimated(true);

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

      const vintagePaper = document.querySelector(".vintage-paper");
      if (vintagePaper) {
        vintagePaper.replaceWith(vintagePaper.cloneNode(true));
      }
    };
  });

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
                <div className="flex lg:w-1/2 w-full lg:items-start justify-center flex-col lg:px-16 items-center">
                  <div className="  ">
                    <h1 className="maladroit-font flex  items-center lg:justify-start justify-center text-3xl md:text-6xl lg:text-6xl font-bold text-[var(--color-text-primary)] leading-tight   max-w-4xl mx-auto">
                      Cherry
                      <span className="text-[var(--color-accent)]">
                        AI
                      </span>{" "}
                      <span className="ml-3">Robot</span>
                      <span className="block relative">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
                      </span>
                    </h1>

                    <p className="hero-description my-10 lg:text-left text-center text-sm lg:text-2xl text-[var(--color-text-secondary)]/80   max-w-3xl mx-auto leading-7">
                      Ecosystem of products that gather data to build data
                      models for AI powered robots.
                    </p>
                  </div>

                  <div className="hero-buttons w-full flex flex-col sm:flex-row lg:items-start items-center justify-start gap-6 mb-9">
                    <Dexes />
                  </div>
                </div>

                <div className="relative lg:w-1/2 w-full max-w-4xl mx-auto">
                  <div className="w-full aspect-[16/9] bg-transparent  relative overflow-hidden">
                    {/* Panel Content Placeholder */}{" "}
                    <div className="relative w-full h-full flex items-center justify-center  ">
                      <div className="absolute inset-0 rounded-[20px] z-10 pointer-events-none shadow-[inset_0_0_24px_rgba(67,103,201,0.25)]"></div>
                      <VideoPlayer
                        src="https://storage.cherrybot.ai/loop.mp4"
                        className="w-full h-full object-cover rounded-[20px]"
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

        <PartnersSection />
        <MarketForcast />
        <RoboticProfile />

        <StatCards
          id="features"
          title="CherryAI Robot Ecosystem Users"
          stats={[
            { value: "200K+", label: "Active Communities" },
            { value: "8M+", label: "Daily Prompts" },
            { value: "815K+", label: "Active Users" },
            { value: "100K+", label: "Daily Users" },
          ]}
          className="!mt-24"
        />
        <SniperSpotlightSection />
        <CommunitySection />

        <BinanceSupportSection />

        <NewsSection />
        <RevenueStreams />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
