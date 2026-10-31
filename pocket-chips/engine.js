/*
 * Pocket Chips – Spiel-Engine (No-Limit Texas Hold'em & Blackjack)
 *
 * Reine, deterministische Zustandsfunktionen: apply(state, action) liefert einen
 * neuen Zustand oder einen Regelverstoß. Karten gibt es hier nicht – die liegen
 * echt auf dem Tisch. Die Engine verwaltet nur Chips, Reihenfolge und Pots.
 */
(function (root, factory) {
  const E = factory();
  if (typeof module === 'object' && module.exports) module.exports = E;
  else root.PCEngine = E;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Blind-Stufen (Multiplikator auf die Basis-Blinds) für "Blinds steigen".
  const LADDER = [1, 2, 3, 4, 6, 8, 10, 15, 20, 30, 40, 60, 80, 100, 150, 200, 300, 400, 600, 800, 1000];
  const STREETS = ['Preflop', 'Flop', 'Turn', 'River'];
  const LIMITS = { undo: 10, ids: 80, feed: 40, players: 12, name: 16 };
  const MAXN = 1e9;

  const CFG_DEFAULT = {
    game: 'poker', // 'poker' | 'bj'
    start: 1000, // Startchips (auch Standard beim Nachkaufen)
    sb: 5,
    bb: 10,
    ante: 0,
    bombEvery: 0, // jede n-te Hand ein Bomb Pot (0 = aus)
    bombBB: 5, // Bomb-Pot-Einsatz in Big Blinds
    levelEvery: 0, // Blinds steigen alle n Hände (0 = aus)
    sevenDeuce: 0, // 7-2-Bonus in Big Blinds pro Mitspieler (0 = aus)
    bjMin: 10,
    bjMax: 0, // 0 = ohne Limit
    bank: null, // Blackjack-Bank: null = Haus, sonst Spieler-ID
  };

  const PRESETS = {
    classic: { ante: 0, bombEvery: 0, bombBB: 5, levelEvery: 0, sevenDeuce: 0 },
    // Action-Modus – gemacht für drei Spieler: jede Runde (3 Hände) ein Bomb Pot,
    // alle 9 Hände steigen die Blinds, und wer mit 7-2 gewinnt, kassiert einen Bonus.
    action: { ante: 0, bombEvery: 3, bombBB: 5, levelEvery: 9, sevenDeuce: 2 },
  };

  const NUM_KEYS = ['start', 'sb', 'bb', 'ante', 'bombEvery', 'bombBB', 'levelEvery', 'sevenDeuce', 'bjMin', 'bjMax'];
  // Diese Felder stellt "Rückgängig" wieder her.
  const SNAP_KEYS = ['cfg', 'players', 'btn', 'btnFixed', 'handNo', 'levelStart', 'bombNext', 'hand', 'bjNo', 'bj', 'bjLast'];
  const NO_UNDO = new Set(['join', 'rename', 'undo']);

  class RuleError extends Error {}
  const fail = (m) => {
    throw new RuleError(m);
  };
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const isNum = (n) => Number.isInteger(n) && n >= 0 && n <= MAXN;

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a || 1;
  }

  function fmt(n) {
    const v = Math.round(Number(n) || 0);
    const s = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (v < 0 ? '−' : '') + s;
  }

  function uid(len) {
    const n = len || 10;
    const abc = 'abcdefghijkmnopqrstuvwxyz23456789';
    let out = '';
    const c = typeof crypto !== 'undefined' && crypto.getRandomValues ? crypto : null;
    const buf = new Uint32Array(n);
    if (c) c.getRandomValues(buf);
    else for (let i = 0; i < n; i++) buf[i] = Math.floor(Math.random() * 4294967296);
    for (let i = 0; i < n; i++) out += abc[buf[i] % abc.length];
    return out;
  }

  function cleanName(n) {
    return String(n == null ? '' : n)
      .replace(/[\u0000-\u001f<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, LIMITS.name);
  }

  function player(s, id) {
    const p = s.players.find((x) => x.id === id);
    if (!p) fail('Spieler nicht gefunden');
    return p;
  }
  function nameOf(s, id) {
    const p = s.players.find((x) => x.id === id);
    return p ? p.name : '?';
  }

  function checkCfg(c, players) {
    if (c.game !== 'poker' && c.game !== 'bj') fail('Unbekanntes Spiel');
    for (const k of NUM_KEYS) if (!isNum(c[k])) fail('Bitte nur ganze Zahlen ab 0 eingeben');
    if (c.start < 1) fail('Startchips: mindestens 1');
    if (c.sb < 1) fail('Small Blind: mindestens 1');
    if (c.bb < c.sb) fail('Big Blind muss mindestens so groß wie der Small Blind sein');
    if (c.bombBB < 1) fail('Bomb Pot: mindestens 1 Big Blind');
    if (c.bjMin < 1) fail('Mindesteinsatz: mindestens 1');
    if (c.bjMax && c.bjMax < c.bjMin) fail('Höchsteinsatz muss mindestens so groß wie der Mindesteinsatz sein');
    if (c.bank !== null && !players.some((p) => p.id === c.bank)) fail('Bank-Spieler nicht gefunden');
  }

  // ---------------------------------------------------------------- Feed / Notizen
  let NOTES = null;
  function note(m) {
    if (NOTES) NOTES.push(m);
  }

  // ---------------------------------------------------------------- Raum
  function newRoom(code, cfgIn, me) {
    const cfg = Object.assign({}, CFG_DEFAULT, cfgIn || {});
    cfg.bank = null;
    checkCfg(cfg, []);
    const name = cleanName(me && me.name);
    if (!name) fail('Bitte gib deinen Namen ein');
    const s = {
      app: 'pocketchips',
      sv: 1,
      room: code,
      v: 0,
      w: '',
      t: 0,
      cfg,
      players: [{ id: me.id, name, stack: cfg.start, buyin: cfg.start, out: false }],
      btn: me.id,
      btnFixed: true,
      handNo: 0,
      levelStart: 0,
      bombNext: false,
      hand: null,
      bjNo: 0,
      bj: null,
      bjLast: {},
      ids: [],
      feed: [],
      undo: [],
    };
    if (cfg.game === 'bj') s.bj = newBj(s);
    return s;
  }

  // ---------------------------------------------------------------- Poker – Hilfsfunktionen
  function pokerBusy(s) {
    return !!(s.hand && s.hand.phase !== 'done');
  }
  function bjBusy(s) {
    return !!(s.bj && s.bj.phase === 'play');
  }
  function locked(s, id) {
    const h = s.hand;
    if (h && h.phase !== 'done' && h.order.includes(id)) return 'Erst nach der Hand möglich';
    const r = s.bj;
    if (r && r.phase === 'play' && (r.hands[id] || r.bank === id)) return 'Erst nach der Runde möglich';
    return null;
  }

  function levelFor(s, no) {
    const e = s.cfg.levelEvery;
    if (!e) return 0;
    return Math.min(LADDER.length - 1, Math.max(0, Math.floor((no - 1 - s.levelStart) / e)));
  }
  function blindsFor(s, no) {
    const lvl = levelFor(s, no);
    const m = LADDER[lvl];
    return { lvl, sb: s.cfg.sb * m, bb: s.cfg.bb * m, ante: s.cfg.ante * m };
  }
  // Wie viele Hände (inkl. der nächsten) noch auf der aktuellen Stufe gespielt werden.
  function handsLeftOnLevel(s) {
    const e = s.cfg.levelEvery;
    if (!e) return null;
    const idx = s.handNo - s.levelStart; // Index der nächsten Hand ab Start
    return e - (((idx % e) + e) % e);
  }

  function pickDealer(s, partIds) {
    if (s.btnFixed && partIds.includes(s.btn)) return s.btn;
    const ids = s.players.map((p) => p.id);
    const n = ids.length;
    const idx = ids.indexOf(s.btn);
    for (let k = 1; k <= n; k++) {
      const c = ids[(((idx + k) % n) + n) % n];
      if (partIds.includes(c)) return c;
    }
    return partIds[0];
  }

  function nextHandInfo(s) {
    const parts = s.players.filter((p) => !p.out && p.stack > 0).map((p) => p.id);
    const no = s.handNo + 1;
    const b = blindsFor(s, no);
    const bomb = !!(s.bombNext || (s.cfg.bombEvery > 0 && no % s.cfg.bombEvery === 0));
    return { no, parts, dealer: parts.length ? pickDealer(s, parts) : null, lvl: b.lvl, sb: b.sb, bb: b.bb, ante: b.ante, bomb };
  }

  function put(s, h, id, amt, dead) {
    const pl = player(s, id);
    const x = h.p[id];
    const a = Math.max(0, Math.min(amt, pl.stack));
    pl.stack -= a;
    x.tot += a;
    if (!dead) x.bet += a;
    if (pl.stack === 0) x.allin = true;
    return a;
  }

  const live = (h) => h.order.filter((id) => !h.p[id].fold);
  const active = (h) => h.order.filter((id) => !h.p[id].fold && !h.p[id].allin);
  function potSize(h) {
    let t = 0;
    for (const id of h.order) t += h.p[id].tot;
    return t;
  }
  function needs(h, id) {
    const x = h.p[id];
    return !x.fold && !x.allin && (!x.acted || x.bet < h.cb);
  }
  function nextActor(h, fromIdx) {
    const n = h.order.length;
    for (let k = 1; k <= n; k++) {
      const id = h.order[(((fromIdx + k) % n) + n) % n];
      if (needs(h, id)) return id;
    }
    return null;
  }
  function roundDone(h) {
    if (live(h).length <= 1) return true;
    const act = active(h);
    if (act.length === 0) return true;
    // Nur noch einer kann setzen: fertig, sobald er mindestens den höchsten Einsatz gebracht hat.
    if (act.length === 1) return h.p[act[0]].bet >= h.cb;
    return act.every((id) => h.p[id].acted && h.p[id].bet === h.cb);
  }
  function ctxOf(h) {
    return [h.no, h.st, h.acts, h.cur].join(':');
  }

  // Was darf Spieler pid gerade tun? (Gemeinsame Quelle für UI und Regelprüfung.)
  function options(s, pid) {
    const h = s.hand;
    if (!h || h.phase !== 'bet' || h.cur !== pid) return null;
    const x = h.p[pid];
    const pl = s.players.find((p) => p.id === pid);
    if (!x || !pl) return null;
    const toCall = Math.max(0, h.cb - x.bet);
    const maxTo = x.bet + pl.stack;
    // Ein unvollständiger All-in-Raise öffnet die Setzrunde nicht wieder für Spieler,
    // die schon gehandelt haben – außer die Erhöhung seit ihrer Aktion ist ein voller Raise.
    const reopened = x.at === null || h.cb - x.at >= h.mr;
    const canRaise = reopened && maxTo > h.cb;
    return {
      toCall,
      canCheck: toCall === 0,
      callAmt: Math.min(toCall, pl.stack),
      callAllIn: toCall > 0 && pl.stack <= toCall,
      canRaise,
      minTo: Math.min(h.cb + h.mr, maxTo),
      maxTo,
      isBet: h.cb === 0,
      cb: h.cb,
      bet: x.bet,
      stack: pl.stack,
      pot: potSize(h),
      step: h.sb,
      ctx: ctxOf(h),
    };
  }

  function computePots(h) {
    const ids = h.order;
    const lv = live(h);
    const levels = [...new Set(lv.map((id) => h.p[id].tot))].filter((v) => v > 0).sort((a, b) => a - b);
    const pots = [];
    let prev = 0;
    for (const L of levels) {
      let amt = 0;
      for (const id of ids) amt += Math.min(h.p[id].tot, L) - Math.min(h.p[id].tot, prev);
      const el = lv.filter((id) => h.p[id].tot >= L);
      if (amt > 0) pots.push({ amt, el, win: null });
      prev = L;
    }
    let total = 0;
    for (const id of ids) total += h.p[id].tot;
    const assigned = pots.reduce((a, p) => a + p.amt, 0);
    if (total > assigned) {
      if (pots.length) pots[pots.length - 1].amt += total - assigned;
      else pots.push({ amt: total - assigned, el: lv.slice(), win: null });
    }
    return pots;
  }

  function distribute(s, h) {
    const n = h.order.length;
    const d = h.order.indexOf(h.dealer);
    const pos = (id) => (((h.order.indexOf(id) - d - 1) % n) + n) % n; // 0 = links vom Dealer
    const lvCount = live(h).length;
    const won = {};
    const back = {};
    for (const p of h.pots) {
      const ws = p.win.slice().sort((a, b) => pos(a) - pos(b));
      // Ungerade Chips: kleinste Einheit = ggT(Pot, Small Blind); Rest geht an den
      // ersten Gewinner links vom Dealer.
      const unit = gcd(p.amt, h.sb);
      const units = p.amt / unit;
      const k = ws.length;
      const share = Math.floor(units / k);
      const rem = units % k;
      const target = p.auto && lvCount > 1 ? back : won;
      ws.forEach((id, i) => {
        target[id] = (target[id] || 0) + (share + (i < rem ? 1 : 0)) * unit;
      });
    }
    h.net = {};
    for (const id of h.order) {
      const got = (won[id] || 0) + (back[id] || 0);
      const pl = s.players.find((p) => p.id === id);
      if (pl && got) pl.stack += got;
      h.net[id] = got - h.p[id].tot;
    }
    h.won = won;
    h.back = back;
    h.phase = 'done';
    h.cur = null;
    const parts = h.order.filter((id) => won[id] > 0).map((id) => `${nameOf(s, id)} gewinnt ${fmt(won[id])}`);
    const backs = h.order.filter((id) => back[id] > 0).map((id) => `${nameOf(s, id)} bekommt ${fmt(back[id])} zurück`);
    note(parts.concat(backs).join(' · ') || 'Hand beendet');
  }

  function finish(s, h) {
    h.cur = null;
    const lv = live(h);
    h.runout = lv.length > 1 && h.st < 3;
    h.pots = computePots(h);
    for (const p of h.pots) {
      if (p.el.length === 1) {
        p.win = p.el.slice();
        p.auto = true;
      }
    }
    if (h.pots.every((p) => p.win)) distribute(s, h);
    else {
      h.phase = 'show';
      note(h.runout ? 'Showdown – Board fertig austeilen' : 'Showdown');
    }
  }

  function endStreet(s, h) {
    if (live(h).length > 1 && h.st < 3 && active(h).length >= 2) {
      for (const id of h.order) {
        const x = h.p[id];
        x.bet = 0;
        x.acted = false;
        x.at = null;
        if (!x.fold && !x.allin) x.last = '';
      }
      h.cb = 0;
      h.mr = h.bb;
      h.st += 1;
      h.cur = nextActor(h, h.order.indexOf(h.dealer));
      note(STREETS[h.st]);
      return;
    }
    finish(s, h);
  }

  function advance(s, h, idx) {
    if (live(h).length <= 1 || roundDone(h)) return endStreet(s, h);
    h.cur = nextActor(h, idx);
    if (!h.cur) endStreet(s, h);
  }

  // ---------------------------------------------------------------- Poker – Aktionen
  function startHand(s) {
    if (s.cfg.game !== 'poker') fail('Gerade läuft Blackjack');
    if (pokerBusy(s)) fail('Die Hand läuft noch');
    const info = nextHandInfo(s);
    if (info.parts.length < 2) fail('Mindestens 2 Spieler mit Chips nötig');
    const order = info.parts;
    const n = order.length;
    const d = order.indexOf(info.dealer);
    const h = {
      no: info.no,
      bomb: info.bomb,
      lvl: info.lvl,
      sb: info.sb,
      bb: info.bb,
      ante: info.bomb ? 0 : info.ante,
      bombAmt: 0,
      order,
      dealer: info.dealer,
      sbP: null,
      bbP: null,
      st: 0,
      phase: 'bet',
      p: {},
      cur: null,
      cb: 0,
      mr: info.bb,
      acts: 0,
      pots: null,
      won: null,
      back: null,
      net: null,
      sd: null,
      runout: false,
    };
    for (const id of order) h.p[id] = { bet: 0, tot: 0, fold: false, allin: false, acted: false, at: null, last: '' };
    s.hand = h;
    s.handNo = info.no;
    s.btn = info.dealer;
    s.btnFixed = false;
    s.bombNext = false;
    let label;
    if (h.bomb) {
      h.bombAmt = s.cfg.bombBB * h.bb;
      for (const id of order) put(s, h, id, h.bombAmt, true);
      h.st = 1; // direkt zum Flop
      label = `Hand ${h.no} · Bomb Pot: ${fmt(h.bombAmt)} pro Spieler`;
    } else {
      if (h.ante > 0) for (const id of order) put(s, h, id, h.ante, true);
      if (n === 2) {
        // Heads-up: Dealer ist Small Blind und handelt preflop zuerst.
        h.sbP = order[d];
        h.bbP = order[(d + 1) % 2];
      } else {
        h.sbP = order[(d + 1) % n];
        h.bbP = order[(d + 2) % n];
      }
      put(s, h, h.sbP, h.sb, false);
      put(s, h, h.bbP, h.bb, false);
      h.cb = h.bb;
      label = `Hand ${h.no} · Dealer ${nameOf(s, h.dealer)} · Blinds ${fmt(h.sb)}/${fmt(h.bb)}`;
    }
    for (const id of order) if (h.p[id].allin) h.p[id].last = 'All-in';
    const from = h.bomb ? d : order.indexOf(h.bbP);
    if (roundDone(h)) endStreet(s, h);
    else {
      h.cur = nextActor(h, from);
      if (!h.cur) endStreet(s, h);
    }
    return label;
  }

  function act(s, a) {
    const h = s.hand;
    if (!h || h.phase !== 'bet') fail('Gerade wird nicht gesetzt');
    const o = options(s, a.pid);
    if (!o) fail(`${nameOf(s, h.cur)} ist am Zug`);
    if (a.ctx && a.ctx !== o.ctx) fail('Der Spielstand hat sich geändert');
    const x = h.p[a.pid];
    const name = nameOf(s, a.pid);
    const idx = h.order.indexOf(a.pid);
    let label;
    let kind = a.kind;
    let to = a.to;
    if (kind === 'allin') {
      if (o.canRaise) to = o.maxTo;
      else if (o.callAllIn) kind = 'call';
      else fail('All-in ist hier nicht erlaubt – nur Call oder Fold');
      if (kind === 'allin') kind = 'raise';
    }
    if (kind === 'fold') {
      x.fold = true;
      x.acted = true;
      x.last = 'Fold';
      label = `${name}: Fold`;
    } else if (kind === 'check') {
      if (!o.canCheck) fail('Check geht nicht – es liegt ein Einsatz');
      x.acted = true;
      x.at = h.cb;
      x.last = 'Check';
      label = `${name}: Check`;
    } else if (kind === 'call') {
      if (o.toCall <= 0) fail('Es gibt nichts zu callen');
      const amt = put(s, h, a.pid, o.callAmt, false);
      x.acted = true;
      x.at = h.cb;
      x.last = x.allin ? 'All-in' : 'Call';
      label = x.allin ? `${name}: All-in (${fmt(x.bet)})` : `${name}: Call ${fmt(amt)}`;
    } else if (kind === 'raise') {
      if (!o.canRaise) fail('Erhöhen ist hier nicht erlaubt');
      if (!Number.isInteger(to)) fail('Ungültiger Betrag');
      if (to > o.maxTo) fail('Nicht genug Chips');
      if (to < o.minTo) fail(`Mindestens ${fmt(o.minTo)}`);
      const wasBet = h.cb === 0;
      const inc = to - h.cb;
      if (inc >= h.mr) h.mr = inc; // voller Raise: neue Mindesterhöhung
      h.cb = to;
      put(s, h, a.pid, to - x.bet, false);
      x.acted = true;
      x.at = to;
      for (const id of h.order) if (id !== a.pid && !h.p[id].fold && !h.p[id].allin) h.p[id].acted = false;
      x.last = x.allin ? 'All-in' : wasBet ? 'Bet' : 'Raise';
      label = x.allin ? `${name}: All-in (${fmt(to)})` : wasBet ? `${name}: Bet ${fmt(to)}` : `${name}: Raise auf ${fmt(to)}`;
    } else fail('Unbekannte Aktion');
    h.acts += 1;
    advance(s, h, idx);
    return label;
  }

  function win(s, a) {
    const h = s.hand;
    if (!h || h.phase !== 'show') fail('Gerade ist kein Showdown');
    const i = h.pots.findIndex((p) => !p.win);
    if (a.pot !== i) fail('Der Spielstand hat sich geändert');
    const pot = h.pots[i];
    const ids = [...new Set(Array.isArray(a.ids) ? a.ids : [])];
    if (!ids.length) fail('Bitte Gewinner auswählen');
    if (!ids.every((id) => pot.el.includes(id))) fail('Dieser Spieler spielt nicht um diesen Pot');
    pot.win = h.order.filter((id) => ids.includes(id));
    pot.by = 1;
    // Wer einen größeren Pot gewonnen hat, hat auch die beste Hand in jedem kleineren
    // Pot, an dem er beteiligt ist.
    for (let k = i + 1; k < h.pots.length; k++) {
      const q = h.pots[k];
      if (q.win) continue;
      for (let j = 0; j < k; j++) {
        const pj = h.pots[j];
        if (!pj.by || !pj.win) continue;
        const inter = pj.win.filter((id) => q.el.includes(id));
        if (inter.length) {
          q.win = inter;
          q.by = 1;
          break;
        }
      }
    }
    const multi = h.pots.length > 1;
    const potName = multi ? (i === 0 ? 'Hauptpot' : `Nebenpot ${i}`) : 'Pot';
    const names = pot.win.map((id) => nameOf(s, id));
    const label = pot.win.length > 1 ? `${potName} geteilt: ${names.join(' & ')}` : `${potName}: ${names[0]}`;
    if (h.pots.every((p) => p.win)) distribute(s, h);
    return label;
  }

  function sevenDeuce(s, a) {
    const h = s.hand;
    if (!s.cfg.sevenDeuce) fail('7-2-Bonus ist ausgeschaltet');
    if (!h || h.phase !== 'done' || !h.net) fail('Erst nach der Hand');
    if (h.sd) fail('Der Bonus wurde schon vergeben');
    if (!h.order.includes(a.pid) || !(h.net[a.pid] > 0)) fail('Nur der Gewinner der Hand bekommt den Bonus');
    const each = s.cfg.sevenDeuce * h.bb;
    const w = player(s, a.pid);
    let total = 0;
    for (const id of h.order) {
      if (id === a.pid) continue;
      const pl = s.players.find((p) => p.id === id);
      if (!pl) continue;
      const pay = Math.max(0, Math.min(each, pl.stack));
      pl.stack -= pay;
      h.net[id] -= pay;
      total += pay;
    }
    w.stack += total;
    h.net[a.pid] += total;
    h.sd = { pid: a.pid, amt: total };
    return `${w.name}: 7-2-Bonus +${fmt(total)}`;
  }

  function abort(s) {
    if (s.cfg.game === 'poker') {
      const h = s.hand;
      if (!h || h.phase === 'done') fail('Es läuft keine Hand');
      for (const id of h.order) {
        const pl = s.players.find((p) => p.id === id);
        if (pl) pl.stack += h.p[id].tot;
      }
      const scheduled = s.cfg.bombEvery > 0 && h.no % s.cfg.bombEvery === 0;
      s.handNo = h.no - 1;
      s.btn = h.dealer;
      s.btnFixed = true;
      s.bombNext = !!(h.bomb && !scheduled);
      s.hand = null;
      return `Hand ${h.no} abgebrochen – alle Einsätze zurück`;
    }
    const r = s.bj;
    if (!r || r.phase !== 'play') fail('Es läuft keine Runde');
    for (const id of Object.keys(r.hands)) {
      const pl = s.players.find((p) => p.id === id);
      if (!pl) continue;
      let back = r.ins[id] || 0;
      for (const hd of r.hands[id]) back += hd.b;
      pl.stack += back;
    }
    s.bjNo = r.no - 1;
    s.bj = newBj(s);
    return `Runde ${r.no} abgebrochen – alle Einsätze zurück`;
  }

  // ---------------------------------------------------------------- Blackjack
  function newBj(s) {
    s.bjNo = (s.bjNo || 0) + 1;
    return { no: s.bjNo, phase: 'bet', bets: {}, hands: {}, ins: {}, dbj: null, net: null, bank: s.cfg.bank };
  }
  function bjRound(s, phase) {
    const r = s.bj;
    if (s.cfg.game !== 'bj' || !r) fail('Gerade läuft kein Blackjack');
    if (phase && r.phase !== phase) fail(phase === 'bet' ? 'Die Einsätze sind schon gemacht' : 'Gerade nicht möglich');
    return r;
  }
  function bjHand(r, pid, i) {
    const hs = r.hands[pid];
    if (!hs || !hs[i]) fail('Hand nicht gefunden');
    return hs[i];
  }
  function bjPay(hd) {
    if (hd.r === 'win') return hd.b * 2;
    if (hd.r === 'bj') return hd.b + Math.floor((hd.b * 3) / 2); // 3:2
    if (hd.r === 'push') return hd.b;
    return 0;
  }
  function bjSettle(s, r) {
    const ids = s.players.map((p) => p.id).filter((id) => r.hands[id]);
    for (const id of Object.keys(r.hands)) if (!ids.includes(id)) ids.push(id);
    if (!ids.every((id) => r.hands[id].every((hd) => hd.r))) return;
    if (Object.keys(r.ins).length && r.dbj === null) return;
    const net = {};
    let sum = 0;
    for (const id of ids) {
      let pay = 0;
      let staked = r.ins[id] || 0;
      for (const hd of r.hands[id]) {
        staked += hd.b;
        pay += bjPay(hd);
      }
      if (r.ins[id] && r.dbj) pay += r.ins[id] * 3; // Versicherung zahlt 2:1
      const pl = s.players.find((p) => p.id === id);
      if (pl) pl.stack += pay;
      net[id] = pay - staked;
      sum += net[id];
    }
    if (r.bank) {
      const b = s.players.find((p) => p.id === r.bank);
      if (b) {
        b.stack -= sum;
        net[r.bank] = -sum;
      }
    }
    r.net = net;
    r.phase = 'done';
    const txt = ids.map((id) => `${nameOf(s, id)} ${net[id] > 0 ? '+' : ''}${fmt(net[id])}`).join(' · ');
    note(`Runde ${r.no} abgerechnet: ${txt}`);
  }

  const H = {
    // --- Spieler & Tisch
    join(s, a) {
      const name = cleanName(a.name);
      if (!name) fail('Bitte gib deinen Namen ein');
      if (typeof a.pid !== 'string' || !a.pid) fail('Ungültige Spieler-ID');
      if (s.players.some((p) => p.id === a.pid)) fail('Bereits am Tisch');
      if (s.players.length >= LIMITS.players) fail('Der Tisch ist voll');
      if (s.players.some((p) => p.name.toLowerCase() === name.toLowerCase())) fail('Der Name ist schon vergeben');
      s.players.push({ id: a.pid, name, stack: s.cfg.start, buyin: s.cfg.start, out: false });
      return `${name} ist dabei`;
    },
    rename(s, a) {
      const pl = player(s, a.pid);
      const name = cleanName(a.name);
      if (!name) fail('Bitte einen Namen eingeben');
      if (s.players.some((p) => p.id !== pl.id && p.name.toLowerCase() === name.toLowerCase())) fail('Der Name ist schon vergeben');
      if (name === pl.name) fail('Der Name ist unverändert');
      const old = pl.name;
      pl.name = name;
      return `${old} heißt jetzt ${name}`;
    },
    move(s, a) {
      if (pokerBusy(s)) fail('Sitzordnung erst nach der Hand ändern');
      const i = s.players.findIndex((p) => p.id === a.pid);
      if (i < 0) fail('Spieler nicht gefunden');
      const j = i + (a.dir < 0 ? -1 : 1);
      if (j < 0 || j >= s.players.length) fail('Geht nicht weiter');
      const t = s.players[i];
      s.players[i] = s.players[j];
      s.players[j] = t;
      return 'Sitzordnung geändert';
    },
    setDealer(s, a) {
      if (pokerBusy(s)) fail('Erst nach der Hand möglich');
      const pl = player(s, a.pid);
      s.btn = pl.id;
      s.btnFixed = true;
      return `Dealer-Button: ${pl.name}`;
    },
    sitOut(s, a) {
      const pl = player(s, a.pid);
      pl.out = !!a.out;
      return pl.out ? `${pl.name} setzt aus` : `${pl.name} spielt wieder mit`;
    },
    remove(s, a) {
      const pl = player(s, a.pid);
      const l = locked(s, pl.id);
      if (l) fail(l);
      const ids = s.players.map((p) => p.id);
      const i = ids.indexOf(pl.id);
      if (s.btn === pl.id && ids.length > 1) {
        // Button an die richtige Stelle: beim nächsten Weiterrücken landet er beim nächsten Sitz.
        s.btn = s.btnFixed ? ids[(i + 1) % ids.length] : ids[(i - 1 + ids.length) % ids.length];
      }
      s.players.splice(i, 1);
      if (s.cfg.bank === pl.id) s.cfg = Object.assign({}, s.cfg, { bank: null });
      if (s.bj && s.bj.bets) delete s.bj.bets[pl.id];
      if (s.bj && s.bj.phase === 'bet' && s.bj.bank === pl.id) s.bj.bank = null;
      return `${pl.name} hat den Tisch verlassen`;
    },
    rebuy(s, a) {
      const pl = player(s, a.pid);
      const l = locked(s, pl.id);
      if (l) fail(l.replace('möglich', 'nachkaufen'));
      if (!isNum(a.amt) || a.amt < 1) fail('Bitte einen Betrag ab 1 eingeben');
      pl.stack += a.amt;
      pl.buyin += a.amt;
      return `${pl.name} kauft ${fmt(a.amt)} nach`;
    },
    setStack(s, a) {
      const pl = player(s, a.pid);
      const l = locked(s, pl.id);
      if (l) fail(l);
      if (!isNum(a.stack)) fail('Bitte eine ganze Zahl ab 0 eingeben');
      if (a.stack === pl.stack) fail('Der Betrag ist unverändert');
      pl.stack = a.stack;
      return `${pl.name}: Chips auf ${fmt(a.stack)} gesetzt`;
    },
    settings(s, a) {
      const patch = a.cfg || {};
      const c = Object.assign({}, s.cfg);
      for (const k of NUM_KEYS) if (k in patch) c[k] = patch[k];
      if ('bank' in patch) {
        c.bank = patch.bank || null;
        if (bjBusy(s) && c.bank !== s.cfg.bank) fail('Die Bank erst nach der Runde wechseln');
      }
      checkCfg(c, s.players);
      const before = JSON.stringify(s.cfg);
      if (c.sb !== s.cfg.sb || c.bb !== s.cfg.bb || c.ante !== s.cfg.ante || c.levelEvery !== s.cfg.levelEvery) s.levelStart = s.handNo;
      s.cfg = c;
      if (JSON.stringify(c) === before) fail('Keine Änderung');
      if (s.bj && s.bj.phase === 'bet') {
        s.bj.bank = c.bank;
        if (c.bank) delete s.bj.bets[c.bank];
      }
      return 'Einstellungen geändert';
    },
    setGame(s, a) {
      if (a.game !== 'poker' && a.game !== 'bj') fail('Unbekanntes Spiel');
      if (s.cfg.game === a.game) fail('Das Spiel läuft schon');
      if (pokerBusy(s) || bjBusy(s)) fail('Erst die laufende Runde beenden');
      s.cfg = Object.assign({}, s.cfg, { game: a.game });
      s.hand = null;
      s.bj = a.game === 'bj' ? newBj(s) : null;
      return a.game === 'bj' ? 'Gewechselt zu Blackjack' : 'Gewechselt zu Poker';
    },
    bombNext(s, a) {
      if (s.cfg.game !== 'poker') fail('Nur beim Poker');
      s.bombNext = !!a.on;
      return s.bombNext ? 'Nächste Hand: Bomb Pot' : 'Kein Bomb Pot in der nächsten Hand';
    },
    abort,
    undo(s, a) {
      const e = s.undo[s.undo.length - 1];
      if (!e) fail('Nichts zum Rückgängigmachen');
      if (a.ctx && a.ctx !== undoCtx(s)) fail('Inzwischen ist etwas passiert – bitte nochmal prüfen');
      s.undo.pop();
      const cur = s.players;
      for (const k of SNAP_KEYS) s[k] = clone(e.s[k] === undefined ? null : e.s[k]);
      if (!s.bjLast) s.bjLast = {};
      for (const p of s.players) {
        const c = cur.find((x) => x.id === p.id);
        if (c) p.name = c.name;
      }
      // Wer nach dem Schnappschuss beigetreten ist, bleibt am Tisch.
      for (const c of cur) if (!s.players.some((p) => p.id === c.id)) s.players.push(c);
      return `Rückgängig: ${e.l}`;
    },

    // --- Poker
    startHand,
    act,
    win,
    sevenDeuce,

    // --- Blackjack
    bjNew(s) {
      if (s.cfg.game !== 'bj') fail('Gerade läuft kein Blackjack');
      if (s.bj && s.bj.phase !== 'done') fail('Die Runde läuft noch');
      s.bj = newBj(s);
      return `Blackjack · Runde ${s.bj.no}`;
    },
    bjBet(s, a) {
      const r = bjRound(s, 'bet');
      const pl = player(s, a.pid);
      if (s.cfg.bank === pl.id) fail('Die Bank setzt nicht mit');
      if (!isNum(a.amt)) fail('Ungültiger Einsatz');
      if (a.amt === 0) {
        if (!r.bets[pl.id]) fail('Kein Einsatz gesetzt');
        delete r.bets[pl.id];
        return `${pl.name} setzt aus`;
      }
      if (a.amt < s.cfg.bjMin) fail(`Mindesteinsatz ist ${fmt(s.cfg.bjMin)}`);
      if (s.cfg.bjMax && a.amt > s.cfg.bjMax) fail(`Höchsteinsatz ist ${fmt(s.cfg.bjMax)}`);
      if (a.amt > pl.stack) fail('Nicht genug Chips');
      r.bets[pl.id] = a.amt;
      return `${pl.name} setzt ${fmt(a.amt)}`;
    },
    bjDeal(s) {
      const r = bjRound(s, 'bet');
      const bank = s.cfg.bank && s.players.some((p) => p.id === s.cfg.bank) ? s.cfg.bank : null;
      const ids = s.players.map((p) => p.id).filter((id) => r.bets[id] > 0 && id !== bank);
      if (!ids.length) fail('Noch hat niemand gesetzt');
      for (const id of ids) {
        const pl = player(s, id);
        if (r.bets[id] > pl.stack) fail(`${pl.name} hat nicht genug Chips`);
      }
      r.hands = {};
      for (const id of ids) {
        const pl = player(s, id);
        pl.stack -= r.bets[id];
        r.hands[id] = [{ b: r.bets[id], d: 0, r: null }];
        s.bjLast[id] = r.bets[id];
      }
      for (const id of Object.keys(r.bets)) if (!ids.includes(id)) delete r.bets[id];
      r.bank = bank;
      r.phase = 'play';
      return `Runde ${r.no}: Karten geben (${ids.length} ${ids.length === 1 ? 'Spieler' : 'Spieler'})`;
    },
    bjDouble(s, a) {
      const r = bjRound(s, 'play');
      const hd = bjHand(r, a.pid, a.i);
      const pl = player(s, a.pid);
      if (hd.r) fail('Das Ergebnis steht schon');
      if (hd.d) fail('Schon verdoppelt');
      if (pl.stack < hd.b) fail('Nicht genug Chips zum Verdoppeln');
      pl.stack -= hd.b;
      hd.b *= 2;
      hd.d = 1;
      return `${pl.name}: verdoppelt auf ${fmt(hd.b)}`;
    },
    bjSplit(s, a) {
      const r = bjRound(s, 'play');
      const hd = bjHand(r, a.pid, a.i);
      const pl = player(s, a.pid);
      const hs = r.hands[a.pid];
      if (hd.r) fail('Das Ergebnis steht schon');
      if (hd.d) fail('Nach dem Verdoppeln kein Split');
      if (hs.length >= 4) fail('Maximal 4 Hände');
      if (pl.stack < hd.b) fail('Nicht genug Chips für den Split');
      pl.stack -= hd.b;
      hs.splice(a.i + 1, 0, { b: hd.b, d: 0, r: null });
      return `${pl.name}: Split`;
    },
    bjIns(s, a) {
      const r = bjRound(s, 'play');
      const pl = player(s, a.pid);
      const hs = r.hands[pl.id];
      if (!hs) fail('Spielt in dieser Runde nicht mit');
      if (r.ins[pl.id]) fail('Schon versichert');
      if (hs.length > 1 || hs[0].d || hs[0].r) fail('Versichern geht nur direkt nach dem Austeilen');
      const amt = Math.floor(hs[0].b / 2);
      if (amt < 1) fail('Einsatz zu klein für eine Versicherung');
      if (pl.stack < amt) fail('Nicht genug Chips für die Versicherung');
      pl.stack -= amt;
      r.ins[pl.id] = amt;
      return `${pl.name}: Versicherung ${fmt(amt)}`;
    },
    bjRes(s, a) {
      const r = bjRound(s, 'play');
      const hd = bjHand(r, a.pid, a.i);
      const v = a.res === null ? null : a.res;
      if (![null, 'win', 'bj', 'push', 'lose'].includes(v)) fail('Ungültiges Ergebnis');
      if (v === 'bj' && (r.hands[a.pid].length > 1 || hd.d)) fail('Blackjack zählt nur mit den ersten zwei Karten');
      hd.r = v;
      const word = { win: 'gewonnen', bj: 'Blackjack', push: 'Push', lose: 'verloren' };
      const multi = r.hands[a.pid].length > 1 ? ` (Hand ${a.i + 1})` : '';
      const label = v ? `${nameOf(s, a.pid)}${multi}: ${word[v]}` : `${nameOf(s, a.pid)}${multi}: Ergebnis gelöscht`;
      bjSettle(s, r);
      return label;
    },
    bjDealerBJ(s, a) {
      const r = bjRound(s, 'play');
      if (!Object.keys(r.ins).length) fail('Niemand hat versichert');
      r.dbj = !!a.val;
      const label = r.dbj ? 'Bank hatte Blackjack – Versicherung zahlt' : 'Bank hatte keinen Blackjack';
      bjSettle(s, r);
      return label;
    },
  };

  function undoCtx(s) {
    const n = s.undo.length;
    return n + ':' + (n ? s.undo[n - 1].l : '');
  }

  function snap(s0) {
    const o = {};
    for (const k of SNAP_KEYS) o[k] = s0[k] === undefined ? null : s0[k];
    return clone(o);
  }

  function apply(s0, a) {
    if (!s0 || !a || typeof a.type !== 'string' || !Object.prototype.hasOwnProperty.call(H, a.type)) {
      return { ok: false, err: 'Unbekannte Aktion' };
    }
    if (a.id && s0.ids && s0.ids.includes(a.id)) return { ok: false, err: 'Schon erledigt', code: 'dup' };
    const s = clone(s0);
    if (!Array.isArray(s.ids)) s.ids = [];
    if (!Array.isArray(s.feed)) s.feed = [];
    if (!Array.isArray(s.undo)) s.undo = [];
    if (!s.bjLast) s.bjLast = {};
    NOTES = [];
    let label;
    try {
      label = H[a.type](s, a);
    } catch (e) {
      NOTES = null;
      if (e instanceof RuleError) return { ok: false, err: e.message };
      if (typeof console !== 'undefined') console.error(e);
      return { ok: false, err: 'Interner Fehler – Aktion nicht ausgeführt' };
    }
    const notes = NOTES;
    NOTES = null;
    const t = a.t || Date.now();
    if (!NO_UNDO.has(a.type)) {
      s.undo.push({ l: label || a.type, s: snap(s0) });
      if (s.undo.length > LIMITS.undo) s.undo.splice(0, s.undo.length - LIMITS.undo);
    }
    if (a.id) {
      s.ids.push(a.id);
      if (s.ids.length > LIMITS.ids) s.ids.splice(0, s.ids.length - LIMITS.ids);
    }
    if (label) s.feed.push({ t, m: label });
    for (const m of notes) if (m) s.feed.push({ t, m });
    if (s.feed.length > LIMITS.feed) s.feed.splice(0, s.feed.length - LIMITS.feed);
    return { ok: true, state: s, label };
  }

  // Grobe Formprüfung für Zustände, die aus dem Netz kommen.
  function validState(s) {
    return !!(
      s &&
      typeof s === 'object' &&
      s.app === 'pocketchips' &&
      Number.isInteger(s.v) &&
      s.v >= 1 &&
      s.v < MAXN &&
      typeof s.w === 'string' &&
      typeof s.room === 'string' &&
      s.cfg &&
      typeof s.cfg === 'object' &&
      Array.isArray(s.players) &&
      s.players.every((p) => p && typeof p.id === 'string' && typeof p.name === 'string' && Number.isFinite(p.stack)) &&
      Array.isArray(s.ids) &&
      Array.isArray(s.feed) &&
      Array.isArray(s.undo)
    );
  }

  return {
    LADDER,
    STREETS,
    LIMITS,
    CFG_DEFAULT,
    PRESETS,
    fmt,
    uid,
    cleanName,
    newRoom,
    apply,
    options,
    nextHandInfo,
    blindsFor,
    levelFor,
    handsLeftOnLevel,
    potSize,
    computePots,
    undoCtx,
    validState,
    locked,
    pokerBusy,
    bjBusy,
    bjPay,
  };
});
