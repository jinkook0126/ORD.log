import { prisma } from '~/lib/prisma';

export async function getSummary({ nickname }: { nickname: string }) {
  const user = await prisma.user.findFirst({
    where: {
      nickname: nickname,
    },
  });
  if (!user) {
    return null;
  }
  const summary = await prisma.userStat.findFirst({
    where: {
      userId: user.id,
    },
  });
  return summary;
}

export async function getRanking({ nickname }: { nickname: string }) {
  const user = await prisma.user.findFirst({
    where: {
      nickname: nickname,
    },
  });
  if (!user) {
    return null;
  }
  const [god, nightmare] = await Promise.all([
    prisma.userDifficultyStat.findUnique({
      where: {
        userId_difficulty: {
          userId: user.id,
          difficulty: 'GOD',
        },
      },
    }),

    prisma.userDifficultyStat.findUnique({
      where: {
        userId_difficulty: {
          userId: user.id,
          difficulty: 'NIGHTMARE',
        },
      },
    }),
  ]);

  const [godScoreRank, godClearRank, nightmareScoreRank, nightmareClearRank] = await Promise.all([
    prisma.userDifficultyStat.count({
      where: {
        difficulty: 'GOD',
        totalScore: {
          gt: god?.totalScore ?? 0,
        },
      },
    }),

    prisma.userDifficultyStat.count({
      where: {
        difficulty: 'GOD',
        totalSuccess: {
          gt: god?.totalSuccess ?? 0,
        },
      },
    }),

    prisma.userDifficultyStat.count({
      where: {
        difficulty: 'NIGHTMARE',
        totalScore: {
          gt: nightmare?.totalScore ?? 0,
        },
      },
    }),

    prisma.userDifficultyStat.count({
      where: {
        difficulty: 'NIGHTMARE',
        totalSuccess: {
          gt: nightmare?.totalSuccess ?? 0,
        },
      },
    }),
  ]);
  return {
    godScoreRank: godScoreRank + 1,
    godClearRank: godClearRank + 1,
    nightmareScoreRank: nightmareScoreRank + 1,
    nightmareClearRank: nightmareClearRank + 1,
  };
}

export async function getDifficultySummary({ nickname }: { nickname: string }) {
  const user = await prisma.user.findFirst({
    where: {
      nickname: nickname,
    },
  });
  if (!user) {
    return null;
  }

  const [god, nightmare] = await Promise.all([
    prisma.userDifficultyStat.findUnique({
      where: {
        userId_difficulty: {
          userId: user.id,
          difficulty: 'GOD',
        },
      },
    }),
    prisma.userDifficultyStat.findUnique({
      where: {
        userId_difficulty: {
          userId: user.id,
          difficulty: 'NIGHTMARE',
        },
      },
    }),
  ]);

  return {
    god: god,
    nightmare: nightmare,
  };
}

export async function getMostUnits({ nickname }: { nickname: string }) {
  const user = await prisma.user.findFirst({
    where: {
      nickname: nickname,
    },
  });
  if (!user) {
    return null;
  }
  const mostUnits = await prisma.userUnitStat.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      pickCount: 'desc',
    },
    take: 3,
    include: {
      unit: {
        select: {
          id: true,
          name: true,
          thumbnailUrl: true,
          grade: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return mostUnits;
}
