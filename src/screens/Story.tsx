// Story player: lines appear one by one, questions check understanding.
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { unitById } from '../content/course';
import type { SessionResult } from '../lib/progress';
import { stopSpeaking } from '../lib/speech';
import { HintText, ProgressBar } from '../components/common';
import { useApp } from '../state';

const AVATAR_COLORS = ['var(--unit-1)', 'var(--unit-2)', 'var(--unit-3)', 'var(--unit-4)', 'var(--unit-5)'];

export function StoryPlayer({ unitId, nodeId, onClose }: { unitId: string; nodeId?: string; onClose: () => void }) {
  const { progress, dispatch, say, play } = useApp();
  const story = unitById.get(unitId)!.story!;
  const [shown, setShown] = useState(1);
  const [answer, setAnswer] = useState<number | null>(null);
  const [showDe, setShowDe] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const start = useRef(Date.now());
  const end = useRef<HTMLDivElement>(null);
  const speakers = [...new Set(story.lines.flatMap((l) => (l.type === 'line' ? [l.speaker] : [])))];
  const current = story.lines[shown - 1];

  useEffect(() => () => stopSpeaking(), []);
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    if (current?.type === 'line' && progress.settings.autoplay) say(current.nl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const isQuestion = current?.type === 'question';
  const answeredRight = isQuestion && answer === current.answer;

  const advance = () => {
    if (isQuestion && !answeredRight) return;
    if (shown >= story.lines.length) {
      finish();
      return;
    }
    setShown(shown + 1);
    setAnswer(null);
  };

  const finish = () => {
    const result: SessionResult = { kind: 'story', nodeId, xp: 12, outcomes: [], introduced: [], ms: Date.now() - start.current };
    dispatch({ type: 'session', r: result });
    play('done');
    setDone(true);
  };

  if (done) {
    return (
      <div className="lesson">
        <div />
        <div className="lesson-body">
          <div className="lesson-inner center-screen fade-in">
            <h1 className="result-title">Geschichte gelesen!</h1>
            <p className="muted">
              {story.title} – {story.titleDe}
            </p>
            <p className="stat-chip on xp">+12 XP</p>
            <button className="btn lg" onClick={onClose} autoFocus style={{ minWidth: 240 }}>
              Weiter
            </button>
          </div>
        </div>
        <div />
      </div>
    );
  }

  return (
    <div className="lesson" aria-label={`Geschichte: ${story.title}`}>
      <div className="lesson-top">
        <button className="icon-btn" onClick={onClose} aria-label="Geschichte schließen">
          <X size={28} />
        </button>
        <ProgressBar value={shown} max={story.lines.length} label="Fortschritt in der Geschichte" />
      </div>
      <div className="lesson-body">
        <div className="lesson-inner">
          <div>
            <span className="eyebrow">Geschichte</span>
            <h1 className="ex-title" lang="nl">
              {story.title}
            </h1>
            <p className="muted">{story.titleDe}</p>
          </div>
          <div className="story-lines">
            {story.lines.slice(0, shown).map((l, i) =>
              l.type === 'line' ? (
                <div className="story-line fade-in" key={i}>
                  <span className="avatar" style={{ ['--av' as string]: AVATAR_COLORS[speakers.indexOf(l.speaker) % AVATAR_COLORS.length] }} aria-hidden="true">
                    {l.speaker[0]}
                  </span>
                  <div className="bubble">
                    <div className="who">{l.speaker}</div>
                    <div lang="nl" style={{ fontSize: 18 }}>
                      <HintText text={l.nl} lang="nl" />
                    </div>
                    {showDe.has(i) ? (
                      <div className="trans">{l.de}</div>
                    ) : (
                      <button className="link-btn" style={{ fontSize: 14 }} onClick={() => setShowDe(new Set(showDe).add(i))}>
                        Übersetzung zeigen
                      </button>
                    )}
                  </div>
                  <button className="speak-btn small" onClick={() => say(l.nl)} aria-label="Vorlesen">
                    🔊
                  </button>
                </div>
              ) : (
                <div className="card fade-in stack" key={i} style={{ gap: 10 }}>
                  <b>{l.q}</b>
                  <div className="choices" role="radiogroup" aria-label={l.q}>
                    {l.options.map((o, k) => {
                      const active = i === shown - 1;
                      const chosen = active ? answer === k : k === l.answer;
                      const cls = chosen ? (k === l.answer ? 'right' : 'wrong') : '';
                      return (
                        <button
                          key={o}
                          type="button"
                          role="radio"
                          aria-checked={chosen}
                          className={`choice ${cls}`}
                          disabled={!active || answeredRight}
                          onClick={() => {
                            setAnswer(k);
                            if (k === l.answer) play('correct');
                            else play('wrong');
                          }}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ),
            )}
            <div ref={end} />
          </div>
        </div>
      </div>
      <footer className={`footer ${isQuestion ? (answer === null ? '' : answeredRight ? 'correct' : 'wrong') : ''}`}>
        <div className="footer-inner">
          <span className="feedback">
            {isQuestion && answer !== null && <b>{answeredRight ? 'Richtig!' : 'Leider falsch – versuch es noch einmal.'}</b>}
          </span>
          <button className={`btn lg ${answeredRight ? 'success' : ''}`} onClick={advance} disabled={isQuestion && !answeredRight} autoFocus>
            {shown >= story.lines.length ? 'Fertig' : 'Weiter'}
          </button>
        </div>
      </footer>
    </div>
  );
}
