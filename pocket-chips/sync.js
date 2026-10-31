/*
 * Pocket Chips – Synchronisation über öffentliche MQTT-Broker.
 *
 * Jeder Tisch ist ein Topic. Der komplette Spielstand wird als "retained" Nachricht
 * veröffentlicht, mit Version v und Schreiber-ID w. Jedes Gerät übernimmt immer den
 * höchsten Stand (v, dann w). Mehrere Broker laufen parallel; jedes Gerät reicht
 * fehlende Stände an Broker weiter, die zurückliegen. Aktionen, die gegen einen
 * gleichzeitigen Stand verloren haben, werden automatisch neu angewendet, sofern
 * sie noch passen.
 */
(function (root) {
  'use strict';
  const E = root.PCEngine;

  const DEFAULT_BROKERS = [
    'wss://broker.emqx.io:8084/mqtt',
    'wss://broker.hivemq.com:8884/mqtt',
    'wss://test.mosquitto.org:8081/mqtt',
  ];
  const CODE_ABC = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const TOPIC_PREFIX = 'pocketchips/v1/';

  function makeCode() {
    const buf = new Uint32Array(6);
    crypto.getRandomValues(buf);
    let c = '';
    for (let i = 0; i < 6; i++) c += CODE_ABC[buf[i] % CODE_ABC.length];
    return c;
  }
  function normCode(raw) {
    const c = String(raw || '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    return /^[A-Z0-9]{4,10}$/.test(c) ? c : null;
  }
  function cmp(a, b) {
    if (!a && !b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    if (a.v !== b.v) return a.v < b.v ? -1 : 1;
    return a.w < b.w ? -1 : a.w > b.w ? 1 : 0;
  }
  const key = (s) => (s ? { v: s.v, w: s.w } : null);

  class Room {
    constructor(opts) {
      this.code = opts.code;
      this.topic = TOPIC_PREFIX + opts.code;
      this.urls = opts.brokers && opts.brokers.length ? opts.brokers : DEFAULT_BROKERS;
      this.onChange = opts.onChange || function () {};
      this.onStatus = opts.onStatus || function () {};
      this.onNotice = opts.onNotice || function () {};
      this.writer = E.uid(8);
      this.seq = 0;
      this.state = opts.initial && E.validState(opts.initial) && opts.initial.room === opts.code ? opts.initial : null;
      this.pending = [];
      this.brokers = this.urls.map((url) => ({ url, client: null, connected: false, subscribed: false, subAt: 0, seen: null, got: false, lastPub: 0, behind: 0, fails: 0, jitter: Math.random() * 900 }));
      this.startedAt = 0;
      this.timer = null;
      this.closed = false;
      this.hiddenAt = 0;
      this._vis = () => this.onVisibility();
      this._online = () => this.reconnectAll();
      this._show = (e) => {
        if (e.persisted) this.reconnectAll();
      };
    }

    start() {
      this.startedAt = Date.now();
      this.brokers.forEach((b) => this.connect(b));
      this.timer = setInterval(() => this.tick(), 400);
      if (typeof document !== 'undefined') document.addEventListener('visibilitychange', this._vis);
      if (typeof window !== 'undefined') {
        window.addEventListener('online', this._online);
        window.addEventListener('pageshow', this._show);
      }
      this.emitStatus();
    }

    stop() {
      this.closed = true;
      clearInterval(this.timer);
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', this._vis);
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', this._online);
        window.removeEventListener('pageshow', this._show);
      }
      this.brokers.forEach((b) => {
        if (b.client) {
          try {
            b.client.end(true);
          } catch (e) {
            /* egal */
          }
        }
        b.client = null;
      });
    }

    connect(b) {
      if (this.closed || typeof root.mqtt === 'undefined') return;
      if (b.client) {
        try {
          b.client.removeAllListeners();
          b.client.end(true);
        } catch (e) {
          /* egal */
        }
      }
      b.connected = false;
      b.subscribed = false;
      b.seen = null;
      b.got = false;
      let client;
      try {
        client = root.mqtt.connect(b.url, {
          clientId: 'pc_' + E.uid(12),
          clean: true,
          keepalive: 20,
          reconnectPeriod: 2500,
          connectTimeout: 10000,
          resubscribe: false,
          protocolVersion: 4,
        });
      } catch (e) {
        return;
      }
      b.client = client;
      client.on('connect', () => {
        if (b.client !== client) return;
        b.connected = true;
        b.subscribed = false;
        b.seen = null;
        b.got = false;
        client.subscribe(this.topic, { qos: 0 }, (err) => {
          if (b.client !== client) return;
          if (!err) {
            b.subscribed = true;
            b.subAt = Date.now();
            b.behind = 0;
            b.fails = 0;
          }
          this.emitStatus();
        });
        this.emitStatus();
      });
      const down = () => {
        if (b.client !== client) return;
        if (b.connected || b.subscribed) {
          b.connected = false;
          b.subscribed = false;
          this.emitStatus();
        }
      };
      client.on('close', down);
      client.on('offline', down);
      client.on('error', () => {});
      client.on('message', (topic, payload) => {
        if (b.client !== client || topic !== this.topic) return;
        this.onMessage(b, payload);
      });
    }

    reconnectAll() {
      if (this.closed) return;
      this.brokers.forEach((b) => this.connect(b));
      this.emitStatus();
    }

    onVisibility() {
      if (document.visibilityState === 'hidden') {
        this.hiddenAt = Date.now();
        return;
      }
      // Nach dem Entsperren des Handys sind Websockets oft tot, ohne es zu merken.
      const away = this.hiddenAt ? Date.now() - this.hiddenAt : 0;
      this.hiddenAt = 0;
      if (away > 4000 || !this.brokers.some((b) => b.subscribed)) this.reconnectAll();
    }

    onMessage(b, payload) {
      let s;
      try {
        const txt = typeof payload === 'string' ? payload : payload.toString();
        if (!txt) return;
        s = JSON.parse(txt);
      } catch (e) {
        return;
      }
      if (!E.validState(s) || s.room !== this.code) return;
      b.got = true;
      if (cmp(s, b.seen) > 0) b.seen = key(s);
      if (cmp(s, this.state) > 0) this.adopt(s);
      else this.emitStatus();
    }

    adopt(s) {
      this.state = s;
      this.onChange(s, 'remote');
      this.retryPending();
      this.emitStatus();
    }

    retryPending() {
      const now = Date.now();
      const keep = [];
      for (const p of this.pending) {
        if (p.until < now) continue;
        if (this.state.ids.includes(p.a.id)) {
          // Ist im aktuellen Stand enthalten. Weiter beobachten, falls ein
          // konkurrierender Stand gewinnt.
          keep.push(p);
          continue;
        }
        const r = E.apply(this.state, p.a);
        if (r.ok) {
          this.commit(r.state);
          keep.push(p);
        } else if (r.code !== 'dup' && p.a.type === 'act') {
          this.onNotice('Deine letzte Aktion konnte nicht übernommen werden – bitte prüfen.');
        } else if (r.code !== 'dup' && p.a.type === 'join') {
          this.onNotice('Beitritt nicht möglich: ' + r.err);
        }
      }
      this.pending = keep;
    }

    ready() {
      const now = Date.now();
      return this.brokers.some((b) => b.subscribed && (b.got || now - b.subAt > 700));
    }

    status() {
      const now = Date.now();
      const connected = this.brokers.filter((b) => b.subscribed).length;
      const ready = this.ready();
      return {
        connected,
        total: this.brokers.length,
        ready,
        notFound: ready && !this.state && this.brokers.some((b) => b.subscribed && now - b.subAt > 3500),
        offline: connected === 0 && now - this.startedAt > 6000,
      };
    }

    emitStatus() {
      const st = this.status();
      const k = JSON.stringify(st);
      if (k === this._lastStatus) return;
      this._lastStatus = k;
      this.onStatus(st);
    }

    // Neuen Tisch anlegen.
    create(s) {
      this.state = null;
      this.commit(s);
    }

    submit(a) {
      if (!this.state) return { ok: false, err: 'Noch kein Spielstand geladen' };
      const action = Object.assign({}, a, { id: E.uid(12), t: Date.now() });
      const r = E.apply(this.state, action);
      if (!r.ok) return r;
      this.commit(r.state);
      this.pending.push({ a: action, until: Date.now() + 15000 });
      if (this.pending.length > 20) this.pending.shift();
      return r;
    }

    commit(ns) {
      ns.v = (this.state ? this.state.v : 0) + 1;
      ns.w = this.writer + '.' + String(++this.seq).padStart(6, '0');
      ns.t = Date.now();
      this.state = ns;
      this.publishAll();
      this.onChange(ns, 'local');
      this.emitStatus();
    }

    publish(b) {
      if (!b.client || !b.connected || !this.state) return;
      try {
        b.client.publish(this.topic, JSON.stringify(this.state), { qos: 0, retain: true });
        b.lastPub = Date.now();
      } catch (e) {
        /* nächster Versuch im tick */
      }
    }

    publishAll() {
      this.brokers.forEach((b) => this.publish(b));
    }

    tick() {
      const now = Date.now();
      if (this.state) {
        for (const b of this.brokers) {
          if (!b.subscribed) continue;
          if (now - b.subAt < 700) continue; // erst den gespeicherten Stand abwarten
          if (cmp(b.seen, this.state) >= 0) {
            b.behind = 0;
            b.fails = 0;
            continue;
          }
          if (b.lastPub < b.subAt) {
            // Erster Abgleich nach dem (Neu-)Verbinden: Broker kennt unseren Stand nicht.
            this.publish(b);
            b.fails = 1;
            continue;
          }
          if (!b.behind) {
            b.behind = now;
            continue;
          }
          if (now - b.behind < 1200 + b.jitter) continue;
          const wait = Math.min(30000, 1500 * Math.pow(2, b.fails));
          if (now - b.lastPub < wait) continue;
          this.publish(b);
          b.fails += 1;
          b.jitter = Math.random() * 900;
        }
      }
      this.emitStatus();
    }
  }

  root.PCSync = { Room, makeCode, normCode, cmp, DEFAULT_BROKERS };
})(typeof self !== 'undefined' ? self : this);
