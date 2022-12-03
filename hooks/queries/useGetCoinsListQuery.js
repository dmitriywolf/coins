import { useQuery } from '@tanstack/react-query';

import { getCoinsList } from '../../api/instance-crypto';

export const useGetCoinsListQuery = (options) => {
  return useQuery({
    queryKey: ['coinsList'],
    queryFn: getCoinsList,
    ...options,
  });
};
