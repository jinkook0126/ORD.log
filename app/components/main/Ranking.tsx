import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';

interface RankItem {
  rank: number;
  nickname: string;
  clearCount: number;
}

const NIGHTMARE_DATA: RankItem[] = [
  { rank: 1, nickname: 'DarkSlayer', clearCount: 42 },
  { rank: 2, nickname: '루나틱', clearCount: 38 },
  { rank: 3, nickname: '섀도우', clearCount: 31 },
  { rank: 4, nickname: 'StormBringer', clearCount: 27 },
  { rank: 5, nickname: 'PhoenixRise', clearCount: 22 },
];

const GOD_DATA: RankItem[] = [
  { rank: 1, nickname: 'StormBringer', clearCount: 55 },
  { rank: 2, nickname: 'PhoenixRise', clearCount: 49 },
  { rank: 3, nickname: 'DarkSlayer', clearCount: 44 },
  { rank: 4, nickname: '루나틱', clearCount: 36 },
  { rank: 5, nickname: '섀도우', clearCount: 30 },
];

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

function RankList({ data, mode }: { data: RankItem[]; mode: '신' | '악몽' }) {
  return (
    <div className="flex-1 space-y-1">
      <div className="mb-3">
        <Badge variant={mode === '신' ? 'default' : 'destructive'} className="text-xs">
          {mode}
        </Badge>
      </div>
      {data.map((item) => (
        <div
          key={item.rank}
          className="hover:bg-secondary/50 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors"
        >
          <span
            className={`w-6 text-center font-mono text-sm font-bold ${getRankColor(item.rank)}`}
          >
            {item.rank}
          </span>
          <span className="text-foreground flex-1 truncate text-sm font-medium">
            {item.nickname}
          </span>
          <span className="text-muted-foreground font-mono text-xs">{item.clearCount}회</span>
        </div>
      ))}
    </div>
  );
}

export function Ranking() {
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
        <RankList data={GOD_DATA} mode="신" />
        <RankList data={NIGHTMARE_DATA} mode="악몽" />
      </div>
    </section>
  );
}
