import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../../api/instance-crypto';

export const useGetCategoriesQuery = ({ variables }) => {
  return useQuery({
    queryKey: ['categoriesMarket', ...Object.values(variables)],
    queryFn: () => getCategories(variables),
  });
};
