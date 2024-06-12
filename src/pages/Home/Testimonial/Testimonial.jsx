import useAxiosCommon from '@/Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import React from 'react';
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const Testimonial = () => {
  const axiosCommon = useAxiosCommon()

  const { data: reviews  = []} = useQuery({
    queryKey: ["reviews"],
    queryFn: async() => {
      const { data } = await axiosCommon.get("/joinCamp");
      return data;
    }
  });



  const filteredReviews = reviews
    .filter((review) => review?.rating > 0)
    .slice(0, 6);

  return (
    <section className="container mx-auto my-12">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {filteredReviews?.map((review) => (
          <SwiperSlide key={review?._id}>
            <div className="mx-24 flex flex-col items-center justify-center space-y-2 my-12">
              <Rating
                name="read-only"
                value={review?.rating}
                precision={0.5}
                readOnly
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <p className="text-lg font-normal text-center">
                {review?.ratingText}
              </p>
              <h3 className="text-[#CD9003] font-medium text-xl text-center pt-2">
                {review?.participantName}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;