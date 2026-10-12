// Learner progress: XP, streak, spaced repetition, mistakes, badges.
// Pure functions; the app stores the result.

export interface Settings {
  dailyGoal: number;
  sound: boolean;
  listen: boolean;
  speak: boolean;
  autoplay: boolean;
  voiceURI: string | null;
  rate: number;
  hearts: boolean;
  typos: boolean;
  theme: 'system' | 'light' | 'dark';
}

export interface SrsState {
  /** Leitner box 1..6 */
  b: number;
  /** Day number when the word is due again. */
  d: number;
  /** Times seen, right, wrong. */
  s: number;
  r: number;
  w: number;
}

export interface Progress {
  v: 1;
  createdAt: number;
  updatedAt: number;
  xp: number;
  xpByDay: Record<string, number>;
  streak: number;
  bestStreak: number;
  lastDay: string | null;
  done: Record<string, { n: number; best: number }>;
  words: Record<string, SrsState>;
  mistakes: string[];
  accepted: Record<string, string[]>;
  settings: Settings;
  badges: string[];
  stats: { lessons: number; exercises: number; firstTry: number; perfect: number; stories: number; practice: number; ms: number };
  day: { date: string; lessons: number; firstTry: number };
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  dailyGoal: 20,
  sound: true,
  listen: true,
  speak: false,
  autoplay: true,
  voiceURI: null,
  rate: 0.95,
  hearts: false,
  typos: true,
  theme: 'system',
};

export function newProgress(now = Date.now()): Progress {
  return {
    v: 1,
    createdAt: now,
    updatedAt: now,
    xp: 0,
    xpByDay: {},
    streak: 0,
    bestStreak: 0,
    lastDay: null,
    done: {},
    words: {},
    mistakes: [],
    accepted: {},
    settings: { ...DEFAULT_SETTINGS },
    badges: [],
    stats: { lessons: 0, exercises: 0, firstTry: 0, perfect: 0, stories: 0, practice: 0, ms: 0 },
    day: { date: '', lessons: 0, firstTry: 0 },
    onboarded: false,
  };
}

/** Fills in fields missing from older saves. */
export function migrate(raw: unknown): Progress {
  const base = newProgress();
  if (!raw || typeof raw !== 'object') return base;
  const p = raw as Partial<Progress>;
  return {
    ...base,
    ...p,
    v: 1,
    settings: { ...DEFAULT_SETTINGS, ...(p.settings ?? {}) },
    stats: { ...base.stats, ...(p.stats ?? {}) },
    day: { ...base.day, ...(p.day ?? {}) },
    xpByDay: p.xpByDay ?? {},
    done: p.done ?? {},
    words: p.words ?? {},
    mistakes: Array.isArray(p.mistakes) ? p.mistakes : [],
    accepted: p.accepted ?? {},
    badges: Array.isArray(p.badges) ? p.badges : [],
  };
}

// ------------------------------------------------------------------ days

