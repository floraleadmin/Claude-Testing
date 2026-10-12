# Komponenten (Taalfiets)

Alle Farben über Tokens (`src/styles.css`, gespiegelt aus `tokens.json` / `tokens-dark.json`).
Schriften: Baloo 2 (Display, Überschriften, Zahlen), Lexend (Fließtext, Kacheln). Icons: Lucide.

```
Button (.btn)
  variants  primary (accent), secondary (surface + border), delft, ghost, success, danger
  sizes     md 48px, lg 56px (Lektions-Fußleiste)
  states    default, hover (heller), active (2px nach unten, Kante weg), focus-visible (3px Ring delft),
            disabled (locked-Farben, keine Kante)
  tokens    bg accent, text on-accent, Kante accent-strong (box-shadow 0 4px), radius md, font sm/700 uppercase
  a11y      echtes <button>, sichtbarer Fokus, Tastatur Enter/Leertaste
  used on   S01, S03, S04, S05, S11, S14

PathNode (.node)
  variants  lesson (Stern), story (Buch), test (Pokal), jump (Doppelpfeil)
  states    locked (grau, Schloss), current (Unit-Farbe, Ring + „START“-Blase), done (Unit-Farbe, Haken)
  size      72px rund, 3D-Kante 6px
  a11y      <button> mit aria-label „Lektion 2 von 5, Unit 3: Familie, erledigt“
  used on   S01

UnitBanner
  tokens    bg unit-n, text on-unit, radius lg
  content   „Sektion 1 · Unit 3“, Titel, Guidebook-Button (Buch-Icon)
  used on   S01

Tile (Wortbank-Kachel)
  states    in bank, used (Platzhalter grau, gleiche Breite), in answer, pressed
  tokens    bg surface, border border, Kante border (0 2px), radius sm
  a11y      <button>, Ziffern 1–9 wählen am Desktop
  used on   S03

ChoiceCard
  variants  bild+wort (Emoji groß), nur Text
  states    default, selected (delft-Rahmen + Hintergrund), correct, wrong
  a11y      role=radio in role=radiogroup, Ziffern als Tastenkürzel
  used on   S03

PairTile (Paare)
  states    default, selected, matched (deaktiviert, ausgegraut), wrong (kurz rot, Shake bei reduzierter Bewegung aus)
  used on   S03

SpeakerButton
  variants  normal (Lautsprecher), langsam (Schildkröte)
  states    idle, playing, unavailable (ausgeblendet)
  used on   S03, S02, S06, S12

FeedbackSheet (Fußleiste nach Prüfen)
  variants  correct (success-bg), wrong (danger-bg), almost (warning-bg: Tippfehler/Akzente)
  content   Überschrift, richtige Lösung, Übersetzung, „Meine Antwort war richtig“, Weiter
  a11y      role=status, Fokus springt auf „Weiter“
  used on   S03

HintPopover (Wort-Hinweis)
  content   Wort(e) → Bedeutungen, Grundform
  a11y      Wörter sind <button>, Popover schließt mit Esc / Klick daneben
  used on   S03, S12

ProgressBar
  variants  lesson (accent), goal (warning), strength (success, 5 Segmente)
  a11y      role=progressbar mit aria-valuenow

Modal / ConfirmDialog
  a11y      role=dialog, aria-modal, Fokus gefangen, Esc schließt
  used on   S03 (Lektion beenden?), S11 (Fortschritt zurücksetzen?)

NavBar
  variants  Seitenleiste ≥ 900px, untere Tab-Leiste < 900px
  items     Lernen, Üben, Wörter, Profil, Einstellungen

StatChip (Topbar)
  variants  Streak (Flamme), XP heute/Ziel, Herzen (nur im Herzen-Modus)
```
