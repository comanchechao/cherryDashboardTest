import React from "react";
import { Icon } from "@iconify/react";

const DashboardPreview: React.FC = () => {
  return (
    <div className="bg-[var(--color-glass)] max-w-7xl mx-auto mt-24 border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
      {/* Floating Background Elements */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>
      <div className="absolute top-1/2 -left-16 w-20 h-20 bg-[var(--color-accent)]/15 rounded-full animate-pulse"></div>

      <div className="relative z-10">
        <div className="text-center">
          <h3 className="maladroit-font text-3xl md:text-4xl text-[var(--color-text-primary)] mb-4">
            SniperAI Bot Manual Mode Offers A Dashboard
          </h3>
          <p className="winky-sans-font text-lg text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto">
            Keep track of all your trading activity and the points you've
            gathered on the dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex items-start gap-3 group">
            <div className="p-2 bg-[var(--color-accent)]/20 rounded-lg group-hover:bg-[var(--color-accent)]/30 transition-colors">
              <Icon
                icon="ph:chart-line-up-bold"
                className="text-[var(--color-accent)]"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h4 className="winky-sans-font text-[var(--color-text-primary)] text-left font-medium">
                Volume Tracked
              </h4>
              <p className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-80">
                See how much you've traded
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="p-2 bg-[var(--color-accent)]/20 rounded-lg group-hover:bg-[var(--color-accent)]/30 transition-colors">
              <Icon
                icon="ph:star-bold"
                className="text-[var(--color-accent)]"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h4 className="winky-sans-font text-[var(--color-text-primary)] text-left font-medium">
                Points Earned
              </h4>
              <p className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-80">
                Earn 1 point for every $10 traded
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="p-2 bg-[var(--color-accent)]/20 rounded-lg group-hover:bg-[var(--color-accent)]/30 transition-colors">
              <Icon
                icon="ph:trophy-bold"
                className="text-[var(--color-accent)]"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h4 className="winky-sans-font text-[var(--color-text-primary)] text-left font-medium">
                Leaderboard Rank
              </h4>
              <p className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-80">
                Climb to the top for airdrop rewards
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="p-2 bg-[var(--color-accent)]/20 rounded-lg group-hover:bg-[var(--color-accent)]/30 transition-colors">
              <Icon
                icon="ph:medal-bold"
                className="text-[var(--color-accent)]"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h4 className="winky-sans-font text-[var(--color-text-primary)] text-left font-medium">
                Achievements
              </h4>
              <p className="winky-sans-font text-sm text-[var(--color-text-secondary)] opacity-80">
                Unlock bonus points as you trade more
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-[var(--color-glass)] h-80 rounded-xl border-2 border-[var(--color-accent)] p-2 shadow-[4px_4px_0px_rgba(67,103,201,0.3)] hover:shadow-[6px_6px_0px_rgba(67,103,201,0.4)] transition-all duration-300 group">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img
                src="https://storage.cherrybot.ai/screenshot.jpg"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="SniperAI Bot"
              />
            </div>
          </div>

          <div className="bg-[var(--color-glass)] h-80 rounded-xl border-2 border-[var(--color-accent)] p-2 shadow-[4px_4px_0px_rgba(67,103,201,0.3)] hover:shadow-[6px_6px_0px_rgba(67,103,201,0.4)] transition-all duration-300 group">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img
                src="https://storage.cherrybot.ai/screenshot2.jpg"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="SniperAI Bot"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="maladroit-font text-2xl text-[var(--color-text-primary)]">
            Whether you win or lose — you still earn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
