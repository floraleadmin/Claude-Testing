// What a session is made of: lessons, unit tests, practice rounds, jump tests.
import type { PathNode } from '../types';
import { course, sentenceById, units } from '../content/course';
import {
  allNodes,
  buildExercise,
  buildLesson,
  clozeExercise,
  conjugateExercise,
  articleExercise,
  exerciseFromKey,
  getWord,
  listenBuildExercise,
  matchExercise,
  speakExercise,
  unitPlan,
  wordExercise,
  writeExercise,
  type BuildSettings,
  type Exercise,
} from './exercises';
import { makeRng, pick, sample, shuffle } from './rng';
import { dayNumber, dueWords, localDay, type Progress } from './progress';
import { learnedSentenceIds, reachedUnitIndex, tensesFor } from './unlock';
import { wordsInText } from './path';
import { dutchAudio } from './speech';

export type SessionKind = 'lesson' | 'test' | 'practice' | 'jump';

export interface SessionSpec {
  kind: SessionKind;
  title: string;
  exercises: Exercise[];
  nodeId?: string;
  extraNodes?: string[];
  introduced: string[];
  clearMistakes?: boolean;
  /** Jump tests end after this many mistakes. */
  maxMistakes?: number;
}

function settingsOf(p: Progress): BuildSettings {
  // Without a Dutch voice listening tasks cannot be heard, so they are left out.
  return { listen: p.settings.listen && dutchAudio() !== 'none', speak: p.settings.speak };
}

function seed(p: Progress, id: string): string {
  return `${id}:${p.done[id]?.n ?? 0}:${p.stats.exercises}:${Date.now() % 100000}`;
}

export function lessonSession(p: Progress, node: PathNode): SessionSpec {
  const unit = units.find((u) => u.id === node.unitId)!;
  const exercises = buildLesson(node, { settings: settingsOf(p), seed: seed(p, node.id), tenses: tensesFor(unit.index) });
  const plan = unitPlan(unit);
  const title = node.kind === 'test' ? `Kapiteltest: ${unit.title}` : `${unit.title} · Lektion ${node.lesson} von ${plan.nodes.filter((n) => n.kind === 'lesson').length}`;
  return {
    kind: node.kind === 'test' ? 'test' : 'lesson',
    title,
    exercises,
    nodeId: node.id,
    introduced: node.kind === 'lesson' ? node.newWords : unit.words.filter((w) => w.core).map((w) => w.id),
  };
}

export function mistakesSession(p: Progress): SessionSpec {
  const ctx = { settings: settingsOf(p), seed: seed(p, 'mistakes') };
  const exercises = p.mistakes
    .slice(0, 14)
    .map((k) => exerciseFromKey(k, ctx))
    .filter((x): x is Exercise => !!x);
  return { kind: 'practice', title: 'Fehler wiederholen', exercises, introduced: [], clearMistakes: true };
}

export function wordsSession(p: Progress): SessionSpec {
  const rng = makeRng(seed(p, 'words'));
  const today = dayNumber(localDay());
  let ids = dueWords(p, today);
  if (ids.length < 6) {
    // Nothing (or little) due: practise the weakest words instead.
    const weakest = Object.entries(p.words)
      .sort((a, b) => a[1].b - b[1].b || a[1].d - b[1].d)
      .map(([id]) => id);
    ids = [...new Set([...ids, ...weakest])];
  }
  const chosen = ids.slice(0, 10).map(getWord).filter((w): w is NonNullable<typeof w> => !!w && w.core);
  const tenses = tensesFor(reachedUnitIndex(p));
  const exercises: Exercise[] = [];
  for (const w of chosen) {
    const ex = wordExercise(w, rng, tenses);
    if (ex) exercises.push(ex);
  }
  // Sentences that use the chosen words.
  const learned = learnedSentenceIds(p).map((id) => sentenceById.get(id)!).filter(Boolean);
  const withWords = learned.filter((s) => wordsInText(s.nl[0], chosen).length > 0);
  for (const s of sample(withWords, 4, rng)) exercises.push(rng() < 0.5 ? buildExercise(s, 'de-nl', rng) : writeExercise(s, 'de-nl'));
  const m = matchExercise(chosen, rng);
  if (m) exercises.push(m);
  return { kind: 'practice', title: 'Wörter wiederholen', exercises: shuffle(exercises, rng), introduced: [] };
}

