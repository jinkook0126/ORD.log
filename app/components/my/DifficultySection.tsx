import { useMyDifficultySummaryQuery } from '~/query/my';

import { Skeleton } from '../ui/skeleton';

const DifficultyLoading = () => (
  <div className="pt-4">
    <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
      난이도별 정보
    </span>
    <div className="grid grid-cols-2 gap-3">
      <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
        <p className="mb-3 text-xs font-semibold text-blue-400">신</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">클리어</span>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">승률</span>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">평균 유닛</span>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </div>
      </div>

      <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
        <p className="mb-3 text-xs font-semibold text-red-400">악몽</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">클리어</span>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">승률</span>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">평균 유닛</span>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DifficultySection = ({ nickname }: { nickname: string }) => {
  const { data: summary, isLoading } = useMyDifficultySummaryQuery({ nickname });
  if (isLoading) {
    return <DifficultyLoading />;
  }
  return (
    <div className="pt-4">
      <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
        난이도별 정보
      </span>
      <div className="grid grid-cols-2 gap-3">
        {/* 신 모드 */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
          <p className="mb-3 text-xs font-semibold text-blue-400">신</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">클리어</span>
              <span className="text-foreground font-mono text-xs font-bold">
                {summary.god?.totalSuccess ?? 0}회
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">승률</span>
              <span className="text-foreground font-mono text-xs font-bold">
                {Number(
                  ((summary.god?.totalSuccess / summary.god?.totalGames || 0) * 100).toFixed(1),
                )}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">평균 유닛</span>
              <span className="text-foreground font-mono text-xs font-bold">
                {+(summary.god?.totalUnitCount / summary.god?.totalSuccess || 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="mb-3 text-xs font-semibold text-red-400">악몽</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">클리어</span>
              <span className="text-foreground font-mono text-xs font-bold">
                {summary.nightmare?.totalSuccess ?? 0}회
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">승률</span>
              <span className="text-foreground font-mono text-xs font-bold">
                {+(summary.nightmare?.totalSuccess / summary.nightmare?.totalGames || 0) * 100}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">평균 유닛</span>
              <span className="text-foreground font-mono text-xs font-bold">
                {
                  +(
                    summary.nightmare?.totalUnitCount / summary.nightmare?.totalSuccess || 0
                  ).toFixed(1)
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySection;
