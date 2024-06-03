import React from 'react';
import aboutImg from "@/assets/images/abouts.jpg";

const AboutUs = () => {
  return (
    <div className="container mx-auto my-8 md:my-16">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        {/* left side */}
        <div className="md:w-1/2 md:space-y-12 space-y-4">
          <h2 className="text-3xl font-medium">About Us</h2>
          <p className='text-base text-gray-600'>
            Health Volunteers is an initiative designed to engage and mobilize
            volunteers to enhance their capacity, take action, and effectively
            engage individuals and stakeholders. Our goal is to raise awareness
            and educate communities on various health issues through diverse and
            impactful methods.
          </p>
          <button className="btn w-[70%] bg-sky-400 text-white font-medium outline-none border-none hover:bg-sky-800">
            Learn More
          </button>
        </div>
        {/* right side */}
        <div>
          <img src={aboutImg} alt="Camping"  className='w-full h-full object-cover'/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;