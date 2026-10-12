// Course content checks. Run: npm run check:content
// Exits 1 on any error. Warnings are printed but do not fail.
//
// 1. Every Dutch token has a dictionary hint (catches typos and missing words).
// 2. Dutch spelling against the OpenTaal Hunspell dictionary.
// 3. German spelling against the German Hunspell dictionary.
// 4. Grammar lints: de/het agreement, adjective -e, subject-verb agreement,
//    the jij-inversion rule, capitals and final punctuation.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { course, lexicon, units, words } from '../src/content/course';
import { hintsAt } from '../src/lib/lexicon';
import { lower, tokenize } from '../src/lib/text';
import type { Word } from '../src/types';

const here = dirname(fileURLToPath(import.meta.url));
const readList = (f: string) =>
  new Set(
    readFileSync(join(here, f), 'utf8')
      .split('\n')
      .map((l) => l.replace(/#.*/, '').trim())
      .filter(Boolean),
  );

const allowNl = readList('allow-nl.txt');
const allowDe = readList('allow-de.txt');

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const nameWords = new Set(words.filter((w) => w.pos === 'name').flatMap((w) => [w.nl, w.de]));

// ---------------------------------------------------------------- collect texts
interface Text {
  text: string;
  where: string;
  sentence: boolean; // a full sentence: capital + final punctuation expected
}
const dutch: Text[] = [];
const mustBeInvalid = new Map<string, string>();
const german: Text[] = [];
const germanProse: Text[] = []; // tips: Dutch inside emphasis is allowed

for (const s of course) {
  germanProse.push({ text: s.title, where: `${s.id} title`, sentence: false });
  germanProse.push({ text: s.description, where: `${s.id} description`, sentence: false });
}
for (const u of units) {
  germanProse.push({ text: u.title, where: `${u.id} title`, sentence: false });
  germanProse.push({ text: u.description, where: `${u.id} description`, sentence: false });
  for (const s of u.sentences) {
    s.nl.forEach((t, i) => dutch.push({ text: t, where: `${s.id} nl[${i}]`, sentence: true }));
    s.de.forEach((t, i) => german.push({ text: t, where: `${s.id} de[${i}]`, sentence: true }));
  }
  for (const c of u.cloze) {
    dutch.push({ text: c.before + c.answer + c.after, where: `${c.id}`, sentence: true });
    for (const o of c.options) {
      if (c.invalid?.includes(o)) mustBeInvalid.set(o, c.id);
      else dutch.push({ text: c.before + o + c.after, where: `${c.id} option "${o}"`, sentence: false });
    }
    german.push({ text: c.de, where: `${c.id} de`, sentence: true });
  }
  for (const t of u.tips) {
    germanProse.push({ text: t.title, where: `${u.id} tip title`, sentence: false });
    germanProse.push({ text: t.body, where: `${u.id} tip "${t.title}"`, sentence: false });
    for (const e of t.examples) {
      dutch.push({ text: e.nl, where: `${u.id} tip example`, sentence: true });
      german.push({ text: e.de, where: `${u.id} tip example`, sentence: true });
    }
  }
  if (u.story) {
    const st = u.story;
    dutch.push({ text: st.title, where: `${st.id} title`, sentence: false });
    german.push({ text: st.titleDe, where: `${st.id} titleDe`, sentence: false });
    for (const l of st.lines) {
      if (l.type === 'line') {
        dutch.push({ text: l.nl, where: `${st.id} line`, sentence: true });
        german.push({ text: l.de, where: `${st.id} line`, sentence: true });
      } else {
        german.push({ text: l.q, where: `${st.id} question`, sentence: true });
        l.options.forEach((o) => german.push({ text: o, where: `${st.id} option`, sentence: false }));
      }
    }
  }
}
for (const w of words) {
  // Text in parentheses may quote Dutch: "Geburtstag haben (jarig zijn)".
  german.push({ text: w.de.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim(), where: `word ${w.id}`, sentence: false });
  for (const m of w.de.matchAll(/\(([^)]*)\)/g)) germanProse.push({ text: `*${m[1]}*`, where: `word ${w.id}`, sentence: false });
}

// ---------------------------------------------------------------- 1. coverage
const isNumber = (t: string) => /^\d+([.,:]\d+)?$/.test(t);
const missing = new Map<string, string[]>();
for (const d of dutch) {
  const toks = tokenize(d.text);
  toks.forEach((t, i) => {
    if (isNumber(t)) return;
    if (hintsAt(lexicon, toks, i).length === 0) {
      const k = lower(t);
      missing.set(k, [...(missing.get(k) ?? []), d.where]);
    }
  });
}
for (const [t, where] of missing) err(`no dictionary entry for "${t}" (${where.slice(0, 3).join(', ')}${where.length > 3 ? ', …' : ''})`);

// ---------------------------------------------------------------- 2./3. spelling
// Tokens are collected here and checked in one batch by scripts/spell.py (Hunspell via spylls).
const spellNl = new Map<string, string>();
const spellDe = new Map<string, string>();
const spellEither = new Map<string, string>();
const skipNl = (t: string) => isNumber(t) || allowNl.has(t) || allowNl.has(lower(t)) || nameWords.has(t);
const skipDe = (t: string) =>
  !/\p{L}/u.test(t) || /^\d/.test(t) || allowDe.has(t) || nameWords.has(t) || (/s$/.test(t) && nameWords.has(t.slice(0, -1)));
// German compounds with a hyphen ("het-Wort") are checked part by part.
function addDe(t: string, where: string, either = false) {
  if (skipDe(t)) return;
  if (t.includes('-')) {
    for (const p of t.split('-')) if (p && !skipDe(p) && !skipNl(p)) spellEither.set(p, where);
    return;
  }
  (either ? spellEither : spellDe).set(t, where);
}

for (const d of dutch) for (const t of tokenize(d.text)) if (!skipNl(t)) spellNl.set(t, d.where);
for (const w of words) {
  // Proper nouns and adjectives (Duitsland, Nederlands) keep their capital.
  const cap = w.nl[0] !== lower(w.nl[0]);
  const items = w.pos === 'name' ? [w.nl] : [w.nl, ...w.forms.map((f) => (cap ? f[0].toLocaleUpperCase('nl') + f.slice(1) : f))];
  for (const f of items) for (const t of tokenize(f)) if (!skipNl(t)) spellNl.set(t, `word ${w.id}`);
}
for (const d of german) for (const t of tokenize(d.text)) addDe(t, d.where);
for (const d of germanProse) {
  // Emphasised parts (*…*, **…**), table rows and headings may be Dutch or German.
  const lines = d.text.split('\n');
  for (const line of lines) {
    if (/^\s*\|?\s*-{3}/.test(line)) continue;
    const table = line.trim().startsWith('|');
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/);
    for (const p of parts) {
      const emph = /^\*/.test(p);
      for (const t of tokenize(p.replace(/\*/g, ' ').replace(/\|/g, ' ').replace(/\//g, ' '))) {
        if (skipNl(t)) continue;
        addDe(t, d.where, emph || table || /title|description/.test(d.where));
      }
    }
  }
}

const spellResult = JSON.parse(
  execFileSync('python3', ['-I', join(here, 'spell.py')], {
    input: JSON.stringify({ nl: [...spellNl.keys(), ...mustBeInvalid.keys()], de: [...spellDe.keys()], either: [...spellEither.keys()] }),
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  }),
) as { nl: string[]; de: string[]; either: string[] };
for (const [t, where] of mustBeInvalid)
  if (!spellResult.nl.includes(t)) err(`Absichtlich falsche Option ist ein echtes Wort: "${t}" (${where})`);
for (const t of spellResult.nl) {
  if (mustBeInvalid.has(t)) continue;
  if (spellResult.nl.includes(t) && t !== lower(t) && !spellResult.nl.includes(lower(t)) && spellNl.has(lower(t))) continue;
  err(`Dutch spelling? "${t}" (${spellNl.get(t)})`);
}
for (const t of spellResult.de) err(`German spelling? "${t}" (${spellDe.get(t)})`);
for (const t of spellResult.either) err(`Spelling (NL/DE)? "${t}" (${spellEither.get(t)})`);

// ---------------------------------------------------------------- 4. grammar lints
const nouns = words.filter((w) => w.pos === 'noun');
const sgArt = new Map<string, Set<string>>();
const plural = new Set<string>();
for (const n of nouns) {
  if (n.pluralOnly) {
    plural.add(lower(n.nl));
    continue;
  }
  const k = lower(n.nl);
  sgArt.set(k, new Set([...(sgArt.get(k) ?? []), n.art!]));
  n.pl.forEach((p) => plural.add(lower(p)));
}
const adjs = words.filter((w) => w.pos === 'adj' && w.adj);
const adjBase = new Map<string, Word>();
const adjInfl = new Map<string, Word>();
for (const a of adjs) {
  adjBase.set(lower(a.nl), a);
  if (a.adj!.infl) adjInfl.set(lower(a.adj!.infl), a);
}
const isAdj = (t: string) => adjBase.has(t) || adjInfl.has(t);
const COPULA = new Set(['is', 'was', 'wordt', 'werd', 'blijft', 'bleef']);
const INTENS = new Set(['heel', 'erg', 'zeer', 'te', 'zo', 'nog', 'echt', 'best']);
const DE_DET = new Set(['de', 'deze', 'onze', 'elke', 'iedere', 'welke']);
const HET_DET = new Set(['het', 'dit', 'ons', 'elk', 'ieder', 'welk']);
const DEF_DET = new Set(['de', 'het', 'deze', 'dit', 'die', 'dat', 'mijn', 'jouw', 'je', 'zijn', 'haar', 'ons', 'onze', 'jullie', 'hun', 'uw', "z'n", "m'n", 'welke', 'elke', 'iedere']);
const INDEF_DET = new Set(['een', 'geen', 'elk', 'ieder', 'welk', "zo'n", 'veel', 'genoeg']);

const verbs = words.filter((w) => w.pos === 'verb' && w.verb);
const verbForm = new Set<string>();
const nounOrAdjForm = new Set<string>([...sgArt.keys(), ...plural, ...adjBase.keys(), ...adjInfl.keys()]);
for (const v of verbs) {
  const f = v.verb!;
  [...f.pres.ik, ...f.pres.jij, ...f.pres.hij, ...f.pres.pl, ...(f.past ? [...f.past.sg, ...f.past.pl] : []), ...(f.pp ?? [])].forEach((x) => verbForm.add(x));
}
function allowedFor(subject: string): Set<string> {
  const s = new Set<string>();
  for (const v of verbs) {
    const f = v.verb!;
    const pastSg = f.past?.sg ?? [];
    const pastPl = f.past?.pl ?? [];
    const pp = f.pp ?? [];
    const add = (xs: string[]) => xs.forEach((x) => s.add(x));
    if (subject === 'ik') add([...f.pres.ik, ...pastSg, ...pp]);
    if (subject === 'jij') add([...f.pres.jij, ...pastSg, ...pp]);
    if (subject === 'hij') add([...f.pres.hij, ...pastSg, ...pp]);
    if (subject === 'u') add([...f.pres.jij, ...f.pres.hij, ...pastSg, ...pp]);
    if (subject === 'pl') add([...f.pres.pl, ...pastPl, ...pp]);
  }
  return s;
}
const ALLOWED: Record<string, Set<string>> = {
  ik: allowedFor('ik'),
  jij: allowedFor('jij'),
  hij: allowedFor('hij'),
  wij: allowedFor('pl'),
  we: allowedFor('pl'),
  jullie: allowedFor('pl'),
};
const QWORDS = new Set(['wat', 'waar', 'wie', 'wanneer', 'waarom', 'hoe', 'hoeveel', 'welk', 'welke', 'waarheen']);
const jijT = new Set<string>();
for (const v of verbs) {
  const f = v.verb!;
  for (const x of f.pres.jij) if (!f.pres.ik.includes(x)) jijT.add(x);
}

// Sentences where a lint rule misreads the grammar (checked by hand).
const LINT_IGNORE = new Set([
  'Waar doet het pijn?', // "het" is the subject, "pijn doen" a fixed expression
  'Bitterballen zijn typisch Nederlands.', // "zijn" is the verb here, not the possessive
  'Als het mooi weer is, gaan we naar het strand.', // "het" is the subject (het is mooi weer)
]);
const lintSeen = new Set<string>(LINT_IGNORE);
for (const d of dutch.filter((x) => x.sentence)) {
  if (lintSeen.has(d.text)) continue;
  lintSeen.add(d.text);
  const toks = tokenize(d.text).map(lower);
  for (let i = 0; i < toks.length; i++) {
    const det = toks[i];
    if (!DEF_DET.has(det) && !INDEF_DET.has(det) && !DE_DET.has(det) && !HET_DET.has(det)) continue;
    // "Is het water warm?" vs "Vandaag is het maandag": after a form of zijn/worden "het" may be a pronoun.
    if (det === 'het' && i > 0 && COPULA.has(toks[i - 1])) continue;
    let j = i + 1;
    const adjsHere: string[] = [];
    while (j < toks.length && (INTENS.has(toks[j]) || (isAdj(toks[j]) && !sgArt.has(toks[j]) && !plural.has(toks[j])))) {
      if (isAdj(toks[j])) adjsHere.push(toks[j]);
      j++;
    }
    const noun = toks[j];
    if (!noun) continue;
    const arts = sgArt.get(noun);
    const isPl = plural.has(noun);
    if (!arts && !isPl) continue;
    const singularOnly = arts && !isPl;
    if (singularOnly && arts!.size === 1) {
      const art = [...arts!][0];
      if (DE_DET.has(det) && art === 'het') err(`"${det} ${noun}": ${noun} ist ein het-Wort (${d.where}: ${d.text})`);
      if (HET_DET.has(det) && art === 'de') err(`"${det} … ${noun}": ${noun} ist ein de-Wort (${d.where}: ${d.text})`);
    }
    if (HET_DET.has(det) && isPl && !arts) err(`"${det} ${noun}": Plural braucht deze/die/onze (${d.where})`);
    for (const a of adjsHere) {
      const entry = adjBase.get(a) ?? adjInfl.get(a)!;
      const infl = entry.adj!.infl;
      if (!infl || infl === entry.nl) continue;
      const inflected = a === lower(infl);
      const hetSg = !!singularOnly && arts!.size === 1 && arts!.has('het');
      const needsBase = INDEF_DET.has(det) && hetSg;
      if (needsBase && inflected) err(`Adjektiv "${a}" ohne -e nach "${det}" + het-Wort: ${d.text} (${d.where})`);
      if (!needsBase && !inflected && (DEF_DET.has(det) || INDEF_DET.has(det)))
        err(`Adjektiv "${a}" braucht -e: ${d.text} (${d.where})`);
    }
  }
  // Subject-verb agreement right after the subject pronoun.
  for (let i = 0; i < toks.length - 1; i++) {
    const s = toks[i];
    const allowed = ALLOWED[s];
    if (!allowed) continue;
    // After inversion ("Kan ik pinnen?") the next word is not the finite verb.
    if (i > 0 && verbForm.has(toks[i - 1])) continue;
    const v = toks[i + 1];
    if (!verbForm.has(v) || nounOrAdjForm.has(v)) continue;
    if (!allowed.has(v)) err(`Verbform "${s} ${v}" passt nicht: ${d.text} (${d.where})`);
  }
  // jij-inversion: "Werkt jij?" must be "Werk jij?"
  for (let i = 1; i < toks.length; i++) {
    if (toks[i] !== 'jij' && toks[i] !== 'je') continue;
    const v = toks[i - 1];
    const front = i - 1 === 0 || (i - 2 === 0 && QWORDS.has(toks[0]));
    if (front && jijT.has(v)) err(`t-Regel: "${v} ${toks[i]}" → ohne t (${d.where}: ${d.text})`);
  }
}

// Capitals and final punctuation.
function checkShape(t: Text, lang: 'nl' | 'de') {
  if (t.text !== t.text.trim() || /\s{2,}/.test(t.text)) err(`Leerzeichen: "${t.text}" (${t.where})`);
  if (/(^|\s)'(?!s\b|t\b|n\b)\p{L}/u.test(t.text)) err(`Einfaches Anführungszeichen als Zitat: "${t.text}" (${t.where})`);
  if (!t.sentence) return;
  const first = t.text.replace(/^'[stn] /, '').match(/\p{L}/u)?.[0];
  if (first && first !== first.toLocaleUpperCase(lang)) err(`Großbuchstabe am Satzanfang fehlt: "${t.text}" (${t.where})`);
  if (!/[.!?…]["”“]?$/.test(t.text)) err(`Satzzeichen am Ende fehlt: "${t.text}" (${t.where})`);
}
dutch.forEach((t) => checkShape(t, 'nl'));
german.forEach((t) => checkShape(t, 'de'));

// ---------------------------------------------------------------- structure
const ids = new Map<string, number>();
for (const w of words) ids.set(w.id, (ids.get(w.id) ?? 0) + 1);
for (const [id, n] of ids) if (n > 1) err(`word id "${id}" ${n}× vergeben`);

const coreNlPos = new Map<string, string>();
for (const w of words.filter((x) => x.core && x.id === x.nl)) {
  // Homonyms get an explicit id (dag-groet, over-tijd) and are allowed.
  const k = `${w.pos}:${lower(w.nl)}:${w.art ?? ''}`;
  if (coreNlPos.has(k)) err(`"${w.nl}" (${w.pos}) doppelt: ${coreNlPos.get(k)} und ${w.unit}`);
  coreNlPos.set(k, w.unit);
}

const nlCanon = new Map<string, string>();
for (const u of units)
  for (const s of u.sentences) {
    const k = lower(s.nl[0]);
    if (nlCanon.has(k)) warn(`Satz doppelt: "${s.nl[0]}" (${nlCanon.get(k)}, ${s.id})`);
    nlCanon.set(k, s.id);
  }

for (const u of units) {
  if (u.words.length < 8) warn(`${u.id}: nur ${u.words.length} Wörter`);
  if (u.sentences.length < 15) warn(`${u.id}: nur ${u.sentences.length} Sätze`);
  if (u.cloze.length < 5) warn(`${u.id}: nur ${u.cloze.length} Lückensätze`);
  for (const c of u.cloze) for (const o of c.options) if (!o.trim()) err(`${c.id}: leere Option`);
}

// Every taught word should appear in at least one sentence or gap text of its unit or later.
const usedForms = new Set<string>();
for (const d of dutch) for (const t of tokenize(d.text)) usedForms.add(lower(t));
const usedText = dutch.map((d) => lower(d.text)).join(' \n ');
for (const w of words.filter((x) => x.core)) {
  const forms = w.forms;
  const multi = forms.some((f) => f.includes(' '));
  const used = multi ? forms.some((f) => usedText.includes(f)) : forms.some((f) => usedForms.has(f));
  if (!used) warn(`Wort nie in einem Satz: ${w.nl} (${w.unit})`);
}

// Vocabulary order: words used before the unit that teaches them.
const unitIndex = new Map(units.map((u) => [u.id, u.index]));
const early = new Map<string, Set<string>>();
for (const u of units) {
  const texts = [...u.sentences.flatMap((s) => s.nl.slice(0, 1)), ...u.cloze.map((c) => c.before + c.answer + c.after)];
  for (const text of texts) {
    const toks = tokenize(text);
    toks.forEach((t, i) => {
      const hs = hintsAt(lexicon, toks, i);
      if (!hs.length) return;
      const entries = lexicon.byForm.get(lower(t)) ?? [];
      const phraseHit = lexicon.phrases.some((p) => p.tokens.includes(lower(t)) && (unitIndex.get(p.word.unit) ?? 0) <= u.index && lower(text).includes(p.tokens.join(' ')));
      if (phraseHit) return;
      if (entries.some((e) => !e.core || (unitIndex.get(e.unit) ?? 0) <= u.index)) return;
      const k = `${lower(t)} → ${entries.map((e) => e.unit).join('/')}`;
      early.set(k, new Set([...(early.get(k) ?? []), u.id]));
    });
  }
}
for (const [k, us] of early) warn(`Vorgriff: ${k} benutzt in ${[...us].join(', ')}`);

// ---------------------------------------------------------------- report
const totals = {
  units: units.length,
  words: words.filter((w) => w.core).length,
  sentences: units.reduce((n, u) => n + u.sentences.length, 0),
  cloze: units.reduce((n, u) => n + u.cloze.length, 0),
  stories: units.filter((u) => u.story).length,
  tips: units.reduce((n, u) => n + u.tips.length, 0),
};
console.log(`Kurs: ${JSON.stringify(totals)}`);
if (warnings.length) {
  console.log(`\n${warnings.length} Hinweise:`);
  for (const w of warnings) console.log('  - ' + w);
}
if (errors.length) {
  console.log(`\n${errors.length} FEHLER:`);
  for (const e of errors) console.log('  ✗ ' + e);
  process.exit(1);
}
console.log('\nAlle Inhaltsprüfungen bestanden.');
