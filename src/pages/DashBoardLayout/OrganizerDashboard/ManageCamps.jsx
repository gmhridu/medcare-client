import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateCampModal from "@/components/Modal/UpdateCampModal";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loader from "@/pages/Shared/Loader/Loader";

const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);

  const {
    data: camps = [],
    isLoading,
    isFetching,
    isPending, 
    isSuccess,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["camps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/camps/organizer/${user?.email}`);
      return data;
    },
  });

  const handleEdit = (camp) => {
    setSelectedCamp(camp);
    setIsOpen(true);
  };

  const deleteCampMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/camp/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["camps", user?.email]);
      toast.success("Camp deleted successfully");
    },
    onError: (error) => {
      console.error("Error in delete camp:", error);
      toast.error("Something went wrong, please try again later");
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCampMutation.mutateAsync(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error in delete camp:", error);
          toast.error("Something went wrong, please try again later");
        }
      }
    });
  };

  if(isLoading || isFetching || isPending) return <Loader/>

  if (isSuccess || isFetched) {
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
                  {camps?.map((camp) => (
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
                        <div className="dropdown relative">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleEdit(camp)}
                          >
                            <FaRegEdit className="text-xl" />
                          </button>
                          <ul className="mt-3 shadow menu menu-sm dropdown-content bg-white p-2 border z-50 -right-10 top-4">
                            <div className="flex gap-5">
                              <div className="">
                                <button
                                  onClick={() => handleEdit(camp)}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="">
                                <button
                                  onClick={() => handleDelete(camp?._id)}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </ul>
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
        <UpdateCampModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCamp={selectedCamp}
          onUpdate={refetch}
        />
      </>
    );
   }
};

export default ManageCamps;
