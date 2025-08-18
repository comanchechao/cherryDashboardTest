import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/careers.css"; // Import the CSS file we'll create
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Team: React.FC = () => {
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

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-20">
          {/* Team Section Header */}
          <div
            ref={teamHeaderRef}
            className="relative opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="absolute -top-16 -left-16 w-28 h-28 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain animate-spin-slow opacity-30"></div>
            <div className="absolute -bottom-12 -right-12 w-20 h-20 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain animate-float opacity-20"></div>

            <div className="relative bg-cherry-cream rounded-3xl border-4 border-cherry-burgundy overflow-hidden p-8 md:p-12">
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
                <h2 className="maladroit-font text-5xl md:text-6xl font-bold text-cherry-burgundy mb-6">
                  Cherry AI Contributors
                </h2>
                <div className="h-1 w-32 mx-auto bg-cherry-red mb-8 rounded-full"></div>
                <p className="winky-sans-font text-xl md:text-2xl text-center text-cherry-burgundy max-w-3xl">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

                  <div className="relative z-10 p-6 flex flex-col items-center">
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

                    <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                      Visionary entrepreneur, launched Cherry AI, Telegram's
                      largest crypto ad network with 12M users, fueling
                      multi-million-dollar blockchain ventures.
                    </p>

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

                  <div className="relative z-10 p-6 flex flex-col items-center">
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

                    <div className="px-4 py-1 bg-cherry-burgundy text-white winky-sans-font rounded-full mb-2">
                      Tech Lead
                    </div>

                    <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                      5 years creating crypto games and snipers, driving
                      innovation in blockchain tech.
                    </p>

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

                  <div className="relative z-10 p-6 flex flex-col items-center">
                    <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg group-hover:rotate-6 transition-all duration-300">
                      <img
                        src="https://storage.cherrybot.ai/Med.webp"
                        alt="Mohammad Benahcene"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                      Mohammad Benahcene
                    </h3>

                    <div className="px-4 py-1 bg-cherry-burgundy text-white winky-sans-font rounded-full mb-2">
                      Project Manager
                    </div>

                    <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                    <p className="text-cherry-burgundy winky-sans-font text-center mb-6">
                      Co-founder & advisor with 7 years in blockchain and
                      gaming, passionate about crypto since 2016, launching
                      successful gaming, fintech, and DeFi projects.
                    </p>

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
          </div>

          {/* Team Row 2 - Additional Team Members */}
          <div
            ref={teamRow2Ref}
            className="mt-16 opacity-0 transform translate-y-16 transition-all duration-1000"
          >
            <div className="relative">
              <div className="absolute -top-16 -right-16 w-24 h-24 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain animate-spin-slow opacity-30"></div>
              <div className="absolute -bottom-16 -left-16 w-20 h-20 bg-[url('https://storage.cherrybot.ai/ink-splatter.svg')] bg-no-repeat bg-contain rotate-12 opacity-20"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team Member 4 */}
                <div className="team-card group">
                  <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative z-10 p-6 flex flex-col items-center">
                      <div className="w-36 h-36 overflow-hidden rounded-full border-4 border-cherry-burgundy bg-gradient-to-br from-cherry-red to-cherry-burgundy shadow-lg flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                        <img
                          src="https://storage.cherrybot.ai/asset06.png"
                          alt="Jim Jones"
                          className="w-44 object-contain transform translate-y-10"
                        />
                      </div>

                      <h3 className="text-2xl font-bold mt-6 mb-2 maladroit-font text-cherry-burgundy text-center">
                        Jim Jones
                      </h3>

                      <div className="h-1 w-16 mx-auto bg-cherry-red mb-4 rounded-full"></div>

                      <p className="text-cherry-burgundy winky-sans-font text-center">
                        6 years in crypto business development.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 5 */}
                <div className="team-card group">
                  <div className="relative bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden hover:  transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative z-10 p-6 flex flex-col items-center">
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
                    <div className="relative z-10 p-6 flex flex-col items-center">
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
          <div className="mt-24 text-center">
            <div className="relative inline-block">
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-[url('https://storage.cherrybot.ai/cuphead-style-star.svg')] bg-no-repeat bg-contain animate-pulse opacity-40"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[url('https://storage.cherrybot.ai/cuphead-style-circle.svg')] bg-no-repeat bg-contain animate-float opacity-30"></div>

              <h2 className="maladroit-font text-3xl font-bold text-cherry-burgundy mb-6 relative z-10">
                Join Our Growing Team
              </h2>
            </div>

            <p className="winky-sans-font text-xl max-w-xl mx-auto text-cherry-burgundy mb-10">
              Interested in being part of the Cherry AI ecosystem? Check out our
              current opportunities.
            </p>

            <button
              onClick={() => window.open("/careers", "_blank")}
              className="text-white bg-cherry-red font-bold py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu inline-flex items-center gap-2   hover:  winky-sans-font"
            >
              <Icon
                icon="mdi:briefcase-outline"
                className="text-xl text-white"
              />
              <span className="winky-sans-font text-white">View Careers</span>
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Team;
