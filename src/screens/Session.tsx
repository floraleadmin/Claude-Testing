// Plays a session: one exercise at a time, check, feedback, mistakes come back at the end.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, Heart, X, Flame, Zap, Target, Clock } from 'lucide-react';
import type { Exercise } from '../lib/exercises';
import { evaluate, type Response, type Verdict } from '../lib/evaluate';
import { isOk } from '../lib/answer';
import { applySession, sessionAccuracy, sessionXp, xpToday, type ExerciseOutcome, type SessionResult } from '../lib/progress';
import type { SessionSpec } from '../lib/session';
import { BADGES, newBadges } from '../lib/unlock';
import { recognitionSupported, stopSpeaking } from '../lib/speech';
import { ExerciseView } from '../components/Exercises';
import { Dialog, ProgressBar } from '../components/common';
import { useApp } from '../state';

const HEARTS = 5;

interface Props {
  spec: SessionSpec;
  onClose: () => void;
  onRestart?: () => void;
}

export function Session({ spec, onClose, onRestart }: Props) {
  const { progress, dispatch, play, say } = useApp();
  const [queue, setQueue] = useState<Exercise[]>(() => spec.exercises);
  const [pos, setPos] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [response, setResponse] = useState<Response | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [outcomes, setOutcomes] = useState<Map<string, ExerciseOutcome>>(new Map());
  const [requeued, setRequeued] = useState<Map<string, number>>(new Map());
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [quit, setQuit] = useState(false);
  const [finished, setFinished] = useState<null | { result: SessionResult; badges: string[]; goalReached: boolean; failed?: boolean }>(null);
  const start = useRef(Date.now());
  const hearts = spec.maxMistakes !== undefined ? spec.maxMistakes + 1 - mistakes : progress.settings.hearts ? HEARTS - mistakes : null;
  const ex = queue[pos];
  const uniqueTotal = useMemo(() => new Set(spec.exercises.map((e) => e.key)).size, [spec.exercises]);
  const solved = [...outcomes.values()].filter((o) => !queue.slice(pos + (verdict ? 1 : 0)).some((q) => q.key === o.key)).length;

  useEffect(() => () => stopSpeaking(), []);

  // End-to-end tests read the current exercise from here (only with ?e2e in the URL).
  useEffect(() => {
    if (typeof location !== 'undefined' && location.search.includes('e2e')) (window as unknown as { __taalfiets?: unknown }).__taalfiets = { ex: queue[pos] ?? null };
  }, [queue, pos]);

  const finish = useCallback(
    (failed = false) => {
      const list = [...outcomes.values()];
      const kind = spec.kind === 'test' ? 'test' : spec.kind;
      const result: SessionResult = {
        kind,
        nodeId: failed ? undefined : spec.nodeId,
        extraNodes: failed ? undefined : spec.extraNodes,
        xp: failed ? 0 : sessionXp(kind, list),
        outcomes: list,
        introduced: failed ? [] : spec.introduced,
        ms: Date.now() - start.current,
        clearMistakes: spec.clearMistakes,
      };
      if (failed) {
        if (spec.kind === 'jump') setFinished({ result, badges: [], goalReached: false, failed: true });
        else onClose();
        return;
      }
      const next = applySession(progress, result);
      const badges = newBadges(next);
      const goalReached = xpToday(progress) < progress.settings.dailyGoal && xpToday(next) >= progress.settings.dailyGoal;
      dispatch({ type: 'session', r: result });
      play('done');
      setFinished({ result, badges, goalReached });
    },
    [outcomes, spec, progress, dispatch, play, onClose],
  );

  const check = useCallback(() => {
    if (!ex || verdict || !response) return;
    const accepted = progress.accepted[ex.key] ?? [];
    const v = evaluate(ex, response, { typos: progress.settings.typos, accepted });
    setVerdict(v);
    const ok = isOk(v.status);
    const firstAttempt = !outcomes.has(ex.key);
    if (firstAttempt) {
      setOutcomes(new Map(outcomes).set(ex.key, { key: ex.key, wordIds: ex.wordIds, firstTry: ok, listen: 'listen' in ex && ex.listen }));
    }
    if (ok) {
      play('correct');
      setCombo((c) => c + 1);
    } else {
      play('wrong');
      setCombo(0);
      setMistakes((m) => m + 1);
      const n = requeued.get(ex.key) ?? 0;
      if (n < 2 && spec.kind !== 'jump') {
        setRequeued(new Map(requeued).set(ex.key, n + 1));
        setQueue((q) => [...q, ex]);
      }
    }
    // Hear the Dutch sentence once more after answering.
    if ((ex.type === 'build' || ex.type === 'write') && (ex.dir === 'de-nl' || ex.listen)) say(ok ? v.solution : ex.sentence.nl[0]);
    if (ex.type === 'cloze') say(v.solution);
  }, [ex, verdict, response, progress, outcomes, requeued, spec.kind, play, say]);

  const next = useCallback(() => {
    if (!verdict) return;
    const outOfHearts = hearts !== null && hearts <= 0;
    if (outOfHearts) return;
    const nextPos = pos + 1;
    setVerdict(null);
    setResponse(null);
    setAttempt((a) => a + 1);
    if (nextPos >= queue.length) finish();
    else setPos(nextPos);
  }, [verdict, pos, queue.length, finish, hearts]);

  const appeal = () => {
    if (!ex || !verdict || !response || response.kind !== 'text') return;
    dispatch({ type: 'accept', key: ex.key, answer: response.value });
    setVerdict({ ...verdict, status: 'correct', canAppeal: false, solution: response.value });
    setOutcomes(new Map(outcomes).set(ex.key, { key: ex.key, wordIds: ex.wordIds, firstTry: true }));
    setMistakes((m) => Math.max(0, m - 1));
    // Remove the copy that was queued again.
    setQueue((q) => {
      const i = q.findIndex((x, k) => k > pos && x.key === ex.key);
      return i === -1 ? q : [...q.slice(0, i), ...q.slice(i + 1)];
    });
  };

  const skipKind = (kind: 'listen' | 'speak') => {
    // "Kann gerade nicht hören/sprechen": drop this and the remaining exercises of that kind.
    const keep = (e: Exercise) => (kind === 'speak' ? e.type !== 'speak' : !('listen' in e && e.listen));
    const rest = queue.slice(pos + 1).filter(keep);
    const q = [...queue.slice(0, pos), ...rest];
    setVerdict(null);
    setResponse(null);
    setAttempt((a) => a + 1);
    setQueue(q);
    if (pos >= q.length) finish();
    if (kind === 'speak') dispatch({ type: 'settings', s: { speak: false } });
  };

  // Match exercises check themselves when the last pair is found.
  useEffect(() => {
    if (ex?.type === 'match' && response?.kind === 'done' && !verdict) check();
  }, [ex, response, verdict, check]);

  // Enter checks, then continues.
  useEffect(() => {
    if (finished || quit) return;
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== 'Enter' || t.tagName === 'TEXTAREA' || t.closest('.dialog')) return;
      e.preventDefault();
      if (verdict) next();
      else check();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [verdict, next, check, finished, quit]);

  // Jump tests and heart mode end the session when mistakes run out.
  const outOfHearts = hearts !== null && hearts <= 0 && !!verdict;

  if (finished) return <Result spec={spec} data={finished} onClose={onClose} onRestart={onRestart} />;
  if (!ex) {
    return (
      <div className="lesson">
        <div />
        <div className="lesson-body">
          <div className="lesson-inner center-screen">
            <h1>Hier gibt es gerade nichts zu üben.</h1>
            <button className="btn" onClick={onClose}>
              Zurück
            </button>
          </div>
        </div>
        <div />
      </div>
    );
  }

  const submit = () => (verdict ? next() : check());
  const status = verdict ? (verdict.status === 'correct' ? 'correct' : verdict.status === 'wrong' ? 'wrong' : 'almost') : '';
  const isListen = 'listen' in ex && ex.listen;
  const canSkipSpeak = ex.type === 'speak';

  return (
    <div className="lesson" aria-label={spec.title}>
      <div className="lesson-top">
        <button className="icon-btn" onClick={() => setQuit(true)} aria-label="Sitzung beenden">
          <X size={28} />
        </button>
        <ProgressBar value={solved} max={uniqueTotal} label="Fortschritt in der Lektion" variant={combo >= 5 ? 'goal' : ''} />
        {hearts !== null && (
          <span className="stat-chip hearts" aria-label={`${hearts} Herzen`}>
            <Heart size={24} fill="currentColor" /> {Math.max(0, hearts)}
          </span>
        )}
      </div>
      <div className="lesson-body">
        <div className="lesson-inner" key={`${pos}-${attempt}`}>
          {combo >= 5 && !verdict && (
            <span className="badge-new" style={{ color: 'var(--gold)' }}>
              <Flame size={14} /> {combo} in Folge richtig
            </span>
          )}
          <ExerciseView ex={ex} locked={!!verdict} verdict={verdict} onChange={setResponse} onSubmit={submit} />
        </div>
      </div>
      <footer className={`footer ${status}`}>
        <div className="footer-inner">
          {!verdict ? (
            <>
              {isListen && (
                <button className="btn ghost" onClick={() => skipKind('listen')}>
                  Kann gerade nicht hören
                </button>
              )}
              {canSkipSpeak && (
                <button className="btn ghost" onClick={() => skipKind('speak')}>
                  Kann gerade nicht sprechen
                </button>
              )}
              {!isListen && !canSkipSpeak && <span className="spacer" />}
              {ex.type !== 'match' && ex.type !== 'speak' && (
                <button className="btn success lg footer-main" onClick={check} disabled={!response}>
                  Prüfen
                </button>
              )}
              {ex.type === 'speak' && !recognitionSupported() && (
                <button className="btn lg footer-main" onClick={() => skipKind('speak')}>
                  Überspringen
                </button>
              )}
            </>
          ) : (
            <>
              <Feedback verdict={verdict} onAppeal={verdict.canAppeal && verdict.status === 'wrong' ? appeal : undefined} />
              {outOfHearts ? (
                <button className={`btn lg ${status === 'wrong' ? 'danger' : 'success'} footer-main`} onClick={() => finish(true)} autoFocus>
                  Weiter
                </button>
              ) : (
                <button className={`btn lg ${status === 'wrong' ? 'danger' : status === 'almost' ? '' : 'success'} footer-main`} onClick={next} autoFocus>
                  Weiter
                </button>
              )}
            </>
          )}
        </div>
      </footer>
      {quit && (
        <Dialog
          title="Wirklich aufhören?"
          actions={
            <>
              <button className="btn delft" onClick={() => setQuit(false)}>
                Weiterlernen
              </button>
              <button className="btn ghost" onClick={onClose}>
                Sitzung beenden
              </button>
            </>
          }
        >
          <p className="muted">Der Fortschritt dieser Sitzung wird nicht gespeichert.</p>
        </Dialog>
      )}
      {outOfHearts && spec.kind !== 'jump' && (
        <Dialog
          title="Keine Herzen mehr"
          actions={
            <>
              {onRestart && (
                <button className="btn" onClick={onRestart}>
                  Neu starten
                </button>
              )}
              <button className="btn ghost" onClick={onClose}>
                Beenden
              </button>
            </>
          }
        >
          <p className="muted">Du hast fünf Fehler gemacht. Im Herzen-Modus beginnt die Lektion dann von vorn. Du kannst den Modus in den Einstellungen ausschalten.</p>
        </Dialog>
      )}
    </div>
  );
}

