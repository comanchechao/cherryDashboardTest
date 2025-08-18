import React from "react";
import "../css/cherry.css";
import "../css/hero-animations.css";
import "../css/cherryWebApp.css";

const CherryWebApp: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-primary">
        {/* Hero Section */}
        <div className="hero_section scroll-container1 relative overflow-hidden pt-32 pb-20">
          {/* Radial Energy Field Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-[var(--color-accent)]/20 via-[var(--color-bg-secondary)]/40 to-[var(--color-bg-primary)] opacity-60"></div>

            {/* Concentric Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-[800px] h-[800px] border border-[var(--color-accent)]/10 rounded-full animate-spin-slow"></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--color-accent)]/8 rounded-full animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "30s",
                }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[var(--color-accent)]/6 rounded-full animate-spin-slow"
                style={{ animationDuration: "25s" }}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-[var(--color-accent)]/40 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float-slow"></div>
            <div
              className="absolute bottom-40 left-1/4 w-4 h-4 bg-[var(--color-accent)]/50 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[var(--color-accent)]/35 rounded-full animate-float-slow"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-6 maladroit-font">
                CherryAI Web App
              </h1>
              <p className="text-xl lg:text-2xl text-secondary max-w-4xl mx-auto leading-relaxed">
                Combines all AI-powered bots in one place. One-stop shop for
                digital AI robots that trade, analyze tokens and keep track of
                KOLs influencers.
              </p>
            </div>

            {/* Web App Interface Preview */}
            <div className="glass-effect rounded-3xl border border-glass p-8 lg:p-12 backdrop-blur-xl">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Panel - Description */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-primary maladroit-font">
                    CherryAI Web App Combines It All In One Place
                  </h2>
                  <p className="text-lg text-secondary leading-relaxed">
                    CherryAI is building a web app that will combine all the AI
                    powered bots in its ecosystem in one place. This web app is
                    one stop shop for digital AI robots that trade, analyze
                    tokens and keep track of KOLs influencers.
                  </p>
                </div>
                {/* Right Panel - Web App Interface */}
                <div className="webapp-card rounded-2xl p-6">
                  <img
                    src="/staticwebapp.webp"
                    alt="Cherry Web App"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CherryWebApp;
