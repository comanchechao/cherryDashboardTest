import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface BenefitPoint {
  icon?: string;
  text: string;
}

interface InfoCard {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  benefits: BenefitPoint[];
}

const CommunityDataModels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("memetic");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const infoCards: InfoCard[] = [
    {
      id: "memetic",
      title: "Memetic Models Have Multiple Benefits",
      image: "/communityRobot.webp",
      imageAlt: "Robot holding a phone",
      benefits: [
        {
          icon: "/adapt.webp", // Placeholder for icon like "arcticons:cloud-mimedia"
          text: "Robots can quickly adapt to cultural shifts by recognizing trends and patterns in shared symbols or ideas.",
        },
        {
          icon: "arcticons:cloud-mimedia", // Placeholder for icon
          text: "Memetic learning enables more natural human-robot interaction by mirroring humor, slang, and collective behaviors.",
        },
        {
          icon: "solar:buildings-2-broken", // Placeholder for icon
          text: "It improves social integration, allowing robots to align with community norms and values faster.",
        },
        {
          icon: "solar:dna-broken", // Placeholder for icon
          text: "Robots gain predictive insight into collective behavior, making them more effective in group settings or markets.",
        },
      ],
    },
    {
      id: "community-interaction",
      title: "Community Interaction Models Have Multiple Benefits",
      image: "/analyticsRobot.webp",
      imageAlt: "Robot holding a tablet",
      benefits: [
        {
          icon: "token:paid", // Placeholder for icon
          text: "Robots can hold conversations that feel more natural and human-like, which builds stronger trust and engagement.",
        },
        {
          icon: "carbon:ibm-application-and-discovery-delivery-intelligence", // Placeholder for icon
          text: "By learning tone, gestures, and timing, robots improve their ability to navigate complex social interactions.",
        },
        {
          icon: "carbon:chart-custom", // Placeholder for icon
          text: "Human interaction models allow robots to adapt to unique personalities, preferences, and communication styles.",
        },
        {
          icon: "streamline-sharp:page-setting", // Placeholder for icon
          text: "Robots become more effective collaborators, anticipating needs and supporting teamwork in dynamic settings.",
        },
      ],
    },
    {
      id: "community-sentiment",
      title: "Community Sentiment Models Have Multiple Benefits",
      image: "/sniperRobot.webp",
      imageAlt: "Robot on a laptop",
      benefits: [
        {
          icon: "carbon:area-custom", // Placeholder for icon
          text: "Robots can gauge public mood, letting them respond in ways that align with collective emotions.",
        },
        {
          icon: "game-icons:avoidance", // Placeholder for icon
          text: "Sentiment models help robots avoid negative reactions by adapting tone and behavior to community feelings.",
        },
        {
          icon: "lucide:trending-up-down", // Placeholder for icon
          text: "They allow robots to spot early shifts in opinion, useful for predicting social or market trends.",
        },
        {
          icon: "token:harmony", // Placeholder for icon
          text: "Robots become better mediators and assistants by fostering harmony within groups and communities.",
        },
      ],
    },
  ];

  // Find the active card
  const activeCard = infoCards.find((card) => card.id === activeTab);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        {infoCards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleTabChange(card.id)}
            className={`px-3  w-full py-3 rounded-full border transition-all duration-300 winky-sans-font text-xs md:text-xs cursor-pointer font-medium ${
              activeTab === card.id
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg"
                : "bg-[var(--color-glass)] text-[var(--color-text-primary)] border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/40"
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[var(--color-accent)] border border-[var(--color-glass-border)] rounded-[20px] p-6 md:p-4 overflow-hidden backdrop-blur-xl w-full transition-all duration-300 ease-out min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2  gap-8 items-center"
          >
            {/* Left - Image */}
            <div className="relative h-full flex items-start">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="  max-w-3xl rounded-[16px]     "
              >
                <div className="    rounded-[16px]">
                  <img
                    src={activeCard?.image}
                    alt={activeCard?.imageAlt}
                    className="w-full rounded-[16px]   object-cover"
                  />
                </div>
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-[var(--color-accent)]/15 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Right - Content */}
            <div className="flex flex-col justify-start items-start">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="maladroit-font text-2xl md:text-3xl text-white mb-4"
              >
                {activeCard?.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="winky-sans-font text-white text-sm md:text-base leading-relaxed space-y-4"
              >
                {activeCard?.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Icon Container */}
                    <div className=" w-14 h-14 bg-white rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                      {benefit.icon ? (
                        <div className="w-full flex items-center justify-center h-full text-white">
                          {benefit.icon.startsWith("/") ||
                          benefit.icon.startsWith("http") ? (
                            // Image file
                            <img
                              src={benefit.icon}
                              alt="benefit icon"
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            // Icon library reference (like arcticons:cloud-mimedia)
                            <Icon
                              icon={benefit.icon}
                              className="text-black"
                              width={40}
                              height={40}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                          <span className="text-xs opacity-50">•</span>
                        </div>
                      )}
                    </div>
                    {/* Text Content */}
                    <p className="flex-1">{benefit.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityDataModels;
