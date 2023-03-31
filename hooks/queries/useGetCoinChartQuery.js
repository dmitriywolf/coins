import { useQuery } from '@tanstack/react-query';

import { getCoinChart } from '@/api';

export const useGetCoinChartQuery = ({ id, currency }) => {
  return useQuery({
    queryKey: ['coinChart', { id, currency }],
    queryFn: () => getCoinChart({ id, currency }),
  });
};
