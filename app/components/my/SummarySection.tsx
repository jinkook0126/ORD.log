import { useMySummaryQuery } from '~/query/my';

import { Skeleton } from '../ui/skeleton';

const SummaryLoading = () => (
  <div className="space-y-4">
    <div className="border-border bg-secondary/20 rounded-lg border p-4">
      <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
        총 점수
      </span>
      <Skeleton className="h-5 w-20 rounded" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="border-border bg-secondary/20 rounded-lg border p-4">
        <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
          클리어 횟수
        </span>
        <Skeleton className="h-5 w-20 rounded" />
      </div>
      <div className="border-border bg-secondary/20 rounded-lg border p-4">
        <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
          평균 유닛
        </span>
        <Skeleton className="h-5 w-20 rounded" />
      </div>
    </div>
  </div>
);

const SummarySection = ({ nickname }: { nickname: string }) => {
  const { data: summary, isLoading } = useMySummaryQuery({ nickname });
  if (isLoading) {
    return <SummaryLoading />;
  }

  const avgUnit = summary?.totalUnitCount / summary?.totalGames || 0;
  return (
    <div className="space-y-4">
      <div className="border-border bg-secondary/20 rounded-lg border p-4">
        <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
          총 점수
        </span>
        <p className="text-foreground font-mono text-2xl font-bold">
          {summary.totalScore.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border-border bg-secondary/20 rounded-lg border p-4">
          <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
            클리어 횟수
          </span>
          <p className="text-foreground font-mono text-xl font-bold">
            {summary.totalSuccess.toLocaleString()}회
          </p>
        </div>
        <div className="border-border bg-secondary/20 rounded-lg border p-4">
          <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
            평균 유닛
          </span>
          <p className="text-foreground font-mono text-xl font-bold">{+avgUnit.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
