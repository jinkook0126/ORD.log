import { prisma } from '~/lib/prisma';
import type { Difficulty } from '~/lib/prismaClient';

export const getRecentClears = async () => {
  const recentClears = await prisma.gameRecord.findMany({
    where: {
      success: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });
  return recentClears;
};

export const getRangkingTop5 = async (difficulty: Difficulty) => {
  return prisma.userDifficultyStat.findMany({
    where: {
      difficulty,
    },

    orderBy: [{ totalSuccess: 'desc' }],

    take: 5,

    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};

export const getRankingUnitTop5 = async () => {
  const recentGames = await prisma.gameRecord.findMany({
    where: {
      success: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
    include: {
      units: {
        where: {
          unit: {
            grade: {
              rank: {
                in: [8, 10, 11, 12],
              },
            },
          },
        },
        include: {
          unit: {
            include: {
              grade: true,
            },
          },
        },
      },
    },
  });
  const map = new Map<
    number,
    {
      unit: (typeof recentGames)[number]['units'][number]['unit'];
      pickCount: number;
      totalUnitCount: number;
    }
  >();

  for (const game of recentGames) {
    for (const record of game.units) {
      const prev = map.get(record.unitId);

      if (prev) {
        prev.pickCount++;
        prev.totalUnitCount += game.unitCount;
      } else {
        map.set(record.unitId, {
          unit: record.unit,
          pickCount: 1,
          totalUnitCount: game.unitCount,
        });
      }
    }
  }

  const top5 = [...map.values()]
    .sort((a, b) => b.pickCount - a.pickCount)
    .slice(0, 5)
    .map((item) => ({
      id: item.unit.id,
      name: item.unit.name,
      grade: item.unit.gradeId,
      gradeName: item.unit.grade.name,
      unitThumbnailUrl: item.unit.thumbnailUrl,
      pickCount: item.pickCount,
      averageUnitCount: Number((item.totalUnitCount / item.pickCount).toFixed(2)),
    }));

  return top5;
};
