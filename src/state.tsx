// App-wide state: the learner's progress, persisted locally and in the cloud.
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import { acceptAnswer, applySession, migrate, newProgress, type Progress, type SessionResult, type Settings } from './lib/progress';
import { initCloud, loadLocal, saveLocal, scheduleCloud } from './lib/storage';
import { newBadges } from './lib/unlock';
import { speak } from './lib/speech';
import { sounds } from './lib/sound';

type Action =
  | { type: 'replace'; p: Progress }
  | { type: 'session'; r: SessionResult }
  | { type: 'settings'; s: Partial<Settings> }
  | { type: 'accept'; key: string; answer: string }
  | { type: 'onboard'; goal: number }
  | { type: 'reset' };

function reducer(p: Progress, a: Action): Progress {
  switch (a.type) {
    case 'replace':
      return a.p;
    case 'session': {
      const next = applySession(p, a.r);
      const earned = newBadges(next);
      return earned.length ? { ...next, badges: [...next.badges, ...earned] } : next;
    }
    case 'settings':
      return { ...p, settings: { ...p.settings, ...a.s }, updatedAt: Date.now() };
    case 'accept':
      return acceptAnswer(p, a.key, a.answer);
    case 'onboard':
      return { ...p, onboarded: true, settings: { ...p.settings, dailyGoal: a.goal }, updatedAt: Date.now() };
    case 'reset':
      return { ...newProgress(), onboarded: true, settings: p.settings };
  }
}

interface Ctx {
  progress: Progress;
  dispatch: (a: Action) => void;
  say: (text: string, slow?: boolean) => void;
  play: (s: keyof typeof sounds) => void;
}

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, undefined, () => loadLocal() ?? newProgress());
  const ref = useRef(progress);
  ref.current = progress;
  const first = useRef(true);

  useEffect(() => {
    void initCloud(
      () => ref.current,
      (p) => dispatch({ type: 'replace', p: migrate(p) }),
    );
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    saveLocal(progress);
    scheduleCloud(progress);
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (progress.settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', progress.settings.theme);
  }, [progress.settings.theme]);

  const say = useCallback((text: string, slow = false) => {
    const s = ref.current.settings;
    if (!s.listen) return;
    speak(text, { rate: s.rate, voiceURI: s.voiceURI, slow });
  }, []);
  const play = useCallback((name: keyof typeof sounds) => {
    if (ref.current.settings.sound) sounds[name]();
  }, []);

  const value = useMemo(() => ({ progress, dispatch, say, play }), [progress, say, play]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp outside AppProvider');
  return c;
}
