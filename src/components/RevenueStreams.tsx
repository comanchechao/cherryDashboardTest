import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const RevenueStreams: React.FC = () => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const containerRef = useRef<HTMLDivElement>(null);
  const cherryRef = useRef<HTMLImageElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const streamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);

  const streams = [
    {
      title: "Bot Upgrades",
      subtitle: "& Features",
      icon: "mdi:robot-happy",
      description: "Unlock advanced trading tools and priority features",
      details: [
        "Priority trending slots",
        "Advanced order types",
        "Custom notifications",
        "Premium analytics",
      ],
      position: 0, // Top
    },
    {
      title: "Game Rewards",
      subtitle: "& Boosts",
      icon: "ion:game-controller",
      description: "Earn and spend in Cherry Tap Game ecosystem",
      details: [
        "Mining power boosts",
        "Card upgrades",
        "Exclusive power-ups",
        "Leaderboard rewards",
      ],
      position: 1, // Top Right
    },
    {
      title: "Fee",
      subtitle: "Sharing",
      icon: "mdi:cash-sync",
      description: "Revenue sharing based on activity and holdings",
      details: [
        "Trading volume rewards",
        "Leaderboard bonuses",
        "Platform fee sharing",
        "Referral commissions",
      ],
      badge: "Coming Soon",
      position: 2, // Bottom Right
    },
    {
      title: "Buyback",
      subtitle: "& Burn",
      icon: "mdi:fire-circle",
      description: "Deflationary mechanism using platform profits",
      details: [
        "Ad revenue buybacks",
        "Promotion fee burns",
        "Supply reduction",
        "Price support",
      ],
      position: 3, // Bottom
    },
    {
      title: "Staking",
      subtitle: "System",
      icon: "mdi:trophy-award",
      description: "Leveled staking with XP and rewards",
      details: [
        "10-level progression",
        "XP-based rewards",
        "Loot box system",
        "Governance access",
      ],
      position: 4, // Bottom Left
    },
    {
      title: "Airdrop",
      subtitle: "Eligibility",
      icon: "icon-park-solid:parachute",
      description: "Increase your chances for exclusive airdrops",
      details: [
        "Holder tier benefits",
        "Activity multipliers",
        "Partner airdrops",
        "Community rewards",
      ],
      position: 5, // Top Left
    },
  ];

  // Calculate positions for cards in a circle around center
  const getCardPosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90; // Start from top (-90 degrees)
    const angleRad = (angle * Math.PI) / 180;

    // Move specific cards closer to center
    let radius = 350; // Default distance from center in pixels

    // Bot Upgrades (index 0 - top) and Buyback (index 3 - bottom) closer to center
    if (index === 0 || index === 3) {
      radius = 280; // Closer to center
    }

    return {
      x: Math.cos(angleRad) * radius,
      y: Math.sin(angleRad) * radius,
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".revenue-title", { opacity: 0, y: 50 });
    gsap.set(cherryRef.current, { scale: 0, opacity: 0, rotation: -180 });
    gsap.set(auraRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(streamRefs.current.filter(Boolean), { opacity: 0, scale: 0.5 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title
    timeline.to(
      ".revenue-title",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      0
    );

    // Animate central cherry
    timeline.to(
      cherryRef.current,
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      },
      0.3
    );

    // Animate aura
    timeline.to(
      auraRef.current,
      {
        scale: 1,
        opacity: 0.7,
        duration: 1,
        ease: "power2.out",
      },
      0.5
    );

    // Continuous aura pulsing
    const auraTimeline = gsap.timeline({ repeat: -1, delay: 1.5 });
    auraTimeline
      .to(auraRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        ease: "power1.out",
      })
      .set(auraRef.current, { scale: 0.8, opacity: 0.7 });

    // Animate cards
    streamRefs.current.forEach((ref, index) => {
      if (ref) {
        timeline.to(
          ref,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          0.8 + index * 0.15
        );
      }
    });

    // Animate lines
    lineRefs.current.forEach((ref, index) => {
      if (ref) {
        const length = ref.getTotalLength();
        gsap.set(ref, { strokeDasharray: length, strokeDashoffset: length });
        timeline.to(
          ref,
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          1.2 + index * 0.1
        );
      }
    });

    // Create animated dots after lines are drawn
    const createPulsatingDots = (path: SVGPathElement, delay: number) => {
      if (!path.parentElement) return;

      // Create 3 dots per path
      const numDots = 3;
      const dotSpacing = 0.8; // Delay between each dot

      for (let i = 0; i < numDots; i++) {
        const dot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        dot.setAttribute("r", "6"); // Bigger base size
        dot.setAttribute("fill", "#d6024d");
        dot.style.filter = "drop-shadow(0 0 12px rgba(214, 2, 77, 0.9))";
        path.parentElement.appendChild(dot);

        const dotDelay = delay + i * dotSpacing;

        // Animation moving from card to center along the path
        gsap.fromTo(
          dot,
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              start: 0, // Start at the card (beginning of path)
              end: 0,
            },
          },
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              start: 0, // Start at card
              end: 1, // End at center
            },
            duration: 3,
            repeat: -1,
            ease: "power2.inOut",
            delay: dotDelay,
            repeatDelay: 2,
          }
        );

        // Pulsing effect
        gsap.to(dot, {
          attr: { r: 8 }, // Bigger pulse size
          duration: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: dotDelay,
        });
      }
    };

    // Start dot animations after initial animation completes
    ScrollTrigger.create({
      trigger: container,
      start: "top 60%",
      once: true,
      onEnter: () => {
        lineRefs.current.forEach((ref, index) => {
          if (ref) {
            createPulsatingDots(ref, index * 0.5);
          }
        });
      },
    });

    // Add hover effect for cherry
    const cherry = cherryRef.current;
    if (cherry) {
      const handleMouseEnter = () => {
        gsap.to(cherry, {
          scale: 1.2,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center center",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cherry, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center center",
        });
      };

      cherry.addEventListener("mouseenter", handleMouseEnter);
      cherry.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup event listeners
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        cherry.removeEventListener("mouseenter", handleMouseEnter);
        cherry.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen  flex flex-col justify-center items-center   w-full py-20 relative overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper.png')",
        }}
      />

      {/* Title */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mb-16">
        <h2 className="revenue-title maladroit-font text-2xl md:text-6xl text-cherry-burgundy mb-6">
          $AIBOT Economy
        </h2>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2/3 md:w-full h-2 bg-cherry-red rounded-full" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block my-40 relative">
        <div className="relative w-[1600px] h-[500px] mx-auto">
          {/* SVG for connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1800 500"
            preserveAspectRatio="xMidYMid meet"
          >
            {streams.map((_, index) => {
              const pos = getCardPosition(index, streams.length);
              const startX = 900 + pos.x;
              const startY = 250 + pos.y;
              const endX = 900;
              const endY = 250;

              return (
                <path
                  key={index}
                  ref={(el) => (lineRefs.current[index] = el)}
                  d={`M${startX},${startY} L${endX},${endY}`}
                  stroke="#5d4037"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Central Cherry */}
          <div
            ref={auraRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-cherry-red rounded-full z-20"
            style={{ filter: "blur(30px)" }}
          />
          <img
            ref={cherryRef}
            onClick={() => {
              window.open("/cherry", "_blank");
            }}
            src="/cherryRevenue.svg"
            alt="Cherry"
            className="absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] z-30"
            style={{ filter: "drop-shadow(0 0 15px rgba(214, 2, 77, 0.4))" }}
          />

          {/* Stream Cards */}
          {streams.map((stream, index) => {
            const pos = getCardPosition(index, streams.length);
            return (
              <div
                key={index}
                ref={(el) => (streamRefs.current[index] = el)}
                className="absolute z-40 w-[280px]"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#5d4037] hover:shadow-[12px_12px_0px_#5d4037] transition-all duration-300 transform hover:-translate-y-2">
                  {/* Card Header */}
                  <div className="bg-cherry-red p-4 relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-cherry-burgundy opacity-20 rounded-full" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cherry-burgundy opacity-10 rounded-full" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-12 h-12 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_#321017]">
                        <Icon
                          icon={stream.icon}
                          className="text-2xl text-cherry-burgundy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="maladroit-font text-lg text-cherry-cream leading-tight">
                          {stream.title}
                        </h3>
                        <p className="winky-sans-font text-sm text-cherry-cream opacity-90">
                          {stream.subtitle}
                        </p>
                        {stream.badge && (
                          <span className="inline-block bg-yellow-400 text-cherry-burgundy px-2 py-1 rounded-full text-xs winky-sans-font font-bold mt-1">
                            {stream.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <p className="winky-sans-font text-cherry-burgundy text-xs font-medium leading-relaxed">
                      {stream.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {streams.map((stream, index) => (
            <div
              key={index}
              ref={(el) => (streamRefs.current[index] = el)}
              className="group"
            >
              <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden h-full shadow-[8px_8px_0px_#5d4037] hover:shadow-[12px_12px_0px_#5d4037] transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-cherry-red p-4 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-cherry-burgundy opacity-20 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cherry-burgundy opacity-10 rounded-full" />

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_#321017]">
                      <Icon
                        icon={stream.icon}
                        className="text-2xl text-cherry-burgundy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="maladroit-font text-lg text-cherry-cream leading-tight">
                        {stream.title}
                      </h3>
                      <p className="winky-sans-font text-sm text-cherry-cream opacity-90">
                        {stream.subtitle}
                      </p>
                      {stream.badge && (
                        <span className="inline-block bg-yellow-400 text-cherry-burgundy px-2 py-1 rounded-full text-xs winky-sans-font font-bold mt-1">
                          {stream.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="winky-sans-font text-cherry-burgundy text-xs font-medium leading-relaxed">
                    {stream.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stream.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="bg-cherry-burgundy/10 border border-cherry-burgundy/20 rounded-lg px-2 py-1 text-center"
                      >
                        <p className="winky-sans-font text-cherry-burgundy text-xs font-medium whitespace-nowrap">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueStreams;
