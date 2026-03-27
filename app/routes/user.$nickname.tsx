import { useState } from 'react';
import { useParams } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';

interface GameUnit {
  name: string;
  photo: string;
}

interface GameRecord {
  id: number;
  mode: '신' | '악몽';
  cleared: boolean;
  score: number;
  unitCount: number;
  clearedUnits: GameUnit[];
  screenshot: string;
  date: string;
}

type UnitTier = '초월' | '영원' | '제한' | '전설';

interface UnitStat {
  id: number;
  unitName: string;
  tier: UnitTier;
  photo: string;
  count: number;
  avgUnitCount: number;
  minUnitCount: number;
  wins: number;
  losses: number;
}

const UNIT_PHOTO = '/public/assets/test.webp';
const SCREENSHOT = '/public/assets/test.webp';

const DUMMY_RECORDS: GameRecord[] = [
  {
    id: 1,
    mode: '신',
    cleared: true,
    score: 45200,
    unitCount: 3,
    clearedUnits: [
      { name: '불사조', photo: UNIT_PHOTO },
      { name: '아르키온', photo: UNIT_PHOTO },
      { name: '케이스', photo: UNIT_PHOTO },
    ],
    screenshot: SCREENSHOT,
    date: '2026-03-26T14:30:00',
  },
  {
    id: 2,
    mode: '악몽',
    cleared: true,
    score: 52100,
    unitCount: 4,
    clearedUnits: [
      { name: '아르키온', photo: UNIT_PHOTO },
      { name: '케이스', photo: UNIT_PHOTO },
      { name: '슬로우', photo: UNIT_PHOTO },
      { name: '팬텀', photo: UNIT_PHOTO },
    ],
    screenshot: SCREENSHOT,
    date: '2026-03-26T13:15:00',
  },
  {
    id: 3,
    mode: '신',
    cleared: false,
    score: 18500,
    unitCount: 2,
    clearedUnits: [],
    screenshot: SCREENSHOT,
    date: '2026-03-26T10:45:00',
  },
  {
    id: 4,
    mode: '신',
    cleared: true,
    score: 48900,
    unitCount: 3,
    clearedUnits: [
      { name: '케이스', photo: UNIT_PHOTO },
      { name: '슬로우', photo: UNIT_PHOTO },
      { name: '팬텀', photo: UNIT_PHOTO },
    ],
    screenshot: SCREENSHOT,
    date: '2026-03-25T14:30:00',
  },
  {
    id: 5,
    mode: '악몽',
    cleared: true,
    score: 35600,
    unitCount: 2,
    clearedUnits: [
      { name: '불사조', photo: UNIT_PHOTO },
      { name: '슬로우', photo: UNIT_PHOTO },
    ],
    screenshot: SCREENSHOT,
    date: '2026-03-24T09:20:00',
  },
  {
    id: 6,
    mode: '신',
    cleared: true,
    score: 51200,
    unitCount: 3,
    clearedUnits: [
      { name: '아르키온', photo: UNIT_PHOTO },
      { name: '케이스', photo: UNIT_PHOTO },
      { name: '팬텀', photo: UNIT_PHOTO },
    ],
    screenshot: SCREENSHOT,
    date: '2026-03-23T16:45:00',
  },
  {
    id: 7,
    mode: '악몽',
    cleared: false,
    score: 22100,
    unitCount: 1,
    clearedUnits: [],
    screenshot: SCREENSHOT,
    date: '2026-03-22T11:30:00',
  },
  {
    id: 8,
    mode: '신',
    cleared: true,
    score: 46800,
    unitCount: 2,
    clearedUnits: [
      { name: '팬텀', photo: UNIT_PHOTO },
      { name: '아르키온', photo: UNIT_PHOTO },
    ],
    screenshot: SCREENSHOT,
    date: '2026-03-20T15:00:00',
  },
];

type UnitStatMode = '통합' | '신' | '악몽';

// 더미 랭킹 데이터
interface RankingEntry {
  nickname: string;
  shinMaxScore: number;
  shinClears: number;
  nightmareMaxScore: number;
  nightmareClears: number;
}

