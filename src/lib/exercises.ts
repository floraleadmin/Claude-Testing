// Builds exercises from course content. Every exercise has a stable key so a
// mistake can be practised again later.
import type { Cloze, Person, PathNode, Sentence, Unit, Word } from '../types';
import { clozeById, lexicon, sentenceById, units, words } from '../content/course';
import pluralDistractors from '../content/generated/plural-distractors.json';
import { planUnit, wordsInText, type UnitPlan } from './path';
import { makeRng, pick, sample, shuffle, type Rng } from './rng';
import { foldToken, lower, normalize, tokenize, type Lang } from './text';

export type Dir = 'nl-de' | 'de-nl';
export type Tense = 'pres' | 'past' | 'perf';

interface Base {
  key: string;
  /** Words this exercise trains (for spaced repetition). */
  wordIds: string[];
  /** Shown as a "NEU" badge. */
  isNew?: boolean;
}

export type Exercise =
  | (Base & { type: 'pick'; word: Word; options: Word[] })
  | (Base & { type: 'meaning'; word: Word; dir: Dir; options: string[]; answer: string })
  | (Base & { type: 'match'; pairs: { id: string; nl: string; de: string }[] })
  | (Base & { type: 'build'; dir: Dir; listen: boolean; prompt: string; answers: string[]; tiles: string[]; sentence: Sentence })
  | (Base & { type: 'write'; dir: Dir; listen: boolean; prompt: string; answers: string[]; sentence: Sentence })
  | (Base & { type: 'cloze'; cloze: Cloze; options: string[] })
  | (Base & { type: 'article'; word: Word })
  | (Base & { type: 'conjugate'; word: Word; person: Person; tense: Tense; aux: string; options: string[]; answers: string[] })
  | (Base & { type: 'plural'; word: Word; options: string[]; answers: string[] })
  | (Base & { type: 'speak'; text: string; de: string; sentence: Sentence });

export interface BuildSettings {
  listen: boolean;
  speak: boolean;
}

// ------------------------------------------------------------------ indexes

const plans = new Map<string, UnitPlan>();
export function unitPlan(u: Unit): UnitPlan {
  let p = plans.get(u.id);
  if (!p) {
    p = planUnit(u);
    plans.set(u.id, p);
  }
  return p;
}

export const allNodes: PathNode[] = units.flatMap((u) => unitPlan(u).nodes);
export const nodeById = new Map(allNodes.map((n) => [n.id, n]));
export const unitIndex = new Map(units.map((u) => [u.id, u.index]));
const wordById = new Map(words.map((w) => [w.id, w]));
export const getWord = (id: string) => wordById.get(id);

/** All accepted translations, merged across sentences that share a prompt. */
const byNl = new Map<string, Sentence[]>();
const byDe = new Map<string, Sentence[]>();
for (const u of units)
  for (const s of u.sentences) {
    for (const v of s.nl) push(byNl, normalize(v, 'nl'), s);
    for (const v of s.de) push(byDe, normalize(v, 'de'), s);
  }
function push<K, V>(m: Map<K, V[]>, k: K, v: V) {
  const l = m.get(k) ?? [];
  if (!l.includes(v)) l.push(v);
  m.set(k, l);
}

export function acceptedAnswers(s: Sentence, dir: Dir): string[] {
  const out = new Set<string>();
  if (dir === 'nl-de') {
    const prompt = normalize(s.nl[0], 'nl');
    for (const t of byNl.get(prompt) ?? [s]) t.de.forEach((x) => out.add(x));
    s.de.forEach((x) => out.add(x));
  } else {
    const prompt = normalize(s.de[0], 'de');
    for (const t of byDe.get(prompt) ?? [s]) t.nl.forEach((x) => out.add(x));
    s.nl.forEach((x) => out.add(x));
  }
  return [...out];
}

/** Lower-case Dutch forms of all words; used to tell typos from wrong words. */
export const knownDutchForms = new Set<string>(words.flatMap((w) => w.forms.flatMap((f) => tokenize(f).map(lower))));