/** Local calendar day as YYYY-MM-DD. */
export function localDay(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Days since 1970-01-01 for a YYYY-MM-DD string (time zone free). */
export function dayNumber(day: string): number {
  const [y, m, d] = day.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`;
}

/** The streak as it stands today: it breaks once a whole day is missed. */
export function currentStreak(p: Progress, today = localDay()): number {
  if (!p.lastDay) return 0;
  if (p.lastDay === today || p.lastDay === addDays(today, -1)) return p.streak;
  return 0;
}

export function xpToday(p: Progress, today = localDay()): number {
  return p.xpByDay[today] ?? 0;
}

// ------------------------------------------------------------------ spaced repetition

export const INTERVALS = [0, 1, 2, 4, 8, 16, 32];

export function isDue(s: SrsState, todayNo: number): boolean {
  return s.d <= todayNo;
}

/** 0..4 bars for the word list. */
export function strength(s: SrsState | undefined, todayNo: number): number {
  if (!s) return 0;
  let bars = Math.min(4, Math.ceil((s.b / 6) * 4));
  const overdue = todayNo - s.d;
  if (overdue > INTERVALS[s.b]) bars -= 1;
  if (overdue > 2 * INTERVALS[s.b] + 7) bars -= 1;
  return Math.max(1, bars);
}

export function dueWords(p: Progress, todayNo: number): string[] {
  return Object.entries(p.words)
    .filter(([, s]) => isDue(s, todayNo))
    .sort((a, b) => a[1].d - b[1].d || a[1].b - b[1].b)
    .map(([id]) => id);
}

// ------------------------------------------------------------------ sessions

export interface ExerciseOutcome {
  key: string;
  wordIds: string[];
  firstTry: boolean;
  listen?: boolean;
}

export interface SessionResult {
  kind: 'lesson' | 'test' | 'story' | 'practice' | 'jump';
  nodeId?: string;
  /** Nodes to mark as done (jump test). */
  extraNodes?: string[];
  xp: number;
  outcomes: ExerciseOutcome[];
  introduced: string[];
  ms: number;
  /** Mistake keys answered correctly in a mistakes session are removed. */
  clearMistakes?: boolean;
}

export function sessionAccuracy(outcomes: ExerciseOutcome[]): number {
  if (!outcomes.length) return 100;
  return Math.round((100 * outcomes.filter((o) => o.firstTry).length) / outcomes.length);
}

/** XP for a finished session. */
export function sessionXp(kind: SessionResult['kind'], outcomes: ExerciseOutcome[]): number {
  const perfect = outcomes.length > 0 && outcomes.every((o) => o.firstTry);
  switch (kind) {
    case 'lesson':
      return 10 + (perfect ? 5 : 0);
    case 'test':
      return 20 + (perfect ? 10 : 0);
    case 'story':
      return 12;
    case 'jump':
      return 30;
    default:
      return Math.max(5, Math.min(15, Math.round(outcomes.filter((o) => o.firstTry).length)));
  }
}

export function applySession(prev: Progress, r: SessionResult, now = new Date()): Progress {
  const p: Progress = structuredClone(prev);
  const today = localDay(now);
  const todayNo = dayNumber(today);

  p.xp += r.xp;
  p.xpByDay[today] = (p.xpByDay[today] ?? 0) + r.xp;
  if (p.lastDay !== today) {
    p.streak = p.lastDay === addDays(today, -1) ? p.streak + 1 : 1;
    p.lastDay = today;
  }
  p.bestStreak = Math.max(p.bestStreak, p.streak);

  if (p.day.date !== today) p.day = { date: today, lessons: 0, firstTry: 0 };
  const first = r.outcomes.filter((o) => o.firstTry).length;
  p.day.firstTry += first;

  for (const id of [r.nodeId, ...(r.extraNodes ?? [])]) {
    if (!id) continue;
    const acc = sessionAccuracy(r.outcomes);
    const d = p.done[id] ?? { n: 0, best: 0 };
    p.done[id] = { n: d.n + 1, best: Math.max(d.best, acc) };
  }

  for (const id of r.introduced) {
    if (!p.words[id]) p.words[id] = { b: 1, d: todayNo + INTERVALS[1], s: 0, r: 0, w: 0 };
  }
  for (const o of r.outcomes) {
    for (const id of o.wordIds) {
      const s = p.words[id];
      if (!s) continue;
      s.s++;
      if (o.firstTry) {
        s.r++;
        // Only promote a word once per day, so one long session cannot push it far ahead.
        if (s.d <= todayNo || s.b <= 1) {
          s.b = Math.min(6, s.b + 1);
          s.d = todayNo + INTERVALS[s.b];
        }
      } else {
        s.w++;
        s.b = Math.max(1, s.b - 1);
        s.d = todayNo;
      }
    }
  }

  const wrongKeys = r.outcomes.filter((o) => !o.firstTry && !o.key.startsWith('m:')).map((o) => o.key);
  const rightKeys = new Set(r.outcomes.filter((o) => o.firstTry).map((o) => o.key));
  let mistakes = p.mistakes.filter((k) => !wrongKeys.includes(k));
  if (r.clearMistakes) mistakes = mistakes.filter((k) => !rightKeys.has(k));
  p.mistakes = [...wrongKeys, ...mistakes].slice(0, 100);

  p.stats.exercises += r.outcomes.length;
  p.stats.firstTry += first;
  p.stats.ms += r.ms;
  if (r.kind === 'lesson' || r.kind === 'test') {
    p.stats.lessons++;
    p.day.lessons++;
    if (r.outcomes.length && first === r.outcomes.length) p.stats.perfect++;
  }
  if (r.kind === 'story') p.stats.stories++;
  if (r.kind === 'practice') p.stats.practice++;

  p.updatedAt = now.getTime();
  return p;
}

/** Marks a typed answer as correct from now on. */
export function acceptAnswer(prev: Progress, key: string, answer: string): Progress {
  const list = prev.accepted[key] ?? [];
  if (list.includes(answer)) return prev;
  return { ...prev, accepted: { ...prev.accepted, [key]: [...list, answer] }, updatedAt: Date.now() };
}

/** Keeps the stored document small enough for cloud storage. */
export function compact(p: Progress): Progress {
  const days = Object.keys(p.xpByDay).sort();
  const keep = days.slice(-400);
  const xpByDay: Record<string, number> = {};
  for (const d of keep) xpByDay[d] = p.xpByDay[d];
  return { ...p, xpByDay, mistakes: p.mistakes.slice(0, 100) };
}
