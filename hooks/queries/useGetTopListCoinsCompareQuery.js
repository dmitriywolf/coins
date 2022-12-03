import { useQuery } from '@tanstack/react-query';

import { getTopListByMarketCap } from '../../api/instance-compare';

export const useGetTopListCoinsCompareQuery = ({ variables, ...options }) => {
  return useQuery({
    queryKey: ['topListByMarketCap', ...Object.values(variables)],
    queryFn: () => getTopListByMarketCap(variables),
    ...options,
  });
};
