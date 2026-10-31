'use strict';
/*
 * Prüft die öffentlichen MQTT-Broker aus sync.js: Verbindung über WebSocket (wss),
 * Veröffentlichen eines großen "retained" Spielstands und Empfang durch einen
 * zweiten Client, der sich erst danach verbindet.
 */
const fs = require('fs');
const path = require('path');

const MODS = process.env.NODE_MODULES_DIR;
const mqtt = require(MODS ? path.join(MODS, 'mqtt') : 'mqtt');
const src = fs.readFileSync(path.join(__dirname, '..', 'sync.js'), 'utf8');
const urls = [...src.matchAll(/'(wss:\/\/[^']+)'/g)].map((m) => m[1]);
// Zusätzliche Kandidaten nur zur Info (zählen nicht für das Ergebnis).
const extra = (process.env.EXTRA_BROKERS || '')
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean);

function once(client, ev, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(ev + ' timeout')), ms);
    client.once(ev, (...a) => {
      clearTimeout(t);
      resolve(a);
    });
    client.once('error', (e) => {
      clearTimeout(t);
      reject(e);
    });
  });
}

async function check(url) {
  const topic = 'pocketchips/v1/CI' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const payload = JSON.stringify({ app: 'pocketchips', pad: 'x'.repeat(45000), t: Date.now() });
  const opts = { protocolVersion: 4, connectTimeout: 12000, reconnectPeriod: 0, clean: true };
  const t0 = Date.now();
  const a = mqtt.connect(url, Object.assign({ clientId: 'pc_ci_a_' + Date.now() }, opts));
  try {
    await once(a, 'connect', 15000);
    const tConn = Date.now() - t0;
    await new Promise((res, rej) => a.publish(topic, payload, { qos: 1, retain: true }, (e) => (e ? rej(e) : res())));
    const b = mqtt.connect(url, Object.assign({ clientId: 'pc_ci_b_' + Date.now() }, opts));
    try {
      await once(b, 'connect', 15000);
      const got = new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('retained message not received')), 12000);
        b.on('message', (tp, msg) => {
          if (tp === topic && msg.length === payload.length) {
            clearTimeout(t);
            resolve();
          }
        });
      });
      b.subscribe(topic, { qos: 0 });
      const t1 = Date.now();
      await got;
      const tRet = Date.now() - t1;
      // Live-Weitergabe
      const live = new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('live message not received')), 10000);
        b.on('message', (tp, msg) => {
          if (tp === topic && String(msg).includes('"live":true')) {
            clearTimeout(t);
            resolve();
          }
        });
      });
      const t2 = Date.now();
      a.publish(topic, JSON.stringify({ live: true, pad: 'y'.repeat(30000) }), { qos: 0, retain: true });
      await live;
      const tLive = Date.now() - t2;
      // aufräumen
      a.publish(topic, '', { qos: 1, retain: true });
      await new Promise((r) => setTimeout(r, 300));
      return { url, ok: true, connectMs: tConn, retainedMs: tRet, liveMs: tLive };
    } finally {
      b.end(true);
    }
  } catch (e) {
    return { url, ok: false, error: e.message };
  } finally {
    a.end(true);
  }
}

(async () => {
  const res = [];
  for (const u of urls) res.push(await check(u));
  console.table(res);
  const ok = res.filter((r) => r.ok).length;
  console.log(`${ok} von ${res.length} Brokern funktionieren`);
  if (extra.length) {
    const ex = [];
    for (const u of extra) ex.push(await check(u));
    console.log('Weitere Kandidaten:');
    console.table(ex);
  }
  if (ok < 2) process.exit(1);
})();
