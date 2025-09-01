import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/cherry.css";
import "../css/homepage.css";
import "../css/index.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Robotics: React.FC = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section entrance animation
    const heroTimeline = gsap.timeline();

    heroTimeline.set(
      [
        ".coming-soon-title",
        ".coming-soon-subtitle",
        ".coming-soon-description",
        ".coming-soon-cta",
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    heroTimeline.to(".coming-soon-title", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    heroTimeline.to(
      ".coming-soon-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0.2
    );

    heroTimeline.to(
      ".coming-soon-description",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0.4
    );

    heroTimeline.to(
      ".coming-soon-cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0.6
    );

    // Floating particles animation
    gsap.to(".floating-particle", {
      y: -20,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });

    // Rotating rings animation
    gsap.to(".rotating-ring", {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".rotating-ring-reverse", {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    return () => {
      gsap.killTweensOf(".floating-particle");
      gsap.killTweensOf(".rotating-ring");
      gsap.killTweensOf(".rotating-ring-reverse");
    };
  }, []);

  return (
    <div className="min-h-screen relative  text-[var(--color-text-primary)]">
      <Navbar />

      {/* Radial Energy Field Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--color-accent)]/20 via-[var(--color-bg-secondary)]/40 to-[var(--color-bg-primary)] opacity-60"></div>

        {/* Concentric Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="rotating-ring w-[800px] h-[800px] border border-[var(--color-accent)]/10 rounded-full"></div>
          <div className="rotating-ring-reverse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--color-accent)]/8 rounded-full"></div>
          <div className="rotating-ring absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[var(--color-accent)]/6 rounded-full"></div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particle absolute top-20 left-20 w-3 h-3 bg-[var(--color-accent)]/40 rounded-full"></div>
        <div className="floating-particle absolute top-40 right-32 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full"></div>
        <div className="floating-particle absolute bottom-40 left-1/4 w-4 h-4 bg-[var(--color-accent)]/50 rounded-full"></div>
        <div className="floating-particle absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[var(--color-accent)]/35 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div
        ref={heroSectionRef}
        className="relative z-10 pt-32 pb-20 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Coming Soon Content */}
          <div ref={contentRef} className="relative">
            {/* Main Title */}
            <h1 className="coming-soon-title maladroit-font text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-text-primary)] leading-tight mb-8">
              COMING
              <span className="block text-[var(--color-accent)]">SOON</span>
            </h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Robotics;
