'use strict';
/*
 * Ausfall-Test: Handy kurz offline, Broker-Neustart ohne gespeicherte Stände,
 * Beitritt über einen Broker, der den Tisch erst wieder lernen muss.
 */
const assert = require('assert/strict');
const { chromium, devices } = require('playwright');
const { startStatic, startBroker } = require('./serve');

const MODS = process.env.NODE_MODULES_DIR;

async function main() {
  const stat = await startStatic(8070);
  let b1 = await startBroker(8871, MODS);
  const b2 = await startBroker(8872, MODS);
  const base = 'http://localhost:8070/index.html';
  const both = '?broker=ws://localhost:8871,ws://localhost:8872';
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (who) => {
    const ctx = await browser.newContext({ ...devices['iPhone 13'] });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(`${who}: ${e.message}`));
    page.ctx = ctx;
    return page;
  };
  const A = await mk('A');
  const B = await mk('B');
  const stateOf = (p, code) => p.evaluate((c) => JSON.parse(localStorage.getItem('pc:state:' + c) || 'null'), code);
  async function sync(pages, code, timeout = 25000) {
    const t0 = Date.now();
    for (;;) {
      const st = await Promise.all(pages.map((p) => stateOf(p, code)));
      if (st.every((s) => s && s.v === st[0].v && s.w === st[0].w)) return st[0];
      if (Date.now() - t0 > timeout) throw new Error('Kein Sync: ' + st.map((s) => s && s.v).join(' | '));
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  await A.goto(base + both);
  await A.click('[data-a="go-create"]');
  await A.fill('#c-name', 'Anna');
  await A.click('[data-a="create"]');
  await A.waitForSelector('.bar-code');
  const code = (await A.locator('.bar-code').innerText()).trim();
  await B.goto(base + both + '#' + code);
  await B.waitForSelector('[data-a="join"]:not([disabled])', { timeout: 20000 });
  await B.fill('#j-name', 'Ben');
  await B.click('[data-a="join"]');
  await sync([A, B], code);
  await A.waitForSelector('[data-a="start-hand"]:not([disabled])');
  await A.click('[data-a="start-hand"]');
  await sync([A, B], code);

  // Heads-up: Anna (Dealer/SB) handelt zuerst. Ben geht offline.
  await B.ctx.setOffline(true);
  await A.waitForSelector('[data-a="call"]');
  await A.click('[data-a="call"]');
  await new Promise((r) => setTimeout(r, 1500));
  await B.ctx.setOffline(false);
  // Simuliert "Handy wieder entsperrt"
  await B.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await new Promise((r) => setTimeout(r, 4500));
  await B.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await B.waitForSelector('[data-a="check"]', { timeout: 20000 });
  await B.click('[data-a="check"]');
  let s = await sync([A, B], code);
  assert.equal(s.hand.st, 1, 'nach Offline-Phase geht es normal weiter');
  console.log('· Offline/Entsperren ok');

  // Broker 1 stürzt ab und kommt leer zurück.
  await b1.close();
  await new Promise((r) => setTimeout(r, 500));
  b1 = await startBroker(8871, MODS);
  // Ben checkt auf dem Flop (heads-up: Ben zuerst)
  await B.waitForSelector('[data-a="check"]', { timeout: 20000 });
  await B.click('[data-a="check"]');
  s = await sync([A, B], code);
  // Chris hängt NUR an Broker 1 – der muss den Tisch von A/B zurückbekommen haben.
  const C = await mk('C');
  await C.goto(base + '?broker=ws://localhost:8871#' + code);
  await C.waitForSelector('#j-name', { timeout: 25000 });
  s = await sync([A, B, C], code);
  assert.equal(s.hand.st, 1);
  console.log('· Broker-Neustart & Heilung ok, Version', s.v);

  if (errors.length) throw new Error(errors.join('\n'));
  await browser.close();
  await b1.close();
  await b2.close();
  stat.close();
  console.log('· Ausfall-Test ok');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