function Feedback({ verdict, onAppeal }: { verdict: Verdict; onAppeal?: () => void }) {
  const title =
    verdict.status === 'correct' ? pickPraise() : verdict.status === 'accent' ? 'Richtig – achte auf die Akzente:' : verdict.status === 'typo' ? 'Fast richtig – ein Tippfehler:' : 'Richtige Lösung:';
  return (
    <div className="feedback" role="status" aria-live="polite">
      <span className="feedback-icon" aria-hidden="true">
        {verdict.status === 'wrong' ? <X size={34} /> : <Check size={34} />}
      </span>
      <div style={{ minWidth: 0 }}>
        <h3>{title}</h3>
        {(verdict.status !== 'correct' || verdict.meaning) && verdict.solution && <p className="solution">{verdict.solution}</p>}
        {verdict.meaning && <p className="meaning">{verdict.meaning}</p>}
        {onAppeal && (
          <button className="link-btn" onClick={onAppeal}>
            Meine Antwort war richtig
          </button>
        )}
      </div>
    </div>
  );
}

const PRAISE = ['Super!', 'Richtig!', 'Klasse!', 'Gut gemacht!', 'Prima!', 'Heel goed!', 'Uitstekend!'];
function pickPraise() {
  return PRAISE[Math.floor(Math.random() * PRAISE.length)];
}

