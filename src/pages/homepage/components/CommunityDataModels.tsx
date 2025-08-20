import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoCard {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  content: string;
}

const CommunityDataModels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("memetic");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const infoCards: InfoCard[] = [
    {
      id: "memetic",
      title: "Memetic Models",
      image: "/communityRobot.webp",
      imageAlt: "Robot holding a phone",
      content:
        "Memetic Models Have Multiple Benefits\n\n• Robots can quickly adapt to cultural shifts by recognizing trends and patterns in shared symbols or ideas.\n\n• Memetic learning enables more natural human-robot interaction by mirroring humor, slang, and collective behaviors.\n\n• It improves social integration, allowing robots to align with community norms and values faster.\n\n• Robots gain predictive insight into collective behavior, making them more effective in group settings or markets.",
    },
    {
      id: "community-interaction",
      title: "Community Interaction Models",
      image: "/analyticsRobot.webp",
      imageAlt: "Robot holding a tablet",
      content:
        "Community Interaction Models Have Multiple Benefits\n\n• Robots can hold conversations that feel more natural and human-like, which builds stronger trust and engagement.\n\n• By learning tone, gestures, and timing, robots improve their ability to navigate complex social interactions.\n\n• Human interaction models allow robots to adapt to unique personalities, preferences, and communication styles.\n\n• Robots become more effective collaborators, anticipating needs and supporting teamwork in dynamic settings.",
    },
    {
      id: "community-sentiment",
      title: "Community Sentiment Models",
      image: "/sniperRobot.webp",
      imageAlt: "Robot on a laptop",
      content:
        "Community Sentiment Models Have Multiple Benefits\n\n• Robots can gauge public mood, letting them respond in ways that align with collective emotions.\n\n• Sentiment models help robots avoid negative reactions by adapting tone and behavior to community feelings.\n\n• They allow robots to spot early shifts in opinion, useful for predicting social or market trends.\n\n• Robots become better mediators and assistants by fostering harmony within groups and communities.",
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
            className={`px-3  w-full py-3 rounded-[8px] border transition-all duration-300 winky-sans-font text-xs md:text-xs cursor-pointer font-medium ${
              activeTab === card.id
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg"
                : "bg-[var(--color-glass)] text-[var(--color-text-primary)] border-[var(--color-glass-border)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/40"
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 md:p-8 overflow-hidden backdrop-blur-xl w-full transition-all duration-300 ease-out min-h-[400px]">
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
                className="bg-[var(--color-bg-secondary)]/20 max-w-3xl rounded-[16px] p-4 border border-[var(--color-accent)]/20"
              >
                <div className="aspect-video overflow-hidden rounded-[12px]">
                  <img
                    src={activeCard?.image}
                    alt={activeCard?.imageAlt}
                    className="w-full h-full object-cover"
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
                className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] mb-4"
              >
                {activeCard?.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="winky-sans-font text-[var(--color-text-secondary)]/90 text-sm md:text-sm leading-relaxed whitespace-pre-line"
              >
                {activeCard?.content}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityDataModels;
