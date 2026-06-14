import { useInfiniteQuery } from '@tanstack/react-query';

import type { TClearItem } from '~/db/clear';

export const useClearInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['clears'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`/api/clears?cursor=${pageParam ?? ''}`);
      const data: { items: TClearItem[]; nextCursor: number } = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as number | undefined,
    staleTime: 0,
    refetchOnMount: true,
  });
};
