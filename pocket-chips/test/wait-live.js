'use strict';
// Wartet, bis die veröffentlichte Seite den Stand dieses Commits ausliefert.
const base = process.env.BASE_URL;
const sha = process.env.GITHUB_SHA;
const until = Date.now() + 12 * 60 * 1000;
(async () => {
  for (;;) {
    try {
      const r = await fetch(base + 'version.json?ts=' + Date.now(), { cache: 'no-store' });
      if (r.ok) {
        const j = await r.json();
        if (j.sha === sha) {
          console.log('Live-Seite ist auf', sha);
          return;
        }
        console.log('Live-Seite noch auf', j.sha);
      } else console.log('HTTP', r.status);
    } catch (e) {
      console.log('Fehler', e.message);
    }
    if (Date.now() > until) {
      console.log('Seite wurde für diesen Commit nicht veröffentlicht – Live-Test übersprungen.');
      process.exit(3);
    }
    await new Promise((r) => setTimeout(r, 15000));
  }
})();
