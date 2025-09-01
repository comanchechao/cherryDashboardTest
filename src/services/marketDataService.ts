export interface MarketPair {
  rank: number;
  exchangeId: number;
  exchangeName: string;
  exchangeSlug: string;
  exchangeNotice: string;
  platformId: number;
  platformName: string;
  pairContractAddress: string;
  tokenAddress: string;
  outlierDetected: number;
  priceExcluded: number;
  volumeExcluded: number;
  outlierDisp: number;
  priceExDisp: number;
  volExDisp: number;
  marketId: number;
  marketPair: string;
  category: string;
  marketUrl: string;
  marketScore: string;
  marketReputation: number;
  baseSymbol: string;
  baseCurrencyId: number;
  quoteSymbol: string;
  quoteCurrencyId: number;
  price: number;
  volumeUsd: number;
  effectiveLiquidity: number;
  liquidity: number;
  lastUpdated: string;
  quote: number;
  volumeBase: number;
  volumeQuote: number;
  dexerUrl: string;
  feeType: string;
  depthUsdNegativeTwo: number;
  depthUsdPositiveTwo: number;
  reservesAvailable: number;
  porAuditStatus: number;
  volumePercent: number;
  indexPrice: number;
  isVerified: number;
  quotes: Array<{
    id: string;
    price: number;
    volume24h: number;
    depthPositiveTwo: number;
    depthNegativeTwo: number;
    indexPrice: number;
  }>;
  type: string;
  centerType: string;
  hideStarsMarket: number;
}

export interface MarketDataResponse {
  data: {
    id: number;
    name: string;
    symbol: string;
    numMarketPairs: number;
    marketPairs: MarketPair[];
    sort: string;
    direction: string;
    sponsoredExchange: any[];
  };
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
  };
}

class MarketDataService {
  private readonly API_URL =
    "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest";
  private readonly PARAMS = {
    slug: "cherry-ai",
    start: 1,
    limit: 10,
    category: "spot",
    centerType: "all",
    sort: "cmc_rank_advanced",
    direction: "desc",
    spotUntracked: true,
  };

