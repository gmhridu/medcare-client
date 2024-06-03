import BannerCard from "@/components/BannerCard/BannerCard";
import OurPricipalsCard from "@/components/OurPricipalsCard/OurPricipalsCard";
import TextAnimation from "@/components/TextAnimation/TextAnimation";
import React from "react";

const OurPrincipals = () => {
  return (
    <div className="bg-[#EBF5F5]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-medium py-20 text-center">
            Our Principals
          </h1>
          <div>
            <TextAnimation />
          </div>
        </div>
        <div className="py-32 md:mx- lg:mx-36 grid md:grid-cols-3 grid-cols-1 gap-1">
          <OurPricipalsCard
            heading={"LEARN."}
            paragraph={
              "Know and build your capacity in public health through volunteering."
            }
          />
          <OurPricipalsCard
            heading={"ACT."}
            paragraph={
              "Take actions to create a healthy world and be part of a dynamic and expert community"
            }
          />
          <OurPricipalsCard
            heading={"ENGAGE."}
            paragraph={
              "Share and create a ripple effect in your society by being an agent of change"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OurPrincipals;
