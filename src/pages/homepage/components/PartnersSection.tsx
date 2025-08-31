import React, { useRef } from "react";

interface Partner {
  name: string;
  logo: string;
  description: string;
  website: string;
}

const PartnersSection: React.FC = () => {
  const partnersContainerRef = useRef<HTMLDivElement>(null);
  const partnersTitleRef = useRef<HTMLHeadingElement>(null);

  // Partner data
  const partners: Partner[] = [
    {
      name: "PancakeSwap",
      logo: "https://storage.cherrybot.ai/pancakeSwapLogo.png",
      description:
        "PancakeSwap is a leading DEX on BNB Chain. Cherry has integrated PancakeSwap into our tech stack—powering on-chain tracking, liquidity insights, and seamless campaign activations across our products.",
      website: "https://pancakeswap.finance/",
    },
    {
      name: "Binance Wallet",
      logo: "https://storage.cherrybot.ai/binanceLogo1.png",
      description:
        "Binance Wallet has supported Cherry with fundraising initiatives and is integrated into our tech stack, enabling smoother user onboarding and wallet connectivity across our products.",
      website: "https://www.binance.com/en/web3wallet",
    },
    {
      name: "Meteora",
      logo: "https://storage.cherrybot.ai/meteoraLogo.png",
      description:
        "Meteora is integrated into Cherry's tech stack, enhancing liquidity, automation, and on-chain data capabilities across our suite.",
      website: "https://www.meteora.ag/",
    },
    {
      name: "NOTCOIN",
      logo: "https://storage.cherrybot.ai/notcoin.png",
      description:
        "Cherry AI and Notcoin have formed a strategic partnership to mutually introduce and promote each other within our respective communities. Notcoin has brought significant traffic and community engagement to Cherry AI through multiple tasks, helping to expand our reach. In return, Cherry AI will be introducing Notcoin to our community.",
      website: "https://notco.in/",
    },
    {
      name: "COIN TERMINAL",
      logo: "https://storage.cherrybot.ai/coinTerminal.webp",
      description:
        "Cherry AI has partnered with Coin Terminal, a leading launchpad, to enhance our mutual exposure and service offerings. Coin Terminal will help Cherry AI gain greater visibility through their extensive network. Additionally, Cherry AI is working on integrating Coin Terminal into our features, enabling us to track their project and include them in our trending lists.",
      website: "https://www.cointerminal.com/",
    },
    {
      name: "Fjord Foundry",
      logo: "https://storage.cherrybot.ai/FjordFoundryLogo.png",
      description:
        "Fjord Foundry provides decentralized and automated liquidity provision strategies, aiding projects in efficiently managing their liquidity needs. Similar to the partnership with PinkSale, Cherry Bot integrates with Fjord Foundry to offer users tools to track liquidity and on-chain data, helping projects gain visibility in the rapidly evolving web3 space.",
      website: "https://www.fjordfoundry.com/",
    },
    {
      name: "AWS",
      logo: "https://storage.cherrybot.ai/aws.png",
      description:
        "AWS is known for its security, high performance, and accessibility. It currently hosts some of the largest firms in the world including Netflix, Airbnb, NASA, and General Electric. Through an AWS Grant, Cherry AI gains exclusive access to AWS backend services, APIs, and data center features. These resources have helped the protocol become a pioneering force in the AI web3 market.",
      website: "https://aws.amazon.com/",
    },
    {
      name: "BITCOINOS",
      logo: "https://storage.cherrybot.ai/Bos.webp",
      description:
        "BitcoinOS is a modular Bitcoin Layer 2 that brings smart contract capability and scalability to the Bitcoin network. By partnering with Cherry, BitcoinOS benefits from our AI tracking tools and Telegram bot integrations to monitor on-chain activity and drive community engagement for ecosystem projects. This collaboration enables builders on BitcoinOS to gain early visibility and market traction directly within the Cherry network.",
      website: "https://bitcoinos.build/",
    },
    {
      name: "PinkSale",
      logo: "https://storage.cherrybot.ai/PinkSaleLogo.png",
      description:
        "PinkSale is a decentralized launchpad that empowers projects to raise funds through token sales across multiple blockchain networks. Cherry Bot integrates seamlessly with PinkSale, offering users a faster and more efficient way to track buys and check on-chain data. This partnership helps PinkSale users find the best-performing projects while providing project owners with exposure to Cherry AI's extensive user base.",
      website: "https://www.pinksale.finance/",
    },
    {
      name: "DexView",
      logo: "https://storage.cherrybot.ai/dexviewlogo.png",
      description:
        "DexView is a real-time analytics platform for decentralized exchanges (DEXs), providing users with deep insights into token movements, liquidity pools, and trading volumes. DexView recommends Cherry Bot to its audience due to the valuable features it offers, enhancing the trading experience for users on DEX platforms.",
      website: "https://www.dexview.com/",
    },
  ];

  return (
    <div className="">
      <div
        ref={partnersContainerRef}
        id="partners"
        className="h-full relative w-full py-12 md:px-0 px-4 overflow-hidden"
      >
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          {/* Multi-layered Radial Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(67,103,201,0.12)_0%,transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(67,103,201,0.08)_0%,transparent_60%)]"></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-15">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(67,103,201,0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(67,103,201,0.08) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>
        </div>

        {/* Floating Elements Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Orbital Rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-80 h-80 border border-[#4367c9]/15 rounded-full animate-spin-slow"
              style={{ animationDuration: "40s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#4367c9]/10 rounded-full animate-spin-slow"
              style={{
                animationDirection: "reverse",
                animationDuration: "35s",
              }}
            ></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-1/3 w-3 h-3 bg-[var(--color-accent)]/40 rounded-full animate-float-slow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-[var(--color-accent)]/35 rounded-full animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/25 rounded-full animate-float-slow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
          <h2
            ref={partnersTitleRef}
            className="maladroit-font text-3xl md:text-5xl text-[var(--color-text-primary)] mb-6 relative inline-block"
          >
            Partners & Integrations
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row z-30 gap-8">
          {/* Partners Tabs - Left Side */}
          <div className="lg:w-full grid lg:grid-cols-5 grid-cols-2 place-items-center gap-3">
            {partners.map((partner) => (
              <button
                key={partner.name}
                className="partner-tab flex items-center w-full gap-3 px-6 py-4 text-white justify-center rounded-full border transition-all duration-300 bg-[var(--color-accent)] hover:transform hover:-translate-y-1 "
              >
                <span className="winky-sans-font text-sm md:text-lg font-medium">
                  {partner.name}
                </span>
                <img
                  src={partner.logo}
                  className="w-10 md:ml-2 object-contain"
                  alt={`${partner.name} Logo`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