const DUMMY_RANKINGS: RankingEntry[] = [
  {
    nickname: '플레이어1',
    shinMaxScore: 58900,
    shinClears: 12,
    nightmareMaxScore: 62100,
    nightmareClears: 8,
  },
  {
    nickname: '플레이어2',
    shinMaxScore: 56200,
    shinClears: 11,
    nightmareMaxScore: 59800,
    nightmareClears: 7,
  },
  {
    nickname: '플레이어3',
    shinMaxScore: 54500,
    shinClears: 10,
    nightmareMaxScore: 57500,
    nightmareClears: 6,
  },
  {
    nickname: '플레이어4',
    shinMaxScore: 51200,
    shinClears: 9,
    nightmareMaxScore: 55200,
    nightmareClears: 5,
  },
  {
    nickname: '플레이어5',
    shinMaxScore: 48900,
    shinClears: 8,
    nightmareMaxScore: 52100,
    nightmareClears: 4,
  },
  {
    nickname: '플레이어6',
    shinMaxScore: 45200,
    shinClears: 7,
    nightmareMaxScore: 49500,
    nightmareClears: 3,
  },
];

const DUMMY_UNIT_STATS: Record<UnitStatMode, UnitStat[]> = {
  통합: [
    {
      id: 1,
      unitName: '불사조',
      tier: '초월',
      photo: UNIT_PHOTO,
      count: 45,
      avgUnitCount: 3.2,
      minUnitCount: 2,
      wins: 38,
      losses: 7,
    },
    {
      id: 2,
      unitName: '아르키온',
      tier: '제한',
      photo: UNIT_PHOTO,
      count: 42,
      avgUnitCount: 2.8,
      minUnitCount: 1,
      wins: 35,
      losses: 7,
    },
    {
      id: 3,
      unitName: '케이스',
      tier: '영원',
      photo: UNIT_PHOTO,
      count: 38,
      avgUnitCount: 3.5,
      minUnitCount: 2,
      wins: 31,
      losses: 7,
    },
    {
      id: 4,
      unitName: '슬로우',
      tier: '전설',
      photo: UNIT_PHOTO,
      count: 35,
      avgUnitCount: 4.1,
      minUnitCount: 3,
      wins: 29,
      losses: 6,
    },
    {
      id: 5,
      unitName: '팬텀',
      tier: '초월',
      photo: UNIT_PHOTO,
      count: 32,
      avgUnitCount: 2.6,
      minUnitCount: 1,
      wins: 26,
      losses: 6,
    },
  ],
  신: [
    {
      id: 1,
      unitName: '아르키온',
      tier: '제한',
      photo: UNIT_PHOTO,
      count: 28,
      avgUnitCount: 2.7,
      minUnitCount: 1,
      wins: 23,
      losses: 5,
    },
    {
      id: 2,
      unitName: '케이스',
      tier: '영원',
      photo: UNIT_PHOTO,
      count: 25,
      avgUnitCount: 3.1,
      minUnitCount: 2,
      wins: 20,
      losses: 5,
    },
    {
      id: 3,
      unitName: '팬텀',
      tier: '초월',
      photo: UNIT_PHOTO,
      count: 20,
      avgUnitCount: 2.4,
      minUnitCount: 1,
      wins: 16,
      losses: 4,
    },
    {
      id: 4,
      unitName: '불사조',
      tier: '초월',
      photo: UNIT_PHOTO,
      count: 18,
      avgUnitCount: 3.0,
      minUnitCount: 2,
      wins: 15,
      losses: 3,
    },
    {
      id: 5,
      unitName: '슬로우',
      tier: '전설',
      photo: UNIT_PHOTO,
      count: 15,
      avgUnitCount: 3.8,
      minUnitCount: 3,
      wins: 13,
      losses: 2,
    },
  ],
  악몽: [
    {
      id: 1,
      unitName: '불사조',
      tier: '초월',
      photo: UNIT_PHOTO,
      count: 27,
      avgUnitCount: 3.4,
      minUnitCount: 2,
      wins: 23,
      losses: 4,
    },
    {
      id: 2,
      unitName: '슬로우',
      tier: '전설',
      photo: UNIT_PHOTO,
      count: 20,
      avgUnitCount: 4.5,
      minUnitCount: 3,
      wins: 16,
      losses: 4,
    },
    {
      id: 3,
      unitName: '아르키온',
      tier: '제한',
      photo: UNIT_PHOTO,
      count: 14,
      avgUnitCount: 3.1,
      minUnitCount: 2,
      wins: 12,
      losses: 2,
    },
    {
      id: 4,
      unitName: '케이스',
      tier: '영원',
      photo: UNIT_PHOTO,
      count: 13,
      avgUnitCount: 4.0,
      minUnitCount: 3,
      wins: 11,
      losses: 2,
    },
    {
      id: 5,
      unitName: '팬텀',
      tier: '초월',
      photo: UNIT_PHOTO,
      count: 12,
      avgUnitCount: 2.9,
      minUnitCount: 1,
      wins: 10,
      losses: 2,
    },
  ],
};