/** Core words of units 1..index. */
function wordsUpTo(index: number): Word[] {
  return units.filter((u) => u.index <= index).flatMap((u) => u.words.filter((w) => w.core));
}

/** Words a sentence trains: core words of units up to its own. */
export function wordsOfSentence(s: Sentence): string[] {
  const idx = unitIndex.get(s.unit) ?? 0;
  return wordsInText(s.nl[0], wordsUpTo(idx)).map((w) => w.id);
}

// ------------------------------------------------------------------ tiles

function tileTokens(text: string): string[] {
  return tokenize(text);
}

/** Distractor tiles that cannot be confused with any accepted answer. */
function distractors(answerTexts: string[], lang: Lang, poolUnits: Unit[], n: number, rng: Rng): string[] {
  const banned = new Set<string>();
  const bannedMeanings = new Set<string>();
  for (const a of answerTexts)
    for (const t of tokenize(a)) {
      const k = foldToken(lower(t), lang);
      banned.add(k);
      if (lang === 'nl') for (const w of lexicon.byForm.get(lower(t)) ?? []) bannedMeanings.add(lower(w.de));
    }
  const pool: string[] = [];
  const seen = new Set<string>();
  for (const u of poolUnits)
    for (const s of u.sentences) {
      const text = lang === 'nl' ? s.nl[0] : s.de[0];
      for (const t of tokenize(text)) {
        const k = foldToken(lower(t), lang);
        if (banned.has(k) || seen.has(k)) continue;
        if (lang === 'nl' && (lexicon.byForm.get(lower(t)) ?? []).some((w) => bannedMeanings.has(lower(w.de)))) continue;
        seen.add(k);
        // Lower-case unless it is a German noun or a name.
        pool.push(lang === 'nl' && !isName(t) ? lower(t) : t);
      }
    }
  return sample(pool, n, rng);
}

function isName(t: string): boolean {
  return (lexicon.byForm.get(lower(t)) ?? []).some((w) => w.pos === 'name') || /^(Nederland|Duitsland|België)$/.test(t);
}

/** Tiles keep their case only where the language requires it (German nouns, names). */
function displayTile(t: string, i: number, lang: Lang): string {
  if (i > 0) return t;
  if (lang === 'nl') return isName(t) ? t : lower(t);
  return t;
}

// ------------------------------------------------------------------ single exercises

function poolUnitsFor(s: Sentence): Unit[] {
  const idx = unitIndex.get(s.unit) ?? 1;
  const own = units.filter((u) => u.index === idx);
  const prev = units.filter((u) => u.index < idx && u.index >= idx - 3);
  return [...own, ...prev];
}

export function buildExercise(s: Sentence, dir: Dir, rng: Rng, listen = false): Exercise {
  const answers = acceptedAnswers(s, dir);
  const target = dir === 'nl-de' ? s.de[0] : s.nl[0];
  const lang: Lang = dir === 'nl-de' ? 'de' : 'nl';
  const correct = tileTokens(target).map((t, i) => displayTile(t, i, lang));
  const n = correct.length <= 3 ? 3 : correct.length <= 6 ? 4 : 5;
  const extra = distractors(answers, lang, poolUnitsFor(s), n, rng);
  return {
    type: 'build',
    key: `s:${s.id}:${dir}:${listen ? 'listen' : 'build'}`,
    wordIds: wordsOfSentence(s),
    dir,
    listen,
    prompt: dir === 'nl-de' ? s.nl[0] : s.de[0],
    answers: listen ? [s.nl[0]] : answers,
    tiles: shuffle([...correct, ...extra], rng),
    sentence: s,
  };
}

export function writeExercise(s: Sentence, dir: Dir, listen = false): Exercise {
  return {
    type: 'write',
    key: `s:${s.id}:${dir}:${listen ? 'dictate' : 'write'}`,
    wordIds: wordsOfSentence(s),
    dir,
    listen,
    prompt: dir === 'nl-de' ? s.nl[0] : s.de[0],
    answers: listen ? [s.nl[0]] : acceptedAnswers(s, dir),
    sentence: s,
  };
}

