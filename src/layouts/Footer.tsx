import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white py-20">
      <div className="absolute inset-0 bg-accent h-1 w-1/2 left-1/4"></div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/logoCherry.png"
              loading="lazy"
              alt="Cherry logo"
              className="w-72 object-contain"
            />
          </div>

          {/* Main Heading */}
          <h2 className="text-black font-sans text-4xl md:text-6xl font-bold mb-4">
            Join the Robotics Revolution
          </h2>

          {/* Description */}
          <p className="text-black font-sans text-base max-w-2xl mb-8">
            Connect with the Cherry AI community and stay updated with the
            latest developments in Robotics
          </p>

          {/* Social Links Grid */}
          <div className="flex flex-wrap gap-4">
            {[
              {
                icon: "ic:baseline-telegram",
                label: "Community",
                url: "https://t.me/cherrycommunity",
              },
              {
                icon: "mdi:twitter",
                label: "Twitter",
                url: "https://x.com/cherrytgbot",
              },
              {
                icon: "mdi:robot",
                label: "Bot",
                url: "https://t.me/CherryTGBot",
              },
              {
                icon: "mdi:chart-line",
                label: "Trending",
                url: "https://t.me/cherrytrending",
              },
            ].map((social, index) => (
              <button
                key={index}
                onClick={() => window.open(social.url, "_blank")}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-sans flex items-center gap-2"
              >
                <Icon icon={social.icon} className="w-4 h-4 text-white" />
                {social.label}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-right">
          <p className="text-black font-sans text-sm">
            COPYRIGHT © 2025 CHERRY AI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
