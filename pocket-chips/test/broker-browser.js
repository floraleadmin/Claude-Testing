'use strict';
/*
 * Prüft jeden Standard-Broker einzeln im echten Browser auf der veröffentlichten
 * Seite: Tisch erstellen, zweites Handy tritt bei, beide sehen denselben Stand.
 */
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const base = process.env.BASE_URL;
const src = fs.readFileSync(path.join(__dirname, '..', 'sync.js'), 'utf8');
const urls = [...src.matchAll(/'(wss:\/\/[^']+)'/g)].map((m) => m[1]);

async function check(browser, url) {
  const q = '?broker=' + encodeURIComponent(url);
  const ctxA = await browser.newContext({ ...devices['iPhone 13'] });
  const ctxB = await browser.newContext({ ...devices['Pixel 7'] });
  const A = await ctxA.newPage();
  const B = await ctxB.newPage();
  const t0 = Date.now();
  try {
    await A.goto(base + q);
    await A.click('[data-a="go-create"]');
    await A.fill('#c-name', 'Anna');
    await A.click('[data-a="create"]');
    await A.waitForSelector('.bar-code');
    const code = (await A.locator('.bar-code').innerText()).trim();
    await B.goto(base + q + '#' + code);
    await B.waitForSelector('[data-a="join"]:not([disabled])', { timeout: 25000 });
    await B.fill('#j-name', 'Ben');
    await B.click('[data-a="join"]');
    await A.waitForSelector('[data-a="start-hand"]:not([disabled])', { timeout: 25000 });
    await A.click('[data-a="start-hand"]');
    await B.waitForSelector('[data-a="call"], [data-a="proxy"]', { timeout: 25000 });
    return { url, ok: true, ms: Date.now() - t0 };
  } catch (e) {
    return { url, ok: false, error: e.message.split('\n')[0] };
  } finally {
    await ctxA.close();
    await ctxB.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  const res = [];
  for (const u of urls) res.push(await check(browser, u));
  await browser.close();
  console.table(res);
  const ok = res.filter((r) => r.ok).length;
  console.log(`${ok} von ${res.length} Brokern funktionieren im Browser`);
  if (ok < 2) process.exit(1);
})();
