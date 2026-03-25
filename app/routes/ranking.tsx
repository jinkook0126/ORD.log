import { useState } from 'react';
import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface RankItem {
  rank: number;
  photo: string;
  nickname: string;
  value: number;
  topUnits: string[];
}

type TabKey = '신-클리어' | '신-점수' | '악몽-클리어' | '악몽-점수';

const DUMMY: Record<TabKey, RankItem[]> = {
  '신-클리어': [
    {
      rank: 1,
      photo: '/public/assets/test.webp',
      nickname: 'StormBringer',
      value: 55,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 2,
      photo: '/public/assets/test.webp',
      nickname: 'PhoenixRise',
      value: 49,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 3,
      photo: '/public/assets/test.webp',
      nickname: 'DarkSlayer',
      value: 44,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 4,
      photo: '/public/assets/test.webp',
      nickname: '루나틱',
      value: 36,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 5,
      photo: '/public/assets/test.webp',
      nickname: '섀도우',
      value: 30,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 6,
      photo: '/public/assets/test.webp',
      nickname: '눈떠보니옆에',
      value: 28,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 7,
      photo: '/public/assets/test.webp',
      nickname: 'NightOwl',
      value: 21,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 8,
      photo: '/public/assets/test.webp',
      nickname: '천둥번개',
      value: 18,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
  ],
  '신-점수': [
    {
      rank: 1,
      photo: '/public/assets/test.webp',
      nickname: 'PhoenixRise',
      value: 112400,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 2,
      photo: '/public/assets/test.webp',
      nickname: 'StormBringer',
      value: 105800,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 3,
      photo: '/public/assets/test.webp',
      nickname: 'DarkSlayer',
      value: 98520,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 4,
      photo: '/public/assets/test.webp',
      nickname: '루나틱',
      value: 87300,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 5,
      photo: '/public/assets/test.webp',
      nickname: '섀도우',
      value: 76100,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 6,
      photo: '/public/assets/test.webp',
      nickname: '눈떠보니옆에',
      value: 65400,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 7,
      photo: '/public/assets/test.webp',
      nickname: 'NightOwl',
      value: 54200,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 8,
      photo: '/public/assets/test.webp',
      nickname: '천둥번개',
      value: 43800,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
  ],
  '악몽-클리어': [
    {
      rank: 1,
      photo: '/public/assets/test.webp',
      nickname: 'DarkSlayer',
      value: 42,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 2,
      photo: '/public/assets/test.webp',
      nickname: '루나틱',
      value: 38,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 3,
      photo: '/public/assets/test.webp',
      nickname: '섀도우',
      value: 31,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 4,
      photo: '/public/assets/test.webp',
      nickname: 'StormBringer',
      value: 27,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 5,
      photo: '/public/assets/test.webp',
      nickname: 'PhoenixRise',
      value: 22,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 6,
      photo: '/public/assets/test.webp',
      nickname: '눈떠보니옆에',
      value: 19,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 7,
      photo: '/public/assets/test.webp',
      nickname: 'NightOwl',
      value: 14,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 8,
      photo: '/public/assets/test.webp',
      nickname: '천둥번개',
      value: 11,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
  ],
  '악몽-점수': [
    {
      rank: 1,
      photo: '/public/assets/test.webp',
      nickname: '섀도우',
      value: 85100,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 2,
      photo: '/public/assets/test.webp',
      nickname: '루나틱',
      value: 76300,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 3,
      photo: '/public/assets/test.webp',
      nickname: 'DarkSlayer',
      value: 68900,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 4,
      photo: '/public/assets/test.webp',
      nickname: 'StormBringer',
      value: 59400,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 5,
      photo: '/public/assets/test.webp',
      nickname: 'PhoenixRise',
      value: 51200,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 6,
      photo: '/public/assets/test.webp',
      nickname: '눈떠보니옆에',
      value: 44700,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 7,
      photo: '/public/assets/test.webp',
      nickname: 'NightOwl',
      value: 37600,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
    {
      rank: 8,
      photo: '/public/assets/test.webp',
      nickname: '천둥번개',
      value: 29100,
      topUnits: Array(3).fill('/placeholder.svg'),
    },
  ],
};

const TABS: { key: TabKey; label: string; mode: string; type: string; unit: string }[] = [
  { key: '신-클리어', label: '신 · 클리어', mode: '신', type: '클리어', unit: '회' },
  { key: '신-점수', label: '신 · 점수', mode: '신', type: '점수', unit: '점' },
  { key: '악몽-클리어', label: '악몽 · 클리어', mode: '악몽', type: '클리어', unit: '회' },
  { key: '악몽-점수', label: '악몽 · 점수', mode: '악몽', type: '점수', unit: '점' },
];

function getRankStyle(rank: number) {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-500 dark:text-gray-300';
  if (rank === 3) return 'text-amber-600';
  return 'text-muted-foreground';
}

function getRankBg(rank: number) {
  if (rank === 1) return 'bg-yellow-400/5';
  if (rank === 2) return 'bg-gray-300/5';
  if (rank === 3) return 'bg-amber-600/5';
  return '';
}

function Ranking() {
  const [activeTab, setActiveTab] = useState<TabKey>('신-클리어');

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const data = DUMMY[activeTab];

  return (
    <main className="mx-auto max-w-3xl px-8 py-10 md:py-16">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 랭킹
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-border mb-6 flex gap-1 rounded-lg border p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 cursor-pointer rounded-md px-2 py-2 transition-all duration-150 ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-[11px] font-semibold sm:text-xs">{tab.mode}</span>
              <span className="text-[10px] font-medium opacity-80 sm:text-[11px]">{tab.type}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border-border bg-card overflow-hidden rounded-lg border">
        {/* Header */}
        <div className="border-border bg-secondary/30 grid grid-cols-[3rem_1fr_auto] items-center border-b px-4 py-3 md:grid-cols-[3rem_1fr_auto_auto]">
          <span className="text-muted-foreground text-center font-mono text-xs font-semibold tracking-widest uppercase">
            #
          </span>
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            닉네임
          </span>
          <span className="text-muted-foreground hidden text-xs font-semibold tracking-widest uppercase md:block">
            모스트 상위
          </span>
          <span className="text-muted-foreground text-right text-xs font-semibold tracking-widest uppercase">
            {currentTab.label.split(' · ')[1]}
          </span>
        </div>

        {/* Rows */}
        {data.map((item) => (
          <div
            key={item.rank}
            className={`border-border hover:bg-secondary/40 grid grid-cols-[3rem_1fr_auto] items-center border-b px-4 py-3 transition-colors last:border-b-0 md:grid-cols-[3rem_1fr_auto_auto] ${getRankBg(item.rank)}`}
          >
            {/* Rank */}
            <span className={`text-center font-mono text-sm font-bold ${getRankStyle(item.rank)}`}>
              {item.rank}
            </span>

            {/* Nickname */}
            <div className="flex items-center gap-3">
              <Avatar className="border-border h-8 w-8 border">
                <AvatarImage src={item.photo} />
                <AvatarFallback className="bg-secondary text-[10px]">
                  {item.nickname[0]}
                </AvatarFallback>
              </Avatar>
              <Link
                to={`/user/${item.nickname}`}
                className="text-foreground hover:text-primary text-sm font-medium transition-colors"
              >
                {item.nickname}
              </Link>
            </div>

            {/* Top Units — desktop only */}
            <div className="hidden items-center gap-1 md:flex">
              {item.topUnits.map((src, i) => (
                <Avatar key={i} className="border-border bg-background h-7 w-7 border">
                  <AvatarImage src={src} />
                  <AvatarFallback className="bg-secondary text-[8px]">U</AvatarFallback>
                </Avatar>
              ))}
            </div>

            {/* Value */}
            <span className="text-foreground font-mono text-sm font-semibold">
              {item.value.toLocaleString()}
              <span className="text-muted-foreground ml-0.5 text-xs font-normal">
                {currentTab.unit}
              </span>
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
export default Ranking;
