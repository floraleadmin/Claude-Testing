'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

let seq = 0;
function room(names, cfg, stacks) {
  let s = E.newRoom('TEST01', cfg || {}, { id: 'p0', name: names[0] });
  s.v = 1;
  for (let i = 1; i < names.length; i++) s = ok(s, { type: 'join', pid: 'p' + i, name: names[i] });
  if (stacks) stacks.forEach((v, i) => (s.players[i].stack = v));
  return s;
}
function ok(s, a) {
  const r = E.apply(s, Object.assign({ id: 'a' + ++seq, t: 1 }, a));
  assert.ok(r.ok, `${a.type} ${a.kind || ''} failed: ${r.err}`);
  return r.state;
}
function bad(s, a, re) {
  const r = E.apply(s, Object.assign({ id: 'a' + ++seq }, a));
  assert.equal(r.ok, false, `${a.type} should fail`);
  if (re) assert.match(r.err, re);
  return r;
}
const cur = (s) => s.hand.cur;
const act = (s, kind, to) => ok(s, { type: 'act', pid: cur(s), kind, to });
const stack = (s, id) => s.players.find((p) => p.id === id).stack;
function total(s) {
  let t = s.players.reduce((a, p) => a + p.stack, 0);
  if (s.hand && s.hand.phase !== 'done') for (const id of s.hand.order) t += s.hand.p[id].tot;
  if (s.bj && s.bj.phase === 'play') {
    for (const id of Object.keys(s.bj.hands)) for (const hd of s.bj.hands[id]) t += hd.b;
    for (const id of Object.keys(s.bj.ins)) t += s.bj.ins[id];
  }
  return t;
}

test('heads-up: Dealer ist Small Blind, handelt preflop zuerst, postflop zuletzt', () => {
  let s = room(['A', 'B']);
  s = ok(s, { type: 'startHand' });
  const h = s.hand;
  assert.equal(h.dealer, 'p0');
  assert.equal(h.sbP, 'p0');
  assert.equal(h.bbP, 'p1');
  assert.equal(cur(s), 'p0');
  assert.equal(stack(s, 'p0'), 995);
  assert.equal(stack(s, 'p1'), 990);
  s = act(s, 'call');
  assert.equal(cur(s), 'p1', 'BB hat die Option');
  const o = E.options(s, 'p1');
  assert.equal(o.canCheck, true);
  assert.equal(o.canRaise, true);
  s = act(s, 'check');
  assert.equal(s.hand.st, 1);
  assert.equal(cur(s), 'p1', 'postflop handelt BB (Nicht-Dealer) zuerst');
  s = act(s, 'check');
  assert.equal(cur(s), 'p0');
  s = act(s, 'check');
  assert.equal(s.hand.st, 2);
});

test('3 Spieler: Reihenfolge, Blinds, Button wandert', () => {
  let s = room(['A', 'B', 'C']);
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.dealer, 'p0');
  assert.equal(s.hand.sbP, 'p1');
  assert.equal(s.hand.bbP, 'p2');
  assert.equal(cur(s), 'p0', 'UTG = Dealer bei 3 Spielern');
  s = act(s, 'fold');
  s = act(s, 'fold');
  assert.equal(s.hand.phase, 'done');
  assert.equal(stack(s, 'p2'), 1005);
  assert.equal(stack(s, 'p1'), 995);
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.dealer, 'p1');
  assert.equal(s.hand.sbP, 'p2');
  assert.equal(s.hand.bbP, 'p0');
  assert.equal(cur(s), 'p1');
});

