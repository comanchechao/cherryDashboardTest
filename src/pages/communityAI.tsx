import HeroSection from "./communityAI/HeroSection";
import StatsSection from "./communityAI/StatsSection";
import CommunityModesSection from "./communityAI/CommunityModesSection";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const CommunityAI = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CommunityModesSection />
      <Footer />
    </>
  );
};

export default CommunityAI;
