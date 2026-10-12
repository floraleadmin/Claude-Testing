// Index from every written Dutch form to the dictionary entries it can belong to.
import type { Word } from '../types';
import { lower, tokenize } from './text';

export interface Lexicon {
  words: Word[];
  byId: Map<string, Word>;
  /** Single-token form -> entries. */
  byForm: Map<string, Word[]>;
  /** Multi-token expressions, as token arrays. */
  phrases: { tokens: string[]; word: Word }[];
}

export function buildLexicon(words: Word[]): Lexicon {
  const byId = new Map<string, Word>();
  const byForm = new Map<string, Word[]>();
  const phrases: Lexicon['phrases'] = [];
  for (const w of words) {
    byId.set(w.id, w);
    for (const f of w.forms) {
      const toks = tokenize(f).map(lower);
      if (toks.length === 1) {
        const list = byForm.get(toks[0]) ?? [];
        if (!list.includes(w)) list.push(w);
        byForm.set(toks[0], list);
      } else if (toks.length > 1) {
        phrases.push({ tokens: toks, word: w });
      }
    }
  }
  phrases.sort((a, b) => b.tokens.length - a.tokens.length);
  return { words, byId, byForm, phrases };
}

export interface Hint {
  /** The written words the hint explains, e.g. "tot ziens". */
  text: string;
  meanings: string[];
}

/** Hints for the token at position i of a tokenised Dutch sentence. */
export function hintsAt(lex: Lexicon, tokens: string[], i: number): Hint[] {
  const low = tokens.map(lower);
  const out: Hint[] = [];
  const seen = new Set<string>();
  for (const p of lex.phrases) {
    const k = p.tokens.length;
    for (let s = Math.max(0, i - k + 1); s <= i && s + k <= low.length; s++) {
      if (p.tokens.every((t, j) => low[s + j] === t)) {
        const text = tokens.slice(s, s + k).join(' ');
        const key = text + '|' + p.word.de;
        if (!seen.has(key)) {
          seen.add(key);
          out.push({ text, meanings: [p.word.de] });
        }
      }
    }
  }
  const single = lex.byForm.get(low[i]) ?? [];
  if (single.length) {
    const meanings: string[] = [];
    for (const w of single) {
      const m = describe(w, low[i]);
      if (!meanings.includes(m)) meanings.push(m);
    }
    out.push({ text: tokens[i], meanings });
  }
  return out;
}

/** Meaning of one entry, with the base form when the token is inflected. */
function describe(w: Word, token: string): string {
  const base = w.pos === 'noun' ? `${w.art} ${w.nl}` : w.nl;
  if (lower(w.nl) === token) return w.de;
  if (w.pos === 'noun' && w.pl.includes(token)) return `${w.de} (Plural von ${base})`;
  return `${w.de} (${base})`;
}

// German articles appear in every noun gloss, so they would match everything.
const DE_ARTICLES = new Set(['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'sich']);

/** Dutch candidates for a German word in a prompt (best effort). */
export function reverseHints(lex: Lexicon, deToken: string): string[] {
  const t = lower(deToken).replace(/ß/g, 'ss');
  if (t.length < 2 || DE_ARTICLES.has(t)) return [];
  const out: string[] = [];
  for (const w of lex.words) {
    const parts = lower(w.de)
      .replace(/ß/g, 'ss')
      .replace(/\([^)]*\)/g, ' ')
      .split(/[^\p{L}'-]+/u);
    if (parts.includes(t)) {
      const label = w.pos === 'noun' ? `${w.art} ${w.nl}` : w.nl;
      if (!out.includes(label)) out.push(label);
    }
    if (out.length >= 4) break;
  }
  return out;
}
