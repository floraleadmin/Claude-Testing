// Small helpers to write course content compactly and consistently.
// Every helper validates its input and throws on malformed data, so a typo
// in the course breaks the build instead of reaching the learner.
import type { Cloze, Pos, Sentence, Story, StoryLine, Tip, Unit, VerbForms, Word } from '../types';

export interface WordSpec extends Omit<Word, 'unit' | 'forms'> {
  forms: string[];
}

interface Opts {
  id?: string;
  emoji?: string;
  note?: string;
  forms?: string;
  core?: boolean;
}

const lower = (s: string) => s.toLocaleLowerCase('nl');

function splitAlts(s: string): string[] {
  return s
    .split('/')
    .map((x) => x.trim())
    .filter(Boolean);
}

function uniq(xs: string[]): string[] {
  return [...new Set(xs.map(lower).filter(Boolean))];
}

function extraForms(o?: Opts): string[] {
  return o?.forms ? o.forms.split(/\s+/).filter(Boolean) : [];
}

/** Noun: N('de appel', 'der Apfel', 'appels/appelen', '🍎'). Plural '-' = none taught. */
export function N(artNl: string, de: string, pl: string, emoji?: string, o: Opts = {}): WordSpec {
  const m = /^(de|het) (.+)$/.exec(artNl);
  if (!m) throw new Error(`Noun needs "de" or "het": ${artNl}`);
  const art = m[1] as 'de' | 'het';
  const nl = m[2];
  const plurals = pl === '-' ? [] : splitAlts(pl);
  return {
    id: o.id ?? nl,
    nl,
    de,
    pos: 'noun',
    art,
    pl: plurals,
    emoji: emoji || o.emoji,
    note: o.note,
    core: o.core ?? true,
    forms: uniq([nl, ...plurals, ...extraForms(o)]),
  };
}

/** Plural-only noun such as "de ouders". */
export function NP(artNl: string, de: string, emoji?: string, o: Opts = {}): WordSpec {
  const w = N(artNl, de, '-', emoji, o);
  return { ...w, pluralOnly: true };
}

/**
 * Verb: V('werken', 'arbeiten', 'werk werkt werken | werkte werkten | gewerkt h').
 * Present: 3 slots (ik, jij=hij, plural) or 4 slots (ik, jij, hij, plural); "/" separates alternatives.
 * Past: "sg pl" or "-". Participle + auxiliary (h, z, hz) or "-".
 */
export function V(inf: string, de: string, conj: string, o: Opts & { sep?: string } = {}): WordSpec {
  const parts = conj.split('|').map((p) => p.trim());
  if (parts.length !== 3) throw new Error(`Verb ${inf}: need "present | past | participle aux"`);
  const pres = parts[0].split(/\s+/).map(splitAlts);
  let slots: VerbForms['pres'];
  if (pres.length === 3) slots = { ik: pres[0], jij: pres[1], hij: pres[1], pl: pres[2] };
  else if (pres.length === 4) slots = { ik: pres[0], jij: pres[1], hij: pres[2], pl: pres[3] };
  else throw new Error(`Verb ${inf}: present needs 3 or 4 forms, got ${pres.length}`);

  let past: VerbForms['past'] = null;
  if (parts[1] !== '-') {
    const p = parts[1].split(/\s+/).map(splitAlts);
    if (p.length !== 2) throw new Error(`Verb ${inf}: past needs "sg pl"`);
    past = { sg: p[0], pl: p[1] };
  }

  let pp: string[] | null = null;
  let aux: VerbForms['aux'] = null;
  if (parts[2] !== '-') {
    const p = parts[2].split(/\s+/);
    if (p.length !== 2) throw new Error(`Verb ${inf}: participle needs "form aux"`);
    pp = splitAlts(p[0]);
    aux = p[1] === 'h' ? 'hebben' : p[1] === 'z' ? 'zijn' : p[1] === 'hz' ? 'hebben/zijn' : null;
    if (!aux) throw new Error(`Verb ${inf}: aux must be h, z or hz`);
  }

  const refl = inf.startsWith('zich ');
  const full = refl ? inf.slice(5) : inf;
  const sep = o.sep;
  if (sep && !full.startsWith(sep)) throw new Error(`Verb ${inf}: prefix ${sep} does not match`);
  const base = sep ? full.slice(sep.length) : full;

  const finite = [...slots.ik, ...slots.jij, ...slots.hij, ...slots.pl, ...(past ? [...past.sg, ...past.pl] : [])];
  const forms = [full, base, ...finite, ...(pp ?? [])];
  if (sep) forms.push(...finite.map((f) => sep + f));
  return {
    id: o.id ?? inf,
    nl: inf,
    de,
    pos: 'verb',
    pl: [],
    emoji: o.emoji,
    note: o.note,
    core: o.core ?? true,
    verb: { pres: slots, past, pp, aux, sep, refl, base },
    forms: uniq([...forms, ...extraForms(o)]),
  };
}

