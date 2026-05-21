import { getRangkingTop5, getRecentClears } from '~/db/home';

export const loader = async () => {
  const [recentClears, nightmareRanking, godRanking] = await Promise.all([
    getRecentClears(),
    getRangkingTop5('NIGHTMARE'),
    getRangkingTop5('GOD'),
  ]);

  return Response.json({
    recentClears,
    nightmareRanking,
    godRanking,
  });
};
