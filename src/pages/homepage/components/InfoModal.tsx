import React, { useState, useEffect } from "react";

interface InfoCard {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  content: string;
}

const InfoModal: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveCard(null);
      setIsClosing(false);
    }, 300); // Match the transition duration
  };

  const handleOpenModal = (cardId: string) => {
    setActiveCard(cardId);
    setIsClosing(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeCard) {
        handleCloseModal();
      }
    };

    if (activeCard) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [activeCard]);

  const infoCards: InfoCard[] = [
    {
      id: "memetic",
      title: "Memetic Models",
      image: "/communityRobot.webp",
      imageAlt: "Robot holding a phone",
      content:
        'Memes are like compressed signals of sentiment — they spread when people resonate with an idea emotionally. If a robot can parse and model memes, it can: Understand cultural context so its interactions don\'t feel "robotic." React in real-time to viral narratives that drive politics, or consumer behavior.',
    },
    {
      id: "community-interaction",
      title: "Community Interaction Models",
      image: "/analyticsRobot.webp",
      imageAlt: "Robot holding a tablet",
      content:
        "Robots trained on human interaction data can learn social cues and adapt their responses to build trust and cooperation with people. That means instead of just executing tasks, the robot understands tone, timing, intent, and context — making it far better at negotiation, persuasion and customer support.",
    },
    {
      id: "community-sentiment",
      title: "Community Sentiment Models",
      image: "/sniperRobot.webp",
      imageAlt: "Robot on a laptop",
      content:
        "Robots that model community sentiment can anticipate collective decision-making before it shows up in the data (like markets, votes, or trends). That means instead of reacting after the crowd moves, the robot can predict shifts in consensus and act strategically ahead of time.",
    },
  ];

  return (
    <div className="w-full">
      {/* Three Info Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        {infoCards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleOpenModal(card.id)}
            className={`px-6 py-3 rounded-[8px] border transition-all duration-300 winky-sans-font text-xs cursor-pointer font-medium ${
              activeCard === card.id
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-lg"
                : "bg-[var(--color-glass)] text-[var(--color-text-primary)] border-[var(--color-glass-border)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/40"
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Modal Overlay */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div
            className={`relative bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 md:p-8 overflow-hidden backdrop-blur-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform ${
              isClosing
                ? "opacity-0 scale-95 translate-y-4"
                : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center hover:bg-[var(--color-accent)]/30 transition-all duration-200 hover:scale-110 z-10"
            >
              <svg
                className="w-4 h-4 text-[var(--color-accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left - Image */}
              <div className="relative">
                <div className="bg-[var(--color-bg-secondary)]/20 rounded-[16px] p-4 border border-[var(--color-accent)]/20">
                  <div className="aspect-video overflow-hidden rounded-[12px]">
                    <img
                      src={
                        infoCards.find((card) => card.id === activeCard)?.image
                      }
                      alt={
                        infoCards.find((card) => card.id === activeCard)
                          ?.imageAlt
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-[var(--color-accent)]/15 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Right - Content */}
              <div className="flex flex-col justify-center">
                <h3 className="maladroit-font text-2xl md:text-3xl text-[var(--color-text-primary)] mb-4">
                  {infoCards.find((card) => card.id === activeCard)?.title}
                </h3>
                <p className="winky-sans-font text-[var(--color-text-secondary)]/90 text-base md:text-lg leading-relaxed">
                  {infoCards.find((card) => card.id === activeCard)?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoModal;
