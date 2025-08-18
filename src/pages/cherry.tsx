import React from "react";
import "../css/cherry.css";
import "../css/hero-animations.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {
  TokenOverviewSection,
  TokenomicsTableSection,
  RevenueModelSection,
  StakingSystemSection,
  BuybackBurnSection,
  AIBOTUtilitySection,
} from "./cherry/components";

const CherryToken: React.FC = () => {
  return (
    <>
      <div className=" ">
        <Navbar />

        <TokenOverviewSection />

        {/* $AIBOT Utility Section */}
        <AIBOTUtilitySection />

        {/* Cherry Ecosystem Revenue Model */}
        <RevenueModelSection />

        {/* Cherry Points & Staking System */}
        <StakingSystemSection />

        {/* $AIBOT Buyback & Burn Section */}
        <BuybackBurnSection />
        {/* Tokenomics Table Section */}
        <TokenomicsTableSection />
        <Footer />
      </div>
    </>
  );
};

export default CherryToken;
