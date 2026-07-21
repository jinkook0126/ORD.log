import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useCreateLogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch('/api/log', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('로그 등록에 실패하였습니다.');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};

export const useDeleteLogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (logId: number) => {
      const res = await fetch(`/api/log?id=${logId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const { message } = await res.json().catch(() => ({ message: null }));
        throw new Error(message ?? '로그 삭제에 실패했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};
