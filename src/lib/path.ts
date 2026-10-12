// Splits every unit into lessons and lays out the learning path.
import type { PathNode, Sentence, Unit, Word } from '../types';
import { lower, tokenize } from './text';

/** Core words of `pool` that occur in a Dutch text (single tokens or whole phrases). */
export function wordsInText(text: string, pool: Word[]): Word[] {
  const toks = tokenize(text).map(lower);
  const set = new Set(toks);
  const joined = ' ' + toks.join(' ') + ' ';
  return pool.filter((w) =>
    w.forms.some((f) => {
      if (!f.includes(' ')) return set.has(f);
      return joined.includes(' ' + tokenize(f).map(lower).join(' ') + ' ');
    }),
  );
}

export function lessonCount(unit: Unit): number {
  const core = unit.words.filter((w) => w.core).length;
  return Math.min(5, Math.max(3, Math.ceil(core / 6)));
}

export interface UnitPlan {
  unit: Unit;
  nodes: PathNode[];
  /** Lesson (1-based) in which each word of the unit is introduced. */
  wordLesson: Map<string, number>;
  /** Lesson (1-based) in which each sentence is first practised. */
  sentenceLesson: Map<string, number>;
}

export function planUnit(unit: Unit): UnitPlan {
  const core = unit.words.filter((w) => w.core);
  const lessons = lessonCount(unit);
  const intro = Math.max(1, lessons - 1);
  const wordLesson = new Map<string, number>();
  core.forEach((w, i) => wordLesson.set(w.id, Math.floor((i * intro) / core.length) + 1));

  const sentenceLesson = new Map<string, number>();
  const lessonOf = (s: Sentence) => {
    const ws = wordsInText(s.nl[0], core);
    return ws.length ? Math.max(...ws.map((w) => wordLesson.get(w.id)!)) : 1;
  };
  unit.sentences.forEach((s) => sentenceLesson.set(s.id, lessonOf(s)));

  const nodes: PathNode[] = [];
  for (let l = 1; l <= lessons; l++) {
    nodes.push({
      id: `${unit.id}-l${l}`,
      kind: 'lesson',
      unitId: unit.id,
      lesson: l,
      newWords: core.filter((w) => wordLesson.get(w.id) === l).map((w) => w.id),
      sentences: unit.sentences.filter((s) => sentenceLesson.get(s.id) === l).map((s) => s.id),
    });
  }
  if (unit.story) {
    nodes.push({ id: `${unit.id}-story`, kind: 'story', unitId: unit.id, lesson: 0, newWords: [], sentences: [] });
  }
  nodes.push({ id: `${unit.id}-test`, kind: 'test', unitId: unit.id, lesson: 0, newWords: [], sentences: unit.sentences.map((s) => s.id) });
  return { unit, nodes, wordLesson, sentenceLesson };
}
