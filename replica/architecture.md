# Architecture: Taalfiets (Nachbau der Lernfunktionen von Duolingo)

Ein Lernender, kein Server. Alles läuft im Browser; der Kurs ist Teil des Builds.

## Stack

| layer | choice | why |
| --- | --- | --- |
| web | Vite 8 + React 19 + TypeScript 5.9 | schnell, typsicher, ein statischer Build ohne Server |
| styling | eine CSS-Datei mit Tokens aus `replica/design/tokens.json` | keine Abhängigkeit, Hell/Dunkel über Custom Properties |
| icons | lucide-react (ISC) | offene Icons statt fremder Grafiken |
| audio | Web Speech API `speechSynthesis` mit nl-NL/nl-BE-Stimme | keine Aufnahmen nötig, auf allen Plattformen vorhanden |
| sprechen | Web Speech API `SpeechRecognition` (nl-NL), optional | nur wo der Browser es kann; sonst automatisch aus |
| database | `localStorage` + im claude.ai-Artifact zusätzlich die `db`-Capability (privat pro Person) | Fortschritt bleibt erhalten, auch geräteübergreifend im Artifact |
| auth | keine | persönliche App |
| payments / email / jobs | keine | nicht nötig |
| hosting | claude.ai Artifact (Single-File-Build) + `npm run dev` lokal | sofort auf Handy und Desktop nutzbar |
| tests | vitest (Logik + Inhalts-Validierung), Playwright (Flows) | – |
| Inhaltsprüfung | nspell + dictionary-nl (OpenTaal) + dictionary-de, eigene Grammatik-Lints | „keine Fehler“ im Kurs maschinell absichern |

## Schema (Client-Datenmodell, `src/types.ts`)

Tables: keine SQL-Tabellen. Zwei Dokumente pro Person.

```ts
// Kurs (statisch, im Build)
Course   { sections: Section[] }
Section  { id, title, cefr, units: Unit[] }
Unit     { id, title, description, tips: Tip[], words: Word[], sentences: Sentence[],
           cloze: Cloze[], story?: Story }
Word     { id, nl, de, pos, art?: 'de'|'het', pl?: string[], forms: string[], emoji?, verb?: VerbForms }
Sentence { id, nl: string[] /* [0] = kanonisch */, de: string[] }
Cloze    { id, nl: 'Ik {ben} moe.', options, de }

// Fortschritt (localStorage-Key "taalfiets:v1", db: data/users/<id>/progress)
Progress { version, updatedAt, xpTotal, xpByDay: {[yyyy-mm-dd]: xp}, streak, lastActiveDay,
           dailyGoal, completed: {[nodeId]: {times, best}}, words: {[wordId]: SrsState},
           mistakes: MistakeRef[] (max 100), accepted: {[exerciseKey]: string[]},
           settings: Settings, achievements: string[], stats: {...} }
SrsState { box: 0..6, due: dayNumber, seen, right, wrong }
```

Zugriff: im Artifact unter `data/users/<id>/` – vom Plattform-Standard privat pro Person.

## API

Keine Server-Routen. Interne Module:

| method path | does | who | input | output | flow |
| --- | --- | --- | --- | --- | --- |
| `buildLesson(node, progress, seed)` | erzeugt 10–16 Aufgaben | App | Knoten, Fortschritt | Exercise[] | F01 |
| `buildPractice(kind, progress)` | Fehler / fällige Wörter / Hören | App | Art | Exercise[] | F03 |
| `checkAnswer(ex, input)` | prüft, toleriert Tippfehler, Akzente, je/jij | App | Aufgabe, Eingabe | Result | F01 |
| `applyResult(progress, session)` | XP, Streak, SRS, Fehlerliste | App | Sitzung | Progress | F01, F03 |
| `store.load/save` | localStorage + db-Sync | App | Progress | – | alle |

Webhooks in: keine. Webhooks out: keine. Jobs: keine (Fälligkeiten werden beim Öffnen berechnet).

## The parts that bite

- Zeitzonen: Streak und Tages-XP nach **lokalem** Kalendertag (`yyyy-mm-dd` aus lokaler Zeit), nie UTC.
- Antwortprüfung: richtige Alternativen dürfen nie abgelehnt werden → Alternativen pro Satz,
  Normalisierung (Groß/klein, Satzzeichen, je/jij/jou, m'n/mijn), Akzent- und Tippfehler-Toleranz,
  dazu „Meine Antwort war richtig“ als Notausgang, der die Antwort dauerhaft akzeptiert.
- Ablenker in Wortbank und Auswahl dürfen keine zweite richtige Lösung bilden → Ablenker nie aus
  den akzeptierten Lösungen oder ihren Varianten; Plural-Ablenker per Rechtschreibprüfung gefiltert.
- Inhaltsfehler: Rechtschreibprüfung NL+DE, Glossar-Abdeckung jedes Tokens, de/het-Kongruenz,
  Adjektivendungen, Verbkongruenz nach Pronomen – als Tests, die den Build stoppen.
- Audio: nicht jedes System hat eine niederländische Stimme → erkennen, Höraufgaben sonst weglassen.
- Mikrofon: im Artifact-Rahmen gesperrt → Sprechübungen dort aus, mit Hinweis.
- Speicher: localStorage kann leer zurückkommen → try/catch; Export/Import als Datei.
- db-Sync: Dokument ≤ 256 KiB → Fehlerliste begrenzt, SRS kompakt; „last writer wins“ nach `updatedAt`.

## Build order

1. Vertical slice: S01 Pfad → S03 Lektion (Wortbank NL↔DE) → S04 Abschluss, Unit 1, localStorage.
2. Must-haves: alle Übungstypen, Hinweise, Audio, Feedback, Wiederholen falscher Aufgaben, XP,
   Streak, Tagesziel, Guidebook (S02), Kursinhalt Sektion 1–5.
3. Should-haves: Üben (S05), Wörter (S06), Profil (S07), Geschichten (S12), Unit-Test, Springen
   (S14), Herzen optional, Einstellungen (S11), Sprechen.
4. Fixes aus replica-entrepreneur: Grammatik zu jeder Unit, keine Herzen-Sperre als Standard,
   Konjugations- und Artikeltrainer, „Antwort war richtig“, Fortschritt exportieren.
