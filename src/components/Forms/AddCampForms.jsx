import React from 'react';
import { categories } from '../CategoryBox/CategoryData';

import ImageUpload from '../CustomFileUploads/CustomFileUploads';
import { RiLoader3Fill } from "react-icons/ri";
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";


const AddCampForms = ({
  handleDates,
  dates,
  handleSubmit,
  loading,
  filesToUpload,
  setFilesToUpload,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md"
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-sky-300 focus:outline-sky-500 rounded-md"
                name="category"
              >
                {categories?.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="dateTime" className="block text-gray-600">
                Select Availability Range
              </label>
              <DateRange
                rangeColors={["#4CBDF8"]}
                editableDateInputs={true}
                onChange={(item) => handleDates(item)}
                moveRangeOnFirstSelection={false}
                ranges={[dates]}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md"
                name="location"
                id="location"
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <div className="">
              <ImageUpload
                filesToUpload={filesToUpload}
                setFilesToUpload={setFilesToUpload}
              />
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="fees" className="block text-gray-600">
                  Fees
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md"
                  name="fees"
                  id="fees"
                  type="number"
                  placeholder="Fees"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label
                  htmlFor="healthcareProfessional"
                  className="block text-gray-600"
                >
                  Professor Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md"
                  name="healthcareProfessional"
                  id="healthcareProfessional"
                  type="text"
                  placeholder="Professor Name"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="participantCount"
                  className="block text-gray-600"
                >
                  Participant Count
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md"
                  name="participantCount"
                  id="participantCount"
                  type="number"
                  placeholder="254"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="rating" className="block text-gray-600">
                  Rating
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md"
                  name="rating"
                  id="rating"
                  defaultValue={0}
                  type="number"
                  placeholder="4.5"
                  step="0.1"
                  min="0"
                  max="5"
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500"
                name="description"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-sky-400"
        >
          {loading ? (
            <RiLoader3Fill className="m-auto animate-spin" size={24} />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCampForms;