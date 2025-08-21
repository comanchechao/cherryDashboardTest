import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import { Icon } from "@iconify/react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path: string) => {
    if (location.pathname === path) {
      return true;
    }
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path + "/");
  };

  const getDesktopLinkClasses = (path: string) => {
    const baseClasses =
      "px-4 py-2 winky-sans-font text-[13px] font-medium transition-all duration-300 relative nav-link rounded-lg";
    const activeClasses = isActivePath(path)
      ? "text-accent bg-glass border border-accent shadow-lg"
      : "text-primary hover:text-accent hover:bg-glass hover:border-glass";

    return `${baseClasses} ${activeClasses}`;
  };

  const getMobileLinkClasses = (path: string) => {
    const baseClasses =
      "block py-3 px-4 winky-sans-font text-sm font-medium transition-all duration-300 rounded-lg";
    const activeClasses = isActivePath(path)
      ? "text-accent bg-glass border border-accent"
      : "text-primary hover:text-accent hover:bg-glass";

    return `${baseClasses} ${activeClasses}`;
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage first
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100; // Approximate height of navbar + padding
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="glass-effect rounded-2xl border border-glass px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img
                  src="/cherryTextLogo.webp"
                  className="w-44 object-contain"
                  alt=""
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => scrollToSection("partners")}
                className="px-4 py-2 cursor-pointer winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Partners and Integrations</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="px-4 py-2 cursor-pointer winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Ecosystem</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              <button
                onClick={() => scrollToSection("binance-support")}
                className="px-4 py-2 cursor-pointer winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Backers</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              {/* <button
                onClick={() => scrollToSection("community")}
                className="px-4 py-2 winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button> */}
              {/* <Link to="/cherrySniper">
                <button
                  className={`btn-wave-alternative cursor-pointer ${
                    isActivePath("/cherrySniper")
                      ? "bg-accent text-primary shadow-lg"
                      : ""
                  }`}
                >
                  <span className="wave-bg"></span>
                  <span className="wave-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-auto h-full opacity-100 object-stretch"
                      viewBox="0 0 487 487"
                    >
                      <path
                        fillOpacity=".1"
                        fillRule="nonzero"
                        fill="currentColor"
                        d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                      ></path>
                    </svg>
                  </span>
                  <span className="wave-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="object-cover w-full h-full"
                      viewBox="0 0 487 487"
                    >
                      <path
                        fillOpacity=".1"
                        fillRule="nonzero"
                        fill="currentColor"
                        d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                      ></path>
                    </svg>
                  </span>
                  <span className="wave-overlay"></span>
                  <span className="btn-text !text-[13px]">SniperAI Bot</span>
                </button>
              </Link>{" "} */}
              {/* <Link
                to="/ai-analytics"
                className={getDesktopLinkClasses("/ai-analytics")}
              >
                AI Analytics
              </Link> */}
              <button
                onClick={() => scrollToSection("token-overview")}
                className="px-4 py-2 cursor-pointer winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">$AIBOT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
            </div>

            {/* Right Section - Dashboard and Wallet */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/rewards"
                className={`${getDesktopLinkClasses(
                  "/rewards"
                )} flex items-center gap-2`}
              >
                <Icon
                  icon="duo-icons:dashboard"
                  className="text-primary group-hover:text-accent transition-all duration-300"
                  width={18}
                  height={18}
                />
                AIBOT Dashboard
              </Link>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-2">
                <a
                  href="https://x.com/cherrytgbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card border border-glass rounded-lg hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Icon
                    icon="ri:twitter-x-line"
                    className="w-5 h-5 text-primary group-hover:text-accent transition-all duration-300"
                  />
                </a>
                <a
                  href="https://t.me/cherrycommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card border border-glass rounded-lg hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                  aria-label="Telegram"
                >
                  <Icon
                    icon="ic:baseline-telegram"
                    className="w-5 h-5 text-primary group-hover:text-accent transition-all duration-300"
                  />
                </a>
              </div>

              {/* Wallet Section */}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="outline-none p-2 glass-card border border-glass rounded-lg hover:border-accent transition-all duration-300"
                aria-label="Menu"
              >
                <svg
                  className={`w-6 h-6 text-primary transition-all duration-300 ${
                    isMobileMenuOpen ? "transform rotate-90" : ""
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-[800px] opacity-100 visible mt-4"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="glass-effect rounded-2xl border border-glass px-6 py-4">
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("partners")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Partners and Integrations</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Ecosystem</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              <button
                onClick={() => scrollToSection("binance-support")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Backers</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              <button
                onClick={() => scrollToSection("community")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>

              {/* <Link
                to="/cherrySniper"
                className={getMobileLinkClasses("/cherrySniper")}
              >
                SniperAI Bot
              </Link>

              <Link
                to="/ai-analytics"
                className={getMobileLinkClasses("/ai-analytics")}
              >
                AI Analytics
              </Link> */}

              <button
                onClick={() => scrollToSection("token-overview")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">$AIBOT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>

              <Link to="/rewards" className={getMobileLinkClasses("/rewards")}>
                AIBOT Dashboard
              </Link>

              {/* Social Media Icons - Mobile */}
              <div className="flex items-center justify-center space-x-2 pt-2">
                <a
                  href="https://x.com/cherrytgbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card border border-glass rounded-lg hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Icon
                    icon="ri:twitter-x-line"
                    className="w-5 h-5 text-primary group-hover:text-accent transition-all duration-300"
                  />
                </a>
                <a
                  href="https://t.me/cherrycommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card border border-glass rounded-lg hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                  aria-label="Telegram"
                >
                  <Icon
                    icon="ic:baseline-telegram"
                    className="w-5 h-5 text-primary group-hover:text-accent transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for modern glassmorphism effects */}
      <style>
        {`
          /* Logo hover effect */
          .cherry-logo {
            position: relative;
            display: inline-block;
          }
          
          /* Smooth mobile menu transitions */
          .mobile-menu-enter {
            max-height: 0;
            opacity: 0;
          }
          
          .mobile-menu-enter-active {
            max-height: 800px;
            opacity: 1;
            transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          }
          
          .mobile-menu-exit {
            max-height: 800px;
            opacity: 1;
          }
          
          .mobile-menu-exit-active {
            max-height: 0;
            opacity: 0;
            transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          }
          
          /* Performance optimizations for glassmorphism */
          @media (prefers-reduced-motion: reduce) {
            .glass-effect,
            .glass-card,
            .transition-glass {
              backdrop-filter: none;
              -webkit-backdrop-filter: none;
              transition: none;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
