import { useQuery } from '@tanstack/react-query';

import { getCoinsList } from '../../api';

export const useGetCoinsListQuery = () => {
  return useQuery({
    queryKey: ['coinsList'],
    queryFn: getCoinsList,
  });
};
