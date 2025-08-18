import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[var(--color-glass)] backdrop-blur-xl border border-[var(--color-glass-border)] rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[var(--color-glass-border)]">
              <h3 className="maladroit-font text-lg sm:text-xl text-[var(--color-text-primary)] flex items-center gap-2">
                <Icon
                  icon="ph:medal-bold"
                  width={24}
                  height={24}
                  className="text-[var(--color-accent)]"
                />
                Achievement Levels
              </h3>
              <button
                onClick={onClose}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <Icon icon="mdi:close" width={24} height={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto">
              <div className="mb-4">
                <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm mb-3">
                  Unlock achievements by reaching trading volume milestones.
                  Each level grants bonus points and exclusive rewards.
                </p>
              </div>

              {/* Achievement List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {[
                  {
                    name: "Bronze",
                    img: "Bronze.png",
                    volume: "$1,000",
                    points: "+50 Points",
                    delay: 0.1,
                  },
                  {
                    name: "Silver",
                    img: "Silver.png",
                    volume: "$5,000",
                    points: "+200 Points",
                    delay: 0.2,
                  },
                  {
                    name: "Gold",
                    img: "Gold.png",
                    volume: "$10,000",
                    points: "+500 Points",
                    delay: 0.3,
                  },
                  {
                    name: "Platinum",
                    img: "Platinum.png",
                    volume: "$50,000",
                    points: "+1,500 Points",
                    delay: 0.4,
                  },
                  {
                    name: "Diamond",
                    img: "Diamond.png",
                    volume: "$100,000",
                    points: "+3,500 Points",
                    delay: 0.5,
                  },
                  {
                    name: "Ruby",
                    img: "Ruby.png",
                    volume: "$250,000",
                    points: "+8,000 Points",
                    delay: 0.6,
                  },
                  {
                    name: "Emerald",
                    img: "Emerald.png",
                    volume: "$500,000",
                    points: "+20,000 Points",
                    delay: 0.7,
                  },
                  {
                    name: "Legendary",
                    img: "Legendary.png",
                    volume: "$1,000,000+",
                    points: "+50,000 Points",
                    delay: 0.8,
                  },
                ].map((ach) => (
                  <motion.div
                    key={ach.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ach.delay, duration: 0.3 }}
                    className="bg-[var(--color-glass)] rounded-lg border border-[var(--color-glass-border)] p-3 sm:p-4 transition-all duration-200 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-0"
                  >
                    <img
                      src={`https://storage.cherrybot.ai/${ach.img}`}
                      alt={`${ach.name} Badge`}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain sm:mb-2"
                    />
                    <div className="flex-grow text-left sm:text-center">
                      <h4 className="winky-sans-font text-[var(--color-text-primary)] font-bold sm:mb-1">
                        {ach.name}
                      </h4>
                      <p className="winky-sans-font text-[var(--color-text-secondary)] text-sm sm:mb-2">
                        {ach.volume} Volume
                      </p>
                    </div>
                    <span className="winky-sans-font text-[var(--color-accent)] font-bold">
                      {ach.points}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="mt-4 p-3 bg-[var(--color-glass)] rounded-lg border border-[var(--color-glass-border)]"
              >
                <h5 className="winky-sans-font text-[var(--color-text-primary)] font-bold mb-2">
                  How It Works:
                </h5>
                <div className="space-y-1 text-sm">
                  <p className="winky-sans-font text-[var(--color-text-secondary)]">
                    • Each achievement unlocks immediately when you reach the
                    volume threshold
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)]">
                    • Bonus points are awarded once per achievement level
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)]">
                    • Higher achievements unlock exclusive rewards and benefits
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)]">
                    • Every $10 in volume = +1 point
                  </p>
                  <p className="winky-sans-font text-[var(--color-text-secondary)]">
                    • Top users by points win Cherry Airdrop and bot revenue
                    rewards
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementsModal;
