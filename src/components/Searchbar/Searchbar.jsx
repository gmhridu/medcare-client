import { Search } from 'lucide-react';
import React from 'react';

const Searchbar = () => {
  const handleSubmit = e => {
    e.preventDefault();
  }
  return (
    <div className="max-w-sm">
      <form onSubmit={handleSubmit} className="relative max-w-sm">
        <input
          type="search"
          className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border-0 bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-sky-400 focus:pl-16 focus:pr-4 focus:border"
          placeholder='Search here...'
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
    </div>
  );
};

export default Searchbar;