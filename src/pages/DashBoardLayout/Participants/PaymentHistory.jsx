import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loader from "@/pages/Shared/Loader/Loader";
import DataTable from "@/components/DashBoardMenu/DataTable";


const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payment = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });

  if (loading || isLoading || isFetching) return <Loader />;

  const columns = [
    { id: "name", label: "Camp Name", align: "left" },
    {
      id: "amount",
      label: "Camp Fees",
      align: "left",
      format: (value) => `$${value}`,
    },
    { id: "status", label: "Payment Status", align: "left" },
    {
      id: "confirmation",
      label: "Confirmation Status",
      align: "left",
      format: () => "Confirmed",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={payment}
      searchFields={["name", "status"]}
    />
  );
};

export default PaymentHistory;
