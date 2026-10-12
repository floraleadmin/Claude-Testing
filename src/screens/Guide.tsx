// Unit guidebook: grammar tips, example sentences and the chapter's words.
import { ArrowLeft } from 'lucide-react';
import { unitById } from '../content/course';
import { nlLabel } from '../lib/exercises';
import { RichText, SpeakButtons } from '../components/common';

export function Guide({ unitId, onBack }: { unitId: string; onBack: () => void }) {
  const unit = unitById.get(unitId)!;
  const words = unit.words.filter((w) => w.core);
  return (
    <div className="main-inner guide">
      <div className="row">
        <button className="icon-btn" onClick={onBack} aria-label="Zurück">
          <ArrowLeft size={26} />
        </button>
        <div>
          <span className="eyebrow">Kapitel {unit.index} · Tipps</span>
          <h1 className="page-title">{unit.title}</h1>
        </div>
      </div>
      {unit.tips.map((t) => (
        <article key={t.title} className="card tip">
          <h2>{t.title}</h2>
          <RichText text={t.body} />
          {t.examples.length > 0 && (
            <div className="stack" style={{ gap: 8 }}>
              {t.examples.map((e) => (
                <div className="example" key={e.nl}>
                  <SpeakButtons text={e.nl} size="small" slowToo={false} />
                  <div style={{ minWidth: 0 }}>
                    <div className="nl" lang="nl">
                      {e.nl}
                    </div>
                    <div className="de">{e.de}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      ))}
      <article className="card">
        <h2 style={{ marginBottom: 12 }}>Wörter in diesem Kapitel</h2>
        <div className="list">
          {words.map((w) => (
            <div className="list-row" key={w.id}>
              <SpeakButtons text={nlLabel(w)} size="small" slowToo={false} />
              <div className="grow">
                <div lang="nl" style={{ fontWeight: 600 }}>
                  {w.emoji ? `${w.emoji} ` : ''}
                  {nlLabel(w)}
                  {w.pl.length > 0 && <span className="muted" style={{ fontWeight: 400 }}> · Plural: {w.pl.join(' / ')}</span>}
                </div>
                <div className="muted" style={{ fontSize: 14 }}>
                  {w.de}
                  {w.verb && (
                    <>
                      {' · '}
                      <span lang="nl">
                        {w.verb.pres.ik[0]}, {w.verb.pres.hij[0]}
                        {w.verb.past ? `, ${w.verb.past.sg.join('/')}` : ''}
                        {w.verb.pp ? `, ${w.verb.aux === 'zijn' ? 'is' : w.verb.aux === 'hebben/zijn' ? 'heeft/is' : 'heeft'} ${w.verb.pp.join('/')}` : ''}
                      </span>
                    </>
                  )}
                  {w.note && <> · {w.note}</>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
