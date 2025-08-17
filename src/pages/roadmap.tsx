import React from "react";
import "../css/cherry.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {
  MilestoneTimelineSection,
  ProductChangelogSection,
  NewsletterSignupSection,
} from "./roadmap/components";

const Roadmap: React.FC = () => {
  return (
    <>
      <div id="triggerXoverFlow" className=" ">
        <div className="header">
          <Navbar />

          {/* Milestone Timeline Section */}
          <MilestoneTimelineSection />

          {/* Product Changelog Section */}
          <ProductChangelogSection />

          {/* Newsletter signup section */}
          <NewsletterSignupSection />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Roadmap;
