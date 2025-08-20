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
      title: "Tiered Staking ",
      icon: "mdi:robot-happy",
      description: "Boost your staking tier and earn more rewards",

      position: 0, // Top
    },
    {
      title: "Earn Lootboxes",
      icon: "ion:game-controller",
      description: "Stakers get points to buy Lootboxes.",

      position: 1, // Top Right
    },
    {
      title: "Fee Sharing",
      icon: "mdi:cash-sync",
      description: "Revenue sharing based on activity and holdings",

      position: 2, // Bottom Right
    },
    {
      title: "Buyback & Burn",
      icon: "mdi:fire-circle",
      description: "Deflationary mechanism using platform profits",

      position: 3, // Bottom
    },
    {
      title: "Staking System",
      icon: "mdi:trophy-award",
      description: "Leveled staking with XP and rewards",

      position: 4, // Bottom Left
    },
    {
      title: "Data Monetization",
      icon: "icon-park-solid:parachute",
      description: "All data and data models are monetized",

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
        dot.setAttribute("fill", "var(--color-accent)");
        dot.style.filter = "drop-shadow(0 0 12px rgba(67, 103, 201, 0.9))";
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

        gsap.to(dot, {
          attr: { r: 8 },
          duration: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: dotDelay,
        });
      }
    };

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
      id="token-overview"
      className="min-h-screen  flex flex-col justify-center items-center   w-full py-20 relative overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(67,103,201,0.19)_0%,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(67,103,201,0.13)_0%,transparent_40%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-28">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.13) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.13) 1px, transparent 1px)`,
              backgroundSize: "35px 35px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-[1000px] h-[1000px] border border-[#4367c9]/28 rounded-full animate-spin-slow"
            style={{ animationDuration: "26s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#4367c9]/23 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "22s" }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full animate-float  "></div>
        <div
          className="absolute bottom-40 right-10 w-12 h-12 bg-[var(--color-accent)]/15 rounded-full animate-float  "
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full animate-float  "
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Connection Lines SVG Background */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="revenueStreamsConnectionGradient"
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
            stroke="url(#revenueStreamsConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#revenueStreamsConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.7s" }}
          />
        </svg>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mb-16">
        <h2 className="revenue-title maladroit-font text-2xl md:text-6xl text-[var(--color-text-primary)] mb-6">
          $AIBOT Economy
        </h2>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full" />
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
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              );
            })}
          </svg>

          <div
            ref={auraRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[var(--color-accent)]/30 rounded-full z-20"
          />
          <img
            ref={cherryRef}
            onClick={() => {
              window.open("/cherry", "_blank");
            }}
            src="/cherryRevenue.svg"
            alt="Cherry"
            className="absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] z-30"
            style={{ filter: "drop-shadow(0 0 15px rgba(67, 103, 201, 0.3))" }}
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
                <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[28px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                  {/* Card Header */}
                  <div className="bg-[var(--color-accent)]/20 p-4 relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--color-accent)]/20 rounded-full" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--color-accent)]/15 rounded-full" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-12 h-12 bg-[var(--color-glass)]   rounded-full border-2 border-[var(--color-accent)]/30 flex items-center justify-center flex-shrink-0 shadow-[0_8px_24px_rgba(67,103,201,0.3)]">
                        <Icon
                          icon={stream.icon}
                          className="text-2xl text-[var(--color-accent)]"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="maladroit-font text-lg text-[var(--color-text-primary)] leading-tight">
                          {stream.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-xs font-medium leading-relaxed">
                      {stream.description}
                    </p>
                  </div>

                  {/* Bottom Decorative Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
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
              <div className="bg-[var(--color-glass)]   border border-[var(--color-glass-border)] rounded-[28px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 h-full relative">
                {/* Floating Decorative Elements */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                <div className="bg-[var(--color-accent)]/20 p-4 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--color-accent)]/20 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--color-accent)]/15 rounded-full" />

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 bg-[var(--color-glass)]   rounded-full border-2 border-[var(--color-accent)]/30 flex items-center justify-center flex-shrink-0 shadow-[0_8px_24px_rgba(67,103,201,0.3)]">
                      <Icon
                        icon={stream.icon}
                        className="text-2xl text-[var(--color-accent)]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="maladroit-font text-lg text-[var(--color-text-primary)] leading-tight">
                        {stream.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-xs font-medium leading-relaxed">
                    {stream.description}
                  </p>
                </div>

                {/* Bottom Decorative Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueStreams;