export function listeningSession(p: Progress): SessionSpec {
  const rng = makeRng(seed(p, 'listen'));
  const learned = learnedSentenceIds(p).map((id) => sentenceById.get(id)!).filter(Boolean);
  const exercises = sample(learned, 10, rng).map((s, i) => (i % 2 ? writeExercise(s, 'nl-de', true) : listenBuildExercise(s, rng)));
  return { kind: 'practice', title: 'Hörtraining', exercises, introduced: [] };
}

export function speakingSession(p: Progress): SessionSpec {
  const rng = makeRng(seed(p, 'speak'));
  const learned = learnedSentenceIds(p).map((id) => sentenceById.get(id)!).filter(Boolean);
  return { kind: 'practice', title: 'Sprechtraining', exercises: sample(learned, 8, rng).map(speakExercise), introduced: [] };
}

export function articleSession(p: Progress): SessionSpec {
  const rng = makeRng(seed(p, 'article'));
  const nouns = Object.keys(p.words)
    .map(getWord)
    .filter((w): w is NonNullable<typeof w> => !!w && w.pos === 'noun' && !w.pluralOnly && !!w.art);
  const exercises = sample(nouns, 15, rng)
    .map(articleExercise)
    .filter((x): x is Exercise => !!x);
  return { kind: 'practice', title: 'Artikeltrainer: de oder het', exercises, introduced: [] };
}

export function verbSession(p: Progress): SessionSpec {
  const rng = makeRng(seed(p, 'verbs'));
  const verbs = Object.keys(p.words)
    .map(getWord)
    .filter((w): w is NonNullable<typeof w> => !!w && !!w.verb);
  const tenses = tensesFor(reachedUnitIndex(p));
  const exercises: Exercise[] = [];
  for (let i = 0; i < 15 && verbs.length; i++) {
    const ex = conjugateExercise(pick(verbs, rng), pick(tenses, rng), rng);
    if (ex && !exercises.some((e) => e.key === ex.key)) exercises.push(ex);
  }
  return { kind: 'practice', title: 'Verbtrainer', exercises, introduced: [] };
}

/** Test to skip ahead to a section: material of all earlier sections, at most 3 mistakes. */
export function jumpSession(p: Progress, sectionId: string): SessionSpec {
  const rng = makeRng(seed(p, 'jump-' + sectionId));
  const sec = course.find((s) => s.id === sectionId)!;
  const earlierUnits = course.filter((s) => s.index < sec.index).flatMap((s) => s.units);
  const settings = settingsOf(p);
  const exercises: Exercise[] = [];
  const sentences = sample(earlierUnits.flatMap((u) => u.sentences), 14, rng);
  sentences.forEach((s, i) => {
    const mode = i % 4;
    exercises.push(mode === 0 ? writeExercise(s, 'de-nl') : mode === 1 ? buildExercise(s, 'nl-de', rng) : mode === 2 && settings.listen ? listenBuildExercise(s, rng) : buildExercise(s, 'de-nl', rng));
  });
  for (const c of sample(earlierUnits.flatMap((u) => u.cloze), 6, rng)) exercises.push(clozeExercise(c, rng));
  const unitIds = new Set(earlierUnits.map((u) => u.id));
  const extraNodes = allNodes.filter((n) => unitIds.has(n.unitId)).map((n) => n.id);
  const introduced = earlierUnits.flatMap((u) => u.words.filter((w) => w.core).map((w) => w.id));
  return {
    kind: 'jump',
    title: `Einstufung: Abschnitt ${sec.index}`,
    exercises: shuffle(exercises, rng),
    extraNodes,
    introduced,
    maxMistakes: 3,
  };
}

/** Repeat a finished unit as a test. */
export function unitReviewSession(p: Progress, unitId: string): SessionSpec {
  const unit = units.find((u) => u.id === unitId)!;
  const node = unitPlan(unit).nodes.find((n) => n.kind === 'test')!;
  return { ...lessonSession(p, node), kind: 'practice', nodeId: undefined, title: `Wiederholung: ${unit.title}`, introduced: [] };
}
