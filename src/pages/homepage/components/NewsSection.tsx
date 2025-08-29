import React from "react";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const NewsSection: React.FC = () => {
  // Embla carousel setup
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const newsItems = [
    {
      name: "AP News",
      logo: "https://storage.cherrybot.ai/aplogo.svg",
      link: "https://apnews.com/press-release/globenewswire-mobile/telegram-cherry-ai-cherry-trading-bot-9e438e6311a24fbd00c74e6c15e88538",
      bgColor: "bg-white",
    },
    {
      name: "Business Insider",
      logo: "https://storage.cherrybot.ai/bInsider.svg",
      link: "https://markets.businessinsider.com/news/stocks/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido-1034590807",
      bgColor: "bg-white",
    },
    {
      name: "Morningstar",
      logo: "https://storage.cherrybot.ai/morningstar.svg",
      link: "https://www.morningstar.com/news/globe-newswire/9423501/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido",
      bgColor: "bg-white",
    },
    {
      name: "Benzinga",
      logo: "https://storage.cherrybot.ai/benzinga.png",
      link: "https://www.benzinga.com/pressreleases/25/04/g44844966/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido",
      bgColor: "bg-[#0b2242]",
    },
    {
      name: "Coin Telegraph",
      logo: "https://storage.cherrybot.ai/coinTelegraph.jpg",
      link: "https://cointelegraph.com/press-releases/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido",
      bgColor: "bg-[#1f2a2e]",
    },
    {
      name: "CoinCu",
      logo: "https://storage.cherrybot.ai/coincu.png",
      link: "https://coincu.com/332913-cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/",
      bgColor: "bg-[#222222]",
    },
    {
      name: "NewsBTC",
      logo: "https://storage.cherrybot.ai/newsbtc.png",
      link: "https://www.newsbtc.com/press-releases/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/",
      bgColor: "bg-white",
    },
    {
      name: "TechBullion",
      logo: "https://storage.cherrybot.ai/techB.png",
      link: "https://techbullion.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/",
      bgColor: "bg-[#1f2a2e]",
    },
    {
      name: "Blockopedia",
      logo: "https://storage.cherrybot.ai/block.png",
      link: "https://blockopedia.org/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/",
      bgColor: "bg-[#1f2a2e]",
    },
    {
      name: "Stelareum",
      logo: "https://storage.cherrybot.ai/stelareum.svg",
      link: "https://www.stelareum.io/en/wallet/blog/cherry-ai-a-revenue-backed-infrastructure-layer.html",
      bgColor: "bg-white",
    },
    {
      name: "The Bittimes",
      logo: "https://storage.cherrybot.ai/thebittimes.webp",
      link: "https://thebittimes.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido-tbt114039.html",
      bgColor: "bg-[#1f2a2e]",
    },
    {
      name: "CoinGabbar",
      logo: "https://storage.cherrybot.ai/coingabbar.png",
      link: "https://www.coingabbar.com/en/crypto-sponsored/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido",
      bgColor: "bg-gray-100",
    },
    {
      name: "Captain Altcoin",
      logo: "https://storage.cherrybot.ai/captain.png",
      link: "https://captainaltcoin.com/cherry-ai-a-revenue-backed-infrastructure-layer-positioned-for-a-breakout-ido/",
      bgColor: "bg-gray-100",
    },
    {
      name: "CoinMarketCap",
      logo: "https://storage.cherrybot.ai/coinmarketcap.svg",
      link: "https://coinmarketcap.com/community/articles/680252991235d9597fd7d36f/",
      bgColor: "bg-white",
    },
    {
      name: "Binance",
      logo: "https://storage.cherrybot.ai/binance.svg",
      link: "https://app.binance.com/uni-qr/cart/23086862847145?r=22537208&l=en&uco=cZfRmUfvvPMs9bE0-EKROQ&uc=app_square_share_link&us=copylink/",
      bgColor: "bg-[#1f2a2e]",
    },
  ];

  return (
    <div className="news-section relative w-full py-20 mt-16 md:mt-8 bg-opacity-80 overflow-hidden">
      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-88 h-88 border border-[#4367c9]/22 rounded-full animate-spin-slow"
            style={{ animationDuration: "35s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#4367c9]/17 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "30s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-accent)]/20 rounded-full animate-float pointer-events-none"></div>
        <div
          className="absolute bottom-24 left-10 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full animate-float pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full rotate-45 animate-float pointer-events-none"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Connection Lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="newsConnectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--color-accent)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--color-accent)"
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>
          <path
            d="M50 50 Q 150 30 250 50 T 450 50"
            stroke="url(#newsConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#newsConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.7s" }}
          />
        </svg>
      </div>

      {/* Section Title */}
      <div className="relative z-20 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
        <h2 className="maladroit-font text-xl md:text-6xl text-[var(--color-text-primary)] mb-6 relative inline-block">
          Cherry AI in the News
        </h2>
      </div>

      {/* News Carousel */}
      <div className="max-w-7xl z-20 xl:max-w-[90rem] w-full mx-auto px-4">
        <style>{`
          .embla {
            overflow: hidden;
            padding: 0.75rem;
          }
          .embla__container {
            display: flex;
            align-items: stretch;
            gap: 1rem;
          }
          .embla__slide {
            min-width: 0;
            display: flex;
            align-items: stretch;
            flex: 0 0 320px;
            max-width: 320px;
          }
          
          @media (min-width: 768px) {
            .embla__container { gap: 1.25rem; }
            .embla__slide { flex: 0 0 calc(100% - 2rem); max-width: 400px; }
          }
          
          @media (min-width: 1024px) {
            .embla__container { gap: 1.5rem; justify-content: flex-start; }
            .embla__slide { flex: 0 0 320px; max-width: 320px; }
          }
          
          @media (min-width: 1280px) {
            .embla__container { gap: 1.875rem; }
          }
          
          @media (min-width: 1536px) {
            .embla__container { gap: 2rem; }
          }
        `}</style>

        <div className="embla w-full" ref={emblaRef}>
          <div className="embla__container">
            {newsItems.map((item, index) => (
              <div key={index} className="embla__slide">
                <div className="h-[29rem] w-[320px] flex flex-col items-center justify-around p-3 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] shadow-[0_20px_40px_rgba(67,103,201,0.2)] hover:shadow-[0_25px_50px_rgba(67,103,201,0.3)] transition-all duration-300 transform hover:-translate-y-2 relative">
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

                  <div
                    className={`w-full p-10 overflow-hidden ${item.bgColor} h-1/2 flex items-center justify-center rounded-[20px] border-2 border-[var(--color-accent)]/30`}
                  >
                    <img
                      src={item.logo}
                      className="w-full object-cover"
                      alt={`${item.name} Logo`}
                    />
                  </div>

                  <div className="w-full h-1/2 text-center flex flex-col items-center justify-around">
                    <h3 className="maladroit-font text-xl xl:text-2xl text-[var(--color-text-primary)] uppercase">
                      {item.name}
                    </h3>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[16px] border-2 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/90 hover:scale-105 transition-all duration-300 flex items-center space-x-2 winky-sans-font font-bold shadow-[0_8px_24px_rgba(67,103,201,0.3)]"
                    >
                      <span>Read Article</span>
                      <Icon
                        icon="tabler:external-link"
                        width={16}
                        height={16}
                      />
                    </a>
                  </div>

                  {/* Bottom Decorative Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
