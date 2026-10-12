# Fehlerliste: Taalfiets

Nur reproduzierte Fehler. Jeder behobene Fehler hat einen Test, der ohne die Korrektur fehlschlägt
(bei BUG-006 ausdrücklich geprüft: Korrektur entfernt → Test rot, Korrektur zurück → grün).

### BUG-001: Deaktivierter „Prüfen“-Knopf sah aktiv aus

- Schweregrad: S3
- Flow / Fall: F01 / F01-N1
- Bildschirm: S03 Übung
- Build: f0ca7f5  Browser: Chromium 141, 390 px

Schritte
1. Lektion starten, Schreibaufgabe erscheint.
2. Nichts eingeben.

Erwartet: „Prüfen“ ist grau und als deaktiviert erkennbar.
Ist: „Prüfen“ war voll grün; ein Klick tat nichts.
Beleg: Screenshot `jump-ex1.png` aus dem Artifact-Build.
Ursache: `.btn.success` stand in der CSS nach `.btn:disabled` und hatte dieselbe Spezifität.
Status: behoben in f0ca7f5 (Regel nach die Farbvarianten verschoben; „Prüfen“ nutzt jetzt die Akzentfarbe).

### BUG-002: Artikeltrainer hätte „het wifi“ als falsch gewertet

- Schweregrad: S3
- Flow / Fall: F03, Artikeltrainer
- Build: 46ff7d2

Erwartet: Wörter mit zwei üblichen Artikeln (de/het wifi) werden nicht als de-oder-het-Frage gestellt.
Ist: Das Datenmodell kannte nur einen Artikel.
Status: behoben in 46ff7d2 (`N('de/het wifi', …)`, Feld `bothArts`, Unit-Test).

### BUG-003: Zu wenig Kontrast bei Kapitelbannern, Neu-Badge und Feedback

- Schweregrad: S3
- Flow / Fall: X-A1
- Bildschirme: S01 Lernpfad, S03 Übung
- Build: 02a7329

Schritte: axe-Scan (WCAG 2.1 AA) auf dem Lernpfad und in der Übung.
Erwartet: mindestens 4,5:1 für Text.
Ist: Kapitel-Eyebrow 4,17:1 (Deckkraft 0,85), gesperrte Kapitel 3,12:1, „Neu“-Badge 3,97:1, Bedeutung im Feedback 4,22:1, Tipps-Knopf im gesperrten Banner 3,97:1.
Beleg: Test `main screens open without errors and pass an accessibility scan (light|dark)`.
Status: behoben in 02a7329 (keine Deckkraft auf Text, `--on-locked` #4a5568, neues Token `--accent-ink`).

### BUG-004: Ohne niederländische Stimme las eine deutsche Stimme Niederländisch vor

- Schweregrad: S2 (lehrt falsche Aussprache)
- Flow / Fall: F01 / F01-E5
- Build: 02a7329  Browser: jeder ohne installierte niederländische Stimme (z. B. Firefox unter Windows)

Schritte
1. Browser ohne niederländische Stimme.
2. Lektion starten, Lautsprecher antippen.

Erwartet: keine falsche Aussprache; Hinweis, wie man eine Stimme bekommt.
Ist: Der Browser nahm seine Standardstimme (Deutsch) für niederländischen Text; Höraufgaben waren nicht lösbar.
Beleg: Test `without a Dutch voice nothing is read aloud and listening tasks are left out`.
Status: behoben in 02a7329 (stumm statt falsch, Höraufgaben entfallen, Hilfe-Dialog und Hinweis in den Einstellungen).

### BUG-005: Beliebige JSON-Datei löschte beim Wiederherstellen den Fortschritt

- Schweregrad: S1 (Datenverlust)
- Flow / Fall: F07 / F07-N1
- Bildschirm: S11 Einstellungen
- Build: bb19e05

Schritte
1. Eine Lektion abschließen.
2. Einstellungen → „Oder Sicherungstext hier einfügen“: `{"hallo": 1}` → „Text wiederherstellen“.

Erwartet: Fehlermeldung, Fortschritt bleibt.
Ist: `migrate()` füllte fehlende Felder mit Standardwerten auf, die Prüfung `createdAt` war damit immer wahr; der Fortschritt wurde durch einen leeren ersetzt und die App sprang zum Willkommensbildschirm.
Beleg: Test `progress can be saved to a file, deleted and restored`.
Status: behoben in bb19e05 (`isProgress()` prüft Rohdaten, auch für Kopien aus anderen Tabs und aus der Cloud).

### BUG-006: Zweiter Tab überschrieb den Fortschritt des ersten

- Schweregrad: S1 (Datenverlust)
- Flow / Fall: X-E1
- Build: bb19e05

Schritte
1. App in Tab A und Tab B öffnen.
2. In Tab A Lektion 1 abschließen.
3. In Tab B (unverändert offen) Lektion 2 abschließen.
4. Tab A neu laden.

Erwartet: Lektion 1 und 2 erledigt.
Ist: Lektion 1 fehlte; Tab B speicherte seinen alten Stand über den neuen.
Beleg: Test `two open tabs never overwrite each other’s progress` (ohne Korrektur rot).
Status: behoben in bb19e05 (`storage`-Ereignis, neuerer Stand wird übernommen).

## Inhaltsfehler aus dem Korrekturlesen

| Kapitel | Fehler | Korrektur | Commit |
| --- | --- | --- | --- |
| 47 | Akzeptierte deutsche Alternative „Darf ich ein Foto von dich machen?“ | gestrichen | 46ff7d2 |
| 42 | Ablenker „geen“ in *Ik heb {noch} tijd noch geld* ist ebenfalls korrekt („geen tijd noch geld“) | Ablenker „nog“, „ook“ | 46ff7d2 |
| 43 | Ablenker „plek“ in *In jouw {plaats}* ist umgangssprachlich möglich | „tijd“, „stad“ | 46ff7d2 |
| 43 | *Zouden jullie stiller kunnen praten?* unidiomatisch | *Zouden jullie wat stiller kunnen zijn?* | 46ff7d2 |
| 50 | *Sinterklaas komt op vijf december* mehrdeutig (Einzug ist Mitte November, gefeiert wird am 5.) | *Op vijf december vieren we Sinterklaas.* | 46ff7d2 |
| 50 | Absichtlich falsche Option „oranjes“ ist ein echtes Wort | Optionen „rood“, „groen“ | 46ff7d2 |
| 46 | „Das Kaninchen isst“ für Tiere | „frisst“ | 46ff7d2 |

## Zu prüfen (nicht reproduziert)

- Sprachausgabe auf echten Geräten (Windows/Firefox ohne Sprachpaket, Android ohne Sprachdaten): Verhalten folgt dem getesteten Pfad „keine Stimme“, aber nur mit simulierten Stimmenlisten geprüft.
