import { useQuery } from '@tanstack/react-query';

import { getGlobalInfo } from '../../api';

export const useGetGlobalInfoQuery = () => {
  return useQuery({
    queryKey: ['globalInfo'],
    queryFn: getGlobalInfo,
  });
};
