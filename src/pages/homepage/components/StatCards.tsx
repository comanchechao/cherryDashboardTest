import React from "react";

interface StatCard {
  value: string;
  label: string;
}

interface StatCardsProps {
  title: string;
  stats: StatCard[];
  className?: string;
  id?: string;
}

const StatCards: React.FC<StatCardsProps> = ({
  title,
  stats,
  className = "",

  id,
}) => {
  return (
    <div
      id={id}
      className={`flex flex-col h-full gap-16 items-center justify-center w-full md:px-0 px-8 relative ${className}`}
    >
      {/* Floating Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-64 h-64 border border-[#4367c9]/12 rounded-full animate-spin-slow"
            style={{ animationDuration: "45s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#4367c9]/8 rounded-full animate-spin-slow"
            style={{
              animationDirection: "reverse",
              animationDuration: "38s",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-10 left-1/3 w-2.5 h-2.5 bg-[var(--color-accent)]/40 rounded-full animate-float"></div>
        <div
          className="absolute top-20 right-1/4 w-3 h-3 bg-[var(--color-accent)]/35 rounded-full animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-10 left-1/4 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[var(--color-accent)]/25 rounded-full animate-float-slow"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Main Title */}
      <h2 className="transform translate-y-8 text-center maladroit-font text-xl lg:text-5xl text-[var(--color-text-primary)] !mb-16 relative z-10 max-w-6xl">
        {title}
        <div className="absolute -bottom-5 left-1/2  transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/80 to-[var(--color-accent)]/60 rounded-full"></div>
      </h2>

      {/* Modular Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl mx-auto relative z-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-accent)] mb-2 group-hover:text-[var(--color-accent)]/90 transition-colors duration-300">
              {stat.value}
            </div>
            <div className="text-sm lg:text-base font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <linearGradient
            id="titleConnectionGradient"
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
          stroke="url(#titleConnectionGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M50 100 Q 150 80 250 100 T 450 100"
          stroke="url(#titleConnectionGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "0.7s" }}
        />
      </svg>
    </div>
  );
};

export default StatCards;
