import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./Banner.css";

const img1 =
  "https://i.postimg.cc/RCcQbSMy/i-RWy-CEfe-QGi-XLh-Yb-CFAd9e-HRBseh-L1-C646-RJ2k-QHKydy-Zg58ehcm-F7nh34iz-Ye81fklq-Yumdw4-YGMo-BSg-N1rrjs-Hfn-OLEbx53.webp";
const img2 = "https://i.postimg.cc/LXZKMqyz/camping2.webp";
const img3 = "https://i.postimg.cc/g07F5yKz/camping3.jpg";
const img4 = "https://i.postimg.cc/CK5pmrkr/capming-4.jpg";
const img5 = "https://i.postimg.cc/W1XPmcFJ/campin5.jpg";

const Banner = () => {
  return (
    <Carousel
      className="carousel"
      autoPlay
      autoFocus
      interval={3000}
      infiniteLoop
      showStatus={false}
    >
      <div className="md:h-96 lg:h-[450px] xl:h-[550px] h-full relative">
        <img src={img1} className="h-full w-full" alt="Camping 1" />
        <div className="overlay flex flex-col">
          <p className="message">"Renew Your Spirit in Nature"</p>
          <button className="btn bg-sky-400 text-white font-medium outline-none border-none hover:bg-sky-800">
            Participate Now
          </button>
        </div>
      </div>
      <div className="md:h-96 lg:h-[450px] xl:h-[550px] h-full relative">
        <img src={img2} className="h-full w-full" alt="Camping 2" />
        <div className="overlay flex flex-col">
          <p className="message">"Healing Begins Outdoors"</p>
          <button className="btn bg-sky-400 text-white font-medium outline-none border-none hover:bg-sky-800">
            Participate Now
          </button>
        </div>
      </div>
      <div className="md:h-96 lg:h-[450px] xl:h-[550px] h-full relative">
        <img src={img3} className="h-full w-full" alt="Camping 3" />
        <div className="overlay flex flex-col">
          <p className="message">"Discover Health in the Wilderness"</p>
          <button className="btn bg-sky-400 text-white font-medium outline-none border-none hover:bg-sky-800">
            Participate Now
          </button>
        </div>
      </div>
      <div className="md:h-96 lg:h-[450px] xl:h-[550px] h-full relative">
        <img src={img4} className="h-full w-full" alt="Camping 4" />
        <div className="overlay flex flex-col">
          <p className="message">"Experience Nature's Healing Power"</p>
          <button className="btn bg-sky-400 text-white font-medium outline-none border-none hover:bg-sky-800">
            Participate Now
          </button>
        </div>
      </div>
      <div className="md:h-96 lg:h-[450px] xl:h-[550px] h-full  relative">
        <img src={img5} className="h-full w-full" alt="Camping 5" />
        <div className="overlay flex flex-col">
          <p className="message">"Join Us for a Healing Journey"</p>
          <button className="btn bg-sky-400 text-white font-medium outline-none border-none hover:bg-sky-800">
            Participate Now
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