  async fetchMarketData(): Promise<MarketDataResponse> {
    try {
      const queryString = new URLSearchParams(this.PARAMS as any).toString();

      // Try multiple approaches to handle CORS issues
      let response: Response;

      // First try: Direct API call
      try {
        response = await fetch(`${this.API_URL}?${queryString}`);
        console.log("Direct API call successful!");
      } catch (directError) {
        console.log("Direct API call failed, trying CORS proxy...");

        // Second try: CORS proxy
        try {
          const corsProxyUrl = `https://cors-anywhere.herokuapp.com/${this.API_URL}?${queryString}`;
          response = await fetch(corsProxyUrl, {
            headers: {
              Origin: window.location.origin,
              "X-Requested-With": "XMLHttpRequest",
            },
          });
          console.log("CORS proxy successful!");
        } catch (proxyError) {
          console.log("CORS proxy failed, trying alternative proxy...");

          // Third try: Alternative CORS proxy
          try {
            const altProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
              `${this.API_URL}?${queryString}`
            )}`;
            response = await fetch(altProxyUrl);
            console.log("Alternative proxy successful!");
          } catch (altProxyError) {
            console.log("All proxy attempts failed, using fallback data");
            throw new Error("All API attempts failed");
          }
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MarketDataResponse = await response.json();

      if (data.status.error_code !== "0") {
        throw new Error(`API error: ${data.status.error_message}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching market data:", error);

      // Return mock data as fallback when API fails
      return this.getMockData();
    }
  }

  // Fallback mock data when API is unavailable
  private getMockData(): MarketDataResponse {
    return {
      data: {
        id: 37694,
        name: "Cherry AI",
        symbol: "AIBOT",
        numMarketPairs: 8,
        marketPairs: [
          {
            rank: 1,
            exchangeId: 6706,
            exchangeName: "PancakeSwap v3 (BSC)",
            exchangeSlug: "pancakeswap-v3",
            exchangeNotice: "",
            platformId: 14,
            platformName: "BSC",
            pairContractAddress: "0xd3774ab0fd42708095a72e865b2e282e20b0d255",
            tokenAddress: "0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
            outlierDetected: 0,
            priceExcluded: 0,
            volumeExcluded: 0,
            outlierDisp: 0,
            priceExDisp: 0,
            volExDisp: 0,
            marketId: 1440195,
            marketPair: "AIBOT/WBNB",
            category: "spot",
            marketUrl: "https://pancakeswap.finance",
            marketScore: "0",
            marketReputation: 1,
            baseSymbol: "AIBOT",
            baseCurrencyId: 37694,
            quoteSymbol: "WBNB",
            quoteCurrencyId: 7192,
            price: 0.00853465,
            volumeUsd: 4009455.9,
            effectiveLiquidity: 343.62,
            liquidity: 346336.63,
            lastUpdated: new Date().toISOString(),
            quote: 0.00000969,
            volumeBase: 519384718.09,
            volumeQuote: 4615.42,
            dexerUrl:
              "https://dex.coinmarketcap.com/token/bsc/0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
            feeType: "percentage",
            depthUsdNegativeTwo: 0,
            depthUsdPositiveTwo: 0,
            reservesAvailable: 0,
            porAuditStatus: 0,
            volumePercent: 33.96,
            indexPrice: 0,
            isVerified: 1,
            quotes: [
              {
                id: "2781",
                price: 0.00853465,
                volume24h: 4009455.9,
                depthPositiveTwo: 0,
                depthNegativeTwo: 0,
                indexPrice: 0,
              },
            ],
            type: "dex",
            centerType: "dex",
            hideStarsMarket: 0,
          },
          {
            rank: 2,
            exchangeId: 12524,
            exchangeName: "Binance Alpha",
            exchangeSlug: "binance-alpha",
            exchangeNotice: "",
            platformId: 14,
            platformName: "BSC",
            pairContractAddress: "",
            tokenAddress: "0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
            outlierDetected: 0,
            priceExcluded: 0,
            volumeExcluded: 0,
            outlierDisp: 0,
            priceExDisp: 0,
            volExDisp: 0,
            marketId: 1438427,
            marketPair: "AIBOT/USDT",
            category: "spot",
            marketUrl:
              "https://www.binance.com/en/alpha/bsc/0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
            marketScore: "0",
            marketReputation: 0,
            baseSymbol: "AIBOT",
            baseCurrencyId: 37694,
            quoteSymbol: "USDT",
            quoteCurrencyId: 825,
            price: 0.00871435,
            volumeUsd: 786007.89,
            effectiveLiquidity: 0,
            liquidity: 0,
            lastUpdated: new Date().toISOString(),
            quote: 0.00871798,
            volumeBase: 90015732.63,
            volumeQuote: 784755.36,
            dexerUrl: "",
            feeType: "percentage",
            depthUsdNegativeTwo: 0,
            depthUsdPositiveTwo: 0,
            reservesAvailable: 0,
            porAuditStatus: 0,
            volumePercent: 6.66,
            indexPrice: 0,
            isVerified: 1,
            quotes: [
              {
                id: "2781",
                price: 0.00871435,
                volume24h: 786007.89,
                depthPositiveTwo: 0,
                depthNegativeTwo: 0,
                indexPrice: 0,
              },
            ],
            type: "cex",
            centerType: "cex",
            hideStarsMarket: 0,
          },
          {
            rank: 3,
            exchangeId: 544,
            exchangeName: "MEXC",
            exchangeSlug: "mexc",
            exchangeNotice: "",
            platformId: 0,
            platformName: "",
            pairContractAddress: "",
            tokenAddress: "0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
            outlierDetected: 0,
            priceExcluded: 0,
            volumeExcluded: 0,
            outlierDisp: 0,
            priceExDisp: 0,
            volExDisp: 0,
            marketId: 1439229,
            marketPair: "AIBOT/USDT",
            category: "spot",
            marketUrl: "https://www.mexc.com/exchange/AIBOT_USDT",
            marketScore: "0",
            marketReputation: 1,
            baseSymbol: "AIBOT",
            baseCurrencyId: 37694,
            quoteSymbol: "USDT",
            quoteCurrencyId: 825,
            price: 0.00862577,
            volumeUsd: 1488106.24,
            effectiveLiquidity: 214.0,
            liquidity: 0,
            lastUpdated: new Date().toISOString(),
            quote: 0.008629,
            volumeBase: 172518562.72,
            volumeQuote: 1488662.68,
            dexerUrl: "",
            feeType: "percentage",
            depthUsdNegativeTwo: 1720.11,
            depthUsdPositiveTwo: 559.64,
            reservesAvailable: 1,
            porAuditStatus: 0,
            volumePercent: 12.61,
            indexPrice: 0,
            isVerified: 1,
            quotes: [
              {
                id: "2781",
                price: 0.00862577,
                volume24h: 1488106.24,
                depthPositiveTwo: 559.64,
                depthNegativeTwo: 1720.11,
                indexPrice: 0,
              },
            ],
            type: "cex",
            centerType: "cex",
            hideStarsMarket: 0,
          },
          {
            rank: 4,
            exchangeId: 302,
            exchangeName: "Gate",
            exchangeSlug: "gate",
            exchangeNotice: "",
            platformId: 0,
            platformName: "",
            pairContractAddress: "",
            tokenAddress: "0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
            outlierDetected: 0,
            priceExcluded: 0,
            volumeExcluded: 0,
            outlierDisp: 0,
            priceExDisp: 0,
            volExDisp: 0,
            marketId: 1439214,
            marketPair: "AIBOT/USDT",
            category: "spot",
            marketUrl: "https://www.gate.com/trade/AIBOT_USDT",
            marketScore: "0",
            marketReputation: 0.9745,
            baseSymbol: "AIBOT",
            baseCurrencyId: 37694,
            quoteSymbol: "USDT",
            quoteCurrencyId: 825,
            price: 0.00880757,
            volumeUsd: 1823263.55,
            effectiveLiquidity: 220.0,
            liquidity: 0,
            lastUpdated: new Date().toISOString(),
            quote: 0.008811,
            volumeBase: 207011045.96,
            volumeQuote: 1823974.33,
            dexerUrl: "",
            feeType: "percentage",
            depthUsdNegativeTwo: 1879.28,
            depthUsdPositiveTwo: 979.49,
            reservesAvailable: 1,
            porAuditStatus: 0,
            volumePercent: 15.45,
            indexPrice: 0,
            isVerified: 1,
            quotes: [
              {
                id: "2781",
                price: 0.00880757,
                volume24h: 1823263.55,
                depthPositiveTwo: 979.49,
                depthNegativeTwo: 1879.28,
                indexPrice: 0,
              },
            ],
            type: "cex",
            centerType: "cex",
            hideStarsMarket: 0,
          },
        ],
        sort: "cmc_rank_advanced",
        direction: "desc",
        sponsoredExchange: [],
      },
      status: {
        timestamp: new Date().toISOString(),
        error_code: "0",
        error_message: "SUCCESS",
        elapsed: "0",
        credit_count: 0,
      },
    };
  }

  // Helper method to get exchange logo based on exchange name
  getExchangeLogo(exchangeName: string): string {
    const exchangeLogos: { [key: string]: string } = {
      "Binance Alpha": "https://storage.cherrybot.ai/binanceAlpha.png",
      MEXC: "https://storage.cherrybot.ai/mexc.png",
      Gate: "https://storage.cherrybot.ai/gate.png",
      "PancakeSwap v3 (BSC)":
        "https://storage.cherrybot.ai/pancakeSwapLogo.png",
      "Uniswap v3 (BSC)": "https://storage.cherrybot.ai/pancakeSwapLogo.png", // Using PancakeSwap logo as fallback
      BitMart: "https://storage.cherrybot.ai/mexc.png", // Using MEXC logo as fallback
      "XT.COM": "https://storage.cherrybot.ai/mexc.png", // Using MEXC logo as fallback
      Toobit: "https://storage.cherrybot.ai/mexc.png", // Using MEXC logo as fallback
      Ourbit: "https://storage.cherrybot.ai/mexc.png", // Using MEXC logo as fallback
      PancakeSwap: "https://storage.cherrybot.ai/pancakeSwapLogo.png",
      Uniswap: "https://storage.cherrybot.ai/pancakeSwapLogo.png",
    };

    return (
      exchangeLogos[exchangeName] || "https://storage.cherrybot.ai/mexc.png"
    );
  }

  // Helper method to format volume
  formatVolume(volume: number): string {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    } else {
      return `$${volume.toFixed(0)}`;
    }
  }

