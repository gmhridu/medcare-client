import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

const ManageCamps = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [toggleDropDown, setToggleDropDown] = useState(false)

  
  const { data: camps = [], 
    isLoading
  } = useQuery({
    queryKey: ['camps', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/camps/organizer/${user?.email}`);
      return data;
    },
  })

  console.log(camps)

  const handleToggle = () => {
    setToggleDropDown((isOpen) => !isOpen);
  }

  const closeToggle = () => {
    setToggleDropDown(false)
  }
  
  
  return (
    <>
      <div className="container mx-auto my-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Camp Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Camp Fees
                </th>
                <th scope="col" className="px-6 py-3">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Healthcare Professional
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {camps.length > 0 ? (
              <tbody>
                {camps?.map((camp, index) => (
                  <tr key={camp?._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {camp?.name}
                    </th>
                    <td className="px-6 py-4">${camp?.fees}</td>
                    <td className="px-6 py-4">
                      {format(new Date(camp?.dateTime), "PP")}
                    </td>
                    <td className="px-6 py-4">{camp?.location}</td>
                    <td className="px-6 py-4">
                      {camp?.healthcareProfessional}
                    </td>
                    <td className="px-6 py-4">
                      <div className="dropdown">
                        <div
                          tabIndex={0}
                          role="button"
                          className=""
                          onClick={handleToggle}
                        >
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <FaRegEdit className='text-xl'/>
                          </button>
                        </div>
                        {toggleDropDown && (
                          <ul
                            tabIndex={0}
                            className="mt-3  shadow menu menu-sm dropdown-content bg-white p-2 border z-50 -right-10 
                            top-4"
                          >
                            <div className="flex gap-5">
                              <div className="">
                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                  Edit
                                </button>
                              </div>
                              <div className="">
                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center font-semibold"
                  >
                    No Registered Camps Found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageCamps;