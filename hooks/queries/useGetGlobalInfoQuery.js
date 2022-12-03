import { useQuery } from '@tanstack/react-query';

import { getGlobalInfo } from '../../api/instance-crypto';

export const useGetGlobalInfoQuery = () => {
  return useQuery({
    queryKey: ['globalInfo'],
    queryFn: getGlobalInfo,
  });
};
