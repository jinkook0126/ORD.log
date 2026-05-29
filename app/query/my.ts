import { useQuery } from '@tanstack/react-query';

import type { TGameRecord, TMostUnit } from '~/db/my';

export const useMySummaryQuery = ({ nickname }: { nickname: string }) => {
  return useQuery({
    queryKey: ['my-summary', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/summary?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyRankingQuery = ({ nickname }: { nickname: string }) => {
  return useQuery<{
    godScoreRank: number | null;
    godClearRank: number | null;
    nightmareScoreRank: number | null;
    nightmareClearRank: number | null;
  }>({
    queryKey: ['my-ranking', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/ranking?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyDifficultySummaryQuery = ({ nickname }: { nickname: string }) => {
  return useQuery({
    queryKey: ['my-difficulty', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/difficulty?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyMostUnitsQuery = ({ nickname }: { nickname: string }) => {
  return useQuery<TMostUnit[]>({
    queryKey: ['my-most-units', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/most-units?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyGameRecordsQuery = ({ nickname }: { nickname: string }) => {
  return useQuery<TGameRecord[]>({
    queryKey: ['my-game-records', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/game-records?nickname=${nickname}`);
      return res.json();
    },
  });
};
