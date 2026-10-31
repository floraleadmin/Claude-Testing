'use strict';
/*
 * End-to-End-Test mit drei "Handys" (Playwright) gegen lokale MQTT-Broker.
 * A hängt nur an Broker 1, C nur an Broker 2, B an beiden – B muss also die
 * Spielstände zwischen den Brokern weiterreichen.
 *
 *   node test/e2e.js            (nutzt lokale Broker)
 *   BASE_URL=https://… BROKERS=default node test/e2e.js   (echte Seite & echte Broker)
 */
const assert = require('assert/strict');
const path = require('path');
const { chromium, devices } = require('playwright');
const { startStatic, startBroker } = require('./serve');

const MODS = process.env.NODE_MODULES_DIR;
const LIVE = !!process.env.BASE_URL;
const SHOTS = process.env.SHOTS_DIR || '';

function log(...a) {
  console.log('·', ...a);
}

async function main() {
  let stat;
  let b1;
  let b2;
  let base = process.env.BASE_URL;
  const q = {};
  if (!LIVE) {
    stat = await startStatic(8090);
    b1 = await startBroker(8891, MODS);
    b2 = await startBroker(8892, MODS);
    base = 'http://localhost:8090/index.html';
    q.A = '?broker=ws://localhost:8891';
    q.B = '?broker=ws://localhost:8891,ws://localhost:8892';
    q.C = '?broker=ws://localhost:8892';
  } else {
    q.A = q.B = q.C = '';
  }

  const browser = await chromium.launch();
  const errors = [];
  const mk = async (who) => {
    const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'de-DE' });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(`${who}: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error' && !/WebSocket|ERR_|net::|Failed to load resource/i.test(m.text())) errors.push(`${who} console: ${m.text()}`);
    });
    page.who = who;
    return page;
  };
  const A = await mk('A');
  const B = await mk('B');
  const C = await mk('C');
  const all = [A, B, C];

  const shot = async (p, name) => {
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, `${name}.png`) });
  };
  const stateOf = (p, code) => p.evaluate((c) => JSON.parse(localStorage.getItem('pc:state:' + c) || 'null'), code);
  const meOf = (p, code) => p.evaluate((c) => localStorage.getItem('pc:me:' + c), code);
  async function sync(code, timeout = 20000) {
    const t0 = Date.now();
    for (;;) {
      const st = await Promise.all(all.map((p) => stateOf(p, code)));
      if (st.every((s) => s && s.v === st[0].v && s.w === st[0].w)) return st[0];
      if (Date.now() - t0 > timeout) throw new Error('Kein Sync: ' + st.map((s) => s && s.v + '/' + s.w).join(' | '));
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  async function tap(p, sel) {
    await p.locator(sel).first().click();
  }

  // ---------------------------------------------------------------- Tisch erstellen
  await A.goto(base + q.A);
  await shot(A, '01-home');
  await tap(A, '[data-a="go-create"]');
  await A.fill('#c-name', 'Anna');
  await shot(A, '02-create');
  await tap(A, '[data-a="create"]');
  await A.waitForSelector('.bar-code');
  const code = (await A.locator('.bar-code').innerText()).trim();
  assert.match(code, /^[A-Z0-9]{6}$/);
  log('Tisch', code);
  await A.waitForSelector('.qr');

  // ---------------------------------------------------------------- Beitreten
  for (const [p, name] of [
    [B, 'Ben'],
    [C, 'Chris'],
  ]) {
    await p.goto(base + q[p.who] + '#' + code);
    await p.waitForSelector('#j-name', { timeout: 20000 });
    await p.waitForSelector('[data-a="join"]:not([disabled])', { timeout: 20000 });
    await p.fill('#j-name', name);
    await tap(p, '[data-a="join"]');
    await p.waitForSelector('[data-a="start-hand"]', { timeout: 20000 });
  }
  let s = await sync(code);
  assert.deepEqual(
    s.players.map((p) => p.name),
    ['Anna', 'Ben', 'Chris']
  );
  await shot(A, '03-lobby');
  const id = {};
  for (const p of all) id[p.who] = await meOf(p, code);

  // ---------------------------------------------------------------- Hand 1
  await A.waitForSelector('[data-a="start-hand"]:not([disabled])');
  await tap(A, '[data-a="start-hand"]');
  s = await sync(code);
  assert.equal(s.hand.dealer, id.A);
  assert.equal(s.hand.cur, id.A, 'UTG = Dealer bei 3 Spielern');
  for (const p of all) assert.equal((await p.locator('.pot-amt').innerText()).trim(), '15');
  await shot(A, '04-turn-anna');
  await shot(B, '04-wait-ben');
  await tap(A, '[data-a="call"]');
  await B.waitForSelector('[data-a="call"]');
  await tap(B, '[data-a="call"]');
  await C.waitForSelector('[data-a="check"]');
  await tap(C, '[data-a="check"]');
  s = await sync(code);
  assert.equal(s.hand.st, 1, 'Flop');
  assert.equal(s.hand.cur, id.B);
  // Ben setzt 20 über das Raise-Sheet
  await B.waitForSelector('[data-a="raise-open"]');
  await tap(B, '[data-a="raise-open"]');
  await B.waitForSelector('#r-amt');
  await B.fill('#r-amt', '20');
  await shot(B, '05-raise-sheet');
  await tap(B, '[data-a="r-go"]');
  await C.waitForSelector('[data-a="call"]');
  await tap(C, '[data-a="call"]');
  // Anna foldet (es liegt ein Einsatz -> keine Rückfrage)
  await A.waitForSelector('[data-a="fold"]');
  await tap(A, '[data-a="fold"]');
  s = await sync(code);
  assert.equal(s.hand.st, 2, 'Turn');
  assert.equal(E_pot(s), 70);
  // Turn & River: Ben und Chris checken; Chris checkt einmal für Ben (Für … setzen)
  await B.waitForSelector('[data-a="check"]');
  await tap(B, '[data-a="check"]');
  await C.waitForSelector('[data-a="check"]');
  await tap(C, '[data-a="check"]');
  s = await sync(code);
  assert.equal(s.hand.st, 3);
  await C.waitForSelector('[data-a="proxy"]');
  await tap(C, '[data-a="proxy"]');
  await C.waitForSelector('.proxy-note');
  await tap(C, '[data-a="check"]');
  await C.waitForSelector('[data-a="check"]');
  await tap(C, '[data-a="check"]');
  s = await sync(code);
  assert.equal(s.hand.phase, 'show');
  for (const p of all) await p.waitForSelector('.sd-head');
  await shot(A, '06-showdown');
  // Anna (nicht beteiligt) wählt den Gewinner: Chris
  await tap(A, `[data-a="pick"][data-id="${id.C}"]`);
  await tap(A, '[data-a="award"]');
  s = await sync(code);
  assert.equal(s.hand.phase, 'done');
  const st = Object.fromEntries(s.players.map((p) => [p.name, p.stack]));
  assert.deepEqual(st, { Anna: 990, Ben: 970, Chris: 1040 });
  for (const p of all) assert.match(await p.locator('.result h2').innerText(), /Chris gewinnt 70/);
  await shot(B, '07-result');

  // ---------------------------------------------------------------- Gleichzeitig "Nächste Hand"
  await B.waitForSelector('[data-a="start-hand"]:not([disabled])');
  await C.waitForSelector('[data-a="start-hand"]:not([disabled])');
  const clicked = await Promise.all(
    [B, C].map((p) =>
      p.evaluate(() => {
        const b = document.querySelector('[data-a="start-hand"]');
        if (!b) return false;
        b.click();
        return true;
      })
    )
  );
  log('gleichzeitige Klicks:', clicked.join(','));
  s = await sync(code);
  assert.equal(s.hand.no, 2, 'genau eine neue Hand');
  assert.equal(s.hand.dealer, id.B);
  assert.equal(s.players.reduce((a, p) => a + p.stack, 0) + E_pot(s), 3000);
  log('gleichzeitiger Start ok, Version', s.v);

  // ---------------------------------------------------------------- All-in, Side-Pot-freie Runde, Reload mitten in der Hand
  // Hand 2: Dealer Ben, SB Chris, BB Anna, UTG Ben
  await B.waitForSelector('[data-a="raise-open"]');
  await tap(B, '[data-a="raise-open"]');
  await tap(B, '[data-a="r-set"]:last-child'); // All-in
  await tap(B, '[data-a="r-go"]');
  s = await sync(code);
  assert.equal(s.hand.p[id.B].allin, true);
  await C.reload();
  await C.waitForSelector('[data-a="call"]', { timeout: 20000 });
  await tap(C, '[data-a="fold"]');
  await A.waitForSelector('[data-a="call"]');
  await tap(A, '[data-a="call"]'); // Anna call all-in mit 980 (< Bens 970+?)
  s = await sync(code);
  assert.equal(s.hand.phase, 'show');
  assert.equal(s.hand.runout, true);
  for (const p of all) await p.waitForSelector('.sd-head');
  // Split zwischen Anna und Ben
  await tap(C, `[data-a="pick"][data-id="${id.A}"]`);
  await tap(C, `[data-a="pick"][data-id="${id.B}"]`);
  await tap(C, '[data-a="award"]');
  s = await sync(code);
  assert.equal(s.hand.phase, 'done');
  assert.equal(s.players.reduce((a, p) => a + p.stack, 0), 3000);

  // ---------------------------------------------------------------- Rückgängig
  const before = s.players.map((p) => p.stack).join(',');
  await tap(A, '[data-a="menu"]');
  await tap(A, '.sheet [data-a="undo"]');
  await tap(A, '.sheet [data-a="confirm-ok"]');
  s = await sync(code);
  assert.equal(s.hand.phase, 'show', 'Gewinnerauswahl rückgängig');
  await tap(B, `[data-a="pick"][data-id="${id.A}"]`);
  await tap(B, `[data-a="pick"][data-id="${id.B}"]`);
  await tap(B, '[data-a="award"]');
  s = await sync(code);
  assert.equal(s.players.map((p) => p.stack).join(','), before);

  // ---------------------------------------------------------------- Spieler ohne Handy + Nachkaufen
  await tap(A, '[data-a="menu"]');
  await tap(A, '.sheet [data-a="players"]');
  await A.fill('#add-name', 'Dora');
  await tap(A, '.sheet [data-a="add-player"]');
  s = await sync(code);
  assert.equal(s.players.length, 4);
  await tap(A, '.sheet-head [data-a="close-sheet"]');

  // ---------------------------------------------------------------- Blackjack
  await tap(B, '[data-a="menu"]');
  await tap(B, '.sheet [data-a="switch-game"]');
  await tap(B, '.sheet [data-a="confirm-ok"]');
  s = await sync(code);
  assert.equal(s.cfg.game, 'bj');
  for (const p of all) await p.waitForSelector('.betbox');
  await shot(A, '08-bj-bet');
  const stacks0 = Object.fromEntries(s.players.map((p) => [p.name, p.stack]));
  // Anna setzt 10 + 50 = 60 (Start bei Mindesteinsatz 10 -> +50)
  await tap(A, '[data-a="bj-add"][data-v="50"]');
  await tap(A, '[data-a="bj-bet"]');
  await tap(C, '[data-a="bj-bet"]'); // Chris setzt Mindesteinsatz 10
  s = await sync(code);
  const aBet = s.bj.bets[id.A];
  assert.equal(aBet, 60);
  assert.equal(s.bj.bets[id.C], 10);
  await tap(B, '[data-a="bj-deal"]');
  s = await sync(code);
  assert.equal(s.bj.phase, 'play');
  for (const p of all) await p.waitForSelector('.bjhand');
  await tap(A, `[data-a="bj-double"][data-id="${id.A}"]`);
  await sync(code);
  await shot(A, '09-bj-play');
  await tap(A, `[data-a="bj-res"][data-id="${id.A}"][data-v="win"]`);
  await sync(code);
  await tap(B, `[data-a="bj-res"][data-id="${id.C}"][data-v="bj"]`);
  s = await sync(code);
  assert.equal(s.bj.phase, 'done');
  const st2 = Object.fromEntries(s.players.map((p) => [p.name, p.stack]));
  assert.equal(st2.Anna, stacks0.Anna + 120);
  assert.equal(st2.Chris, stacks0.Chris + 15);
  await shot(C, '10-bj-done');
  await tap(A, '[data-a="bj-new"]');
  s = await sync(code);
  assert.equal(s.bj.no, 2);

  // ---------------------------------------------------------------- Zurück zu Poker, Action-Modus speichern
  await tap(C, '[data-a="menu"]');
  await tap(C, '.sheet [data-a="switch-game"]');
  await tap(C, '.sheet [data-a="confirm-ok"]');
  await sync(code);
  await tap(C, '[data-a="menu"]');
  await tap(C, '.sheet [data-a="settings"]');
  await tap(C, '.sheet [data-a="preset"][data-v="action"]');
  await shot(C, '11-settings');
  await tap(C, '.sheet [data-a="save-settings"]');
  s = await sync(code);
  assert.equal(s.cfg.bombEvery, 3);
  assert.equal(s.cfg.sevenDeuce, 2);

  // Dark-Mode-Screenshot
  if (SHOTS) {
    await A.emulateMedia({ colorScheme: 'dark' });
    await shot(A, '12-dark-lobby');
  }

  if (errors.length) throw new Error('Fehler in der Seite:\n' + errors.join('\n'));
  log('E2E ok – Endstand Version', s.v);
  await browser.close();
  if (!LIVE) {
    await b1.close();
    await b2.close();
    stat.close();
  }
}

function E_pot(s) {
  return s.hand.order.reduce((a, id) => a + s.hand.p[id].tot, 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
