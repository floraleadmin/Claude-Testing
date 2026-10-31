'use strict';
// Lokale Testumgebung: statischer Server + MQTT-Broker (aedes) über WebSocket.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
  '.md': 'text/plain; charset=utf-8',
};

function startStatic(port) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      return res.end('not found');
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}

function startBroker(port, modulesDir) {
  const req = (m) => require(modulesDir ? path.join(modulesDir, m) : m);
  const aedes = req('aedes')();
  const ws = req('websocket-stream');
  const server = http.createServer();
  ws.createServer({ server }, aedes.handle);
  return new Promise((r) =>
    server.listen(port, () =>
      r({
        server,
        aedes,
        close: () => new Promise((res) => aedes.close(() => server.close(() => res()))),
      })
    )
  );
}

module.exports = { startStatic, startBroker };

if (require.main === module) {
  const mods = process.env.NODE_MODULES_DIR;
  (async () => {
    await startStatic(8080);
    await startBroker(8881, mods);
    await startBroker(8882, mods);
    console.log('static :8080, broker ws :8881 :8882');
  })();
}
