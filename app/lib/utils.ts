import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(minutes: number): string {
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
