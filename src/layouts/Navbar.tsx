import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import { Icon } from "@iconify/react";
import TelegramAuth from "../components/TelegramAuth";

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
      "px-3 py-2 winky-sans-font text-[16px] font-bold transition-colors duration-200 relative nav-link";
    const activeClasses = isActivePath(path)
      ? "text-cherry-red rounded-md active-nav-link"
      : "text-cherry-cream hover:text-cherry-red";

    return `${baseClasses} ${activeClasses}`;
  };

  const getMobileLinkClasses = (path: string) => {
    const baseClasses =
      "block py-2 px-2 winky-sans-font text-sm font-bold transition-colors duration-200 rounded-md";
    const activeClasses = isActivePath(path)
      ? "text-cherry-red border-l-8 border-cherry-red pl-3 w-fit active-nav-link"
      : "text-cherry-cream hover:text-cherry-red";

    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <nav
      className={`fixed top-0 pl-10 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-cherry-burgundy shadow-lg"
          : "py-5 bg-cherry-burgundy"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="maladroit-font text-2xl font-bold text-cherry-cream cherry-logo">
                Cherry<span className="text-cherry-red">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex w-fit  ml-20  items-center space-x-1">
            <Link to="/features" className={getDesktopLinkClasses("/features")}>
              FEATURES
            </Link>

            <Link to="/cherrySniper">
              <div
                className={`px-4 py-1 winky-sans-font text-[16px] font-bold transition-colors duration-200 relative cursor-pointer border-2 rounded-full border-[#4367c9] ${
                  isActivePath("/cherrySniper")
                    ? "bg-[#4367c9] text-cherry-cream"
                    : "text-cherry-cream hover:text-cherry-red hover:bg-[#4367c9]"
                }`}
              >
                <span className="text-cherry-cream">SNIPER</span>
                <span className="absolute -top-3 -right-2 bg-yellow-400 text-cherry-burgundy text-[10px] font-bold px-2 py-0.1 rounded-full">
                  NEW
                </span>
              </div>
            </Link>

            <a
              href="https://docs.cherrybot.co/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 winky-sans-font text-[16px] font-bold text-cherry-cream hover:text-cherry-red transition-colors duration-200 relative nav-link"
            >
              DOCS
            </a>

            <Link
              to="/userGrowth"
              className={getDesktopLinkClasses("/userGrowth")}
            >
              USER GROWTH
            </Link>

            <Link to="/cherry" className={getDesktopLinkClasses("/cherry")}>
              $AIBOT
            </Link>

            {/* <Link to="/rewards" className={getDesktopLinkClasses("/rewards")}>
              REWARDS
            </Link> */}

            <Link to="/roadmap" className={getDesktopLinkClasses("/roadmap")}>
              ROADMAP
            </Link>

            <a
              href="https://pad.cherrybot.ai/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 winky-sans-font text-[16px] font-bold text-cherry-cream hover:text-cherry-red transition-colors duration-200 relative nav-link"
            >
              IDO
            </a>

            <Link to="/aboutUs" className={getDesktopLinkClasses("/aboutUs")}>
              ABOUT US
            </Link>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://t.me/cherrycommunity"
              target="_blank"
              rel="noreferrer"
              className="text-cherry-cream hover:text-cherry-red transition-colors duration-200"
              aria-label="Telegram"
            >
              <Icon
                icon="ic:baseline-telegram"
                width={24}
                height={24}
                className="text-cherry-cream"
              />
            </a>
            <a
              href="https://x.com/cherrytgbot"
              target="_blank"
              rel="noreferrer"
              className="text-cherry-cream hover:text-cherry-red transition-colors duration-200"
              aria-label="X/Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <TelegramAuth />
            {/* <button className="bg-cherry-red hover:bg-cherry-burgundy text-white winky-sans-font font-bold py-2 px-4 rounded-lg border-2 border-cherry-burgundy transition-all duration-200 transform hover:translate-y-1 connect-btn">
              <span className="winky-sans-font text-cherry-cream">Connect</span>
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="outline-none mobile-menu-button"
              aria-label="Menu"
            >
              <svg
                className={`w-6 h-6 text-cherry-cream transition-all duration-300 ${
                  isMobileMenuOpen ? "transform rotate-90" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 py-4 bg-cherry-burgundy"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3">
          <Link to="/features" className={getMobileLinkClasses("/features")}>
            FEATURES
          </Link>

          <Link
            to="/cherrySniper"
            className={`block py-1 px-2 relative winky-sans-font text-sm font-bold transition-colors duration-200 rounded-md ${
              isActivePath("/cherrySniper")
                ? "text-cherry-red bg-cherry-red bg-opacity-10 border-l-3 border-cherry-red pl-3"
                : "text-cherry-cream hover:text-cherry-red"
            }`}
          >
            SNIPER
            <span className="absolute -top-2 animate-pulse left-9 bg-yellow-400 text-cherry-burgundy text-[10px] font-bold px-2 py-0.1 rounded-full">
              NEW
            </span>
          </Link>

          <a
            href="https://docs.cherrybot.co/"
            target="_blank"
            rel="noreferrer"
            className="block py-2 px-2 winky-sans-font text-sm font-bold text-cherry-cream hover:text-cherry-red transition-colors duration-200"
          >
            DOCS
          </a>

          <Link
            to="/userGrowth"
            className={getMobileLinkClasses("/userGrowth")}
          >
            USER GROWTH
          </Link>

          <Link to="/cherry" className={getMobileLinkClasses("/cherry")}>
            $AIBOT
          </Link>

          {/* <Link to="/rewards" className={getMobileLinkClasses("/rewards")}>
            REWARDS
          </Link> */}

          <Link to="/roadmap" className={getMobileLinkClasses("/roadmap")}>
            ROADMAP
          </Link>

          <a
            href="https://pad.cherrybot.ai/"
            target="_blank"
            rel="noreferrer"
            className="block py-2 px-2 winky-sans-font text-sm font-bold text-cherry-cream hover:text-cherry-red transition-colors duration-200"
          >
            IDO
          </a>

          <Link to="/aboutUs" className={getMobileLinkClasses("/aboutUs")}>
            ABOUT US
          </Link>
          <a
            href="https://t.me/cherrycommunity"
            target="_blank"
            rel="noreferrer"
            className="text-cherry-cream hover:text-cherry-red transition-colors duration-200"
            aria-label="Telegram"
          >
            <Icon
              icon="ic:baseline-telegram"
              width={24}
              height={24}
              className="text-cherry-cream"
            />
          </a>
          <a
            href="https://x.com/cherrytgbot"
            target="_blank"
            rel="noreferrer"
            className="text-cherry-cream hover:text-cherry-red transition-colors duration-200"
            aria-label="X/Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <div className="flex flex-col space-y-2 pt-4">
            <TelegramAuth />
          </div>
          {/* <button className="w-full bg-cherry-red hover:bg-cherry-burgundy text-white winky-sans-font font-bold py-2 px-4 rounded-lg border-2 border-cherry-burgundy transition-all duration-200 connect-btn">
            Connect
          </button> */}
        </div>
      </div>

      {/* Add CSS for nav-link hover underline effect and active states */}
      <style>
        {`
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            border-radius: 10px;
            background-color: var(--color-cherry-red);
            transition: width 0.3s ease;
          }
          .nav-link:hover::after {
            width: 100%;
          }
          
          /* Active link styling - override hover underline for active links */
          .active-nav-link::after {
            width: 100%;
            height: 3px;
            background-color: var(--color-cherry-red);
          }
          
          /* Border left indicator for mobile */
          .border-l-3 {
            border-left-width: 3px;
          }
          
          /* Active state background - stable and persistent */
          .active-nav-link {
            background-color: rgba(220, 38, 127, 0.1) !important;
          }
          
          /* Mobile active state background */
          .active-nav-link.border-l-3 {
            background-color: rgba(220, 38, 127, 0.1) !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
