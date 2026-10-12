// Course content model. Everything a learner sees comes from these types.

export type Pos =
  | 'noun'
  | 'verb'
  | 'adj'
  | 'adv'
  | 'pron'
  | 'prep'
  | 'conj'
  | 'num'
  | 'det'
  | 'interj'
  | 'phrase'
  | 'name'
  | 'part';

export type Person = 'ik' | 'jij' | 'hij' | 'wij' | 'jullie' | 'zij';

export interface VerbForms {
  /** Present tense, each slot may hold alternatives (e.g. "kunt" / "kan"). */
  pres: { ik: string[]; jij: string[]; hij: string[]; pl: string[] };
  past: { sg: string[]; pl: string[] } | null;
  /** Past participle(s); null when the course never drills it. */
  pp: string[] | null;
  aux: 'hebben' | 'zijn' | 'hebben/zijn' | null;
  /** Separable prefix ("op" in opstaan). */
  sep?: string;
  /** Reflexive ("zich wassen"). */
  refl?: boolean;
  /** Base verb without "zich" and prefix, e.g. "staan" for opstaan. */
  base: string;
}

export interface Word {
  id: string;
  /** Lemma without article ("appel", "werken", "dank je wel"). */
  nl: string;
  /** German meaning as shown to the learner ("der Apfel", "arbeiten"). */
  de: string;
  pos: Pos;
  art?: 'de' | 'het';
  /** Plural forms, first is the usual one. Empty when the noun has no plural we teach. */
  pl: string[];
  pluralOnly?: boolean;
  emoji?: string;
  verb?: VerbForms;
  adj?: { infl: string | null; comp: string | null; sup: string | null };
  /** Every written form of the word, lowercase, used for hints and checks. */
  forms: string[];
  /** Unit that teaches the word; '' for glossary-only entries. */
  unit: string;
  /** Taught words show up in exercises and the word list. */
  core: boolean;
  note?: string;
}

export interface Sentence {
  id: string;
  /** Dutch versions; [0] is the canonical one, the rest are accepted alternatives. */
  nl: string[];
  /** German versions; [0] is canonical. */
  de: string[];
  unit: string;
}

export interface Cloze {
  id: string;
  /** Text before and after the gap. */
  before: string;
  after: string;
  answer: string;
  options: string[];
  /** German translation of the full sentence. */
  de: string;
  unit: string;
}

export interface Tip {
  title: string;
  /** Light markup: paragraphs, **bold**, *italic*, "- " bullets, "|" tables. */
  body: string;
  examples: { nl: string; de: string }[];
}

export type StoryLine =
  | { type: 'line'; speaker: string; nl: string; de: string }
  | { type: 'question'; q: string; options: string[]; answer: number };

export interface Story {
  id: string;
  title: string;
  titleDe: string;
  unit: string;
  lines: StoryLine[];
}

export interface Unit {
  id: string;
  /** 1-based position in the whole course. */
  index: number;
  sectionId: string;
  title: string;
  description: string;
  tips: Tip[];
  words: Word[];
  sentences: Sentence[];
  cloze: Cloze[];
  story?: Story;
}

export interface Section {
  id: string;
  index: number;
  title: string;
  description: string;
  cefr: string;
  units: Unit[];
}

export type NodeKind = 'lesson' | 'story' | 'test';

export interface PathNode {
  id: string;
  kind: NodeKind;
  unitId: string;
  /** Lesson number within the unit (1-based), 0 for story and test. */
  lesson: number;
  /** Words introduced by this node (lessons only). */
  newWords: string[];
  /** Sentences practised first in this node. */
  sentences: string[];
}
