import { describe, expect, it } from 'vitest';
import { checkText, speechScore } from '../src/lib/answer';
import { knownDutchForms } from '../src/lib/exercises';

const nl = (input: string, answers: string[], typos = true) => checkText(input, answers, 'nl', { typos, knownForms: knownDutchForms }).status;
const de = (input: string, answers: string[], typos = true) => checkText(input, answers, 'de', { typos }).status;

describe('checkText', () => {
  it('ignores case, punctuation and spacing', () => {
    expect(nl('hoe  heet je', ['Hoe heet je?'])).toBe('correct');
    expect(de('wie heißt du', ['Wie heißt du?'])).toBe('correct');
  });
  it('treats stressed and unstressed pronouns alike', () => {
    expect(nl('Hoe heet jij?', ['Hoe heet je?'])).toBe('correct');
    expect(nl('Goed, en met je?', ['Goed, en met jou?'])).toBe('correct');
    expect(nl('Wij hebben een hond.', ['We hebben een hond.'])).toBe('correct');
    expect(nl("Dat is m'n fiets.", ['Dat is mijn fiets.'])).toBe('correct');
  });
  it('accepts curly apostrophes', () => {
    expect(nl('Ik heb veel foto’s.', ["Ik heb veel foto's."])).toBe('correct');
  });
  it('accepts missing accents with a note', () => {
    expect(nl('De baby is een jaar oud.', ['De baby is één jaar oud.'])).toBe('accent');
  });
  it('accepts a real typo but not another word form', () => {
    expect(nl('Ik spreek een beetje Nederlnds.', ['Ik spreek een beetje Nederlands.'])).toBe('typo');
    expect(nl('Hij werk hier.', ['Hij werkt hier.'])).toBe('wrong');
    expect(nl('Ik heb een broeer.', ['Ik heb een broer.'])).toBe('typo');
    expect(nl('Ik heb een kot.', ['Ik heb een kat.'])).toBe('wrong'); // too short for typo tolerance
  });
  it('does not allow typos in tile answers', () => {
    expect(nl('Ik spreek een beetje Nederlnds.', ['Ik spreek een beetje Nederlands.'], false)).toBe('wrong');
  });
  it('accepts ss for ß in German', () => {
    expect(de('Wie heisst du?', ['Wie heißt du?'])).toBe('correct');
  });
  it('accepts any listed alternative and reports the closest solution', () => {
    const r = checkText('Wo kommst du her?', ['Woher kommst du?', 'Wo kommst du her?'], 'de', { typos: false });
    expect(r.status).toBe('correct');
    const w = checkText('Woher kommt du?', ['Woher kommst du?', 'Wo kommst du her?'], 'de', { typos: false });
    expect(w.status).toBe('wrong');
    expect(w.best).toBe('Woher kommst du?');
  });
  it('rejects empty and different answers', () => {
    expect(nl('', ['Ik ben Anna.'])).toBe('wrong');
    expect(nl('Ik ben Tom.', ['Ik ben Anna.'])).toBe('wrong');
  });
});

describe('speechScore', () => {
  it('scores words heard in order and reads digits', () => {
    expect(speechScore('ik ben twintig jaar oud', 'Ik ben twintig jaar oud.')).toBe(1);
    expect(speechScore('ik ben 20 jaar oud', 'Ik ben twintig jaar oud.')).toBe(1);
    expect(speechScore('ik ben oud', 'Ik ben twintig jaar oud.')).toBeCloseTo(0.6);
  });
});