  // Helper method to format price
  formatPrice(price: number): string {
    return `$${price.toFixed(6)}`;
  }

  // Helper method to get exchange URL
  getExchangeUrl(marketPair: MarketPair): string {
    if (marketPair.marketUrl) {
      return marketPair.marketUrl;
    }

    // Fallback URLs for common exchanges
    const fallbackUrls: { [key: string]: string } = {
      "Binance Alpha":
        "https://www.binance.com/en/alpha/bsc/0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
      MEXC: "https://www.mexc.com/exchange/AIBOT_USDT",
      Gate: "https://www.gate.com/trade/AIBOT_USDT",
      "PancakeSwap v3 (BSC)":
        "https://pancakeswap.finance/swap?outputCurrency=0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
      "Uniswap v3 (BSC)": "https://app.uniswap.org/#/swap",
      PancakeSwap:
        "https://pancakeswap.finance/swap?outputCurrency=0x96adaa33e175f4a7f20c099730bc78dd0b45745b",
      Uniswap: "https://app.uniswap.org/#/swap",
      BitMart: "https://www.bitmart.com/trade/en?symbol=AIBOT_USDT",
      "XT.COM": "https://www.xt.com/en/trade/aibot_usdt",
      Toobit: "https://www.toobit.com/en-US/spot/AIBOT_USDT",
      Ourbit: "https://www.ourbit.com/exchange/AIBOT_USDT",
    };

    return fallbackUrls[marketPair.exchangeName] || "#";
  }
}

export default new MarketDataService();
