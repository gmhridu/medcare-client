import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const RegisteredCamps = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {data: camps = []} = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/join-camps/${user?.email}`);
      return data;
    }
  })

  console.log(camps)
  

  
  return (
    <>
      <div className="container mx-auto my-10">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Camp Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Camp Fees
                </th>
                <th scope="col" class="px-6 py-3">
                  Participant Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Confirmation Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Cancel Button
                </th>
                <th scope="col" class="px-6 py-3">
                  Feedback Button
                </th>
              </tr>
            </thead>
            <tbody>
              {camps?.map((camp, index) => (
                <tr key={camp?._id}>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {camp?.name}
                  </th>
                  <td class="px-6 py-4">${camp?.fees}</td>
                  <td class="px-6 py-4">{camp?.participantName}</td>
                  <td class="px-6 py-4">{camp?.status}</td>
                  <td class="px-6 py-4">Confirmed</td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => handleCancelPayment(camp?.paymentMethodId)}
                    >
                      [Cancel]
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <button>[FeedBack]</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RegisteredCamps;