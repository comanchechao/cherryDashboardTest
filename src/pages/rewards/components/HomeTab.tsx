import React, { useState, useEffect } from "react";

const HomeTab: React.FC = () => {
  const [cherryStats, setCherryStats] = useState<any>(null);
  const [cherryStatsLoading, setCherryStatsLoading] = useState(false);

  const getExchangeLogo = (exchangeName: string) => {
    if (exchangeName.includes("Pancake")) {
      return "https://storage.cherrybot.ai/pancakeSwapLogo.png";
    } else if (exchangeName.includes("Binance")) {
      return "https://storage.cherrybot.ai/binanceLogo1.png";
    } else if (exchangeName.includes("MEXC")) {
      return "https://storage.cherrybot.ai/mexc.png";
    } else if (exchangeName.includes("Gate")) {
      return "https://storage.cherrybot.ai/gate.png";
    }
    return "";
  };

  const fetchCherryStats = async () => {
    try {
      setCherryStatsLoading(true);

      const response = await fetch(
        "https://sniper.cherrybot.ai/api/v1/stats/cherry",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCherryStats(data);
    } catch (error) {
      console.error("Failed to fetch cherry stats:", error);
    } finally {
      setCherryStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchCherryStats(); // Fetch cherry stats on startup

    const statsInterval = setInterval(fetchCherryStats, 300000); // Update every 5 minutes

    return () => {
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="winky-sans-font text-black text-xs lg:text-sm">
              Total $AIBOT Holders
            </div>
          </div>
          <div className="maladroit-font text-2xl lg:text-3xl text-black">
            {cherryStatsLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400"></div>
                <span className="text-xl lg:text-2xl">...</span>
              </div>
            ) : cherryStats?.result?.holders ? (
              <div>{cherryStats.result.holders.toLocaleString()}</div>
            ) : (
              <div>2,261</div>
            )}
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4">
          <div className="winky-sans-font text-black text-xs lg:text-sm mb-2">
            Total $AIBOT Stakers
          </div>
          <div className="maladroit-font text-2xl lg:text-3xl text-black">
            -
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4">
          <div className="winky-sans-font text-black text-xs lg:text-sm mb-2">
            Total $AIBOT Staked
          </div>
          <div className="maladroit-font text-2xl lg:text-3xl text-black">
            -
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4">
          <div className="winky-sans-font text-black text-xs lg:text-sm mb-2">
            APY
          </div>
          <div className="maladroit-font text-2xl lg:text-3xl text-black">
            5%
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4">
          <div className="winky-sans-font text-black text-xs lg:text-sm mb-2">
            $AIBOT BuyBacks
          </div>
          <div className="maladroit-font text-2xl lg:text-3xl text-black">
            -
          </div>
        </div>
        <div className="bg-white/5 border border-black/20 rounded-sm p-3 lg:p-4">
          <div className="winky-sans-font text-black text-xs lg:text-sm mb-2">
            $AIBOT Burns
          </div>
          <div className="maladroit-font text-2xl lg:text-3xl text-black">
            -
          </div>
        </div>
      </div>

      {/* Buy Section */}
      <div className="bg-white/5 border border-black/20 rounded-sm">
        <div className="border-b border-black/20 px-3 lg:px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="maladroit-font text-xl lg:text-2xl text-black">
              Buy $AIBOT
            </h3>
          </div>
        </div>
        <div className="p-3 lg:p-4">
          {cherryStatsLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
            </div>
          ) : cherryStats?.result?.markets &&
            cherryStats.result.markets.length > 0 ? (
            <>
              {/* Desktop Table - Hidden on mobile */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-black/60 winky-sans-font text-sm">
                      <th className="py-2 pr-4">Exchange</th>
                      <th className="py-2 pr-4">24h Volume</th>
                      <th className="py-2 pr-4">Price</th>
                      <th className="py-2 pr-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-black winky-sans-font">
                    {(() => {
                      const filteredMarkets = [];

                      const binanceAlpha = cherryStats.result.markets.find(
                        (m: any) => m.exchangeName.includes("Binance")
                      );
                      if (binanceAlpha) filteredMarkets.push(binanceAlpha);

                      const mexc = cherryStats.result.markets.find((m: any) =>
                        m.exchangeName.includes("MEXC")
                      );
                      if (mexc) filteredMarkets.push(mexc);

                      const gate = cherryStats.result.markets.find((m: any) =>
                        m.exchangeName.includes("Gate")
                      );
                      if (gate) filteredMarkets.push(gate);

                      const pancakeSwap = cherryStats.result.markets.find(
                        (m: any) =>
                          m.exchangeName.includes("Pancake") && m.rank === 1
                      );
                      if (pancakeSwap) filteredMarkets.push(pancakeSwap);

                      return filteredMarkets.map(
                        (market: any, index: number) => (
                          <tr
                            key={market.marketId}
                            className="hover:bg-white/5 transition-colors duration-200"
                          >
                            <td className="py-3 pr-4 flex items-center gap-3">
                              <a
                                href={market.marketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity flex items-center gap-2"
                              >
                                <img
                                  src={getExchangeLogo(market.exchangeName)}
                                  className="h-6 object-contain rounded"
                                  alt={`${market.exchangeName} Logo`}
                                />
                                <span className="text-sm">
                                  {market.exchangeName}
                                </span>
                              </a>
                            </td>
                            <td className="py-3 pr-4 text-black/80">
                              ${market.volumeUsd.toLocaleString()}
                            </td>
                            <td className="py-3 pr-4 text-black/80">
                              ${market.price.toFixed(6)}
                            </td>
                            <td className="py-3 pr-4 text-right">
                              <button
                                onClick={() => {
                                  window.open(market.marketUrl, "_blank");
                                }}
                                className={`px-3 py-2 rounded-sm text-sm border transition-colors duration-200 ${
                                  market.exchangeName.includes("Binance")
                                    ? "bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-300"
                                    : index === 0
                                    ? "bg-white/10 text-black border-black/20 hover:bg-white/20"
                                    : "bg-white/10 text-black border-black/20 hover:bg-white/20"
                                }`}
                              >
                                Buy $AIBOT
                              </button>
                            </td>
                          </tr>
                        )
                      );
                    })()}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards - Hidden on desktop */}
              <div className="lg:hidden space-y-3">
                {(() => {
                  const filteredMarkets = [];

                  const binanceAlpha = cherryStats.result.markets.find(
                    (m: any) => m.exchangeName.includes("Binance")
                  );
                  if (binanceAlpha) filteredMarkets.push(binanceAlpha);

                  const mexc = cherryStats.result.markets.find((m: any) =>
                    m.exchangeName.includes("MEXC")
                  );
                  if (mexc) filteredMarkets.push(mexc);

                  const gate = cherryStats.result.markets.find((m: any) =>
                    m.exchangeName.includes("Gate")
                  );
                  if (gate) filteredMarkets.push(gate);

                  const pancakeSwap = cherryStats.result.markets.find(
                    (m: any) =>
                      m.exchangeName.includes("Pancake") && m.rank === 1
                  );
                  if (pancakeSwap) filteredMarkets.push(pancakeSwap);

                  return filteredMarkets.map((market: any) => (
                    <div
                      key={market.marketId}
                      className="bg-white/5 border border-black/20 rounded-sm p-3"
                    >
                      {/* Exchange Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={getExchangeLogo(market.exchangeName)}
                            className="h-8 w-8 object-contain rounded"
                            alt={`${market.exchangeName} Logo`}
                          />
                          <span className="winky-sans-font text-black font-medium">
                            {market.exchangeName}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            window.open(market.marketUrl, "_blank");
                          }}
                          className={`px-4 py-2 rounded-sm text-sm border transition-colors duration-200 ${
                            market.exchangeName.includes("Binance")
                              ? "bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-300"
                              : "bg-white/10 text-black border-black/20 hover:bg-white/20"
                          }`}
                        >
                          Buy
                        </button>
                      </div>

                      {/* Market Data */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-black/60 winky-sans-font text-xs mb-1">
                            24h Volume
                          </div>
                          <div className="text-black font-medium">
                            ${market.volumeUsd.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-black/60 winky-sans-font text-xs mb-1">
                            Price
                          </div>
                          <div className="text-black font-medium">
                            ${market.price.toFixed(6)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-black/60">
              <div className="mb-3">No market data available</div>
              <button
                onClick={fetchCherryStats}
                className="px-4 py-2 text-sm border border-white/20 text-black/80 hover:bg-white/10 transition-colors duration-200 rounded"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Placeholder panel to match layout spacing */}
      <div className="bg-white/5 border border-black/20 rounded-sm h-40">
        <div className="flex items-start justify-start p-4 h-full">
          <div className="maladroit-font text-[var(--color-text-primary)] text-xl mb-2">
            $AIBOT Burn TXs
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
