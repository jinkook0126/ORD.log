import { useMyRankingQuery } from '~/query/my';

import { Skeleton } from '../ui/skeleton';

const RankingLoading = () => {
  return (
    <div className="pt-4">
      <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
        랭킹정보
      </span>
      <div className="grid grid-cols-2 gap-3">
        <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-blue-400">신-점수</span>
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-blue-400">신-클리어</span>
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-red-400">악몽-점수</span>
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-red-400">악몽-클리어</span>
          <Skeleton className="h-5 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};

const RankingSection = ({ nickname }: { nickname: string }) => {
  const { data: ranking, isLoading } = useMyRankingQuery({ nickname });
  if (isLoading || !ranking) {
    return <RankingLoading />;
  }
  return (
    <div className="pt-4">
      <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
        랭킹정보
      </span>
      <div className="grid grid-cols-2 gap-3">
        <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-blue-400">신-점수</span>
          <p className="text-foreground font-mono text-lg font-bold">
            {ranking.godScoreRank ?? '-'}위
          </p>
        </div>
        <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-blue-400">신-클리어</span>
          <p className="text-foreground font-mono text-lg font-bold">
            {ranking.godClearRank ?? '-'}위
          </p>
        </div>
        <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-red-400">악몽-점수</span>
          <p className="text-foreground font-mono text-lg font-bold">
            {ranking.nightmareScoreRank ?? '-'}위
          </p>
        </div>
        <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <span className="mb-1 block text-xs font-semibold text-red-400">악몽-클리어</span>
          <p className="text-foreground font-mono text-lg font-bold">
            {ranking.nightmareClearRank ?? '-'}위
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankingSection;
