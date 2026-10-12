// Profile: streak, XP per day, totals, badges and course progress.
import { Award, BookOpen, Flame, Target, Trophy, Zap } from 'lucide-react';
import { course } from '../content/course';
import { addDays, currentStreak, localDay } from '../lib/progress';
import { BADGES, quests, sectionDone, unitDone } from '../lib/unlock';
import { ProgressBar } from '../components/common';
import { useApp } from '../state';

const WEEKDAY = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export function Profile() {
  const { progress } = useApp();
  const today = localDay();
  const streak = currentStreak(progress, today);
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const maxXp = Math.max(progress.settings.dailyGoal, ...days.map((d) => progress.xpByDay[d] ?? 0));
  const accuracy = progress.stats.exercises ? Math.round((100 * progress.stats.firstTry) / progress.stats.exercises) : 0;
  const hours = Math.round(progress.stats.ms / 360000) / 10;

  // Calendar: last 5 full weeks, Monday first.
  const t = new Date();
  const mondayOffset = (t.getDay() + 6) % 7;
  const calStart = addDays(today, -mondayOffset - 28);
  const cal = Array.from({ length: 35 }, (_, i) => addDays(calStart, i));

  return (
    <div className="main-inner">
      <h1 className="page-title">Profil</h1>
      <div className="stat-grid">
        <Stat icon={<Flame color="var(--flame)" />} big={streak} small="Tage Serie" />
        <Stat icon={<Zap color="var(--gold)" />} big={progress.xp} small="XP gesamt" />
        <Stat icon={<BookOpen color="var(--delft)" />} big={Object.keys(progress.words).length} small="Wörter gelernt" />
        <Stat icon={<Trophy color="var(--accent)" />} big={progress.stats.lessons} small="Lektionen" />
        <Stat icon={<Target color="var(--success)" />} big={`${accuracy}%`} small="auf Anhieb richtig" />
        <Stat icon={<Award color="var(--unit-4)" />} big={progress.bestStreak} small="längste Serie" />
      </div>

      <section className="card">
        <h3>XP der letzten 7 Tage</h3>
        <div className="week-chart" role="img" aria-label={days.map((d) => `${d}: ${progress.xpByDay[d] ?? 0} XP`).join(', ')}>
          {days.map((d) => {
            const xp = progress.xpByDay[d] ?? 0;
            const wd = new Date(d + 'T12:00:00').getDay();
            return (
              <div key={d} className={`bar ${d === today ? 'today' : ''}`}>
                <em className="num">{xp || ''}</em>
                <i style={{ height: `${Math.round((xp / maxXp) * 100)}%` }} />
                <small>{WEEKDAY[wd]}</small>
              </div>
            );
          })}
        </div>
        <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>
          Tagesziel: {progress.settings.dailyGoal} XP · Lernzeit gesamt: {hours} Std.
        </p>
      </section>

      <section className="card">
        <h3>Lernkalender</h3>
        <div className="calendar" aria-label="Tage mit Lernaktivität">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => (
            <span key={d} style={{ fontWeight: 700 }}>
              {d}
            </span>
          ))}
          {cal.map((d) => (
            <span key={d} className={`${(progress.xpByDay[d] ?? 0) > 0 ? 'on' : ''} ${d === today ? 'today' : ''}`} title={d}>
              {Number(d.slice(8))}
            </span>
          ))}
        </div>
      </section>

      <section className="card">
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
      </section>

      <section className="card">
        <h3>Kursfortschritt</h3>
        <div className="stack">
          {course.map((s) => {
            const done = s.units.filter((u) => unitDone(progress, u.id)).length;
            return (
              <div key={s.id} className="stack" style={{ gap: 4 }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span>
                    <b>Abschnitt {s.index}</b> · {s.title} <span className="muted">({s.cefr})</span>
                  </span>
                  <span className="muted num">
                    {done}/{s.units.length}
                  </span>
                </div>
                <ProgressBar value={done} max={s.units.length} variant={sectionDone(progress, s.id) ? 'ok' : ''} label={`Abschnitt ${s.index}`} />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>Abzeichen</h2>
        <div className="badges">
          {BADGES.map((b) => {
            const has = progress.badges.includes(b.id);
            return (
              <div key={b.id} className={`badge ${has ? '' : 'locked'}`}>
                <span className="medal" aria-hidden="true">
                  <Award size={28} />
                </span>
                <b>{b.title}</b>
                <span>{b.text}</span>
                <span className="visually-hidden">{has ? 'erreicht' : 'noch nicht erreicht'}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, big, small }: { icon: React.ReactNode; big: React.ReactNode; small: string }) {
  return (
    <div className="stat-box">
      {icon}
      <div>
        <div className="big num">{big}</div>
        <div className="small">{small}</div>
      </div>
    </div>
  );
}
