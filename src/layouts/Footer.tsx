import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#cbb997]  footer  rounded-2xl  mx-auto relative py-12  overflow-hidden">
      <div className="  mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://storage.cherrybot.ai/eat_cherry.svg"
            loading="lazy"
            alt="Cherry mascot"
            className="w-64 h-64 mb-8 animate-float"
          />

          <div className="   bg-cherry-cream rounded-lg border-4 border-cherry-burgundy shadow-[6px_6px_0px_#5d4037] p-6 relative mb-8 max-w-xl w-full transform rotate-1">
            <h3 className="text-center winky-sans-font text-2xl md:text-5xl font-bold text-cherry-burgundy mb-6">
              Connect With Us
            </h3>

            <div className="grid grid-cols-4 gap-1 place-items-center">
              <button
                onClick={() => {
                  window.open("https://t.me/cherrycommunity", "_blank");
                }}
                className="w-14 h-14 flex items-center justify-center bg-cherry-red rounded-full border-2 border-cherry-burgundy hover:bg-cherry-burgundy transition-all duration-300 transform hover:scale-110 hover:-rotate-6 shadow-[3px_3px_0px_#321017]"
                aria-label="Telegram Community"
              >
                <Icon
                  icon="ic:baseline-telegram"
                  className="w-8 h-8 text-white"
                />
              </button>
              <button
                onClick={() => {
                  window.open("https://x.com/cherrytgbot", "_blank");
                }}
                className="w-14 h-14 flex items-center justify-center bg-cherry-red rounded-full border-2 border-cherry-burgundy hover:bg-cherry-burgundy transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-[3px_3px_0px_#321017]"
                aria-label="Twitter"
              >
                <Icon icon="mdi:twitter" className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={() => {
                  window.open("https://t.me/CherryTGBot", "_blank");
                }}
                className="w-14 h-14 flex items-center justify-center bg-cherry-red rounded-full border-2 border-cherry-burgundy hover:bg-cherry-burgundy transition-all duration-300 transform hover:scale-110 hover:-rotate-6 shadow-[3px_3px_0px_#321017]"
                aria-label="Cherry Bot"
              >
                <Icon icon="mdi:robot" className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={() => {
                  window.open("https://t.me/cherrytrending", "_blank");
                }}
                className="w-14 h-14 flex items-center justify-center bg-cherry-red rounded-full border-2 border-cherry-burgundy hover:bg-cherry-burgundy transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-[3px_3px_0px_#321017]"
                aria-label="Cherry Trending"
              >
                <Icon icon="mdi:chart-line" className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          {/* Copyright text */}
          <div className="winky-sans-font mt-7 text-cherry-burgundy text-center relative">
            COPYRIGHT © 2025. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
