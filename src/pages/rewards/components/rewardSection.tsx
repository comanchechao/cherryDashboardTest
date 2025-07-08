import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface RewardSectionProps {
  toastVisible: boolean;
  setToastVisible: (visible: boolean) => void;
  successToastVisible: boolean;
  setSuccessToastVisible: (visible: boolean) => void;
  alreadySubscribedToastVisible: boolean;
  setAlreadySubscribedToastVisible: (visible: boolean) => void;
  showAchievementsModal: boolean;
  setShowAchievementsModal: (show: boolean) => void;
  handleTrade: () => void;
  copyToClipboard: (text: string) => void;
  userAchievement: {
    badge: string;
    level: number;
    points: number;
    volume: string;
    nextBadge: string;
    nextVolume: string;
    nextPoints: number;
    progress: number;
  };
}

const RewardSection: React.FC<RewardSectionProps> = ({
  toastVisible,
  successToastVisible,
  alreadySubscribedToastVisible,
  setShowAchievementsModal,
  handleTrade,
  copyToClipboard,
  userAchievement,
}) => {
  return (
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

      {/* Wallet Section */}
      <div className="bg-cherry-cream rounded-2xl border-4 border-[#111929] overflow-hidden shadow-[8px_8px_0px_#111929] relative mb-8">
        {/* Header */}
        <div className="bg-black px-6 py-4">
          <h3 className="maladroit-font text-2xl text-cherry-cream flex items-center gap-2">
            <Icon
              icon="solar:card-bold"
              width={28}
              height={28}
              className="text-cherry-cream"
            />
            Rewards Dashboard
          </h3>
        </div>

        {/* Wallet Content */}
        <div className="p-6">
          <div className="flex items-center w-full mb-3 justify-start gap-3">
            <button className="bg-cherry-red   py-2 px-6 rounded-xl border border-b-4 border-r-4 border-cherry-burgundy hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu flex items-center gap-2 shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017]">
              <span className="winky-sans-font text-cherry-cream">Logout</span>
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
              <span className="winky-sans-font text-cherry-cream">TRADE</span>
              <Icon
                icon="duo-icons:coin-stack"
                width={20}
                height={20}
                className="text-cherry-cream"
              />
            </button>
          </div>
          <div className="  p-2   ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy  p-4 mb-6">
                  <label className="winky-sans-font text-cherry-burgundy font-medium mb-2 block">
                    Your Referral Link
                  </label>
                  <div className="flex lg:flex-row flex-col  gap-2">
                    <div className="flex-1 bg-cherry-cream border-2 border-cherry-burgundy rounded-lg px-3 py-2 font-mono text-sm text-cherry-burgundy relative overflow-hidden">
                      <div className="absolute inset-0 referral-shimmer"></div>
                      <span className="relative z-10">
                        https://t.me/CherrySniperBot?start=ref_GihKTmp
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        copyToClipboard(
                          "https://t.me/CherrySniperBot?start=ref_GihKTmp"
                        )
                      }
                      className="bg-cherry-red text-white px-4 py-2 rounded-lg border border-b-4 border-r-4 border-cherry-burgundy transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] winky-sans-font flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:content-copy"
                        width={18}
                        height={18}
                        className="text-cherry-cream"
                      />
                      <span className="text-cherry-cream">Copy</span>
                    </motion.button>
                  </div>
                </div>
                <div className="bg-cherry-cream rounded-lg border-2 border-cherry-burgundy  p-4 mb-6 flex flex-col">
                  <label className="winky-sans-font text-cherry-burgundy font-medium mb-2 block">
                    Your Wallet Address
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="winky-sans-font text-cherry-burgundy">
                      W1
                    </span>
                    <div
                      className="flex-1 bg-cherry-cream border-2 border-cherry-burgundy rounded-lg px-3 py-2 font-mono text-sm text-cherry-burgundy hover:bg-cherry-burgundy hover:bg-opacity-10 cursor-pointer transition-colors flex items-center relative overflow-hidden"
                      onClick={() =>
                        copyToClipboard(
                          "GihKTmpw8rUFaoYn55vvAgvpXCLfPuDrMGuqg1ZJxXHm"
                        )
                      }
                    >
                      <span className="truncate md:w-auto w-32 relative z-10">
                        GihKTmpw8rUFaoYn55vvAgvpXCLfPuDrMGuqg1ZJxXHm
                      </span>
                      <span className="ml-2 text-xs text-cherry-burgundy opacity-70 relative z-10">
                        (Tap to copy)
                      </span>
                      <div className="absolute inset-0 referral-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement System */}
          <div className="bg-cherry-cream rounded-xl border-2 border-cherry-burgundy p-5 relative">
            <div className="flex items-center justify-center w-full">
              {/* Left side - Current Achievement */}
              <div className="w-full">
                <h4 className="maladroit-font text-xl text-cherry-burgundy mb-3 flex items-center gap-2">
                  <Icon
                    icon="ph:trophy-bold"
                    className="text-cherry-red"
                    width={24}
                    height={24}
                  />
                  Your Achievement Progress
                </h4>

                <div className="bg-cherry-cream rounded-lg p-5     mb-4">
                  <div className="flex justify-center items-center flex-col">
                    <div className="w-24 h-24 bg-cherry-cream rounded-full border-4 border-cherry-burgundy flex items-center justify-center mb-3 relative">
                      <img
                        src={`https://storage.cherrybot.ai/${userAchievement.badge}.png`}
                        alt="Diamond Badge"
                        className="w-20 h-20 object-contain animate-pulse-slow"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-cherry-red rounded-full flex items-center justify-center border-2 border-cherry-burgundy">
                        <span className="winky-sans-font text-xs text-white">
                          {userAchievement.level}
                        </span>
                      </div>
                    </div>
                    <p className="winky-sans-font text-[#111929] text-center mb-1">
                      {userAchievement.badge} Level Achieved!
                    </p>
                    <p className="winky-sans-font text-[#111929] text-opacity-70 text-sm text-center">
                      {userAchievement.volume} trading volume reached
                    </p>

                    {/* Progress to next level */}
                    <div className="w-full mt-4">
                      <div className="flex justify-between items-center winky-sans-font text-sm text-[#111929] mb-2">
                        <span>Progress to {userAchievement.nextBadge}</span>
                        <span>{userAchievement.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-cherry-cream border border-cherry-burgundy rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cherry-red"
                          style={{
                            width: `${userAchievement.progress}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center winky-sans-font text-xs text-cherry-burgundy mt-1 opacity-70">
                        <span>Current: {userAchievement.volume}</span>
                        <span>Next: {userAchievement.nextVolume}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="  ">
                  {" "}
                  <motion.button
                    whileHover={{
                      y: -2,
                      boxShadow: "6px 6px 0px #321017",
                    }}
                    onClick={() => setShowAchievementsModal(true)}
                    className="bg-cherry-red !my-2 text-white px-2 py-1 rounded-xl border border-b-2 border-r-2 border-cherry-burgundy    transition-all duration-200 transform-gpu shadow-[2px_2px_0px_#321017]   winky-sans-font flex items-center gap-2"
                  >
                    <Icon
                      icon="mdi:information"
                      width={20}
                      height={20}
                      className="text-cherry-cream"
                    />
                    <span className="text-cherry-cream text-xs">
                      Learn More about the achievement system
                    </span>
                  </motion.button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardSection;
