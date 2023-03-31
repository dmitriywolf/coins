import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/api';

export const useGetCategoriesQuery = (sort) => {
  return useQuery({
    queryKey: ['categories', sort],
    queryFn: () => getCategories(sort),
  });
};
