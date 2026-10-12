// Answer checking. The rule: never reject a correct answer.
// Case, punctuation, stressed/unstressed pronouns and short forms are ignored;
// missing accents and small typos pass with a note.
import { editDistance, normTokens, stripDiacritics, type Lang } from './text';

export type CheckStatus = 'correct' | 'accent' | 'typo' | 'wrong';

export interface CheckResult {
  status: CheckStatus;
  /** The accepted answer closest to the input, shown as the solution. */
  best: string;
}

export interface CheckOptions {
  /** Allow small typos (typed answers only, never for word tiles). */
  typos: boolean;
  /**
   * Known word forms of the language. A "typo" that produces another real
   * word (werk instead of werkt) is a grammar mistake, not a typo.
   */
  knownForms?: Set<string>;
}

export function isOk(status: CheckStatus): boolean {
  return status !== 'wrong';
}

export function checkText(input: string, answers: string[], lang: Lang, opts: CheckOptions): CheckResult {
  const user = normTokens(input, lang);
  const variants = answers.map((a) => ({ raw: a, toks: normTokens(a, lang) }));
  if (!user.length || !variants.length) return { status: 'wrong', best: answers[0] ?? '' };
  const u = user.join(' ');

  for (const v of variants) if (v.toks.join(' ') === u) return { status: 'correct', best: v.raw };

  const uPlain = stripDiacritics(u);
  for (const v of variants) if (stripDiacritics(v.toks.join(' ')) === uPlain) return { status: 'accent', best: v.raw };

  if (opts.typos) {
    for (const v of variants) if (typoMatch(user, v.toks, lang, opts.knownForms)) return { status: 'typo', best: v.raw };
  }

  let best = variants[0];
  let bestD = Infinity;
  for (const v of variants) {
    const d = editDistance(u, v.toks.join(' '));
    if (d < bestD) {
      bestD = d;
      best = v;
    }
  }
  return { status: 'wrong', best: best.raw };
}

function typoMatch(user: string[], expected: string[], lang: Lang, known?: Set<string>): boolean {
  if (user.length !== expected.length) return false;
  let diffs = 0;
  const allowed = Math.max(1, Math.floor(expected.length / 5));
  for (let i = 0; i < expected.length; i++) {
    const a = stripDiacritics(user[i]);
    const b = stripDiacritics(expected[i]);
    if (a === b) continue;
    diffs++;
    if (diffs > allowed) return false;
    const minLen = lang === 'nl' ? 4 : 5;
    if (b.length < minLen) return false;
    const maxD = b.length >= 9 ? 2 : 1;
    if (editDistance(a, b) > maxD) return false;
    if (known && known.has(user[i])) return false;
  }
  return diffs > 0;
}

/** Word overlap in order (for speech recognition), 0..1. */
export function speechScore(heard: string, expected: string): number {
  const a = normTokens(numbersToWords(heard), 'nl').map(stripDiacritics);
  const b = normTokens(expected, 'nl').map(stripDiacritics);
  if (!b.length) return 0;
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.length][b.length] / b.length;
}

const NUM = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien', 'twintig'];

/** Speech recognisers write small numbers as digits. */
function numbersToWords(s: string): string {
  return s.replace(/\b\d+\b/g, (m) => {
    const n = Number(m);
    return n <= 20 ? NUM[n] : m;
  });
}
