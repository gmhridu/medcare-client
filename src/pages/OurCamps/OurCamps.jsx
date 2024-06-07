import React, { useEffect, useState } from "react";
import Categories from "../Home/Categories/Categories";
import { useSearchParams } from "react-router-dom";
import CampCard from "../Home/CampCard/CampCard";
import Heading from "../Shared/Heading";
import useCamps from "@/Hooks/useCamps";
import CardSkeleton from "../Shared/CardSkeleton/CardSkeleton";
import Covered from "../Shared/Covered/Covered";
import { Pagination } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const ourCampImg = "https://i.postimg.cc/g07F5yKz/camping3.jpg";

const OurCamps = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [params, setParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });

  const category = params.get("category");

  let itemsPerPage = 8;
  if (isSmallScreen || isMediumScreen) {
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
  } = useCamps(category, currentPage, itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(count / itemsPerPage);

  if (isLoading || isPending || isFetching || showSkeleton) {
    return (
      <>
        <div>
          <Covered
            img={ourCampImg}
            title={"Our Camp"}
            description={
              "Join our medical camps to gain hands-on experience and learn from experts in the field. These camps provide valuable training and knowledge for aspiring medical professionals. Enhance your skills and make a difference in healthcare."
            }
          />
        </div>
        <div>
          <Categories />
          <div className="container mx-auto">
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isFetched || isSuccess) {
    return (
      <>
        <div>
          <Covered
            img={ourCampImg}
            title={"Our Camp"}
            description={
              "Join our medical camps to gain hands-on experience and learn from experts in the field. These camps provide valuable training and knowledge for aspiring medical professionals. Enhance your skills and make a difference in healthcare."
            }
          />
        </div>
        <div>
          <Categories />
          <div className="container mx-auto">
            {camps && camps.length > 0 ? (
              <>
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
                        border: "none",
                      },
                    }}
                  />
                </div>
              </>
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
        </div>
      </>
    );
  }
};

export default OurCamps;