function Result({ spec, data, onClose, onRestart }: { spec: SessionSpec; data: { result: SessionResult; badges: string[]; goalReached: boolean; failed?: boolean }; onClose: () => void; onRestart?: () => void }) {
  const { result } = data;
  const acc = sessionAccuracy(result.outcomes);
  const mins = Math.max(1, Math.round(result.ms / 60000));
  if (data.failed) {
    return (
      <div className="lesson">
        <div />
        <div className="lesson-body">
          <div className="lesson-inner center-screen">
            <h1 className="result-title" style={{ color: 'var(--danger)' }}>
              Noch nicht ganz
            </h1>
            <p className="muted">Mehr als drei Fehler. Lern die Kapitel davor in Ruhe oder versuch es später noch einmal.</p>
            <div className="stack" style={{ width: '100%', maxWidth: 360 }}>
              {onRestart && (
                <button className="btn delft block" onClick={onRestart}>
                  Noch einmal versuchen
                </button>
              )}
              <button className="btn block" onClick={onClose}>
                Zurück zum Lernpfad
              </button>
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  }
  return (
    <div className="lesson">
      <div />
      <div className="lesson-body">
        <div className="lesson-inner center-screen fade-in">
          <h1 className="result-title">{spec.kind === 'jump' ? 'Bestanden!' : acc === 100 ? 'Fehlerfrei!' : 'Geschafft!'}</h1>
          <p className="muted">{spec.title}</p>
          <div className="result-stats">
            <div className="result-stat">
              <div className="label">XP</div>
              <div className="value num">
                <Zap size={20} /> {result.xp}
              </div>
            </div>
            <div className="result-stat" style={{ ['--stat' as string]: 'var(--success)' }}>
              <div className="label">Genau</div>
              <div className="value num">
                <Target size={20} /> {acc}%
              </div>
            </div>
            <div className="result-stat" style={{ ['--stat' as string]: 'var(--delft)' }}>
              <div className="label">Zeit</div>
              <div className="value num">
                <Clock size={20} /> {mins}′
              </div>
            </div>
          </div>
          {data.goalReached && <p className="notice info">Tagesziel erreicht! Morgen geht es weiter.</p>}
          {data.badges.length > 0 && (
            <div className="stack" style={{ alignItems: 'center' }}>
              <h2>Neues Abzeichen</h2>
              {data.badges.map((id) => {
                const b = BADGES.find((x) => x.id === id)!;
                return (
                  <p key={id}>
                    <b>{b.title}</b> – {b.text}
                  </p>
                );
              })}
            </div>
          )}
          <button className="btn lg" onClick={onClose} autoFocus style={{ minWidth: 240 }}>
            Weiter
          </button>
        </div>
      </div>
      <div />
    </div>
  );
}
