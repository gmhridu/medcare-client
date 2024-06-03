import React from 'react';

const OurPricipalsCard = ({heading, paragraph}) => {
  return (
    <div className="flex items-center justify-center md:h-80">
      <div className="w-full h-full max-w-xs bg-[#045484] text-white shadow p-3 sm:p-10 flex flex-col items-center justify-center">
        <div className="">
          <h3 className="text-center text-[#FF6161] text-4xl font-medium">
            {heading}
          </h3>
        </div>
        <div>
          <p className="pt-6 text-center line-clamp-3">
            {paragraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPricipalsCard;