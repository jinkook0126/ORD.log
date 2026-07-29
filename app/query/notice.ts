import { useQuery } from '@tanstack/react-query';

import type { getNotices } from '~/db/notice';

type TNotice = Awaited<ReturnType<typeof getNotices>>[number];

export const useNoticesQuery = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const res = await fetch('/api/notices');
      if (!res.ok) {
        throw new Error('공지사항을 불러오지 못했습니다.');
      }
      return (await res.json()) as TNotice[];
    },
  });
};
