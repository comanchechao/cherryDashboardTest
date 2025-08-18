import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";

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
      "Finalize $AIBOT economy architecture",
      "Build Community for Airdrop Campaign",
      "Strategic Partnerships for Token Launch",
      "Global Expansion & Ecosystem Growth",
    ],
  },
  {
    quarter: "Q2 2025",
    title: "Token & Trading Platform Launch",
    description: "Public launch of $AIBOT token and trading platform",
    completed: false,
    items: [
      "Cherry Trader Bot Launch on Telegram",
      "$AIBOT Token Public IDO",
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
      "$AIBOT Token Public Launch",
      "$AIBOT Airdrop Distribution Begins",
      "AI Integration Beta Launch",
      "Best Token Performance Detection",
      "Market Sentiment Tracking",
      "Trade Opportunity Suggestions",
      "Full Launch of Cherry Web Trading Platform",
      "Feedback-Driven Feature Refinement",
    ],
  },
];

const MilestoneTimelineSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const achievementsListRef = useRef<HTMLUListElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<number>(3);

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
    if (timelineRef.current) {
      gsap.from(".milestone-item", {
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".timeline-track", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".milestone-connector", {
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      });
    }

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
  }, []);

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {" "}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mt-16 mb-10 w-full flex items-center justify-center text-white">
          <h2 className="text-2xl lg:text-5xl maladroit-font">
            Cherry AI's Roadmap
          </h2>
        </div>
      </div>
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>
      <div className="max-w-[88rem] mt-20 mx-auto lg:px-4">
        {/* Desktop Version */}
        <div className="hidden lg:flex flex-col bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] lg:p-6 p-2 relative overflow-hidden transform   transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
          <div className="mb-6">
            <h3 className="text-3xl font-bold maladroit-font text-[var(--color-text-primary)] mb-3">
              Our Journey So Far
            </h3>
            <p className="winky-sans-font text-[var(--color-text-secondary)] text-lg">
              Track our progress as we build the future of AI-powered crypto
              tools.
            </p>
          </div>

          {/* Timeline track */}
          <div ref={timelineRef} className="relative py-8">
            <div className="timeline-track absolute h-2 bg-[var(--color-accent)] top-1/2 left-0 right-0 -translate-y-1/2 rounded-full"></div>

            {/* Milestone points */}
            <div className="flex justify-between relative z-10">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="milestone-item flex flex-col items-center cursor-pointer group"
                  onClick={() => handleMilestoneClick(index)}
                >
                  <div
                    className={`milestone-connector w-7 h-7 rounded-full border-4 border-[var(--color-accent)] flex items-center justify-center 
                      ${
                        milestone.completed
                          ? "bg-[var(--color-accent)]"
                          : "bg-[var(--color-glass)]"
                      } 
                      ${
                        activeMilestone === index
                          ? "ring-4 ring-[var(--color-accent)] ring-opacity-50 scale-125"
                          : ""
                      }
                      transition-all duration-300 hover:scale-110 group-hover:shadow-lg relative
                      after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-ping after:bg-[var(--color-accent)] after:opacity-40 after:scale-125 after:z-[-1] after:duration-[1.5s]
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
                    <div className="absolute w-24 -top-10 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Click to view
                    </div>
                  </div>
                  <div
                    className={`mt-2 text-xs font-bold winky-sans-font text-[var(--color-text-primary)] group-hover:scale-110 transition-all duration-300
                    ${
                      activeMilestone === index
                        ? "text-[var(--color-accent)] font-extrabold scale-110"
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
          <div className="mt-6 p-6 bg-[var(--color-glass)] bg-opacity-60 rounded-lg border-2 border-[var(--color-accent)] relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   h-full transition-all duration-500 transform">
                  <h4 className="text-2xl font-bold maladroit-font text-[var(--color-text-primary)] mb-2 transition-all duration-300">
                    {milestones[activeMilestone].title}
                  </h4>
                  <div className="h-1 w-16 bg-[var(--color-accent)] mb-3 rounded-full transform origin-left transition-all duration-500"></div>
                  <p className="winky-sans-font text-lg text-[var(--color-text-secondary)] mb-2 transition-all duration-300">
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
                        <Icon icon="tabler:progress" width="28" height="28" />
                      )}
                    </div>
                    <span className="text-xl text-white winky-sans-font font-bold transition-all duration-300">
                      {milestones[activeMilestone].completed
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="bg-[var(--color-glass)] p-4 rounded-lg border-2 border-[var(--color-accent)]   h-full">
                  <h4 className="text-xl font-bold maladroit-font text-[var(--color-text-primary)] mb-3">
                    Milestone Achievements
                  </h4>
                  <ul
                    ref={achievementsListRef}
                    className="space-y-3 transition-all flex items-center justify-center flex-col ml-0 !pl-0 duration-800"
                  >
                    {milestones[activeMilestone].items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start w-full bg-[var(--color-accent)] p-2 rounded-full gap-3"
                      >
                        <Icon
                          icon="lets-icons:check-ring-round"
                          width="28"
                          height="28"
                          className="text-white"
                        />
                        <span className="winky-sans-font lg:text-lg text-sm text-white">
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
                      className={`text-[var(--color-text-primary)] bg-[var(--color-glass)] py-2 px-4 rounded-lg border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
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
                      className={`text-[var(--color-text-primary)] bg-[var(--color-glass)] py-2 px-4 rounded-lg border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
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
          <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-3 sm:p-4 relative overflow-hidden">
            <div className="mb-6 text-center">
              <h3 className="text-xl sm:text-2xl font-bold maladroit-font text-[var(--color-text-primary)] mb-2">
                Our Journey So Far
              </h3>
              <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm sm:text-base px-2">
                Track our progress as we build the future of AI-powered crypto
                tools.
              </p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative px-1.2">
              {/* Vertical line */}
              <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-[var(--color-accent)] rounded-full"></div>

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
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 border-[var(--color-accent)] flex items-center justify-center transition-all duration-300 active:scale-95 ${
                        milestone.completed
                          ? "bg-[var(--color-accent)]"
                          : "bg-[var(--color-glass)]"
                      } ${
                        activeMilestone === index
                          ? "ring-2 ring-[var(--color-accent)] ring-opacity-50 scale-110 shadow-lg"
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
                          className="text-[var(--color-text-primary)] sm:w-5 sm:h-5"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-3 sm:p-4 transition-all duration-300 active:scale-98 ${
                        activeMilestone === index
                          ? "bg-[var(--color-accent)] bg-opacity-10 border-[var(--color-accent)] shadow-[3px_3px_0px_#321017] ring-1 ring-[var(--color-accent)] ring-opacity-30"
                          : ""
                      }`}
                    >
                      {/* Quarter badge */}
                      <div className="inline-block bg-[var(--color-accent)] text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold winky-sans-font mb-3">
                        {milestone.quarter}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold maladroit-font text-[var(--color-text-primary)] mb-2 leading-tight">
                        {milestone.title}
                      </h4>

                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-xs sm:text-sm mb-3 opacity-80 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Tap indicator for inactive milestones */}
                      {activeMilestone !== index && (
                        <div className="flex items-center gap-1 text-[var(--color-text-secondary)] opacity-60 mb-2">
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
                        <div className="border-t border-[var(--color-accent)] pt-3 mt-3">
                          <h5 className="text-xs sm:text-sm font-bold winky-sans-font text-[var(--color-text-primary)] mb-3 flex items-center gap-1">
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
                                className="flex items-start gap-2 bg-[var(--color-accent)] bg-opacity-90 text-white p-2.5 rounded-lg text-xs sm:text-sm winky-sans-font leading-relaxed"
                              >
                                <Icon
                                  icon="lets-icons:check-ring-round"
                                  width="14"
                                  height="14"
                                  className="text-white flex-shrink-0 mt-0.5"
                                />
                                <span className="flex-1">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[var(--color-accent)] border-opacity-30">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            milestone.completed
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="text-xs winky-sans-font font-bold text-[var(--color-text-primary)]">
                          {milestone.completed ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-3 mt-6 pt-4 border-t-2 border-[var(--color-accent)]">
              <button
                onClick={() =>
                  activeMilestone > 0 &&
                  handleMilestoneClick(activeMilestone - 1)
                }
                className={`text-[var(--color-text-primary)] bg-[var(--color-glass)] py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg border-2 border-[var(--color-accent)] transition-all duration-300 active:scale-95 flex items-center gap-2 winky-sans-font font-bold text-xs sm:text-sm touch-manipulation ${
                  activeMilestone === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "  active:shadow-[1px_1px_0px_#321017] active:translate-x-0.5 active:translate-y-0.5"
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

              <div className="flex items-center px-3 py-1 bg-[var(--color-accent)] text-white rounded-full text-xs font-bold winky-sans-font">
                {activeMilestone + 1} / {milestones.length}
              </div>

              <button
                onClick={() =>
                  activeMilestone < milestones.length - 1 &&
                  handleMilestoneClick(activeMilestone + 1)
                }
                className={`text-[var(--color-text-primary)] bg-[var(--color-glass)] py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg border-2 border-[var(--color-accent)] transition-all duration-300 active:scale-95 flex items-center gap-2 winky-sans-font font-bold text-xs sm:text-sm touch-manipulation ${
                  activeMilestone === milestones.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "  active:shadow-[1px_1px_0px_#321017] active:translate-x-0.5 active:translate-y-0.5"
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
    </div>
  );
};

export default MilestoneTimelineSection;
