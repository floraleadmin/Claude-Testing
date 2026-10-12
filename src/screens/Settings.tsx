// Settings: goal, audio, speaking, hearts, theme, backup and reset.
import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, isProgress, migrate } from '../lib/progress';
import { dutchVoices, inArtifactFrame, onVoicesChanged, recognitionSupported, ttsSupported } from '../lib/speech';
import { isCloud } from '../lib/storage';
import { Dialog, Switch, useDutchAudio, VoiceHelpList } from '../components/common';
import { useApp } from '../state';

const GOALS = [
  { xp: 10, label: 'Locker', text: '10 XP am Tag' },
  { xp: 20, label: 'Normal', text: '20 XP am Tag' },
  { xp: 30, label: 'Ernsthaft', text: '30 XP am Tag' },
  { xp: 50, label: 'Intensiv', text: '50 XP am Tag' },
];

interface ClaudeLike {
  use(name: string): Promise<unknown>;
}

export function Settings() {
  const { progress, dispatch, say } = useApp();
  const s = progress.settings;
  const set = (patch: Partial<typeof s>) => dispatch({ type: 'settings', s: patch });
  const [voices, setVoices] = useState(dutchVoices());
  const audio = useDutchAudio();
  const [confirmReset, setConfirmReset] = useState(false);
  const [message, setMessage] = useState('');
  const [importText, setImportText] = useState('');
  useEffect(() => onVoicesChanged(() => setVoices(dutchVoices())), []);

  const backup = JSON.stringify(progress);
  const exportFile = async () => {
    const filename = `taalfiets-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
    const claude = (globalThis as unknown as { claude?: ClaudeLike }).claude;
    try {
      const downloads = claude ? ((await claude.use('downloads')) as { save(x: { filename: string; data: string }): Promise<unknown> } | null) : null;
      if (downloads) {
        await downloads.save({ filename, data: backup });
        setMessage('Datei gespeichert.');
        return;
      }
    } catch {
      setMessage('Speichern wurde abgebrochen.');
      return;
    }
    const url = URL.createObjectURL(new Blob([backup], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('Datei gespeichert.');
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(backup);
      setMessage('In die Zwischenablage kopiert.');
    } catch {
      setImportText(backup);
      setMessage('Kopieren ging nicht. Der Text steht unten im Feld – markieren und kopieren.');
    }
  };
  const restore = (text: string) => {
    try {
      const raw: unknown = JSON.parse(text);
      if (!isProgress(raw)) throw new Error('no progress');
      const p = migrate(raw);
      dispatch({ type: 'replace', p: { ...p, updatedAt: Date.now() } });
      setMessage('Fortschritt wiederhergestellt.');
      setImportText('');
    } catch {
      setMessage('Das ist keine gültige Sicherung von Taalfiets.');
    }
  };

  return (
    <div className="main-inner">
      <h1 className="page-title">Einstellungen</h1>

      <section className="card stack">
        <h3>Tagesziel</h3>
        <div className="chips" role="group" aria-label="Tagesziel">
          {GOALS.map((g) => (
            <button key={g.xp} className="chip" aria-pressed={s.dailyGoal === g.xp} onClick={() => set({ dailyGoal: g.xp })}>
              {g.label} · {g.text}
            </button>
          ))}
        </div>
      </section>

      <section className="list">
        <Row label="Soundeffekte" hint="Töne bei richtig und falsch">
          <Switch checked={s.sound} onChange={(v) => set({ sound: v })} label="Soundeffekte" />
        </Row>
        <Row
          label="Audio und Höraufgaben"
          hint={
            !ttsSupported()
              ? 'Dein Browser kann nicht vorlesen.'
              : voices.length
                ? `${voices.length} niederländische Stimme(n) gefunden`
                : audio === 'none'
                  ? 'Keine niederländische Stimme gefunden – Taalfiets liest nichts vor und lässt Höraufgaben aus.'
                  : 'Stimmen werden geladen …'
          }
        >
          <Switch checked={s.listen} onChange={(v) => set({ listen: v })} label="Audio und Höraufgaben" />
        </Row>
        {s.listen && audio === 'none' && (
          <div className="settings-row" style={{ display: 'block' }}>
            <VoiceHelpList />
          </div>
        )}
        {s.listen && (
          <>
            <Row label="Automatisch vorlesen" hint="Niederländische Sätze beim Erscheinen abspielen">
              <Switch checked={s.autoplay} onChange={(v) => set({ autoplay: v })} label="Automatisch vorlesen" />
            </Row>
            <div className="settings-row" style={{ flexWrap: 'wrap' }}>
              <label htmlFor="voice">Stimme</label>
              <div className="row">
                <select id="voice" className="input" value={s.voiceURI ?? ''} onChange={(e) => set({ voiceURI: e.target.value || null })}>
                  <option value="">Automatisch</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
                <button className="btn secondary" onClick={() => say('Hallo! Welkom bij Taalfiets. Veel plezier met Nederlands leren.')}>
                  Test
                </button>
              </div>
            </div>
            <div className="settings-row">
              <label htmlFor="rate">
                Sprechtempo
                <small>{s.rate < 0.85 ? 'langsam' : s.rate > 1.05 ? 'schnell' : 'normal'}</small>
              </label>
              <input id="rate" type="range" min={0.6} max={1.2} step={0.05} value={s.rate} onChange={(e) => set({ rate: Number(e.target.value) })} />
            </div>
          </>
        )}
        <Row
          label="Sprechübungen"
          hint={
            !recognitionSupported()
              ? 'Dein Browser hat keine Spracherkennung (z. B. Chrome oder Safari nutzen).'
              : inArtifactFrame()
                ? 'In dieser eingebetteten Ansicht ist das Mikrofon gesperrt. Lokal gestartet funktioniert es.'
                : 'Sätze laut sprechen (Mikrofon nötig)'
          }
        >
          <Switch checked={s.speak} onChange={(v) => set({ speak: v })} label="Sprechübungen" />
        </Row>
        <Row label="Tippfehler tolerieren" hint="Kleine Tippfehler beim Schreiben gelten als richtig (mit Hinweis)">
          <Switch checked={s.typos} onChange={(v) => set({ typos: v })} label="Tippfehler tolerieren" />
        </Row>
        <Row label="Herzen-Modus" hint="Nach 5 Fehlern beginnt die Lektion von vorn">
          <Switch checked={s.hearts} onChange={(v) => set({ hearts: v })} label="Herzen-Modus" />
        </Row>
        <div className="settings-row">
          <span className="label">Darstellung</span>
          <div className="chips" role="group" aria-label="Darstellung">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button key={t} className="chip" aria-pressed={s.theme === t} onClick={() => set({ theme: t })}>
                {t === 'system' ? 'System' : t === 'light' ? 'Hell' : 'Dunkel'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card stack">
        <h3>Fortschritt sichern</h3>
        <p className="muted">
          {isCloud() ? 'Dein Fortschritt wird automatisch in deinem Konto gespeichert. ' : 'Dein Fortschritt wird in diesem Browser gespeichert. '}
          Mit einer Sicherung kannst du ihn auf ein anderes Gerät mitnehmen.
        </p>
        <div className="row">
          <button className="btn delft" onClick={exportFile}>
            Als Datei sichern
          </button>
          <button className="btn secondary" onClick={copy}>
            Text kopieren
          </button>
          <label className="btn secondary" style={{ cursor: 'pointer' }}>
            Datei laden
            <input
              type="file"
              accept="application/json,.json"
              className="visually-hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void f.text().then(restore);
                e.target.value = '';
              }}
            />
          </label>
        </div>
        <label htmlFor="import" className="muted" style={{ fontSize: 14 }}>
          Oder Sicherungstext hier einfügen:
        </label>
        <textarea id="import" className="write" style={{ minHeight: 80, fontSize: 14 }} value={importText} onChange={(e) => setImportText(e.target.value)} />
        <div className="row">
          <button className="btn secondary" disabled={!importText.trim()} onClick={() => restore(importText)}>
            Text wiederherstellen
          </button>
        </div>
        {message && (
          <p className="notice info" role="status">
            {message}
          </p>
        )}
      </section>

      <section className="card stack">
        <h3>Zurücksetzen</h3>
        <div className="row">
          <button className="btn secondary" onClick={() => set({ ...DEFAULT_SETTINGS })}>
            Einstellungen zurücksetzen
          </button>
          <button className="btn danger" onClick={() => setConfirmReset(true)}>
            Fortschritt löschen
          </button>
        </div>
      </section>

      <p className="muted" style={{ fontSize: 13 }}>
        Taalfiets ist ein persönliches Lernprojekt. Lerninhalte, Texte und Grafiken sind eigens dafür geschrieben.
      </p>

      {confirmReset && (
        <Dialog
          title="Fortschritt wirklich löschen?"
          actions={
            <>
              <button className="btn secondary" onClick={() => setConfirmReset(false)}>
                Abbrechen
              </button>
              <button
                className="btn danger"
                onClick={() => {
                  dispatch({ type: 'reset' });
                  setConfirmReset(false);
                  setMessage('Fortschritt gelöscht.');
                }}
              >
                Alles löschen
              </button>
            </>
          }
        >
          <p className="muted">XP, Serie, gelernte Wörter und erledigte Lektionen gehen verloren. Sichere vorher, wenn du unsicher bist.</p>
        </Dialog>
      )}
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="settings-row">
      <span className="label">
        {label}
        {hint && <small>{hint}</small>}
      </span>
      {children}
    </div>
  );
}
