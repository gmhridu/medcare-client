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
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const CampCard = ({ camp, isLoading }) => {
  const imageUrl = Array?.isArray(camp?.images)
    ? camp?.images[0]?.secure_url
    : camp?.images;

  const date = new Date(camp?.dateTime);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  return (
    <Link to={`/camp/${camp?._id}`}>
      <div className="h-96">
        <MaterialCard className="mt-6 w-full h-full">
          <CardHeader
            color="blue-gray"
            className="relative h-52 overflow-hidden"
          >
            <img
              src={imageUrl}
              alt="card-image"
              className="w-full h-full object-cover"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
              <div className="flex items-center gap-x-1">
                <Rating
                  name="read-only"
                  value={camp?.averageRating || "0"}
                  precision={0.5}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
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
            <Button className="w-full bg-[#0EA5E9]">Camp Details</Button>
          </CardFooter>
        </MaterialCard>
      </div>
    </Link>
  );
};

export default CampCard;
