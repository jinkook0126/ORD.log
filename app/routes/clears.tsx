import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import ClearListContainer from '~/components/clear/ClearListContainer';
import { useClearInfiniteQuery } from '~/query/clear';

const ClearsPage = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useClearInfiniteQuery();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <main className="mx-auto max-w-5xl px-8 py-10 md:py-16">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 클리어 기록
        </h1>
      </div>
      <ClearListContainer list={data?.pages.flatMap((page) => page.items)} />
      {hasNextPage && <div ref={ref} className="h-10" />}
    </main>
  );
};
export default ClearsPage;