test('Mindest-Raise und Re-Raise', () => {
  let s = room(['A', 'B', 'C']);
  s = ok(s, { type: 'startHand' }); // A dealer/UTG, B sb, C bb (10)
  let o = E.options(s, 'p0');
  assert.equal(o.minTo, 20);
  bad(s, { type: 'act', pid: 'p0', kind: 'raise', to: 15 }, /Mindestens 20/);
  s = act(s, 'raise', 35); // Erhöhung um 25
  o = E.options(s, 'p1');
  assert.equal(o.minTo, 60, 'nächster Raise mindestens +25');
  assert.equal(o.toCall, 30);
  s = act(s, 'raise', 60);
  o = E.options(s, 'p2');
  assert.equal(o.minTo, 85);
  bad(s, { type: 'act', pid: 'p0', kind: 'call' }, /am Zug/);
});

test('Unvollständiger All-in-Raise: A darf nur callen oder folden', () => {
  // Stacks: A 1000, B 1000, C 150
  let s = room(['A', 'B', 'C'], {}, [1000, 1000, 150]);
  s = ok(s, { type: 'startHand' }); // A UTG/D, B SB, C BB(10, Rest 140)
  s = act(s, 'raise', 100); // A raise auf 100 (inc 90)
  s = act(s, 'call'); // B call 100
  assert.equal(cur(s), 'p2');
  s = act(s, 'allin'); // C all-in 150 (inc 50 < 90) -> unvollständig
  assert.equal(s.hand.cb, 150);
  assert.equal(s.hand.mr, 90);
  assert.equal(cur(s), 'p0');
  let o = E.options(s, 'p0');
  assert.equal(o.canRaise, false, 'A darf nicht re-raisen');
  assert.equal(o.toCall, 50);
  bad(s, { type: 'act', pid: 'p0', kind: 'raise', to: 300 }, /nicht erlaubt/);
  bad(s, { type: 'act', pid: 'p0', kind: 'allin' }, /nicht erlaubt/);
  s = act(s, 'call');
  o = E.options(s, 'p1');
  assert.equal(o.canRaise, false, 'B auch nicht');
  s = act(s, 'call');
  assert.equal(s.hand.st, 1, 'weiter zum Flop');
});

test('Mehrere kleine All-ins ergeben zusammen einen vollen Raise -> wieder offen', () => {
  // A 1000, B 1000, C 125, D 160 ; Blinds 5/10
  let s = room(['A', 'B', 'C', 'D'], {}, [1000, 1000, 125, 160]);
  s = ok(s, { type: 'startHand' }); // A D, B SB, C BB, D UTG
  assert.equal(cur(s), 'p3');
  s = act(s, 'call'); // D 10
  s = act(s, 'raise', 60); // A raise auf 60 (inc 50)
  s = act(s, 'call'); // B 60
  s = act(s, 'allin'); // C all-in 125 (inc 65 >= 50 -> voll), mr=65
  assert.equal(s.hand.mr, 65);
  let o = E.options(s, 'p3');
  assert.equal(o.canRaise, true, 'D hat seit 10 eine volle Erhöhung vor sich');
  s = act(s, 'allin'); // D all-in 160 (inc 35 < 65 -> unvollständig)
  o = E.options(s, 'p0');
  // A hat bei 60 gehandelt, jetzt 160: Differenz 100 >= 65 -> offen
  assert.equal(o.canRaise, true);
  assert.equal(o.minTo, 160 + 65);
});

test('BB-Option nach Limps', () => {
  let s = room(['A', 'B', 'C']);
  s = ok(s, { type: 'startHand' });
  s = act(s, 'call');
  s = act(s, 'call');
  assert.equal(cur(s), 'p2');
  const o = E.options(s, 'p2');
  assert.equal(o.canCheck, true);
  assert.equal(o.canRaise, true);
  assert.equal(o.minTo, 20);
  s = act(s, 'raise', 30);
  assert.equal(cur(s), 'p0', 'Limper müssen reagieren');
});

