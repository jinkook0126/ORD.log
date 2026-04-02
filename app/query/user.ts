import { useMutation, useQuery } from '@tanstack/react-query';

const useSaveUserNickname = () => {
  return useMutation({
    mutationFn: async ({ nickname, tempToken }: { nickname: string; tempToken: string }) => {
      const res = await fetch(`/api/user`, {
        method: 'POST',
        body: JSON.stringify({ nickname, tempToken }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
    },
  });
};

const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch('/api/me', {
        credentials: 'include',
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    },
    retry: false,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
};

export { useMe, useSaveUserNickname };
