// Practice hub: mistakes, due words, listening, speaking, articles, verbs, chapter review.
import { useState } from 'react';
import { AlertCircle, Ear, Layers, Mic, RotateCcw, Shapes, Workflow } from 'lucide-react';
import { units } from '../content/course';
import { dayNumber, dueWords, localDay } from '../lib/progress';
import { learnedSentenceIds, unitDone } from '../lib/unlock';
import { getWord } from '../lib/exercises';
import { articleSession, listeningSession, mistakesSession, speakingSession, unitReviewSession, verbSession, wordsSession, type SessionSpec } from '../lib/session';
import { useApp } from '../state';

export function Practice({ start }: { start: (s: SessionSpec) => void }) {
  const { progress } = useApp();
  const [unit, setUnit] = useState('');
  const today = dayNumber(localDay());
  const due = dueWords(progress, today).length;
  const learned = Object.keys(progress.words).length;
  const sentences = learnedSentenceIds(progress).length;
  const nouns = Object.keys(progress.words).filter((id) => getWord(id)?.pos === 'noun').length;
  const verbs = Object.keys(progress.words).filter((id) => getWord(id)?.verb).length;
  const doneUnits = units.filter((u) => unitDone(progress, u.id));
  const s = progress.settings;

  const cards: { id: string; title: string; text: string; count: string; icon: React.ReactNode; color: string; enabled: boolean; run: () => SessionSpec }[] = [
    {
      id: 'mistakes',
      title: 'Fehler wiederholen',
      text: 'Aufgaben, die du zuletzt falsch hattest.',
      count: progress.mistakes.length ? `${progress.mistakes.length} offen` : 'Keine Fehler offen',
      icon: <AlertCircle />,
      color: 'var(--danger)',
      enabled: progress.mistakes.length > 0,
      run: () => mistakesSession(progress),
    },
    {
      id: 'words',
      title: 'Wörter wiederholen',
      text: 'Fällige Wörter nach dem Lernkartei-Prinzip.',
      count: learned ? `${due} fällig von ${learned}` : 'Noch keine Wörter gelernt',
      icon: <Layers />,
      color: 'var(--accent)',
      enabled: learned >= 4,
      run: () => wordsSession(progress),
    },
    {
      id: 'listen',
      title: 'Hörtraining',
      text: 'Sätze hören und aufschreiben.',
      count: s.listen ? `${sentences} Sätze verfügbar` : 'Audio ist ausgeschaltet',
      icon: <Ear />,
      color: 'var(--delft)',
      enabled: s.listen && sentences >= 4,
      run: () => listeningSession(progress),
    },
    {
      id: 'speak',
      title: 'Sprechtraining',
      text: 'Sätze laut sprechen.',
      count: s.speak ? `${sentences} Sätze verfügbar` : 'In den Einstellungen einschalten',
      icon: <Mic />,
      color: 'var(--unit-3)',
      enabled: s.speak && sentences >= 4,
      run: () => speakingSession(progress),
    },
    {
      id: 'article',
      title: 'de oder het?',
      text: 'Artikel der gelernten Nomen.',
      count: `${nouns} Nomen`,
      icon: <Shapes />,
      color: 'var(--unit-4)',
      enabled: nouns >= 4,
      run: () => articleSession(progress),
    },
    {
      id: 'verbs',
      title: 'Verbtrainer',
      text: 'Konjugation der gelernten Verben.',
      count: `${verbs} Verben`,
      icon: <Workflow />,
      color: 'var(--unit-5)',
      enabled: verbs >= 2,
      run: () => verbSession(progress),
    },
  ];

  return (
    <div className="main-inner">
      <div>
        <h1 className="page-title">Üben</h1>
        <p className="muted">Wiederholen bringt XP und hält deine Wörter frisch.</p>
      </div>
      <div className="practice-grid">
        {cards.map((c) => (
          <button key={c.id} className="practice-card" style={{ ['--pc' as string]: c.color }} disabled={!c.enabled} onClick={() => start(c.run())}>
            <span className="icon" aria-hidden="true">
              {c.icon}
            </span>
            <h3>{c.title}</h3>
            <span className="muted">{c.text}</span>
            <span className="count">{c.count}</span>
          </button>
        ))}
      </div>
      <div className="card stack">
        <h2 style={{ fontSize: 22 }}>
          <RotateCcw size={20} /> Kapitel wiederholen
        </h2>
        {doneUnits.length ? (
          <div className="row">
            <label className="visually-hidden" htmlFor="review-unit">
              Kapitel
            </label>
            <select id="review-unit" className="input" value={unit} onChange={(e) => setUnit(e.target.value)} style={{ flex: 1 }}>
              <option value="">Kapitel wählen …</option>
              {doneUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.index}. {u.title}
                </option>
              ))}
            </select>
            <button className="btn delft" disabled={!unit} onClick={() => start(unitReviewSession(progress, unit))}>
              Start
            </button>
          </div>
        ) : (
          <p className="muted">Sobald du ein Kapitel abgeschlossen hast, kannst du es hier gezielt wiederholen.</p>
        )}
      </div>
    </div>
  );
}
