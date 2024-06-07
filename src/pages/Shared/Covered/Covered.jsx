import React from 'react';
import { Parallax } from 'react-parallax';

const Covered = ({ img, title, description }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="our camp"
      strength={-200}
    >
      <div className="hero md:h-96 lg:h-[450px] xl:h-[550px] bg-cover bg-no-repeat">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content bg-[#15151599] p-16 rounded-xl">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5">{description}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Covered;