import React from "react";

const BannerCard = ({ icon: Icon, heading, message }) => {
  return (
    <div className="flex items-center justify-center md:h-96">
      <div className="w-full h-full max-w-sm bg-[#1E2036] text-white shadow p-3 sm:p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-gray-900 dark:text-white">
          <Icon className="text-white text-7xl" />
        </div>
        <div>
          <h3 className="text-2xl text-center pt-2">{heading}</h3>
          <p className="pt-6 text-center line-clamp-3">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
