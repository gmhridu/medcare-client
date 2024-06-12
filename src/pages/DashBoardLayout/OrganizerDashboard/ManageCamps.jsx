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
import DataTable from "@/components/DashBoardMenu/DataTable";

const ManageCamps = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  const columns = [
    { id: "name", label: "Camp Name", align: "left" },
    {
      id: "fees",
      label: "Camp Fees",
      align: "left",
      format: (value) => `$${value}`,
    },
    {
      id: "dateTime",
      label: "Date & Time",
      align: "left",
      format: (value) => format(new Date(value), "PP"),
    },
    { id: "location", label: "Location", align: "left" },
    {
      id: "healthcareProfessional",
      label: "Healthcare Professional",
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      align: "left",
      format: (value, row) => (
        <div className="relative">
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() =>
              setActiveDropdown(activeDropdown === row._id ? null : row._id)
            }
          >
            <FaRegEdit className="text-xl" />
          </button>
          {activeDropdown === row._id && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 cursor-pointer">
              <div
                className="hover:bg-gray-100 font-medium"
                onClick={() => handleEdit(row)}
              >
                <button className="block px-4 py-2 text-sm text-gray-700">
                  Edit
                </button>
              </div>
              <div
                className="hover:bg-gray-100 font-medium"
                onClick={() => handleDelete(row._id)}
              >
                <button className="block px-4 py-2 text-sm text-gray-700">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  if (loading || isLoading || isFetching || isPending) return <Loader />;

  if (isSuccess || isFetched) {
    return (
      <>
        <div className="container mx-auto my-10">
          <DataTable
            columns={columns}
            data={camps}
            searchFields={["name", "location", "healthcareProfessional"]}
          />
        </div>
        {selectedCamp && (
          <UpdateCampModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedCamp={selectedCamp}
            onUpdate={refetch}
          />
        )}
      </>
    );
  }

  return null;
};

export default ManageCamps;
