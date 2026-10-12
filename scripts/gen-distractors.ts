// Generates wrong plural forms for the plural exercise. Every candidate is
// checked with the Dutch Hunspell dictionary and dropped if it is a real
// word, so a "wrong" option can never be a valid plural.
// Run: npm run gen   (needs: pip install spylls)
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { words } from '../src/content/course';

const here = dirname(fileURLToPath(import.meta.url));
/** Plausible wrong plurals: the typical mistakes learners make. */
function candidates(sg: string): string[] {
  const last = sg[sg.length - 1];
  const out = [sg + 's', sg + 'en'];
  if (/[^aeiou]$/.test(sg)) out.push(sg + last + 'en');
  if (/[aeiouy]$/.test(sg)) out.push(sg + 's', sg + "'s", sg + 'en');
  // Nouns on -e often allow both -s and -n, so only clearly wrong forms are offered.
  if (/e$/.test(sg)) out.push(sg + 'en', sg + "'s");
  if (/f$/.test(sg)) out.push(sg.slice(0, -1) + 'ven', sg + 'fen');
  if (/s$/.test(sg)) out.push(sg.slice(0, -1) + 'zen', sg + 'sen');
  const long = /(aa|ee|oo|uu)([^aeiou]+)$/.exec(sg);
  if (long) out.push(sg.slice(0, long.index) + long[1][0] + long[2] + 'en');
  const short = /[^aeiou]([aeiou])([^aeiou])$/.exec(sg);
  if (short) out.push(sg.slice(0, -1) + short[1] + short[2] + 'en');
  return out;
}

const nouns = words.filter((w) => w.pos === 'noun' && w.core && w.pl.length);
const plan = nouns.map((w) => {
  const valid = new Set([w.nl, ...w.pl].map((x) => x.toLowerCase()));
  // Keep the original case: "duitsers" is wrong only because "Duitsers" is right.
  const cands = [...new Set(candidates(w.nl))].filter((c) => !valid.has(c.toLowerCase()));
  return { id: w.id, cands };
});

const all = [...new Set(plan.flatMap((p) => p.cands))];
const res = JSON.parse(
  execFileSync('python3', ['-I', join(here, 'spell.py')], { input: JSON.stringify({ nl: all }), encoding: 'utf8', maxBuffer: 64 << 20 }),
) as { nl: string[] };
const invalid = new Set(res.nl);

const out: Record<string, string[]> = {};
for (const p of plan) {
  const ok = p.cands.filter((c) => invalid.has(c)).slice(0, 3);
  if (ok.length >= 2) out[p.id] = ok;
}
const target = join(here, '..', 'src', 'content', 'generated', 'plural-distractors.json');
writeFileSync(target, JSON.stringify(out, null, 1) + '\n');
console.log(`plural distractors: ${Object.keys(out).length} of ${nouns.length} nouns`);
