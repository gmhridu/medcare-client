import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps", user?.email],
    enabled:!!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/join-camps/${user?.email}`);
      return data;
    },
  });

  

  const cancelPaymentMutation = useMutation({
    mutationFn: async (paymentMethodId) => {
      const { data } = await axiosSecure.patch(
        `/payments/cancel/${paymentMethodId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["camps", user?.email]);
    },
  });

 

  const handleCancelPayment = async (paymentMethodId) => {
    console.log(paymentMethodId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Back to payment",
      confirmButtonText: "Cancel it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cancelPaymentMutation.mutateAsync(paymentMethodId); 
          toast.success("Canceled Successfully");
          Swal.fire({
            title: "Canceled!",
            text: "Payment Canceled Successfully",
            icon: "success",
          });
          refetch();
        } catch (error) {
          console.error("Error canceling payment:", error);
          toast.error("Something went wrong, please try again later");
        }
      }
    });
  };

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
                  Participant Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Confirmation Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Cancel Button
                </th>
                <th scope="col" className="px-6 py-3">
                  Feedback Button
                </th>
              </tr>
            </thead>
            {
              camps.length > 0 ? (
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
                  <td className="px-6 py-4">{camp?.participantName}</td>
                  <td className="px-6 py-4">{camp?.status}</td>
                  <td className="px-6 py-4">Confirmed</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCancelPayment(camp?.paymentMethodId)}
                    >
                      [Cancel]
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button>[FeedBack]</button>
                  </td>
                </tr>
              ))}
            </tbody>
              ) : (
                  <tbody>
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center font-semibold">
                        No Registered Camps Found
                      </td>
                    </tr>
                  </tbody>
              )
            }
          </table>
        </div>
      </div>
    </>
  );
};

export default RegisteredCamps;
