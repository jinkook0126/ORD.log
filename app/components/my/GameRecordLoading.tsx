import { Skeleton } from '../ui/skeleton';

const GameRecordLoading = () => {
  return (
    <>
      <div className="hidden md:block">
        <div className="border-border bg-secondary/30 grid grid-cols-[80px_100px_80px_1fr_120px] items-center gap-0 border-b px-4 py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-12 rounded" />
          ))}
        </div>

        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border-border border-b px-4 py-3 last:border-b-0">
            <div className="grid grid-cols-[80px_100px_80px_1fr_120px] items-center gap-0">
              <Skeleton className="h-5 w-10 rounded-full" />
              <Skeleton className="mx-auto h-4 w-16 rounded" />
              <Skeleton className="mx-auto h-4 w-6 rounded" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-6 rounded-full" />
                ))}
              </div>
              <Skeleton className="ml-auto h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="divide-border divide-y md:hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2 px-4 py-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-10 rounded" />
              <Skeleton className="h-10 rounded" />
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-6 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameRecordLoading;
