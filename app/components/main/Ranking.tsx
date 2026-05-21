import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import { Skeleton } from '~/components/ui/skeleton';
import type { Difficulty } from '~/lib/prismaClient';

interface RankItem {
  difficulty: Difficulty;
  totalGames: number;
  totalScore: number;
  totalSuccess: number;
  totalUnitCount: number;
  userId: number;
  user: {
    id: number;
    nickname: string;
  };
}

function getRankColor(rank: number): string {
  switch (rank) {
    case 1:
      return 'text-yellow-400';
    case 2:
      return 'text-gray-300';
    case 3:
      return 'text-amber-600';
    default:
      return 'text-muted-foreground';
  }
}

function LoadingRankList({ mode }: { mode: '신' | '악몽' }) {
  return (
    <div className="flex-1 space-y-1">
      <div className="mb-3">
        <Badge variant={mode === '신' ? 'default' : 'destructive'} className="text-xs">
          {mode}
        </Badge>
      </div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2">
            <Skeleton className="h-5 w-6 rounded" />
            <Skeleton className="h-4 flex-1 rounded" />
            <Skeleton className="h-3 w-10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyRankList({ mode }: { mode: '신' | '악몽' }) {
  return (
    <div className="flex-1 space-y-1">
      <div className="mb-3">
        <Badge variant={mode === '신' ? 'default' : 'destructive'} className="text-xs">
          {mode}
        </Badge>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <span className="mb-2 text-2xl">🏆</span>
        <p className="text-muted-foreground text-sm">아직 클리어 기록이 없습니다</p>
        <p className="text-muted-foreground/60 mt-1 text-xs">첫 번째 도전자가 되어보세요!</p>
      </div>
    </div>
  );
}

function RankList({ data, mode }: { data?: RankItem[]; mode: '신' | '악몽' }) {
  if (!data) return <LoadingRankList mode={mode} />;
  if (data.length === 0) return <EmptyRankList mode={mode} />;

  return (
    <div className="flex-1 space-y-1">
      <div className="mb-3">
        <Badge variant={mode === '신' ? 'default' : 'destructive'} className="text-xs">
          {mode}
        </Badge>
      </div>
      {data.map((item, index) => (
        <div
          key={item.userId}
          className="hover:bg-secondary/50 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors"
        >
          <span
            className={`w-6 text-center font-mono text-sm font-bold ${getRankColor(index + 1)}`}
          >
            {index + 1}
          </span>
          <span className="text-foreground flex-1 truncate text-sm font-medium">
            {item.user.nickname}
          </span>
          <span className="text-muted-foreground font-mono text-xs">{item.totalSuccess}회</span>
        </div>
      ))}
    </div>
  );
}

export function Ranking({ god, nightmare }: { god?: RankItem[]; nightmare?: RankItem[] }) {
  return (
    <section className="border-border bg-card rounded-lg border p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          <span className="text-primary font-mono">&gt;</span> 랭킹
        </h2>
        <Link
          to="/ranking"
          className="text-muted-foreground hover:text-primary text-xs transition-colors"
        >
          더보기 →
        </Link>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <RankList data={god} mode="신" />
        <RankList data={nightmare} mode="악몽" />
      </div>
    </section>
  );
}
