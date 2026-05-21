import { type ClassValue, clsx } from 'clsx';
import type { Difficulty } from 'generated/prisma/enums';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: string): string {
  const dateObj = new Date(date);
  const minutes = Math.floor((Date.now() - dateObj.getTime()) / 60000);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export function getModeBadgeVariant(mode: string) {
  switch (mode) {
    case '신':
      return 'default';
    case '악몽':
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
