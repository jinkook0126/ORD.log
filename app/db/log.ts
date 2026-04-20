import { prisma } from '~/lib/prisma';

export const createLog = async ({
  userId,
  score,
  unitCount,
  success,
  difficulty,
  imageUrl,
  unitIds,
}: {
  userId: number;
  score: number;
  unitCount: number;
  success: boolean;
  difficulty: 'GOD' | 'NIGHTMARE';
  imageUrl: string;
  unitIds: number[];
}) => {
  await prisma.$transaction(async (tx) => {
    // 1. 게임 기록 생성
    const gameRecord = await tx.gameRecord.create({
      data: {
        userId,
        score,
        unitCount,
        success,
        difficulty,
        imageUrl,
      },
    });

    // 2. 유닛들 bulk insert
    await tx.gameRecordUnit.createMany({
      data: unitIds.map((unitId) => ({
        gameRecordId: gameRecord.id,
        unitId,
      })),
    });

    // 3. user_stats 업데이트
    await tx.userStat.upsert({
      where: { userId },
      create: {
        userId,
        totalGames: 1,
        totalSuccess: success ? 1 : 0,
        totalScore: score,
        totalUnitCount: unitCount,
      },
      update: {
        totalGames: { increment: 1 },
        totalSuccess: { increment: success ? 1 : 0 },
        totalScore: { increment: score },
        totalUnitCount: { increment: unitCount },
      },
    });

    // 4. user_unit_stats (핵심)
    for (const unitId of unitIds) {
      await tx.userUnitStat.upsert({
        where: {
          userId_unitId: { userId, unitId },
        },
        create: {
          userId,
          unitId,
          pickCount: 1,
          winCount: success ? 1 : 0,
        },
        update: {
          pickCount: { increment: 1 },
          winCount: success ? { increment: 1 } : undefined,
        },
      });
    }

    // 5. user_difficulty_stats
    await tx.userDifficultyStat.upsert({
      where: {
        userId_difficulty: { userId, difficulty },
      },
      create: {
        userId,
        difficulty,
        totalGames: 1,
        totalSuccess: success ? 1 : 0,
        totalScore: score,
        totalUnitCount: unitCount,
      },
      update: {
        totalGames: { increment: 1 },
        totalSuccess: { increment: success ? 1 : 0 },
        totalScore: { increment: score },
        totalUnitCount: { increment: unitCount },
      },
    });
  });
};
