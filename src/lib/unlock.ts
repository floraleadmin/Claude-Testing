// What is unlocked, what is next, badges and daily quests.
import type { PathNode } from '../types';
import { course, units } from '../content/course';
import { allNodes, unitPlan, type Tense } from './exercises';
import { currentStreak, localDay, xpToday, type Progress } from './progress';

export function isDone(p: Progress, id: string): boolean {
  return !!p.done[id];
}

/** Index of the first node not done yet (the learner's position). */
export function currentIndex(p: Progress): number {
  const i = allNodes.findIndex((n) => !p.done[n.id]);
  return i === -1 ? allNodes.length : i;
}

export function currentNode(p: Progress): PathNode | null {
  return allNodes[currentIndex(p)] ?? null;
}

export function isUnlocked(p: Progress, node: PathNode): boolean {
  return allNodes.indexOf(node) <= currentIndex(p) || isDone(p, node.id);
}

/** Index of the furthest unit the learner has reached. */
export function reachedUnitIndex(p: Progress): number {
  const n = currentNode(p);
  if (!n) return units.length;
  return units.find((u) => u.id === n.unitId)!.index;
}

export const PERFECT_FROM = 'u31';
export const PAST_FROM = 'u34';

/** Tenses the conjugation drills may use for a unit. */
export function tensesFor(unitIndex: number): Tense[] {
  const perf = units.find((u) => u.id === PERFECT_FROM)?.index ?? Infinity;
  const past = units.find((u) => u.id === PAST_FROM)?.index ?? Infinity;
  const t: Tense[] = ['pres'];
  if (unitIndex >= perf) t.push('perf');
  if (unitIndex >= past) t.push('past');
  return t;
}

export function unitDone(p: Progress, unitId: string): boolean {
  const u = units.find((x) => x.id === unitId)!;
  return unitPlan(u).nodes.every((n) => isDone(p, n.id));
}

export function sectionDone(p: Progress, sectionId: string): boolean {
  return course.find((s) => s.id === sectionId)!.units.every((u) => unitDone(p, u.id));
}

/** Sentences from lessons the learner has finished. */
export function learnedSentenceIds(p: Progress): string[] {
  const out: string[] = [];
  for (const u of units) {
    const plan = unitPlan(u);
    for (const n of plan.nodes) if (n.kind === 'lesson' && isDone(p, n.id)) out.push(...n.sentences);
  }
  return out;
}

// ------------------------------------------------------------------ badges

export interface Badge {
  id: string;
  title: string;
  text: string;
  test: (p: Progress) => boolean;
}

const learnedWords = (p: Progress) => Object.keys(p.words).length;

export const BADGES: Badge[] = [
  { id: 'first', title: 'Erste Fahrt', text: 'Die erste Lektion geschafft', test: (p) => p.stats.lessons >= 1 },
  { id: 'l10', title: 'In Fahrt', text: '10 Lektionen', test: (p) => p.stats.lessons >= 10 },
  { id: 'l50', title: 'Dauerfahrer', text: '50 Lektionen', test: (p) => p.stats.lessons >= 50 },
  { id: 'l150', title: 'Elfstedentocht', text: '150 Lektionen', test: (p) => p.stats.lessons >= 150 },
  { id: 's3', title: 'Drei am Stück', text: '3 Tage Serie', test: (p) => p.bestStreak >= 3 },
  { id: 's7', title: 'Eine Woche', text: '7 Tage Serie', test: (p) => p.bestStreak >= 7 },
  { id: 's30', title: 'Ein Monat', text: '30 Tage Serie', test: (p) => p.bestStreak >= 30 },
  { id: 's100', title: 'Unaufhaltsam', text: '100 Tage Serie', test: (p) => p.bestStreak >= 100 },
  { id: 'w50', title: 'Erste Wörter', text: '50 Wörter gelernt', test: (p) => learnedWords(p) >= 50 },
  { id: 'w250', title: 'Wortschatz', text: '250 Wörter gelernt', test: (p) => learnedWords(p) >= 250 },
  { id: 'w500', title: 'Wortkenner', text: '500 Wörter gelernt', test: (p) => learnedWords(p) >= 500 },
  { id: 'w1000', title: 'Wörterbuch', text: '1000 Wörter gelernt', test: (p) => learnedWords(p) >= 1000 },
  { id: 'perfect', title: 'Fehlerfrei', text: 'Eine Lektion ohne Fehler', test: (p) => p.stats.perfect >= 1 },
  { id: 'perfect10', title: 'Perfektionist', text: '10 Lektionen ohne Fehler', test: (p) => p.stats.perfect >= 10 },
  { id: 'story5', title: 'Leseratte', text: '5 Geschichten gelesen', test: (p) => p.stats.stories >= 5 },
  { id: 'practice10', title: 'Wiederholer', text: '10 Übungsrunden', test: (p) => p.stats.practice >= 10 },
  { id: 'xp1000', title: 'Tausend XP', text: '1000 XP gesammelt', test: (p) => p.xp >= 1000 },
  { id: 'xp5000', title: 'Fünftausend XP', text: '5000 XP gesammelt', test: (p) => p.xp >= 5000 },
  ...course.map((s) => ({
    id: `sec-${s.id}`,
    title: `Abschnitt ${s.index}`,
    text: `„${s.title}“ abgeschlossen`,
    test: (p: Progress) => sectionDone(p, s.id),
  })),
];

/** Badges earned now that were not stored before. */
export function newBadges(p: Progress): string[] {
  return BADGES.filter((b) => !p.badges.includes(b.id) && b.test(p)).map((b) => b.id);
}

// ------------------------------------------------------------------ daily quests

export interface Quest {
  title: string;
  value: number;
  goal: number;
}

export function quests(p: Progress, today = localDay()): Quest[] {
  const d = p.day.date === today ? p.day : { lessons: 0, firstTry: 0 };
  return [
    { title: `${p.settings.dailyGoal} XP sammeln`, value: xpToday(p, today), goal: p.settings.dailyGoal },
    { title: '2 Lektionen abschließen', value: d.lessons, goal: 2 },
    { title: '20 Aufgaben auf Anhieb richtig', value: d.firstTry, goal: 20 },
  ];
}

export function streakNow(p: Progress): number {
  return currentStreak(p);
}
