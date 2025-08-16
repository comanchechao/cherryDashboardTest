import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#01030f] via-[#011020] to-[#01030f] py-20">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Multi-layered Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(67,103,201,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(67,103,201,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(67,103,201,0.08)_0%,transparent_70%)]"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(67,103,201,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(67,103,201,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-[#4367c9]/20 rounded-full animate-spin-slow"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#4367c9]/15 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#4367c9]/10 rounded-full animate-spin-slow"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#4367c9] rounded-full animate-ping"></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-[#4367c9]/80 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-2 h-2 bg-[#4367c9]/60 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-5 h-5 bg-[#4367c9]/40 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Energy Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#4367c9]/10 via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <img
              src="/eat_cherry.png"
              loading="lazy"
              alt="Cherry mascot"
              className="w-32 h-32 object-contain animate-float relative z-10"
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 w-32 h-32 bg-[#4367c9]/30 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <h2 className="maladroit-font text-4xl md:text-6xl font-bold text-white mt-8 mb-4">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4367c9] to-[#8baafe]">
              Revolution
            </span>
          </h2>
          <p className="winky-sans-font text-lg text-[#a0a0a0] max-w-2xl mx-auto">
            Connect with the Cherry AI community and stay updated with the
            latest developments in AI-powered trading
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#4367c9] to-transparent"></div>
          <div className="w-3 h-3 bg-[#4367c9] rounded-full mx-4 animate-pulse"></div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#4367c9] to-transparent"></div>
        </div>

        {/* Copyright & Legal */}
        <div className="text-center">
          <div className="bg-[#011020]/60 backdrop-blur-xl border border-[#4367c9]/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="winky-sans-font text-[#a0a0a0] mb-3">
              COPYRIGHT © 2025 CHERRY AI. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#808080]">
              <span className="hover:text-[#4367c9] cursor-pointer transition-colors duration-300">
                Privacy Policy
              </span>
              <span className="hover:text-[#4367c9] cursor-pointer transition-colors duration-300">
                Terms of Service
              </span>
              <span className="hover:text-[#4367c9] cursor-pointer transition-colors duration-300">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Energy Field */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4367c9] to-transparent"></div>
    </footer>
  );
};

export default Footer;
