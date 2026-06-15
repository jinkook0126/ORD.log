import { Link } from 'react-router';

import { Skeleton } from '~/components/ui/skeleton';
import type { RankingItem } from '~/db/ranking';
import type { TabItem } from '~/routes/ranking';

import WinRateBar from '../common/WinRateBar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Loading = () => (
  <>
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="border-border grid grid-cols-[3rem_1fr_auto] items-center gap-0 border-b px-4 py-3 md:grid-cols-[3rem_1fr_100px_160px_90px]"
      >
        <Skeleton className="h-6 w-8" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 max-w-32 flex-1" />
        </div>

        <div className="hidden gap-1 px-2 pr-6 md:flex">
          {Array.from({ length: 3 }).map((_, j) => (
            <Skeleton key={j} className="h-7 w-7 rounded-full" />
          ))}
        </div>

        <div className="hidden px-2 pl-6 md:flex">
          <Skeleton className="h-5 w-24" />
        </div>

        <Skeleton className="ml-auto h-5 w-20 px-2" />
      </div>
    ))}
  </>
);

const Empty = () => (
  <div className="border-border py-16 text-center">
    <p className="mb-2 text-2xl">🏆</p>
    <p className="text-foreground mb-1 font-medium">아직 랭킹이 없어요</p>
    <p className="text-muted-foreground text-sm">첫 번째 클리어를 등록하고 랭킹을 시작해보세요!</p>
  </div>
);
function getRankBg(rank: number) {
  if (rank === 1) return 'bg-yellow-400/5';
  if (rank === 2) return 'bg-gray-300/5';
  if (rank === 3) return 'bg-amber-600/5';
  return '';
}
function getRankStyle(rank: number) {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-500 dark:text-gray-300';
  if (rank === 3) return 'text-amber-600';
  return 'text-muted-foreground';
}

const RankingListContainer = ({ list, tab }: { list?: RankingItem[]; tab: TabItem }) => {
  if (!list) return <Loading />;
  if (list.length === 0) return <Empty />;
  return (
    <>
      {list.map((item, index) => (
        <div
          key={`user-${item.user.id}`}
          className={`border-border hover:bg-secondary/40 grid grid-cols-[3rem_1fr_auto] items-center gap-0 border-b px-4 py-3 transition-colors last:border-b-0 md:grid-cols-[3rem_1fr_100px_160px_160px] ${getRankBg(index + 1)}`}
        >
          <span className={`text-center font-mono text-sm font-bold ${getRankStyle(index + 1)}`}>
            {index + 1}
          </span>
          <div className="flex items-center gap-3">
            <Avatar className="border-border h-8 w-8 border">
              <AvatarImage src={item.user.thumbnailUrl} />
              <AvatarFallback className="bg-secondary text-[10px]">
                {item.user.nickname[0]}
              </AvatarFallback>
            </Avatar>
            <Link
              to={`/user/${item.user.nickname}`}
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              {item.user.nickname}
            </Link>
          </div>
          <div className="hidden min-w-[90px] items-center gap-1 px-2 pr-6 md:flex">
            {item.mostUnits.map((unit, i) => (
              <Avatar key={i} className="border-border bg-background h-7 w-7 border">
                <AvatarImage
                  src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.unit.thumbnailUrl}`}
                />
                <AvatarFallback className="bg-secondary text-[8px]">
                  {unit.unit.name[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="hidden min-w-[100px] px-2 pl-6 md:flex">
            <WinRateBar wins={item.totalSuccess} total={item.totalGames} />
          </div>
          <span className="text-foreground min-w-[70px] px-2 text-right font-mono text-sm font-semibold">
            {tab.type === 'score'
              ? item.totalScore.toLocaleString()
              : item.totalSuccess.toLocaleString()}
            <span className="text-muted-foreground ml-0.5 text-xs font-normal">{tab.unit}</span>
          </span>
        </div>
      ))}
    </>
  );
};

export default RankingListContainer;
