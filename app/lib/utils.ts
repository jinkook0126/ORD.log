import { type ClassValue, clsx } from 'clsx';
import type { Difficulty } from 'generated/prisma/enums';
import { twMerge } from 'tailwind-merge';

type UnitTier = '초월' | '영원' | '제한' | '전설';

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
    case 4: // 전설
      return 'bg-violet-500/15 text-violet-400 border-violet-500/30';
    case 5:
      return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    case 6:
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case 7:
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  }
}
