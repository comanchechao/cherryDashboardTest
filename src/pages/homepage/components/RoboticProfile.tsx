import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";

const RoboticProfile: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      image: "/firstSlide.png",
    },
    {
      id: 2,
      image: "/secondSlide.png",
    },
    {
      id: 3,
      image: "/thirdSlide.png",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="robotic-profile-section relative w-full py-20 mt-16 md:mt-8 bg-opacity-80 overflow-hidden">
      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-88 h-88 border border-[#4367c9]/22 rounded-full animate-spin-slow"
            style={{ animationDuration: "35s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#4367c9]/17 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "30s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--color-accent)]/20 rounded-full animate-float pointer-events-none"></div>
        <div
          className="absolute bottom-24 left-10 w-24 h-24 bg-[var(--color-accent)]/20 rounded-full animate-float pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full rotate-45 animate-float pointer-events-none"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Connection Lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="roboticConnectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--color-accent)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--color-accent)"
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>
          <path
            d="M50 50 Q 150 30 250 50 T 450 50"
            stroke="url(#roboticConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50 100 Q 150 80 250 100 T 450 100"
            stroke="url(#roboticConnectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.7s" }}
          />
        </svg>
      </div>

      {/* Carousel Container */}
      <div className="max-w-7xl z-20 xl:max-w-[90rem] w-full mx-auto px-4">
        <div className="relative">
          {/* Carousel */}
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-[20px] h-fit bg-[var(--color-glass)] border border-[var(--color-glass-border)]"
          >
            <div className="flex transition-transform duration-500 ease-in-out">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  <div className="flex flex-col lg:flex-row items-start gap-12 p-8 lg:p-12">
                    {/* Left Panel - Static Content */}
                    <div className="lg:w-1/2 w-full">
                      <div className=" text-[var(--color-text-primary)] rounded-[20px] p-8 h-full flex flex-col justify-center">
                        <h3 className="maladroit-font text-2xl md:text-4xl   mb-6 text-center">
                          High Profile Backers of Robotics
                        </h3>
                        <p className="winky-sans-font text-sm md:text-lg   mb-6 leading-relaxed">
                          The global robotics market, projected to surpass $400
                          billion within the decade, is still constrained by
                          fragmented data, limited adaptability, and siloed
                          development. Emerging AI-driven robotics seeks to
                          break these barriers, creating machines that learn,
                          evolve, and collaborate at scale.
                        </p>
                        <p className="winky-sans-font text-sm md:text-lg   leading-relaxed">
                          Visionaries like Elon Musk, Jensen Huang, and
                          Masayoshi Son, alongside leading firms such as
                          SoftBank, Sequoia, and a16z, are fueling this
                          movement—backing pioneers like Boston Dynamics,
                          Agility, and Figure AI to redefine what robots can
                          achieve.
                        </p>
                      </div>
                    </div>

                    {/* Right Panel - Image Only */}
                    <div className="lg:w-1/2 w-full">
                      <div className="bg-black rounded-[20px] p-4 h-full flex flex-col justify-center">
                        <img
                          src={slide.image}
                          alt={`Robotic Profile Slide ${slide.id}`}
                          className="w-full h-auto rounded-[16px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Icon icon="mdi:chevron-left" className="text-2xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Icon icon="mdi:chevron-right" className="text-2xl" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[var(--color-accent)] scale-125"
                    : "bg-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoboticProfile;