test('Side Pots: Kurzer Stack gewinnt den Hauptpot, Nebenpot wird gefragt', () => {
  let s = room(['A', 'B', 'C'], {}, [100, 300, 300]);
  s = ok(s, { type: 'startHand' }); // A D/UTG
  s = act(s, 'allin'); // A 100
  s = act(s, 'raise', 300); // B all-in 300
  s = act(s, 'call'); // C call 300 (all-in)
  assert.equal(s.hand.phase, 'show');
  assert.equal(s.hand.runout, true);
  const pots = s.hand.pots;
  assert.equal(pots.length, 2);
  assert.deepEqual(pots[0], { amt: 300, el: ['p0', 'p1', 'p2'], win: null });
  assert.equal(pots[1].amt, 400);
  assert.deepEqual(pots[1].el, ['p1', 'p2']);
  bad(s, { type: 'win', pot: 1, ids: ['p1'] }, /geändert/);
  s = ok(s, { type: 'win', pot: 0, ids: ['p0'] });
  assert.equal(s.hand.phase, 'show', 'A ist nicht im Nebenpot');
  bad(s, { type: 'win', pot: 1, ids: ['p0'] }, /nicht um diesen Pot/);
  s = ok(s, { type: 'win', pot: 1, ids: ['p2'] });
  assert.equal(s.hand.phase, 'done');
  assert.equal(stack(s, 'p0'), 300);
  assert.equal(stack(s, 'p1'), 0);
  assert.equal(stack(s, 'p2'), 400);
  assert.equal(total(s), 700);
});

test('Side Pots: Gewinner des Hauptpots bekommt automatisch auch den Nebenpot', () => {
  let s = room(['A', 'B', 'C'], {}, [100, 300, 300]);
  s = ok(s, { type: 'startHand' });
  s = act(s, 'allin');
  s = act(s, 'raise', 300);
  s = act(s, 'call');
  s = ok(s, { type: 'win', pot: 0, ids: ['p1'] });
  assert.equal(s.hand.phase, 'done');
  assert.equal(stack(s, 'p1'), 700);
});

test('Nicht gecallter Einsatz geht zurück', () => {
  let s = room(['A', 'B'], {}, [1000, 200]);
  s = ok(s, { type: 'startHand' }); // A D/SB, B BB
  s = act(s, 'raise', 600); // A raise 600
  s = act(s, 'call'); // B all-in 200
  assert.equal(s.hand.phase, 'show');
  assert.equal(s.hand.pots.length, 2);
  assert.equal(s.hand.pots[0].amt, 400);
  assert.equal(s.hand.pots[1].amt, 400);
  assert.equal(s.hand.pots[1].auto, true);
  s = ok(s, { type: 'win', pot: 0, ids: ['p1'] });
  assert.equal(stack(s, 'p1'), 400);
  assert.equal(stack(s, 'p0'), 800, '400 nicht gecallt zurück');
  assert.equal(s.hand.back.p0, 400);
});

test('Split mit ungeraden Chips: Rest an den ersten Spieler links vom Dealer', () => {
  let s = room(['A', 'B', 'C']);
  s = ok(s, { type: 'startHand' }); // A D, B SB, C BB
  s = act(s, 'fold'); // A
  s = act(s, 'call'); // B 10
  s = act(s, 'check'); // C
  s = act(s, 'raise', 15); // B bet 15 (>= bb)
  s = act(s, 'call'); // C
  // Pot = 20 + 30 = 50 ; turn, river checken
  for (let i = 0; i < 4; i++) s = act(s, 'check');
  assert.equal(s.hand.phase, 'show');
  assert.equal(s.hand.pots[0].amt, 50);
  s = ok(s, { type: 'win', pot: 0, ids: ['p1', 'p2'] });
  // unit = ggT(50,5)=5 -> 10 Einheiten -> 5/5 -> je 25
  assert.equal(stack(s, 'p1'), 1000 - 25 + 25);
  assert.equal(stack(s, 'p2'), 1000);
});

