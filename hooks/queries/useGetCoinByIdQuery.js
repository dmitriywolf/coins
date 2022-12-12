import { useQuery } from '@tanstack/react-query';

import { getCoinById } from '../../api';

export const useGetCoinByIdQuery = ({ id }) => {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => getCoinById(id),
  });
};
