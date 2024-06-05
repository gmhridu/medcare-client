import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <Card className="mt-6 w-full h-full max-w-sm animate-pulse">
      <CardHeader
        shadow={false}
        floated={false}
        className="relative h-56 bg-gray-300"
      >
        <Skeleton height="100%" />
      </CardHeader>
      <CardBody>
        <Typography
          as="div"
          variant="h5"
          className="mb-4 h-6 w-3/4 rounded-full bg-gray-300"
        >
          <Skeleton width="60%" />
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-4 w-full rounded-full bg-gray-300"
        >
          <Skeleton width="80%" />
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-4 w-full rounded-full bg-gray-300"
        >
          <Skeleton width="90%" />
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-4 w-full rounded-full bg-gray-300"
        >
          <Skeleton width="90%" />
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-4 w-full rounded-full bg-gray-300"
        >
          <Skeleton width="90%" />
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          disabled
          tabIndex={-1}
          className="h-10 w-full bg-gray-300 shadow-none hover:shadow-none"
        >
          <Skeleton width="100%" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
