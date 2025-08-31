import React from "react";

const Dexes: React.FC = () => {
  return (
    <div className="max-w-4xl w-fit     z-30    ">
      <div className="flex justify-end">
        <div className="max-w-6xl w-full">
          <div className="   relative overflow-hidden     transition-all duration-300">
            <div className="flex gap-4">
              {/* Module 1 - Binance AlphaQ */}
              <div className="flex flex-col gap-4 items-center justify-center h-fit">
                <div className="flex-1 flex flex-col  bg-[var(--color-fill)]   rounded-[4px] p-4 text-center hover:transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(67,103,201,0.15)] transition-all duration-300">
                  <div className="flex flex-col items-center h-auto">
                    {/* Logo */}
                    <div className="h-6 flex items-center justify-center">
                      <img
                        src="https://storage.cherrybot.ai/binanceAlpha.png"
                        alt="Binance AlphaQ"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  {/* Button */}
                </div>
                <a
                  href="https://www.binance.com/en/alpha/bsc/0x96adaa33e175f4a7f20c099730bc78dd0b45745b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-yellow-400 text-black px-4 py-1 rounded-full border border-black text-sm font-medium hover:bg-yellow-300   transition-all duration-300 shadow-[0_4px_12px_rgba(251,191,36,0.3)]"
                >
                  Trade Now
                </a>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center h-fit">
                <div className="flex-1  bg-[var(--color-fill)]   rounded-[4px] p-4 text-center hover:transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(67,103,201,0.15)] transition-all duration-300">
                  <div className="flex flex-col items-center h-full">
                    {/* Logo */}
                    <div className="h-6  flex items-center justify-center">
                      <img
                        src="https://storage.cherrybot.ai/mexc.png"
                        alt="MEXC"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Button */}
                  </div>
                </div>
                <a
                  href="https://www.mexc.com/exchange/AIBOT_USDT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-[var(--color-fill)] text-white px-4 py-1 rounded-full   text-sm font-medium hover:bg-blue-400   transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                >
                  Trade Now
                </a>
              </div>
              {/* Module 2 - MEXC */}

              <div className="flex flex-col gap-4 items-center justify-center h-fit">
                {" "}
                <div className="flex-1  bg-[var(--color-fill)]   rounded-[4px] p-4 text-center hover:transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(67,103,201,0.15)] transition-all duration-300">
                  <div className="flex flex-col items-center h-full">
                    {/* Logo */}
                    <div className="h-6   flex items-center justify-center">
                      <img
                        src="https://storage.cherrybot.ai/gate.png"
                        alt="Gate.io"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Button */}
                  </div>
                </div>
                <a
                  href="https://www.gate.com/trade/AIBOT_USDT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-[var(--color-fill)] text-white px-4 py-1 rounded-full   text-sm font-medium hover:bg-blue-400   transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                >
                  Trade Now
                </a>
              </div>
              {/* Module 3 - Gate.io */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dexes;
