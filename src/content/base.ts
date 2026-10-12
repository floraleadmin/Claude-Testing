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
  name('Zwolle'),
  name('Lindestraat'),
  // Words used in alternatives only
  W('heen', 'hin', 'adv', { core: false }),
  W('dank', 'Dank (in: dank je)', 'interj', { core: false }),
  W('wauw', 'wow', 'interj', { core: false }),
  W('ah', 'ah', 'interj', { core: false }),
  ...numberWords(),
];

/** Glossary entries for the numbers 21–99 and the hundreds, Dutch and German. */
function numberWords(): WordSpec[] {
  const nlUnits = ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'];
  const deUnits = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
  const nlTens = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
  const deTens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
  const out: WordSpec[] = [];
  for (let t = 2; t <= 9; t++)
    for (let u = 1; u <= 9; u++) {
      const nl = nlUnits[u] + (/e$/.test(nlUnits[u]) ? 'ën' : 'en') + nlTens[t];
      out.push(W(nl, deUnits[u] + 'und' + deTens[t], 'num', { core: false }));
    }
  const deHundreds = ['', 'hundert', 'zweihundert', 'dreihundert', 'vierhundert', 'fünfhundert', 'sechshundert', 'siebenhundert', 'achthundert', 'neunhundert'];
  for (let h = 2; h <= 9; h++) out.push(W(nlUnits[h] + 'honderd', deHundreds[h], 'num', { core: false }));
  out.push(W('tweeduizend', 'zweitausend', 'num', { core: false }));
  for (const [nl, de] of [['zesde', 'sechste'], ['zevende', 'siebte'], ['achtste', 'achte'], ['negende', 'neunte'], ['tiende', 'zehnte'], ['twintigste', 'zwanzigste'], ['laatste', 'letzte']])
    out.push(W(nl, de, 'num', { core: false, id: 'ord-' + nl }));
  return out;
}
