import React from "react";

const DataParse: React.FC = () => {
  return (
    <div className="w-full h-auto   p-20 bg-accent relative">
      <div className="absolute inset-0 top-20  h-[66rem] ">
        {" "}
        <img
          src="/dataParseBg.webp"
          alt="Data Parse Background"
          className="h-full       object-contain opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Data Parsing Tool V1 Section */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl  text-center font-semibold text-white mb-12">
            Data Parsing Tool V1
          </h1>

          <div className="flex text-center justify-center items-center">
            <img
              src="/parseImage.webp"
              alt="Data Parse Tool V1"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Data Parsing Tool Operation Flow Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-12">
            Data Parsing Tool Operation Flow
          </h2>

          <div className="flex text-center justify-center items-center">
            <img
              src="/parseImage2.webp"
              alt="Data Parse Tool V1"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataParse;
