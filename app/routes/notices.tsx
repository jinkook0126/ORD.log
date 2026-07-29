import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { useNoticesQuery } from '~/query/notice';

export function meta() {
  return [
    { title: 'ORD.log - 공지사항' },
    { name: 'description', content: 'ORD.log 공지사항을 확인하세요' },
  ];
}

const formatNoticeDate = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const NoticesPage = () => {
  const { data: notices, isLoading } = useNoticesQuery();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <main className="mx-auto max-w-5xl px-8 py-10 md:py-16">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 공지사항
        </h1>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-border bg-secondary/20 h-16 animate-pulse rounded-lg border" />
          ))}
        </div>
      ) : !notices || notices.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center text-sm">
          등록된 공지사항이 없습니다
        </p>
      ) : (
        <div className="border-border divide-border divide-y overflow-hidden rounded-lg border">
          {notices.map((notice) => {
            const isOpen = openId === notice.id;
            return (
              <div key={notice.id} className="bg-background">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : notice.id)}
                  className="hover:bg-secondary/40 flex w-full cursor-pointer items-start gap-3 px-4 py-4 text-left transition-colors md:items-center md:gap-4 md:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium md:text-base">{notice.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs md:hidden">
                      {formatNoticeDate(notice.createdAt)}
                    </p>
                  </div>
                  <span className="text-muted-foreground hidden shrink-0 text-xs md:inline">
                    {formatNoticeDate(notice.createdAt)}
                  </span>
                  <ChevronDown
                    className={`text-muted-foreground mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200 md:mt-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-border bg-secondary/20 border-t px-4 py-4 md:px-5">
                    <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
                      {notice.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default NoticesPage;
