## Parity: 97.4 / 100

features 97.4  (41 counted, must-haves 21 of 22 done)

Not shippable yet: 1 must-have features are not done.

## By area, weakest first
- lektion                       93.2  (9 features)
- übungen                       96.6  (10 features)
- lernpfad                     100.0  (6 features)
- motivation                   100.0  (5 features)
- daten                        100.0  (1 features)
- üben                         100.0  (3 features)
- wörter                       100.0  (1 features)
- profil                       100.0  (3 features)
- geschichten                  100.0  (1 features)
- einstellungen                100.0  (2 features)

## Missing, in build order
- [must] lektion: Audio Niederländisch normal und langsam, partial  (Sprachausgabe des Browsers; braucht eine installierte niederländische Stimme, sonst Hinweis)
- [should] übungen: Übung: Sprechen (Spracherkennung), partial  (Web-Spracherkennung in Chrome/Edge/Safari; im claude.ai-Artifact sperrt der Rahmen das Mikrofon, dort wird die Übung übersprungen)

## Left out on purpose (not scored)
- Ligen und Ranglisten: braucht das Netzwerk anderer Lernender – gehört Duolingo
- Freunde und Feed: Netzwerk – nicht klonbar und für eine Person sinnlos
- Shop und Gems: Monetarisierung – für persönliche Nutzung sinnlos
- Abo und Werbung: Monetarisierung – bewusst weggelassen
- Push-Erinnerungen: braucht Server und Push-Dienst

## Yours, not in the original (not scored)
- Grammatik-Drill: Verben konjugieren (Präsens/Perfekt/Imperfekt)
- Artikeltrainer de/het
- Plural-Übung

## Layout-Vergleich

Nicht durchgeführt. Der Recon nutzte öffentliche Beschreibungen und Hilfeseiten
(siehe `recon.md`), keine eigenen Screenshots des Originals, und die Original-App
wurde bewusst nicht automatisiert aufgerufen. Taalfiets übernimmt nur die
Struktur (Lernpfad in der Mitte, Navigation links bzw. unten, Fortschritt rechts),
Farben, Logo, Schrift und Texte sind eigene.

## Verhalten im Vergleich

| Flow | Original | Taalfiets | Bewertung |
| --- | --- | --- | --- |
| F01 Lektion | Audio immer da (Aufnahmen/eigene TTS) | Sprachausgabe des Browsers; ohne niederländische Stimme stumm mit Hilfe statt falscher Aussprache | Lücke, Umgebungsgrenze (siehe unten) |
| F01 Lektion | Herzen bzw. Energie begrenzen das Lernen ohne Abo | Herzen optional, standardmäßig aus | bewusst besser für Selbstlerner |
| F01 Antworten | Tippfehler-Toleranz | Tippfehler-Toleranz, aber nie, wenn der Tippfehler eine andere echte Form ist (*werkt* statt *werk*); Einspruch speichert die eigene Antwort dauerhaft | besser |
| F02 Grammatik | Guidebook mit kurzen Tipps, nicht in allen Kursen | 153 Grammatik-Tipps mit Tabellen und Beispielen, auf Deutschsprachige zugeschnitten (falsche Freunde, Wortstellung) | besser |
| F03 Üben | Fehler, Wörter, Hören (Teile nur im Abo) | Fehler, fällige Wörter (Leitner 1–6), Hören, Sprechen, Artikeltrainer, Verbtrainer – alles frei | besser |
| F06 Einstufung | Einstufungstest am Anfang | Einstufung pro Abschnitt jederzeit („Hierher springen“) | gleich |
| Daten | Konto, Server | Browser plus privates Dokument im claude.ai-Konto, Sicherung als Datei | gleichwertig für eine Person |

## Was eine Stufe höher bringen würde

1. Eigene Audioaufnahmen (oder eine eingebettete neuronale Stimme) für alle 1.329 Sätze und 1.230 Wörter. In dieser Umgebung nicht möglich: Hugging Face und GitHub-Releases sind gesperrt, kein npm- oder PyPI-Paket enthält eine niederländische Stimme.
2. Sprechaufgaben im claude.ai-Artifact: der Rahmen sperrt das Mikrofon; außerhalb (lokal mit `npm run dev`) funktionieren sie in Chrome, Edge und Safari.

## Urteil

**Nach den Replica-Kriterien noch nicht „shippable“**: ein Muss-Feature (Audio) ist nur teilweise erfüllt,
weil es vom Gerät abhängt. Keine offenen S1- oder S2-Fehler (alle sechs gefundenen sind behoben, siehe `bugs.md`).
Für den eigentlichen Zweck – Niederländisch lernen in Chrome, Edge oder Safari, die alle niederländische
Stimmen mitbringen – ist alles vorhanden, und in Grammatik, Übungsvielfalt und Antwortprüfung geht
Taalfiets über das Original hinaus.
