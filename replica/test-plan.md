# Testplan: Taalfiets

Build: bb19e05  Datum: 2026-10-12  Umgebung: lokal (`vite preview`), Chromium 141, Desktop 1440×900 und Pixel 7

Automatisiert: `npm test` (Vitest, 25 Tests) und `npm run e2e` (Playwright, 18 Läufe = 9 Tests × Desktop/Mobil).
Inhalte: `npm run check:content` prüft jedes niederländische Wort gegen das Kurs-Wörterbuch,
beide Sprachen mit Hunspell, Grammatikregeln, Ablenker und Lückentexte.

| Fall | Flow | Art | Schritte | Erwartet | Auto | Ergebnis |
| --- | --- | --- | --- | --- | --- | --- |
| F01-H1 | Tägliche Lektion | happy | Start → Kapitel 1, Lektion 1 → alle Aufgaben richtig → Weiter | Ergebnis mit XP, Lektion erledigt, Lektion 2 frei, Serie 1 Tag | e2e `first lesson` | ok |
| F01-H2 | | happy: ganzes Kapitel | alle Lektionen, Geschichte, Kapiteltest | Kapiteltest erledigt, nächstes Kapitel frei, jeder Übungstyp kam vor | e2e `a whole chapter` | ok |
| F01-H3 | | happy: späte Inhalte | Einstufung Abschnitt 5 bestehen → Kapitel 41 komplett | alle Knoten erledigt, ≥ 5 Übungstypen | e2e `placement test into section 5` | ok |
| F01-E1 | | edge: falsche Antwort | Schreibaufgabe falsch beantworten | rote Leiste mit Lösung, Aufgabe kommt am Ende wieder, zählt als Fehler unter Üben | e2e `a wrong answer comes back` | ok |
| F01-E2 | | edge: Tippfehler, fehlende Akzente, ß/ss, Pronomen-Varianten | | als richtig mit Hinweis; ein Tippfehler, der ein anderes Wort ergibt, ist falsch | unit `answer.test.ts` | ok |
| F01-E3 | | edge: Neu laden mitten in der Lektion | F5 während Aufgabe 5 | Lernpfad unverändert, Lektion beginnt neu, nichts halb gespeichert | manuell | ok |
| F01-E4 | | edge: Doppelklick auf Prüfen / Weiter | | wird einmal gewertet, keine Aufgabe übersprungen (`check`/`next` prüfen den Zustand) | Code-Review | ok |
| F01-E5 | | edge: keine niederländische Stimme | Browser meldet nur deutsche Stimmen | nichts wird vorgelesen, keine Höraufgaben, Hilfe zum Installieren einer Stimme | e2e `without a Dutch voice` | ok (nach BUG-004) |
| F01-E6 | | edge: Sitzung abbrechen | X → Bestätigung | Rückfrage, danach Lernpfad ohne Änderung | manuell | ok |
| F01-E7 | | edge: Mobilbreite, nur Tastatur | Pixel 7; Enter prüft, Ziffern wählen | bedienbar, kein waagrechtes Scrollen | e2e (Mobil-Projekt) + manuell | ok |
| F01-N1 | | negativ: leere Antwort | Prüfen ohne Eingabe | Knopf deaktiviert und sichtbar grau | manuell, Screenshot | ok (nach BUG-001) |
| F02-H1 | Grammatik nachlesen | happy | Kapitelbanner → Tipps | Grammatik und Wortliste des Kapitels | e2e `main screens` | ok |
| F03-H1 | Fehler üben | happy | Fehler machen → Üben → Fehler wiederholen | Sitzung aus den eigenen Fehlern | e2e `a wrong answer comes back` | ok |
| F03-E1 | | edge: noch nichts gelernt | frischer Start → Üben, Wörter | leere Zustände mit Hinweis statt Fehler | manuell | ok |
| F04-H1 | Geschichte lesen | happy | Geschichte im Kapitel 1 | Zeilen nacheinander, Fragen müssen richtig beantwortet werden | e2e `a whole chapter` | ok |
| F05-H1 | Fortschritt ansehen | happy | Profil, Wörter | Statistik, Kalender, Abzeichen, Wortstärke | e2e `main screens` | ok |
| F06-H1 | Einstufung | happy | „Ich kann schon etwas“ → Abschnitt 5 | höchstens 3 Fehler → Abschnitte 1–4 gelten als erledigt | e2e `placement test` | ok |
| F06-N1 | | negativ: 4. Fehler | | Test endet, nichts wird übersprungen | Code-Review (`maxMistakes`) | ok |
| F07-H1 | Einstellungen | happy | Ziel, Ton, Hören, Sprechen, Stimme, Theme | sofort wirksam, gespeichert | manuell | ok |
| F07-H2 | | happy: Sicherung | Als Datei sichern → Fortschritt löschen → Datei laden | Fortschritt wieder da | e2e `saved to a file, deleted and restored` | ok |
| F07-N1 | | negativ: falsche Datei | beliebiges JSON laden | Fehlermeldung, Fortschritt unverändert | e2e (gleicher Test) | ok (nach BUG-005) |
| X-E1 | alle | edge: zwei Tabs | Lektion in Tab A, andere Lektion in Tab B | beide Lektionen bleiben erledigt | e2e `two open tabs` | ok (nach BUG-006) |
| X-E2 | alle | edge: Speicher blockiert (privates Fenster) | localStorage wirft | App läuft, Fortschritt nur in der Sitzung bzw. in der Cloud | Code-Review (`try/catch`) | ok |
| X-E3 | alle | edge: Datum, Zeitzone | Lernen um 23:59 und 00:01 | Serie zählt nach lokalem Kalendertag | unit `progress.test.ts` | ok |
| X-A1 | alle | Barrierefreiheit | axe WCAG 2.1 AA auf Willkommen, Lernen, Üben, Wörter, Profil, Einstellungen, Grammatik, Übung, Feedback, Ergebnis, Geschichte | keine ernsten oder kritischen Verstöße, hell und dunkel | e2e `accessibility scan` | ok (nach BUG-003) |
| X-C1 | Inhalt | Korrektheit | `npm run check:content` | alle Prüfungen bestanden | Skript | ok |
| X-C2 | Inhalt | Lektionen bauen | jede Lektion und jeder Test aller 50 Kapitel mit 3 Seeds | gültige Aufgaben, Wortbank enthält die Lösung | unit `content.test.ts` | ok |

## Nicht automatisierbar, von Hand geprüft

- Sprachausgabe mit echter niederländischer Stimme (Chrome „Google Nederlands“, Safari „Xander“): hängt vom Gerät ab, die Testumgebung hat keine Stimmen.
- Spracherkennung: im claude.ai-Artifact sperrt der Rahmen das Mikrofon; die App bietet dort „Kann gerade nicht sprechen“ an und zählt Sprechaufgaben nicht als Fehler.
- Speichern im Artifact-Konto: mit einem nachgebauten `window.claude` (user + db) geprüft; Dokument `data/users/<id>/progress` wird geschrieben.