test('Split mit Rest-Einheit', () => {
  let s = room(['A', 'B', 'C'], { sb: 5, bb: 10 });
  s = ok(s, { type: 'startHand' }); // A D, B SB, C BB
  s = act(s, 'call'); // A 10
  s = act(s, 'fold'); // B (5 tot)
  s = act(s, 'check'); // C
  for (let i = 0; i < 6; i++) s = act(s, 'check');
  assert.equal(s.hand.pots[0].amt, 25);
  s = ok(s, { type: 'win', pot: 0, ids: ['p0', 'p2'] });
  // unit 5 -> 5 Einheiten -> 2/2 + 1 Rest an ersten links vom Dealer (C vor A)
  assert.equal(s.hand.won.p2, 15);
  assert.equal(s.hand.won.p0, 10);
});

test('Alle All-in preflop -> Showdown mit Runout', () => {
  let s = room(['A', 'B']);
  s = ok(s, { type: 'startHand' });
  s = act(s, 'allin');
  s = act(s, 'call');
  assert.equal(s.hand.phase, 'show');
  assert.equal(s.hand.runout, true);
  s = ok(s, { type: 'win', pot: 0, ids: ['p0'] });
  assert.equal(stack(s, 'p0'), 2000);
  assert.equal(stack(s, 'p1'), 0);
  bad(s, { type: 'startHand' }, /Mindestens 2/);
  s = ok(s, { type: 'rebuy', pid: 'p1', amt: 1000 });
  assert.equal(s.players[1].buyin, 2000);
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.dealer, 'p1');
});

test('Short All-in im Big Blind: kein Handeln nötig, Rest zurück', () => {
  let s = room(['A', 'B'], {}, [1000, 6]);
  s = ok(s, { type: 'startHand' }); // A SB 5, B BB all-in 6
  assert.equal(cur(s), 'p0');
  const o = E.options(s, 'p0');
  assert.equal(o.toCall, 5);
  s = act(s, 'call');
  assert.equal(s.hand.phase, 'show');
  s = ok(s, { type: 'win', pot: 0, ids: ['p1'] });
  assert.equal(stack(s, 'p1'), 12);
  assert.equal(stack(s, 'p0'), 994);
});

test('Short Stack im Small Blind all-in -> BB muss nicht handeln', () => {
  let s = room(['A', 'B'], {}, [3, 1000]);
  s = ok(s, { type: 'startHand' }); // A SB all-in 3, B BB 10
  assert.equal(s.hand.phase, 'show');
  s = ok(s, { type: 'win', pot: 0, ids: ['p1'] });
  assert.equal(stack(s, 'p1'), 1003);
});

test('Ante wird von allen gezahlt', () => {
  let s = room(['A', 'B', 'C'], { ante: 2 });
  s = ok(s, { type: 'startHand' });
  assert.equal(E.potSize(s.hand), 6 + 15);
  assert.equal(stack(s, 'p0'), 998);
  assert.equal(stack(s, 'p1'), 993);
  assert.equal(stack(s, 'p2'), 988);
  assert.equal(s.hand.cb, 10);
});

test('Bomb Pot: alle zahlen, direkt Flop, erster links vom Dealer', () => {
  let s = room(['A', 'B', 'C'], { bombEvery: 3, bombBB: 5 });
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.bomb, false);
  s = act(s, 'fold');
  s = act(s, 'fold');
  s = ok(s, { type: 'startHand' });
  s = act(s, 'fold');
  s = act(s, 'fold');
  s = ok(s, { type: 'startHand' }); // Hand 3 -> Bomb
  const h = s.hand;
  assert.equal(h.bomb, true);
  assert.equal(h.st, 1);
  assert.equal(E.potSize(h), 150);
  assert.equal(h.cb, 0);
  assert.equal(h.sbP, null);
  const dIdx = h.order.indexOf(h.dealer);
  assert.equal(cur(s), h.order[(dIdx + 1) % 3]);
  const o = E.options(s, cur(s));
  assert.equal(o.isBet, true);
  assert.equal(o.minTo, 10);
});

