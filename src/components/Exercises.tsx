// One component per exercise type. Each reports the learner's current
// response with onChange; the session player checks it.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import type { Exercise } from '../lib/exercises';
import { nlLabel, personLabel } from '../lib/exercises';
import type { Response, Verdict } from '../lib/evaluate';
import { listenOnce, type Listening } from '../lib/speech';
import { HintText, SpeakButtons } from './common';
import { useApp } from '../state';
import { makeRng, shuffle } from '../lib/rng';

export interface ExProps<T extends Exercise['type']> {
  ex: Extract<Exercise, { type: T }>;
  locked: boolean;
  verdict: Verdict | null;
  onChange: (r: Response | null) => void;
  onSubmit: () => void;
}

/** Digits 1–9 pick options when no text field has focus. */
function useNumberKeys(count: number, onPick: (i: number) => void, enabled: boolean) {
  const cb = useRef(onPick);
  cb.current = onPick;
  useEffect(() => {
    if (!enabled) return;
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT' || e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= Math.min(9, count)) {
        e.preventDefault();
        cb.current(n - 1);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [count, enabled]);
}

function Title({ children, isNew }: { children: React.ReactNode; isNew?: boolean }) {
  return (
    <div className="stack" style={{ gap: 8 }}>
      {isNew && <span className="badge-new">Neues Wort</span>}
      <h1 className="ex-title">{children}</h1>
    </div>
  );
}

function choiceClass(value: string, selected: string | null, correct: string[], verdict: Verdict | null): string {
  if (!verdict) return '';
  if (correct.includes(value)) return value === selected || verdict.status === 'wrong' ? 'right' : '';
  if (value === selected) return 'wrong';
  return '';
}

// ------------------------------------------------------------------ pick

export function PickEx({ ex, locked, verdict, onChange }: ExProps<'pick'>) {
  const { say } = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const choose = (i: number) => {
    if (locked) return;
    const w = ex.options[i];
    setSel(w.id);
    say(nlLabel(w));
    onChange({ kind: 'choice', value: w.id });
  };
  useNumberKeys(ex.options.length, choose, !locked);
  return (
    <>
      <Title isNew={ex.isNew}>Welches Bild ist „{ex.word.de}“?</Title>
      <div className="choices grid" role="radiogroup" aria-label="Antworten">
        {ex.options.map((w, i) => (
          <button
            key={w.id}
            type="button"
            role="radio"
            aria-checked={sel === w.id}
            className={`choice picture ${choiceClass(w.id, sel, [ex.word.id], verdict)}`}
            onClick={() => choose(i)}
            disabled={locked}
          >
            <span className="emoji" aria-hidden="true">
              {w.emoji}
            </span>
            <span>{nlLabel(w)}</span>
            <span className="key" aria-hidden="true">
              {i + 1}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// ------------------------------------------------------------------ meaning

export function MeaningEx({ ex, locked, verdict, onChange }: ExProps<'meaning'>) {
  const { say, progress } = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const label = nlLabel(ex.word);
  useEffect(() => {
    if (ex.dir === 'nl-de' && progress.settings.autoplay) say(label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.key]);
  const choose = (i: number) => {
    if (locked) return;
    const o = ex.options[i];
    setSel(o);
    if (ex.dir === 'de-nl') say(o);
    onChange({ kind: 'choice', value: o });
  };
  useNumberKeys(ex.options.length, choose, !locked);
  return (
    <>
      <Title isNew={ex.isNew}>{ex.dir === 'nl-de' ? 'Was bedeutet das?' : `Wie sagt man „${ex.word.de}“?`}</Title>
      {ex.dir === 'nl-de' && (
        <div className="prompt" style={{ alignItems: 'center' }}>
          <SpeakButtons text={label} />
          <div className="big-word" style={{ textAlign: 'left' }}>
            {label}
          </div>
        </div>
      )}
      <div className="choices" role="radiogroup" aria-label="Antworten">
        {ex.options.map((o, i) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={sel === o}
            className={`choice ${choiceClass(o, sel, [ex.answer], verdict)}`}
            onClick={() => choose(i)}
            disabled={locked}
          >
            <span className="key" aria-hidden="true">
              {i + 1}
            </span>
            <span>{o}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ------------------------------------------------------------------ match pairs

export function MatchEx({ ex, locked, onChange }: ExProps<'match'>) {
  const { say, play } = useApp();
  const order = useMemo(() => {
    const rng = makeRng(ex.key);
    return { left: shuffle(ex.pairs, rng), right: shuffle(ex.pairs, rng) };
  }, [ex.key, ex.pairs]);
  const [left, setLeft] = useState<string | null>(null);
  const [right, setRight] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [bad, setBad] = useState<string | null>(null);

  useEffect(() => {
    if (!left || !right) return;
    if (left === right) {
      const next = [...done, left];
      setDone(next);
      play('tap');
      if (next.length === ex.pairs.length) onChange({ kind: 'done' });
    } else {
      setBad(`${left}|${right}`);
      play('wrong');
      setTimeout(() => setBad(null), 400);
    }
    setLeft(null);
    setRight(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, right]);

  const all = [...order.left.map((p) => ({ side: 'l' as const, p })), ...order.right.map((p) => ({ side: 'r' as const, p }))];
  useNumberKeys(Math.min(9, all.length), (i) => tap(all[i].side, all[i].p.id, all[i].p.nl), !locked);

  function tap(side: 'l' | 'r', id: string, nl: string) {
    if (locked || done.includes(id)) return;
    if (side === 'l') {
      say(nl);
      setLeft(left === id ? null : id);
    } else setRight(right === id ? null : id);
  }

  const cls = (side: 'l' | 'r', id: string) => {
    if (done.includes(id)) return 'done';
    if (bad && ((side === 'l' && bad.startsWith(id + '|')) || (side === 'r' && bad.endsWith('|' + id)))) return 'wrong shake';
    return '';
  };
  let n = 0;
  return (
    <>
      <Title>Finde die Paare</Title>
      <div className="pairs">
        <div className="col">
          {order.left.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`choice ${cls('l', p.id)}`}
              aria-pressed={left === p.id}
              onClick={() => tap('l', p.id, p.nl)}
              disabled={locked || done.includes(p.id)}
              lang="nl"
            >
              <span className="key" aria-hidden="true">
                {++n}
              </span>
              {p.nl}
            </button>
          ))}
        </div>
        <div className="col">
          {order.right.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`choice ${cls('r', p.id)}`}
              aria-pressed={right === p.id}
              onClick={() => tap('r', p.id, p.nl)}
              disabled={locked || done.includes(p.id)}
            >
              {n < 9 && (
                <span className="key" aria-hidden="true">
                  {++n}
                </span>
              )}
              {p.de}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ------------------------------------------------------------------ prompt helpers

function SentencePrompt({ text, lang }: { text: string; lang: 'nl' | 'de' }) {
  return (
    <div className="prompt">
      {lang === 'nl' && <SpeakButtons text={text} />}
      <div className="speech" lang={lang}>
        <HintText text={text} lang={lang} />
      </div>
    </div>
  );
}

function ListenPrompt({ text }: { text: string }) {
  const { say } = useApp();
  return (
    <div className="listen-big">
      <button type="button" className="speak-btn" onClick={() => say(text)} aria-label="Anhören">
        <Volume2 size={44} />
      </button>
      <button type="button" className="speak-btn slow" onClick={() => say(text, true)} aria-label="Langsam anhören">
        <span style={{ fontSize: 26 }} aria-hidden="true">
          🐢
        </span>
      </button>
    </div>
  );
}

function useAutoplay(text: string, key: string, on: boolean) {
  const { say, progress } = useApp();
  useEffect(() => {
    if (on && progress.settings.autoplay) {
      const t = setTimeout(() => say(text), 250);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

// ------------------------------------------------------------------ word bank

export function BuildEx({ ex, locked, onChange }: ExProps<'build'>) {
  const { say } = useApp();
  const [picked, setPicked] = useState<number[]>([]);
  const promptNl = ex.dir === 'nl-de' || ex.listen;
  useAutoplay(ex.prompt, ex.key, promptNl);

  useEffect(() => {
    onChange(picked.length ? { kind: 'text', value: picked.map((i) => ex.tiles[i]).join(' ') } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  const add = (i: number) => {
    if (locked || picked.includes(i)) return;
    if (ex.dir === 'de-nl' || ex.listen) say(ex.tiles[i]);
    setPicked([...picked, i]);
  };
  const remove = (i: number) => !locked && setPicked(picked.filter((x) => x !== i));
  useNumberKeys(ex.tiles.length, add, !locked);
  useEffect(() => {
    if (locked) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && (e.target as HTMLElement).tagName !== 'TEXTAREA') setPicked((p) => p.slice(0, -1));
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [locked]);

  return (
    <>
      <Title>{ex.listen ? 'Was hörst du?' : ex.dir === 'nl-de' ? 'Übersetze ins Deutsche' : 'Übersetze ins Niederländische'}</Title>
      {ex.listen ? <ListenPrompt text={ex.prompt} /> : <SentencePrompt text={ex.prompt} lang={ex.dir === 'nl-de' ? 'nl' : 'de'} />}
      <div className="answer-line" aria-label="Deine Antwort" lang={ex.dir === 'nl-de' && !ex.listen ? 'de' : 'nl'}>
        {picked.map((i) => (
          <button key={i} type="button" className="tile" onClick={() => remove(i)} disabled={locked}>
            {ex.tiles[i]}
          </button>
        ))}
      </div>
      <div className="bank" aria-label="Wörter" lang={ex.dir === 'nl-de' && !ex.listen ? 'de' : 'nl'}>
        {ex.tiles.map((t, i) => (
          <button
            key={i}
            type="button"
            className={`tile ${picked.includes(i) ? 'used' : ''}`}
            onClick={() => add(i)}
            disabled={locked || picked.includes(i)}
            aria-hidden={picked.includes(i)}
            tabIndex={picked.includes(i) ? -1 : 0}
          >
            {t}
          </button>
        ))}
      </div>
    </>
  );
}

// ------------------------------------------------------------------ typing

const SPECIAL = ['é', 'ë', 'è', 'ï', 'ö', 'ü', "'"];

export function WriteEx({ ex, locked, onChange, onSubmit }: ExProps<'write'>) {
  const [text, setText] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const answerNl = ex.dir === 'de-nl' || ex.listen;
  useAutoplay(ex.prompt, ex.key, ex.dir === 'nl-de');
  useEffect(() => {
    setText('');
    setTimeout(() => ref.current?.focus(), 50);
  }, [ex.key]);
  const update = (v: string) => {
    setText(v);
    onChange(v.trim() ? { kind: 'text', value: v } : null);
  };
  const insert = (ch: string) => {
    const el = ref.current;
    if (!el) return update(text + ch);
    const s = el.selectionStart ?? text.length;
    const e = el.selectionEnd ?? text.length;
    const v = text.slice(0, s) + ch + text.slice(e);
    update(v);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + ch.length, s + ch.length);
    });
  };
  return (
    <>
      <Title>{ex.listen ? 'Schreib, was du hörst' : answerNl ? 'Schreib auf Niederländisch' : 'Schreib auf Deutsch'}</Title>
      {ex.listen ? <ListenPrompt text={ex.prompt} /> : <SentencePrompt text={ex.prompt} lang={ex.dir === 'nl-de' ? 'nl' : 'de'} />}
      <label className="visually-hidden" htmlFor={`w-${ex.key}`}>
        Deine Antwort
      </label>
      <textarea
        id={`w-${ex.key}`}
        ref={ref}
        className="write"
        lang={answerNl ? 'nl' : 'de'}
        value={text}
        disabled={locked}
        autoCapitalize="sentences"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={answerNl ? 'Auf Niederländisch …' : 'Auf Deutsch …'}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      {answerNl && !locked && (
        <div className="special-chars" aria-label="Sonderzeichen">
          {SPECIAL.map((c) => (
            <button key={c} type="button" onClick={() => insert(c)} aria-label={`${c} einfügen`}>
              {c}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ------------------------------------------------------------------ simple choices

function OptionList({ options, correct, verdict, locked, onPick, sayOptions }: { options: string[]; correct: string[]; verdict: Verdict | null; locked: boolean; onPick: (o: string) => void; sayOptions?: boolean }) {
  const { say } = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const choose = (i: number) => {
    if (locked) return;
    setSel(options[i]);
    if (sayOptions) say(options[i]);
    onPick(options[i]);
  };
  useNumberKeys(options.length, choose, !locked);
  return (
    <div className="choices" role="radiogroup" aria-label="Antworten">
      {options.map((o, i) => (
        <button key={o} type="button" role="radio" aria-checked={sel === o} className={`choice ${choiceClass(o, sel, correct, verdict)}`} onClick={() => choose(i)} disabled={locked} lang="nl">
          <span className="key" aria-hidden="true">
            {i + 1}
          </span>
          <span>{o}</span>
        </button>
      ))}
    </div>
  );
}

export function ClozeEx({ ex, locked, verdict, onChange }: ExProps<'cloze'>) {
  const [sel, setSel] = useState<string | null>(null);
  const c = ex.cloze;
  return (
    <>
      <Title>Ergänze den Satz</Title>
      <div className="speech cloze-text" lang="nl">
        {c.before}
        <span className="gap">{sel ?? ' '}</span>
        {c.after}
      </div>
      <p className="muted">„{c.de}“</p>
      <OptionList
        options={ex.options}
        correct={[c.answer]}
        verdict={verdict}
        locked={locked}
        onPick={(o) => {
          setSel(o);
          onChange({ kind: 'choice', value: o });
        }}
      />
    </>
  );
}

export function ArticleEx({ ex, locked, verdict, onChange }: ExProps<'article'>) {
  const { say } = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const opts = ['de', 'het'];
  const choose = (i: number) => {
    if (locked) return;
    setSel(opts[i]);
    say(`${opts[i]} ${ex.word.nl}`);
    onChange({ kind: 'choice', value: opts[i] });
  };
  useNumberKeys(2, choose, !locked);
  return (
    <>
      <Title>de oder het?</Title>
      <div className="big-word" lang="nl">
        ___ {ex.word.nl}
      </div>
      <p className="muted" style={{ textAlign: 'center' }}>
        {ex.word.de}
      </p>
      <div className="article-choices" role="radiogroup" aria-label="Artikel">
        {opts.map((o, i) => (
          <button key={o} type="button" role="radio" aria-checked={sel === o} className={`choice ${choiceClass(o, sel, [ex.word.art!], verdict)}`} onClick={() => choose(i)} disabled={locked}>
            {o}
          </button>
        ))}
      </div>
    </>
  );
}

const TENSE_LABEL = { pres: 'Präsens', past: 'Imperfekt', perf: 'Perfekt (Partizip)' } as const;

export function ConjugateEx({ ex, locked, verdict, onChange }: ExProps<'conjugate'>) {
  const [sel, setSel] = useState<string | null>(null);
  const who = personLabel(ex.person);
  return (
    <>
      <Title>Konjugiere: {TENSE_LABEL[ex.tense]}</Title>
      <p className="muted">
        <b lang="nl">{ex.word.nl}</b> – {ex.word.de}
      </p>
      <div className="speech cloze-text" lang="nl">
        {who} {ex.aux ? `${ex.aux} ` : ''}
        <span className="gap">{sel ?? ' '}</span>
      </div>
      <OptionList
        options={ex.options}
        correct={ex.answers}
        verdict={verdict}
        locked={locked}
        sayOptions
        onPick={(o) => {
          setSel(o);
          onChange({ kind: 'choice', value: o });
        }}
      />
    </>
  );
}

export function PluralEx({ ex, locked, verdict, onChange }: ExProps<'plural'>) {
  return (
    <>
      <Title>Wie lautet der Plural?</Title>
      <div className="big-word" lang="nl">
        {nlLabel(ex.word)}
      </div>
      <p className="muted" style={{ textAlign: 'center' }}>
        {ex.word.de}
      </p>
      <OptionList options={ex.options} correct={ex.answers} verdict={verdict} locked={locked} sayOptions onPick={(o) => onChange({ kind: 'choice', value: o })} />
    </>
  );
}

// ------------------------------------------------------------------ speaking

export function SpeakEx({ ex, locked, onChange, onSubmit }: ExProps<'speak'>) {
  const [state, setState] = useState<'idle' | 'listening' | 'error'>('idle');
  const [error, setError] = useState('');
  const rec = useRef<Listening | null>(null);
  useEffect(() => () => rec.current?.stop(), []);
  const start = () => {
    setState('listening');
    rec.current = listenOnce(
      (alts) => {
        setState('idle');
        onChange({ kind: 'speech', heard: alts });
        setTimeout(onSubmit, 0);
      },
      (code) => {
        setState('error');
        setError(
          code === 'not-allowed' || code === 'service-not-allowed'
            ? 'Das Mikrofon ist hier nicht erlaubt. Überspring die Aufgabe; in den Einstellungen kannst du Sprechübungen ausschalten.'
            : code === 'no-speech'
              ? 'Ich habe nichts gehört. Versuch es noch einmal.'
              : 'Die Spracherkennung funktioniert gerade nicht. Überspring die Aufgabe.',
        );
      },
    );
  };
  return (
    <>
      <Title>Sprich diesen Satz</Title>
      <div className="prompt">
        <SpeakButtons text={ex.text} />
        <div className="speech" lang="nl">
          <HintText text={ex.text} lang="nl" />
        </div>
      </div>
      <div className={`mic ${state === 'listening' ? 'listening' : ''}`}>
        <button type="button" className="btn delft" onClick={start} disabled={locked || state === 'listening'}>
          <Mic size={22} /> {state === 'listening' ? 'Ich höre zu …' : 'Zum Sprechen tippen'}
        </button>
        {state === 'error' && <p className="notice">{error}</p>}
      </div>
    </>
  );
}

export function ExerciseView(props: { ex: Exercise; locked: boolean; verdict: Verdict | null; onChange: (r: Response | null) => void; onSubmit: () => void }) {
  const { ex } = props;
  switch (ex.type) {
    case 'pick':
      return <PickEx {...(props as unknown as ExProps<'pick'>)} />;
    case 'meaning':
      return <MeaningEx {...(props as unknown as ExProps<'meaning'>)} />;
    case 'match':
      return <MatchEx {...(props as unknown as ExProps<'match'>)} />;
    case 'build':
      return <BuildEx {...(props as unknown as ExProps<'build'>)} />;
    case 'write':
      return <WriteEx {...(props as unknown as ExProps<'write'>)} />;
    case 'cloze':
      return <ClozeEx {...(props as unknown as ExProps<'cloze'>)} />;
    case 'article':
      return <ArticleEx {...(props as unknown as ExProps<'article'>)} />;
    case 'conjugate':
      return <ConjugateEx {...(props as unknown as ExProps<'conjugate'>)} />;
    case 'plural':
      return <PluralEx {...(props as unknown as ExProps<'plural'>)} />;
    case 'speak':
      return <SpeakEx {...(props as unknown as ExProps<'speak'>)} />;
  }
}
