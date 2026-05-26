import type { Difficulty } from 'generated/prisma/enums';

import { prisma } from '~/lib/prisma';
import type { Prisma } from '~/lib/prismaClient';

export type TRankingType = 'score' | 'clear';
interface GetRankingParams {
  difficulty: Difficulty;
  type: TRankingType;

  page?: number;
}

export type RankingPayload = Prisma.UserDifficultyStatGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        nickname: true;
        thumbnailUrl: true;
      };
    };
  };
}>;
export type UnitStatPayload = Prisma.UserUnitStatGetPayload<{
  include: {
    unit: {
      include: {
        grade: true;
      };
    };
  };
}>;

export interface RankingItem extends RankingPayload {
  mostUnits: UnitStatPayload[];
}
const PAGE_SIZE = 20;

export async function getRanking({ difficulty, type, page = 1 }: GetRankingParams) {
  const rankings = await prisma.userDifficultyStat.findMany({
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
  const userIds = rankings.map((v) => v.userId);
  const unitStats = await prisma.userUnitStat.findMany({
    where: {
      difficulty,
      userId: {
        in: userIds,
      },
      unit: {
        grade: {
          rank: {
            gte: 4,
          },
        },
      },
    },

    orderBy: {
      pickCount: 'desc',
    },

    include: {
      unit: {
        include: {
          grade: true,
        },
      },
    },
  });
  const unitMap = new Map<number, typeof unitStats>();

  for (const stat of unitStats) {
    const arr = unitMap.get(stat.userId) ?? [];

    if (arr.length < 3) {
      arr.push(stat);
    }

    unitMap.set(stat.userId, arr);
  }
  const result = rankings.map((ranking) => ({
    ...ranking,

    mostUnits: unitMap.get(ranking.userId) ?? [],
  }));

  return result;
}
