import { useQuery } from '@tanstack/react-query';

import { getCoinTickers } from '../../api/instance-crypto';

export const useGetCoinTickersQuery = ({ variables, ...options }) => {
  return useQuery({
    queryKey: ['coinTickers', ...Object.values(variables)],
    queryFn: () => getCoinTickers(variables),
    ...options,
  });
};
