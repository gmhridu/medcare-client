import DataTable from "@/components/DashBoardMenu/DataTable";
import FeedbackForm from "@/components/Forms/FeedbackForm";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loader from "@/pages/Shared/Loader/Loader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RegisteredCamps = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: camps = [], refetch, isLoading, isPending, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["camps", user?.email],
    enabled: !!user?.email,
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

  const handleFeedbackClick = (camp) => {
    setSelectedCamp(camp);
    setIsOpen(true);
  };

  const handleCloseFeedback = () => {
    setSelectedCamp(null);
  };

  const columns = [
    { id: "name", label: "Camp Name", align: "left" },
    {
      id: "fees",
      label: "Camp Fees",
      align: "left",
      format: (value) => `$${value}`,
    },
    { id: "participantName", label: "Participant Name", align: "left" },
    { id: "status", label: "Payment Status", align: "left" },
    {
      id: "confirmation",
      label: "Confirmation Status",
      align: "left",
      format: () => "Confirmed",
    },
    {
      id: "cancel",
      label: "Cancel",
      align: "left",
      format: (value, row) => (
        <button
          className="hover:underline"
          onClick={() => handleCancelPayment(row?.paymentMethodId)}
        >
          [Cancel]
        </button>
      ),
    },
    {
      id: "feedback",
      label: "Feedback",
      align: "left",
      format: (value, row) => (
        <button
          className="hover:underline disabled:cursor-not-allowed"
          onClick={() => handleFeedbackClick(row)}
          disabled={row?.rating || row?.ratingText}
        >
          [Feedback]
        </button>
      ),
    },
  ];

  if (loading || isLoading || isPending || isFetching) return <Loader />
  
  if (isFetched || isSuccess) { 
    return (
      <>
        <DataTable
          columns={columns}
          data={camps}
          searchFields={["name", "participantName", "status"]}
        />
  
        {selectedCamp && (
          <FeedbackForm
            camp={selectedCamp}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClose={handleCloseFeedback}
          />
        )}
      </>
    );
  }
};

export default RegisteredCamps;
