import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "What is Cherry AI Robotics?",
      answer:
        "Cherry AI Robotics is a data-focused company building the world's first dedicated data layer and models for robotics. Its own native products, such as: trading platforms and Telegram tools act as data pipelines. They channel community activity into structured datasets that power AI-driven robotic systems.",
    },
    {
      question: "How does Cherry AI Robotics collect data?",
      answer:
        "The ecosystem gathers data through its token trading platforms, Telegram-based management tools, and community engagement products. Every trade, alert, and interaction becomes part of a continuous data funnel that helps train robotics AI.",
    },
    {
      question: "How does Cherry AI Robotics parse data?",
      answer:
        "Cherry AI is developing its own parsing platform that securely encrypts and stores all user-generated data. This ensures that every dataset is cleaned, structured, and transformed into robotics-ready datasets while keeping security and privacy intact.",
    },
    {
      question: "How does the $AIBOT token fit into the ecosystem?",
      answer:
        "The token gives the community access to staking rewards, loot boxes and the token will also have a buyback and burn mechanism. As the Cherry AI Robotics ecosystem grows it will generate more fees and data from its products, which will be used to offer more rewards, buybacks and burns.",
    },
    {
      question:
        "What makes Cherry AI Robotics different from other robotics companies?",
      answer:
        "While most robotics firms focus on hardware or isolated AI tools, Cherry AI is building the foundational data infrastructure. By combining its native products with a secure parsing platform, it positions itself as the core provider of parsed data and AI models for robotics worldwide.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Title Section */}
          <div className="space-y-4">
            <h1 className="text-4xl  font-semibold  text-black font-sans">
              FAQs
            </h1>
            <h2 className="text-4xl  font-semibold  text-black font-sans">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Column - Questions and Answers */}
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left flex items-center justify-between group"
                >
                  <h3 className="text-2xl font-semibold text-black font-sans pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <Icon
                      icon={
                        openItems.includes(index) ? "mdi:minus" : "mdi:plus"
                      }
                      className="w-6 h-6 text-black transition-transform duration-200"
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index)
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xl text-black   font-extralight leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
