// The learning path: sections, chapters (units) and their nodes.
import { useEffect, useRef, useState } from 'react';
import { BookOpen, BookMarked, Check, FastForward, Lock, Star, Trophy } from 'lucide-react';
import type { PathNode, Unit } from '../types';
import { course } from '../content/course';
import { unitPlan } from '../lib/exercises';
import { currentNode, isDone, isUnlocked, sectionDone, unitDone } from '../lib/unlock';
import { ProgressBar } from '../components/common';
import { useApp } from '../state';

const OFFSETS = [0, 46, 70, 46, 0, -46, -70, -46];

export interface LearnActions {
  openNode: (n: PathNode) => void;
  openGuide: (unitId: string) => void;
  jump: (sectionId: string) => void;
}

export function Learn({ actions }: { actions: LearnActions }) {
  const { progress } = useApp();
  const current = currentNode(progress);
  const currentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' });
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (!(e.target as HTMLElement).closest('.node-wrap')) setOpen(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div className="main-inner">
      {course.map((sec) => {
        const units = sec.units;
        const doneUnits = units.filter((u) => unitDone(progress, u.id)).length;
        const secUnlocked = isUnlocked(progress, unitPlan(units[0]).nodes[0]);
        return (
          <section key={sec.id} className="stack" style={{ gap: 20 }} aria-labelledby={`h-${sec.id}`}>
            <div className="section-head">
              <span className="eyebrow">
                Abschnitt {sec.index} · {sec.cefr}
              </span>
              <h2 id={`h-${sec.id}`}>{sec.title}</h2>
              <p className="muted">{sec.description}</p>
              <div className="row" style={{ marginTop: 6 }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={doneUnits} max={units.length} variant={sectionDone(progress, sec.id) ? 'ok' : ''} label={`Abschnitt ${sec.index}: ${doneUnits} von ${units.length} Kapiteln`} />
                </div>
                <span className="muted num" style={{ fontSize: 14 }}>
                  {doneUnits}/{units.length} Kapitel
                </span>
              </div>
              {!secUnlocked && sec.index > 1 && (
                <button className="btn delft" style={{ marginTop: 8 }} onClick={() => actions.jump(sec.id)}>
                  <FastForward size={20} /> Hierher springen
                </button>
              )}
            </div>
            {units.map((u) => (
              <UnitBlock key={u.id} unit={u} current={current} currentRef={currentRef} open={open} setOpen={setOpen} actions={actions} />
            ))}
          </section>
        );
      })}
      <p className="muted" style={{ textAlign: 'center', padding: '24px 0' }}>
        Ende des Kurses. Wer hier ankommt, kann sich im Alltag auf Niederländisch verständigen.
      </p>
    </div>
  );
}

function UnitBlock({
  unit,
  current,
  currentRef,
  open,
  setOpen,
  actions,
}: {
  unit: Unit;
  current: PathNode | null;
  currentRef: React.RefObject<HTMLDivElement | null>;
  open: string | null;
  setOpen: (id: string | null) => void;
  actions: LearnActions;
}) {
  const { progress } = useApp();
  const plan = unitPlan(unit);
  const color = `var(--unit-${((unit.index - 1) % 5) + 1})`;
  const unlocked = isUnlocked(progress, plan.nodes[0]);
  const lessons = plan.nodes.filter((n) => n.kind === 'lesson').length;
  return (
    <div style={{ ['--unit-color' as string]: color }}>
      <div className={`unit-banner ${unlocked ? '' : 'locked'}`}>
        <div style={{ minWidth: 0 }}>
          <span className="eyebrow">Kapitel {unit.index}</span>
          <h2>{unit.title}</h2>
          <p>{unit.description}</p>
        </div>
        <button className="guide-btn" onClick={() => actions.openGuide(unit.id)} aria-label={`Grammatik und Wörter: ${unit.title}`}>
          <BookMarked size={20} />
          <span className="hide-sm">Tipps</span>
        </button>
      </div>
      <div className="path">
        {plan.nodes.map((n, i) => {
          const done = isDone(progress, n.id);
          const isCur = current?.id === n.id;
          const can = isUnlocked(progress, n);
          const label = n.kind === 'lesson' ? `Lektion ${n.lesson} von ${lessons}` : n.kind === 'story' ? 'Geschichte' : 'Kapiteltest';
          const Icon = !can ? Lock : done && n.kind === 'lesson' ? Check : n.kind === 'story' ? BookOpen : n.kind === 'test' ? Trophy : Star;
          return (
            <div
              key={n.id}
              className="node-wrap"
              style={{ transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)`, zIndex: open === n.id ? 20 : undefined }}
              ref={isCur ? currentRef : undefined}
            >
              {isCur && open !== n.id && <span className="start-bubble">{progress.stats.lessons === 0 ? 'START' : 'WEITER'}</span>}
              <button
                className={`node ${n.kind === 'test' ? 'test' : ''} ${can ? '' : 'locked'} ${isCur ? 'current' : ''}`}
                aria-label={`${unit.title}, ${label}${done ? ', erledigt' : can ? '' : ', gesperrt'}`}
                aria-expanded={open === n.id}
                onClick={() => setOpen(open === n.id ? null : n.id)}
              >
                <Icon size={n.kind === 'test' ? 36 : 32} strokeWidth={2.6} fill={done && n.kind !== 'lesson' ? 'currentColor' : 'none'} />
              </button>
              {open === n.id && (
                <div
                  className={`popover ${can ? '' : 'locked'}`}
                  role="dialog"
                  aria-label={label}
                  style={{ left: '50%', transform: `translateX(calc(-50% - ${OFFSETS[i % OFFSETS.length]}px))` }}
                >
                  <b style={{ fontSize: 18 }}>
                    {n.kind === 'story' && unit.story ? `${unit.story.title} (${unit.story.titleDe})` : label}
                  </b>
                  {can ? (
                    <>
                      <span>
                        {n.kind === 'test'
                          ? 'Alles aus diesem Kapitel, mit mehr Schreibaufgaben.'
                          : n.kind === 'story'
                            ? 'Eine kurze Geschichte mit Fragen zum Verständnis.'
                            : done
                              ? 'Noch einmal üben bringt dir XP und festigt die Wörter.'
                              : `Neue Wörter: ${n.newWords.length || 'keine – nur Wiederholung'}`}
                      </span>
                      <button className="btn block" onClick={() => actions.openNode(n)} autoFocus>
                        {done ? 'Wiederholen +XP' : n.kind === 'test' ? 'Test starten' : n.kind === 'story' ? 'Lesen' : 'Starten +10 XP'}
                      </button>
                    </>
                  ) : (
                    <span>Schließ erst alle Lektionen davor ab, um das hier freizuschalten.</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
