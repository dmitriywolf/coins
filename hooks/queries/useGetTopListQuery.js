import { useQuery } from '@tanstack/react-query';
import { getTopList } from 'api';

export const useGetTopListQuery = ({ variables, ...options }) => {
  return useQuery({
    queryKey: ['topList', ...Object.values(variables)],
    queryFn: () => getTopList(variables),
    keepPreviousData: true,
    ...options,
  });
};