test('Bomb Pot auf Knopfdruck', () => {
  let s = room(['A', 'B']);
  s = ok(s, { type: 'bombNext', on: true });
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.bomb, true);
  assert.equal(s.bombNext, false);
  assert.equal(cur(s), 'p1', 'heads-up: Nicht-Dealer zuerst');
});

test('Blinds steigen', () => {
  let s = room(['A', 'B'], { levelEvery: 2 });
  const blinds = [];
  for (let i = 0; i < 5; i++) {
    s = ok(s, { type: 'startHand' });
    blinds.push(s.hand.bb);
    s = act(s, 'fold');
  }
  assert.deepEqual(blinds, [10, 10, 20, 20, 30]);
  assert.equal(E.handsLeftOnLevel(s), 1);
});

test('7-2-Bonus', () => {
  let s = room(['A', 'B', 'C'], { sevenDeuce: 2 });
  s = ok(s, { type: 'startHand' });
  s = act(s, 'raise', 30); // A
  s = act(s, 'fold');
  s = act(s, 'fold');
  bad(s, { type: 'sevenDeuce', pid: 'p1' }, /Gewinner/);
  s = ok(s, { type: 'sevenDeuce', pid: 'p0' });
  assert.equal(stack(s, 'p0'), 1015 + 40);
  assert.equal(stack(s, 'p1'), 995 - 20);
  assert.equal(stack(s, 'p2'), 990 - 20);
  bad(s, { type: 'sevenDeuce', pid: 'p0' }, /schon/);
});

test('Rückgängig stellt den Stand vor der Aktion wieder her', () => {
  let s = room(['A', 'B', 'C']);
  s = ok(s, { type: 'startHand' });
  const before = JSON.stringify({ p: s.players, h: s.hand });
  s = act(s, 'raise', 50);
  s = ok(s, { type: 'join', pid: 'p9', name: 'Neu' });
  s = ok(s, { type: 'undo', ctx: E.undoCtx(s) });
  assert.equal(s.players.length, 4, 'Neuer Spieler bleibt');
  assert.equal(JSON.stringify({ p: s.players.slice(0, 3), h: s.hand }), before);
  bad(s, { type: 'undo', ctx: 'falsch' }, /etwas passiert/);
});

test('Abbrechen (Misdeal) gibt alles zurück, gleicher Dealer', () => {
  let s = room(['A', 'B', 'C']);
  s = ok(s, { type: 'startHand' });
  s = act(s, 'raise', 50);
  s = ok(s, { type: 'abort' });
  assert.equal(total(s), 3000);
  assert.ok(s.players.every((p) => p.stack === 1000));
  assert.equal(s.hand, null);
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.no, 1);
  assert.equal(s.hand.dealer, 'p0');
});

test('Spieler-Verwaltung: Sitzordnung, Dealer, Aussetzen, Entfernen', () => {
  let s = room(['A', 'B', 'C', 'D']);
  s = ok(s, { type: 'move', pid: 'p3', dir: -1 });
  assert.deepEqual(s.players.map((p) => p.id), ['p0', 'p1', 'p3', 'p2']);
  s = ok(s, { type: 'setDealer', pid: 'p3' });
  s = ok(s, { type: 'sitOut', pid: 'p1', out: true });
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.dealer, 'p3');
  assert.deepEqual(s.hand.order, ['p0', 'p3', 'p2']);
  bad(s, { type: 'remove', pid: 'p0' }, /nach der Hand/);
  s = ok(s, { type: 'remove', pid: 'p1' });
  bad(s, { type: 'move', pid: 'p0', dir: 1 }, /nach der Hand/);
  bad(s, { type: 'join', pid: 'pX', name: 'a' }, /vergeben/);
});

