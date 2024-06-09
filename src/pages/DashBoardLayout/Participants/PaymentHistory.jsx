import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import Loader from '@/pages/Shared/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


const PaymentHistory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: payment = [], refetch, isLoading, isPending, isFetching } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });

  console.log(payment)

 const handleCancelPayment = async (paymentId) => {
   console.log(paymentId);
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     cancelButtonText: "Back to payment",
     confirmButtonText: "Cancel",
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         const { data } = await axiosSecure.delete(`/payments/${paymentId}`);
         if (data?.deletedCount > 0) {
           toast.success("Canceled Successfully");
           Swal.fire({
             title: "Canceled!",
             text: "Payment Canceled Successfully",
             icon: "success",
           });
           refetch(); 
         }
       } catch (error) {
         console.error("Error canceling payment:", error);
         toast.error("Something is wrong please try again Later");
       }
     }
   });
 };

  

  if(isLoading || isFetching || isPending) return <Loader/>
 
  return (
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
            {payment?.map((pay, index) => (
              <tr key={pay?._id}>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {pay?.name}
                </th>
                <td class="px-6 py-4">${pay?.amount}</td>
                <td class="px-6 py-4">{pay?.participantName}</td>
                <td class="px-6 py-4">{pay?.status}</td>
                <td class="px-6 py-4">Confirmed</td>
                <td class="px-6 py-4">
                  <button
                    onClick={() => handleCancelPayment(pay?.paymentMethodId)}
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
  );
};

export default PaymentHistory;