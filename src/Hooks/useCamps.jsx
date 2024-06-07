import React from "react";
import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useCamps = (category, page, size) => {
  const axiosCommon = useAxiosCommon();
  return useQuery({
    queryKey: ["camps", category, page, size],
    queryFn: async () => {
      const url = `/camps/pagination?category=${category}&page=${page}&size=${size}`;
      const { data } = await axiosCommon(url);
      return data;
    },
  });
};

export default useCamps;
