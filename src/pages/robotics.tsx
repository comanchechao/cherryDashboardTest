import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/cherry.css";
import "../css/homepage.css";
import "../css/index.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Robotics: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Radial Energy Field Background */}
      <Navbar />
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

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Robotics Opportunity Section */}
          <div ref={(el) => (sectionRefs.current[0] = el)} className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="maladroit-font text-4xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight mb-8">
                  ROBOTICS OFFERS A{" "}
                  <span className="text-[var(--color-accent)]">
                    $400 BILLION
                  </span>{" "}
                  OPPORTUNITY
                </h1>
                <p className="winky-sans-font text-lg md:text-lg text-[var(--color-text-secondary)]/80 leading-relaxed">
                  CherryAI Bot recognize the accelerating demand for
                  breakthroughs in robotics across industries. By gathering data
                  and building data models for robotics innovation, CherryAI Bot
                  bridges the gap between high value data and real-world
                  adoption.
                </p>
              </div>
              {/* Right Visual */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-xl rounded-[20px] p-4 bg-[var(--color-bg-secondary)]/40 border border-[var(--color-accent)]/20">
                  <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_0_24px_rgba(67,103,201,0.25)]"></div>
                  <div className="aspect-[16/9] flex items-center justify-center rounded-[12px]  ">
                    <img
                      src="/chart.webp"
                      alt="Market Forecast Chart"
                      className="w-full h-auto object-contain rounded-[12px]"
                    />
                  </div>
                  <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
                  <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[var(--color-accent)]/10 blur-3xl rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Robotics Industry Challenges Section */}
          <div ref={(el) => (sectionRefs.current[1] = el)} className="mb-20">
            <h2 className="maladroit-font text-3xl md:text-4xl font-bold text-[var(--color-accent)] text-center mb-12">
              ROBOTICS INDUSTRY CHALLENGES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "LIMITED TRAINING MODELS",
                "INACCURATE PERCEPTION MODELS",
                "POOR GENERALIZATION",
                "SLOWER ITERATION CYCLES",
                "SAFETY & RELIABILITY RISKS",
                "BARRIERS TO SCALABILITY",
              ].map((challenge, index) => (
                <div
                  key={index}
                  className="glass-effect border border-glass rounded-xl p-6 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all duration-300 group"
                >
                  <h3 className="winky-sans-font text-lg   text-[var(--color-text-primary)] text-center group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {challenge}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Companies Entering Robotics Section */}
          <div ref={(el) => (sectionRefs.current[2] = el)} className="mb-20">
            <h2 className="maladroit-font text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] text-center mb-6">
              THE BIGGEST TECH COMPANIES ARE ALL ENTERING ROBOTICS
            </h2>
            <p className="winky-sans-font text-lg md:text-xl text-[var(--color-text-secondary)]/80 text-center mb-12 max-w-4xl mx-auto">
              Robotics will become a $1 trillion dollar industry and the biggest
              companies in the world realize this
            </p>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  name: "SKILD AI",
                  description:
                    "This SoftBank backed company valued at $1.5 billion, focuses on building the data models required for robots to have the ability to perceive, reason, and adapt to diverse real-world tasks.",
                },
                {
                  name: "SIMBE",
                  description:
                    "Simbe is a $100 million Goldman Sachs backed robotics company that builds the hardware and software for robots that can participate in helping stores in retail settings.",
                },
                {
                  name: "UBTECH ROBOTICS",
                  description:
                    "UBTech is a $5 billion company backed by Tencent and their primary business model is selling software subscriptions for robots to enterprises.",
                },
              ].map((company, index) => (
                <div
                  key={index}
                  className="glass-effect border border-glass rounded-xl p-6 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all duration-300 group"
                >
                  <h3 className="winky-sans-font text-xl   text-[var(--color-text-primary)] mb-4 text-center group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {company.name}
                  </h3>
                  <p className="winky-sans-font text-sm text-[var(--color-text-secondary)]/90 leading-relaxed text-center">
                    {company.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CherryAI Robot's Role Section */}
          <div ref={(el) => (sectionRefs.current[3] = el)} className="mb-20">
            <h2 className="maladroit-font text-3xl md:text-4xl font-bold text-[var(--color-accent)] text-center mb-12">
              CHERRYAI ROBOT'S ROLE IN ROBOTICS
            </h2>
            <div className="glass-effect border border-glass rounded-2xl p-8 md:p-12">
              <p className="winky-sans-font text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed text-center max-w-5xl mx-auto">
                CherryAI Robot is pioneering the data layer for robotics,
                building the world's largest source of parsed data and
                intelligent models. While most companies focus on hardware or
                software, the real breakthrough lies in the intelligence that
                powers robots. Every robot needs AI, and every AI needs data
                precisely structured for robotics. CherryAI is one of the first
                to create data models that will define how robots learn, adapt,
                and evolve with humanity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Robotics;
