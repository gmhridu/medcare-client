import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ManageRegisteredCamps = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: joinCamps = [] } = useQuery({
    queryKey: ['joinCamps'],
    queryFn: async () => {
      const { data } = await axiosSecure.get("joinCamp");
      return data;
    }
  })

  console.log(joinCamps)

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Participant Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Camp Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Camp Fees
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Confirmation
                </th>
                <th scope="col" className="px-6 py-3">
                  Cancel
                </th>
              </tr>
            </thead>
            {joinCamps.length > 0 ? (
              <tbody>
                {joinCamps?.map((camp) => (
                  <tr key={camp?._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {camp?.participantEmail}
                    </th>
                    <td className="px-6 py-4">{camp?.name}</td>
                    <td className="px-6 py-4">{camp?.fees}</td>
                    <td className="px-6 py-4">{camp?.status}</td>
                    <td className="px-6 py-4">confirmed</td>
                    <td className="px-6 py-4">confirmed</td>
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
                    No Participant Found
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

export default ManageRegisteredCamps;