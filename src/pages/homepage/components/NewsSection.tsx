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
    <div className="news-section relative w-full py-20 mt-16 md:mt-8 bg-white overflow-hidden">
      {/* Section Title */}
      <div className="relative z-20 mb-16 text-center max-w-4xl flex flex-col items-center mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-sans text-black mb-6 relative inline-block">
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
                <div className="h-[20rem] w-[320px] flex flex-col bg-white border border-black rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 relative">
                  {/* Logo Area - Top Half */}
                  <div
                    className={`w-full h-1/2 flex items-center justify-center rounded-t-[20px] ${item.bgColor} p-8`}
                  >
                    <img
                      src={item.logo}
                      className="w-full h-full object-contain"
                      alt={`${item.name} Logo`}
                    />
                  </div>

                  {/* Content Area - Bottom Half */}
                  <div className="w-full h-1/2 bg-white p-6 flex flex-col items-center justify-between rounded-b-[20px]">
                    <h3 className="text-lg font-sans text-black text-center">
                      {item.name}
                    </h3>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-black text-white px-6 py-3 rounded-[12px] hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 font-medium"
                    >
                      <span>Read Article</span>
                      <Icon
                        icon="tabler:external-link"
                        width={16}
                        height={16}
                        className="text-white"
                      />
                    </a>
                  </div>
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
