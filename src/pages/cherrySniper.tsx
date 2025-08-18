import React, { useEffect } from "react";

import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {
  HeroSection,
  TabsSection,
  NewsletterSignupSection,
} from "./cherrySniper/components";
import DashboardPreview from "../components/DashboardPreview";
import TradeEarnRewards from "../components/TradeEarnRewards";

// Custom animations CSS
const customAnimations = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  @keyframes pulse-gentle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes spin-orbital {
    from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
  }
  @keyframes dash-animate {
    to { stroke-dashoffset: -100; }
  }
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: 200px 0; }
  }
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(214, 2, 77, 0.3); }
    50% { box-shadow: 0 0 30px rgba(214, 2, 77, 0.6); }
  }
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  .referral-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200px 100%;
    animation: shimmer 2s infinite;
  }
  .referral-glow {
    animation: glow-pulse 3s ease-in-out infinite;
  }
  .referral-bounce {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
`;

const CherrySniper: React.FC = () => {
  // Add custom animations to document
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = customAnimations;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div id="triggerXoverFlow" className=" ">
        <div className="header">
          <Navbar />

          {/* Hero Section */}
          <HeroSection />

          {/* Tabs Section - Stealth/Sniper Modes */}
          <TabsSection />
          <TradeEarnRewards />
          <DashboardPreview />
          {/* Cherry Web Trading Platform Section */}

          {/* Newsletter signup section */}
          <NewsletterSignupSection />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default CherrySniper;