/** Adjective: A('groot', 'groß', 'grote groter grootst'); "-" for a missing form. */
export function A(nl: string, de: string, infl: string, o: Opts = {}): WordSpec {
  const p = infl.split(/\s+/);
  if (p.length !== 3) throw new Error(`Adjective ${nl}: need "inflected comparative superlative"`);
  const [i, c, s] = p.map((x) => (x === '-' ? null : x));
  const forms = [nl, i, c, c ? c + 'e' : null, s, s ? s + 'e' : null].filter((x): x is string => !!x);
  return {
    id: o.id ?? nl,
    nl,
    de,
    pos: 'adj',
    pl: [],
    emoji: o.emoji,
    note: o.note,
    core: o.core ?? true,
    adj: { infl: i, comp: c, sup: s },
    forms: uniq([...forms, ...extraForms(o)]),
  };
}

/** Any other word: W('ook', 'auch', 'adv'). */
export function W(nl: string, de: string, pos: Pos, o: Opts = {}): WordSpec {
  return {
    id: o.id ?? nl,
    nl,
    de,
    pos,
    pl: [],
    emoji: o.emoji,
    note: o.note,
    core: o.core ?? true,
    forms: uniq([nl, ...extraForms(o)]),
  };
}

/** Fixed expression: P('dank je wel', 'danke schön'). */
export function P(nl: string, de: string, o: Opts = {}): WordSpec {
  return W(nl, de, 'phrase', o);
}

/** Sentence: S('Hoe heet je?|Hoe heet jij?', 'Wie heißt du?'). "|" separates accepted alternatives. */
export function S(nl: string, de: string): Omit<Sentence, 'id' | 'unit'> {
  const n = nl.split('|').map((x) => x.trim());
  const d = de.split('|').map((x) => x.trim());
  if (n.some((x) => !x) || d.some((x) => !x)) throw new Error(`Empty sentence variant: ${nl} / ${de}`);
  return { nl: n, de: d };
}

/**
 * Gap sentence: C('Ik {ben} moe.', 'ben|bent|is', 'Ich bin müde.').
 * An option starting with "!" is a deliberately misspelled distractor
 * (the content check makes sure it really is not a Dutch word).
 */
export function C(text: string, options: string, de: string): Omit<Cloze, 'id' | 'unit'> {
  const m = /^(.*)\{([^}]+)\}(.*)$/.exec(text);
  if (!m) throw new Error(`Cloze needs one {gap}: ${text}`);
  const raw = options.split('|').map((x) => x.trim());
  const invalid = raw.filter((x) => x.startsWith('!')).map((x) => x.slice(1));
  const opts = raw.map((x) => x.replace(/^!/, ''));
  if (!opts.includes(m[2])) throw new Error(`Cloze answer "${m[2]}" missing from options: ${text}`);
  if (invalid.includes(m[2])) throw new Error(`Cloze answer marked invalid: ${text}`);
  if (new Set(opts).size !== opts.length) throw new Error(`Cloze options repeat: ${text}`);
  return { before: m[1], after: m[3], answer: m[2], options: opts, de, invalid };
}

/** Guidebook tip with example sentences [nl, de]. */
export function T(title: string, body: string, examples: [string, string][] = []): Tip {
  return { title, body: dedent(body), examples: examples.map(([nl, de]) => ({ nl, de })) };
}

function dedent(s: string): string {
  const lines = s.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => /^ */.exec(l)![0].length));
  return lines.map((l) => l.slice(indent)).join('\n');
}

export type StorySpec = Omit<Story, 'unit'>;
type LineSpec = [speaker: string, nl: string, de: string] | { q: string; options: string[]; answer: number };

/** Story: lines are [speaker, nl, de] or Q(...) questions. */
export function story(id: string, title: string, titleDe: string, lines: LineSpec[]): StorySpec {
  const out: StoryLine[] = lines.map((l) =>
    Array.isArray(l)
      ? { type: 'line', speaker: l[0], nl: l[1], de: l[2] }
      : { type: 'question', q: l.q, options: l.options, answer: l.answer },
  );
  for (const l of out) {
    if (l.type === 'question' && (l.answer < 0 || l.answer >= l.options.length)) {
      throw new Error(`Story ${id}: answer index out of range in "${l.q}"`);
    }
  }
  return { id, title, titleDe, lines: out };
}

export function Q(q: string, options: string[], answer: number) {
  return { q, options, answer };
}

export interface UnitSpec {
  id: string;
  title: string;
  description: string;
  tips: Tip[];
  words: WordSpec[];
  sentences: Omit<Sentence, 'id' | 'unit'>[];
  cloze: Omit<Cloze, 'id' | 'unit'>[];
  story?: StorySpec;
}

export function unit(spec: UnitSpec): UnitSpec {
  return spec;
}

/** Turns a spec into a Unit; index and section are filled in by the course. */
export function finishUnit(spec: UnitSpec, index: number, sectionId: string): Unit {
  const u = spec.id;
  return {
    id: u,
    index,
    sectionId,
    title: spec.title,
    description: spec.description,
    tips: spec.tips,
    words: spec.words.map((w) => ({ ...w, unit: u })),
    sentences: spec.sentences.map((s, i) => ({ ...s, id: `${u}.s${i + 1}`, unit: u })),
    cloze: spec.cloze.map((c, i) => ({ ...c, id: `${u}.c${i + 1}`, unit: u })),
    story: spec.story ? { ...spec.story, unit: u } : undefined,
  };
}
