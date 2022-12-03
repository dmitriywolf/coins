import { useQuery } from '@tanstack/react-query';

import { getExchanges } from '../../api/instance-crypto';

export const useGetExchangesQuery = ({ variables }) => {
  return useQuery({
    queryKey: ['exchanges', ...Object.values(variables)],
    queryFn: () => getExchanges(variables),
  });
};
