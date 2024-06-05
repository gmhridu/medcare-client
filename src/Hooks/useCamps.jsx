import React from 'react';
import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useCamps = (category = null) => {
  const axiosCommon = useAxiosCommon()
  return useQuery({
    queryKey: category ? ['camps', category] : ['camps'],
    queryFn: async () => {
      const url = category ? `/camps?category=${category}` : '/camps';
      const { data } = await axiosCommon(url)
      return data;
    }
  })
};

export default useCamps;