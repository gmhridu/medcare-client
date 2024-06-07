import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useCampsPagination = (page, size) => {
  const axiosCommon = useAxiosCommon();

  return useQuery({
    queryKey: ["camps", page, size],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/camps/pagination", {
        params: { page, size },
      });
      return data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};

export default useCampsPagination;
