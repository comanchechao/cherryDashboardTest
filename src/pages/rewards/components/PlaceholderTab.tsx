import React from "react";
import { Icon } from "@iconify/react";

interface PlaceholderTabProps {
  icon: string;
  title: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ icon, title }) => {
  return (
    <div className="glass-effect rounded-xl p-12 border border-[var(--color-border)] text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-24 h-24 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center">
          <Icon
            icon={icon}
            className="text-[var(--color-accent)]"
            width={48}
            height={48}
          />
        </div>

        <div className="space-y-4">
          <h3 className="maladroit-font text-3xl md:text-4xl text-[var(--color-text-primary)]">
            {title}
          </h3>
          <p className="winky-sans-font text-lg text-[var(--color-text-secondary)] max-w-md mx-auto">
            This feature is currently under development. We're working hard to
            bring you the best staking experience.
          </p>
        </div>

        <div className="glass-card rounded-lg p-4 border border-[var(--color-border)]">
          <p className="winky-sans-font text-sm text-[var(--color-text-secondary)]">
            Stay tuned for updates and announcements!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderTab;
