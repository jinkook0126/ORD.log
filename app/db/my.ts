import { prisma } from '~/lib/prisma';
import type { Grade, Prisma, Unit } from '~/lib/prismaClient';

export type TMostUnit = {
  unit: Unit & { grade: Grade };
  pickCount: number;
  winCount: number;
  winRate: number;
  avgUnitCount: number;
};

export type TGameRecord = Prisma.GameRecordGetPayload<{
  include: {
    units: {
      include: {
        unit: {
          include: {
            grade: true;
          };
        };
      };
    };
  };
}>;

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
      nickname,
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
    god
      ? prisma.userDifficultyStat.count({
          where: {
            difficulty: 'GOD',
            totalScore: {
              gt: god.totalScore,
            },
          },
        })
      : null,

    god
      ? prisma.userDifficultyStat.count({
          where: {
            difficulty: 'GOD',
            totalSuccess: {
              gt: god.totalSuccess,
            },
          },
        })
      : null,

    nightmare
      ? prisma.userDifficultyStat.count({
          where: {
            difficulty: 'NIGHTMARE',
            totalScore: {
              gt: nightmare.totalScore,
            },
          },
        })
      : null,

    nightmare
      ? prisma.userDifficultyStat.count({
          where: {
            difficulty: 'NIGHTMARE',
            totalSuccess: {
              gt: nightmare.totalSuccess,
            },
          },
        })
      : null,
  ]);

  return {
    godScoreRank: godScoreRank !== null ? godScoreRank + 1 : null,

    godClearRank: godClearRank !== null ? godClearRank + 1 : null,

    nightmareScoreRank: nightmareScoreRank !== null ? nightmareScoreRank + 1 : null,

    nightmareClearRank: nightmareClearRank !== null ? nightmareClearRank + 1 : null,
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
    include: {
      grade: true,
    },
  });
  console.log(topUnits);
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

export async function getGameRecords({ nickname }: { nickname: string }) {
  const user = await prisma.user.findFirst({
    where: {
      nickname: nickname,
    },
  });
  if (!user) {
    return null;
  }
  const gameRecords = await prisma.gameRecord.findMany({
    where: {
      userId: user.id,
    },
    include: {
      units: {
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
  return gameRecords;
}