export function listenBuildExercise(s: Sentence, rng: Rng): Exercise {
  const ex = buildExercise(s, 'de-nl', rng, true);
  if (ex.type !== 'build') return ex;
  return { ...ex, prompt: s.nl[0], answers: [s.nl[0]] };
}

export function speakExercise(s: Sentence): Exercise {
  return { type: 'speak', key: `k:${s.id}`, wordIds: wordsOfSentence(s), text: s.nl[0], de: s.de[0], sentence: s };
}

export function clozeExercise(c: Cloze, rng: Rng): Exercise {
  const ws = wordsInText(c.before + c.answer + c.after, wordsUpTo(unitIndex.get(c.unit) ?? 0)).map((w) => w.id);
  return { type: 'cloze', key: `c:${c.id}`, wordIds: ws, cloze: c, options: shuffle(c.options, rng) };
}

const hasPicture = (w: Word) => !!w.emoji && pictureKind(w) !== null;

/** Pictures only make sense for things, colours and numbers. */
function pictureKind(w: Word): string | null {
  if (w.pos === 'noun' || w.pos === 'name') return 'thing';
  if (w.pos === 'adj') return 'adj';
  if (w.pos === 'num') return 'num';
  return null;
}

function sameMeaning(a: Word, b: Word): boolean {
  return lower(a.de) === lower(b.de) || lower(a.nl) === lower(b.nl) || (!!a.emoji && a.emoji === b.emoji);
}

export function pickExercise(w: Word, pool: Word[], rng: Rng, isNew = false): Exercise | null {
  const others = pool.filter((o) => o.id !== w.id && hasPicture(o) && pictureKind(o) === pictureKind(w) && !sameMeaning(o, w));
  if (!hasPicture(w) || others.length < 2) return null;
  const opts = shuffle([w, ...sample(others, others.length >= 3 ? 3 : 2, rng)], rng);
  return { type: 'pick', key: `w:${w.id}:pick`, wordIds: [w.id], word: w, options: opts, isNew };
}

export function meaningExercise(w: Word, pool: Word[], dir: Dir, rng: Rng, isNew = false): Exercise | null {
  const samePos = pool.filter((o) => o.id !== w.id && o.pos === w.pos && !sameMeaning(o, w));
  const others = samePos.length >= 3 ? samePos : pool.filter((o) => o.id !== w.id && !sameMeaning(o, w));
  if (others.length < 2) return null;
  const chosen = sample(others, 3, rng);
  const label = (x: Word) => (dir === 'nl-de' ? x.de : nlLabel(x));
  const options = shuffle([label(w), ...chosen.map(label)], rng);
  if (new Set(options.map(lower)).size !== options.length) return null;
  return { type: 'meaning', key: `w:${w.id}:${dir}`, wordIds: [w.id], word: w, dir, options, answer: label(w), isNew };
}

export function nlLabel(w: Word): string {
  return w.pos === 'noun' && !w.pluralOnly ? `${w.bothArts ? 'de/het' : w.art} ${w.nl}` : w.pos === 'noun' ? `de ${w.nl}` : w.nl;
}

export function articleExercise(w: Word): Exercise | null {
  if (w.pos !== 'noun' || !w.art || w.pluralOnly || w.bothArts) return null;
  return { type: 'article', key: `a:${w.id}`, wordIds: [w.id], word: w };
}

export function pluralExercise(w: Word, rng: Rng): Exercise | null {
  if (w.pos !== 'noun' || !w.pl.length) return null;
  const ds = (pluralDistractors as Record<string, string[]>)[w.id];
  if (!ds || ds.length < 2) return null;
  const options = shuffle([w.pl[0], ...sample(ds, 2, rng)], rng);
  return { type: 'plural', key: `p:${w.id}`, wordIds: [w.id], word: w, options, answers: w.pl };
}

