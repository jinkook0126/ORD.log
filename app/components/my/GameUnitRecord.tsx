import { useState } from 'react';
import { useParams } from 'react-router';

import { getTierStyle } from '~/lib/utils';
import { useMyUnitSummaryQuery } from '~/query/my';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
type UnitStatMode = '통합' | '신' | '악몽';
export function GameUnitRecord() {
  const { nickname } = useParams();
  const [unitStatMode, setUnitStatMode] = useState<UnitStatMode>('통합');
  const { data: unitSummary, isLoading } = useMyUnitSummaryQuery({
    nickname: nickname!,
    difficulty: unitStatMode === '신' ? 'GOD' : unitStatMode === '악몽' ? 'NIGHTMARE' : undefined,
  });
  if (isLoading || !unitSummary) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* 난이도 서브탭 */}
      <div className="border-border border-b px-3 py-2">
        <div className="flex gap-1">
          {(['통합', '신', '악몽'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setUnitStatMode(mode)}
              className={`cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-all duration-150 ${
                unitStatMode === mode
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
        {unitSummary.map((unit) => (
          <div
            key={unit.unitId}
            className="border-border bg-secondary/20 hover:bg-secondary/40 flex flex-col gap-3 rounded-lg border p-3 transition-colors"
          >
            {/* 상단: 썸네일 + 이름 + 횟수 뱃지 */}
            <div className="flex items-center gap-3">
              <Avatar className="border-border h-11 w-11 shrink-0 border">
                <AvatarImage src={unit.thumbnailUrl} />
                <AvatarFallback className="bg-secondary text-sm">{unit.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-foreground truncate text-sm font-semibold">{unit.name}</p>
                  <span
                    className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${getTierStyle(unit.grade)}`}
                  >
                    {unit.gradeName}
                  </span>
                </div>
              </div>
              <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                {unit.pickCount}회
              </span>
            </div>

            {/* 하단: 통계 뱃지 2개 */}
            <div className="flex gap-2">
              <div className="border-border bg-background flex flex-1 items-center justify-between rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground text-[11px]">평균 유닛</span>
                <span className="text-foreground font-mono text-xs font-bold">
                  {unit.avgUnitCount.toFixed(1)}
                </span>
              </div>
              <div className="border-border bg-background flex flex-1 items-center justify-between rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground text-[11px]">승률</span>
                <span className="text-foreground font-mono text-xs font-bold">
                  {unit.winRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
