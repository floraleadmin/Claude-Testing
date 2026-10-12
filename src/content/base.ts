// Glossary-only entries: names and words that appear in sentences but are
// not taught on their own. They give hints and pass the spelling checks.
import { W, type WordSpec } from './dsl';

const name = (nl: string, de = nl) => W(nl, de, 'name', { core: false });

export const BASE_WORDS: WordSpec[] = [
  // People
  ...['Anna', 'Tom', 'Lisa', 'Daan', 'Emma', 'Sem', 'Lotte', 'Bram', 'Sophie', 'Lucas', 'Mila', 'Jan', 'Fleur', 'Pieter', 'Peter', 'Max', 'Jansen', 'Vries'].map((n) =>
    name(n),
  ),
  // Places
  name('Amsterdam'),
  name('Berlijn', 'Berlin'),
  name('Utrecht'),
  name('Gent'),
  name('Keulen', 'Köln'),
  // Words used in alternatives only
  W('heen', 'hin', 'adv', { core: false }),
  W('dank', 'Dank (in: dank je)', 'interj', { core: false }),
];
