import { getRangkingTop5, getRankingUnitTop5, getRecentClears } from '~/db/home';

export const loader = async () => {
  const [recentClears, nightmareRanking, godRanking, rankingUnitTop5] = await Promise.all([
    getRecentClears(),
    getRangkingTop5('NIGHTMARE'),
    getRangkingTop5('GOD'),
    getRankingUnitTop5(),
  ]);

  return Response.json({
    recentClears,
    nightmareRanking,
    godRanking,
    rankingUnitTop5,
  });
};
