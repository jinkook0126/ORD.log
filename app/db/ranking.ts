import type { Difficulty } from 'generated/prisma/enums';

import { prisma } from '~/lib/prisma';

export type TRankingType = 'score' | 'clear';
interface GetRankingParams {
  difficulty: Difficulty;
  type: TRankingType;

  page?: number;
}

const PAGE_SIZE = 20;

export async function getRanking({ difficulty, type, page = 1 }: GetRankingParams) {
  return prisma.userDifficultyStat.findMany({
    where: {
      difficulty,
    },

    orderBy:
      type === 'score'
        ? {
            totalScore: 'desc',
          }
        : {
            totalSuccess: 'desc',
          },

    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          thumbnailUrl: true,
        },
      },
    },

    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
}
