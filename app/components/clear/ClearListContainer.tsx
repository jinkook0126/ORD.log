import { Skeleton } from '~/components/ui/skeleton';
import type { TClearItem } from '~/db/clear';

import ClearCard from './ClearItem';

const Loading = () => (
  <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="border-border bg-secondary/50 flex flex-col items-center overflow-hidden rounded-lg border"
      >
        <Skeleton className="aspect-2/1 w-full rounded-none" />
      </div>
    ))}
  </div>
);
const Empty = () => (
  <div className="border-border bg-card flex flex-col items-center justify-center rounded-lg border py-20 text-center">
    <span className="mb-3 text-3xl">📋</span>
    <p className="text-muted-foreground text-sm font-medium">아직 클리어 기록이 없습니다</p>
    <p className="text-muted-foreground/60 mt-1 text-xs">첫 번째 클리어를 등록해보세요!</p>
  </div>
);
export default function ClearListContainer({ list }: { list?: TClearItem[] }) {
  if (!list) return <Loading />;
  if (list.length === 0) return <Empty />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => (
        <ClearCard key={item.id} item={item} />
      ))}
    </div>
  );
}
