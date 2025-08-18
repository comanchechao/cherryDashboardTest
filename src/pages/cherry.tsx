import React from "react";
import "../css/cherry.css";
import "../css/hero-animations.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {
  TokenOverviewSection,
  TokenomicsSection,
  TokenomicsTableSection,
  WhyHoldSection,
  RevenueModelSection,
  StakingSystemSection,
  BuybackBurnSection,
} from "./cherry/components";

const CherryToken: React.FC = () => {
  return (
    <>
      <div className=" ">
        <Navbar />

        <TokenOverviewSection />

        <TokenomicsSection />

        {/* Tokenomics Table Section */}
        <TokenomicsTableSection />

        {/* Why Hold $AIBOT */}
        <WhyHoldSection />

        {/* Cherry Ecosystem Revenue Model */}
        <RevenueModelSection />

        {/* Cherry Points & Staking System */}
        <StakingSystemSection />

        {/* $AIBOT Buyback & Burn Section */}
        <BuybackBurnSection />

        <Footer />
      </div>
    </>
  );
};

export default CherryToken;
