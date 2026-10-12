// Turns a learner's response into a verdict and the text shown in the feedback bar.
import type { Exercise } from './exercises';
import { nlLabel, personLabel } from './exercises';
import { checkText, type CheckStatus } from './answer';
import { knownDutchForms } from './exercises';
import { speechScore } from './answer';

export type Response =
  | { kind: 'choice'; value: string }
  | { kind: 'text'; value: string }
  | { kind: 'speech'; heard: string[] }
  | { kind: 'done' };

export interface Verdict {
  status: CheckStatus;
  /** Correct answer to show. */
  solution: string;
  /** Translation or full sentence, shown below the solution. */
  meaning?: string;
  /** Offer "my answer was right" (typed and tile answers only). */
  canAppeal: boolean;
}

export function evaluate(ex: Exercise, r: Response, opts: { typos: boolean; accepted: string[] }): Verdict {
  switch (ex.type) {
    case 'pick': {
      const ok = r.kind === 'choice' && r.value === ex.word.id;
      return { status: ok ? 'correct' : 'wrong', solution: nlLabel(ex.word), meaning: ex.word.de, canAppeal: false };
    }
    case 'meaning': {
      const ok = r.kind === 'choice' && r.value === ex.answer;
      return {
        status: ok ? 'correct' : 'wrong',
        solution: ex.answer,
        meaning: ex.dir === 'nl-de' ? `${nlLabel(ex.word)} = ${ex.word.de}` : `${ex.word.de} = ${nlLabel(ex.word)}`,
        canAppeal: false,
      };
    }
    case 'match':
      return { status: 'correct', solution: '', canAppeal: false };
    case 'build':
    case 'write': {
      const text = r.kind === 'text' ? r.value : '';
      const lang = ex.dir === 'nl-de' && !ex.listen ? 'de' : 'nl';
      const answers = [...ex.answers, ...opts.accepted];
      const res = checkText(text, answers, lang, {
        typos: ex.type === 'write' && opts.typos,
        knownForms: lang === 'nl' ? knownDutchForms : undefined,
      });
      const meaning = ex.listen ? ex.sentence.de[0] : undefined;
      return { status: res.status, solution: res.best, meaning, canAppeal: !ex.listen };
    }
    case 'cloze': {
      const ok = r.kind === 'choice' && r.value === ex.cloze.answer;
      const full = ex.cloze.before + ex.cloze.answer + ex.cloze.after;
      return { status: ok ? 'correct' : 'wrong', solution: full, meaning: ex.cloze.de, canAppeal: false };
    }
    case 'article': {
      const ok = r.kind === 'choice' && r.value === ex.word.art;
      return { status: ok ? 'correct' : 'wrong', solution: `${ex.word.art} ${ex.word.nl}`, meaning: ex.word.de, canAppeal: false };
    }
    case 'conjugate': {
      const ok = r.kind === 'choice' && ex.answers.includes(r.value);
      const who = personLabel(ex.person).replace(' (Plural)', '');
      const sol = ex.tense === 'perf' ? `${who} ${ex.aux} ${ex.answers[0]}` : `${who} ${ex.answers.join(' / ')}`;
      return { status: ok ? 'correct' : 'wrong', solution: sol, meaning: `${ex.word.nl}: ${ex.word.de}`, canAppeal: false };
    }
    case 'plural': {
      const ok = r.kind === 'choice' && ex.answers.includes(r.value);
      return { status: ok ? 'correct' : 'wrong', solution: `de ${ex.answers.join(' / ')}`, meaning: `${nlLabel(ex.word)} → de ${ex.answers[0]}`, canAppeal: false };
    }
    case 'speak': {
      const heard = r.kind === 'speech' ? r.heard : [];
      const best = Math.max(0, ...heard.map((h) => speechScore(h, ex.text)));
      return { status: best >= 0.7 ? 'correct' : 'wrong', solution: ex.text, meaning: ex.de, canAppeal: false };
    }
  }
}
