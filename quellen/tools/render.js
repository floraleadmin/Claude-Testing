// Renders guide.html to PDF with headless Chromium
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [html, pdf] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + html, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const over = await p.evaluate(() => [...document.querySelectorAll('.page')].map((s, i) => {
    const r = s.getBoundingClientRect(); let worst = 0;
    s.querySelectorAll('*').forEach(e => { const q = e.getBoundingClientRect(); if (q.height && !e.closest('.scr') && getComputedStyle(e).position !== 'absolute') worst = Math.max(worst, q.bottom - r.bottom); });
    return [i + 1, Math.round(worst)];
  }).filter(x => x[1] > -40));
  console.log('near/over bottom (px past page edge):', JSON.stringify(over));
  await p.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