const PERSONS: Person[] = ['ik', 'jij', 'hij', 'wij', 'jullie', 'zij'];
const PRES_ONLY: Tense[] = ['pres'];

export function personLabel(p: Person): string {
  return p === 'zij' ? 'zij (Plural)' : p;
}

function presentFor(w: Word, p: Person): string[] {
  const f = w.verb!.pres;
  return p === 'ik' ? f.ik : p === 'jij' ? f.jij : p === 'hij' ? f.hij : f.pl;
}

const HEBBEN_ZIJN: Record<string, Record<Person, string>> = {
  hebben: { ik: 'heb', jij: 'hebt', hij: 'heeft', wij: 'hebben', jullie: 'hebben', zij: 'hebben' },
  zijn: { ik: 'ben', jij: 'bent', hij: 'is', wij: 'zijn', jullie: 'zijn', zij: 'zijn' },
};

export function conjugateExercise(w: Word, tense: Tense, rng: Rng, person?: Person): Exercise | null {
  const v = w.verb;
  if (!v) return null;
  const p = person ?? pick(PERSONS, rng);
  const sg = p === 'ik' || p === 'jij' || p === 'hij';
  let answers: string[];
  let pool: string[];
  let aux = '';
  if (tense === 'pres') {
    answers = presentFor(w, p);
    pool = [...v.pres.ik, ...v.pres.jij, ...v.pres.hij, ...v.pres.pl];
  } else if (tense === 'past') {
    if (!v.past) return null;
    answers = sg ? v.past.sg : v.past.pl;
    pool = [...v.past.sg, ...v.past.pl, ...(v.pp ?? []), ...presentFor(w, p)];
  } else {
    if (!v.pp || !v.aux) return null;
    answers = v.pp;
    aux = HEBBEN_ZIJN[v.aux === 'zijn' ? 'zijn' : 'hebben'][p];
    pool = [...v.pp, ...(v.past ? [...v.past.sg, ...v.past.pl] : []), w.verb!.base === w.nl ? w.nl : w.verb!.base];
  }
  const wrong = [...new Set(pool.filter((x) => !answers.includes(x)))];
  if (wrong.length < 1) return null;
  const options = shuffle([answers[0], ...sample(wrong, 2, rng)], rng);
  return { type: 'conjugate', key: `v:${w.id}:${p}:${tense}`, wordIds: [w.id], word: w, person: p, tense, aux, options, answers };
}

export function matchExercise(ws: Word[], rng: Rng): Exercise | null {
  const unique: Word[] = [];
  for (const w of shuffle(ws, rng)) if (!unique.some((u) => sameMeaning(u, w))) unique.push(w);
  const chosen = unique.slice(0, 5);
  if (chosen.length < 3) return null;
  return {
    type: 'match',
    key: `m:${chosen.map((w) => w.id).join(',')}`,
    wordIds: chosen.map((w) => w.id),
    pairs: chosen.map((w) => ({ id: w.id, nl: nlLabel(w), de: w.de })),
  };
}

// ------------------------------------------------------------------ lessons

export interface LessonContext {
  settings: BuildSettings;
  seed: string;
  /** Tense drills unlocked by the learner's progress. */
  tenses?: Tense[];
}

function sentenceExercise(s: Sentence, mode: number, rng: Rng, settings: BuildSettings): Exercise {
  // mode: 0 build nl-de, 1 build de-nl, 2 listen+tiles, 3 write de-nl, 4 dictation, 5 write nl-de
  if ((mode === 2 || mode === 4) && !settings.listen) mode = mode === 2 ? 1 : 3;
  switch (mode) {
    case 0:
      return buildExercise(s, 'nl-de', rng);
    case 1:
      return buildExercise(s, 'de-nl', rng);
    case 2:
      return listenBuildExercise(s, rng);
    case 3:
      return writeExercise(s, 'de-nl');
    case 4:
      return writeExercise(s, 'nl-de', true);
    default:
      return writeExercise(s, 'nl-de');
  }
}

