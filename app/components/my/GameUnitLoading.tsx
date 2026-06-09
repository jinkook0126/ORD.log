import { Skeleton } from '../ui/skeleton';

const GameUnitLoading = () => {
  return (
    <>
      <div className="border-border border-b px-3 py-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-6 w-10 rounded-md" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-secondary/20 flex flex-col gap-3 rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
              </div>
              <Skeleton className="h-5 w-10 shrink-0 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1 rounded-md" />
              <Skeleton className="h-8 flex-1 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default GameUnitLoading;
