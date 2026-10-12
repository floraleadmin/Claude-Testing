import { describe, expect, it } from 'vitest';
import { lexicon, units, words } from '../src/content/course';
import { hintsAt } from '../src/lib/lexicon';
import { checkText } from '../src/lib/answer';
import {
  acceptedAnswers,
  allNodes,
  buildExercise,
  buildLesson,
  exerciseFromKey,
  knownDutchForms,
  unitPlan,
  type Exercise,
} from '../src/lib/exercises';
import { makeRng } from '../src/lib/rng';
import { foldToken, lower, tokenize } from '../src/lib/text';
import { tensesFor } from '../src/lib/unlock';

const settings = { listen: true, speak: true };

function multisetMinus(a: string[], b: string[]): string[] {
  const rest = [...a];
  for (const x of b) {
    const i = rest.indexOf(x);
    if (i !== -1) rest.splice(i, 1);
  }
  return rest;
}

function checkExercise(ex: Exercise) {
  switch (ex.type) {
    case 'build': {
      const lang = ex.dir === 'nl-de' && !ex.listen ? 'de' : 'nl';
      const target = ex.listen ? ex.sentence.nl[0] : ex.dir === 'nl-de' ? ex.sentence.de[0] : ex.sentence.nl[0];
      const correct = tokenize(target).map(lower);
      const tiles = ex.tiles.map(lower);
      expect(multisetMinus(correct, tiles), `tiles miss words of "${target}"`).toEqual([]);
      const extra = multisetMinus(tiles, correct);
      const answerTokens = new Set(ex.answers.flatMap((a) => tokenize(a).map((t) => foldToken(lower(t), lang))));
      for (const d of extra) expect(answerTokens.has(foldToken(d, lang)), `distractor "${d}" belongs to an answer of "${target}"`).toBe(false);
      expect(checkText(correct.join(' '), ex.answers, lang, { typos: false }).status).toBe('correct');
      break;
    }
    case 'write': {
      const lang = ex.dir === 'nl-de' && !ex.listen ? 'de' : 'nl';
      for (const a of ex.answers) expect(checkText(a, ex.answers, lang, { typos: true, knownForms: knownDutchForms }).status).toBe('correct');
      break;
    }
    case 'cloze':
      expect(ex.options).toContain(ex.cloze.answer);
      expect(new Set(ex.options).size).toBe(ex.options.length);
      break;
    case 'pick':
      expect(ex.options.map((o) => o.id)).toContain(ex.word.id);
      expect(new Set(ex.options.map((o) => lower(o.de))).size).toBe(ex.options.length);
      expect(new Set(ex.options.map((o) => o.emoji)).size).toBe(ex.options.length);
      break;
    case 'meaning':
      expect(ex.options).toContain(ex.answer);
      expect(new Set(ex.options.map(lower)).size).toBe(ex.options.length);
      break;
    case 'conjugate':
    case 'plural':
      expect(ex.options.filter((o) => ex.answers.includes(o)).length).toBe(1);
      expect(new Set(ex.options).size).toBe(ex.options.length);
      break;
    case 'match':
      expect(new Set(ex.pairs.map((p) => lower(p.de))).size).toBe(ex.pairs.length);
      expect(new Set(ex.pairs.map((p) => lower(p.nl))).size).toBe(ex.pairs.length);
      break;
    case 'article':
      expect(['de', 'het']).toContain(ex.word.art);
      break;
    case 'speak':
      expect(ex.text.length).toBeGreaterThan(0);
      break;
  }
}

describe('course content', () => {
  it('has unique word ids', () => {
    const ids = words.map((w) => w.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('gives every Dutch token in sentences a hint', () => {
    const missing: string[] = [];
    for (const u of units)
      for (const s of u.sentences)
        for (const v of s.nl) {
          const toks = tokenize(v);
          toks.forEach((t, i) => {
            if (!hintsAt(lexicon, toks, i).length) missing.push(`${t} (${s.id})`);
          });
        }
    expect(missing).toEqual([]);
  });

  it('assigns every sentence and word of a unit to a lesson', () => {
    for (const u of units) {
      const plan = unitPlan(u);
      const lessons = plan.nodes.filter((n) => n.kind === 'lesson');
      expect(lessons.length).toBeGreaterThanOrEqual(3);
      const assigned = lessons.flatMap((n) => n.sentences);
      expect(assigned.sort()).toEqual(u.sentences.map((s) => s.id).sort());
      expect(lessons.flatMap((n) => n.newWords).length).toBe(u.words.filter((w) => w.core).length);
    }
  });
});

describe('exercise generation', () => {
  it('builds valid tiles for every sentence in both directions', () => {
    for (const u of units)
      for (const s of u.sentences)
        for (const dir of ['nl-de', 'de-nl'] as const) {
          const ex = buildExercise(s, dir, makeRng(s.id + dir));
          checkExercise(ex);
          expect(acceptedAnswers(s, dir)).toContain(dir === 'nl-de' ? s.de[0] : s.nl[0]);
        }
  });

  it('uses every exercise type somewhere in the course', () => {
    const types = new Set<string>();
    for (const node of allNodes) {
      if (node.kind === 'story') continue;
      const unit = units.find((u) => u.id === node.unitId)!;
      for (const e of buildLesson(node, { settings, seed: node.id, tenses: tensesFor(unit.index) })) types.add(e.type);
    }
    for (const t of ['pick', 'meaning', 'match', 'build', 'write', 'cloze', 'article', 'conjugate', 'plural', 'speak']) expect(types, t).toContain(t);
  });

  it('builds every lesson and test with valid exercises', () => {
    for (const node of allNodes) {
      if (node.kind === 'story') continue;
      const unit = units.find((u) => u.id === node.unitId)!;
      for (const seed of ['a', 'b', 'c']) {
        const list = buildLesson(node, { settings, seed: node.id + seed, tenses: tensesFor(unit.index) });
        expect(list.length, node.id).toBeGreaterThanOrEqual(8);
        expect(new Set(list.map((e) => e.key)).size).toBe(list.length);
        list.forEach(checkExercise);
        for (const e of list) {
          if (e.type === 'match') continue;
          const again = exerciseFromKey(e.key, { settings, seed: 'x' });
          expect(again, e.key).not.toBeNull();
          checkExercise(again!);
        }
      }
    }
  });
});
