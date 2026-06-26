import { useState, useSyncExternalStore } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useParams } from 'react-router';

import { formatTimeAgo, getLabelWithDifficulty, getTierStyle } from '~/lib/utils';
import { useMyGameRecordsQuery } from '~/query/my';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import GameRecordLoading from './GameRecordLoading';

const subscribeMediaQuery = (callback: () => void) => {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

const getIsDesktop = () => window.matchMedia('(min-width: 768px)').matches;

const useIsDesktop = () => useSyncExternalStore(subscribeMediaQuery, getIsDesktop, () => true);

function getRecordRowClassName(success: boolean, unitCount: number) {
  if (unitCount === 0) {
    return 'bg-amber-400/25 hover:bg-amber-400/35 ring-1 ring-inset ring-amber-400/50';
  }
  if (success) {
    return 'bg-blue-500/15 hover:bg-blue-500/20';
  }
  return 'bg-red-500/15 hover:bg-red-500/20';
}

const GameRecord = () => {
  const { nickname } = useParams();
  const { data: gameRecords, isLoading } = useMyGameRecordsQuery({ nickname: nickname! });
  const [openId, setOpenId] = useState<number | null>(null);
  const isDesktop = useIsDesktop();
  if (isLoading || !gameRecords) {
    return <GameRecordLoading />;
  }
  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`text-muted-foreground h-3 w-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const RecordDetail = ({
    record,
    showPhotoView,
  }: {
    record: (typeof gameRecords)[number];
    showPhotoView: boolean;
  }) => {
    const screenshotUrl = record.imageUrl
      ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/screen/${record.imageUrl}`
      : null;

    const screenshot = screenshotUrl ? (
      <img
        src={screenshotUrl}
        alt="게임 스크린샷"
        className="border-border h-32 w-full cursor-zoom-in rounded-md border object-cover sm:w-52"
      />
    ) : null;

    return (
      <div className="border-border bg-secondary/20 border-t px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="shrink-0">
            {screenshot ? (
              showPhotoView ? (
                <PhotoView src={screenshotUrl!}>{screenshot}</PhotoView>
              ) : (
                screenshot
              )
            ) : (
              <div className="flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-red-500/30 bg-red-500/10 sm:w-52">
                <svg
                  className="h-7 w-7 text-red-400/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-xs font-medium text-red-400/80">클리어 실패</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {record.units.length === 0 ? (
              <span className="text-muted-foreground text-sm">없음</span>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {record.units.map((unit, idx) => (
                  <div
                    key={idx}
                    className="border-border bg-card flex items-center gap-2 rounded-md border px-2 py-1.5"
                  >
                    <Avatar className="border-border h-7 w-7 shrink-0 border">
                      <AvatarImage
                        src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.unit.thumbnailUrl}`}
                      />
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {unit.unit.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-foreground truncate text-xs font-medium">
                        {unit.unit.name}
                      </span>
                      <span
                        className={`w-fit shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${getTierStyle(unit.unit.grade.rank)}`}
                      >
                        {unit.unit.grade.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PhotoProvider>
      {/* 데스크톱: 테이블 */}
      <div className="hidden md:block">
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

        {gameRecords.map((record) => {
          const isOpen = openId === record.id;
          return (
            <div key={record.id} className="border-border border-b last:border-b-0">
              <div
                onClick={() => setOpenId(isOpen ? null : record.id)}
                className={`grid cursor-pointer grid-cols-[80px_100px_80px_1fr_120px] items-center gap-0 px-4 py-3 transition-colors ${getRecordRowClassName(record.success, record.unitCount)}`}
              >
                <Badge
                  variant={record.difficulty === 'GOD' ? 'default' : 'destructive'}
                  className="w-fit"
                >
                  {getLabelWithDifficulty(record.difficulty)}
                </Badge>
                <span className="text-foreground text-center font-mono text-sm">
                  {record.score.toLocaleString()}
                </span>
                <span className="text-foreground text-center text-sm">{record.unitCount}</span>
                <div className="flex items-center gap-1">
                  {record.units.slice(0, 4).map((unit, idx) => (
                    <Avatar key={idx} className="border-border h-6 w-6 border">
                      <AvatarImage
                        src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.unit.thumbnailUrl}`}
                      />
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {unit.unit.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {record.units.length > 4 && (
                    <span className="text-muted-foreground text-xs">
                      +{record.units.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-muted-foreground text-xs">
                    {formatTimeAgo(String(record.createdAt))}
                  </span>
                  <ChevronIcon isOpen={isOpen} />
                </div>
              </div>

              {isOpen && <RecordDetail record={record} showPhotoView={isDesktop} />}
            </div>
          );
        })}
      </div>

      {/* 모바일: 카드 */}
      <div className="divide-border divide-y md:hidden">
        {gameRecords.map((record) => {
          const isOpen = openId === record.id;
          return (
            <div key={record.id}>
              <div
                onClick={() => setOpenId(isOpen ? null : record.id)}
                className={`cursor-pointer px-4 py-3 transition-colors ${getRecordRowClassName(record.success, record.unitCount)}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge
                    variant={record.difficulty === 'GOD' ? 'default' : 'destructive'}
                    className="w-fit"
                  >
                    {getLabelWithDifficulty(record.difficulty)}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      {formatTimeAgo(String(record.createdAt))}
                    </span>
                    <ChevronIcon isOpen={isOpen} />
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">클리어 점수</span>
                    <p className="text-foreground font-mono font-medium">
                      {record.score.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">유닛카운트</span>
                    <p className="text-foreground font-medium">{record.unitCount}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {record.units.slice(0, 5).map((unit, idx) => (
                    <Avatar key={idx} className="border-border h-6 w-6 border">
                      <AvatarImage
                        src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.unit.thumbnailUrl}`}
                      />
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {unit.unit.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {record.units.length > 5 && (
                    <span className="text-muted-foreground text-xs">
                      +{record.units.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {isOpen && <RecordDetail record={record} showPhotoView={!isDesktop} />}
            </div>
          );
        })}
      </div>
    </PhotoProvider>
  );
};

export default GameRecord;
