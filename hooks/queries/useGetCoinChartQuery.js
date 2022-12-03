import { useQuery } from '@tanstack/react-query';

import { getCoinChart } from '../../api/instance-crypto';

export const useGetCoinChartQuery = ({ variables, ...options }) => {
  return useQuery({
    queryKey: ['coinChart', ...Object.values(variables)],
    queryFn: () => getCoinChart(variables),
    ...options,
  });
};