type TabType = '게임기록' | '유닛통계';

function getTierStyle(tier: UnitTier) {
  switch (tier) {
    case '초월':
      return 'bg-violet-500/15 text-violet-400 border-violet-500/30';
    case '영원':
      return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    case '제한':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case '전설':
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  }
}

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

function WinRateBar({ wins, losses }: { wins: number; losses: number }) {
  const total = wins + losses;
  const winPercentage = total > 0 ? (wins / total) * 100 : 0;
  const lossPercentage = 100 - winPercentage;

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex h-5 w-24 overflow-hidden rounded-sm">
        <div
          className="flex h-full items-center justify-start bg-blue-500"
          style={{ width: `${winPercentage}%` }}
        >
          {winPercentage > 25 && (
            <span className="pl-1 text-[9px] font-bold text-white">{wins}승</span>
          )}
        </div>
        <div
          className="flex h-full items-center justify-end bg-red-500"
          style={{ width: `${lossPercentage}%` }}
        >
          {lossPercentage > 25 && (
            <span className="pr-1 text-[9px] font-bold text-white">{losses}패</span>
          )}
        </div>
      </div>
      <span className="text-muted-foreground text-xs font-medium whitespace-nowrap">
        {winPercentage.toFixed(0)}%
      </span>
    </div>
  );
}

