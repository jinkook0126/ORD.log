import { getTierStyle } from '~/lib/utils';
import { useMyMostUnitsQuery } from '~/query/my';

import WinRateBar from '../common/WinRateBar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import MostUnitLoading from './MostUnitLoading';

const MostUnitSection = ({ nickname }: { nickname: string }) => {
  const { data: mostUnits, isLoading } = useMyMostUnitsQuery({ nickname });
  if (isLoading || !mostUnits) {
    return <MostUnitLoading />;
  }
  return (
    <div className="pt-4">
      <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
        모스트 유닛
      </span>
      <div className="space-y-2">
        {mostUnits.map((unit) => (
          <div key={unit.unit.id} className="border-border rounded-lg border p-3">
            <div
              className="grid items-center gap-3"
              style={{ gridTemplateColumns: '120px 1fr auto' }}
            >
              <div className="flex items-start gap-2">
                <Avatar className="border-border h-12 w-12 shrink-0 border">
                  <AvatarImage
                    src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.unit.thumbnailUrl}`}
                  />
                  <AvatarFallback className="bg-secondary text-sm">
                    {unit.unit.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-foreground truncate text-[11px] leading-tight font-semibold">
                    {unit.unit.name.length > 7
                      ? `${unit.unit.name.substring(0, 7)}...`
                      : unit.unit.name}
                  </p>
                  <span
                    className={`w-fit rounded border px-1 py-0.5 text-[9px] font-semibold ${getTierStyle(unit.unit.grade.rank)}`}
                  >
                    {unit.unit.grade.name.slice(0, 2)}
                  </span>
                </div>
              </div>

              <div>
                <WinRateBar wins={unit.winCount} total={unit.pickCount} />
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-muted-foreground text-[10px]">평균</span>
                <span className="text-foreground font-mono text-sm font-bold">
                  {unit.avgUnitCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostUnitSection;
