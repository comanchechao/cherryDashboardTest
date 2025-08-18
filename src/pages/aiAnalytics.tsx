import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import {
  HeroSection,
  StatsSection,
  AlgorithmsSection,
  ChatbotSection,
} from "./aiAnalytics/index";

const AIAnalytics = () => {
  return (
    <>
      <div className="relative">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
        </div>

        <Navbar />
        <HeroSection />
        <StatsSection />
        <AlgorithmsSection />
        <ChatbotSection />
        <Footer />
      </div>
    </>
  );
};

export default AIAnalytics;
