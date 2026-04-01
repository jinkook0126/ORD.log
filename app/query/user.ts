import { useMutation } from '@tanstack/react-query';

const useSaveUserNickname = () => {
  return useMutation({
    mutationFn: async ({
      nickname,
      tempToken,
      thumbnailUrl,
    }: {
      nickname: string;
      tempToken: string;
      thumbnailUrl: string;
    }) => {
      const res = await fetch(`/api/user`, {
        method: 'POST',
        body: JSON.stringify({ nickname, tempToken, thumbnailUrl }),
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
