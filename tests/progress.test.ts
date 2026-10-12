import { describe, expect, it } from 'vitest';
import { addDays, applySession, currentStreak, dayNumber, localDay, newProgress, strength, type SessionResult } from '../src/lib/progress';

const day = (d: string) => new Date(d + 'T10:00:00');
const lesson = (over: Partial<SessionResult> = {}): SessionResult => ({
  kind: 'lesson',
  nodeId: 'u01-l1',
  xp: 10,
  outcomes: [
    { key: 's:u01.s1:nl-de:build', wordIds: ['hallo'], firstTry: true },
    { key: 's:u01.s2:de-nl:build', wordIds: ['goed'], firstTry: false },
  ],
  introduced: ['hallo', 'goed'],
  ms: 60000,
  ...over,
});

describe('days', () => {
  it('formats local days and counts across months', () => {
    expect(localDay(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(addDays('2026-02-28', 1)).toBe('2026-03-01');
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29');
    expect(dayNumber('2026-03-01') - dayNumber('2026-02-28')).toBe(1);
  });
});

describe('applySession', () => {
  it('adds XP, starts a streak and marks the node done', () => {
    const p = applySession(newProgress(), lesson(), day('2026-10-12'));
    expect(p.xp).toBe(10);
    expect(p.xpByDay['2026-10-12']).toBe(10);
    expect(p.streak).toBe(1);
    expect(p.done['u01-l1'].n).toBe(1);
    expect(p.stats.lessons).toBe(1);
  });
  it('continues the streak on the next day and resets after a gap', () => {
    let p = applySession(newProgress(), lesson(), day('2026-10-12'));
    p = applySession(p, lesson(), day('2026-10-12'));
    expect(p.streak).toBe(1);
    p = applySession(p, lesson(), day('2026-10-13'));
    expect(p.streak).toBe(2);
    expect(currentStreak(p, '2026-10-14')).toBe(2);
    expect(currentStreak(p, '2026-10-15')).toBe(0);
    p = applySession(p, lesson(), day('2026-10-16'));
    expect(p.streak).toBe(1);
    expect(p.bestStreak).toBe(2);
  });
  it('schedules words: right answers move up, wrong answers come back today', () => {
    const p = applySession(newProgress(), lesson(), day('2026-10-12'));
    const today = dayNumber('2026-10-12');
    expect(p.words.hallo.b).toBe(2);
    expect(p.words.hallo.d).toBe(today + 2);
    expect(p.words.goed.b).toBe(1);
    expect(p.words.goed.d).toBe(today);
    expect(strength(p.words.hallo, today)).toBeGreaterThan(0);
  });
  it('promotes a word at most once per day', () => {
    let p = applySession(newProgress(), lesson(), day('2026-10-12'));
    p = applySession(p, lesson({ introduced: [] }), day('2026-10-12'));
    expect(p.words.hallo.b).toBe(2);
  });
  it('remembers mistakes and clears them after a right answer in practice', () => {
    let p = applySession(newProgress(), lesson(), day('2026-10-12'));
    expect(p.mistakes).toEqual(['s:u01.s2:de-nl:build']);
    p = applySession(
      p,
      { kind: 'practice', xp: 5, outcomes: [{ key: 's:u01.s2:de-nl:build', wordIds: ['goed'], firstTry: true }], introduced: [], ms: 1000, clearMistakes: true },
      day('2026-10-13'),
    );
    expect(p.mistakes).toEqual([]);
  });
  it('never stores match exercises as mistakes', () => {
    const p = applySession(newProgress(), lesson({ outcomes: [{ key: 'm:a,b,c', wordIds: [], firstTry: false }] }), day('2026-10-12'));
    expect(p.mistakes).toEqual([]);
  });
});
