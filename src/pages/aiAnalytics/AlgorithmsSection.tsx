import React from "react";

const cards = [
  {
    title: "PRESALE/LAUNCHPAD TRENDING",
    desc: "Spot promising tokens before launch and rank them by early traction, volume velocity, and holder growth.",
    img: "https://storage.cherrybot.ai/alg-presale.png",
  },
  {
    title: "PRELAUNCH TRENDING",
    desc: "Get early access to pre-launch projects backed by real user interest, bot signals, and dev activity.",
    img: "https://storage.cherrybot.ai/alg-prelaunch.png",
  },
  {
    title: "AI TOKEN TRACKING + VOLUME BOOSTING",
    desc: "Cherry AI scans live market data to detect real momentum — and our Volume Bot can help you simulate volume and holder activity to push tokens to the top organically.",
    img: "https://storage.cherrybot.ai/alg-volume.png",
  },
];

const AlgorithmsSection: React.FC = () => {
  return (
    <div className="section_sniper_spotlight py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="maladroit-font text-4xl md:text-5xl text-[var(--color-text-primary)] mb-4">
            AI TRENDING ALGORITHMS
          </h2>
          <p className="winky-sans-font text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            A digital robot that uses AI trending algorithms to scrape on chain
            data and find top performing tokens across multiple networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[20px] p-6 text-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-[var(--color-glass)] border border-[var(--color-glass-border)] overflow-hidden flex items-center justify-center">
                <img
                  src={c.img}
                  alt="alg"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="maladroit-font text-xl text-[var(--color-text-primary)] mb-2">
                {c.title}
              </h3>
              <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmsSection;
