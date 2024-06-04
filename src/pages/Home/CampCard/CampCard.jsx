import {
  Button,
  Card as MaterialCard,
  CardFooter,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { CiLocationOn } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
  const imageUrl = Array?.isArray(camp?.images)
    ? camp?.images[0].secure_url
    : camp?.images;
  
  const date = new Date(camp?.dateTime);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });


  return (
    <Link to={`/camp/${camp?._id}`}>
      <MaterialCard className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={imageUrl}
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" className="text-xl font-bold">
            {camp?.healthcareProfessional}
          </Typography>
          <Typography
            variant="p"
            className="text-base text-[#6C6B6B] font-normal mb-4"
          >
            {camp?.category &&
              camp?.category.charAt(0).toUpperCase() +
                camp?.category.slice(1)}{" "}
            Specialist
          </Typography>
          <div className="space-y-1">
            <Typography className="flex space-x-3 items-center  text-base text-[#6C6B6B] font-normal">
              <CiLocationOn />
              <span>{camp?.location}</span>
            </Typography>
            <Typography className="flex space-x-3 items-center  text-base text-[#6C6B6B] font-normal">
              <MdDateRange />
              <span>{formattedDate}</span>
            </Typography>
            <Typography className="flex space-x-3 items-center  text-base text-[#6C6B6B] font-normal">
              <AiOutlineDollar />
              <span>$ {camp?.fees}</span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="w-full">Camp Details</Button>
        </CardFooter>
      </MaterialCard>
    </Link>
  );
};

export default CampCard;
