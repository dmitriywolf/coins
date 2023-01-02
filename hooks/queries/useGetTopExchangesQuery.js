import { useQuery } from '@tanstack/react-query';
import { getTopExchanges } from 'api';

export const useGetTopExchangesQuery = () => {
  return useQuery({
    queryKey: ['topExchanges'],
    queryFn: () => getTopExchanges(),
  });
};
