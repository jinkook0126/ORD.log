import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';

interface ClearItem {
  id: number;
  photo: string;
  nickname: string;
  mode: '신' | '악몽';
  unitCount: number;
  score: number;
  minutesAgo: number;
}

const DUMMY_DATA: ClearItem[] = [
  {
    id: 1,
    photo: '/public/assets/test.webp',
    nickname: 'DarkSlayer',
    mode: '신',
    unitCount: 12,
    score: 98520,
    minutesAgo: 2,
  },
  {
    id: 2,
    photo: '/public/assets/test.webp',
    nickname: '루나틱',
    mode: '악몽',
    unitCount: 8,
    score: 76300,
    minutesAgo: 5,
  },
  {
    id: 3,
    photo: '/public/assets/test.webp',
    nickname: 'StormBringer',
    mode: '신',
    unitCount: 15,
    score: 112400,
    minutesAgo: 12,
  },
  {
    id: 4,
    photo: '/public/assets/test.webp',
    nickname: '섀도우',
    mode: '악몽',
    unitCount: 10,
    score: 85100,
    minutesAgo: 34,
  },
];

function formatTimeAgo(minutes: number): string {
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export default function RecentClears() {
  return (
    <section className="border-border bg-card mx-auto w-full max-w-7xl rounded-lg border p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          <span className="text-primary font-mono">&gt;</span> 최근 클리어
        </h2>
        <Link
          to="/clears"
          className="text-muted-foreground hover:text-primary text-xs transition-colors"
        >
          더보기 →
        </Link>
      </div>
      {DUMMY_DATA.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="mb-3 text-3xl">📋</span>
          <p className="text-muted-foreground text-sm font-medium">아직 클리어 기록이 없습니다</p>
          <p className="text-muted-foreground/60 mt-1 text-xs">첫 번째 클리어를 등록해보세요!</p>
        </div>
      ) : (
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DUMMY_DATA.map((item) => (
            <div
              key={item.id}
              className="border-border bg-secondary/50 hover:bg-secondary flex cursor-pointer flex-col items-center overflow-hidden rounded-lg border transition-colors"
            >
              <div className="bg-muted aspect-2/1 w-full">
                <img src={item.photo} alt={item.nickname} className="h-full w-full object-cover" />
              </div>
              <div className="flex w-full flex-col items-center gap-1.5 p-3">
                <span className="text-foreground w-full truncate text-center text-sm font-semibold">
                  {item.nickname}
                </span>
                <Badge
                  variant={item.mode === '신' ? 'default' : 'destructive'}
                  className="px-2 py-0 text-[10px]"
                >
                  {item.mode}
                </Badge>
                <span className="text-primary font-mono text-sm font-bold">
                  유닛 카운트 : {item.unitCount}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {item.score.toLocaleString()}점
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {formatTimeAgo(item.minutesAgo)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