test('Button nach Entfernen des Dealers', () => {
  let s = room(['A', 'B', 'C', 'D']);
  s = ok(s, { type: 'startHand' }); // dealer A
  while (s.hand.phase === 'bet') s = act(s, 'fold');
  s = ok(s, { type: 'remove', pid: 'p0' });
  s = ok(s, { type: 'startHand' });
  assert.equal(s.hand.dealer, 'p1', 'Button rückt zum nächsten Sitz');
});

test('Blackjack mit Haus als Bank', () => {
  let s = room(['A', 'B', 'C'], { game: 'bj', bjMin: 10 });
  assert.equal(s.bj.phase, 'bet');
  bad(s, { type: 'bjDeal' }, /niemand/);
  bad(s, { type: 'bjBet', pid: 'p0', amt: 5 }, /Mindesteinsatz/);
  s = ok(s, { type: 'bjBet', pid: 'p0', amt: 20 });
  s = ok(s, { type: 'bjBet', pid: 'p1', amt: 30 });
  s = ok(s, { type: 'bjDeal' });
  assert.equal(stack(s, 'p0'), 980);
  assert.equal(s.bj.hands.p2, undefined);
  s = ok(s, { type: 'bjDouble', pid: 'p0', i: 0 });
  assert.equal(s.bj.hands.p0[0].b, 40);
  bad(s, { type: 'bjSplit', pid: 'p0', i: 0 }, /Verdoppeln/);
  bad(s, { type: 'bjRes', pid: 'p0', i: 0, res: 'bj' }, /zwei Karten/);
  s = ok(s, { type: 'bjRes', pid: 'p0', i: 0, res: 'win' });
  assert.equal(s.bj.phase, 'play');
  s = ok(s, { type: 'bjRes', pid: 'p1', i: 0, res: 'bj' });
  assert.equal(s.bj.phase, 'done');
  assert.equal(stack(s, 'p0'), 1040);
  assert.equal(stack(s, 'p1'), 1045);
  assert.equal(s.bj.net.p1, 45);
  s = ok(s, { type: 'bjNew' });
  assert.equal(s.bj.no, 2);
});

test('Blackjack mit Spieler als Bank, Split, Versicherung', () => {
  let s = room(['Bank', 'B', 'C'], { game: 'bj', bjMin: 10 });
  s = ok(s, { type: 'settings', cfg: { bank: 'p0' } });
  bad(s, { type: 'bjBet', pid: 'p0', amt: 10 }, /Bank/);
  s = ok(s, { type: 'bjBet', pid: 'p1', amt: 20 });
  s = ok(s, { type: 'bjBet', pid: 'p2', amt: 50 });
  s = ok(s, { type: 'bjDeal' });
  s = ok(s, { type: 'bjIns', pid: 'p2' });
  assert.equal(stack(s, 'p2'), 925);
  s = ok(s, { type: 'bjSplit', pid: 'p1', i: 0 });
  assert.equal(s.bj.hands.p1.length, 2);
  assert.equal(stack(s, 'p1'), 960);
  bad(s, { type: 'bjIns', pid: 'p1' }, /direkt nach/);
  s = ok(s, { type: 'bjRes', pid: 'p1', i: 0, res: 'win' });
  s = ok(s, { type: 'bjRes', pid: 'p1', i: 1, res: 'lose' });
  s = ok(s, { type: 'bjRes', pid: 'p2', i: 0, res: 'lose' });
  assert.equal(s.bj.phase, 'play', 'Versicherungsfrage offen');
  s = ok(s, { type: 'bjDealerBJ', val: true });
  assert.equal(s.bj.phase, 'done');
  assert.equal(stack(s, 'p1'), 1000);
  assert.equal(stack(s, 'p2'), 925 + 75); // Versicherung 25 * 3
  assert.equal(stack(s, 'p0'), 1000);
  assert.equal(total(s), 3000);
});

