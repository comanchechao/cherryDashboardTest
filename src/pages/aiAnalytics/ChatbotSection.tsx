import React from "react";

const ChatbotSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[16px] p-8">
          <h2 className="maladroit-font text-4xl md:text-5xl text-[var(--color-text-primary)] mb-8">
            Channel Subscribers Can Talk To The AI
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="winky-sans-font text-xl text-[var(--color-text-secondary)]/90 leading-relaxed">
                AI Analytics will be adding in a chatbot feature to the product.
                Users will be able to subscribe to the channel by paying a fee
                to use the chatbot. This AI chatbot will use AI to analyze
                trending tokens and answer user questions.
              </p>
            </div>
            <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-xl h-56 flex items-center justify-center">
              <img
                src="https://storage.cherrybot.ai/chatbot.webp"
                alt="Chatbot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSection;