/** The exercises of one lesson node. */
export function buildLesson(node: PathNode, ctx: LessonContext): Exercise[] {
  const rng = makeRng(ctx.seed);
  const unit = units.find((u) => u.id === node.unitId)!;
  const plan = unitPlan(unit);
  if (node.kind === 'test') return buildUnitTest(unit, ctx);
  const lessons = plan.nodes.filter((n) => n.kind === 'lesson').length;
  const lessonNo = node.lesson;
  const last = lessonNo === lessons;

  const known = unit.words.filter((w) => w.core && (plan.wordLesson.get(w.id) ?? 99) <= lessonNo);
  const newWords = node.newWords.map((id) => getWord(id)!).filter(Boolean);
  const prevWords = wordsUpTo(unit.index - 1);
  const pool = [...known, ...prevWords.slice(-60)];

  const intro: Exercise[] = [];
  for (const w of newWords.slice(0, 7)) {
    const ex = pickExercise(w, pool, rng, true) ?? meaningExercise(w, pool, 'nl-de', rng, true);
    if (ex) intro.push(ex);
  }

  const own = unit.sentences.filter((s) => plan.sentenceLesson.get(s.id) === lessonNo);
  const earlier = unit.sentences.filter((s) => (plan.sentenceLesson.get(s.id) ?? 99) < lessonNo);
  const prevUnit = units.find((u) => u.index === unit.index - 1);
  const review = earlier.length ? earlier : (prevUnit?.sentences ?? []);
  const sentenceCount = last ? 9 : 8;
  const chosen = [...sample(own, Math.min(own.length, 6), rng)];
  chosen.push(...sample(review.filter((s) => !chosen.includes(s)), sentenceCount - chosen.length, rng));
  if (chosen.length < sentenceCount) {
    chosen.push(...sample(unit.sentences.filter((s) => !chosen.includes(s)), sentenceCount - chosen.length, rng));
  }

  const modes =
    lessonNo === 1 ? [0, 1, 0, 1, 2, 0, 1, 1, 0] : last ? [3, 1, 4, 0, 3, 2, 5, 1, 3] : lessonNo === 2 ? [0, 1, 2, 1, 0, 3, 2, 1, 0] : [1, 3, 0, 2, 3, 4, 1, 0, 3];
  const body: Exercise[] = chosen.map((s, i) => sentenceExercise(s, modes[i % modes.length], rng, ctx.settings));

  const extras: Exercise[] = [];
  const match = matchExercise(newWords.length >= 3 ? [...newWords, ...known] : known, rng);
  if (match && known.length >= 3) extras.push(match);
  const clozes = unit.cloze.filter((c) => wordsInText(c.before + c.answer + c.after, unit.words).every((w) => (plan.wordLesson.get(w.id) ?? 99) <= lessonNo));
  for (const c of sample(clozes, lessonNo === 1 ? 1 : 2, rng)) extras.push(clozeExercise(c, rng));
  const nouns = (newWords.length ? newWords : known).filter((w) => w.pos === 'noun' && !w.pluralOnly);
  const art = nouns.length ? articleExercise(pick(nouns, rng)) : null;
  if (art) extras.push(art);
  const verbs = known.filter((w) => w.verb);
  if (verbs.length) {
    const tense = pick(ctx.tenses ?? PRES_ONLY, rng);
    const ex = conjugateExercise(pick(verbs, rng), tense, rng) ?? conjugateExercise(pick(verbs, rng), 'pres', rng);
    if (ex) extras.push(ex);
  }
  if (lessonNo >= 2 && unit.index >= 10) {
    const pl = known.filter((w) => w.pos === 'noun' && w.pl.length);
    const ex = pl.length ? pluralExercise(pick(pl, rng), rng) : null;
    if (ex) extras.push(ex);
  }
  if (ctx.settings.speak && lessonNo >= 2 && chosen.length) extras.push(speakExercise(pick(chosen, rng)));

  // New words first (each followed by practice), then a shuffled mix.
  const mixed = shuffle([...body, ...extras], rng);
  const out: Exercise[] = [];
  intro.forEach((ex, i) => {
    out.push(ex);
    if (i % 2 === 1 && mixed.length) out.push(mixed.shift()!);
  });
  out.push(...mixed);
  return dedupe(out).slice(0, 16);
}

