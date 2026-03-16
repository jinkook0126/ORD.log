import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { formatTimeAgo, getModeBadgeVariant } from '~/lib/utils';

interface ClearItem {
  id: number;
  photo: string;
  nickname: string;
  mode: '신' | '악몽' | '지옥';
  unitCount: number;
  score: number;
  minutesAgo: number;
  units: string[];
}

const DUMMY_DATA: ClearItem[] = [
  {
    id: 1,
    photo: '/public/assets/test.webp',
    nickname: '눈떠보니옆에',
    mode: '지옥',
    unitCount: 9,
    score: 24968,
    minutesAgo: 1,
    units: Array(12).fill('/placeholder.svg'),
  },
  {
    id: 2,
    photo: '/public/assets/test.webp',
    nickname: 'DarkSlayer',
    mode: '신',
    unitCount: 12,
    score: 98520,
    minutesAgo: 2,
    units: Array(8).fill('/placeholder.svg'),
  },
  {
    id: 3,
    photo: '/public/assets/test.webp',
    nickname: '루나틱',
    mode: '악몽',
    unitCount: 8,
    score: 76300,
    minutesAgo: 5,
    units: Array(6).fill('/placeholder.svg'),
  },
  {
    id: 4,
    photo: '/public/assets/test.webp',
    nickname: 'StormBringer',
    mode: '신',
    unitCount: 15,
    score: 112400,
    minutesAgo: 12,
    units: Array(10).fill('/placeholder.svg'),
  },
  {
    id: 5,
    photo: '/public/assets/test.webp',
    nickname: '섀도우',
    mode: '악몽',
    unitCount: 10,
    score: 85100,
    minutesAgo: 34,
    units: Array(14).fill('/placeholder.svg'),
  },
  {
    id: 6,
    photo: '/public/assets/test.webp',
    nickname: 'PhoenixRise',
    mode: '신',
    unitCount: 14,
    score: 105800,
    minutesAgo: 58,
    units: Array(9).fill('/placeholder.svg'),
  },
];

const MAX_VISIBLE_UNITS = 5;

function ClearCard({ item }: { item: ClearItem }) {
  const visibleUnits = item.units.slice(0, MAX_VISIBLE_UNITS);
  const remaining = item.units.length - MAX_VISIBLE_UNITS;

  return (
    <div className="group border-border bg-card hover:border-primary/40 hover:shadow-primary/10 overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        <img
          src={item.photo}
          alt={item.nickname}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="from-background/80 absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge
            variant={getModeBadgeVariant(item.mode)}
            className="px-2 py-0.5 text-[10px] shadow-sm"
          >
            {item.mode}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/user/${item.nickname}`}
            className="text-foreground hover:text-primary truncate text-sm font-semibold transition-colors"
          >
            {item.nickname}
          </Link>
          <span className="border-border bg-secondary text-muted-foreground shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium">
            {formatTimeAgo(item.minutesAgo)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border-border bg-secondary/40 rounded-md border px-3 py-2">
            <p className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Unit Count
            </p>
            <p className="text-primary mt-1 font-mono text-sm font-semibold">{item.unitCount}</p>
          </div>
          <div className="border-border bg-secondary/40 rounded-md border px-3 py-2">
            <p className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Score
            </p>
            <p className="text-foreground mt-1 font-mono text-sm font-semibold">
              {item.score.toLocaleString()}점
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 pt-1">
          {visibleUnits.map((src, i) => (
            <Avatar key={i} className="border-border bg-background h-7 w-7 border">
              <AvatarImage src={src} />
              <AvatarFallback className="bg-secondary text-[8px]">U</AvatarFallback>
            </Avatar>
          ))}
          {remaining > 0 && (
            <span className="border-border bg-secondary text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-medium">
              +{remaining}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
const clears = () => {
  return (
    <div className="container max-w-5xl pb-12">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 최근 클리어
        </h1>
      </div>

      {DUMMY_DATA.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center justify-center rounded-lg border py-20 text-center">
          <span className="mb-3 text-3xl">📋</span>
          <p className="text-muted-foreground text-sm font-medium">아직 클리어 기록이 없습니다</p>
          <p className="text-muted-foreground/60 mt-1 text-xs">첫 번째 클리어를 등록해보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_DATA.map((item) => (
            <ClearCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
export default clears;
