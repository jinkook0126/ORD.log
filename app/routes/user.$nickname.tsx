import { useState } from 'react';
import { type LoaderFunctionArgs, redirect, useParams } from 'react-router';

import DifficultySection from '~/components/my/DifficultySection';
import GameRecord from '~/components/my/GameRecord';
import { GameUnitRecord } from '~/components/my/GameUnitRecord';
import MostUnitSection from '~/components/my/MostUnitSection';
import RankingSection from '~/components/my/RankingSection';
import SummarySection from '~/components/my/SummarySection';

type TabType = '게임기록' | '유닛통계';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { nickname } = params;
  if (!nickname) {
    throw redirect('/user/not-found');
  }
  const url = new URL(request.url);
  const res = await fetch(`${url.origin}/api/nickname?nickname=${nickname}`);
  if (!res.ok) {
    throw redirect('/user/not-found');
  }
  const user = await res.json();
  if (!user) {
    throw redirect('/user/not-found');
  }
  return user;
};

export default function UserDetail() {
  const { nickname } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('게임기록');

  return (
    <div className="md:overflow-x-auto">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 md:min-w-[1006px] md:py-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-primary font-mono">&gt;</span> {nickname}
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_3fr]">
          {/* 좌측: 프로필 영역 */}
          <div className="border-border bg-card h-fit rounded-lg border p-4 sm:p-6 md:sticky md:top-20 md:self-start">
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
          <div className="border-border bg-card min-w-0 rounded-lg border">
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
    </div>
  );
}
