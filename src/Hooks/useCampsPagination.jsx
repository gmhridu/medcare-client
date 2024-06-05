import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useCampsPagination = (page, size) => {
  const axiosCommon = useAxiosCommon();

  return useQuery({
    queryKey: ["camps", page, size],
    queryFn: async () => {
      const { data: camps } = await axiosCommon.get("/camps/pagination", {
        params: { page, size },
      });
      const {
        data: { count },
      } = await axiosCommon.get("/camps/counts");
      return { camps, count };
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};

export default useCampsPagination;
