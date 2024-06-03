import BannerCard from '@/components/BannerCard/BannerCard';
import { GiStairsGoal } from "react-icons/gi";
import { SlBookOpen } from "react-icons/sl";
import { FaUsers } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";


import React from 'react';

const OurVision = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        <BannerCard
          icon={GiStairsGoal}
          heading={"Mission"}
          message={
            "Be part of a mission to create a healthy world for everyone."
          }
        />
        <BannerCard
          icon={SlBookOpen}
          heading={"Learn"}
          message={
            "Get opportunities for engagement and learnings with International organizations working in the health sector"
          }
        />
        <BannerCard
          icon={FaUsers}
          heading={"Community"}
          message={
            "Be part of a like minded community of experts and learners from pan india"
          }
        />
        <BannerCard
          icon={GrCertificate}
          heading={"Get Certified"}
          message={
            "Your volunteering efforts will be acknowledged with certificates, badges and volunteering grant"
          }
        />
      </div>
    </div>
  );
};

export default OurVision;