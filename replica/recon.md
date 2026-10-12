# Recon map: Duolingo (Web + Mobile-Web)

Scope: Der Lernkern – Lernpfad mit Units und Lektionen, alle für das Lernen
wichtigen Übungstypen, Grammatik-Guidebooks, Üben (Fehler, Wörter, Hören),
Geschichten, Streak/XP/Tagesziel, Profil-Statistik.
Für: Eine Person mit Deutsch als Muttersprache, die Niederländisch wirklich
lernen will (A1 bis Einstieg B1). Persönliche Nutzung, kein Verkauf.
Date: 2026-10-12

Clean-Room: Funktionsweise und UX-Muster aus öffentlichen Quellen. Kein Code,
keine Grafiken, keine Sounds, keine Texte, keine Kursinhalte von Duolingo.
Alle Lerninhalte werden neu geschrieben.

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | Duolingo Blog: Duolingo 101 | https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo | Pfad, Herzen, Streak, Super |
| 2 | Duolingo Blog: neues Home-Design | https://blog.duolingo.com/new-duolingo-home-screen-design | Pfad mit Units, Guidebook-Icon oben rechts an jeder Unit |
| 3 | Duolingo Blog: Practice Hub | https://blog.duolingo.com/guide-to-duolingo-practice-hub/ | Fehler wiederholen, Stories, gezielte Wiederholung aus eigener Aktivität |
| 4 | Duolingo Blog: Wege zu üben | https://blog.duolingo.com/ways-to-practice-in-duolingo | Üben ohne neue Inhalte |
| 5 | Duolingo Wiki (Community): Exercise | https://duolingo.fandom.com/wiki/Exercise | Übungstypen: Paare, Übersetzen, Wörter ordnen, Hören & Tippen |
| 6 | Duolingo Blog: Hörverstehen | https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-listening-skills/ | „Tap what you hear“ mit Wortbank |
| 7 | Duolingo Blog: Lernen mit Hörgeräten | https://blog.duolingo.com/learning-with-hearing-aids/ | Hör-/Sprechübungen abschaltbar, Paare mit Lautsprecher |
| 8 | GIGA: Welche Sprachen gibt es? | https://www.giga.de/artikel/duolingo-welche-sprachen-gibt-es/ | Von Deutsch aus nur EN/FR/ES/IT – **kein Niederländisch für Deutschsprachige** |
| 9 | Trustpilot (UK), Seite 4 | https://uk.trustpilot.com/review/duolingo.com?page=4 | Beschwerden: Grammatik entfernt, Energie/Herzen |
| 10 | Mumsnet-Thread | https://www.mumsnet.com/talk/_chat/4932186-duolingo-changes | Wenig Grammatikerklärung, Herzen bremsen das Üben |

Kein Login in fremde Konten, kein Scraping, kein Code oder Netzwerkverkehr von
Duolingo gelesen.

## Core loop

Jeden Tag eine oder mehrere kurze Lektionen (10–15 Aufgaben) auf dem
Lernpfad abschließen, dabei XP sammeln und den Streak halten.

## Screens

| ID | screen | route / how to reach | purpose | key components | states seen |
| --- | --- | --- | --- | --- | --- |
| S01 | Lernpfad | Start / Tab „Lernen“ | Units und Lektionen der Reihe nach | Unit-Banner, Guidebook-Button, runde Lektions-Knoten, Sektions-Trenner, Topbar (Streak, XP, Herzen) | gesperrt, aktiv, erledigt, Unit fertig, Sektion gesperrt |
| S02 | Guidebook | Buch-Icon im Unit-Banner | Grammatik-Tipps und Schlüsselsätze der Unit | Tipp-Karten, Beispielsätze mit Audio | normal |
| S03 | Lektion | Knoten antippen → Start | Aufgaben lösen | Fortschrittsbalken, Herzen, Aufgabe, Wortbank, Prüfen-Button, Feedback-Leiste | leer, Auswahl, richtig, falsch, Tippfehler, keine Herzen |
| S04 | Lektion fertig | nach letzter Aufgabe | Belohnung, Statistik | XP, Genauigkeit, Zeit | perfekt, mit Fehlern |
| S05 | Üben | Tab „Üben“ | Fehler, Wörter, Hören wiederholen | Karten pro Übungsart | nichts zu üben, verfügbar |
| S06 | Wörter | Tab / Üben | Gelernte Wörter mit Audio | Suchfeld, Liste, Stärke-Balken | leer, gefüllt |
| S07 | Profil | Tab „Profil“ | Statistik, Erfolge | Kennzahlen, Wochen-XP, Abzeichen | neu, aktiv |
| S08 | Streak / Tagesziel | Flammen-Icon | Serie, Tagesziel einstellen | Kalender, Zielwahl | Serie 0, laufend |
| S09 | Rangliste | Tab „Ligen“ | Wettbewerb mit anderen | Liga-Tabelle | – |
| S10 | Shop | Tab | Gems ausgeben | – | – |
| S11 | Einstellungen | Profil → Zahnrad | Ton, Hören/Sprechen an/aus, Ziel | Schalter | – |
| S12 | Geschichten | Pfad / Üben | Kurze Dialoge mit Verständnisfragen | Zeilen mit Audio, Fragen | – |
| S13 | Onboarding | erster Start | Ziel, Einstieg wählen | Zielwahl, Einstufung | – |
| S14 | Einstufung / Springen | „Hierher springen?“ am Sektionsstart | Bekannte Units überspringen | Test-Lektion | bestanden, nicht bestanden |

