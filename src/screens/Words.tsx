// Word list: learned words with strength, or the whole course vocabulary.
import { useMemo, useState } from 'react';
import { units } from '../content/course';
import { nlLabel } from '../lib/exercises';
import { dayNumber, localDay, strength } from '../lib/progress';
import { lower } from '../lib/text';
import { SpeakButtons } from '../components/common';
import { useApp } from '../state';

export function Words() {
  const { progress } = useApp();
  const [q, setQ] = useState('');
  const [all, setAll] = useState(false);
  const today = dayNumber(localDay());
  const list = useMemo(() => {
    const ws = units.flatMap((u) => u.words.filter((w) => w.core).map((w) => ({ w, u })));
    const filtered = ws.filter(({ w }) => all || progress.words[w.id]);
    const query = lower(q.trim());
    return query ? filtered.filter(({ w }) => lower(w.nl).includes(query) || lower(w.de).includes(query)) : filtered;
  }, [all, q, progress.words]);
  const learned = Object.keys(progress.words).length;

  return (
    <div className="main-inner">
      <div>
        <h1 className="page-title">Wörter</h1>
        <p className="muted">
          {learned} Wörter gelernt. Die Balken zeigen, wie sicher ein Wort sitzt.
        </p>
      </div>
      <div className="row">
        <label className="visually-hidden" htmlFor="word-search">
          Wörter suchen
        </label>
        <input id="word-search" className="input" style={{ flex: '1 1 220px' }} placeholder="Suchen (Deutsch oder Niederländisch)" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="chips" role="group" aria-label="Auswahl">
          <button className="chip" aria-pressed={!all} onClick={() => setAll(false)}>
            Gelernt
          </button>
          <button className="chip" aria-pressed={all} onClick={() => setAll(true)}>
            Ganzer Kurs
          </button>
        </div>
      </div>
      {list.length === 0 ? (
        <div className="card empty">{learned === 0 && !all ? 'Noch keine Wörter. Nach deiner ersten Lektion stehen sie hier.' : 'Nichts gefunden.'}</div>
      ) : (
        <div className="list">
          {list.slice(0, 400).map(({ w, u }) => {
            const st = progress.words[w.id];
            const bars = strength(st, today);
            return (
              <div className="list-row" key={w.id}>
                <SpeakButtons text={nlLabel(w)} size="small" slowToo={false} />
                <div className="grow">
                  <div lang="nl" style={{ fontWeight: 600 }}>
                    {nlLabel(w)}
                  </div>
                  <div className="muted" style={{ fontSize: 14 }}>
                    {w.de} · Kapitel {u.index}
                  </div>
                </div>
                {st && (
                  <span className="bars" aria-label={`Stärke ${bars} von 4`}>
                    {[1, 2, 3, 4].map((i) => (
                      <i key={i} className={i <= bars ? 'on' : ''} />
                    ))}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {list.length > 400 && <p className="muted">Die ersten 400 von {list.length} Treffern. Nutze die Suche für den Rest.</p>}
    </div>
  );
}
