import { useQuery } from '@tanstack/react-query';
import type { Difficulty } from 'generated/prisma/enums';

import type { TGameRecord, TMostUnit, TUnitSummary } from '~/db/my';

export const useMySummaryQuery = ({ nickname }: { nickname: string }) => {
  return useQuery({
    queryKey: ['my', 'summary', nickname],
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
    queryKey: ['my', 'ranking', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/ranking?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyDifficultySummaryQuery = ({ nickname }: { nickname: string }) => {
  return useQuery({
    queryKey: ['my', 'difficulty', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/difficulty?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyMostUnitsQuery = ({ nickname }: { nickname: string }) => {
  return useQuery<TMostUnit[]>({
    queryKey: ['my', 'most-units', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/most-units?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyGameRecordsQuery = ({ nickname }: { nickname: string }) => {
  return useQuery<TGameRecord[]>({
    queryKey: ['my', 'game-records', nickname],
    queryFn: async () => {
      const res = await fetch(`/api/my/game-records?nickname=${nickname}`);
      return res.json();
    },
  });
};

export const useMyUnitSummaryQuery = ({
  nickname,
  difficulty,
}: {
  nickname: string;
  difficulty?: Difficulty;
}) => {
  return useQuery<TUnitSummary[]>({
    queryKey: ['my', 'unit-summary', nickname, difficulty],
    queryFn: async () => {
      const res = await fetch(
        `/api/my/unit-summary?nickname=${nickname}${difficulty ? `&difficulty=${difficulty}` : ''}`,
      );
      return res.json();
    },
  });
};
