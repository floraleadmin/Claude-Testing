// Text helpers shared by the app and the content checks.

export type Lang = 'nl' | 'de';

const APOS = /[’‘`´ʼ]/g;
// Punctuation that never belongs to a word. Apostrophes and inner hyphens stay.
const PUNCT = /[.,!?;:"„“”«»()¿¡…\[\]{}]/g;

/** Unicode-normalised text with straight apostrophes. */
export function clean(s: string): string {
  return s.normalize('NFC').replace(APOS, "'").replace(/\u00a0/g, ' ');
}

/** Word tokens as written (case kept, surrounding punctuation removed). */
export function tokenize(s: string): string[] {
  return clean(s)
    .replace(PUNCT, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^[-–—]+|[-–—]+$/g, '').replace(/'+$/, ''))
    .filter((t) => t.length > 0 && t !== "'");
}

export function lower(s: string): string {
  return s.toLocaleLowerCase('nl');
}

export function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');
}

// Unstressed and stressed pronoun forms, and short written forms, are
// interchangeable for answer checking. The map folds both sides the same way.
const NL_FOLD: Record<string, string> = {
  jij: 'je',
  jou: 'je',
  jouw: 'je',
  wij: 'we',
  zij: 'ze',
  mij: 'me',
  "m'n": 'mijn',
  "z'n": 'zijn',
  "'t": 'het',
  "'n": 'een',
};

export function foldToken(t: string, lang: Lang): string {
  if (lang === 'nl') return NL_FOLD[t] ?? t;
  return t.replace(/ß/g, 'ss');
}

/** Lower-case tokens with pronoun folding, the form answers are compared in. */
export function normTokens(s: string, lang: Lang): string[] {
  return tokenize(s).map((t) => foldToken(lower(t), lang));
}

export function normalize(s: string, lang: Lang): string {
  return normTokens(s, lang).join(' ');
}

/** Optimal string alignment distance (Levenshtein + adjacent transposition). */
export function editDistance(a: string, b: string): number {
  const n = a.length;
  const m = b.length;
  if (n === 0) return m;
  if (m === 0) return n;
  const d: number[][] = Array.from({ length: n + 1 }, (_, i) => {
    const row = new Array<number>(m + 1).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= m; j++) d[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[n][m];
}
