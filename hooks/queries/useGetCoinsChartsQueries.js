import { useQueries } from '@tanstack/react-query';
import { getCoinChart } from 'api';

export const useGetCoinsChartsQueries = ({ ids, currency }) => {
  return useQueries({
    queries: ids?.map((id) => {
      return {
        queryKey: ['coinChart', { id, currency }],
        queryFn: () => getCoinChart({ id, currency }),
      };
    }),
  });
};
