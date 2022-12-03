import { useQuery } from '@tanstack/react-query';

import { getCategoriesList } from '../../api/instance-crypto';

export const useCategoriesListQuery = () => {
  return useQuery({
    queryKey: ['categoriesList'],
    queryFn: getCategoriesList,
  });
};
