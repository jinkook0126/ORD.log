import { useMutation } from '@tanstack/react-query';

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

export { useSaveUserNickname };
