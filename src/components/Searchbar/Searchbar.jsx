import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosCommon from "@/Hooks/useAxiosCommon";

const Searchbar = () => {
  const axiosCommon = useAxiosCommon()
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Searchbar component
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosCommon(`/search`, {
          params: {
            name: searchQuery,
          },
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch search results");
        }

        const searchResults = response.data;
        if (searchResults.length > 0) {
          const firstResultId = searchResults[0]._id;
          navigate(`/camp/${firstResultId}`);
          setSearchQuery("")
        } else {
          console.log("No search results found");
        }
      } catch (err) {
        setError("Failed to fetch search results");
        console.error("Error fetching search results:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (
    <div className="max-w-sm">
      <form onSubmit={handleSubmit} className="relative max-w-sm">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border-0 bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-sky-400 focus:pl-16 focus:pr-4 focus:border"
          placeholder="Search here..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 my-auto h-8 w-12 border-r-0 stroke-gray-500 px-3.5 peer-focus:border-sky-400 peer-focus:stroke-sky-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Searchbar;
