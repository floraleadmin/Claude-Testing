// App shell: navigation, side panel and routing between screens.
import { useEffect, useState } from 'react';
import { Dumbbell, Flame, House, Settings as Cog, User, Zap, BookA } from 'lucide-react';
import type { PathNode } from './types';
import { course } from './content/course';
import { currentStreak, xpToday } from './lib/progress';
import { jumpSession, lessonSession, type SessionSpec } from './lib/session';
import { quests } from './lib/unlock';
import { Logo, ProgressBar } from './components/common';
import { Learn } from './screens/Learn';
import { Guide } from './screens/Guide';
import { Session } from './screens/Session';
import { StoryPlayer } from './screens/Story';
import { Practice } from './screens/Practice';
import { Words } from './screens/Words';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { useApp } from './state';

type Tab = 'learn' | 'practice' | 'words' | 'profile' | 'settings';
type Route =
  | { name: Tab }
  | { name: 'guide'; unitId: string }
  | { name: 'session'; spec: SessionSpec; make: () => SessionSpec; back: Tab }
  | { name: 'story'; unitId: string; nodeId?: string };

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'learn', label: 'Lernen', icon: <House size={26} /> },
  { id: 'practice', label: 'Üben', icon: <Dumbbell size={26} /> },
  { id: 'words', label: 'Wörter', icon: <BookA size={26} /> },
  { id: 'profile', label: 'Profil', icon: <User size={26} /> },
  { id: 'settings', label: 'Optionen', icon: <Cog size={26} /> },
];

export function App() {
  const { progress } = useApp();
  const [route, setRoute] = useState<Route>({ name: 'learn' });
  const [tab, setTab] = useState<Tab>('learn');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name]);

  if (!progress.onboarded) return <Onboarding startJump={(id) => setRoute({ name: 'session', spec: jumpSession(progress, id), make: () => jumpSession(progress, id), back: 'learn' })} />;

  const go = (t: Tab) => {
    setTab(t);
    setRoute({ name: t });
  };
  const startSession = (make: () => SessionSpec, back: Tab = tab) => setRoute({ name: 'session', spec: make(), make, back });
  const openNode = (n: PathNode) => {
    if (n.kind === 'story') setRoute({ name: 'story', unitId: n.unitId, nodeId: n.id });
    else startSession(() => lessonSession(progress, n), 'learn');
  };

  if (route.name === 'session') {
    return (
      <Session
        key={route.spec.title + route.spec.exercises.length + route.spec.exercises[0]?.key}
        spec={route.spec}
        onClose={() => setRoute({ name: route.back })}
        onRestart={() => setRoute({ ...route, spec: route.make() })}
      />
    );
  }
  if (route.name === 'story') return <StoryPlayer unitId={route.unitId} nodeId={route.nodeId} onClose={() => setRoute({ name: 'learn' })} />;

  let screen: React.ReactNode;
  switch (route.name) {
    case 'learn':
      screen = (
        <Learn
          actions={{
            openNode,
            openGuide: (unitId) => setRoute({ name: 'guide', unitId }),
            jump: (id) => startSession(() => jumpSession(progress, id), 'learn'),
          }}
        />
      );
      break;
    case 'guide':
      screen = <Guide unitId={route.unitId} onBack={() => setRoute({ name: 'learn' })} />;
      break;
    case 'practice':
      screen = <Practice start={(spec) => startSession(() => spec, 'practice')} />;
      break;
    case 'words':
      screen = <Words />;
      break;
    case 'profile':
      screen = <Profile />;
      break;
    case 'settings':
      screen = <Settings />;
      break;
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <Logo /> Taalfiets
        </div>
        <nav className="nav" aria-label="Hauptnavigation">
          <Nav tab={tab} go={go} />
        </nav>
      </aside>
      <header className="topbar">
        <span className="brand" style={{ fontSize: 22, padding: 0 }}>
          <Logo size={28} /> Taalfiets
        </span>
        <Stats />
      </header>
      <main className="main">{screen}</main>
      <aside className="rail" aria-label="Übersicht">
        <Rail onPractice={() => go('practice')} />
      </aside>
      <nav className="bottom-nav" aria-label="Navigation">
        <Nav tab={tab} go={go} compact />
      </nav>
    </div>
  );
}

function Nav({ tab, go, compact = false }: { tab: Tab; go: (t: Tab) => void; compact?: boolean }) {
  return (
    <>
      {TABS.map((t) => (
        <button key={t.id} className="nav-item" aria-current={tab === t.id ? 'page' : undefined} onClick={() => go(t.id)}>
          {t.icon}
          <span>{t.id === 'settings' && !compact ? 'Einstellungen' : t.label}</span>
        </button>
      ))}
    </>
  );
}

