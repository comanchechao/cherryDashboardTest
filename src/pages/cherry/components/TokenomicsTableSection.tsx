import React from "react";

interface TokenomicsTableSectionProps {
  // Add any props if needed
}

const TokenomicsTableSection: React.FC<TokenomicsTableSectionProps> = () => {
  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16" data-spotlight-content>
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-[4px] px-6 py-1 transform hover:rotate-0 transition-all duration-300">
              <span className="text-sm md:text-lg winky-sans-font text-[var(--color-accent)]">
                Tokenomics Overview
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-xl md:text-4xl maladroit-font text-[var(--color-text-primary)] mb-8 leading-tight max-w-4xl mx-auto">
            Tokenomics Overview
          </h2>
        </div>

        {/* Tokenomics Table */}
        <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden transform hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
          {/* Floating Decorative Elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto text-white relative z-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--color-accent)] text-white">
                  <th className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Allocation
                  </th>
                  <th className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    TGE (%)
                  </th>
                  <th className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Amount
                  </th>
                  <th className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Price ($)
                  </th>
                  <th className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Raise ($)
                  </th>
                  <th className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Vesting
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[var(--color-glass)] text-white">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Seed
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    6.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    60,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.0090
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $540,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then linear over 12 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Early Community Round
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    1.50%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    15,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.0200
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $300,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then linear over 6 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Community Rewards
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    15.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    150,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    15% TGE, then linear over 18 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Staking
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    10.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    100,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    15% TGE, then linear over 18 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Marketing & Partnerships
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12.58%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    125,800,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    1 month cliff, then linear over 18 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Reserves
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    15.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    150,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    18 month cliff, then linear over 18 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Liquidity
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    10.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    100,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    100% at TGE then unlocked as needed
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    KOL Round
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    5.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    50,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.050
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $2,500,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then 30%, then linear over 6 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Partners
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    4.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    40,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.012
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $480,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then 40%, then linear over 2 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    VC #1
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    0.75%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    7,500,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.020
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $150,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then 100%
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    VC #2
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    1.67%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    16,670,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.009
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $150,030
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then linear over 12 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    VC #3
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    1.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    10,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $0.009
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    $90,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    12 months cliff, then linear over 12 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Advisory
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    7.50%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    75,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    18 month cliff then linear over 12 months
                  </td>
                </tr>
                <tr className="bg-[var(--color-glass)]">
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    Team
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    10.00%
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    100,000,000
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    -
                  </td>
                  <td className="p-4 border-2 border-[var(--color-accent)]/30 winky-sans-font">
                    18 month cliff then linear over 12 months
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3 px-2 relative z-10">
            {[
              {
                allocation: "Seed",
                tge: "6.00%",
                amount: "60,000,000",
                price: "$0.0090",
                raise: "$540,000",
                vesting: "12 months cliff, then Linear over 12 months",
              },
              {
                allocation: "Early Community Round",
                tge: "1.50%",
                amount: "15,000,000",
                price: "$0.0200",
                raise: "$300,000",
                vesting: "12 months cliff, then Linear over 6 months",
              },
              {
                allocation: "Community Rewards",
                tge: "15.00%",
                amount: "150,000,000",
                price: "-",
                raise: "-",
                vesting: "15% TGE, then linear over 18 months",
              },
              {
                allocation: "Staking",
                tge: "10.00%",
                amount: "100,000,000",
                price: "-",
                raise: "-",
                vesting: "15% TGE, then linear over 18 months",
              },
              {
                allocation: "Marketing & Partnerships",
                tge: "12.58%",
                amount: "125,800,000",
                price: "-",
                raise: "-",
                vesting: "1 month cliff, then linear over 18 months",
              },
              {
                allocation: "Reserves",
                tge: "15.00%",
                amount: "150,000,000",
                price: "-",
                raise: "-",
                vesting: "18 month cliff, then linear over 18 months",
              },
              {
                allocation: "Liquidity",
                tge: "10.00%",
                amount: "100,000,000",
                price: "-",
                raise: "-",
                vesting: "100% at TGE then unlocked as needed",
              },
              {
                allocation: "KOL Round",
                tge: "5.00%",
                amount: "50,000,000",
                price: "$0.050",
                raise: "$2,500,000",
                vesting: "12 months cliff, then 30%, then linear over 6 months",
              },
              {
                allocation: "Partners",
                tge: "4.00%",
                amount: "40,000,000",
                price: "$0.012",
                raise: "$480,000",
                vesting: "12 months cliff, then 40%, then linear over 2 months",
              },
              {
                allocation: "VC #1",
                tge: "0.75%",
                amount: "7,500,000",
                price: "$0.020",
                raise: "$150,000",
                vesting: "12 months cliff, then 100%",
              },
              {
                allocation: "VC #2",
                tge: "1.67%",
                amount: "16,670,000",
                price: "$0.009",
                raise: "$150,030",
                vesting: "12 months cliff, then linear over 12months",
              },
              {
                allocation: "VC #3",
                tge: "1.00%",
                amount: "10,000,000",
                price: "$0.009",
                raise: "$90,000",
                vesting: "12 months cliff, then linear over 12months",
              },
              {
                allocation: "Advisory",
                tge: "7.50%",
                amount: "75,000,000",
                price: "-",
                raise: "-",
                vesting: "18 month cliff then linear over 12 months",
              },
              {
                allocation: "Team",
                tge: "10.00%",
                amount: "100,000,000",
                price: "-",
                raise: "-",
                vesting: "18 month cliff then linear over 12 months",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[var(--color-glass)] border-2 border-[var(--color-accent)]/30 rounded-xl p-3 shadow-[3px_3px_0px_rgba(67,103,201,0.1)] overflow-hidden"
              >
                {/* Header */}
                <div className="bg-[var(--color-accent)] rounded-lg p-2 mb-3 -mx-1">
                  <h4 className="winky-sans-font text-base text-[var(--color-text-primary)] text-center">
                    {item.allocation}
                  </h4>
                </div>

                {/* Content Grid - Optimized for mobile */}
                <div className="space-y-2">
                  {/* Top Row - TGE and Amount */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[var(--color-accent)]/20 rounded-lg p-2">
                      <div className="text-xs text-[var(--color-text-primary)] mb-1">
                        TGE
                      </div>
                      <div className="winky-sans-font text-sm font-semibold text-[var(--color-text-primary)]">
                        {item.tge}
                      </div>
                    </div>
                    <div className="bg-[var(--color-accent)]/20 rounded-lg p-2">
                      <div className="text-xs text-[var(--color-text-primary)] mb-1">
                        Amount
                      </div>
                      <div className="winky-sans-font text-xs font-semibold text-[var(--color-text-primary)] break-all">
                        {item.amount}
                      </div>
                    </div>
                  </div>

                  {/* Middle Row - Price and Raise (only if not "-") */}
                  {(item.price !== "-" || item.raise !== "-") && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[var(--color-accent)]/20 rounded-lg p-2">
                        <div className="text-xs text-[var(--color-text-primary)] mb-1">
                          Price
                        </div>
                        <div className="winky-sans-font text-sm font-semibold text-[var(--color-text-primary)]">
                          {item.price}
                        </div>
                      </div>
                      <div className="bg-[var(--color-accent)]/20 rounded-lg p-2">
                        <div className="text-xs text-[var(--color-text-primary)] mb-1">
                          Raise
                        </div>
                        <div className="winky-sans-font text-sm font-semibold text-[var(--color-text-primary)]">
                          {item.raise}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Row - Vesting (Full Width) */}
                  <div className="bg-[var(--color-accent)]/20 rounded-lg p-2">
                    <div className="text-xs text-[var(--color-text-primary)] mb-1">
                      Vesting
                    </div>
                    <div className="winky-sans-font text-xs leading-relaxed text-[var(--color-text-primary)]">
                      {item.vesting}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Decorative Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[28px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsTableSection;
