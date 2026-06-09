import { useState } from 'react';
import { useParams } from 'react-router';

import DifficultySection from '~/components/my/DifficultySection';
import GameRecord from '~/components/my/GameRecord';
import { GameUnitRecord } from '~/components/my/GameUnitRecord';
import MostUnitSection from '~/components/my/MostUnitSection';
import RankingSection from '~/components/my/RankingSection';
import SummarySection from '~/components/my/SummarySection';

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

type UnitStatMode = '통합' | '신' | '악몽';

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

export default function UserDetail() {
  const { nickname } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('게임기록');
  const [unitStatMode, setUnitStatMode] = useState<UnitStatMode>('통합');

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
            <SummarySection nickname={nickname!} />

            {/* 랭킹정보 */}
            <RankingSection nickname={nickname!} />

            {/* 난이도별 정보 */}
            <DifficultySection nickname={nickname!} />

            {/* 모스트 유닛 */}
            <MostUnitSection nickname={nickname!} />
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
          {activeTab === '게임기록' && <GameRecord />}

          {/* 유닛통계 탭 */}
          {activeTab === '유닛통계' && <GameUnitRecord />}
        </div>
      </div>
    </main>
  );
}
