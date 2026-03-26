import { useState } from 'react';
import { useParams } from 'react-router';

import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';

interface GameRecord {
  id: number;
  mode: '신' | '악몽';
  cleared: boolean;
  score: number;
  unitCount: number;
  clearedUnits: string[];
  date: string;
}

interface UnitStat {
  id: number;
  unitName: string;
  used: number;
  wins: number;
}

const DUMMY_RECORDS: GameRecord[] = [
  {
    id: 1,
    mode: '신',
    cleared: true,
    score: 45200,
    unitCount: 3,
    clearedUnits: ['불사조', '아르키온', '케이스'],
    date: '2026-03-26T14:30:00',
  },
  {
    id: 2,
    mode: '악몽',
    cleared: true,
    score: 52100,
    unitCount: 4,
    clearedUnits: ['아르키온', '케이스', '슬로우', '팬텀'],
    date: '2026-03-26T13:15:00',
  },
  {
    id: 3,
    mode: '신',
    cleared: false,
    score: 18500,
    unitCount: 2,
    clearedUnits: [],
    date: '2026-03-26T10:45:00',
  },
  {
    id: 4,
    mode: '신',
    cleared: true,
    score: 48900,
    unitCount: 3,
    clearedUnits: ['케이스', '슬로우', '팬텀'],
    date: '2026-03-25T14:30:00',
  },
  {
    id: 5,
    mode: '악몽',
    cleared: true,
    score: 35600,
    unitCount: 2,
    clearedUnits: ['불사조', '슬로우'],
    date: '2026-03-24T09:20:00',
  },
  {
    id: 6,
    mode: '신',
    cleared: true,
    score: 51200,
    unitCount: 3,
    clearedUnits: ['아르키온', '케이스', '팬텀'],
    date: '2026-03-23T16:45:00',
  },
  {
    id: 7,
    mode: '악몽',
    cleared: false,
    score: 22100,
    unitCount: 1,
    clearedUnits: [],
    date: '2026-03-22T11:30:00',
  },
  {
    id: 8,
    mode: '신',
    cleared: true,
    score: 46800,
    unitCount: 2,
    clearedUnits: ['팬텀', '아르키온'],
    date: '2026-03-20T15:00:00',
  },
];

const DUMMY_UNIT_STATS: UnitStat[] = [
  { id: 1, unitName: '불사조', used: 45, wins: 38 },
  { id: 2, unitName: '아르키온', used: 42, wins: 35 },
  { id: 3, unitName: '케이스', used: 38, wins: 32 },
  { id: 4, unitName: '슬로우', used: 35, wins: 28 },
  { id: 5, unitName: '팬텀', used: 32, wins: 26 },
];

type TabType = '게임기록' | '유닛통계';

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;

  return date.toLocaleDateString('ko-KR');
}

export default function UserDetail() {
  const { nickname } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('게임기록');

  return (
    <main className="mx-auto max-w-6xl px-8 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-primary font-mono">&gt;</span> {nickname}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr]">
        {/* 좌측: 프로필 영역 (비어있음) */}
        <div className="border-border bg-card rounded-lg border p-6">
          <div className="text-muted-foreground py-16 text-center">프로필 영역</div>
        </div>

        {/* 우측: 게임 기록 및 유닛통계 */}
        <div className="border-border bg-card rounded-lg border">
          {/* 탭 */}
          <div className="border-border flex gap-1 border-b p-1">
            {(['게임기록', '유닛통계'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold transition-all duration-150 ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 게임 기록 탭 */}
          {activeTab === '게임기록' && (
            <>
              <div className="border-border bg-secondary/30 grid grid-cols-[80px_100px_80px_1fr_120px] items-center gap-0 border-b px-4 py-3">
                <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                  난이도
                </span>
                <span className="text-muted-foreground text-center text-xs font-semibold tracking-widest uppercase">
                  클리어 점수
                </span>
                <span className="text-muted-foreground text-center text-xs font-semibold tracking-widest uppercase">
                  유닛카운트
                </span>
                <span className="text-muted-foreground text-center text-xs font-semibold tracking-widest uppercase">
                  클리어유닛
                </span>
                <span className="text-muted-foreground text-right text-xs font-semibold tracking-widest uppercase">
                  날짜
                </span>
              </div>

              {DUMMY_RECORDS.map((record) => (
                <div
                  key={record.id}
                  className={`border-border grid grid-cols-[80px_100px_80px_1fr_120px] items-center gap-0 border-b px-4 py-3 transition-colors last:border-b-0 ${
                    record.cleared
                      ? 'bg-blue-500/15 hover:bg-blue-500/20'
                      : 'bg-red-500/15 hover:bg-red-500/20'
                  }`}
                >
                  <Badge
                    variant={record.mode === '신' ? 'default' : 'destructive'}
                    className="w-fit"
                  >
                    {record.mode}
                  </Badge>
                  <span className="text-foreground text-center font-mono text-sm">
                    {record.score.toLocaleString()}
                  </span>
                  <span className="text-foreground text-center text-sm">{record.unitCount}</span>
                  <div className="flex items-center gap-1">
                    {record.clearedUnits.slice(0, 4).map((unit, idx) => (
                      <Avatar key={idx} className="border-border h-6 w-6 border text-[10px]">
                        <AvatarFallback className="bg-secondary">{unit[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {record.clearedUnits.length > 4 && (
                      <Avatar className="border-border bg-secondary flex h-6 w-6 items-center justify-center border text-[10px]">
                        <span className="font-semibold">+{record.clearedUnits.length - 4}</span>
                      </Avatar>
                    )}
                  </div>
                  <span className="text-muted-foreground text-right text-xs">
                    {getRelativeTime(record.date)}
                  </span>
                </div>
              ))}
            </>
          )}

          {/* 유닛통계 탭 */}
          {activeTab === '유닛통계' && (
            <>
              <div className="border-border bg-secondary/30 grid grid-cols-[1fr_80px_80px_120px] items-center gap-0 border-b px-4 py-3">
                <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                  유닛명
                </span>
                <span className="text-muted-foreground text-center text-xs font-semibold tracking-widest uppercase">
                  사용
                </span>
                <span className="text-muted-foreground text-center text-xs font-semibold tracking-widest uppercase">
                  승리
                </span>
                <span className="text-muted-foreground px-2 text-right text-xs font-semibold tracking-widest uppercase">
                  승률
                </span>
              </div>

              {DUMMY_UNIT_STATS.map((unit) => {
                const winRate = unit.used > 0 ? ((unit.wins / unit.used) * 100).toFixed(0) : 0;
                return (
                  <div
                    key={unit.id}
                    className="border-border hover:bg-secondary/40 grid grid-cols-[1fr_80px_80px_120px] items-center gap-0 border-b px-4 py-3 transition-colors last:border-b-0"
                  >
                    <span className="text-foreground text-sm font-medium">{unit.unitName}</span>
                    <span className="text-foreground text-center text-sm">{unit.used}</span>
                    <span className="text-foreground text-center text-sm">{unit.wins}</span>
                    <span className="text-muted-foreground px-2 text-right font-mono text-sm">
                      {winRate}%
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
