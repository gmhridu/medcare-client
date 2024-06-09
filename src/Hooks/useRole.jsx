import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: role,
    isLoading,
    isFetching,
    isFetched,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data?.role;
    },
  });
  return [role, isLoading, isFetching, isFetched, isPending, isSuccess];
};

export default useRole;