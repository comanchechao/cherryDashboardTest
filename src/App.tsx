import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Careers from "./pages/careers";
import HomePage from "./pages/homepage";
import AboutUs from "./pages/aboutUs";
import Features from "./pages/features";
import Roadmap from "./pages/roadmap";
import UserGrowth from "./pages/userGrowth";
import CherrySniper from "./pages/cherrySniper";
import CherryToken from "./pages/cherry";
import ComingSoon from "./pages/comingSoon";
import PageLayout from "./layouts/PageLayout";
import ScrollToTop from "./components/ScrollToTop";
import Rewards from "./pages/rewards/index";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./components/AuthProvider";
import WebTrending from "./pages/webTrending";
import CommunityAI from "./pages/communityAI";
import AIAnalytics from "./pages/aiAnalytics";
function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <AuthProvider>
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
                    <Careers />
                  </PageLayout>
                }
              />
              <Route
                path="/features"
                element={
                  <PageLayout>
                    <Features />
                  </PageLayout>
                }
              />

              <Route
                path="/aboutUs"
                element={
                  <PageLayout>
                    <AboutUs />
                  </PageLayout>
                }
              />
              <Route
                path="/roadmap"
                element={
                  <PageLayout>
                    <Roadmap />
                  </PageLayout>
                }
              />
              <Route
                path="/userGrowth"
                element={
                  <PageLayout>
                    <UserGrowth />
                  </PageLayout>
                }
              />
              <Route
                path="/cherrySniper"
                element={
                  <PageLayout>
                    <CherrySniper />
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
                    <CommunityAI />
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
                    <WebTrending />
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
                    <AIAnalytics />
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
        </>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
