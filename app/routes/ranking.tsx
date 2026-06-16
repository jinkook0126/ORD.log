import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import RankingListContainer from '~/components/ranking/RankingListContainer';
import type { TRankingType } from '~/db/ranking';
import type { Difficulty } from '~/lib/prismaClient';
import { useRankingInfiniteQuery } from '~/query/ranking';

export function meta() {
  return [
    { title: 'ORD.log - 랭킹' },
    { name: 'description', content: '신·악몽 모드 클리어 및 점수 랭킹' },
  ];
}

type TabKey = '신-클리어' | '신-점수' | '악몽-클리어' | '악몽-점수';

const TABS: { key: TabKey; mode: Difficulty; type: TRankingType; unit: string }[] = [
  { key: '신-클리어', mode: 'GOD', type: 'clear', unit: '회' },
  { key: '신-점수', mode: 'GOD', type: 'score', unit: '점' },
  { key: '악몽-클리어', mode: 'NIGHTMARE', type: 'clear', unit: '회' },
  { key: '악몽-점수', mode: 'NIGHTMARE', type: 'score', unit: '점' },
];

export type TabItem = (typeof TABS)[number];

function Ranking() {
  const { ref, inView } = useInView();

  const [activeTab, setActiveTab] = useState<TabKey>('신-클리어');

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const {
    data: ranking,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRankingInfiniteQuery({
    difficulty: currentTab.mode,
    type: currentTab.type,
  });
  const rankingList = useMemo(() => {
    return ranking?.pages.flatMap((page) => page.items) ?? [];
  }, [ranking]);

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <main className="mx-auto max-w-3xl px-8 py-10 md:py-16">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 랭킹
        </h1>
      </div>

      <div className="border-border mb-6 flex gap-1 rounded-lg border p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 cursor-pointer rounded-md px-2 py-2 transition-all duration-150 ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-[11px] font-semibold sm:text-xs">{tab.key.split('-')[0]}</span>
              <span className="text-[10px] font-medium opacity-80 sm:text-[11px]">
                {tab.key.split('-')[1]}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border">
        <div className="border-border bg-secondary/30 grid grid-cols-[3rem_1fr_auto] items-center gap-0 border-b px-4 py-3 md:grid-cols-[3rem_1fr_100px_160px_160px]">
          <span className="text-muted-foreground text-center font-mono text-xs font-semibold tracking-widest uppercase">
            #
          </span>
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            닉네임
          </span>
          <span className="text-muted-foreground hidden min-w-[90px] px-2 pr-6 text-xs font-semibold tracking-widest uppercase md:block">
            모스트 상위
          </span>
          <span className="text-muted-foreground hidden min-w-[100px] px-2 pl-6 text-xs font-semibold tracking-widest uppercase md:block">
            승률
          </span>
          <span className="text-muted-foreground min-w-[70px] px-2 text-right text-xs font-semibold tracking-widest uppercase">
            {currentTab.key.split('-')[1]}
          </span>
        </div>

        <RankingListContainer list={rankingList} tab={currentTab} />

        {hasNextPage && <div ref={ref} className="h-10" />}
      </div>
    </main>
  );
}
export default Ranking;