test('Blackjack abbrechen gibt Einsätze zurück', () => {
  let s = room(['A', 'B'], { game: 'bj' });
  s = ok(s, { type: 'bjBet', pid: 'p0', amt: 100 });
  s = ok(s, { type: 'bjDeal' });
  s = ok(s, { type: 'bjDouble', pid: 'p0', i: 0 });
  s = ok(s, { type: 'abort' });
  assert.equal(stack(s, 'p0'), 1000);
  assert.equal(s.bj.phase, 'bet');
  assert.equal(s.bj.no, 1);
});

test('Spielwechsel nur zwischen Runden', () => {
  let s = room(['A', 'B']);
  s = ok(s, { type: 'startHand' });
  bad(s, { type: 'setGame', game: 'bj' }, /beenden/);
  s = act(s, 'fold');
  s = ok(s, { type: 'setGame', game: 'bj' });
  assert.equal(s.bj.phase, 'bet');
  s = ok(s, { type: 'setGame', game: 'poker' });
  assert.equal(s.bj, null);
});

test('Doppelte Aktions-ID wird ignoriert', () => {
  let s = room(['A', 'B']);
  const a = { type: 'startHand', id: 'same' };
  const r1 = E.apply(s, a);
  assert.ok(r1.ok);
  const r2 = E.apply(r1.state, a);
  assert.equal(r2.ok, false);
  assert.equal(r2.code, 'dup');
});

// ------------------------------------------------------------- Fuzz-Test
function rng(seed) {
  let x = seed >>> 0 || 1;
  return () => {
    x ^= x << 13;
    x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5;
    x >>>= 0;
    return x / 4294967296;
  };
}

test('Fuzz: tausende Zufallshände – Chips bleiben erhalten, nichts hängt', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const r = rng(seed * 7919);
    const n = 2 + Math.floor(r() * 8);
    const names = Array.from({ length: n }, (_, i) => 'S' + i);
    const cfg = {
      sb: 1 + Math.floor(r() * 5),
      ante: r() < 0.3 ? Math.floor(r() * 3) : 0,
      bombEvery: r() < 0.3 ? 2 + Math.floor(r() * 3) : 0,
      levelEvery: r() < 0.3 ? 3 : 0,
      sevenDeuce: r() < 0.3 ? 1 : 0,
    };
    cfg.bb = cfg.sb * (1 + Math.floor(r() * 3));
    let s = room(names, cfg, names.map(() => 20 + Math.floor(r() * 400)));
    let T = total(s);
    for (let hand = 0; hand < 60; hand++) {
      const info = E.nextHandInfo(s);
      if (info.parts.length < 2) {
        const sitting = s.players.find((p) => p.out);
        if (sitting) {
          s = ok(s, { type: 'sitOut', pid: sitting.id, out: false });
          continue;
        }
        const broke = s.players.find((p) => p.stack === 0);
        s = ok(s, { type: 'rebuy', pid: broke.id, amt: 100 });
        T += 100;
        continue;
      }
      const before = total(s);
      s = ok(s, { type: 'startHand' });
      let guard = 0;
      while (s.hand.phase !== 'done') {
        assert.ok(++guard < 500, 'Hand hängt');
        assert.equal(total(s), before, 'Chips verschwunden');
        assert.ok(s.players.every((p) => p.stack >= 0), 'negativer Stack');
        if (s.hand.phase === 'bet') {
          const pid = s.hand.cur;
          assert.ok(pid, 'Niemand am Zug');
          const o = E.options(s, pid);
          assert.ok(o);
          const x = r();
          let a;
          if (x < 0.15) a = { kind: 'fold' };
          else if (x < 0.55) a = { kind: o.canCheck ? 'check' : 'call' };
          else if (x < 0.85 && o.canRaise) a = { kind: 'raise', to: o.minTo + Math.floor(r() * (o.maxTo - o.minTo + 1)) };
          else if (o.canRaise || o.callAllIn) a = { kind: 'allin' };
          else a = { kind: o.canCheck ? 'check' : 'call' };
          if (r() < 0.03 && s.hand.acts > 0) {
            s = ok(s, { type: 'undo' });
            continue;
          }
          s = ok(s, Object.assign({ type: 'act', pid, ctx: o.ctx }, a));
        } else if (s.hand.phase === 'show') {
          const i = s.hand.pots.findIndex((p) => !p.win);
          const el = s.hand.pots[i].el;
          const ids = el.filter(() => r() < 0.4);
          s = ok(s, { type: 'win', pot: i, ids: ids.length ? ids : [el[Math.floor(r() * el.length)]] });
        }
      }
      const h = s.hand;
      const netSum = Object.values(h.net).reduce((a, b) => a + b, 0);
      assert.equal(netSum, 0, 'Netto-Summe einer Hand muss 0 sein');
      if (cfg.sevenDeuce && r() < 0.2) {
        const w = h.order.find((id) => h.net[id] > 0);
        if (w) s = ok(s, { type: 'sevenDeuce', pid: w });
      }
      assert.equal(total(s), T, 'Gesamtchips konstant');
      if (r() < 0.1) {
        const p = s.players[Math.floor(r() * s.players.length)];
        s = ok(s, { type: 'sitOut', pid: p.id, out: !p.out });
      }
    }
  }
});

