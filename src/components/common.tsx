// Small shared building blocks.
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Snail, Volume2, VolumeX } from 'lucide-react';
import { hintsAt, reverseHints } from '../lib/lexicon';
import { lexicon } from '../content/course';
import { tokenize } from '../lib/text';
import { dutchAudio, onVoicesChanged, VOICE_HELP } from '../lib/speech';
import { useApp } from '../state';

/** The app mark: a bicycle carrying a tulip. Drawn for this app. */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="33" r="8.5" />
      <circle cx="37" cy="33" r="8.5" />
      <path d="M11 33 L19 20 L32 20 L24 33 Z M19 20 L17.5 16 M14.5 16 H21 M32 20 L37 33 M32 20 L30 13 H34" />
      <path d="M38 4 C38 9 40 11 42.5 11 C45 11 47 9 47 4 L44.6 6.2 L42.5 3 L40.4 6.2 Z" fill="var(--delft)" stroke="none" />
      <path d="M42.5 11 V16" stroke="var(--success)" strokeWidth="2" />
    </svg>
  );
}

export function ProgressBar({ value, max, variant = '', label }: { value: number; max: number; variant?: string; label: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((100 * value) / max)) : 0;
  return (
    <div className={`progress ${variant}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.min(value, max)}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SpeakButtons({ text, size = '', slowToo = true }: { text: string; size?: string; slowToo?: boolean }) {
  const { say, progress } = useApp();
  const audio = useDutchAudio();
  const [help, setHelp] = useState(false);
  if (!progress.settings.listen) return null;
  if (audio === 'none')
    return (
      <>
        <button type="button" className={`speak-btn muted-speak ${size}`} onClick={() => setHelp(true)} aria-label="Keine niederländische Stimme – Hilfe">
          <VolumeX size={size === 'small' ? 20 : 26} />
        </button>
        {help && <VoiceHelpDialog onClose={() => setHelp(false)} />}
      </>
    );
  return (
    <>
      <button type="button" className={`speak-btn ${size}`} onClick={() => say(text)} aria-label="Vorlesen">
        <Volume2 size={size === 'small' ? 20 : 26} />
      </button>
      {slowToo && (
        <button type="button" className={`speak-btn slow ${size}`} onClick={() => say(text, true)} aria-label="Langsam vorlesen">
          <Snail size={size === 'small' ? 18 : 22} />
        </button>
      )}
    </>
  );
}

/** Re-renders when the browser's voice list arrives. */
export function useDutchAudio() {
  const [state, setState] = useState(dutchAudio());
  useEffect(() => onVoicesChanged(() => setState(dutchAudio())), []);
  return state;
}

export function VoiceHelpList() {
  return (
    <ul className="voice-help">
      {VOICE_HELP.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function VoiceHelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog
      title="Keine niederländische Stimme"
      actions={
        <button className="btn" onClick={onClose}>
          Verstanden
        </button>
      }
    >
      <p className="muted">Dein Browser hat keine niederländische Stimme. Taalfiets liest dann nichts vor, damit du keine falsche Aussprache lernst. Höraufgaben werden so lange ausgelassen.</p>
      <VoiceHelpList />
    </Dialog>
  );
}

/** A sentence whose words show their meaning when tapped. */
export function HintText({ text, lang }: { text: string; lang: 'nl' | 'de' }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();
  useEffect(() => {
    if (open === null) return;
    const close = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const tokens = tokenize(text);
  // Split the original text into words and the punctuation/space between them.
  const parts: { word?: number; text: string }[] = [];
  let rest = text;
  tokens.forEach((t, i) => {
    const at = rest.indexOf(t);
    if (at > 0) parts.push({ text: rest.slice(0, at) });
    parts.push({ word: i, text: t });
    rest = rest.slice(at + t.length);
  });
  if (rest) parts.push({ text: rest });

  return (
    <span ref={ref} style={{ position: 'relative' }}>
      {parts.map((p, k) =>
        p.word === undefined ? (
          <span key={k}>{p.text}</span>
        ) : (
          <span key={k} style={{ position: 'relative', display: 'inline-block' }}>
            <button
              type="button"
              className="hint-word"
              aria-expanded={open === p.word}
              aria-controls={`${id}-${p.word}`}
              onClick={() => setOpen(open === p.word ? null : p.word!)}
            >
              {p.text}
            </button>
            {open === p.word && <HintPop id={`${id}-${p.word}`} tokens={tokens} index={p.word} lang={lang} />}
          </span>
        ),
      )}
    </span>
  );
}

function HintPop({ id, tokens, index, lang }: { id: string; tokens: string[]; index: number; lang: 'nl' | 'de' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    if (r.right > vw - 8) setShift(vw - 8 - r.right);
    else if (r.left < 8) setShift(8 - r.left);
  }, []);
  let body: ReactNode;
  if (lang === 'nl') {
    const hints = hintsAt(lexicon, tokens, index);
    body = hints.length ? (
      hints.map((h, i) => (
        <div key={i}>
          <b>{h.text}</b>
          <ul>
            {h.meanings.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <span>Kein Eintrag</span>
    );
  } else {
    const nl = reverseHints(lexicon, tokens[index]);
    body = nl.length ? (
      <div>
        <b>{tokens[index]}</b>
        <ul>
          {nl.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    ) : (
      <span>Kein Hinweis für dieses Wort</span>
    );
  }
  return (
    <div ref={ref} id={id} role="tooltip" className="hint-pop" style={{ top: 'calc(100% + 6px)', left: 0, transform: `translateX(${shift}px)` }}>
      {body}
    </div>
  );
}

/** Tip markup: paragraphs, "- " lists, "|" tables, **bold** and *italic*. */
export function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/);
  return (
    <div className="rich">
      {blocks.map((b, i) => {
        const lines = b.split('\n').filter((l) => l.trim());
        if (lines.every((l) => l.trim().startsWith('|'))) {
          const rows = lines.filter((l) => !/^\s*\|?\s*-{3}/.test(l)).map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
          const [head, ...body] = rows;
          const hasHead = head.some((c) => c);
          return (
            <div className="table-wrap" key={i}>
              <table>
                {hasHead && (
                  <thead>
                    <tr>
                      {head.map((c, j) => (
                        <th key={j}>{inline(c)}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {body.map((r, k) => (
                    <tr key={k}>
                      {r.map((c, j) => (
                        <td key={j}>{inline(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (lines.every((l) => l.trim().startsWith('- '))) {
          return (
            <ul key={i}>
              {lines.map((l, k) => (
                <li key={k}>{inline(l.trim().slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(lines.join(' '))}</p>;
      })}
    </div>
  );
}

function inline(s: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    out.push(m[1] ? <strong key={k++}>{m[1]}</strong> : <em key={k++}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

export function Dialog({ title, children, actions }: { title: string; children?: ReactNode; actions: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('button')?.focus();
  }, []);
  return (
    <div className="dialog-backdrop">
      <div className="dialog" role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <h2>{title}</h2>
        {children}
        <div className="actions">{actions}</div>
      </div>
    </div>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button type="button" role="switch" className="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} />;
}