function Stats() {
  const { progress } = useApp();
  const streak = currentStreak(progress);
  const xp = xpToday(progress);
  return (
    <div className="stat-row">
      <span className={`stat-chip flame ${streak > 0 ? 'on' : ''}`} aria-label={`${streak} Tage Serie`}>
        <Flame size={24} fill={streak > 0 ? 'currentColor' : 'none'} /> <span className="num">{streak}</span>
      </span>
      <span className={`stat-chip xp ${xp > 0 ? 'on' : ''}`} aria-label={`${xp} von ${progress.settings.dailyGoal} XP heute`}>
        <Zap size={24} fill={xp > 0 ? 'currentColor' : 'none'} />{' '}
        <span className="num">
          {xp}/{progress.settings.dailyGoal}
        </span>
      </span>
    </div>
  );
}

function Rail({ onPractice }: { onPractice: () => void }) {
  const { progress } = useApp();
  const xp = xpToday(progress);
  return (
    <>
      <div className="card">
        <Stats />
      </div>
      <div className="card stack">
        <h3>Tagesziel</h3>
        <ProgressBar value={xp} max={progress.settings.dailyGoal} variant="goal" label="Tagesziel" />
        <p className="muted num">
          {xp} von {progress.settings.dailyGoal} XP
        </p>
      </div>
      <div className="card">
        <h3>Tagesaufgaben</h3>
        {quests(progress).map((q) => (
          <div className="quest" key={q.title}>
            <div className="row">
              <span>{q.title}</span>
              <span className="muted num">
                {Math.min(q.value, q.goal)}/{q.goal}
              </span>
            </div>
            <ProgressBar value={q.value} max={q.goal} variant={q.value >= q.goal ? 'ok' : 'goal'} label={q.title} />
          </div>
        ))}
      </div>
      {progress.mistakes.length > 0 && (
        <div className="card stack">
          <h3>Fehler offen</h3>
          <p className="muted">{progress.mistakes.length} Aufgaben warten auf eine Wiederholung.</p>
          <button className="btn secondary" onClick={onPractice}>
            Jetzt üben
          </button>
        </div>
      )}
    </>
  );
}

function Onboarding({ startJump }: { startJump: (sectionId: string) => void }) {
  const { dispatch } = useApp();
  const [goal, setGoal] = useState(20);
  const [level, setLevel] = useState(false);
  return (
    <div className="main" style={{ minHeight: '100%' }}>
      <div className="main-inner center-screen" style={{ maxWidth: 520 }}>
        <span style={{ color: 'var(--accent)' }}>
          <Logo size={88} />
        </span>
        <h1 style={{ fontSize: 38 }}>Welkom bij Taalfiets!</h1>
        <p className="muted">Niederländisch für Deutschsprachige: fünf Abschnitte von A1 bis zum Einstieg in B1, mit Grammatik zu jedem Kapitel.</p>
        <div className="card stack" style={{ width: '100%', textAlign: 'left' }}>
          <h3>Wie viel möchtest du am Tag lernen?</h3>
          <div className="chips" role="group" aria-label="Tagesziel">
            {[10, 20, 30, 50].map((g) => (
              <button key={g} className="chip" aria-pressed={goal === g} onClick={() => setGoal(g)}>
                {g} XP {g === 10 ? '(~5 Min.)' : g === 20 ? '(~10 Min.)' : g === 30 ? '(~15 Min.)' : '(~25 Min.)'}
              </button>
            ))}
          </div>
        </div>
        {!level ? (
          <div className="stack" style={{ width: '100%' }}>
            <button className="btn lg block" onClick={() => dispatch({ type: 'onboard', goal })}>
              Ganz von vorn beginnen
            </button>
            <button className="btn secondary block" onClick={() => setLevel(true)}>
              Ich kann schon etwas Niederländisch
            </button>
          </div>
        ) : (
          <div className="card stack" style={{ width: '100%', textAlign: 'left' }}>
            <h3>Wo möchtest du einsteigen?</h3>
            <p className="muted">Ein kurzer Test mit dem Stoff der Abschnitte davor. Bei höchstens drei Fehlern springst du dorthin.</p>
            {course.slice(1).map((s) => (
              <button
                key={s.id}
                className="btn secondary block"
                onClick={() => {
                  dispatch({ type: 'onboard', goal });
                  startJump(s.id);
                }}
              >
                Abschnitt {s.index}: {s.title} ({s.cefr})
              </button>
            ))}
            <button className="link-btn" onClick={() => setLevel(false)}>
              Zurück
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
