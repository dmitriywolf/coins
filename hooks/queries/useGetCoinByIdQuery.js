import { useQuery } from '@tanstack/react-query';

import { getCoinById } from '../../api/instance-crypto';

export const useGetCoinByIdQuery = ({ variables, ...options }) => {
  return useQuery({
    queryKey: ['coin', ...Object.values(variables)],
    queryFn: () => getCoinById(variables),
    ...options,
  });
};
