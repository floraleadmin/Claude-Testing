# Marke: Taalfiets

## Name

**Taalfiets** – niederländisch *taal* (Sprache) + *fiets* (Fahrrad): „Sprachfahrrad“. Kurz, nach
einmal Hören schreibbar, typisch niederländisch, ohne Anklang an den Namen des Originals.

Geprüft wurde nur, ob im Code etwas vom Original übrig ist (`sweep.py`, sauber). Markenrecht,
Domains, App-Stores und Social-Handles wurden **nicht** geprüft; für eine persönliche App ist das
nicht nötig. Vor einer Veröffentlichung unter diesem Namen:

| Prüfung | Wo | Stand |
| --- | --- | --- |
| EU-Marke | euipo.europa.eu eSearch / TMview | offen |
| DE-Marke | DPMAregister | offen |
| Domain | taalfiets.nl / .de / .app | offen |
| App Store, Play | exakter Name | offen |
| Web | „Taalfiets“ + Sprachen lernen | offen |

## Farben

Orange (#c2410c, Holland-Orange, abgedunkelt für Kontrast) und Delfter Blau (#1f4fa3), dazu je
Kapitelabschnitt eine eigene Farbe. Bewusst kein Grün als Markenfarbe; Grün steht nur für „richtig“.
Alle Paare in `design/tokens.json` und `design/tokens-dark.json` erfüllen WCAG AA
(`contrast.py`: 0 Fehler), die App besteht zusätzlich den axe-Scan in hell und dunkel.

## Logo

Ein Fahrrad mit einer Tulpe im Lenker, als Linienzeichnung in einer Farbe. Eigenes SVG
(`Logo` in `src/components/common.tsx`), funktioniert als 16-px-Favicon. Keine Figur, kein Maskottchen.

## Stimme

Freundlich, klar, ermutigend – nicht kindlich, nicht belehrend.

| so | nicht so |
| --- | --- |
| „Geschafft!“ | „Super-mega-toll!!!“ |
| „Richtig – achte auf die Akzente:“ | „Falsch.“ |
| „Noch keine Wörter. Nach deiner ersten Lektion stehen sie hier.“ | „Keine Daten.“ |
| „Kann gerade nicht hören“ | „Audio deaktivieren“ |
| „Meine Antwort war richtig“ | „Fehler melden“ |
