import React from "react";
import { Icon } from "@iconify/react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Careers: React.FC = () => {
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
        <Navbar />

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
                We're not just building bots—we're shaping the infrastructure of
                the next market cycle. At Cherry, you'll work with a fast-moving
                team of degens, developers, and dreamers turning real problems
                into powerful tools for projects and traders.
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
                    Get paid in USDC + $AIBOT equity options. You're not just an
                    employee—you're part of the upside.
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
                        Meme fluent. Web3-native. Knows how to turn 10 messages
                        into 100k impressions.
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
                      Have traded on Solana or used other bots (BONKBot, Trojan,
                      etc.)
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
                      Understand Web3 user flows, onboarding, and meme mechanics
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
                  Join our team of builders shaping the next generation of Web3
                  tools and infrastructure.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 lg:gap-4">
                  <a
                    href="https://t.me/CherryTGBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cherry-cream text-cherry-burgundy font-bold py-3 px-6 lg:px-8 rounded-lg lg:rounded-xl border border-b-2 border-r-2 lg:border-b-4 lg:border-r-4 border-cherry-burgundy hover:border-b-1 hover:border-r-1 lg:hover:border-b-2 lg:hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu   lg:  hover:shadow-[1px_1px_0px_#321017] lg:hover:  winky-sans-font flex items-center gap-2 text-sm lg:text-base"
                  >
                    <Icon icon="ic:baseline-telegram" width={18} height={18} />
                    <span>Join Community</span>
                  </a>
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

export default Careers;
