import { Skeleton } from '../ui/skeleton';

const MostUnitLoading = () => {
  return (
    <div className="pt-4">
      <Skeleton className="mb-3 h-3 w-16 rounded" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-border rounded-lg border p-3">
            <div
              className="grid items-center gap-3"
              style={{ gridTemplateColumns: '120px 1fr auto' }}
            >
              <div className="flex items-start gap-2">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-3 w-8 rounded" />
                </div>
              </div>
              <Skeleton className="h-6 w-full rounded" />
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-2.5 w-6 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostUnitLoading;
