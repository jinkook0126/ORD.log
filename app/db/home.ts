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
