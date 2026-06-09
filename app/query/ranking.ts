import { useInfiniteQuery } from '@tanstack/react-query';
import type { Difficulty } from 'generated/prisma/enums';

import type { TRankingType } from '~/db/ranking';

export const useRankingInfiniteQuery = ({
  difficulty,
  type,
}: {
  difficulty: Difficulty;
  type: TRankingType;
}) => {
  return useInfiniteQuery({
    queryKey: ['ranking', difficulty, type],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `/api/ranking?difficulty=${difficulty}&type=${type}&page=${pageParam}`,
      );
      return res.json();
    },

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.items.length < 20) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
};
