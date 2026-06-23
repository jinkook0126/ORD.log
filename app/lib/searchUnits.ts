import { getChoseong } from 'es-hangul';
import Fuse from 'fuse.js';
import Hangul from 'hangul-js';

type Unit = {
  name: string;
};

const ENG_TO_KOR: Record<string, string> = {
  q: 'ㅂ',
  w: 'ㅈ',
  e: 'ㄷ',
  r: 'ㄱ',
  t: 'ㅅ',
  y: 'ㅛ',
  u: 'ㅕ',
  i: 'ㅑ',
  o: 'ㅐ',
  p: 'ㅔ',

  a: 'ㅁ',
  s: 'ㄴ',
  d: 'ㅇ',
  f: 'ㄹ',
  g: 'ㅎ',
  h: 'ㅗ',
  j: 'ㅓ',
  k: 'ㅏ',
  l: 'ㅣ',

  z: 'ㅋ',
  x: 'ㅌ',
  c: 'ㅊ',
  v: 'ㅍ',
  b: 'ㅠ',
  n: 'ㅜ',
  m: 'ㅡ',
};

function convertEnglishToKorean(text: string) {
  const jamo = text
    .toLowerCase()
    .split('')
    .map((v) => ENG_TO_KOR[v] ?? v);

  return Hangul.assemble(jamo);
}

export function searchUnits<T extends Unit>(units: T[], searchTerm: string, fuse: Fuse<T>) {
  if (!searchTerm.trim()) {
    return [];
  }

  const keyword = searchTerm.trim().toLowerCase();

  const converted = convertEnglishToKorean(keyword);

  const isChosungOnly = /^[ㄱ-ㅎ]+$/.test(keyword);

  // 1차 검색
  const direct = units.filter((unit) => {
    const name = unit.name;

    const matchName = name.includes(keyword);

    const matchConverted = converted !== keyword && name.includes(converted);

    const matchChosung = isChosungOnly && getChoseong(name).includes(keyword);

    return matchName || matchConverted || matchChosung;
  });

  if (direct.length) {
    return direct;
  }

  // 2차 퍼지 검색
  return fuse.search(keyword).map((v) => v.item);
}
