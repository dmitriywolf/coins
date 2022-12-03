import { useQuery } from '@tanstack/react-query';

import { getCoinsMarkets } from '../../api/instance-crypto';

export const useGetCoinsMarketsQuery = ({ variables }) => {
  return useQuery({
    queryKey: ['coinsMarkets', ...Object.values(variables)],
    queryFn: () => getCoinsMarkets(variables),
  });
};
