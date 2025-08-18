import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/careers.css"; // Import the CSS file we'll create
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const AboutUs: React.FC = () => {
  // Refs for animation
  const teamHeaderRef = useRef<HTMLDivElement>(null);
  const teamRow1Ref = useRef<HTMLDivElement>(null);
  const teamRow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const menuButton = document.querySelector(".menu.w-button");
    const menuSection = document.querySelector(".section_menu");
    const backButton = document.querySelector(".back.w-button");

    if (menuButton && menuSection && backButton) {
      menuButton.addEventListener("click", function (e) {
        e.preventDefault();
        (menuSection as HTMLElement).style.display = "flex";
        (menuSection as HTMLElement).style.opacity = "1";
        (menuSection as HTMLElement).style.transform =
          "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
      });

      backButton.addEventListener("click", function (e) {
        e.preventDefault();
        (menuSection as HTMLElement).style.opacity = "0";
        (menuSection as HTMLElement).style.transform =
          "translate3d(0px, -100%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
        setTimeout(() => {
          (menuSection as HTMLElement).style.display = "none";
        }, 300);
      });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0", "translate-y-16");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all refs
    const elements = [teamHeaderRef, teamRow1Ref, teamRow2Ref];
    elements.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Load Phosphor Icons
    const phosphorScript = document.createElement("script");
    phosphorScript.src = "https://unpkg.com/@phosphor-icons/web";
    phosphorScript.async = true;
    document.body.appendChild(phosphorScript);

    return () => {
      if (menuButton && menuSection && backButton) {
        menuButton.removeEventListener("click", function () {});
        backButton.removeEventListener("click", function () {});
      }

      // Clean up script
      if (document.body.contains(phosphorScript)) {
        document.body.removeChild(phosphorScript);
      }

      // Clean up observer
      elements.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });

      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
          <Link
            data-w-id="87ad386c-0ced-5924-521f-7494012d2c31"
            to="/"
            className="menu_nav w-button"
          >
            HOME
          </Link>
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
            $AIBOT
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

        <Navbar />

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-14 py-20">
          {/* Team Section Header */}
          <div
            ref={teamHeaderRef}
            className="relative opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="relative bg-cherry-cream rounded-xl border-4 border-cherry-burgundy overflow-hidden p-8 md:p-12">
              <svg
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="teamPattern"
                    patternUnits="userSpaceOnUse"
                    width="40"
                    height="40"
                    patternTransform="rotate(45)"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="3"
                      fill="#E53935"
                      fillOpacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#teamPattern)" />
              </svg>

              <div className="relative z-10 flex flex-col items-center">
                <h2 className="maladroit-font text-2xl text-center md:text-6xl font-bold text-cherry-burgundy mb-6">
                  Cherry AI Contributors
                </h2>
                <div className="h-1 w-32 mx-auto bg-cherry-red mb-8 rounded-full"></div>
                <p className="winky-sans-font text-lg md:text-2xl text-center text-cherry-burgundy max-w-3xl">
                  The large team of contributors has built several revenue
                  generating utilities, bots and other crypto technologies for
                  the past 7 years.
                </p>
              </div>
            </div>
          </div>

          {/* Team Row 1 - Main Contributors */}
          <div
            ref={teamRow1Ref}
            className="mt-20 opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="team-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
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
                        id="cardDots1"
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
                    <rect width="100%" height="100%" fill="url(#cardGrad1)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots1)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6 flex flex-col h-full items-center justify-between">
                    <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/MoeAli.webp"
                        alt="Mohammad Ali"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                      Mohammad Ali
                    </h3>
                    <div className="flex flex-col items-center justify-center">
                      <div className="px-4 py-1 bg-cherry-burgundy text-white winky-sans-font rounded-full mb-2">
                        CEO
                      </div>
                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>
                    </div>
                    <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                      Visionary entrepreneur, launched Cherry AI, Telegram's
                      largest crypto ad network with 12M users, fueling
                      multi-million-dollar blockchain ventures.
                    </p>
                    <div className="flex h-24 items-center justify-center">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/muhammad-ali-4908b1104",
                            "_blank",
                            "noreferrer"
                          )
                        }
                        className="mt-auto text-white bg-cherry-red font-bold py-2 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2   hover:  winky-sans-font"
                      >
                        <Icon
                          icon="mdi:linkedin"
                          className="text-xl text-white"
                        />
                        <span className="winky-sans-font text-white">
                          LinkedIn
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="team-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="cardGrad2"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="cardDots2"
                        patternUnits="userSpaceOnUse"
                        width="30"
                        height="30"
                        patternTransform="rotate(-45)"
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
                    <rect width="100%" height="100%" fill="url(#cardGrad2)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots2)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-between">
                    <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/AhmadHeidari.webp"
                        alt="Ahmad Heidari"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                      Ahmad Heidari
                    </h3>

                    <div className="flex flex-col items-center justify-center">
                      <div className="px-4 py-1 bg-cherry-burgundy text-white winky-sans-font rounded-full mb-2">
                        Tech Lead
                      </div>

                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>
                    </div>
                    <div className="flex h-24 items-center justify-center">
                      <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                        5 years creating crypto games and snipers, driving
                        innovation in blockchain tech.
                      </p>
                    </div>
                    <div className="flex h-24 items-center justify-center">
                      <button
                        onClick={() =>
                          window.open(
                            "https://ae.linkedin.com/in/maxethdev",
                            "_blank",
                            "noreferrer"
                          )
                        }
                        className="mt-auto text-white bg-cherry-red font-bold py-2 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2   hover:  winky-sans-font"
                      >
                        <Icon
                          icon="mdi:linkedin"
                          className="text-xl text-white"
                        />
                        <span className="winky-sans-font text-white">
                          LinkedIn
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="team-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="cardGrad3"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="cardDots3"
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
                    <rect width="100%" height="100%" fill="url(#cardGrad3)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots3)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative   z-10 p-6 h-full flex flex-col items-center justify-between">
                    <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg group-hover:rotate-6 transition-all duration-300"></div>

                    <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                      Mohammad Benahcene
                    </h3>

                    <div className="flex flex-col items-center justify-center">
                      <div className="px-4 py-1 bg-cherry-burgundy text-white winky-sans-font rounded-full mb-2">
                        Project Manager
                      </div>
                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>
                    </div>
                    <div className="flex h-24 mt-3 items-center justify-center">
                      <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                        Co-founder & advisor with 7 years in blockchain and
                        gaming, passionate about crypto since 2016, launching
                        successful gaming, fintech, and DeFi projects.
                      </p>
                    </div>
                    <div className="flex h-24 items-center justify-center">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/moahmmedlamine",
                            "_blank",
                            "noreferrer"
                          )
                        }
                        className="mt-auto text-white bg-cherry-red font-bold py-2 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2   hover:  winky-sans-font"
                      >
                        <Icon
                          icon="mdi:linkedin"
                          className="text-xl text-white"
                        />
                        <span className="winky-sans-font text-white">
                          LinkedIn
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-card group">
                <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <svg
                    className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="cardGrad3"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FFF3DD" />
                        <stop offset="100%" stopColor="#F8ECD1" />
                      </linearGradient>
                      <pattern
                        id="cardDots3"
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
                    <rect width="100%" height="100%" fill="url(#cardGrad3)" />
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#cardDots3)"
                      fillOpacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-between">
                    <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/justin.webp"
                        alt="Mohammad Benahcene"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                      Justin Potter
                    </h3>

                    <div className="flex flex-col items-center justify-center">
                      <div className="px-4 py-1 bg-cherry-burgundy text-white winky-sans-font rounded-full mb-2">
                        CBDO
                      </div>

                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>
                    </div>

                    <div className="flex h-24 items-center justify-center">
                      <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                        Former Silicon Valley VC-backed founder; Technical
                        founder; 6 years full time crypto advising major
                        projects through TGE & ongoing.
                      </p>
                    </div>
                    <div className="flex h-24 items-center justify-center">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/justincpotter/",
                            "_blank",
                            "noreferrer"
                          )
                        }
                        className="mt-auto text-white bg-cherry-red font-bold py-2 px-4 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2   hover:  winky-sans-font"
                      >
                        <Icon
                          icon="mdi:linkedin"
                          className="text-xl text-white"
                        />
                        <span className="winky-sans-font text-white">
                          LinkedIn
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Row 2 - Additional Team Members */}
          <div
            ref={teamRow2Ref}
            className="mt-16 opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team Member 4 */}
                <div className="team-card group">
                  <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative z-10 p-6 h-full flex flex-col items-center ">
                      <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                        <img
                          src="https://storage.cherrybot.ai/asset06.png"
                          alt="Jim Jones"
                          className="w-44 object-contain transform translate-y-10"
                        />
                      </div>

                      <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                        Fran
                      </h3>

                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                      <p className="text-cherry-burgundy winky-sans-font text-center">
                        Graphic Designer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 5 */}
                <div className="team-card group">
                  <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative z-10 p-6 h-full flex flex-col items-center ">
                      <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                        <img
                          src="https://storage.cherrybot.ai/asset03.png"
                          alt="HOWLER"
                          className="w-44 object-contain transform translate-y-10"
                        />
                      </div>

                      <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                        HOWLER
                      </h3>

                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                      <p className="text-cherry-burgundy winky-sans-font text-center">
                        Sales
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 6 */}
                <div className="team-card group">
                  <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative z-10 p-6 h-full flex flex-col items-center ">
                      <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                        <img
                          src="https://storage.cherrybot.ai/asset09.png"
                          alt="David B"
                          className="w-44 object-contain transform translate-y-10"
                        />
                      </div>

                      <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                        David B
                      </h3>

                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                      <p className="text-cherry-burgundy winky-sans-font text-center">
                        BD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing CTA Section */}
          <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-12 lg:py-20">
            {/* Hero Section */}
            <div className="text-center mb-12 lg:mb-16 relative">
              {/* Decorative floating elements */}
              <div className="absolute -top-6 -left-6 lg:-top-10 lg:-left-10 w-12 h-12 lg:w-20 lg:h-20 bg-cherry-red opacity-10 rounded-full animate-pulse"></div>
              <div
                className="absolute -top-3 -right-3 lg:-top-5 lg:-right-5 w-10 h-10 lg:w-16 lg:h-16 bg-cherry-burgundy opacity-10 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="bg-cherry-cream rounded-xl lg:rounded-2xl border-2 lg:border-4 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] lg:shadow-[8px_8px_0px_#5d4037] p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 lg:-top-16 lg:-right-16 w-16 h-16 lg:w-32 lg:h-32 bg-cherry-red opacity-10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 lg:-bottom-16 lg:-left-16 w-16 h-16 lg:w-32 lg:h-32 bg-cherry-red opacity-10 rounded-full"></div>

                <h1 className="maladroit-font text-3xl lg:text-4xl xl:text-6xl font-bold text-cherry-burgundy mb-3 lg:mb-4 relative z-10">
                  Careers at Cherry
                </h1>
                <p className="winky-sans-font text-lg lg:text-xl text-cherry-burgundy mb-4 lg:mb-6 relative z-10">
                  Build the future of Web3 trading, tools, and community
                  engagement.
                </p>
                <p className="winky-sans-font text-base lg:text-lg text-cherry-burgundy opacity-90 max-w-4xl mx-auto relative z-10">
                  We're not just building bots—we're shaping the infrastructure
                  of the next market cycle. At Cherry, you'll work with a
                  fast-moving team of degens, developers, and dreamers turning
                  real problems into powerful tools for projects and traders.
                </p>
              </div>
            </div>

            {/* Why Join Cherry Section */}
            <div className="mb-12 lg:mb-16">
              <div className="bg-cherry-cream rounded-xl lg:rounded-2xl border-2 lg:border-4 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] lg:shadow-[8px_8px_0px_#5d4037] p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-cherry-red opacity-5 rounded-full transform translate-x-16 lg:translate-x-32 -translate-y-16 lg:-translate-y-32"></div>

                <h2 className="maladroit-font text-2xl lg:text-3xl xl:text-4xl font-bold text-cherry-burgundy mb-6 lg:mb-8 text-center relative z-10">
                  Why Join Cherry?
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 relative z-10">
                  {/* Real Impact */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 border-cherry-burgundy p-4 lg:p-6 shadow-[2px_2px_0px_#5d4037] lg:shadow-[4px_4px_0px_#5d4037] hover:shadow-[1px_1px_0px_#5d4037] lg:hover:shadow-[2px_2px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cherry-red rounded-full flex items-center justify-center mr-3 lg:mr-4">
                        <Icon
                          icon="ph:rocket-bold"
                          className="text-white"
                          width={20}
                          height={20}
                        />
                      </div>
                      <h3 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy">
                        Real Impact
                      </h3>
                    </div>
                    <p className="winky-sans-font text-sm lg:text-base text-cherry-burgundy">
                      Ship tools that touch millions of users across Solana and
                      beyond.
                    </p>
                  </div>

                  {/* Remote First */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 border-cherry-burgundy p-4 lg:p-6 shadow-[2px_2px_0px_#5d4037] lg:shadow-[4px_4px_0px_#5d4037] hover:shadow-[1px_1px_0px_#5d4037] lg:hover:shadow-[2px_2px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cherry-red rounded-full flex items-center justify-center mr-3 lg:mr-4">
                        <Icon
                          icon="ph:globe-bold"
                          className="text-white"
                          width={20}
                          height={20}
                        />
                      </div>
                      <h3 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy">
                        Remote First, Crypto Native
                      </h3>
                    </div>
                    <p className="winky-sans-font text-sm lg:text-base text-cherry-burgundy">
                      We move async, live on-chain, and think globally.
                    </p>
                  </div>

                  {/* Tokens & Upside */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 border-cherry-burgundy p-4 lg:p-6 shadow-[2px_2px_0px_#5d4037] lg:shadow-[4px_4px_0px_#5d4037] hover:shadow-[1px_1px_0px_#5d4037] lg:hover:shadow-[2px_2px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cherry-red rounded-full flex items-center justify-center mr-3 lg:mr-4">
                        <Icon
                          icon="ph:coins-bold"
                          className="text-white"
                          width={20}
                          height={20}
                        />
                      </div>
                      <h3 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy">
                        Tokens & Upside
                      </h3>
                    </div>
                    <p className="winky-sans-font text-sm lg:text-base text-cherry-burgundy">
                      Get paid in USDC + $AIBOT equity options. You're not just
                      an employee—you're part of the upside.
                    </p>
                  </div>

                  {/* Builder Culture */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 border-cherry-burgundy p-4 lg:p-6 shadow-[2px_2px_0px_#5d4037] lg:shadow-[4px_4px_0px_#5d4037] hover:shadow-[1px_1px_0px_#5d4037] lg:hover:shadow-[2px_2px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cherry-red rounded-full flex items-center justify-center mr-3 lg:mr-4">
                        <Icon
                          icon="ph:hammer-bold"
                          className="text-white"
                          width={20}
                          height={20}
                        />
                      </div>
                      <h3 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy">
                        Builder Culture
                      </h3>
                    </div>
                    <p className="winky-sans-font text-sm lg:text-base text-cherry-burgundy">
                      We care about speed, ownership, and great ideas—regardless
                      of title.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Openings */}
            <div className="mb-12 lg:mb-16">
              <div className="bg-cherry-cream rounded-xl lg:rounded-2xl border-2 lg:border-4 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] lg:shadow-[8px_8px_0px_#5d4037] p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-64 lg:h-64 bg-cherry-burgundy opacity-5 rounded-full transform -translate-x-16 lg:-translate-x-32 translate-y-16 lg:translate-y-32"></div>

                <h2 className="maladroit-font text-2xl lg:text-3xl xl:text-4xl font-bold text-cherry-burgundy mb-6 lg:mb-8 text-center relative z-10">
                  Who We're Looking For
                </h2>

                <div className="space-y-4 lg:space-y-6 relative z-10">
                  <div className="text-center mb-6 lg:mb-8">
                    <h3 className="maladroit-font text-xl lg:text-2xl font-bold text-cherry-burgundy mb-2">
                      Currently Hiring:
                    </h3>
                  </div>

                  {/* Senior Rust Developer */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 lg:border-4 border-cherry-burgundy p-6 lg:p-8 shadow-[3px_3px_0px_#5d4037] lg:shadow-[6px_6px_0px_#5d4037] hover:shadow-[2px_2px_0px_#5d4037] lg:hover:shadow-[4px_4px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <div className="flex items-start">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cherry-red rounded-full flex items-center justify-center mr-4 lg:mr-6 flex-shrink-0">
                        <Icon
                          icon="ph:code-bold"
                          className="text-white"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="maladroit-font text-xl lg:text-2xl font-bold text-cherry-burgundy mb-2 lg:mb-3">
                          Senior Rust Developer
                        </h3>
                        <p className="winky-sans-font text-base lg:text-lg text-cherry-burgundy">
                          Experience with Solana, bots, MEV, or DeFi protocols
                          preferred.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Growth & Community Lead */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 lg:border-4 border-cherry-burgundy p-6 lg:p-8 shadow-[3px_3px_0px_#5d4037] lg:shadow-[6px_6px_0px_#5d4037] hover:shadow-[2px_2px_0px_#5d4037] lg:hover:shadow-[4px_4px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    <div className="flex items-start">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cherry-red rounded-full flex items-center justify-center mr-4 lg:mr-6 flex-shrink-0">
                        <Icon
                          icon="ph:megaphone-bold"
                          className="text-white"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="maladroit-font text-xl lg:text-2xl font-bold text-cherry-burgundy mb-2 lg:mb-3">
                          Growth & Community Lead
                        </h3>
                        <p className="winky-sans-font text-base lg:text-lg text-cherry-burgundy">
                          Meme fluent. Web3-native. Knows how to turn 10
                          messages into 100k impressions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bonus Points */}
                  <div className="bg-cherry-cream rounded-lg lg:rounded-xl border-2 border-cherry-burgundy p-4 lg:p-6 mt-6 lg:mt-8">
                    <h4 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy mb-3 lg:mb-4 flex items-center">
                      <Icon
                        icon="ph:star-bold"
                        className="text-cherry-red mr-2"
                        width={20}
                        height={20}
                      />
                      Bonus if you:
                    </h4>
                    <ul className="space-y-2 lg:space-y-3">
                      <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                        <Icon
                          icon="ph:check-circle-bold"
                          className="text-green-500 mr-2 lg:mr-3 mt-1 flex-shrink-0"
                          width={16}
                          height={16}
                        />
                        Have traded on Solana or used other bots (BONKBot,
                        Trojan, etc.)
                      </li>
                      <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                        <Icon
                          icon="ph:check-circle-bold"
                          className="text-green-500 mr-2 lg:mr-3 mt-1 flex-shrink-0"
                          width={16}
                          height={16}
                        />
                        Know how to turn trading data into marketing gold
                      </li>
                      <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                        <Icon
                          icon="ph:check-circle-bold"
                          className="text-green-500 mr-2 lg:mr-3 mt-1 flex-shrink-0"
                          width={16}
                          height={16}
                        />
                        Understand Web3 user flows, onboarding, and meme
                        mechanics
                      </li>
                      <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                        <Icon
                          icon="ph:check-circle-bold"
                          className="text-green-500 mr-2 lg:mr-3 mt-1 flex-shrink-0"
                          width={16}
                          height={16}
                        />
                        Can explain slippage to your grandma
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Apply */}
            <div className="mb-12 lg:mb-16">
              <div className="bg-gradient-to-br from-cherry-red to-cherry-burgundy rounded-xl lg:rounded-2xl border-2 lg:border-4 border-cherry-burgundy   lg:  p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 lg:w-32 lg:h-32 bg-white opacity-10 rounded-full transform translate-x-8 lg:translate-x-16 -translate-y-8 lg:-translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 lg:w-40 lg:h-40 bg-white opacity-10 rounded-full transform -translate-x-10 lg:-translate-x-20 translate-y-10 lg:translate-y-20"></div>

                <div className="relative z-10">
                  <h2 className="maladroit-font text-2xl lg:text-3xl xl:text-4xl font-bold text-cherry-burgundy mb-6 lg:mb-8 text-center">
                    How to Apply
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                      <h3 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy mb-3 lg:mb-4 flex items-center">
                        <Icon
                          icon="ph:envelope-bold"
                          className="text-cherry-cream mr-2"
                          width={20}
                          height={20}
                        />
                        Send us your:
                      </h3>
                      <ul className="space-y-2 lg:space-y-3">
                        <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                          <Icon
                            icon="ph:arrow-right-bold"
                            className="text-cherry-burgundy mr-2 lg:mr-3 mt-1 flex-shrink-0"
                            width={14}
                            height={14}
                          />
                          Telegram or X handle
                        </li>
                        <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                          <Icon
                            icon="ph:arrow-right-bold"
                            className="text-cherry-burgundy mr-2 lg:mr-3 mt-1 flex-shrink-0"
                            width={14}
                            height={14}
                          />
                          Past project/growth work (bots, content, dashboards,
                          analytics, etc.)
                        </li>
                        <li className="winky-sans-font text-sm lg:text-base text-cherry-burgundy flex items-start">
                          <Icon
                            icon="ph:arrow-right-bold"
                            className="text-cherry-burgundy mr-2 lg:mr-3 mt-1 flex-shrink-0"
                            width={14}
                            height={14}
                          />
                          Quick line on how you'd get 10k more trader users
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <h3 className="maladroit-font text-lg lg:text-xl font-bold text-cherry-burgundy mb-3 lg:mb-4">
                        Contact Us:
                      </h3>
                      <a
                        href="mailto:info@cherrybot.ai"
                        className="bg-cherry-cream text-cherry-burgundy font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-lg lg:rounded-xl border border-b-2 border-r-2 lg:border-b-4 lg:border-r-4 border-cherry-burgundy hover:border-b-1 hover:border-r-1 lg:hover:border-b-2 lg:hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[2px_2px_0px_rgba(255,255,255,0.3)] lg:shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0px_rgba(255,255,255,0.3)] lg:hover:shadow-[2px_2px_0px_rgba(255,255,255,0.3)] winky-sans-font flex items-center gap-2 w-fit text-sm lg:text-base"
                      >
                        <Icon icon="ph:envelope-bold" width={18} height={18} />
                        <span>info@cherrybot.ai</span>
                      </a>
                      <a
                        href="https://t.me/pm10001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cherry-cream text-cherry-burgundy font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-lg lg:rounded-xl border border-b-2 border-r-2 lg:border-b-4 lg:border-r-4 border-cherry-burgundy hover:border-b-1 hover:border-r-1 lg:hover:border-b-2 lg:hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[2px_2px_0px_rgba(255,255,255,0.3)] lg:shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0px_rgba(255,255,255,0.3)] lg:hover:shadow-[2px_2px_0px_rgba(255,255,255,0.3)] winky-sans-font flex items-center gap-2 w-fit text-sm lg:text-base"
                      >
                        <Icon
                          icon="ic:baseline-telegram"
                          width={18}
                          height={18}
                        />
                        <span>@pm10001</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-cherry-cream rounded-xl lg:rounded-2xl border-2 lg:border-4 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] lg:shadow-[8px_8px_0px_#5d4037] p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="career-pattern"
                        patternUnits="userSpaceOnUse"
                        width="40"
                        height="40"
                        patternTransform="rotate(35)"
                        className="lg:w-[60px] lg:h-[60px]"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="2"
                          fill="#E53935"
                          className="lg:cx-[30] lg:cy-[30] lg:r-[3]"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#career-pattern)"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <img
                    src="https://storage.cherrybot.ai/cherry_rocket.svg"
                    alt="Cherry AI Logo"
                    className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4 lg:mb-6 animate-pulse"
                  />
                  <h2 className="maladroit-font text-2xl lg:text-3xl font-bold text-cherry-burgundy mb-3 lg:mb-4">
                    Ready to Build the Future?
                  </h2>
                  <p className="winky-sans-font text-base lg:text-lg text-cherry-burgundy mb-4 lg:mb-6 max-w-2xl mx-auto">
                    Join our team of builders shaping the next generation of
                    Web3 tools and infrastructure.
                  </p>
                  <div className="flex flex-col items-center justify-center gap-3 lg:gap-4">
                    <a
                      href="https://t.me/CherryTGBot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cherry-cream text-cherry-burgundy font-bold py-3 px-6 lg:px-8 rounded-lg lg:rounded-xl border border-b-2 border-r-2 lg:border-b-4 lg:border-r-4 border-cherry-burgundy hover:border-b-1 hover:border-r-1 lg:hover:border-b-2 lg:hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu   lg:  hover:shadow-[1px_1px_0px_#321017] lg:hover:  winky-sans-font flex items-center gap-2 text-sm lg:text-base"
                    >
                      <Icon
                        icon="ic:baseline-telegram"
                        width={18}
                        height={18}
                      />
                      <span>Join Community</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