test('Fuzz: Blackjack mit Spieler-Bank – Chips bleiben erhalten', () => {
  for (let seed = 1; seed <= 30; seed++) {
    const r = rng(seed * 104729);
    const n = 2 + Math.floor(r() * 6);
    let s = room(Array.from({ length: n }, (_, i) => 'B' + i), { game: 'bj', bjMin: 5 });
    s = ok(s, { type: 'settings', cfg: { bank: 'p0' } });
    const T = total(s);
    for (let round = 0; round < 40; round++) {
      for (const p of s.players.slice(1)) {
        if (p.stack >= 5 && r() < 0.8) s = ok(s, { type: 'bjBet', pid: p.id, amt: 5 + Math.floor(r() * Math.min(200, p.stack - 4)) });
      }
      if (!Object.keys(s.bj.bets).length) {
        s = ok(s, { type: 'rebuy', pid: 'p1', amt: 100 });
        continue;
      }
      s = ok(s, { type: 'bjDeal' });
      const cur0 = total(s);
      for (const id of Object.keys(s.bj.hands)) {
        if (r() < 0.2) {
          const res = E.apply(s, { type: 'bjIns', pid: id });
          if (res.ok) s = res.state;
        }
        for (let i = 0; i < s.bj.hands[id].length; i++) {
          const x = r();
          let res;
          if (x < 0.15) res = E.apply(s, { type: 'bjSplit', pid: id, i });
          else if (x < 0.3) res = E.apply(s, { type: 'bjDouble', pid: id, i });
          if (res && res.ok) s = res.state;
          assert.equal(total(s), cur0);
        }
      }
      const ids = Object.keys(s.bj.hands);
      for (const id of ids) {
        for (let i = 0; i < s.bj.hands[id].length; i++) {
          if (s.bj.phase !== 'play') break;
          const opts = ['win', 'push', 'lose'];
          if (s.bj.hands[id].length === 1 && !s.bj.hands[id][0].d) opts.push('bj');
          s = ok(s, { type: 'bjRes', pid: id, i, res: opts[Math.floor(r() * opts.length)] });
        }
      }
      if (s.bj.phase === 'play') s = ok(s, { type: 'bjDealerBJ', val: r() < 0.3 });
      assert.equal(s.bj.phase, 'done');
      assert.equal(Object.values(s.bj.net).reduce((a, b) => a + b, 0), 0);
      s = ok(s, { type: 'bjNew' });
    }
    const buyins = s.players.reduce((a, p) => a + p.buyin, 0);
    assert.equal(total(s), buyins, 'Chips = Buy-ins');
    assert.ok(T <= buyins);
  }
});
