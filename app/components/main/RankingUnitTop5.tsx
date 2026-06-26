import type { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Skeleton } from '~/components/ui/skeleton';
import type { getRankingUnitTop5 } from '~/db/home';
import { getRankColor, getTierStyle } from '~/lib/utils';

type RankingUnitTop5Data = Awaited<ReturnType<typeof getRankingUnitTop5>>;
type RankingUnitItem = RankingUnitTop5Data[number];

const listContainerClass =
  'flex gap-4 overflow-x-auto scroll-smooth p-0.5 px-2 pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:p-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden';

const cardWrapperClass = 'w-[42%] shrink-0 snap-start md:w-auto md:shrink';

function ScrollList({ children }: { children: ReactNode }) {
  return (
    <div className="relative md:static">
      <div className={listContainerClass}>{children}</div>
      <div
        aria-hidden
        className="from-card pointer-events-none absolute inset-y-0.5 left-0 z-10 w-10 bg-linear-to-r to-transparent md:hidden"
      />
      <div
        aria-hidden
        className="from-card pointer-events-none absolute inset-y-0.5 right-0 z-10 w-10 bg-linear-to-l to-transparent md:hidden"
      />
    </div>
  );
}

function getRankRing(rank: number) {
  if (rank === 1) return 'ring-yellow-400/50';
  if (rank === 2) return 'ring-gray-300/40';
  if (rank === 3) return 'ring-amber-600/40';
  return 'ring-border';
}

function UnitCard({ item, rank }: { item: RankingUnitItem; rank: number }) {
  return (
    <div
      className={`border-border bg-secondary/50 ring-2 ring-inset ${getRankRing(rank)} hover:bg-secondary relative flex min-w-0 flex-col items-center rounded-lg border p-2.5 transition-colors md:p-2.5 md:ring-1`}
    >
      <span
        className={`border-border bg-background absolute top-2 left-2 z-10 rounded border px-1.5 py-0.5 font-mono text-xs font-bold ${getRankColor(rank)}`}
      >
        #{rank}
      </span>

      <div className="bg-muted aspect-square w-full overflow-hidden rounded-md">
        <Avatar className="h-full w-full rounded-md">
          <AvatarImage
            src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${item.unitThumbnailUrl}`}
            className="rounded-md object-cover"
          />
          <AvatarFallback className="bg-secondary rounded-md text-lg">
            {item.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex w-full flex-col items-center gap-1 pt-2.5">
        <span className="text-foreground w-full truncate text-center text-xs font-semibold">
          {item.name}
        </span>
        <span
          className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${getTierStyle(item.grade)}`}
        >
          {item.gradeName}
        </span>
        <span className="text-muted-foreground font-mono text-[11px]">픽 {item.pickCount}</span>
        <span className="text-primary font-mono text-xs font-bold">
          평균 {item.averageUnitCount}
        </span>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="border-border bg-secondary/50 flex min-w-0 flex-col items-center rounded-lg border p-2.5">
      <Skeleton className="aspect-square w-full rounded-md" />
      <div className="flex w-full flex-col items-center gap-1 pt-2.5">
        <Skeleton className="h-3.5 w-16 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
        <Skeleton className="h-3 w-10 rounded" />
        <Skeleton className="h-3.5 w-14 rounded" />
      </div>
    </div>
  );
}

function Loading() {
  return (
    <ScrollList>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={cardWrapperClass}>
          <LoadingCard />
        </div>
      ))}
    </ScrollList>
  );
}

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <span className="mb-2 text-2xl">🎮</span>
      <p className="text-muted-foreground text-sm">아직 픽 데이터가 없습니다</p>
      <p className="text-muted-foreground/60 mt-1 text-xs">클리어를 등록하면 집계됩니다</p>
    </div>
  );
}

function List({ data }: { data: RankingUnitTop5Data }) {
  return (
    <ScrollList>
      {data.map((item, index) => (
        <div key={item.id} className={cardWrapperClass}>
          <UnitCard item={item} rank={index + 1} />
        </div>
      ))}
    </ScrollList>
  );
}

const RankingUnitTop5 = ({ data }: { data?: RankingUnitTop5Data }) => {
  return (
    <section className="border-border bg-card rounded-lg border p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold sm:text-lg">
          <span className="text-primary font-mono">&gt;</span> 인기 유닛 TOP 5
        </h2>
        <p className="text-muted-foreground mt-1 text-xs">최근 100판 기준</p>
      </div>
      {!data ? <Loading /> : data.length === 0 ? <Empty /> : <List data={data} />}
    </section>
  );
};

export default RankingUnitTop5;
