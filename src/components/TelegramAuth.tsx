import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const TelegramAuth: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, isLoading, user, error, logout, clearError } =
    useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    console.log("🚪 [Telegram Auth] Logging out...");
    setIsDropdownOpen(false);
    await logout();
  };

  if (isLoading) {
    return (
      <button
        disabled
        className="flex items-center cursor-not-allowed space-x-2 bg-cherry-cream border-2 border-cherry-burgundy px-4 py-2.5 rounded-xl transition-all duration-300 opacity-50  "
      >
        <Icon
          icon="eos-icons:loading"
          className="w-5 h-5 text-cherry-red animate-spin"
        />
        <span className="winky-sans-font text-sm text-cherry-burgundy">
          Checking...
        </span>
      </button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Logged In Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center cursor-pointer space-x-2 bg-cherry-red hover:bg-cherry-red/90 border border-b-4 border-r-4 border-cherry-burgundy    px-4 py-2.5 rounded-xl transition-all duration-200 transform-gpu     group"
          aria-label="Telegram Auth"
        >
          <Icon
            icon="logos:telegram"
            className="w-5 h-5 text-cherry-cream group-hover:text-cherry-cream transition-all duration-300"
          />
          <span className="winky-sans-font text-sm text-cherry-cream group-hover:text-cherry-cream transition-colors duration-300">
            Logged In
          </span>
          <Icon
            icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
            className={`w-4 h-4 text-cherry-cream group-hover:text-cherry-cream transition-all duration-300 ${
              isDropdownOpen ? "rotate-180 text-cherry-cream" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-cherry-cream border-4 border-cherry-burgundy rounded-2xl shadow-[8px_8px_0px_#5d4037] p-2 z-50">
            {/* Content Section */}
            <div className="space-y-1">
              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl">
                  <p className="winky-sans-font text-sm text-red-800 mb-2">
                    {error}
                  </p>
                  <button
                    onClick={clearError}
                    className="winky-sans-font text-xs text-red-600 hover:text-red-700 underline transition-colors duration-300"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/rewards"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-cherry-cream hover:bg-cherry-cream/90 border border-b-2 border-r-2 border-cherry-burgundy hover:border-b-1 hover:border-r-1 hover:translate-y-0.5 hover:translate-x-0.5 rounded-xl transition-all duration-200 transform-gpu shadow-[1px_1px_0px_#321017] hover:shadow-[1px_1px_0px_#321017] group"
                >
                  <Icon
                    icon="ph:trophy-bold"
                    className="w-5 h-5 text-cherry-burgundy group-hover:text-cherry-red transition-colors duration-300"
                  />
                  <span className="winky-sans-font text-sm text-cherry-burgundy group-hover:text-cherry-red transition-colors duration-300">
                    Dashboard
                  </span>
                  <Icon
                    icon="material-symbols:arrow-forward-ios"
                    className="w-4 h-4 text-cherry-burgundy group-hover:text-cherry-red transition-colors duration-300 ml-auto"
                  />
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full cursor-pointer gap-3 px-4 py-3 bg-cherry-burgundy hover:bg-red-600 border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 rounded-xl transition-all duration-200 transform-gpu   hover:  group"
                >
                  <Icon
                    icon="material-symbols:logout"
                    className="w-5 h-5 text-cherry-cream group-hover:text-cherry-cream transition-colors duration-300"
                  />
                  <span className="winky-sans-font text-sm text-cherry-cream group-hover:text-cherry-cream transition-colors duration-300">
                    Sign Out
                  </span>
                  <Icon
                    icon="material-symbols:arrow-forward-ios"
                    className="w-4 h-4 text-cherry-cream group-hover:text-cherry-cream transition-colors duration-300 ml-auto"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href="https://t.me/cherrysniperbot?start=login_cherry"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center cursor-pointer space-x-2 bg-cherry-red hover:bg-cherry-red/90 border border-0 !border-cherry-cream px-4 py-2.5 rounded-xl transition-all duration-200   nav-link relative"
    >
      <Icon
        icon="logos:telegram"
        className="text-cherry-cream group-hover:text-cherry-cream transition-all duration-300"
        width={20}
        height={20}
      />
      <span className="winky-sans-font text-base text-cherry-cream group-hover:text-cherry-cream transition-colors duration-300">
        Login
      </span>

      {/* Add CSS for nav-link hover underline effect */}
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
        
        `}
      </style>
    </a>
  );
};

export default TelegramAuth;
