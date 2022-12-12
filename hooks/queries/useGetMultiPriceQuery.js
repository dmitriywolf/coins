import { useQuery } from '@tanstack/react-query';

import { getMultiPriceData } from '../../api/instance-compare';

export const useGetMultiPriceQuery = ({ variables }) => {
  return useQuery({
    queryKey: ['multiprice', ...Object.values(variables)],
    queryFn: () => getMultiPriceData(variables),
  });
};
