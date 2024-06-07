import queryString from "query-string";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, title }) => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category");

  const navigate = useNavigate();
  const handleClick = () => {
    const currentQuery = { category: label };

    const url = queryString.stringifyUrl({
      url: "/our-camps/",
      query: currentQuery,
    });
    navigate(url);
  };

  return (
    <div className="container mx-auto">
      <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-1 p-2 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
          category === label && "border-b-neutral-800 text-neutral-800"
        }`}
      >
        <div className="text-lg font-medium">{title}</div>
      </div>
    </div>
  );
};

export default CategoryBox;
