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

  const topUnits = await prisma.userUnitStat.groupBy({
    by: ['unitId'],

    where: {
      userId: user.id,
      unit: {
        grade: {
          rank: {
            gte: 4,
          },
        },
      },
    },
    _sum: {
      pickCount: true,
      winCount: true,
      totalUnitCount: true,
    },
    orderBy: {
      _sum: {
        pickCount: 'desc',
      },
    },
    take: 3,
  });
  const units = await prisma.unit.findMany({
    where: {
      id: {
        in: topUnits.map((v) => v.unitId),
      },
    },
  });
  const result = topUnits.map((stat) => {
    const unit = units.find((u) => u.id === stat.unitId);

    const pickCount = stat._sum?.pickCount ?? 0;
    const winCount = stat._sum?.winCount ?? 0;
    const totalUnitCount = stat._sum?.totalUnitCount ?? 0;

    return {
      unit,
      pickCount,
      winCount,

      winRate: pickCount > 0 ? Number(((winCount / pickCount) * 100).toFixed(1)) : 0,

      avgUnitCount: pickCount > 0 ? Number((totalUnitCount / pickCount).toFixed(1)) : 0,
    };
  });
  return result;
}
