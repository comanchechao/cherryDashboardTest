import React, { useRef } from "react";
import "../css/cherry.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {
  HeroSection,
  CherrySniperSection,
  ManagementBotSection,
  AITrendingSection,
  FinalCTASection,
} from "./features/components";

const Features: React.FC = () => {
  // Refs for animation
  const heroRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const sniperRef = useRef<HTMLDivElement>(null);
  const upcomingFeaturesRef = useRef<HTMLDivElement>(null);

  // Handler functions for CTAs
  const handleExploreBot = () => {
    window.open("https://t.me/CherryTGBot", "_blank");
  };

  const handleViewTrending = () => {
    window.open("https://t.me/cherrytrending", "_blank");
  };

  const handleStartQuesting = () => {
    window.open("https://t.me/cherrygame_io_bot", "_blank");
  };

  return (
    <>
      <div id="triggerXoverFlow" className="wrapper_sections wrapper-container">
        <Navbar />

        <div className="max-w-8xl mx-auto lg:px-0 px-5 pt-16">
          {/* Hero Section */}
          <div id="home" ref={heroRef}>
            <HeroSection
              handleExploreBot={handleExploreBot}
              handleViewTrending={handleViewTrending}
              handleStartQuesting={handleStartQuesting}
            />
          </div>

          {/* SniperAI Bot Section */}
          <div id="sniper" ref={sniperRef}>
            <CherrySniperSection />
          </div>

          {/* Management Bot Section */}
          <div id="bot" ref={botRef}>
            <ManagementBotSection handleExploreBot={handleExploreBot} />
          </div>

          {/* AI Trending Section */}
          <div id="trending" ref={trendingRef}>
            <AITrendingSection handleViewTrending={handleViewTrending} />
          </div>

          {/* Final CTA Section */}
          <div ref={upcomingFeaturesRef}>
            <FinalCTASection
              handleExploreBot={handleExploreBot}
              handleViewTrending={handleViewTrending}
              handleStartQuesting={handleStartQuesting}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Features;