function dedupe(xs: Exercise[]): Exercise[] {
  const seen = new Set<string>();
  return xs.filter((x) => (seen.has(x.key) ? false : (seen.add(x.key), true)));
}

export function buildUnitTest(unit: Unit, ctx: LessonContext): Exercise[] {
  const rng = makeRng(ctx.seed);
  const ss = sample(unit.sentences, 11, rng);
  const modes = [3, 1, 4, 3, 0, 2, 3, 5, 1, 4, 3];
  const out: Exercise[] = ss.map((s, i) => sentenceExercise(s, modes[i % modes.length], rng, ctx.settings));
  for (const c of sample(unit.cloze, 3, rng)) out.push(clozeExercise(c, rng));
  const core = unit.words.filter((w) => w.core);
  const nouns = core.filter((w) => w.pos === 'noun' && !w.pluralOnly);
  if (nouns.length) {
    const a = articleExercise(pick(nouns, rng));
    if (a) out.push(a);
  }
  const verbs = core.filter((w) => w.verb);
  if (verbs.length) {
    const v = conjugateExercise(pick(verbs, rng), pick(ctx.tenses ?? PRES_ONLY, rng), rng);
    if (v) out.push(v);
  }
  return shuffle(dedupe(out), rng);
}

// ------------------------------------------------------------------ rebuild from key

/** Recreates an exercise from its key (used to practise past mistakes). */
export function exerciseFromKey(key: string, ctx: LessonContext): Exercise | null {
  const rng = makeRng(ctx.seed + key);
  const [kind, id, a, b] = key.split(':');
  if (kind === 's') {
    const s = sentenceById.get(id);
    if (!s) return null;
    const dir = a as Dir;
    if (b === 'listen') return ctx.settings.listen ? listenBuildExercise(s, rng) : buildExercise(s, 'de-nl', rng);
    if (b === 'dictate') return ctx.settings.listen ? writeExercise(s, 'nl-de', true) : writeExercise(s, 'de-nl');
    if (b === 'write') return writeExercise(s, dir);
    return buildExercise(s, dir, rng);
  }
  if (kind === 'c') {
    const c = clozeById.get(id);
    return c ? clozeExercise(c, rng) : null;
  }
  if (kind === 'k') {
    const s = sentenceById.get(id);
    return s && ctx.settings.speak ? speakExercise(s) : s ? writeExercise(s, 'de-nl') : null;
  }
  const w = getWord(id);
  if (!w) return null;
  const pool = wordsUpTo(unitIndex.get(w.unit) ?? 1);
  if (kind === 'w') {
    if (a === 'pick') return pickExercise(w, pool, rng) ?? meaningExercise(w, pool, 'nl-de', rng);
    return meaningExercise(w, pool, a as Dir, rng);
  }
  if (kind === 'a') return articleExercise(w);
  if (kind === 'p') return pluralExercise(w, rng);
  if (kind === 'v') return conjugateExercise(w, b as Tense, rng, a as Person);
  return null;
}

/** One exercise that trains a single word, chosen to fit its kind. */
export function wordExercise(w: Word, rng: Rng, tenses: Tense[]): Exercise | null {
  const pool = wordsUpTo(unitIndex.get(w.unit) ?? 1);
  const options: (Exercise | null)[] = [meaningExercise(w, pool, 'nl-de', rng), meaningExercise(w, pool, 'de-nl', rng)];
  if (w.emoji) options.push(pickExercise(w, pool, rng));
  if (w.pos === 'noun') options.push(articleExercise(w));
  if (w.verb) options.push(conjugateExercise(w, pick(tenses, rng), rng));
  const valid = options.filter((x): x is Exercise => !!x);
  return valid.length ? pick(valid, rng) : null;
}
