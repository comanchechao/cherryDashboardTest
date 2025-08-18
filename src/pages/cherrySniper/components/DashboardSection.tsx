import React, { useState } from "react";
import { Icon } from "@iconify/react";

const DashboardSection: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const mockLeaderboardData = [
    {
      rank: 1,
      wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      points: 250000,
      badge: "Ruby",
    },
    {
      rank: 2,
      wallet: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
      points: 98400,
      badge: "Diamond",
      isUser: true,
    },
    {
      rank: 3,
      wallet: "0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69",
      points: 87500,
      badge: "Platinum",
    },
    {
      rank: 4,
      wallet: "0x1efF47bc3a10a45D4B230B5d10E37751FE6AA718",
      points: 7200,
    },
    {
      rank: 5,
      wallet: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      points: 6500,
    },
    {
      rank: 6,
      wallet: "0x85f8578EaE6f4D931fa80F8F0e2A4Cb3148DB4Cf",
      points: 5800,
    },
    {
      rank: 7,
      wallet: "0x3E3a3D69dc33BAc797814EF91909D40a1356cfB3",
      points: 4950,
    },
    {
      rank: 8,
      wallet: "0x4B5565c1CD1DEFEb31042606B673182F085Efe2D",
      points: 3720,
    },
    {
      rank: 9,
      wallet: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      points: 2450,
    },
    {
      rank: 10,
      wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      points: 1820,
    },
  ];

  const userAchievement = {
    badge: "Diamond",
    level: 5,
    points: 98400,
    volume: "$100,000+",
    nextBadge: "Ruby",
    nextVolume: "$250,000",
    nextPoints: 8000,
    progress: 85,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>

      {/* Custom Toast for Copy */}
      <div
        className={`fixed top-10 right-10 z-50 bg-[var(--color-glass)] border-4 border-[var(--color-accent)] rounded-xl   px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
          toastVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <Icon
          icon="mdi:check-circle"
          className="text-[var(--color-accent)]"
          width={24}
          height={24}
        />
        <span className="winky-sans-font text-[var(--color-text-primary)]">
          Copied to clipboard!
        </span>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Stats Card */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-6 relative overflow-hidden hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 rounded-full flex items-center justify-center">
                    <Icon
                      icon="mdi:diamond-stone"
                      className="text-white text-4xl"
                    />
                  </div>
                  <h3 className="text-2xl font-bold maladroit-font text-[var(--color-text-primary)] mb-2">
                    {userAchievement.badge} Badge
                  </h3>
                  <p className="text-[var(--color-text-secondary)] winky-sans-font mb-4">
                    Level {userAchievement.level}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text-secondary)] winky-sans-font">
                        Points:
                      </span>
                      <span className="font-bold text-[var(--color-text-primary)]">
                        {userAchievement.points.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-text-secondary)] winky-sans-font">
                        Volume:
                      </span>
                      <span className="font-bold text-[var(--color-text-primary)]">
                        {userAchievement.volume}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--color-text-secondary)] winky-sans-font">
                        Next: {userAchievement.nextBadge}
                      </span>
                      <span className="text-[var(--color-text-secondary)] winky-sans-font">
                        {userAchievement.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-glass)] rounded-full h-2">
                      <div
                        className="bg-[var(--color-accent)] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${userAchievement.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-2 winky-sans-font">
                      {userAchievement.nextPoints} more points to{" "}
                      {userAchievement.nextBadge}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <div className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-6 relative overflow-hidden hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--color-accent)]/10 rounded-full animate-ping"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full animate-float"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold maladroit-font text-[var(--color-text-primary)] mb-6 text-center">
                    Leaderboard
                  </h3>

                  <div className="space-y-3">
                    {mockLeaderboardData.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${
                          entry.isUser
                            ? "bg-[var(--color-accent)]/20 border-[var(--color-accent)] shadow-lg"
                            : "bg-[var(--color-glass)] border-[var(--color-glass-border)]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0
                                ? "bg-yellow-500 text-white"
                                : index === 1
                                ? "bg-gray-400 text-white"
                                : index === 2
                                ? "bg-amber-600 text-white"
                                : "bg-[var(--color-accent)]/20 text-[var(--color-text-primary)]"
                            }`}
                          >
                            {entry.rank}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-[var(--color-text-primary)] font-mono text-sm">
                              {entry.wallet.slice(0, 6)}...
                              {entry.wallet.slice(-4)}
                            </div>
                            {entry.badge && (
                              <span className="px-2 py-1 bg-[var(--color-accent)] text-white text-xs rounded-full winky-sans-font">
                                {entry.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-[var(--color-text-primary)] font-bold">
                            {entry.points.toLocaleString()}
                          </span>
                          <button
                            onClick={() => copyToClipboard(entry.wallet)}
                            className="text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 transition-colors"
                          >
                            <Icon
                              icon="mdi:content-copy"
                              width={16}
                              height={16}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
