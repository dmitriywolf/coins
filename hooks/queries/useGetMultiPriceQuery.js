import { useQuery } from '@tanstack/react-query';

import { getMultiPriceData } from '@/api';

export const useGetMultiPriceQuery = ({ variables }) => {
  return useQuery({
    queryKey: ['multiprice', ...Object.values(variables)],
    queryFn: () => getMultiPriceData(variables),
  });
};