export default function UserDetail() {
  const { nickname } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('게임기록');
  const [openId, setOpenId] = useState<number | null>(null);
  const [unitStatMode, setUnitStatMode] = useState<UnitStatMode>('통합');

  const totalScore = DUMMY_RECORDS.reduce((sum, record) => sum + record.score, 0);
  const totalClears = DUMMY_RECORDS.filter((record) => record.cleared).length;
  const avgUnit =
    DUMMY_RECORDS.length > 0
      ? (
          DUMMY_RECORDS.reduce((sum, record) => sum + record.unitCount, 0) / DUMMY_RECORDS.length
        ).toFixed(1)
      : 0;

  // 난이도별 통계
  const shinRecords = DUMMY_RECORDS.filter((r) => r.mode === '신');
  const nightmareRecords = DUMMY_RECORDS.filter((r) => r.mode === '악몽');

  const myShiMaxScore = shinRecords.length > 0 ? Math.max(...shinRecords.map((r) => r.score)) : 0;
  const myShiClears = shinRecords.filter((r) => r.cleared).length;

  const myNightmareMaxScore =
    nightmareRecords.length > 0 ? Math.max(...nightmareRecords.map((r) => r.score)) : 0;
  const myNightmareClears = nightmareRecords.filter((r) => r.cleared).length;

  // 순위 계산
  const shinScoreRank = DUMMY_RANKINGS.filter((r) => r.shinMaxScore > myShiMaxScore).length + 1;
  const shinClearRank = DUMMY_RANKINGS.filter((r) => r.shinClears > myShiClears).length + 1;
  const nightmareScoreRank =
    DUMMY_RANKINGS.filter((r) => r.nightmareMaxScore > myNightmareMaxScore).length + 1;
  const nightmareClearRank =
    DUMMY_RANKINGS.filter((r) => r.nightmareClears > myNightmareClears).length + 1;

  // 난이도별 상세 정보
  const shinWinRate =
    shinRecords.length > 0 ? ((myShiClears / shinRecords.length) * 100).toFixed(1) : 0;
  const shinAvgUnit =
    shinRecords.length > 0
      ? (shinRecords.reduce((sum, r) => sum + r.unitCount, 0) / shinRecords.length).toFixed(1)
      : 0;

  const nightmareWinRate =
    nightmareRecords.length > 0
      ? ((myNightmareClears / nightmareRecords.length) * 100).toFixed(1)
      : 0;
  const nightmareAvgUnit =
    nightmareRecords.length > 0
      ? (
          nightmareRecords.reduce((sum, r) => sum + r.unitCount, 0) / nightmareRecords.length
        ).toFixed(1)
      : 0;

  return (
    <main className="mx-auto max-w-6xl px-8 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-primary font-mono">&gt;</span> {nickname}
        </h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_3fr]">
        {/* 좌측: 프로필 영역 */}
        <div className="border-border bg-card sticky top-0 h-fit rounded-lg border p-6">
          <div className="space-y-4">
            <div className="border-border bg-secondary/20 rounded-lg border p-4">
              <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
                총 점수
              </span>
              <p className="text-foreground font-mono text-2xl font-bold">
                {totalScore.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border-border bg-secondary/20 rounded-lg border p-4">
                <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
                  클리어 횟수
                </span>
                <p className="text-foreground font-mono text-xl font-bold">{totalClears}회</p>
              </div>
              <div className="border-border bg-secondary/20 rounded-lg border p-4">
                <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-widest uppercase">
                  평균 유닛
                </span>
                <p className="text-foreground font-mono text-xl font-bold">{avgUnit}</p>
              </div>
            </div>

            {/* 랭킹정보 */}
            <div className="pt-4">
              <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
                랭킹정보
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                  <span className="mb-1 block text-xs font-semibold text-blue-400">신-점수</span>
                  <p className="text-foreground font-mono text-lg font-bold">{shinScoreRank}위</p>
                </div>
                <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                  <span className="mb-1 block text-xs font-semibold text-blue-400">신-클리어</span>
                  <p className="text-foreground font-mono text-lg font-bold">{shinClearRank}위</p>
                </div>
                <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <span className="mb-1 block text-xs font-semibold text-red-400">악몽-점수</span>
                  <p className="text-foreground font-mono text-lg font-bold">
                    {nightmareScoreRank}위
                  </p>
                </div>
                <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <span className="mb-1 block text-xs font-semibold text-red-400">악몽-클리어</span>
                  <p className="text-foreground font-mono text-lg font-bold">
                    {nightmareClearRank}위
                  </p>
                </div>
              </div>
            </div>

            {/* 난이도별 정보 */}
            <div className="pt-4">
              <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
                난이도별 정보
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* 신 모드 */}
                <div className="border-border rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                  <p className="mb-3 text-xs font-semibold text-blue-400">신</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[11px]">클리어</span>
                      <span className="text-foreground font-mono text-xs font-bold">
                        {myShiClears}회
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[11px]">승률</span>
                      <span className="text-foreground font-mono text-xs font-bold">
                        {shinWinRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[11px]">평균 유닛</span>
                      <span className="text-foreground font-mono text-xs font-bold">
                        {shinAvgUnit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 악몽 모드 */}
                <div className="border-border rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <p className="mb-3 text-xs font-semibold text-red-400">악몽</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[11px]">클리어</span>
                      <span className="text-foreground font-mono text-xs font-bold">
                        {myNightmareClears}회
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[11px]">승률</span>
                      <span className="text-foreground font-mono text-xs font-bold">
                        {nightmareWinRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[11px]">평균 유닛</span>
                      <span className="text-foreground font-mono text-xs font-bold">
                        {nightmareAvgUnit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 모스트 유닛 */}
            <div className="pt-4">
              <span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-widest uppercase">
                모스트 유닛
              </span>
              <div className="space-y-2">
                {DUMMY_UNIT_STATS['통합'].slice(0, 3).map((unit) => (
                  <div key={unit.id} className="border-border rounded-lg border p-3">
                    <div
                      className="grid items-center gap-3"
                      style={{ gridTemplateColumns: '120px 1fr auto' }}
                    >
                      {/* 좌측: 썸네일 + 이름/태그 */}
                      <div className="flex items-start gap-2">
                        <Avatar className="border-border h-12 w-12 shrink-0 border">
                          <AvatarImage src={unit.photo} />
                          <AvatarFallback className="bg-secondary text-sm">
                            {unit.unitName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="text-foreground truncate text-[11px] leading-tight font-semibold">
                            {unit.unitName.length > 7
                              ? `${unit.unitName.substring(0, 7)}...`
                              : unit.unitName}
                          </p>
                          <span
                            className={`w-fit rounded border px-1 py-0.5 text-[9px] font-semibold ${getTierStyle(unit.tier)}`}
                          >
                            {unit.tier}
                          </span>
                        </div>
                      </div>

                      {/* 중앙: 그래프 */}
                      <div>
                        <WinRateBar wins={unit.wins} losses={unit.losses} />
                      </div>

                      {/* 우측: 평균 유닛카운트 */}
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
          </div>
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

              {DUMMY_RECORDS.map((record) => {
                const isOpen = openId === record.id;
                return (
                  <div key={record.id} className="border-border border-b last:border-b-0">
                    {/* Row */}
                    <div
                      onClick={() => setOpenId(isOpen ? null : record.id)}
                      className={`grid cursor-pointer grid-cols-[80px_100px_80px_1fr_120px] items-center gap-0 px-4 py-3 transition-colors ${
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
                      <span className="text-foreground text-center text-sm">
                        {record.unitCount}
                      </span>
                      <div className="flex items-center gap-1">
                        {record.clearedUnits.slice(0, 4).map((unit, idx) => (
                          <Avatar key={idx} className="border-border h-6 w-6 border">
                            <AvatarImage src={unit.photo} />
                            <AvatarFallback className="bg-secondary text-[10px]">
                              {unit.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {record.clearedUnits.length > 4 && (
                          <span className="text-muted-foreground text-xs">
                            +{record.clearedUnits.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-muted-foreground text-xs">
                          {getRelativeTime(record.date)}
                        </span>
                        <svg
                          className={`text-muted-foreground h-3 w-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Accordion content */}
                    {isOpen && (
                      <div className="border-border bg-secondary/20 border-t px-4 py-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                          {/* Screenshot */}
                          <div className="shrink-0">
                            {record.cleared ? (
                              <img
                                src={record.screenshot}
                                alt="게임 스크린샷"
                                className="border-border h-32 w-full rounded-md border object-cover sm:w-52"
                              />
                            ) : (
                              <div className="border-border flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-red-500/30 bg-red-500/10 sm:w-52">
                                <svg
                                  className="h-7 w-7 text-red-400/60"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                <span className="text-xs font-medium text-red-400/80">
                                  클리어 실패
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Units */}
                          <div className="flex flex-col gap-2">
                            <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                              클리어 유닛
                            </span>
                            {record.clearedUnits.length === 0 ? (
                              <span className="text-muted-foreground text-sm">없음</span>
                            ) : (
                              <div className="grid grid-cols-3 gap-2">
                                {record.clearedUnits.map((unit, idx) => (
                                  <div
                                    key={idx}
                                    className="border-border bg-card flex items-center gap-2 rounded-md border px-2 py-1.5"
                                  >
                                    <Avatar className="border-border h-7 w-7 shrink-0 border">
                                      <AvatarImage src={unit.photo} />
                                      <AvatarFallback className="bg-secondary text-[10px]">
                                        {unit.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-foreground text-xs font-medium">
                                      {unit.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* 유닛통계 탭 */}
          {activeTab === '유닛통계' && (
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
                {DUMMY_UNIT_STATS[unitStatMode].map((unit) => (
                  <div
                    key={unit.id}
                    className="border-border bg-secondary/20 hover:bg-secondary/40 flex flex-col gap-3 rounded-lg border p-3 transition-colors"
                  >
                    {/* 상단: 썸네일 + 이름 + 횟수 뱃지 */}
                    <div className="flex items-center gap-3">
                      <Avatar className="border-border h-11 w-11 shrink-0 border">
                        <AvatarImage src={unit.photo} />
                        <AvatarFallback className="bg-secondary text-sm">
                          {unit.unitName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-foreground truncate text-sm font-semibold">
                            {unit.unitName}
                          </p>
                          <span
                            className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${getTierStyle(unit.tier)}`}
                          >
                            {unit.tier}
                          </span>
                        </div>
                      </div>
                      <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                        {unit.count}회
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
                        <span className="text-muted-foreground text-[11px]">최소 유닛</span>
                        <span className="text-foreground font-mono text-xs font-bold">
                          {unit.minUnitCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
