import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute w-10 h-10 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
      </div>
    </div>
  );
};

export default Loader;
