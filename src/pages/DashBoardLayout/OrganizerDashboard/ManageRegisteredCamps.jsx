import React from "react";

import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/DashBoardMenu/DataTable";
import Loader from "@/pages/Shared/Loader/Loader";

const ManageRegisteredCamps = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: joinCamps = [], isLoading, isFetched, isFetching, isPending, isSuccess } = useQuery({
    queryKey: ["joinCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("joinCamp");
      return data;
    },
  });



  const columns = [
    { id: "participantEmail", label: "Participant Name", align: "left" },
    { id: "name", label: "Camp Name", align: "left" },
    { id: "fees", label: "Camp Fees", align: "left" },
    { id: "status", label: "Payment Status", align: "left" },
    {
      id: "confirmation",
      label: "Confirmation",
      align: "left",
      format: () => "confirmed",
    },
    { id: "cancel", label: "Cancel", align: "left", format: () => "confirmed" },
  ];

  const searchFields = ["participantEmail", "name", "status"];

  if(loading || isLoading || isPending || isFetching) return <Loader/>

  if (isFetched || isSuccess) {
    return (
      <DataTable columns={columns} data={joinCamps} searchFields={searchFields} />
    );
  }
};

export default ManageRegisteredCamps;
