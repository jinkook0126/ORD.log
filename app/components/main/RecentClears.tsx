import type { Difficulty } from 'generated/prisma/enums';
import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import { Skeleton } from '~/components/ui/skeleton';
import { formatTimeAgo, getLabelWithDifficulty, getModeBadgeVariant } from '~/lib/utils';

interface ClearItem {
  id: number;
  createdAt: string;
  difficulty: Difficulty;
  imageUrl: string;
  score: number;
  success: boolean;
  unitCount: number;
  user: {
    id: number;
    nickname: string;
  };
}

function Loading() {
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="border-border bg-secondary/50 flex flex-col items-center overflow-hidden rounded-lg border"
        >
          <Skeleton className="aspect-2/1 w-full rounded-none" />
          <div className="flex w-full flex-col items-center gap-1.5 p-3">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="mb-3 text-3xl">📋</span>
      <p className="text-muted-foreground text-sm font-medium">아직 클리어 기록이 없습니다</p>
      <p className="text-muted-foreground/60 mt-1 text-xs">첫 번째 클리어를 등록해보세요!</p>
    </div>
  );
}
function ListContainer({ data }: { data?: ClearItem[] }) {
  if (!data) return <Loading />;
  if (data.length === 0) return <Empty />;
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="border-border bg-secondary/50 hover:bg-secondary flex cursor-pointer flex-col items-center overflow-hidden rounded-lg border transition-colors"
        >
          <div className="bg-muted aspect-2/1 w-full">
            <img
              src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/screen/${item.imageUrl}`}
              alt={item.imageUrl}
              className="h-[130px] w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-1.5 p-3">
            <span className="text-foreground w-full truncate text-center text-sm font-semibold">
              {item.user.nickname}
            </span>
            <Badge variant={getModeBadgeVariant(item.difficulty)} className="px-2 py-0 text-[10px]">
              {getLabelWithDifficulty(item.difficulty)}
            </Badge>
            <span className="text-primary font-mono text-sm font-bold">
              유닛 카운트 : {item.unitCount}
            </span>
            <span className="text-muted-foreground font-mono text-xs">
              {item.score.toLocaleString()}점
            </span>
            <span className="text-muted-foreground text-[10px]">
              {formatTimeAgo(item.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default function RecentClears({ data }: { data?: ClearItem[] }) {
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
      <ListContainer data={data} />
    </section>
  );
}
