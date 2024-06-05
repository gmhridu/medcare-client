import Heading from "@/pages/Shared/Heading";
import CampCard from "../CampCard/CampCard";
import { useMediaQuery } from "react-responsive";
import useCampsPagination from "@/Hooks/useCampsPagination";
import { useEffect, useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import Loader from "@/pages/Shared/Loader/Loader";
import CardSkeleton from "@/pages/Shared/CardSkeleton/CardSkeleton";

const CampsCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });

  let itemsPerPage = 4;

  if (isSmallScreen) {
    itemsPerPage = 6;
  } else if (isMediumScreen) {
    itemsPerPage = 6;
  } else if (isLargeScreen) {
    itemsPerPage = 8;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: { camps = [], count = 0 } = {},
    isLoading,
    isFetched,
    isPending,
    isFetching,
    isSuccess,
  } = useCampsPagination(currentPage, itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(count / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  console.log(camps);

  if (isLoading || isFetching || isPending || showSkeleton) {
    return (
      <div className="container mx-auto my-10">
        <div>
          <h1 className="text-3xl text-center font-semibold">
            Our Popular Camps
          </h1>
        </div>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (isFetched || isSuccess) {
    return (
      <div className="container mx-auto my-10">
        <div>
          <h1 className="text-3xl text-center font-semibold">
            Our Popular Camps
          </h1>
        </div>
        {camps.length > 0 ? (
          <div>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {camps.map((camp) => (
                <CampCard key={camp._id} camp={camp} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#E4E4E4",
                    },
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#4CBDF8",
                    color: "#fff",
                    border:"none",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
            <Heading
              center={true}
              title="No Camp Available In This Category!"
              subtitle="Please Select Other Categories."
            />
          </div>
        )}
      </div>
    );
  }
};

export default CampsCard;
