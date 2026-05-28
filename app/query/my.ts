import { useQuery } from '@tanstack/react-query';

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
  return useQuery({
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
