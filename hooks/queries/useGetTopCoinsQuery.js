import { useQuery } from '@tanstack/react-query';

import { getTopCoins } from '@/api';

export const useGetTopCoinsQuery = () => {
  return useQuery({
    queryKey: ['topCoins'],
    queryFn: getTopCoins,
  });
};
