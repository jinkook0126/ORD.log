import { type ClassValue, clsx } from 'clsx';
import type { Difficulty } from 'generated/prisma/enums';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: string): string {
  const dateObj = new Date(date);
  const minutes = Math.floor((Date.now() - dateObj.getTime()) / 60000);
  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export function getModeBadgeVariant(difficulty: Difficulty) {
  switch (difficulty) {
    case 'GOD':
      return 'default';
    case 'NIGHTMARE':
      return 'destructive';
    default:
      return 'secondary';
  }
}

export function getLabelWithDifficulty(difficulty: Difficulty) {
  switch (difficulty) {
    case 'GOD':
      return '신';
    case 'NIGHTMARE':
      return '악몽';
    default:
      return '지옥';
  }
}

export function getTierStyle(grade: number) {
  switch (grade) {
    case 1: // 흔함
      return 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30';
    case 2: // 안흔함
      return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    case 3: // 특별함
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    case 4: // 전설
      return 'bg-violet-500/15 text-violet-400 border-violet-500/30';
    case 5: // 전설적인
      return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    case 6: // 히든
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case 7: // 변화된
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    case 8: // 제한
      return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    case 9:
      return 'bg-lime-500/15 text-lime-400 border-lime-500/30';
    case 10: // 세라핌
      return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    case 11: // 영원
      return 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30';
    case 12: // 초월
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    case 13: // 불멸
      return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}
