# Pocket Chips

Poker und Blackjack mit echten Karten – die Chips liegen auf dem Handy.

**Spielen:** https://floraleadmin.github.io/Claude-Testing/pocket-chips/

## So geht's

1. **Neuen Tisch erstellen**: Namen eingeben, Spiel wählen (Poker oder Blackjack), Startchips und Blinds festlegen.
2. **Einladen**: Die anderen scannen den QR-Code oder geben den 6-stelligen Code ein.
3. **Sitzordnung** mit den Pfeilen so einstellen wie am echten Tisch (im Uhrzeigersinn).
4. **Hand starten**. Wer dran ist, sieht unten *Fold · Check/Call · Bet/Raise*. Die Setzrunden enden automatisch, und die App sagt, welche Karten der Dealer als Nächstes aufdeckt.
5. **Showdown**: Jemand tippt den Gewinner an (mehrere antippen = Pot teilen). Bei Side Pots wird jeder Pot einzeln abgefragt, aber nur, wenn es nötig ist.

Weitere Funktionen:

- **Für jemanden setzen**: Hat ein Spieler kein Handy oder keinen Akku mehr, setzt ein anderer für ihn.
- **Rückgängig** (Menü): Macht die letzte Aktion rückgängig.
- **Hand abbrechen**: Bei einem Misdeal gehen alle Einsätze zurück.
- **Spieler & Chips**: Nachkaufen, Chips korrigieren, Pause, Spieler ohne Handy hinzufügen. Pro Spieler wird die Bilanz angezeigt.

### Poker-Regeln (No-Limit Texas Hold'em)

- Blinds inklusive Heads-up-Regel: Der Dealer ist Small Blind und handelt preflop zuerst, postflop zuletzt. Der Big Blind hat die Option.
- Mindest-Raise ist die letzte volle Erhöhung. Ein unvollständiger All-in-Raise öffnet die Setzrunde für Spieler, die schon gehandelt haben, nicht wieder.
- Side Pots werden automatisch gebildet. Nicht gecallte Einsätze gehen zurück. Ungerade Chips beim Split bekommt der erste Gewinner links vom Dealer.
- Sind alle All-in, geht es direkt zum Showdown („Board fertig austeilen“).

### Action-Modus – ideal zu dritt

- **Bomb Pot** jede 3. Hand: Alle zahlen 5 Big Blinds, es gibt keine Blinds, und es geht direkt mit dem Flop los.
- **Blinds steigen** alle 9 Hände (also jede dritte Runde bei drei Spielern).
- **7-2-Bonus**: Wer eine Hand mit 7-2 gewinnt und die Karten zeigt, bekommt 2 Big Blinds von jedem.

Alles ist auch einzeln in den Einstellungen einstellbar, ebenso Ante und „Nächste Hand als Bomb Pot“.

### Blackjack

Echte Karten, ein Dealer teilt aus. Jeder setzt auf seinem Handy, dann tippt jemand auf *Karten geben*.
Möglich sind Verdoppeln, Split (bis 4 Hände) und Versicherung. Die Ergebnisse sind Verloren, Push, Gewonnen oder Blackjack (zahlt 3:2).
Sobald alles eingetragen ist, wird automatisch abgerechnet. Bank ist entweder das Haus oder ein Spieler.
Zwischen Poker und Blackjack lässt sich jederzeit wechseln (zwischen zwei Runden), die Chips bleiben erhalten.

## Technik

- Statische Seite ohne Build-Schritt: `index.html`, `engine.js` (Spielregeln, rein und deterministisch), `sync.js` (Abgleich), `app.js` (Oberfläche).
- Abgleich über drei kostenlose öffentliche MQTT-Broker gleichzeitig (EMQX, HiveMQ, shiftr.io – letzterer über Port 443). Der ganze Spielstand liegt als *retained* Nachricht mit Versionsnummer auf dem Broker. Jedes Gerät übernimmt immer den höchsten Stand und reicht ihn an Broker weiter, die zurückliegen.
- Es gibt keinen Server, an dem die Partie hängt: Das Handy, das gerade etwas tut, berechnet den neuen Stand. Fällt ein Broker aus, laufen die anderen weiter. Ein Broker, der leer neu startet, bekommt den Tisch von den Handys zurück.
- Kollidieren zwei Aktionen, gewinnt eine. Die andere wird automatisch erneut angewendet, wenn sie noch passt.

## Tests

```bash
node --test test/engine.test.js            # Regeln, Side Pots, Blackjack, Fuzz (tausende Hände)
NODE_MODULES_DIR=… node test/e2e.js         # 3 Handys (Playwright) gegen lokale Broker
NODE_MODULES_DIR=… node test/e2e-resilience.js
NODE_MODULES_DIR=… node test/brokers.js     # öffentliche Broker erreichbar?
```

Für die E2E-Tests braucht es `aedes`, `websocket-stream`, `mqtt` und `playwright`. Die GitHub-Action `.github/workflows/pocket-chips.yml` installiert sie, führt alle Tests aus und testet anschließend die veröffentlichte Seite mit den echten Brokern.

## Veröffentlichen

`./deploy.sh` kopiert die App nach `gh-pages:/pocket-chips/`. Andere Seiten auf gh-pages bleiben unberührt.
