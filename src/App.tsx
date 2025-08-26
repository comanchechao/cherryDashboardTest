import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// import Careers from "./pages/careers";
import HomePage from "./pages/homepage";
// import AboutUs from "./pages/aboutUs";
// import Features from "./pages/features";
// import Roadmap from "./pages/roadmap";
// import UserGrowth from "./pages/userGrowth";
// import CherrySniper from "./pages/cherrySniper";
import CherryToken from "./pages/cherry";
import ComingSoon from "./pages/comingSoon";
import Robotics from "./pages/robotics";
import PageLayout from "./layouts/PageLayout";
import ScrollToTop from "./components/ScrollToTop";
import Rewards from "./pages/rewards/index";
import { ToastProvider } from "./contexts/ToastContext";
import { BSCWalletProvider } from "./components/BSCWalletProvider";
// import WebTrending from "./pages/webTrending";
// import CommunityAI from "./pages/communityAI";
// import AIAnalytics from "./pages/aiAnalytics";

function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <BSCWalletProvider>
        {/* <AuthProvider> */}
        <>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/homepage"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/careers"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/features"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />

              <Route
                path="/aboutUs"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/roadmap"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/userGrowth"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/cherrySniper"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/cherry"
                element={
                  <PageLayout>
                    <CherryToken />
                  </PageLayout>
                }
              />
              <Route
                path="/communityAI"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PageLayout>
                    <Rewards />
                  </PageLayout>
                }
              />
              <Route
                path="/rewards"
                element={
                  <PageLayout>
                    <Rewards />
                  </PageLayout>
                }
              />
              <Route
                path="/webTrending"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
              <Route
                path="/coming-soon"
                element={
                  <PageLayout>
                    <ComingSoon />
                  </PageLayout>
                }
              />
              <Route
                path="/ai-analytics"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />

              <Route
                path="/robotics"
                element={
                  <PageLayout>
                    <Robotics />
                  </PageLayout>
                }
              />

              <Route
                path="*"
                element={
                  <PageLayout>
                    <HomePage />
                  </PageLayout>
                }
              />
            </Routes>
          </AnimatePresence>
          {/* <AuthenticationModalWrapper /> */}
        </>
        {/* </AuthProvider> */}
      </BSCWalletProvider>
    </ToastProvider>
  );
}

export default App;