## Flows

```
F01 Tägliche Lektion
    S01 -> S03 (10–15 Aufgaben) -> S04 -> S01
    happy path clicks: 1 (Knoten) + 1 (Start) + ~2 je Aufgabe + 1 (Weiter)
    edge: Fehler -> Aufgabe kommt am Ende wieder; Tippfehler -> wird akzeptiert mit Hinweis;
          Lektion abbrechen -> Bestätigung; keine Audio-Stimme -> Höraufgaben entfallen
F02 Grammatik nachlesen
    S01 -> S02 -> S01
    happy path clicks: 2
F03 Fehler / Wörter üben
    S05 -> S03 (aus eigenen Fehlern bzw. fälligen Wörtern) -> S04
    edge: noch nichts gelernt -> leerer Zustand mit Hinweis
F04 Geschichte lesen
    S01/S05 -> S12 -> Fragen -> S04
F05 Fortschritt ansehen
    S07, S06, S08
F06 Einstufung / Springen
    S01 (gesperrte Unit) -> S14 -> bestanden: alle Units davor gelten als erledigt
F07 Einstellungen ändern
    S11: Tagesziel, Ton, Hör- und Sprechübungen, Stimme, Theme, Fortschritt sichern
```

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Button (3D-Taste) | primär, sekundär, Geist, Gefahr, richtig, falsch | default, hover, active (gedrückt), focus, disabled | alle |
| Topbar-Statistik | Streak, XP, Herzen | 0, aktiv | S01, S05, S06, S07 |
| Pfad-Knoten | Lektion, Geschichte, Unit-Test | gesperrt, aktiv, erledigt | S01 |
| Unit-Banner | – | aktiv, gesperrt, fertig | S01 |
| Fortschrittsbalken | Lektion, Tagesziel, Wortstärke | 0–100 % | S03, S07, S06 |
| Wort-Kachel (Wortbank) | Bank, Antwortzeile | verfügbar, benutzt, gedrückt | S03 |
| Auswahl-Karte | Bild+Wort, nur Text | default, ausgewählt, richtig, falsch | S03 |
| Paar-Kachel | – | default, ausgewählt, gelöst, falsch (Shake) | S03 |
| Lautsprecher-Button | normal, langsam | spielt, nicht verfügbar | S03, S02, S06 |
| Feedback-Leiste | richtig, falsch, Tippfehler | – | S03 |
| Wort-Hinweis (Tooltip) | – | offen, geschlossen | S03, S12 |
| Modal | Bestätigung | – | S03, S11 |
| Tab-Navigation | unten (Mobil), Seite (Desktop) | aktiv | alle außer S03 |

## Inferred data model

```
Course     Sektionen -> Units -> Lektionen
           evidence: S01, Quelle 2
           confidence: high
Unit       id, title, guidebook (tips, key phrases), words, sentences
           evidence: S01, S02, Quelle 2
           confidence: high
Exercise   type (translate, select, match, listen, speak, ...), prompt, answers, options
           evidence: S03, Quellen 5, 6
           confidence: high
Progress   xp_total, xp_by_day, streak, last_active_day, daily_goal, lessons_done,
           word_strength, mistakes[], hearts
           evidence: S01, S04, S07, S08, Quelle 1
           confidence: medium (Gewichtung der Wortstärke ist geraten)
```

Relationships: Course 1-n Section 1-n Unit 1-n Lesson; Unit 1-n Word, 1-n Sentence;
Progress 1-n Mistake, 1-n WordState.

## Feature matrix

See `features.csv`. Must: 22, should: 12, could: 6, skip: 5.

## Out of scope (cannot or should not be cloned)

- Ligen, Freunde, Feed: das Netzwerk anderer Lernender gehört Duolingo.
- Shop, Gems, Abos, Werbung: Monetarisierung, für persönliche Nutzung sinnlos.
- Duolingos Kursinhalte, Figuren (Duo, Lily …), Illustrationen, Sounds, Schriften.
- Video-Call/KI-Rollenspiel (Max): braucht Server und Lizenz-KI.
- Push-Benachrichtigungen: brauchen Server; Streak-Erinnerung entfällt.

## Size

Screens 14 (davon 12 im Scope), flows 7, entities 5.
Hard parts: (1) **Kursinhalt A1–B1 ohne Fehler** – der eigentliche Aufwand;
(2) Antwortprüfung, die richtige Alternativen nicht ablehnt (Wortstellung,
je/jij, Tippfehler); (3) Audio ohne eigene Aufnahmen (Browser-Sprachausgabe
nl-NL); (4) Spaced Repetition.
Size: M (ein paar Wochen Arbeit für eine Person, vor allem Inhalte).
