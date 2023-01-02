import { useQuery } from '@tanstack/react-query';
import { getCoinTickers } from 'api';

export const useGetCoinTickersQuery = ({ id }) => {
  return useQuery({
    queryKey: ['coinTickers', id],
    queryFn: () => getCoinTickers(id),
  });
};
