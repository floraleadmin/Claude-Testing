# Taalfiets – Niederländisch lernen auf Deutsch

Eine Lern-App im Stil der bekannten Sprach-Apps, gebaut für Deutschsprachige, die Niederländisch
wirklich lernen wollen: vom ersten „Hallo“ bis zum Einstieg in B1.

## Umfang

| | |
| --- | --- |
| Abschnitte | 5 (A1 → A2 → Einstieg B1) |
| Kapitel | 50, je 3–5 Lektionen, eine Geschichte und ein Kapiteltest |
| Wörter | 1.230 mit Artikel, Plural, Verbformen (Präsens, Imperfekt, Partizip, Hilfsverb) |
| Sätze | 1.329 Übersetzungssätze mit erlaubten Varianten in beiden Sprachen |
| Lückentexte | 347 |
| Geschichten | 50 Dialoge mit Verständnisfragen |
| Grammatik | 153 Tipps mit Tabellen und Beispielen |

**Übungen:** Wort mit Bild, Paare zuordnen, Sätze mit Wortbank (NL→DE und DE→NL), Sätze tippen,
Hören und antippen, Diktat, Lückentext, Übersetzung wählen, de oder het, Verben konjugieren,
Plural, Sprechen.

**Drumherum:** Wort-Hinweise beim Antippen, Vorlesen normal und langsam, Fehler kommen am Ende der
Lektion wieder, Wiederholung nach Leitner-System (6 Stufen), Üben (eigene Fehler, fällige Wörter,
Hören, Sprechen, Artikel, Verben), XP, Tagesziel, Serie, Tagesaufgaben, Abzeichen, Lernkalender,
Einstufungstest, Wörterliste mit Suche, hell und dunkel, Tastaturbedienung.

**Antwortprüfung:** Groß- und Kleinschreibung, Satzzeichen, fehlende Akzente, *je/jij*, *we/wij*,
*m'n/mijn* und ß/ss werden toleriert, Tippfehler auch – außer wenn der Tippfehler selbst ein
anderes niederländisches Wort ist. Mit „Meine Antwort war richtig“ wird eine eigene Antwort für
immer akzeptiert.

## Starten

Voraussetzung: Node.js 20.19 oder 22.12 und neuer (für Vite 8).

```bash
npm install
npm run dev          # http://localhost:5173
```

Der Fortschritt liegt im Browser (localStorage). In den Einstellungen lässt er sich als Datei
sichern und auf einem anderen Gerät laden.

## Prüfen

```bash
npm run typecheck
npm test                                  # Unit-Tests: Antwortprüfung, Fortschritt, alle 50 Kapitel
npm run build && npm run e2e              # Playwright, Desktop und Mobil (vorher: npx playwright install chromium)
pip install spylls && npm run check:content   # Inhaltsprüfung
```

`check:content` prüft jede Zeile des Kurses: jedes niederländische Wort muss im Kurs-Wörterbuch
stehen, beide Sprachen laufen durch Hunspell (Wörterbücher aus `dictionary-nl` und
`dictionary-de`), dazu Regeln für Artikel, Adjektivendungen, Verbformen und Wortstellung.
Absichtlich falsche Antwortoptionen dürfen keine echten Wörter sein.

## Als claude.ai-Artifact

```bash
npm run build:single   # schreibt dist-single/taalfiets.html
```

Die Datei enthält die ganze App. Im Artifact wird der Fortschritt zusätzlich in einem privaten
Dokument des eigenen claude.ai-Kontos gespeichert und folgt so auf andere Geräte.

## Grenzen

- **Audio** kommt aus der Sprachausgabe des Browsers. Chrome, Edge und Safari bringen
  niederländische Stimmen mit. Fehlt eine, liest Taalfiets nichts vor (statt mit deutscher Stimme
  falsch auszusprechen), lässt Höraufgaben aus und erklärt, wie man eine Stimme installiert.
- **Sprechaufgaben** brauchen die Spracherkennung des Browsers (Chrome, Edge, Safari). Im
  claude.ai-Artifact sperrt der Rahmen das Mikrofon; dort werden sie übersprungen.
- **Bewusst weggelassen:** Ligen, Freunde, Shop, Abo, Werbung, Push-Erinnerungen.

## Projekt

```
src/content/      Kursinhalte (s1–s5: je 10 Kapitel), DSL in dsl.ts
src/lib/          Übungen, Antwortprüfung, Wiederholung, Speicher, Sprachausgabe
src/screens/      Lernpfad, Lektion, Geschichte, Üben, Wörter, Profil, Einstellungen
scripts/          Inhaltsprüfung, Plural-Ablenker, Artifact-Build
tests/, e2e/      Unit- und Browser-Tests
replica/          Planung und Prüfung mit dem Replica-Skill-Pack
```

Gebaut mit dem [Replica-Skill-Pack](https://github.com/Jakeschincariol/replica-skill) (MIT, in
`.claude/skills/`): Recon, Architektur, Design, Build, Test, Parität, Marke. Die Ergebnisse stehen
in `replica/` – Testplan, Fehlerliste, Paritätsbericht. Alle Inhalte, Texte und Grafiken sind
eigens geschrieben; nichts stammt aus anderen Apps.
