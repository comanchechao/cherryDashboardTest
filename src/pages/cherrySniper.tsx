import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import VideoPlayer from "../components/VideoPlayer";

// Custom animations CSS
const customAnimations = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  @keyframes pulse-gentle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes spin-orbital {
    from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
  }
  @keyframes dash-animate {
    to { stroke-dashoffset: -100; }
  }
`;

const handleSnipeNow = () => {
  window.open("https://t.me/cherrySniperBot", "_blank");
};

declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

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

const CherrySniper: React.FC = () => {
  // const [user, setUser] = useState<any>(null);
  const [loggedIn] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  // const [email2, setEmail2] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);

  const [activeTab, setActiveTab] = useState<"Cherry" | "speed">("Cherry");

  // Add custom animations to document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);
    // Video setup is now handled by VideoPlayer components

    return () => {
      styleSheet.remove();
    };
  }, []);

  const handleTrade = () => {
    window.open("https://t.me/cherrysniperbot", "_blank");
  };

  const handleNewsletterSubscribe = async (emailValue: string) => {
    if (!emailValue.trim()) {
      console.log("Email is required");
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch(
        "https://cherrytest-production.up.railway.app/email/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
          }),
        }
      );

      const data = await response.json();
      console.log("Newsletter subscription response:", data);

      if (response.ok) {
        console.log("Successfully subscribed to newsletter");
        setSuccessToastVisible(true);
        setTimeout(() => setSuccessToastVisible(false), 3000);
        setEmail("");
        // setEmail2("");
      } else {
        console.log("Failed to subscribe:", data);
        // Check if email is already subscribed
        if (data.message === "Email already subscribed") {
          setAlreadySubscribedToastVisible(true);
          setTimeout(() => setAlreadySubscribedToastVisible(false), 3000);
        }
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const Dashboard = () => {
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
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="relative">
          {/* Custom Toast for Copy */}
          <div
            className={`fixed top-10 right-10 z-50 bg-cherry-cream border-4 border-cherry-burgundy rounded-xl shadow-[4px_4px_0px_#321017] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
              toastVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
          >
            <Icon
              icon="mdi:check-circle"
              className="text-green-500"
              width={24}
              height={24}
            />
            <div className="flex flex-col">
              <span className="winky-sans-font font-medium text-cherry-burgundy">
                Copied!
              </span>
              <span className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                Wallet address copied to clipboard
              </span>
            </div>
          </div>

          {/* Success Toast for Newsletter */}
          <div
            className={`fixed top-10 right-10 z-50 bg-green-100 border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_#22c55e] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
              successToastVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
          >
            <Icon
              icon="mdi:check-circle"
              className="text-green-600"
              width={24}
              height={24}
            />
            <div className="flex flex-col">
              <span className="winky-sans-font font-medium text-green-800">
                Success!
              </span>
              <span className="winky-sans-font text-sm text-green-700 opacity-90">
                Successfully subscribed to newsletter
              </span>
            </div>
          </div>

          {/* Already Subscribed Toast */}
          <div
            className={`fixed top-10 right-10 z-50 bg-orange-100 border-4 border-orange-500 rounded-xl shadow-[4px_4px_0px_#f97316] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
              alreadySubscribedToastVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
          >
            <Icon
              icon="mdi:information"
              className="text-orange-600"
              width={24}
              height={24}
            />
            <div className="flex flex-col">
              <span className="winky-sans-font font-medium text-orange-800">
                Already Subscribed!
              </span>
              <span className="winky-sans-font text-sm text-orange-700 opacity-90">
                This email is already subscribed to our newsletter
              </span>
            </div>
          </div>

          {/* Dashboard Header */}
          <div className="bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] px-8 py-6 mb-8 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* {user && user.photo_url && (
                  <img
                    src={user.photo_url}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-cherry-burgundy"
                  />
                )} */}
                <div>
                  <h2 className="maladroit-font text-3xl text-cherry-burgundy">
                    {/* Welcome, {user ? user.first_name : "Trader"}! */}
                  </h2>
                  <p className="winky-sans-font text-cherry-burgundy opacity-80">
                    Your personal Cherry Sniper dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  // onClick={handleLogout}
                  className="bg-cherry-red   py-2 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                >
                  <span className="winky-sans-font text-cherry-cream">
                    Logout
                  </span>
                  <Icon
                    icon="mdi:logout"
                    width={20}
                    height={20}
                    className="text-cherry-cream"
                  />
                </button>{" "}
                <button
                  onClick={handleTrade}
                  className="bg-cherry-red   py-2 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]"
                >
                  <span className="winky-sans-font text-cherry-cream">
                    TRADE
                  </span>
                  <Icon
                    icon="duo-icons:coin-stack"
                    width={20}
                    height={20}
                    className="text-cherry-cream"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#321017] relative mb-8">
            {/* Header */}
            <div className="bg-cherry-burgundy px-6 py-4">
              <h3 className="maladroit-font text-2xl text-cherry-cream flex items-center gap-2">
                <Icon
                  icon="solar:card-bold"
                  width={28}
                  height={28}
                  className="text-cherry-cream"
                />
                Your Solana Wallets
              </h3>
            </div>

            {/* Wallet Content */}
            <div className="p-6">
              <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 mb-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="  winky-sans-font text-cherry-burgundy">
                        W1
                      </span>
                      <div
                        className="bg-cherry-cream border-2 border-cherry-burgundy rounded-lg px-3 py-1 font-mono text-sm hover:bg-cherry-burgundy hover:bg-opacity-10 cursor-pointer transition-colors flex items-center"
                        onClick={() => copyToClipboard("")}
                      >
                        <span className="truncate md:w-auto w-32"></span>
                        <span className="ml-2 text-xs text-cherry-burgundy opacity-70">
                          (Tap to copy)
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <Icon
                          icon="token-branded:solana"
                          className="  inline-block mr-1"
                          width={16}
                          height={16}
                        />
                        <span className="font-medium mr-2">Balance:</span>
                        <span>67 SOL ($10,000)</span>
                      </div>
                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <span className="font-medium mr-2">
                          <Icon
                            icon="mdi:star-four-points-box"
                            className="text-green-500 inline-block mr-1"
                            width={16}
                            height={16}
                          />
                          Points:
                        </span>
                        <span>98,400</span>
                      </div>
                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <span className="font-medium mr-2">
                          <Icon
                            icon="uil:chart"
                            className="text-cherry-burgundy inline-block mr-1"
                            width={16}
                            height={16}
                          />
                          Volume:
                        </span>
                        <span>1,200,000</span>
                      </div>
                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <span className="font-medium mr-2">
                          <Icon
                            icon="game-icons:achievement"
                            className=" text-amber-500 inline-block mr-1"
                            width={16}
                            height={16}
                          />
                          Achievement:
                        </span>
                        <span>Diamond</span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto hidden md:block">
                    <img
                      src="https://storage.cherrybot.ai/cherrySniper.webp"
                      alt="Solana Wallet"
                      className="w-20 h-20 animate-float"
                    />
                  </div>
                </div>
              </div>

              {/* Achievement System */}
              <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left side - Current Achievement */}
                  <div>
                    <h4 className="maladroit-font text-xl text-cherry-burgundy mb-3 flex items-center gap-2">
                      <Icon
                        icon="ph:trophy-bold"
                        className="text-cherry-red"
                        width={24}
                        height={24}
                      />
                      Your Achievement Progress
                    </h4>

                    <div className="bg-cherry-cream rounded-lg p-5 border-2 border-cherry-burgundy shadow-inner mb-4">
                      <div className="flex justify-center items-center flex-col">
                        <div className="w-24 h-24 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center mb-3 relative">
                          <img
                            src={`/${userAchievement.badge}.png`}
                            alt="Diamond Badge"
                            className="w-20 h-20 object-contain animate-pulse-slow"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center border-2 border-cherry-burgundy">
                            <span className="winky-sans-font text-xs   text-white">
                              {userAchievement.level}
                            </span>
                          </div>
                        </div>
                        <p className="winky-sans-font text-cherry-burgundy text-center mb-1  ">
                          {userAchievement.badge} Level Achieved!
                        </p>
                        <p className="winky-sans-font text-cherry-burgundy text-opacity-70 text-sm text-center">
                          {userAchievement.volume} trading volume reached
                        </p>

                        {/* Progress to next level */}
                        <div className="w-full mt-4">
                          <div className="flex justify-between items-center winky-sans-font text-sm text-cherry-burgundy mb-2">
                            <span>Progress to {userAchievement.nextBadge}</span>
                            <span>{userAchievement.progress}%</span>
                          </div>
                          <div className="w-full h-3 bg-cherry-cream border border-cherry-burgundy rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cherry-red"
                              style={{ width: `${userAchievement.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center winky-sans-font text-xs text-cherry-burgundy mt-1 opacity-70">
                            <span>Current: {userAchievement.volume}</span>
                            <span>Next: {userAchievement.nextVolume}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy p-3">
                      <p className="winky-sans-font text-cherry-burgundy text-sm">
                        <span className=" ">Point System:</span> Every $10 in
                        volume = +1 point
                      </p>
                      <p className="winky-sans-font text-cherry-burgundy text-sm mt-2">
                        <span className=" ">Rewards:</span> Top users by points
                        win Cherry Airdrop and bot revenue rewards
                      </p>
                    </div>
                  </div>

                  {/* Right side - Achievement Levels */}
                  <div>
                    <h4 className="maladroit-font text-xl text-cherry-burgundy mb-3 flex items-center gap-2">
                      <Icon
                        icon="ph:medal-bold"
                        className="text-cherry-red"
                        width={24}
                        height={24}
                      />
                      Locked Achievements Preview
                    </h4>

                    <div className="bg-cherry-cream   rounded-lg p-4 border-2 border-cherry-burgundy shadow-inner space-y-3">
                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Bronze.png"
                          alt="Bronze Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Bronze</span>
                        <span className="text-sm mr-2">– $1,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +50 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Silver.png"
                          alt="Silver Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Silver</span>
                        <span className="text-sm mr-2">– $5,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +200 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Gold.png"
                          alt="Gold Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Gold</span>
                        <span className="text-sm mr-2">– $10,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +500 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Platinum.png"
                          alt="Platinum Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Platinum</span>
                        <span className="text-sm mr-2">– $50,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +1,500 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Diamond.png"
                          alt="Diamond Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Diamond</span>
                        <span className="text-sm mr-2">– $100,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +3,500 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Ruby.png"
                          alt="Ruby Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Ruby</span>
                        <span className="text-sm mr-2">– $250,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +8,000 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Emerald.png"
                          alt="Emerald Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Emerald</span>
                        <span className="text-sm mr-2">– $500,000 Volume</span>
                        <span className="ml-auto   text-cherry-red">
                          +20,000 Points
                        </span>
                      </div>

                      <div className="flex items-center winky-sans-font text-cherry-burgundy">
                        <img
                          src="https://storage.cherrybot.ai/Legendary.png"
                          alt="Legendary Badge"
                          className="w-9 object-contain mr-2"
                        />
                        <span className="  mr-2">Legendary</span>
                        <span className="text-sm mr-2">
                          – $1,000,000+ Volume
                        </span>
                        <span className="ml-auto   text-cherry-red">
                          +50,000 Points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[8px_8px_0px_#321017] relative mb-8">
            {/* Header */}
            <div className="bg-cherry-burgundy px-6 py-4 flex items-center justify-between">
              <h3 className="maladroit-font text-2xl text-cherry-cream flex items-center gap-2">
                <Icon
                  icon="tabler:trophy"
                  width={28}
                  height={28}
                  className="text-yellow-300 animate-pulse"
                />
                Trader Leaderboard
              </h3>
              <div className="winky-sans-font text-sm text-cherry-cream opacity-80">
                Updated hourly
              </div>
            </div>

            {/* Table */}
            <div className="p-6 overflow-x-auto">
              <table className="w-full winky-sans-font">
                <thead>
                  <tr className="border-b-2 border-cherry-burgundy">
                    <th className="px-4 py-3 text-left text-cherry-burgundy  ">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-cherry-burgundy  ">
                      Wallet
                    </th>
                    <th className="px-4 py-3 text-right text-cherry-burgundy  ">
                      Total Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboardData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-cherry-burgundy border-opacity-20 hover:bg-cherry-burgundy hover:bg-opacity-10 transition-colors ${
                        item.isUser ? "bg-opacity-10" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        {index < 3 ? (
                          <div className="flex items-center my-2 justify-center w-10 h-10 rounded-full bg-yellow-400 text-cherry-burgundy   border-2 border-cherry-burgundy">
                            {item.rank}
                          </div>
                        ) : (
                          <div className="text-cherry-burgundy my-2 w-10 h-10 pl-3">
                            {item.rank}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-cherry-burgundy">
                        <div className="flex items-center">
                          {index < 3 && item.badge && (
                            <img
                              src={`/${item.badge}.png`}
                              alt={`${item.badge} Badge`}
                              className="w-6 h-6 mr-2"
                            />
                          )}
                          <span className={item.isUser ? " " : ""}>
                            {item.wallet.substring(0, 6)}...
                            {item.wallet.substring(item.wallet.length - 4)}
                            {item.isUser && " (You)"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-cherry-burgundy  ">
                        {item.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
              <div className="flex items-center mb-4">
                <Icon
                  icon="ph:chart-line-up-bold"
                  className="text-cherry-red mr-3"
                  width={32}
                  height={32}
                />
                <h4 className="maladroit-font text-xl text-cherry-burgundy">
                  Your Ranking
                </h4>
              </div>
              <div className="text-4xl   text-cherry-burgundy mb-2">#2</div>
              <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                Top 1% of all traders
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
              <div className="flex items-center mb-4">
                <Icon
                  icon="ph:lightning-bold"
                  className="text-cherry-red mr-3"
                  width={32}
                  height={32}
                />
                <h4 className="maladroit-font text-xl text-cherry-burgundy">
                  Your Points
                </h4>
              </div>
              <div className="text-4xl   text-cherry-burgundy mb-2">98,400</div>
              <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                Earned this month
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
              <div className="flex items-center mb-4">
                <Icon
                  icon="ph:trophy-bold"
                  className="text-cherry-red mr-3"
                  width={32}
                  height={32}
                />
                <h4 className="maladroit-font text-xl text-cherry-burgundy">
                  Rewards
                </h4>
              </div>
              <div className="text-4xl   text-cherry-burgundy mb-2">
                5M $AIBOT
              </div>
              <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                Available to claim
              </p>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="mt-16 p-8 w-full bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>

            <h3 className="winky-sans-font text-2xl text-cherry-burgundy   mb-4 text-center">
              Get Early Access
            </h3>
            <p className="winky-sans-font text-cherry-burgundy mb-6 text-center">
              Be the first to know when Cherry Trade launches.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow py-3 px-4 rounded-xl border-2 border-cherry-burgundy focus:ring-2 focus:ring-cherry-red focus:outline-none"
              />
              <button
                onClick={() => handleNewsletterSubscribe(email)}
                disabled={isSubscribing}
                className="bg-cherry-red text-white   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-cherry-cream">
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </span>
                <Icon
                  className="text-cherry-cream"
                  icon="mdi:bell"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div className="mt-16 p-8 w-full bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] relative overflow-hidden">
            <div className="text-center">
              <h3 className="maladroit-font text-3xl md:text-4xl text-cherry-burgundy   mb-4">
                Your Dashboard. Your Edge.
              </h3>
              <p className="winky-sans-font text-lg text-cherry-burgundy mb-8 max-w-3xl mx-auto">
                Track your progress in real time with the Cherry Sniper
                dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Icon
                  icon="ph:chart-line-up-bold"
                  className="text-cherry-red mt-1 flex-shrink-0"
                  width={24}
                  height={24}
                />
                <div>
                  <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                    Volume Tracked
                  </h4>
                  <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                    See how much you've traded
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  icon="ph:star-bold"
                  className="text-cherry-red mt-1 flex-shrink-0"
                  width={24}
                  height={24}
                />
                <div>
                  <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                    Points Earned
                  </h4>
                  <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                    Earn 1 point for every $10 traded
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  icon="ph:trophy-bold"
                  className="text-cherry-red mt-1 flex-shrink-0"
                  width={24}
                  height={24}
                />
                <div>
                  <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                    Leaderboard Rank
                  </h4>
                  <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                    Climb to the top for airdrop rewards
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  icon="ph:medal-bold"
                  className="text-cherry-red mt-1 flex-shrink-0"
                  width={24}
                  height={24}
                />
                <div>
                  <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                    Achievements
                  </h4>
                  <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                    Unlock bonus points as you trade more
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white h-80 rounded-xl border-4 border-cherry-burgundy p-2 shadow-[6px_6px_0px_#321017]">
                <img
                  src="https://storage.cherrybot.ai/screenshot1.webp"
                  className="w-full h-full object-cover"
                  alt="Cherry Sniper"
                />
              </div>
              <div className="bg-white h-80 rounded-xl border-4 border-cherry-burgundy p-2 shadow-[6px_6px_0px_#321017]">
                <img
                  src="https://storage.cherrybot.ai/screenshot2.webp"
                  className="w-full h-full object-cover"
                  alt="Cherry Sniper"
                />
              </div>
            </div>

            <p className="maladroit-font text-2xl text-cherry-burgundy   mt-10 text-center">
              Whether you win or lose — you still earn.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="hider top"></div>
      <div className="hider"></div>

      <div id="triggerXoverFlow1" className="wrapper_main h-full">
        <div className="overlay_color">
          <div className="overlay_stroke"></div>
        </div>
      </div>
      <div id="triggerXoverFlow" className="wrapper_sections wrapper-container">
        <div className="section_menu">
          <Link
            data-w-id="87ad386c-0ced-5924-521f-7494012d2c31"
            to="/"
            className="menu_nav w-button"
          >
            HOME
          </Link>
          <a
            data-w-id="7d8f886b-0585-318b-7e93-b06c2d583f20"
            className="menu_nav w-button"
            id="aboutBtn"
          >
            ABOUT
          </a>
          <Link to="/features" className="menu_nav w-button" id="featuresBtn">
            FEATURES
          </Link>
          <a
            data-w-id="d7a0aea0-e993-cbf1-34dd-b40546be337d"
            className="menu_nav w-button"
            id="partnersBtn"
          >
            PARTNERS
          </a>
          <a
            href="https://pad.cherrybot.ai/"
            target="_blank"
            rel="noreferrer"
            className="menu_nav w-button"
            id="cherryTokenBtn"
          >
            IDO
          </a>
          <a
            data-w-id="2ba2cf4a-0b9f-9de3-1531-186224626ad9"
            className="menu_nav w-button"
            id="cherryTokenBtn"
          >
            $AIBOT
          </a>
          <a
            data-w-id="b4f5159c-2aa8-980c-c2c7-debaa8ed221d"
            href="https://docs.cherrybot.co/"
            target="_blank"
            rel="noreferrer"
            className="menu_nav w-button"
          >
            docs
          </a>
          <Link to="/careers" className="menu_nav w-button">
            CAREERS
          </Link>
          <a
            data-w-id="faf18f25-7349-a299-8d71-0263824f1e35"
            href="#"
            className="back w-button"
          >
            BACK
          </a>
        </div>

        <Navbar />

        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="relative">
            {/* Success Toast for Newsletter */}
            <div
              className={`fixed top-10 right-10 z-50 bg-green-100 border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_#22c55e] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
                successToastVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10 pointer-events-none"
              }`}
            >
              <Icon
                icon="mdi:check-circle"
                className="text-green-600"
                width={24}
                height={24}
              />
              <div className="flex flex-col">
                <span className="winky-sans-font font-medium text-green-800">
                  Success!
                </span>
                <span className="winky-sans-font text-sm text-green-700 opacity-90">
                  Successfully subscribed to newsletter
                </span>
              </div>
            </div>

            {/* Already Subscribed Toast */}
            <div
              className={`fixed top-10 right-10 z-50 bg-orange-100 border-4 border-orange-500 rounded-xl shadow-[4px_4px_0px_#f97316] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
                alreadySubscribedToastVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10 pointer-events-none"
              }`}
            >
              <Icon
                icon="mdi:information"
                className="text-orange-600"
                width={24}
                height={24}
              />
              <div className="flex flex-col">
                <span className="winky-sans-font font-medium text-orange-800">
                  Already Subscribed!
                </span>
                <span className="winky-sans-font text-sm text-orange-700 opacity-90">
                  This email is already subscribed to our newsletter
                </span>
              </div>
            </div>

            {!loggedIn ? (
              <div className="flex flex-col items-center justify-center text-center mb-12  w-full  ">
                <div className="bg-cherry-cream  rounded-lg gap-3 flex flex-col items-center justify-center border-4 border-cherry-burgundy lg:shadow-[8px_8px_0px_#5d4037] lg:px-44 py-7 relative overflow-hidden mb-8 w-full   mx-auto">
                  <div className="flex items-center flex-col justify-center ">
                    <img
                      src="https://storage.cherrybot.ai/cherrySniper.webp"
                      alt="Cherry Logo"
                      className="w-32 h-32"
                    />
                  </div>

                  <div className="section_sniper_spotlight relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id="CherryPattern"
                            patternUnits="userSpaceOnUse"
                            width="80"
                            height="80"
                            patternTransform="rotate(25)"
                          >
                            <circle cx="40" cy="40" r="2" fill="#d6024d" />
                            <circle cx="20" cy="20" r="1.5" fill="#d6024d" />
                            <circle cx="60" cy="60" r="1.5" fill="#d6024d" />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#CherryPattern)"
                        />
                      </svg>
                    </div>

                    {/* Floating decorative elements */}
                    <div
                      className="absolute top-20 left-10 bg-cherry-red opacity-10 rounded-full w-20 h-20 animate-float"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-40 bg-cherry-red opacity-10 rounded-full right-10 w-16 h-16 animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bg-cherry-red top-1/3 right-1/4 w-12 h-12 opacity-10 rounded-full animate-float"
                      style={{ animationDelay: "1.5s" }}
                    ></div>

                    <div className="max-w-7xl mx-auto  ">
                      {/* Header Section */}
                      <div
                        className="text-center mb-16 md:px-0 px-5"
                        data-spotlight-content
                      >
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] px-6 py-3 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                            <span className="text-xl md:text-xl   winky-sans-font text-cherry-burgundy">
                              Cherry Sniper
                            </span>
                          </div>
                        </div>

                        <h2 className="text-xl md:text-3xl   maladroit-font text-cherry-red mb-8 leading-tight">
                          Fastest Trade Executions or Trade in Privacy
                        </h2>

                        <div className="max-w-4xl md:px-0 px-9 mx-auto">
                          <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] lg:p-8 p-2 relative overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300">
                            {/* Paper texture overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

                            <span className="winky-sans-font text-sm md:text-2xl text-cherry-burgundy leading-relaxed relative z-10">
                              Cherry Sniper will be the first trading bot that
                              offer 2 trading modes: Sniper and Stealth. Sniper
                              mode is entirely focused on speed and advanced
                              trading features while Stealth focuses on privacy
                              and being non custodial.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Video Showcase Section */}
                      <div className="mb-20 md:px-0 !px-5" data-spotlight-video>
                        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                          {/* Video Container */}

                          {/* Tabs Section */}
                          <div className="w-full ">
                            <div className="w-full md:px-0 px-7 flex justify-center items-center">
                              <div className="relative block md:hidden rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-cherry-burgundy/30 to-transparent z-10 pointer-events-none"></div>

                                <VideoPlayer
                                  src="https://storage.cherrybot.ai/sniperModes.mp4"
                                  className="w-full h-auto max-h-[60vh] object-cover"
                                  autoPlay={true}
                                />
                              </div>

                              <div className="md:block hidden bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-2 relative overflow-hidden transform    transition-all duration-300">
                                <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-cherry-burgundy">
                                  <VideoPlayer
                                    src="https://storage.cherrybot.ai/sniperModes.mp4"
                                    className="w-full h-auto max-h-[60vh] object-cover"
                                    autoPlay={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] md:p-8 p-4 relative overflow-hidden transform   transition-all duration-300">
                              {/* Paper texture overlay */}
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20"></div>

                              {/* Decorative SVG Elements */}
                              <svg
                                className="absolute -top-8 -right-8 w-32 h-32 opacity-10 pointer-events-none"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="30"
                                  fill="#E53935"
                                  opacity="0.3"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="20"
                                  fill="#5d4037"
                                  opacity="0.2"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="10"
                                  fill="#E53935"
                                  opacity="0.4"
                                />
                              </svg>

                              <svg
                                className="absolute -bottom-6 -left-6 w-24 h-24 opacity-10 pointer-events-none"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <polygon
                                  points="50,15 60,35 85,35 67,50 75,75 50,60 25,75 33,50 15,35 40,35"
                                  fill="#E53935"
                                  opacity="0.3"
                                />
                              </svg>

                              <div className="relative z-10">
                                <h3 className="text-lg md:text-3xl maladroit-font text-cherry-burgundy mb-8 text-center">
                                  Two Modes: Stealth & Sniper
                                </h3>

                                {/* Tab Buttons */}
                                <div className="flex gap-2 mb-8">
                                  <button
                                    onClick={() => setActiveTab("Cherry")}
                                    className={`flex-1 py-3 px-6 rounded-xl border-4 winky-sans-font transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                                      activeTab === "Cherry"
                                        ? "bg-cherry-red text-white border-cherry-burgundy shadow-[4px_4px_0px_#321017]"
                                        : "bg-cherry-cream text-cherry-burgundy border-cherry-burgundy hover:bg-cherry-cream"
                                    }`}
                                  >
                                    <Icon
                                      icon="ph:shield-check-bold"
                                      width={20}
                                      height={20}
                                      className={
                                        activeTab === "Cherry"
                                          ? "text-white"
                                          : "text-cherry-burgundy"
                                      }
                                    />
                                    <span
                                      className={
                                        activeTab === "Cherry"
                                          ? "text-white"
                                          : "text-cherry-burgundy"
                                      }
                                    >
                                      Stealth
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => setActiveTab("speed")}
                                    className={`flex-1 py-3 px-6 rounded-xl border-4 winky-sans-font transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                                      activeTab === "speed"
                                        ? "bg-cherry-red text-white border-cherry-burgundy shadow-[4px_4px_0px_#321017]"
                                        : "bg-cherry-cream text-cherry-burgundy border-cherry-burgundy hover:bg-cherry-cream"
                                    }`}
                                  >
                                    <Icon
                                      icon="ph:lightning-bold"
                                      width={20}
                                      height={20}
                                      className={
                                        activeTab === "speed"
                                          ? "text-white"
                                          : "text-cherry-burgundy"
                                      }
                                    />
                                    <span
                                      className={
                                        activeTab === "speed"
                                          ? "text-white"
                                          : "text-cherry-burgundy"
                                      }
                                    >
                                      Sniper
                                    </span>
                                  </button>
                                </div>

                                {/* Tab Content */}
                                <div className="min-h-[200px]">
                                  {activeTab === "Cherry" && (
                                    <div className="space-y-4 animate-fadeIn">
                                      {/* Stealth Mode Cards */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Trade in Privacy Card */}
                                        <div className="group">
                                          <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                                            <div className="flex w-full justify-center items-center mb-4">
                                              <img
                                                src="https://storage.cherrybot.ai/Privacy.png"
                                                alt="check"
                                                className="w-20 mr-3  object-contain"
                                              />
                                            </div>
                                            <h4 className="maladroit-font text-xl text-cherry-burgundy">
                                              Trade in Privacy
                                            </h4>
                                            <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                                              Your trades stay completely
                                              private with decentralized
                                              servers. No prying eyes, just pure
                                              stealth.
                                            </p>
                                          </div>
                                        </div>

                                        {/* Non-custodial Wallet Card */}
                                        <div className="group">
                                          <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                                            <div className="flex w-full justify-center items-center mb-4">
                                              <img
                                                src="https://storage.cherrybot.ai/Wallet.png"
                                                alt="check"
                                                className="h-20 mr-3  object-contain"
                                              />
                                            </div>
                                            <h4 className="maladroit-font text-xl text-cherry-burgundy">
                                              Non custodial
                                            </h4>
                                            <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                                              You maintain full control of your
                                              private keys and funds. Your
                                              money, your rules.
                                            </p>
                                          </div>
                                        </div>

                                        {/* Key Security Card */}
                                        <div className="group md:col-span-2">
                                          <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
                                            <div className="flex w-full justify-center items-center mb-4">
                                              <img
                                                src="https://storage.cherrybot.ai/keys.png"
                                                alt="check"
                                                className="h-20 mr-3  object-contain"
                                              />
                                            </div>
                                            <h4 className="maladroit-font text-xl text-cherry-burgundy">
                                              No one has access to your keys
                                            </h4>
                                            <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                                              Complete privacy and security for
                                              your private keys. Zero exposure,
                                              maximum protection with our
                                              decentralized infrastructure.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {activeTab === "speed" && (
                                    <div className="space-y-4 animate-fadeIn">
                                      {/* Sniper Mode Cards */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Extremely Fast Trade Execution Card */}
                                        <div className="group">
                                          <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                                            <div className="flex w-full justify-center items-center mb-4">
                                              <img
                                                src="https://storage.cherrybot.ai/Fast.png"
                                                alt="check"
                                                className="h-20 mr-3  object-contain"
                                              />
                                            </div>
                                            <h4 className="maladroit-font text-xl text-cherry-burgundy">
                                              Fastest trading bot
                                            </h4>
                                            <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                                              Lightning-fast trade execution
                                              with minimal latency and slippage.
                                              Strike first, profit faster.
                                            </p>
                                          </div>
                                        </div>

                                        {/* Advanced Trading Features Card */}
                                        <div className="group">
                                          <div className="bg-cherry-cream flex flex-col justify-around items-center rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden h-full">
                                            <div className="flex w-full justify-center items-center mb-4">
                                              <img
                                                src="https://storage.cherrybot.ai/Privacy2.png"
                                                alt="check"
                                                className="h-20 mr-3  object-contain"
                                              />
                                            </div>
                                            <div>
                                              <h4 className="maladroit-font text-xl text-cherry-burgundy">
                                                Advanced trading features
                                              </h4>
                                              <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                                                Pro-level tools and settings for
                                                sophisticated traders. Maximum
                                                precision and control.
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Scales with Volume Card */}
                                        <div className="group md:col-span-2">
                                          <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#321017] hover:shadow-[4px_4px_0px_#321017] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 relative overflow-hidden">
                                            <div className="flex w-full justify-center items-center mb-4">
                                              <img
                                                src="https://storage.cherrybot.ai/Rewards.png"
                                                alt="check"
                                                className="h-20 mr-3  object-contain"
                                              />
                                            </div>
                                            <h4 className="maladroit-font text-xl text-cherry-burgundy">
                                              Scales with volume
                                            </h4>
                                            <p className="winky-sans-font text-cherry-burgundy text-opacity-70">
                                              Automatically adjusts performance
                                              and capacity based on trading
                                              volume. Maximum efficiency at any
                                              scale.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className="text-center mt-5"
                                data-spotlight-cta
                              >
                                <div className="inline-block">
                                  <button
                                    onClick={handleSnipeNow}
                                    className="text-white bg-cherry-red   py-2 px-8 rounded-xl border border-b-8 border-r-8 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu  flex items-center gap-3 shadow-[2px_2px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font group"
                                  >
                                    <span className="text-white text-xl">
                                      Learn More
                                    </span>
                                    <div className="    rounded-full     transition-all duration-200">
                                      <Icon
                                        icon="solar:square-arrow-right-bold-duotone"
                                        className="text-cherry-cream"
                                        width={24}
                                        height={24}
                                      />
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Section */}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <div className="bg-cherry-cream px-6 py-2 rounded-full border-2 border-cherry-burgundy winky-sans-font text-cherry-burgundy font-medium">
                      Instant Execution
                    </div>
                    <div className="bg-cherry-cream px-6 py-2 rounded-full border-2 border-cherry-burgundy winky-sans-font text-cherry-burgundy font-medium">
                      Trade-to-Earn
                    </div>
                    <div className="bg-cherry-cream px-6 py-2 rounded-full border-2 border-cherry-burgundy winky-sans-font text-cherry-burgundy font-medium">
                      Boosted Pool Rewards
                    </div>
                  </div>
                </div>
                {/* Newsletter signup */}
                {/* <div className="mt-16 p-8 w-full bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>

                    <h3 className="winky-sans-font text-2xl text-cherry-burgundy   mb-4 text-center">
                      Get Early Access
                    </h3>
                    <p className="winky-sans-font text-cherry-burgundy mb-6 text-center">
                      Be the first to know when Cherry Trade launches.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email2}
                        onChange={(e) => setEmail2(e.target.value)}
                        className="flex-grow py-3 px-4 rounded-xl border-2 border-cherry-burgundy focus:ring-2 focus:ring-cherry-red focus:outline-none"
                      />
                      <button
                        onClick={() => handleNewsletterSubscribe(email2)}
                        disabled={isSubscribing}
                        className="bg-cherry-red text-white   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-cherry-cream">
                          {isSubscribing ? "Subscribing..." : "Subscribe"}
                        </span>
                        <Icon
                          className="text-cherry-cream"
                          icon="mdi:bell"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div> */}
                {/* Trade, Earn Points, Win Rewards Section */}
                <div className="mt-16 mb-8 relative">
                  {/* Decorative Background Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <svg
                      className="absolute top-0 left-0 w-full h-full opacity-5"
                      viewBox="0 0 1200 600"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <pattern
                          id="rewardPattern"
                          patternUnits="userSpaceOnUse"
                          width="60"
                          height="60"
                          patternTransform="rotate(15)"
                        >
                          <circle cx="30" cy="30" r="2" fill="#d6024d" />
                          <path
                            d="M15,15 L45,45 M45,15 L15,45"
                            stroke="#5d4037"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#rewardPattern)"
                      />
                    </svg>

                    {/* Floating reward icons */}
                    <div
                      className="absolute top-20 left-10 opacity-10"
                      style={{
                        animation: "float-slow 6s ease-in-out infinite",
                      }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="#d6024d"
                      >
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                      </svg>
                    </div>

                    <div
                      className="absolute bottom-32 right-16 opacity-10"
                      style={{
                        animation: "float-slow 8s ease-in-out infinite 2s",
                      }}
                    >
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="#5d4037"
                      >
                        <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                      </svg>
                    </div>

                    <div
                      className="absolute top-1/2 left-20 opacity-8"
                      style={{
                        animation: "pulse-gentle 10s ease-in-out infinite 1s",
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="#d6024d"
                      >
                        <path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10 max-w-6xl mx-auto p-8">
                    {/* Title */}
                    <div className="text-center mb-12">
                      <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] px-8 py-6 inline-block transform -rotate-1 hover:rotate-0 transition-all duration-300">
                        <h2 className="maladroit-font text-lg md:text-4xl text-cherry-burgundy  ">
                          Trade, Earn Points, Win Rewards
                        </h2>
                      </div>
                    </div>

                    {/* Video Container */}
                    <div className="flex justify-center mb-12">
                      <div className="bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[12px_12px_0px_#5d4037] p-3 transform hover:rotate-1 transition-all duration-300 max-w-2xl">
                        <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-cherry-burgundy">
                          <VideoPlayer
                            src="https://storage.cherrybot.ai/SniperEarn.mp4"
                            className="w-full h-full object-cover"
                            autoPlay={true}
                          />

                          {/* Subtle overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-cherry-burgundy/10 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    {/* Feature Points */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                      {/* Trade */}
                      <div className="text-center group">
                        <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#5d4037] hover:shadow-[4px_4px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 transform group-hover:-rotate-1">
                          <div className="w-16 h-16 bg-cherry-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="white"
                            >
                              <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
                            </svg>
                          </div>
                          <h3 className="maladroit-font text-xl text-cherry-burgundy   mb-2">
                            Trade
                          </h3>
                          <p className="winky-sans-font text-cherry-burgundy/80 text-sm">
                            Execute lightning-fast trades with precision
                          </p>
                        </div>
                      </div>

                      {/* Earn Points */}
                      <div className="text-center group">
                        <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#5d4037] hover:shadow-[4px_4px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 transform group-hover:rotate-1">
                          <div className="w-16 h-16 bg-cherry-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="white"
                            >
                              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                            </svg>
                          </div>
                          <h3 className="maladroit-font text-xl text-cherry-burgundy   mb-2">
                            Earn Points
                          </h3>
                          <p className="winky-sans-font text-cherry-burgundy/80 text-sm">
                            $10 traded = 1 point automatically earned
                          </p>
                        </div>
                      </div>

                      {/* Win Rewards */}
                      <div className="text-center group">
                        <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy p-6 shadow-[6px_6px_0px_#5d4037] hover:shadow-[4px_4px_0px_#5d4037] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 transform group-hover:-rotate-1">
                          <div className="w-16 h-16 bg-cherry-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="white"
                            >
                              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
                            </svg>
                          </div>
                          <h3 className="maladroit-font text-xl text-cherry-burgundy   mb-2">
                            Win Rewards
                          </h3>
                          <p className="winky-sans-font text-cherry-burgundy/80 text-sm">
                            Climb leaderboards for exclusive airdrops
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="text-center mt-12">
                      <div className="bg-cherry-cream rounded-full border-2 border-cherry-burgundy px-6 py-2 inline-block shadow-[4px_4px_0px_#5d4037]">
                        <span className="winky-sans-font text-cherry-burgundy font-medium">
                          Whether you win or lose — you still earn
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 w-full bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] relative overflow-hidden">
                  <div className="text-center">
                    <h3 className="maladroit-font text-lg md:text-4xl text-cherry-burgundy   mb-4">
                      Your Dashboard. Your Edge.
                    </h3>
                    <p className="winky-sans-font text-sm md:text-lg text-cherry-burgundy mb-8 max-w-3xl mx-auto">
                      Track your progress in real time with the Cherry Sniper
                      dashboard.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Icon
                        icon="ph:chart-line-up-bold"
                        className="text-cherry-red mt-1 flex-shrink-0"
                        width={24}
                        height={24}
                      />
                      <div>
                        <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                          Volume Tracked
                        </h4>
                        <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                          See how much you've traded
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon
                        icon="ph:star-bold"
                        className="text-cherry-red mt-1 flex-shrink-0"
                        width={24}
                        height={24}
                      />
                      <div>
                        <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                          Points Earned
                        </h4>
                        <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                          Earn 1 point for every $10 traded
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon
                        icon="ph:trophy-bold"
                        className="text-cherry-red mt-1 flex-shrink-0"
                        width={24}
                        height={24}
                      />
                      <div>
                        <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                          Leaderboard Rank
                        </h4>
                        <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                          Climb to the top for airdrop rewards
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon
                        icon="ph:medal-bold"
                        className="text-cherry-red mt-1 flex-shrink-0"
                        width={24}
                        height={24}
                      />
                      <div>
                        <h4 className="winky-sans-font   text-cherry-burgundy text-left">
                          Achievements
                        </h4>
                        <p className="winky-sans-font text-sm text-cherry-burgundy opacity-80">
                          Unlock bonus points as you trade more
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <div className="  lg:h-80 h-full rounded-xl border-4 border-cherry-burgundy p-2 shadow-[6px_6px_0px_#321017]">
                      <img
                        src="https://storage.cherrybot.ai/screenshot1.webp"
                        className="w-full h-full object-cover"
                        alt="Cherry Sniper"
                      />
                    </div>
                    <div className="  lgh-80 h-full rounded-xl border-4 border-cherry-burgundy p-2 shadow-[6px_6px_0px_#321017]">
                      <img
                        src="https://storage.cherrybot.ai/screenshot2.webp"
                        className="w-full h-full object-cover"
                        alt="Cherry Sniper"
                      />
                    </div>
                  </div>

                  <p className="maladroit-font text-2xl text-cherry-burgundy   mt-10 text-center">
                    Whether you win or lose — you still earn.
                  </p>
                </div>
              </div>
            ) : (
              <Dashboard />
            )}
          </div>
        </div>
        {/* Cherry Trade Section */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-10 md:pb-20">
          <div className="min-h-[80vh] flex flex-col items-center justify-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Animated SVG Background */}
              <svg
                className="absolute top-0 left-0 w-full h-full z-0"
                viewBox="0 0 1200 800"
                preserveAspectRatio="none"
              >
                {/* Animated wave paths */}
                <path
                  d="M0,400 Q300,350 600,450 T1200,400"
                  fill="none"
                  stroke="#E53935"
                  strokeWidth="3"
                  strokeOpacity="0.15"
                  strokeDasharray="20,20"
                  style={{ animation: "dash-animate 40s linear infinite" }}
                />
                <path
                  d="M0,300 Q300,450 600,350 T1200,300"
                  fill="none"
                  stroke="#5D4037"
                  strokeWidth="3"
                  strokeOpacity="0.12"
                  strokeDasharray="15,25"
                  style={{
                    animation: "dash-animate 30s linear infinite reverse",
                  }}
                />
                <path
                  d="M0,500 Q400,300 800,500 T1200,500"
                  fill="none"
                  stroke="#E53935"
                  strokeWidth="2"
                  strokeOpacity="0.08"
                  strokeDasharray="10,15"
                  style={{ animation: "dash-animate 50s linear infinite" }}
                />
              </svg>

              {/* Decorative shapes */}
              <div
                className="absolute top-20 left-20"
                style={{ animation: "spin-orbital 15s linear infinite" }}
              >
                <div className="w-16 h-16 bg-cherry-red opacity-10 rounded-full"></div>
              </div>
              <div
                className="absolute bottom-40 right-20"
                style={{
                  animation: "spin-orbital 20s linear infinite reverse",
                }}
              >
                <div className="w-24 h-24 bg-cherry-burgundy opacity-10 rounded-full"></div>
              </div>
              <div
                className="absolute top-1/2 left-1/4"
                style={{ animation: "pulse-gentle 8s ease-in-out infinite" }}
              >
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  opacity="0.08"
                >
                  <circle cx="50" cy="50" r="40" fill="#E53935" />
                  <path
                    d="M50,10 C22.4,10 0,32.4 0,60 C0,74.6 6.4,87.8 16.5,97.2"
                    stroke="#5D4037"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </div>
              <div
                className="absolute top-1/3 right-1/4"
                style={{ animation: "pulse-gentle 6s ease-in-out infinite 1s" }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" opacity="0.1">
                  <rect
                    x="10"
                    y="10"
                    width="60"
                    height="60"
                    rx="15"
                    fill="#5D4037"
                  />
                </svg>
              </div>
            </div>

            {/* Main Content */}
            <div className="z-10 relative max-w-7xl w-full">
              {/* Title Card */}
              <div className="flex flex-col justify-center items-center bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[12px_12px_0px_#5d4037] p-8 md:p-10 relative overflow-hidden transform md:rotate-1 mb-12">
                <h2 className="maladroit-font text-xl md:text-6xl lg:text-5xl   text-cherry-burgundy leading-tight animate-[wiggle_7s_ease-in-out_infinite] origin-center mb-6 text-center">
                  Cherry Web Trading Platform
                </h2>
                <div className="relative">
                  <span className="maladroit-font text-lg md:text-4xl text-cherry-red   mb-6 inline-block relative">
                    Coming Soon
                  </span>
                </div>
                <p className="winky-sans-font text-xl text-cherry-burgundy my-6 max-w-3xl text-center">
                  Experience lightning-fast trades, real-time analytics, and
                  exclusive rewards – all in one place
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <button
                    onClick={() => {
                      const element = document.getElementById(
                        "newsletter-signup-trade"
                      );
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className="bg-cherry-red text-white   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2"
                  >
                    <span className="text-cherry-cream">Join Early Access</span>
                    <Icon
                      className="text-cherry-cream"
                      icon="mdi:arrow-right"
                      width={20}
                      height={20}
                    />
                  </button>
                  <button
                    onClick={() =>
                      window.open("https://t.me/CherrySniperBot", "_blank")
                    }
                    className="bg-cherry-cream text-cherry-burgundy   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2"
                  >
                    <span className="text-cherry-burgundy">
                      Try Cherry Sniper
                    </span>
                    <Icon
                      className="text-cherry-burgundy"
                      icon="ic:baseline-telegram"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="w-full px-10 lg:px-44 my-3">
                <div className="relative rounded-2xl border-4 border-cherry-burgundy overflow-hidden shadow-[12px_12px_0px_#321017] transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-cherry-burgundy/30 to-transparent z-10 pointer-events-none"></div>

                  <VideoPlayer
                    src="https://storage.cherrybot.ai/cherryTrade.mp4"
                    className="w-full h-auto max-h-[60vh] object-cover"
                    autoPlay={true}
                  />

                  {/* Info Bar */}
                  <div className="absolute bottom-0 z-30 left-0 right-0 p-3 bg-cherry-cream/90 backdrop-blur-sm border-t-2 border-cherry-burgundy flex flex-col md:flex-row justify-between items-center gap-4">
                    <button
                      className="bg-cherry-red text-white   py-1 px-3 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2 whitespace-nowrap"
                      onClick={() =>
                        window.open(
                          "https://docs.cherrybot.co/cherry-trade",
                          "_blank"
                        )
                      }
                    >
                      <span className="text-cherry-cream">Learn More</span>
                      <Icon
                        className="text-cherry-cream"
                        icon="mdi:book-open-variant"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4">
                {/* Instant Swap Card */}
                <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 transform hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-cherry-red rounded-full mb-4">
                    <Icon
                      icon="mdi:flash-outline"
                      className="text-cherry-cream"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="winky-sans-font text-xl   text-cherry-burgundy mb-3">
                    Instant Swap Execution
                  </h3>
                  <p className="winky-sans-font text-cherry-burgundy/80">
                    Execute trades with unparalleled speed and precision.
                  </p>
                </div>

                {/* Real-Time Analytics Card */}
                <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 transform hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-cherry-red rounded-full mb-4">
                    <Icon
                      icon="mdi:chart-areaspline"
                      className="text-cherry-cream"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="winky-sans-font text-xl   text-cherry-burgundy mb-3">
                    Real-Time Analytics
                  </h3>
                  <p className="winky-sans-font text-cherry-burgundy/80">
                    Monitor market trends and your portfolio in real-time.
                  </p>
                </div>

                {/* Reward System Card */}
                <div className="bg-cherry-cream rounded-xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] p-6 transform hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-cherry-red rounded-full mb-4">
                    <Icon
                      icon="mdi:gift-outline"
                      className="text-cherry-cream"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="winky-sans-font text-xl   text-cherry-burgundy mb-3">
                    Reward System
                  </h3>
                  <p className="winky-sans-font text-cherry-burgundy/80">
                    Earn points and unlock exclusive rewards as you trade.
                  </p>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <div className="feature-tag px-6 py-3 bg-cherry-cream rounded-full border-2 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] flex items-center gap-2  transition-all duration-200">
                  <Icon
                    icon="mdi:robot"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  <span className="winky-sans-font font-medium text-cherry-burgundy">
                    AI Trading Bots
                  </span>
                </div>
                <div className="feature-tag px-6 py-3 bg-cherry-cream rounded-full border-2 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] flex items-center gap-2  transition-all duration-200">
                  <Icon
                    icon="mdi:chart-line"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  <span className="winky-sans-font font-medium text-cherry-burgundy">
                    Advanced Analytics
                  </span>
                </div>
                <div className="feature-tag px-6 py-3 bg-cherry-cream rounded-full border-2 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] flex items-center gap-2  transition-all duration-200">
                  <Icon
                    icon="mdi:security"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  <span className="winky-sans-font font-medium text-cherry-burgundy">
                    Secure Trading
                  </span>
                </div>
                <div className="feature-tag px-6 py-3 bg-cherry-cream rounded-full border-2 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] flex items-center gap-2  transition-all duration-200">
                  <Icon
                    icon="mdi:swap-horizontal"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  <span className="winky-sans-font font-medium text-cherry-burgundy">
                    Multi-chain Support
                  </span>
                </div>
                <div className="feature-tag px-6 py-3 bg-cherry-cream rounded-full border-2 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] flex items-center gap-2  transition-all duration-200">
                  <Icon
                    icon="mdi:flash"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  <span className="winky-sans-font font-medium text-cherry-burgundy">
                    Real-time Alerts
                  </span>
                </div>
                <div className="feature-tag px-6 py-3 bg-cherry-cream rounded-full border-2 border-cherry-burgundy shadow-[4px_4px_0px_#5d4037] flex items-center gap-2  transition-all duration-200">
                  <Icon
                    icon="mdi:wallet"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  <span className="winky-sans-font font-medium text-cherry-burgundy">
                    DeFi Integration
                  </span>
                </div>
              </div>
              <div className="w-full flex mt-20 items-center justify-center">
                <button
                  onClick={() => {
                    document
                      .getElementById("newsletter-signup-trade")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-cherry-red text-white   py-3 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center justify-center gap-2"
                >
                  <span className="text-cherry-cream">
                    Stay Ahead of the Curve – Launching Soon
                  </span>
                  <Icon
                    className="text-cherry-cream"
                    icon="mdi:bell"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {/* Newsletter signup */}
              <div
                id="newsletter-signup-trade"
                className="mt-16 p-8 bg-cherry-cream rounded-2xl border-4 border-cherry-burgundy shadow-[8px_8px_0px_#5d4037] relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cherry-red opacity-10 rounded-full"></div>

                <h3 className="winky-sans-font text-2xl text-cherry-burgundy   mb-4 text-center">
                  Get Early Access
                </h3>
                <p className="winky-sans-font text-cherry-burgundy mb-6 text-center">
                  Be the first to know when Cherry Trade launches.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow py-3 px-4 rounded-xl border-2 border-cherry-burgundy focus:ring-2 focus:ring-cherry-red focus:outline-none"
                  />
                  <button
                    onClick={() => handleNewsletterSubscribe(email)}
                    disabled={isSubscribing}
                    className="bg-cherry-red text-white   py-3 px-8 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-cherry-cream">
                      {isSubscribing ? "Subscribing..." : "Join Early Access"}
                    </span>
                    <Icon
                      icon={isSubscribing ? "mdi:loading" : "mdi:arrow-right"}
                      width={20}
                      height={20}
                      className={`text-cherry-cream ${
                        isSubscribing ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CherrySniper;
