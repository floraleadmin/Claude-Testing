// Assembles the whole course from the section files.
import type { Section, Unit, Word } from '../types';
import { buildLexicon } from '../lib/lexicon';
import { finishUnit, type UnitSpec } from './dsl';
import { BASE_WORDS } from './base';
import s1 from './units/s1';
import s2 from './units/s2';
import s3 from './units/s3';
import s4 from './units/s4';
import s5 from './units/s5';

interface SectionSpec {
  id: string;
  title: string;
  description: string;
  cefr: string;
  units: UnitSpec[];
}

const SECTIONS: SectionSpec[] = [
  { id: 's1', title: 'Erste Schritte', description: 'Begrüßen, vorstellen, Familie, Essen, Zahlen und die ersten Grammatikregeln.', cefr: 'A1', units: s1 },
  { id: 's2', title: 'Alltag', description: 'Zeit, Wohnung, Kleidung, Einkaufen, Stadt, Verkehr, Freizeit und Wetter.', cefr: 'A1', units: s2 },
  { id: 's3', title: 'Grammatik im Alltag', description: 'Modalverben, trennbare Verben, Pronomen, Verkleinerungen, Vergleiche, Restaurant und Arbeit.', cefr: 'A1–A2', units: s3 },
  { id: 's4', title: 'Vergangenheit und Zukunft', description: 'Perfekt, Imperfekt, Reisen, Gefühle, Nebensätze und Zukunft.', cefr: 'A2', units: s4 },
  { id: 's5', title: 'Mittelstufe', description: 'Relativsätze, Konjunktionen, Konditional, Passiv, Meinungen und Landeskunde.', cefr: 'A2–B1', units: s5 },
];

let index = 0;
export const course: Section[] = SECTIONS.filter((s) => s.units.length > 0).map((s, si) => ({
  id: s.id,
  index: si + 1,
  title: s.title,
  description: s.description,
  cefr: s.cefr,
  units: s.units.map((u) => finishUnit(u, ++index, s.id)),
}));

export const units: Unit[] = course.flatMap((s) => s.units);
export const unitById = new Map(units.map((u) => [u.id, u]));
export const sectionById = new Map(course.map((s) => [s.id, s]));

const baseWords: Word[] = BASE_WORDS.map((w) => ({ ...w, unit: '', core: false }));
export const words: Word[] = [...units.flatMap((u) => u.words), ...baseWords];
export const lexicon = buildLexicon(words);
export const coreWords: Word[] = words.filter((w) => w.core);
export const sentenceById = new Map(units.flatMap((u) => u.sentences).map((s) => [s.id, s]));
export const clozeById = new Map(units.flatMap((u) => u.cloze).map((c) => [c.id, c]));
