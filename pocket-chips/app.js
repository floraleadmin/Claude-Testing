/* Pocket Chips – Oberfläche */
(function () {
  'use strict';
  const E = window.PCEngine;
  const S = window.PCSync;
  const fmt = E.fmt;
  const app = document.getElementById('app');
  const sheetRoot = document.getElementById('sheet-root');
  const toastEl = document.getElementById('toast');

  const LS = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch (e) {
        /* privat / voll */
      }
    },
    del(k) {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* egal */
      }
    },
    keys() {
      try {
        return Object.keys(localStorage);
      } catch (e) {
        return [];
      }
    },
  };

  const params = new URLSearchParams(location.search);
  const BROKERS = (params.get('broker') || '')
    .split(',')
    .map((x) => x.trim())
    .filter((x) => /^wss?:\/\//.test(x));

  const ui = {
    view: 'home',
    code: null,
    me: null,
    spectator: false,
    room: null,
    state: null,
    status: { connected: 0, total: 3, ready: false, notFound: false, offline: false },
    sheet: null,
    sheetOpenKey: '',
    form: {},
    picks: [],
    picksKey: '',
    proxy: null,
    bjAmt: 0,
    bjKey: '',
    turnKey: '',
    raise: 0,
    toastT: null,
  };

  // ------------------------------------------------------------------ Helfer
  const esc = (v) =>
    String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const val = (id, def) => (ui.form[id] !== undefined ? ui.form[id] : def);
  function num(id, def) {
    const raw = ui.form[id];
    if (raw === undefined) return def;
    const t = String(raw).trim();
    if (!/^\d+$/.test(t)) return -1;
    return parseInt(t, 10);
  }
  const playerOf = (s, id) => s.players.find((p) => p.id === id) || null;
  const nameOf = (s, id) => {
    const p = playerOf(s, id);
    return p ? p.name : '?';
  };
  const nm = (s, id) => esc(nameOf(s, id));
  const initial = (n) => esc((String(n || '?').trim()[0] || '?').toUpperCase());
  const signed = (n) => (n > 0 ? '+' : '') + fmt(n);
  const netCls = (n) => (n > 0 ? 'pos' : n < 0 ? 'neg' : 'muted');
  function buzz(p) {
    try {
      if (navigator.vibrate) navigator.vibrate(p);
    } catch (e) {
      /* egal */
    }
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(ui.toastT);
    ui.toastT = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }
  function roomUrl(code) {
    return location.href.split('#')[0] + '#' + code;
  }

  const ICON_MORE =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7.5" cy="12" r="1.35" fill="currentColor"/><circle cx="12" cy="12" r="1.35" fill="currentColor"/><circle cx="16.5" cy="12" r="1.35" fill="currentColor"/></svg>';
  const BACK =
    '<svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true"><path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CHEV =
    '<svg class="chev" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true"><path d="m1 1 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const UP =
    '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 9l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const DOWN =
    '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CHIP =
    '<svg class="brand-mark" viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="34" style="fill:var(--text)"/><circle cx="36" cy="36" r="26" fill="none" style="stroke:var(--bg)" stroke-width="5" stroke-dasharray="10.2 6.13"/><circle cx="36" cy="36" r="17" style="fill:var(--bg)"/><circle cx="36" cy="36" r="6" style="fill:var(--blue)"/></svg>';

  // ------------------------------------------------------------------ QR
  function qrSvg(text) {
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      const n = qr.getModuleCount();
      let d = '';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
      const m = 3;
      return `<svg class="qr" viewBox="${-m} ${-m} ${n + 2 * m} ${n + 2 * m}" role="img" aria-label="QR-Code zum Beitreten" shape-rendering="crispEdges"><rect x="${-m}" y="${-m}" width="${n + 2 * m}" height="${n + 2 * m}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
    } catch (e) {
      return '';
    }
  }

  // ------------------------------------------------------------------ Raum öffnen / schließen
  function closeRoom() {
    if (ui.room) ui.room.stop();
    ui.room = null;
    ui.state = null;
    ui.sheet = null;
    ui.proxy = null;
    document.title = 'Pocket Chips';
  }

  function openRoom(code, opts) {
    opts = opts || {};
    if (ui.room && ui.code === code && !opts.create) return;
    closeRoom();
    ui.code = code;
    ui.view = 'table';
    ui.me = LS.get('pc:me:' + code);
    ui.spectator = LS.get('pc:spec:' + code) === '1';
    ui.form = {};
    ui.picks = [];
    ui.picksKey = '';
    ui.turnKey = '';
    ui.status = { connected: 0, total: (BROKERS.length || S.DEFAULT_BROKERS.length), ready: false, notFound: false, offline: false };
    // Alte gespeicherte Stände anderer Tische aufräumen.
    for (const k of LS.keys()) if (k.indexOf('pc:state:') === 0 && k !== 'pc:state:' + code) LS.del(k);
    let cached = null;
    if (!opts.create) {
      try {
        cached = JSON.parse(LS.get('pc:state:' + code) || 'null');
      } catch (e) {
        cached = null;
      }
    }
    const room = new S.Room({
      code,
      brokers: BROKERS,
      initial: cached,
      onChange: (s) => onState(room, s),
      onStatus: (st) => {
        if (ui.room !== room) return;
        ui.status = st;
        renderSoon();
      },
      onNotice: (m) => toast(m),
    });
    ui.room = room;
    ui.state = room.state;
    room.start();
    if (opts.create) room.create(opts.create);
    LS.set('pc:last', code);
    render();
    window.scrollTo(0, 0);
  }

  function onState(room, s) {
    if (ui.room !== room) return;
    ui.state = s;
    LS.set('pc:state:' + s.room, JSON.stringify(s));
    const h = s.hand;
    const myTurn = s.cfg.game === 'poker' && h && h.phase === 'bet' && h.cur && h.cur === ui.me;
    if (myTurn) {
      const k = `${h.no}:${h.st}:${h.acts}`;
      if (k !== ui.turnKey) {
        ui.turnKey = k;
        buzz([40, 60, 40]);
      }
    }
    document.title = myTurn ? '● Du bist dran · Pocket Chips' : 'Pocket Chips';
    if (ui.proxy && !(h && h.phase === 'bet' && h.cur === ui.proxy)) ui.proxy = null;
    if (ui.sheet && ui.sheet.type === 'raise') {
      const o = E.options(s, ui.sheet.pid);
      if (!o || o.ctx !== ui.sheet.ctx) ui.sheet = null;
    }
    renderSoon();
  }

  function route() {
    const code = S.normCode(location.hash.slice(1));
    if (code) {
      openRoom(code);
      return;
    }
    closeRoom();
    ui.code = null;
    if (ui.view === 'table') ui.view = 'home';
    render();
  }

  function goHome() {
    closeRoom();
    ui.code = null;
    ui.view = 'home';
    ui.form = {};
    if (location.hash) history.pushState(null, '', location.pathname + location.search);
    render();
  }

  // ------------------------------------------------------------------ Senden
  function send(type, params) {
    const room = ui.room;
    if (!room || !ui.state) return false;
    if (!room.ready()) {
      toast('Noch keine Verbindung – einen Moment bitte');
      return false;
    }
    const r = room.submit(Object.assign({ type }, params || {}));
    if (!r.ok) {
      if (r.code !== 'dup') toast(r.err);
      return false;
    }
    buzz(8);
    return true;
  }

  // ------------------------------------------------------------------ Rendern
  let rafPending = false;
  function renderSoon() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      render();
    });
  }

  function captureFocus() {
    const a = document.activeElement;
    if (!a || !a.id || !/^(INPUT|SELECT|TEXTAREA)$/.test(a.tagName)) return null;
    let start = null;
    let end = null;
    try {
      start = a.selectionStart;
      end = a.selectionEnd;
    } catch (e) {
      /* number inputs */
    }
    return { id: a.id, start, end };
  }
  function restoreFocus(f) {
    if (!f) return;
    const el = document.getElementById(f.id);
    if (!el || el === document.activeElement) return;
    try {
      el.focus({ preventScroll: true });
      if (f.start !== null && el.setSelectionRange) el.setSelectionRange(f.start, f.end);
    } catch (e) {
      /* egal */
    }
  }

  function render() {
    const f = captureFocus();
    let html;
    try {
      if (ui.view === 'create') html = viewCreate();
      else if (ui.view === 'table') html = viewTable();
      else html = viewHome();
    } catch (e) {
      console.error(e);
      html = emptyView(
        '<h2 class="title2">Da ging etwas schief</h2><p>Bitte neu laden – dein Platz am Tisch bleibt erhalten.</p><button class="btn primary" data-a="reload">Neu laden</button>'
      );
    }
    app.innerHTML = html;
    restoreFocus(f);
    renderSheet();
    applyWake();
  }

  // ------------------------------------------------------------------ Startseite
  function viewHome() {
    const last = S.normCode(LS.get('pc:last'));
    return `<main class="wrap home">
      <div class="brand">${CHIP}<h1 class="title1">Pocket Chips</h1><p>Echte Karten. Die Chips aufs Handy.</p></div>
      <div class="home-actions">
        <button class="btn primary big block" data-a="go-create">Neuen Tisch erstellen</button>
        <p class="or">oder mit Code beitreten</p>
        <div class="join-row">
          <input id="f-code" class="text-input code-input" placeholder="CODE" maxlength="10" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="go" aria-label="Tisch-Code" value="${esc(val('f-code', ''))}">
          <button class="btn" data-a="join-code">Beitreten</button>
        </div>
        ${last ? `<button class="btn plain block" data-a="go-last">Zurück zu Tisch ${esc(last)}</button>` : ''}
      </div>
    </main>`;
  }

  function numField(id, label, def, hint) {
    return `<div class="field"><label for="${id}">${label}${hint ? `<small>${hint}</small>` : ''}</label><input id="${id}" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" value="${esc(val(id, String(def)))}"></div>`;
  }

  function viewCreate() {
    const game = val('c-game', 'poker');
    const mode = val('c-mode', 'classic');
    const common = numField('c-start', 'Startchips', 1000, 'pro Spieler');
    const pokerPart = `
      <div class="section-label">Chips & Blinds</div>
      <div class="list">${common}${numField('c-sb', 'Small Blind', 5)}${numField('c-bb', 'Big Blind', 10)}</div>
      <div class="section-label">Modus</div>
      <div class="choice-cards">
        <button class="choice-card ${mode === 'classic' ? 'on' : ''}" data-a="seg" data-k="c-mode" data-v="classic"><span class="radio"></span><span class="cc"><span class="cc-t">Klassisch</span><span class="cc-d">No-Limit Texas Hold'em mit festen Blinds.</span></span></button>
        <button class="choice-card ${mode === 'action' ? 'on' : ''}" data-a="seg" data-k="c-mode" data-v="action"><span class="radio"></span><span class="cc"><span class="cc-t">Action – ideal zu dritt</span><span class="cc-d">Jede 3. Hand ein Bomb Pot (alle zahlen 5 BB, direkt zum Flop). Blinds steigen alle 9 Hände. Wer mit 7-2 gewinnt, bekommt 2 BB von jedem.</span></span></button>
      </div>`;
    const bjPart = `
      <div class="section-label">Chips & Einsatz</div>
      <div class="list">${common}${numField('c-min', 'Mindesteinsatz', 10)}</div>
      <p class="section-foot">Die Bank ist erst das Haus. In den Einstellungen kann ein Spieler die Bank übernehmen.</p>`;
    return `<main class="wrap screen nodock">
      <div class="nav"><button class="link" data-a="go-home">${BACK} Zurück</button></div>
      <h1 class="title1">Neuer Tisch</h1>
      <div class="section-label">Dein Name</div>
      <div class="list"><div class="field"><input id="c-name" class="wide" placeholder="Name" maxlength="16" autocomplete="nickname" enterkeyhint="done" value="${esc(val('c-name', LS.get('pc:name') || ''))}"></div></div>
      <div class="section-label">Spiel</div>
      <div class="seg"><button data-a="seg" data-k="c-game" data-v="poker" class="${game === 'poker' ? 'on' : ''}">Poker</button><button data-a="seg" data-k="c-game" data-v="bj" class="${game === 'bj' ? 'on' : ''}">Blackjack</button></div>
      ${game === 'poker' ? pokerPart : bjPart}
      <div class="gap"></div><div class="gap"></div>
      <button class="btn primary big block" data-a="create">Tisch erstellen</button>
    </main>`;
  }

  function doCreate() {
    const name = E.cleanName(val('c-name', LS.get('pc:name') || ''));
    if (!name) return toast('Bitte gib deinen Namen ein');
    const game = val('c-game', 'poker');
    const cfg = { game, start: num('c-start', 1000) };
    if (game === 'poker') {
      cfg.sb = num('c-sb', 5);
      cfg.bb = num('c-bb', 10);
      Object.assign(cfg, E.PRESETS[val('c-mode', 'classic')] || {});
    } else {
      cfg.bjMin = num('c-min', 10);
    }
    const code = S.makeCode();
    const pid = E.uid(10);
    let s;
    try {
      s = E.newRoom(code, cfg, { id: pid, name });
    } catch (e) {
      return toast(e.message);
    }
    LS.set('pc:name', name);
    LS.set('pc:me:' + code, pid);
    LS.del('pc:spec:' + code);
    openRoom(code, { create: s });
    history.pushState(null, '', '#' + code);
  }

  // ------------------------------------------------------------------ Tisch
  function emptyView(inner) {
    return `<main class="wrap"><div class="empty">${inner}</div></main>`;
  }

  function viewTable() {
    const s = ui.state;
    if (!s) {
      const st = ui.status;
      if (st.notFound)
        return emptyView(
          `<h2 class="title2">Tisch nicht gefunden</h2><p>Zum Code <b>${esc(ui.code)}</b> gibt es keinen Tisch. Prüfe den Code oder lass dir den Link noch mal schicken.</p><button class="btn" data-a="go-home">Zur Startseite</button>`
        );
      if (st.offline)
        return emptyView(
          `<h2 class="title2">Keine Verbindung</h2><p>Prüfe dein Internet. Es wird automatisch weiter versucht.</p><button class="btn" data-a="go-home">Zur Startseite</button>`
        );
      return emptyView(`<div class="spinner"></div>Tisch ${esc(ui.code)} wird geladen…`);
    }
    const me = playerOf(s, ui.me);
    if (!me && !ui.spectator) return viewJoin(s);
    const body = s.cfg.game === 'bj' ? viewBj(s, me) : viewPoker(s, me);
    return header(s) + body;
  }

  function header(s) {
    const st = ui.status;
    const dot = st.ready && st.connected ? 'ok' : st.offline ? 'bad' : 'wait';
    let title = s.cfg.game === 'bj' ? 'Blackjack' : 'Poker';
    if (s.cfg.game === 'poker' && s.hand) title += ` · Hand ${s.hand.no}`;
    if (s.cfg.game === 'bj' && s.bj) title += ` · Runde ${s.bj.no}`;
    return `<header class="bar"><div class="bar-in">
      <button class="bar-code" data-a="invite" aria-label="Spieler einladen"><span class="dot ${dot}"></span>${esc(ui.code)}</button>
      <div class="bar-title">${title}</div>
      <button class="icon-btn" data-a="menu" aria-label="Menü">${ICON_MORE}</button>
    </div></header>`;
  }

  function dock(inner) {
    return `<div class="dock"><div class="dock-in">${inner}</div></div>`;
  }

  function viewJoin(s) {
    const list = s.players
      .map(
        (p) =>
          `<li><button class="cell" data-a="claim" data-id="${esc(p.id)}"><span class="avatar">${initial(p.name)}</span><span class="grow">${esc(p.name)}</span><span class="value num">${fmt(p.stack)}</span>${CHEV}</button></li>`
      )
      .join('');
    return `<main class="wrap screen nodock">
      <div class="nav"><button class="link" data-a="go-home">${BACK} Start</button></div>
      <h1 class="title1">Tisch ${esc(ui.code)}</h1>
      <p class="muted">${s.cfg.game === 'bj' ? 'Blackjack' : 'Poker'} · ${s.players.length} ${s.players.length === 1 ? 'Spieler' : 'Spieler'} · Start mit ${fmt(s.cfg.start)} Chips</p>
      <div class="section-label">Neu am Tisch</div>
      <div class="list"><div class="field"><input id="j-name" class="wide" placeholder="Dein Name" maxlength="16" autocomplete="nickname" enterkeyhint="go" value="${esc(val('j-name', LS.get('pc:name') || ''))}"></div></div>
      <div class="gap"></div>
      <button class="btn primary big block" data-a="join" ${ui.status.ready ? '' : 'disabled'}>${ui.status.ready ? 'Beitreten' : 'Verbinde…'}</button>
      ${list ? `<div class="section-label">Schon dabei? Tippe auf deinen Namen</div><ul class="list">${list}</ul>` : ''}
      <div class="center mt"><button class="link" data-a="spectate">Nur zuschauen</button></div>
    </main>`;
  }

  function playerRows(s, opts) {
    opts = opts || {};
    const n = s.players.length;
    return s.players
      .map((p, i) => {
        const tags = [];
        if (opts.dealer === p.id) tags.push('<span class="tag d">D</span>');
        if (p.id === ui.me) tags.push('<span class="tag me">Du</span>');
        if (s.cfg.game === 'bj' && s.cfg.bank === p.id) tags.push('<span class="tag">Bank</span>');
        if (p.out) tags.push('<span class="tag">Pause</span>');
        else if (p.stack <= 0 && !(s.cfg.game === 'bj' && s.cfg.bank === p.id)) tags.push('<span class="tag warn">Pleite</span>');
        let right = '';
        if (opts.move) {
          right = `<span class="pmove"><button class="icon-btn" data-a="move" data-id="${esc(p.id)}" data-dir="-1" aria-label="Nach oben" ${i === 0 ? 'disabled' : ''}>${UP}</button><button class="icon-btn" data-a="move" data-id="${esc(p.id)}" data-dir="1" aria-label="Nach unten" ${i === n - 1 ? 'disabled' : ''}>${DOWN}</button></span>`;
        } else if (opts.right) right = `<span class="pright">${opts.right(p)}</span>`;
        else {
          const net = p.stack - p.buyin;
          right = `<span class="pright"><span class="plast ${netCls(net)}">${signed(net)}</span></span>`;
        }
        return `<li><div class="cell prow tap" data-a="player" data-id="${esc(p.id)}"><span class="avatar">${initial(p.name)}</span><div class="grow"><div class="pname"><span class="nm">${esc(p.name)}</span>${tags.join('')}</div><div class="pstack">${fmt(p.stack)}</div></div>${right}</div></li>`;
      })
      .join('');
  }

  function inviteBlock(code) {
    const url = roomUrl(code);
    const canShare = !!navigator.share;
    return `${qrSvg(url)}
      <div class="code-big">${esc(code)}</div>
      <p class="muted small">Mit der Handykamera scannen oder den Code eingeben</p>
      <div class="row">
        ${canShare ? '<button class="btn sm" data-a="share">Link teilen</button>' : ''}
        <button class="btn sm" data-a="copy">Link kopieren</button>
      </div>`;
  }

  function settingsCells(s) {
    const c = s.cfg;
    const rows = [];
    if (c.game === 'poker') {
      const b = E.blindsFor(s, s.handNo + 1);
      rows.push(['Blinds', `${fmt(b.sb)}/${fmt(b.bb)}${c.levelEvery ? ` · Level ${b.lvl + 1}` : ''}`]);
      if (c.ante) rows.push(['Ante', fmt(b.ante)]);
      rows.push(['Startchips', fmt(c.start)]);
      if (c.bombEvery) rows.push(['Bomb Pot', `jede ${c.bombEvery}. Hand · ${c.bombBB} BB`]);
      if (c.levelEvery) rows.push(['Blinds steigen', `alle ${c.levelEvery} Hände`]);
      if (c.sevenDeuce) rows.push(['7-2-Bonus', `${c.sevenDeuce} BB von jedem`]);
    } else {
      rows.push(['Bank', c.bank ? nm(s, c.bank) : 'Haus']);
      rows.push(['Einsatz', `${fmt(c.bjMin)}${c.bjMax ? ' – ' + fmt(c.bjMax) : ' und mehr'}`]);
      rows.push(['Startchips', fmt(c.start)]);
    }
    return `<div class="list">${rows
      .map((r) => `<button class="cell" data-a="settings"><span class="grow">${r[0]}</span><span class="value num">${r[1]}</span>${CHEV}</button>`)
      .join('')}</div>`;
  }

  // ------------------------------------------------------------------ Poker
  function viewPoker(s, me) {
    const h = s.hand;
    if (!h) return pokerLobby(s, me);
    if (h.phase === 'bet') return pokerBet(s, me, h);
    if (h.phase === 'show') return pokerShow(s, me, h);
    return pokerDone(s, me, h);
  }

  function nextHandDock(s, label) {
    const info = E.nextHandInfo(s);
    const can = info.parts.length >= 2;
    const ready = ui.status.ready;
    const extra = [];
    if (info.bomb) extra.push('Bomb Pot');
    return dock(`<div class="dock-info"><span>${can ? `Dealer: <b>${nm(s, info.dealer)}</b>` : 'Mindestens 2 Spieler mit Chips nötig'}</span><span>${
      info.bomb ? `<b>Bomb Pot</b> · ${fmt(s.cfg.bombBB * info.bb)}` : `Blinds <b>${fmt(info.sb)}/${fmt(info.bb)}</b>`
    }</span></div>
      <button class="btn primary big block" data-a="start-hand" ${can && ready ? '' : 'disabled'}>${ready ? label : 'Verbinde…'}</button>`);
  }

  function pokerLobby(s, me) {
    const info = E.nextHandInfo(s);
    const first = s.handNo === 0;
    return `<main class="wrap screen">
      ${first ? `<section class="card invite">${inviteBlock(ui.code)}</section>` : ''}
      <div class="section-label">Spieler · im Uhrzeigersinn wie am Tisch</div>
      <ul class="list">${playerRows(s, { dealer: info.dealer, move: true })}</ul>
      <p class="section-foot">Mit den Pfeilen die Sitzreihenfolge anpassen. Tippe auf einen Spieler für Dealer-Button, Chips oder Pause.</p>
      <div class="section-label">Tisch</div>
      ${settingsCells(s)}
    </main>${nextHandDock(s, first ? 'Erste Hand starten' : 'Hand starten')}`;
  }

  function dealHint(h) {
    if (h.st === 0) return 'Jeder bekommt 2 Karten';
    if (h.st === 1) return h.bomb && h.acts === 0 ? '2 Karten an jeden, dann Flop aufdecken' : '3 Karten aufdecken';
    return '1 Karte aufdecken';
  }

  function lastLine(s) {
    const f = s.feed[s.feed.length - 1];
    return f ? esc(f.m) : '';
  }

  function handRow(s, h, id) {
    const p = playerOf(s, id);
    if (!p) return '';
    const x = h.p[id];
    const turn = h.phase === 'bet' && h.cur === id;
    const tags = [];
    if (h.dealer === id) tags.push('<span class="tag d">D</span>');
    if (h.st === 0 && h.sbP === id) tags.push('<span class="tag">SB</span>');
    if (h.st === 0 && h.bbP === id) tags.push('<span class="tag">BB</span>');
    if (id === ui.me) tags.push('<span class="tag me">Du</span>');
    let last = '';
    let cls = '';
    if (turn) {
      last = 'am Zug';
      cls = 'turn';
    } else if (x.fold) {
      last = 'Fold';
      cls = 'fold';
    } else if (x.allin) {
      last = 'All-in';
      cls = 'allin';
    } else last = esc(x.last || '');
    return `<li><div class="cell prow tap ${turn ? 'turn' : ''} ${x.fold ? 'folded' : ''}" data-a="player" data-id="${esc(id)}">
      <span class="avatar">${initial(p.name)}</span>
      <div class="grow"><div class="pname"><span class="nm">${esc(p.name)}</span>${tags.join('')}</div><div class="pstack">${fmt(p.stack)}</div></div>
      <div class="pright"><div class="pbet">${x.bet > 0 ? fmt(x.bet) : ''}</div><div class="plast ${cls}">${last}</div></div>
    </div></li>`;
  }

  function othersBlock(s, h) {
    const others = s.players.filter((p) => !h.order.includes(p.id));
    if (!others.length) return '';
    return `<div class="section-label">Nicht in dieser Hand</div><ul class="list">${others
      .map((p) => {
        const why = p.out ? 'Pause' : p.stack <= 0 ? 'Pleite' : 'ab nächster Hand';
        return `<li><div class="cell prow tap" data-a="player" data-id="${esc(p.id)}"><span class="avatar">${initial(p.name)}</span><div class="grow"><div class="pname"><span class="nm">${esc(p.name)}</span>${p.id === ui.me ? '<span class="tag me">Du</span>' : ''}</div><div class="pstack">${fmt(p.stack)}</div></div><div class="pright"><div class="plast">${why}</div></div></div></li>`;
      })
      .join('')}</ul>`;
  }

  function pokerBet(s, me, h) {
    const pot = E.potSize(h);
    const pills = [];
    if (h.bomb) pills.push('<span class="pill orange">Bomb Pot</span>');
    pills.push(`<span class="pill">Blinds ${fmt(h.sb)}/${fmt(h.bb)}</span>`);
    if (s.cfg.levelEvery) pills.push(`<span class="pill">Level ${h.lvl + 1}</span>`);
    if (h.ante) pills.push(`<span class="pill">Ante ${fmt(h.ante)}</span>`);
    return `<main class="wrap screen">
      <section class="pot">
        <div class="eyebrow">Pot</div>
        <div class="pot-amt">${fmt(pot)}</div>
        <div class="pot-street"><b>${E.STREETS[h.st]}</b> · ${dealHint(h)}</div>
        <div class="pills">${pills.join('')}</div>
      </section>
      <div class="lastline">${lastLine(s)}</div>
      <ul class="list">${h.order.map((id) => handRow(s, h, id)).join('')}</ul>
      ${othersBlock(s, h)}
    </main>${betDock(s, me, h)}`;
  }

  function betDock(s, me, h) {
    const cur = h.cur;
    const ready = ui.status.ready;
    const dis = ready ? '' : 'disabled';
    const actor = me && cur === me.id ? me.id : ui.proxy && ui.proxy === cur ? cur : null;
    if (actor) {
      const o = E.options(s, actor);
      if (!o) return '';
      const isMe = me && actor === me.id;
      const top = isMe
        ? `<div class="dock-info"><span class="you-turn">Du bist dran</span><span>${o.toCall > 0 ? `Zu callen <b>${fmt(o.callAmt)}</b> · ` : ''}Stack <b>${fmt(o.stack)}</b></span></div>`
        : `<div class="proxy-note"><span>Du setzt für ${nm(s, actor)} · Stack ${fmt(o.stack)}</span><button class="link" data-a="proxy-off">Abbrechen</button></div>`;
      const mid = o.canCheck
        ? `<button class="btn primary" data-a="check" ${dis}>Check</button>`
        : `<button class="btn primary" data-a="call" ${dis}>${o.callAllIn ? 'All-in' : 'Call'}<span class="sub">${fmt(o.callAmt)}</span></button>`;
      let right = '';
      if (o.canRaise) {
        right =
          o.minTo >= o.maxTo
            ? `<button class="btn" data-a="allin" ${dis}>All-in<span class="sub">${fmt(o.maxTo)}</span></button>`
            : `<button class="btn" data-a="raise-open" ${dis}>${o.isBet ? 'Bet' : 'Raise'}<span class="sub">ab ${fmt(o.minTo)}</span></button>`;
      }
      return dock(`${top}<div class="acts ${right ? '' : 'two'}"><button class="btn red-text" data-a="fold" ${dis}>Fold</button>${mid}${right}</div>`);
    }
    const meIn = me && h.p[me.id];
    const sub = meIn
      ? meIn.fold
        ? 'Du hast gefoldet'
        : meIn.allin
          ? 'Du bist All-in'
          : `Dein Stack: ${fmt(me.stack)}`
      : me
        ? 'Du spielst diese Hand nicht mit'
        : 'Du schaust zu';
    const short = esc(nameOf(s, cur).split(' ')[0]);
    return dock(`<div class="waiting"><div class="who"><b>${nm(s, cur)}</b> ist am Zug<span class="muted">${sub}</span></div><button class="btn sm" data-a="proxy" data-id="${esc(cur)}">Für ${short} setzen</button></div>`);
  }

  function pokerShow(s, me, h) {
    const i = h.pots.findIndex((p) => !p.win);
    const pot = h.pots[i];
    const k = h.no + ':' + i;
    if (ui.picksKey !== k) {
      ui.picksKey = k;
      ui.picks = [];
    }
    ui.picks = ui.picks.filter((id) => pot.el.includes(id));
    const multi = h.pots.length > 1;
    const title = multi ? (i === 0 ? 'Hauptpot' : `Nebenpot ${i}`) : 'Pot';
    const later = h.pots
      .slice(i + 1)
      .filter((p) => !p.win && p.el.length > 1)
      .map((p) => `${h.pots.indexOf(p) === 0 ? 'Hauptpot' : 'Nebenpot ' + h.pots.indexOf(p)} ${fmt(p.amt)} (${p.el.map((id) => nm(s, id)).join(', ')})`);
    const rows = pot.el
      .map((id) => {
        const on = ui.picks.includes(id);
        return `<li><button class="pick ${on ? 'on' : ''}" data-a="pick" data-id="${esc(id)}" aria-pressed="${on}"><span class="check"></span><b>${nm(s, id)}</b><span class="muted num">${fmt(h.p[id].tot)} im Pot</span></button></li>`;
      })
      .join('');
    const n = ui.picks.length;
    const ready = ui.status.ready;
    let label = 'Gewinner antippen';
    if (n === 1) label = `${fmt(pot.amt)} an ${nm(s, ui.picks[0])}`;
    if (n > 1) label = `${title} teilen (${n} Spieler)`;
    return `<main class="wrap screen">
      <section class="sd-head">
        <div class="eyebrow">Showdown · Hand ${h.no}</div>
        <h2>Wer hat gewonnen?</h2>
        <div class="muted">${h.runout ? 'Alle sind All-in: Board fertig austeilen, dann Karten zeigen.' : 'Karten zeigen und die beste Hand antippen.'}</div>
      </section>
      <div class="section-label">${title} · ${fmt(pot.amt)}</div>
      <ul class="list">${rows}</ul>
      <p class="section-foot">Gleich gute Hände? Mehrere antippen – der Pot wird geteilt.${later.length ? '<br>Danach: ' + later.join(' · ') : ''}</p>
    </main>${dock(`<button class="btn primary big block" data-a="award" ${n && ready ? '' : 'disabled'}>${ready ? label : 'Verbinde…'}</button>`)}`;
  }

  function pokerDone(s, me, h) {
    const won = h.won || {};
    const winners = h.order.filter((id) => (won[id] || 0) > 0);
    const liveCount = h.order.filter((id) => !h.p[id].fold).length;
    let head = 'Hand beendet';
    if (winners.length === 1) head = `${nm(s, winners[0])} gewinnt ${fmt(won[winners[0]])}`;
    else if (winners.length > 1) head = `${winners.map((id) => nm(s, id)).join(' & ')} teilen`;
    const sub = liveCount === 1 ? 'Alle anderen haben gefoldet' : `Showdown · Pot ${fmt(E.potSize(h))}`;
    const net = h.order
      .filter((id) => playerOf(s, id))
      .slice()
      .sort((a, b) => h.net[b] - h.net[a])
      .map((id) => `<li><b>${nm(s, id)}</b><span class="${netCls(h.net[id])}">${signed(h.net[id])}</span></li>`)
      .join('');
    let sd = '';
    if (s.cfg.sevenDeuce) {
      if (h.sd) sd = `<p class="muted small">7-2-Bonus: ${nm(s, h.sd.pid)} +${fmt(h.sd.amt)}</p>`;
      else if (h.order.some((id) => h.net[id] > 0)) sd = `<button class="btn block sm" data-a="sd-open">Mit 7-2 gewonnen? Bonus holen</button><div class="gap"></div>`;
    }
    const info = E.nextHandInfo(s);
    const nextB = E.blindsFor(s, s.handNo + 1);
    const lvlUp = s.cfg.levelEvery && nextB.bb > h.bb ? `<p class="section-foot">Ab der nächsten Hand steigen die Blinds auf ${fmt(nextB.sb)}/${fmt(nextB.bb)}.</p>` : '';
    return `<main class="wrap screen">
      <section class="card result">
        <div class="eyebrow">Hand ${h.no}</div>
        <h2>${head}</h2>
        <div class="muted">${sub}</div>
        <ul class="netlist">${net}</ul>
        ${sd}
      </section>
      ${lvlUp}
      <div class="section-label">Chips</div>
      <ul class="list">${playerRows(s, { dealer: info.dealer })}</ul>
    </main>${nextHandDock(s, 'Nächste Hand')}`;
  }

  // ------------------------------------------------------------------ Blackjack
  function viewBj(s, me) {
    const r = s.bj;
    if (!r) return `<main class="wrap screen"></main>${dock('<button class="btn primary big block" data-a="bj-new">Neue Runde</button>')}`;
    if (r.phase === 'bet') return bjBet(s, me, r);
    if (r.phase === 'play') return bjPlay(s, me, r);
    return bjDone(s, me, r);
  }

  function bankName(s, id) {
    return id && playerOf(s, id) ? nm(s, id) : 'Haus';
  }

  function bjBet(s, me, r) {
    const bank = s.cfg.bank;
    const bets = r.bets;
    const betIds = s.players.filter((p) => bets[p.id] > 0 && p.id !== bank).map((p) => p.id);
    const total = betIds.reduce((a, id) => a + bets[id], 0);
    const eligible = s.players.filter((p) => p.id !== bank).length;
    const ready = ui.status.ready;
    let box = '';
    if (me && me.id !== bank) {
      const key = r.no + ':' + me.id;
      if (ui.bjKey !== key) {
        ui.bjKey = key;
        ui.bjAmt = bets[me.id] || Math.min(s.bjLast[me.id] || s.cfg.bjMin, Math.max(0, me.stack));
      }
      const placed = bets[me.id] || 0;
      const steps = [1, 5, 10, 25].map((m) => m * s.cfg.bjMin);
      const last = s.bjLast[me.id];
      const btnLabel = placed && placed === ui.bjAmt ? 'Gesetzt ✓' : placed ? 'Einsatz ändern' : 'Setzen';
      box = `<section class="card betbox">
        <div class="eyebrow">Dein Einsatz · Stack ${fmt(me.stack)}</div>
        <div class="amt num">${fmt(ui.bjAmt)}</div>
        <div class="chips">${steps.map((v) => `<button class="chip-btn" data-a="bj-add" data-v="${v}">+${fmt(v)}</button>`).join('')}</div>
        <div class="row">
          <button class="btn" data-a="bj-clear">${last && ui.bjAmt !== last ? `Wie zuletzt (${fmt(last)})` : 'Zurücksetzen'}</button>
          <button class="btn primary" data-a="bj-bet" ${ui.bjAmt > 0 && ready && !(placed && placed === ui.bjAmt) ? '' : 'disabled'}>${btnLabel}</button>
        </div>
        ${placed ? '<button class="link" data-a="bj-sitout">Diese Runde aussetzen</button>' : ''}
      </section>`;
    }
    const rows = playerRows(s, {
      right: (p) => {
        if (p.id === bank) return '<span class="plast">Bank</span>';
        return bets[p.id] > 0 ? `<span class="pbet">${fmt(bets[p.id])}</span>` : '<span class="plast">–</span>';
      },
    });
    return `<main class="wrap screen">
      <section class="pot">
        <div class="eyebrow">Runde ${r.no} · Einsätze</div>
        <div class="pot-amt">${fmt(total)}</div>
        <div class="pot-street">Bank: <b>${bankName(s, bank)}</b> · Einsatz ab ${fmt(s.cfg.bjMin)}${s.cfg.bjMax ? ' bis ' + fmt(s.cfg.bjMax) : ''}</div>
      </section>
      ${box}
      <div class="section-label">Spieler</div>
      <ul class="list">${rows}</ul>
    </main>${dock(`<div class="dock-info"><span><b>${betIds.length}</b> von ${eligible} haben gesetzt</span><span>Blackjack zahlt 3:2</span></div>
      <button class="btn primary big block" data-a="bj-deal" ${betIds.length && ready ? '' : 'disabled'}>${ready ? 'Karten geben' : 'Verbinde…'}</button>`)}`;
  }

  function bjPlay(s, me, r) {
    const ids = s.players.map((p) => p.id).filter((id) => r.hands[id]);
    for (const id of Object.keys(r.hands)) if (!ids.includes(id)) ids.push(id);
    if (me && ids.includes(me.id)) ids.splice(ids.indexOf(me.id), 1), ids.unshift(me.id);
    let stakes = 0;
    let open = 0;
    const items = [];
    for (const id of ids) {
      const hs = r.hands[id];
      const pl = playerOf(s, id);
      const stack = pl ? pl.stack : 0;
      hs.forEach((hd, i) => {
        stakes += hd.b;
        if (!hd.r) open++;
        const tags = [];
        if (id === ui.me) tags.push('<span class="tag me">Du</span>');
        if (hs.length > 1) tags.push(`<span class="tag">Hand ${i + 1}</span>`);
        if (i === 0 && r.ins[id]) tags.push(`<span class="tag">versichert ${fmt(r.ins[id])}</span>`);
        const mods = [];
        if (!hd.r) {
          if (!hd.d && stack >= hd.b) mods.push(`<button class="btn sm" data-a="bj-double" data-id="${esc(id)}" data-i="${i}">Verdoppeln</button>`);
          if (!hd.d && hs.length < 4 && stack >= hd.b) mods.push(`<button class="btn sm" data-a="bj-split" data-id="${esc(id)}" data-i="${i}">Split</button>`);
          const ins = Math.floor(hd.b / 2);
          if (i === 0 && hs.length === 1 && !hd.d && !r.ins[id] && ins >= 1 && stack >= ins)
            mods.push(`<button class="btn sm" data-a="bj-ins" data-id="${esc(id)}">Versichern ${fmt(ins)}</button>`);
        }
        const canBj = hs.length === 1 && !hd.d;
        const opts = [
          ['lose', 'Verloren'],
          ['push', 'Push'],
          ['win', 'Gewonnen'],
        ];
        if (canBj) opts.push(['bj', 'Blackjack']);
        const res = opts
          .map(([v, l]) => `<button class="${v} ${hd.r === v ? 'on' : ''}" data-a="bj-res" data-id="${esc(id)}" data-i="${i}" data-v="${v}" aria-pressed="${hd.r === v}">${l}</button>`)
          .join('');
        items.push(`<li class="bjhand">
          <div class="top"><div class="pname"><span class="nm">${nm(s, id)}</span>${tags.join('')}</div><div class="stake">${fmt(hd.b)}${hd.d ? ' <span class="muted small">verdoppelt</span>' : ''}</div></div>
          ${mods.length ? `<div class="mods">${mods.join('')}</div>` : ''}
          <div class="res ${canBj ? '' : 'three'}">${res}</div>
        </li>`);
      });
    }
    const insQ = Object.keys(r.ins).length
      ? `<section class="card qcard"><p>Hatte die Bank einen Blackjack?</p><div class="row"><button class="btn ${r.dbj === true ? 'primary' : ''}" data-a="bj-dbj" data-v="1">Ja</button><button class="btn ${r.dbj === false ? 'primary' : ''}" data-a="bj-dbj" data-v="0">Nein</button></div></section>`
      : '';
    const insOpen = Object.keys(r.ins).length && r.dbj === null ? 1 : 0;
    return `<main class="wrap screen">
      <section class="pot">
        <div class="eyebrow">Runde ${r.no} · Im Spiel</div>
        <div class="pot-amt">${fmt(stakes)}</div>
        <div class="pot-street">Bank: <b>${bankName(s, r.bank)}</b> · Karten spielen, dann Ergebnis antippen</div>
      </section>
      ${insQ}
      <div class="section-label">Hände</div>
      <ul class="list">${items.join('')}</ul>
      <p class="section-foot">Blackjack zahlt 3:2, Versicherung 2:1. Sobald alles eingetragen ist, wird automatisch abgerechnet.</p>
    </main>${dock(`<div class="waiting"><div class="who"><b>${open + insOpen}</b> ${open + insOpen === 1 ? 'Eintrag' : 'Einträge'} offen<span class="muted">Danach wird automatisch abgerechnet</span></div></div>`)}`;
  }

  function bjDone(s, me, r) {
    const ids = Object.keys(r.net || {}).filter((id) => playerOf(s, id));
    ids.sort((a, b) => r.net[b] - r.net[a]);
    const rows = ids
      .map((id) => `<li><b>${nm(s, id)}${id === r.bank ? ' <span class="muted small">Bank</span>' : ''}</b><span class="${netCls(r.net[id])}">${signed(r.net[id])}</span></li>`)
      .join('');
    const houseNet = r.bank ? 0 : -Object.values(r.net || {}).reduce((a, b) => a + b, 0);
    return `<main class="wrap screen">
      <section class="card result">
        <div class="eyebrow">Runde ${r.no}</div>
        <h2>Abgerechnet</h2>
        <div class="muted">${r.bank ? 'Bank: ' + nm(s, r.bank) : `Haus ${signed(houseNet)}`}</div>
        <ul class="netlist">${rows}</ul>
      </section>
      <div class="section-label">Chips</div>
      <ul class="list">${playerRows(s)}</ul>
    </main>${dock(`<button class="btn primary big block" data-a="bj-new" ${ui.status.ready ? '' : 'disabled'}>${ui.status.ready ? 'Neue Runde' : 'Verbinde…'}</button>`)}`;
  }

  // ------------------------------------------------------------------ Sheets
  function openSheet(sh) {
    ui.sheet = sh;
    renderSheet();
  }
  function closeSheet() {
    ui.sheet = null;
    for (const k of Object.keys(ui.form)) if (/^(s-|pl-|add-)/.test(k)) delete ui.form[k];
    renderSheet();
  }

  function renderSheet() {
    const sh = ui.sheet;
    const s = ui.state;
    if (!sh || (!s && sh.type !== 'confirm')) {
      if (sheetRoot.innerHTML) sheetRoot.innerHTML = '';
      ui.sheetOpenKey = '';
      document.body.style.overflow = '';
      return;
    }
    const openKey = sh.type + ':' + (sh.id || sh.pid || '');
    if (sh.type === 'raise' && ui.sheetOpenKey === openKey + sh.ctx && sheetRoot.firstChild) return;
    let inner = null;
    try {
      inner = SHEETS[sh.type] ? SHEETS[sh.type](s, sh) : null;
    } catch (e) {
      console.error(e);
      inner = null;
    }
    if (inner == null) {
      ui.sheet = null;
      sheetRoot.innerHTML = '';
      ui.sheetOpenKey = '';
      document.body.style.overflow = '';
      return;
    }
    const fullKey = sh.type === 'raise' ? openKey + sh.ctx : openKey;
    const same = ui.sheetOpenKey && ui.sheetOpenKey.split(':')[0] === sh.type && ui.sheetOpenKey.indexOf(openKey) === 0;
    const f = captureFocus();
    const old = sheetRoot.querySelector('.sheet');
    const top = old ? old.scrollTop : 0;
    const noanim = same ? ' style="animation:none"' : '';
    sheetRoot.innerHTML = `<div class="sheet-backdrop" data-a="close-sheet"${noanim}></div><div class="sheet" role="dialog" aria-modal="true"${noanim}><div class="sheet-in"><div class="grab"></div>${inner}</div></div>`;
    const nw = sheetRoot.querySelector('.sheet');
    if (nw && same) nw.scrollTop = top;
    ui.sheetOpenKey = fullKey;
    document.body.style.overflow = 'hidden';
    restoreFocus(f);
  }

  function sheetHead(title, right) {
    return `<div class="sheet-head"><h3>${title}</h3>${right || '<button class="link" data-a="close-sheet">Fertig</button>'}</div>`;
  }

  function cell(a, label, opts) {
    opts = opts || {};
    const attrs = Object.keys(opts.data || {})
      .map((k) => ` data-${k}="${esc(opts.data[k])}"`)
      .join('');
    return `<button class="cell ${opts.cls || ''}" data-a="${a}"${attrs} ${opts.disabled ? 'disabled' : ''}><span class="grow">${label}${
      opts.hint ? `<br><span class="muted small">${opts.hint}</span>` : ''
    }</span>${opts.value != null ? `<span class="value">${opts.value}</span>` : ''}${opts.chev === false ? '' : CHEV}</button>`;
  }

  const SHEETS = {
    menu(s) {
      const me = playerOf(s, ui.me);
      const busy = E.pokerBusy(s) || E.bjBusy(s);
      const u = s.undo[s.undo.length - 1];
      const other = s.cfg.game === 'poker' ? 'Blackjack' : 'Poker';
      const g1 = [cell('invite', 'Spieler einladen'), cell('players', 'Spieler & Chips'), cell('settings', 'Einstellungen')];
      if (s.cfg.game === 'poker' && !E.pokerBusy(s)) g1.push(cell('bomb-toggle', 'Nächste Hand als Bomb Pot', { value: s.bombNext ? 'An' : 'Aus', chev: false }));
      g1.push(cell('switch-game', `Zu ${other} wechseln`, { disabled: busy, hint: busy ? 'Erst nach der laufenden Runde' : '' }));
      const g2 = [];
      g2.push(cell('undo', 'Rückgängig', { disabled: !u, hint: u ? esc(u.l) : 'Nichts zum Rückgängigmachen' }));
      if (busy) g2.push(cell('abort', s.cfg.game === 'poker' ? 'Hand abbrechen' : 'Runde abbrechen', { cls: 'danger', hint: 'Alle Einsätze gehen zurück' }));
      g2.push(cell('history', 'Verlauf'));
      const g3 = [];
      if ('wakeLock' in navigator) g3.push(cell('wake-toggle', 'Bildschirm anlassen', { value: LS.get('pc:wake') === '1' ? 'An' : 'Aus', chev: false }));
      if (!me && ui.spectator) g3.push(cell('unspectate', 'Mitspielen', { cls: 'accent' }));
      g3.push(cell('leave', 'Zur Startseite', { hint: 'Du bleibst am Tisch und kannst jederzeit zurück' }));
      return `${sheetHead('Tisch ' + esc(ui.code))}
        <div class="list">${g1.join('')}</div><div class="gap"></div>
        <div class="list">${g2.join('')}</div><div class="gap"></div>
        <div class="list">${g3.join('')}</div>`;
    },

    invite(s) {
      const st = ui.status;
      return `${sheetHead('Einladen')}<section class="card invite">${inviteBlock(ui.code)}</section>
        <p class="section-foot center">${st.connected ? `Verbunden mit ${st.connected} von ${st.total} Servern` : 'Verbinde…'}</p>`;
    },

    players(s) {
      return `${sheetHead('Spieler & Chips')}
        <ul class="list">${playerRows(s)}</ul>
        <p class="section-foot">Rechts steht die Bilanz: Chips minus alles, was gekauft wurde.</p>
        <div class="section-label">Spieler ohne Handy</div>
        <div class="list"><div class="inline-form"><input id="add-name" class="text-input" placeholder="Name" maxlength="16" enterkeyhint="done" value="${esc(val('add-name', ''))}"><button class="btn sm" data-a="add-player">Hinzufügen</button></div></div>
        <p class="section-foot">Für Spieler ohne Handy setzt einfach jemand anderes mit „Für … setzen“.</p>`;
    },

    player(s, sh) {
      const p = playerOf(s, sh.id);
      if (!p) return null;
      const lock = E.locked(s, p.id);
      const net = p.stack - p.buyin;
      const pokerFree = s.cfg.game === 'poker' && !E.pokerBusy(s);
      const idx = s.players.indexOf(p);
      const acts = [];
      acts.push(cell('sitout', p.out ? 'Wieder mitspielen' : 'Aussetzen', { hint: p.out ? '' : 'Wird ab der nächsten Hand nicht mehr ausgeteilt', chev: false }));
      if (pokerFree) {
        acts.push(cell('set-dealer', 'Dealer-Button geben', { chev: false }));
        acts.push(cell('move1', 'Einen Platz nach oben', { disabled: idx === 0, data: { dir: -1 }, chev: false }));
        acts.push(cell('move1', 'Einen Platz nach unten', { disabled: idx === s.players.length - 1, data: { dir: 1 }, chev: false }));
      }
      if (p.id !== ui.me) acts.push(cell('claim-here', 'Auf diesem Handy spielen', { hint: 'Wenn das dein Platz ist', chev: false }));
      acts.push(cell('remove', 'Vom Tisch entfernen', { cls: 'danger', disabled: !!lock, chev: false }));
      return `${sheetHead(esc(p.name))}
        <div class="card kv"><div><b>${fmt(p.stack)}</b><span>Chips</span></div><div><b>${fmt(p.buyin)}</b><span>Gekauft</span></div><div><b class="${netCls(net)}">${signed(net)}</b><span>Bilanz</span></div></div>
        ${lock ? `<p class="section-foot">${lock} – Chips lassen sich dann wieder ändern.</p>` : ''}
        <div class="section-label">Nachkaufen</div>
        <div class="list"><div class="inline-form"><input id="pl-rebuy" class="text-input" inputmode="numeric" pattern="[0-9]*" value="${esc(val('pl-rebuy', String(s.cfg.start)))}" ${lock ? 'disabled' : ''}><button class="btn sm" data-a="rebuy" ${lock ? 'disabled' : ''}>Hinzufügen</button></div></div>
        <div class="section-label">Chips korrigieren</div>
        <div class="list"><div class="inline-form"><input id="pl-set" class="text-input" inputmode="numeric" pattern="[0-9]*" value="${esc(val('pl-set', String(p.stack)))}" ${lock ? 'disabled' : ''}><button class="btn sm" data-a="set-stack" ${lock ? 'disabled' : ''}>Übernehmen</button></div></div>
        <div class="section-label">Name</div>
        <div class="list"><div class="inline-form"><input id="pl-name" class="text-input" maxlength="16" value="${esc(val('pl-name', p.name))}"><button class="btn sm" data-a="rename">Ändern</button></div></div>
        <div class="gap"></div>
        <div class="list">${acts.join('')}</div>`;
    },

    settings(s) {
      const c = s.cfg;
      const v = (k) => num('s-' + k, c[k]);
      let body;
      if (c.game === 'poker') {
        body = `<div class="section-label">Blinds & Chips</div>
          <div class="list">
            ${numField('s-sb', 'Small Blind', c.sb, c.levelEvery ? 'Basis für Level 1' : '')}
            ${numField('s-bb', 'Big Blind', c.bb)}
            ${numField('s-ante', 'Ante', c.ante, 'Zahlt jeder pro Hand, 0 = aus')}
            ${numField('s-start', 'Startchips', c.start, 'Für neue Spieler & Nachkauf')}
          </div>
          <div class="section-label">Modus</div>
          <div class="seg"><button data-a="preset" data-v="classic" class="${v('bombEvery') === 0 && v('levelEvery') === 0 && v('sevenDeuce') === 0 ? 'on' : ''}">Klassisch</button><button data-a="preset" data-v="action" class="${
            v('bombEvery') === 3 && v('levelEvery') === 9 && v('sevenDeuce') === 2 ? 'on' : ''
          }">Action (zu dritt)</button></div>
          <div class="gap"></div>
          <div class="list">
            ${numField('s-bombEvery', 'Bomb Pot jede … Hand', c.bombEvery, '0 = aus')}
            ${numField('s-bombBB', 'Bomb-Pot-Einsatz', c.bombBB, 'in Big Blinds pro Spieler')}
            ${numField('s-levelEvery', 'Blinds steigen alle … Hände', c.levelEvery, '0 = aus')}
            ${numField('s-sevenDeuce', '7-2-Bonus', c.sevenDeuce, 'Big Blinds von jedem, 0 = aus')}
          </div>
          <p class="section-foot"><b>Bomb Pot:</b> Jeder zahlt den Einsatz, es gibt keine Blinds und es geht direkt mit dem Flop los.<br><b>7-2-Bonus:</b> Wer eine Hand mit 7-2 gewinnt und die Karten zeigt, bekommt von jedem Mitspieler den Bonus.<br>Neue Blinds gelten ab der nächsten Hand.</p>`;
      } else {
        const bankSel = val('s-bank', c.bank || '');
        body = `<div class="section-label">Blackjack</div>
          <div class="list">
            ${numField('s-bjMin', 'Mindesteinsatz', c.bjMin)}
            ${numField('s-bjMax', 'Höchsteinsatz', c.bjMax, '0 = ohne Limit')}
            ${numField('s-start', 'Startchips', c.start, 'Für neue Spieler & Nachkauf')}
            <div class="field"><label for="s-bank">Bank<small>Wer zahlt aus und kassiert</small></label><select id="s-bank">
              <option value="" ${bankSel === '' ? 'selected' : ''}>Haus</option>
              ${s.players.map((p) => `<option value="${esc(p.id)}" ${bankSel === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
            </select></div>
          </div>
          <p class="section-foot">Ist ein Spieler die Bank, gehen Gewinne und Verluste der anderen über seinen Stack.</p>`;
      }
      return `${sheetHead('Einstellungen', '<button class="link" data-a="close-sheet">Abbrechen</button>')}${body}
        <div class="gap"></div><button class="btn primary big block" data-a="save-settings">Speichern</button>`;
    },

    history(s) {
      const items = s.feed
        .slice()
        .reverse()
        .map((f) => {
          const d = new Date(f.t);
          const t = isNaN(d) ? '' : `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
          return `<li><time>${t}</time><span>${esc(f.m)}</span></li>`;
        })
        .join('');
      return `${sheetHead('Verlauf')}<ul class="list feed">${items || '<li><span class="muted">Noch nichts passiert</span></li>'}</ul>`;
    },

    raise(s, sh) {
      const o = E.options(s, sh.pid);
      if (!o || o.ctx !== sh.ctx) return null;
      const to = clampRaise(ui.raise, o);
      ui.raise = to;
      const q = quickVals(o);
      return `${sheetHead(o.isBet ? 'Bet' : 'Raise auf', '<button class="link" data-a="close-sheet">Abbrechen</button>')}
        <p class="lead">${sh.pid !== ui.me ? `Für ${nm(s, sh.pid)} · ` : ''}Pot ${fmt(o.pot)}${o.toCall ? ` · zu callen ${fmt(o.toCall)}` : ''} · Stack ${fmt(o.stack)}</p>
        <div class="raise-amt"><button class="round" data-a="r-step" data-v="-1" aria-label="Weniger">−</button><input id="r-amt" type="text" inputmode="numeric" pattern="[0-9]*" value="${to}" aria-label="Betrag"><button class="round" data-a="r-step" data-v="1" aria-label="Mehr">+</button></div>
        <input id="r-range" class="range" type="range" min="${o.minTo}" max="${o.maxTo}" step="1" value="${to}" aria-label="Betrag wählen">
        <div class="range-ends"><span>${fmt(o.minTo)}</span><span>${fmt(o.maxTo)}</span></div>
        <div class="quick">${q.map(([l, v]) => `<button class="btn" data-a="r-set" data-v="${v}">${l}</button>`).join('')}</div>
        <button id="r-go" class="btn primary big block" data-a="r-go">${raiseLabel(to, o)}</button>`;
    },

    sd(s) {
      const h = s.hand;
      if (!h || h.phase !== 'done' || h.sd) return null;
      const cands = h.order.filter((id) => h.net[id] > 0 && playerOf(s, id));
      const each = s.cfg.sevenDeuce * h.bb;
      return `${sheetHead('7-2-Bonus', '<button class="link" data-a="close-sheet">Abbrechen</button>')}
        <p class="lead">Wer hat die Hand mit 7-2 gewonnen und die Karten gezeigt? Jeder andere zahlt ${fmt(each)}.</p>
        <div class="list">${cands.map((id) => cell('sd-give', nm(s, id), { data: { id } })).join('')}</div>`;
    },

    confirm(s, sh) {
      return `<div class="sheet-head"><h3>${esc(sh.title)}</h3></div>
        ${sh.text ? `<p class="lead">${esc(sh.text)}</p>` : ''}
        <button class="btn ${sh.danger ? 'red-text' : 'primary'} big block" data-a="confirm-ok">${esc(sh.ok)}</button>
        <div class="gap"></div>
        <button class="btn plain big block" data-a="close-sheet">Abbrechen</button>`;
    },
  };

  function confirmSheet(title, text, ok, run, danger) {
    openSheet({ type: 'confirm', title, text, ok, run, danger: !!danger });
  }

  // ------------------------------------------------------------------ Raise
  function roundStep(v, step) {
    return step > 1 ? Math.round(v / step) * step : Math.round(v);
  }
  function clampRaise(v, o) {
    if (!Number.isFinite(v)) v = o.minTo;
    return Math.max(o.minTo, Math.min(o.maxTo, Math.round(v)));
  }
  function quickVals(o) {
    const base = o.pot + o.toCall;
    const mk = (f) => clampRaise(roundStep(o.cb + f * base, o.step), o);
    return [
      ['Min', o.minTo],
      ['½ Pot', mk(0.5)],
      ['Pot', mk(1)],
      ['All-in', o.maxTo],
    ];
  }
  function raiseLabel(to, o) {
    if (to >= o.maxTo) return `All-in ${fmt(o.maxTo)}`;
    return o.isBet ? `Bet ${fmt(to)}` : `Raise auf ${fmt(to)}`;
  }
  function currentRaiseOpts() {
    const sh = ui.sheet;
    if (!sh || sh.type !== 'raise' || !ui.state) return null;
    const o = E.options(ui.state, sh.pid);
    return o && o.ctx === sh.ctx ? o : null;
  }
  function setRaise(v, from) {
    const o = currentRaiseOpts();
    if (!o) return;
    ui.raise = from === 'typing' ? v : clampRaise(v, o);
    const amt = document.getElementById('r-amt');
    const rng = document.getElementById('r-range');
    const go = document.getElementById('r-go');
    if (amt && from !== 'typing') amt.value = String(ui.raise);
    if (rng && from !== 'range') rng.value = String(clampRaise(ui.raise, o));
    if (go) go.textContent = Number.isFinite(ui.raise) ? raiseLabel(clampRaise(ui.raise, o), o) : 'Betrag eingeben';
  }

  // ------------------------------------------------------------------ Wake Lock
  let wakeLock = null;
  let wakeBusy = false;
  async function applyWake() {
    const want = LS.get('pc:wake') === '1' && ui.view === 'table' && document.visibilityState === 'visible';
    if (!('wakeLock' in navigator)) return;
    if (want && !wakeLock && !wakeBusy) {
      wakeBusy = true;
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
          wakeLock = null;
        });
      } catch (e) {
        wakeLock = null;
      }
      wakeBusy = false;
    } else if (!want && wakeLock) {
      try {
        await wakeLock.release();
      } catch (e) {
        /* egal */
      }
      wakeLock = null;
    }
  }
  document.addEventListener('visibilitychange', () => applyWake());

  // ------------------------------------------------------------------ Aktionen
  const A = {
    reload() {
      location.reload();
    },
    'go-create'() {
      ui.view = 'create';
      ui.form = {};
      render();
      window.scrollTo(0, 0);
    },
    'go-home'() {
      goHome();
    },
    'go-last'() {
      const c = S.normCode(LS.get('pc:last'));
      if (c) location.hash = c;
    },
    'join-code'() {
      const c = S.normCode(val('f-code', ''));
      if (!c) return toast('Bitte einen gültigen Code eingeben');
      location.hash = c;
    },
    seg(t) {
      ui.form[t.dataset.k] = t.dataset.v;
      render();
    },
    create() {
      doCreate();
    },
    join() {
      const s = ui.state;
      if (!s) return;
      const name = E.cleanName(val('j-name', LS.get('pc:name') || ''));
      if (!name) return toast('Bitte gib deinen Namen ein');
      const pid = E.uid(10);
      if (send('join', { pid, name })) {
        ui.me = pid;
        LS.set('pc:me:' + ui.code, pid);
        LS.set('pc:name', name);
        LS.del('pc:spec:' + ui.code);
        ui.spectator = false;
        delete ui.form['j-name'];
        render();
        window.scrollTo(0, 0);
      }
    },
    claim(t) {
      ui.me = t.dataset.id;
      LS.set('pc:me:' + ui.code, ui.me);
      LS.del('pc:spec:' + ui.code);
      ui.spectator = false;
      render();
    },
    spectate() {
      ui.spectator = true;
      LS.set('pc:spec:' + ui.code, '1');
      render();
    },
    unspectate() {
      ui.spectator = false;
      LS.del('pc:spec:' + ui.code);
      closeSheet();
      render();
    },
    'close-sheet'() {
      closeSheet();
    },
    menu() {
      openSheet({ type: 'menu' });
    },
    invite() {
      openSheet({ type: 'invite' });
    },
    players() {
      openSheet({ type: 'players' });
    },
    player(t) {
      for (const k of Object.keys(ui.form)) if (/^pl-/.test(k)) delete ui.form[k];
      openSheet({ type: 'player', id: t.dataset.id });
    },
    settings() {
      for (const k of Object.keys(ui.form)) if (/^s-/.test(k)) delete ui.form[k];
      openSheet({ type: 'settings' });
    },
    history() {
      openSheet({ type: 'history' });
    },
    share() {
      const url = roomUrl(ui.code);
      navigator.share({ title: 'Pocket Chips', text: `Komm an meinen Tisch: ${ui.code}`, url }).catch(() => {});
    },
    copy() {
      const url = roomUrl(ui.code);
      const done = () => toast('Link kopiert');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => fallbackCopy(url) && done());
      else if (fallbackCopy(url)) done();
    },
    'start-hand'() {
      send('startHand');
      window.scrollTo(0, 0);
    },
    move(t) {
      send('move', { pid: t.dataset.id, dir: parseInt(t.dataset.dir, 10) });
    },
    // --- Setzen
    fold() {
      const s = ui.state;
      const pid = actorId();
      if (!pid) return;
      const o = E.options(s, pid);
      if (!o) return;
      if (o.canCheck) {
        confirmSheet('Wirklich folden?', 'Du könntest kostenlos checken.', 'Fold', () => sendAct(pid, 'fold', o), true);
        return;
      }
      sendAct(pid, 'fold', o);
    },
    check() {
      const pid = actorId();
      const o = pid && E.options(ui.state, pid);
      if (o) sendAct(pid, 'check', o);
    },
    call() {
      const pid = actorId();
      const o = pid && E.options(ui.state, pid);
      if (o) sendAct(pid, 'call', o);
    },
    allin() {
      const pid = actorId();
      const o = pid && E.options(ui.state, pid);
      if (o) confirmSheet(`All-in mit ${fmt(o.maxTo)}?`, '', 'All-in', () => sendAct(pid, 'allin', o));
    },
    'raise-open'() {
      const pid = actorId();
      const o = pid && E.options(ui.state, pid);
      if (!o) return;
      ui.raise = o.minTo;
      openSheet({ type: 'raise', pid, ctx: o.ctx });
    },
    'r-step'(t) {
      const o = currentRaiseOpts();
      if (!o) return;
      const step = ui.state.hand.bb;
      const cur = clampRaise(ui.raise, o);
      const dir = parseInt(t.dataset.v, 10);
      let next = dir > 0 ? cur + step : cur - step;
      if (dir > 0 && cur === o.minTo && o.minTo % step) next = Math.ceil(o.minTo / step) * step;
      setRaise(next);
    },
    'r-set'(t) {
      setRaise(parseInt(t.dataset.v, 10));
    },
    'r-go'() {
      const o = currentRaiseOpts();
      if (!o) return closeSheet();
      const v = ui.raise;
      if (!Number.isInteger(v) || v < o.minTo || v > o.maxTo) return toast(`Bitte einen Betrag zwischen ${fmt(o.minTo)} und ${fmt(o.maxTo)}`);
      const pid = ui.sheet.pid;
      closeSheet();
      if (v === o.maxTo) sendAct(pid, 'allin', o);
      else sendAct(pid, 'raise', o, v);
    },
    proxy(t) {
      ui.proxy = t.dataset.id;
      render();
    },
    'proxy-off'() {
      ui.proxy = null;
      render();
    },
    // --- Showdown
    pick(t) {
      const id = t.dataset.id;
      const i = ui.picks.indexOf(id);
      if (i >= 0) ui.picks.splice(i, 1);
      else ui.picks.push(id);
      buzz(5);
      render();
    },
    award() {
      const h = ui.state.hand;
      if (!h || h.phase !== 'show' || !ui.picks.length) return;
      const i = h.pots.findIndex((p) => !p.win);
      if (send('win', { pot: i, ids: ui.picks.slice() })) {
        ui.picks = [];
        window.scrollTo(0, 0);
      }
    },
    'sd-open'() {
      openSheet({ type: 'sd' });
    },
    'sd-give'(t) {
      if (send('sevenDeuce', { pid: t.dataset.id })) closeSheet();
    },
    // --- Menü
    'bomb-toggle'() {
      send('bombNext', { on: !ui.state.bombNext });
    },
    'switch-game'() {
      const s = ui.state;
      const to = s.cfg.game === 'poker' ? 'bj' : 'poker';
      confirmSheet(`Zu ${to === 'bj' ? 'Blackjack' : 'Poker'} wechseln?`, 'Alle Spieler behalten ihre Chips.', 'Wechseln', () => {
        send('setGame', { game: to });
      });
    },
    undo() {
      const s = ui.state;
      const u = s.undo[s.undo.length - 1];
      if (!u) return;
      const ctx = E.undoCtx(s);
      confirmSheet('Rückgängig machen?', u.l, 'Rückgängig', () => send('undo', { ctx }));
    },
    abort() {
      const poker = ui.state.cfg.game === 'poker';
      confirmSheet(poker ? 'Hand abbrechen?' : 'Runde abbrechen?', 'Alle Einsätze dieser ' + (poker ? 'Hand' : 'Runde') + ' gehen an die Spieler zurück.', 'Abbrechen', () => send('abort'), true);
    },
    'wake-toggle'() {
      LS.set('pc:wake', LS.get('pc:wake') === '1' ? '0' : '1');
      applyWake();
      renderSheet();
    },
    leave() {
      closeSheet();
      goHome();
    },
    'confirm-ok'() {
      const sh = ui.sheet;
      ui.sheet = null;
      renderSheet();
      if (sh && sh.run) sh.run();
    },
    // --- Spieler
    'add-player'() {
      const name = E.cleanName(val('add-name', ''));
      if (!name) return toast('Bitte einen Namen eingeben');
      if (send('join', { pid: E.uid(10), name })) {
        delete ui.form['add-name'];
        renderSheet();
        toast(`${name} ist dabei`);
      }
    },
    sitout() {
      const p = playerOf(ui.state, ui.sheet.id);
      if (p) send('sitOut', { pid: p.id, out: !p.out });
    },
    'set-dealer'() {
      if (send('setDealer', { pid: ui.sheet.id })) closeSheet();
    },
    move1(t) {
      send('move', { pid: ui.sheet.id, dir: parseInt(t.dataset.dir, 10) });
    },
    'claim-here'() {
      const id = ui.sheet.id;
      const p = playerOf(ui.state, id);
      confirmSheet(`Als ${p ? p.name : '?'} spielen?`, 'Dieses Handy übernimmt den Platz.', 'Übernehmen', () => {
        ui.me = id;
        LS.set('pc:me:' + ui.code, id);
        LS.del('pc:spec:' + ui.code);
        ui.spectator = false;
        render();
      });
    },
    remove() {
      const id = ui.sheet.id;
      const p = playerOf(ui.state, id);
      confirmSheet(`${p ? p.name : 'Spieler'} entfernen?`, 'Die Chips verschwinden mit vom Tisch.', 'Entfernen', () => send('remove', { pid: id }), true);
    },
    rebuy() {
      const amt = num('pl-rebuy', ui.state.cfg.start);
      if (send('rebuy', { pid: ui.sheet.id, amt })) {
        delete ui.form['pl-rebuy'];
        delete ui.form['pl-set'];
        toast('Nachgekauft');
      }
    },
    'set-stack'() {
      const p = playerOf(ui.state, ui.sheet.id);
      const v = num('pl-set', p ? p.stack : 0);
      if (send('setStack', { pid: ui.sheet.id, stack: v })) {
        delete ui.form['pl-set'];
        toast('Chips geändert');
      }
    },
    rename() {
      const name = E.cleanName(val('pl-name', ''));
      if (send('rename', { pid: ui.sheet.id, name })) {
        delete ui.form['pl-name'];
        toast('Name geändert');
      }
    },
    preset(t) {
      const p = E.PRESETS[t.dataset.v];
      if (!p) return;
      for (const k of Object.keys(p)) ui.form['s-' + k] = String(p[k]);
      renderSheet();
    },
    'save-settings'() {
      const s = ui.state;
      const keys = s.cfg.game === 'poker' ? ['sb', 'bb', 'ante', 'start', 'bombEvery', 'bombBB', 'levelEvery', 'sevenDeuce'] : ['bjMin', 'bjMax', 'start'];
      const cfg = {};
      for (const k of keys) cfg[k] = num('s-' + k, s.cfg[k]);
      if (s.cfg.game === 'bj') cfg.bank = val('s-bank', s.cfg.bank || '') || null;
      const changed = keys.some((k) => cfg[k] !== s.cfg[k]) || (s.cfg.game === 'bj' && cfg.bank !== s.cfg.bank);
      if (!changed) return closeSheet();
      if (send('settings', { cfg })) {
        closeSheet();
        toast('Gespeichert');
      }
    },
    // --- Blackjack
    'bj-add'(t) {
      const s = ui.state;
      const me = playerOf(s, ui.me);
      if (!me) return;
      let v = ui.bjAmt + parseInt(t.dataset.v, 10);
      const cap = s.cfg.bjMax ? Math.min(s.cfg.bjMax, me.stack) : me.stack;
      if (v > cap) {
        v = cap;
        toast(s.cfg.bjMax && cap === s.cfg.bjMax ? `Höchsteinsatz ${fmt(cap)}` : `Du hast ${fmt(me.stack)} Chips`);
      }
      ui.bjAmt = Math.max(0, v);
      buzz(5);
      render();
    },
    'bj-clear'() {
      const s = ui.state;
      const me = playerOf(s, ui.me);
      const last = s.bjLast[ui.me];
      ui.bjAmt = last && ui.bjAmt !== last && me ? Math.min(last, me.stack) : 0;
      render();
    },
    'bj-bet'() {
      send('bjBet', { pid: ui.me, amt: ui.bjAmt });
    },
    'bj-sitout'() {
      if (send('bjBet', { pid: ui.me, amt: 0 })) ui.bjAmt = 0;
    },
    'bj-deal'() {
      if (send('bjDeal')) window.scrollTo(0, 0);
    },
    'bj-double'(t) {
      send('bjDouble', { pid: t.dataset.id, i: parseInt(t.dataset.i, 10) });
    },
    'bj-split'(t) {
      send('bjSplit', { pid: t.dataset.id, i: parseInt(t.dataset.i, 10) });
    },
    'bj-ins'(t) {
      send('bjIns', { pid: t.dataset.id });
    },
    'bj-res'(t) {
      const s = ui.state;
      const r = s.bj;
      const i = parseInt(t.dataset.i, 10);
      const hd = r && r.hands[t.dataset.id] && r.hands[t.dataset.id][i];
      const v = hd && hd.r === t.dataset.v ? null : t.dataset.v;
      send('bjRes', { pid: t.dataset.id, i, res: v });
    },
    'bj-dbj'(t) {
      send('bjDealerBJ', { val: t.dataset.v === '1' });
    },
    'bj-new'() {
      if (send('bjNew')) window.scrollTo(0, 0);
    },
  };

  function actorId() {
    const s = ui.state;
    const h = s && s.hand;
    if (!h || h.phase !== 'bet') return null;
    if (h.cur === ui.me) return ui.me;
    if (ui.proxy && ui.proxy === h.cur) return h.cur;
    return null;
  }

  function sendAct(pid, kind, o, to) {
    const params = { pid, kind, ctx: o.ctx };
    if (kind === 'raise') params.to = to;
    if (send('act', params)) {
      if (pid !== ui.me) ui.proxy = null;
      buzz(12);
    }
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  // ------------------------------------------------------------------ Events
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-a]');
    if (!t || t.disabled) return;
    const fn = A[t.dataset.a];
    if (!fn) return;
    ev.preventDefault();
    try {
      fn(t, ev);
    } catch (e) {
      console.error(e);
      toast('Das hat nicht geklappt – bitte nochmal');
    }
  });

  document.addEventListener('input', (ev) => {
    const el = ev.target;
    if (!el.id) return;
    ui.form[el.id] = el.value;
    if (el.id === 'r-range') setRaise(parseInt(el.value, 10), 'range');
    else if (el.id === 'r-amt') {
      const v = parseInt(String(el.value).replace(/\D/g, ''), 10);
      setRaise(Number.isFinite(v) ? v : NaN, 'typing');
    } else if (el.id === 'f-code') {
      const up = el.value.toUpperCase();
      if (up !== el.value) {
        const p = el.selectionStart;
        el.value = up;
        try {
          el.setSelectionRange(p, p);
        } catch (e) {
          /* egal */
        }
        ui.form[el.id] = up;
      }
    }
  });

  document.addEventListener('change', (ev) => {
    const el = ev.target;
    if (el.id) ui.form[el.id] = el.value;
    if (el.id === 'r-amt') {
      const o = currentRaiseOpts();
      if (o) setRaise(clampRaise(ui.raise, o));
    }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && ui.sheet) {
      closeSheet();
      return;
    }
    if (ev.key !== 'Enter') return;
    const id = ev.target && ev.target.id;
    const map = { 'f-code': 'join-code', 'j-name': 'join', 'add-name': 'add-player', 'pl-rebuy': 'rebuy', 'pl-set': 'set-stack', 'pl-name': 'rename', 'r-amt': 'r-go' };
    if (map[id]) {
      ev.preventDefault();
      A[map[id]]();
    } else if (id === 'c-name') ev.target.blur();
  });

  window.addEventListener('hashchange', route);
  window.addEventListener('popstate', route);
  route();
})();
