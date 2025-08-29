import React from "react";
import { Icon } from "@iconify/react";

interface PlaceholderTabProps {
  icon: string;
  title: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ icon, title }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-sm p-8 text-center">
      <div className="mb-6">
        <Icon
          icon={icon}
          width={60}
          height={60}
          className="text-white/70 mx-auto mb-6"
        />
        <h3 className="maladroit-font text-2xl text-white mb-4">{title}</h3>
      </div>
    </div>
  );
};

export default PlaceholderTab;
