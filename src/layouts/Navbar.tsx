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

  const getMobileLinkClasses = (path: string) => {
    const baseClasses =
      "block py-3 px-4 winky-sans-font text-sm font-medium transition-all duration-300";
    const activeClasses = isActivePath(path)
      ? "text-accent"
      : "text-primary hover:text-accent";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent ${
        isScrolled ? "py-3 bg-white" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/logoCherry.svg"
                className="w-44 object-contain"
                alt=""
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("partners")}
              className="winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 cursor-pointer"
            >
              Partners and Integrations
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 cursor-pointer"
            >
              Ecosystem
            </button>
            <button
              onClick={() => scrollToSection("binance-support")}
              className="winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 cursor-pointer"
            >
              Backers
            </button>
            <button
              onClick={() => scrollToSection("token-overview")}
              className="winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300 cursor-pointer"
            >
              $AIBOT
            </button>
            <Link
              to="/robotics"
              className="winky-sans-font text-[13px] font-medium text-primary hover:text-accent transition-all duration-300"
            >
              Robotics
            </Link>
          </div>

          {/* Right Section - Dashboard and Social Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 winky-sans-font text-[13px] font-medium text-primary bg-white border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Icon
                icon="duo-icons:dashboard"
                className="w-4 h-4"
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
                className="p-2 bg-black text-white rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Twitter"
              >
                <Icon icon="ri:twitter-x-line" className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/cherrycommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black text-white rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Telegram"
              >
                <Icon icon="ic:baseline-telegram" className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="outline-none p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300"
              aria-label="Menu"
            >
              <svg
                className={`w-6 h-6 transition-all duration-300 ${
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-200 ${
          isMobileMenuOpen
            ? "max-h-[800px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-4">
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("partners")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 text-left w-full"
              >
                Partners and Integrations
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 text-left w-full"
              >
                Ecosystem
              </button>
              <button
                onClick={() => scrollToSection("binance-support")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 text-left w-full"
              >
                Backers
              </button>
              <button
                onClick={() => scrollToSection("community")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 text-left w-full"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection("token-overview")}
                className="block py-3 px-4 winky-sans-font text-sm font-medium text-primary hover:text-accent transition-all duration-300 text-left w-full"
              >
                $AIBOT
              </button>
              <Link
                to="/robotics"
                className={getMobileLinkClasses("/robotics")}
              >
                Robotics
              </Link>
              <Link
                to="/dashboard"
                className={getMobileLinkClasses("/dashboard")}
              >
                AIBOT Dashboard
              </Link>

              {/* Social Media Icons - Mobile */}
              <div className="flex items-center justify-center space-x-2 pt-2">
                <a
                  href="https://x.com/cherrytgbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black text-white rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Icon icon="ri:twitter-x-line" className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/cherrycommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black text-white rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Telegram"
                >
                  <Icon icon="ic:baseline-telegram" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
