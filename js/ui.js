/* Page logic: rendering, i18n, navigation, chat, modal, sound, contact form. */
(function () {
  'use strict';
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const P = window.PROFILE, SECTIONS = window.SECTIONS;
  const LANGS = ['en', 'de', 'fr', 'ar'];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMq = window.matchMedia('(max-width: 820px)');

  const state = {
    lang: pickLang(),
    index: 0,
    night: store.get('night') !== null ? store.get('night') === '1' : window.matchMedia('(prefers-color-scheme: dark)').matches,
    sound: store.get('sound') === '1',
    visited: new Set(),
    explorerShown: false,
    lock: 0
  };
  function pickLang() {
    const saved = store.get('lang');
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : 'en';
  }
  const T = () => window.I18N[state.lang];

  /* ---------- icons ---------- */
  const SVG = {
    github: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>',
    mail: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M1.5 3.5h13v9h-13z M1.5 3.5l6.5 5.5 6.5-5.5"/></svg>',
    download: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M7 1h2v8h2l-3 4-3-4h2zM2 13h12v2H2z"/></svg>',
    sun: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#ffe14a" d="M5 5h6v6H5z"/><path fill="#ffe14a" d="M7 0h2v3H7zM7 13h2v3H7zM0 7h3v2H0zM13 7h3v2h-3zM2 2h2v2H2zM12 2h2v2h-2zM2 12h2v2H2zM12 12h2v2h-2z"/></svg>',
    moon: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#e8ecff" d="M5 1h6v2h2v2h2v6h-2v2h-2v2H5v-2h4v-2h2V5H9V3H5z"/></svg>',
    soundOn: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#fff" d="M1 6h3l4-4v12l-4-4H1z"/><path fill="#fff" d="M10 5h2v6h-2zM13 3h2v10h-2z"/></svg>',
    soundOff: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#fff" d="M1 6h3l4-4v12l-4-4H1z"/><path fill="#ff6b6b" d="M10 6l1-1 2 2 2-2 1 1-2 2 2 2-1 1-2-2-2 2-1-1 2-2z"/></svg>'
  };
  function heart(full) {
    const fill = full ? '#e3262b' : '#3a3a3a', shine = full ? '#ff9c9c' : '#555';
    return `<svg viewBox="0 0 9 8" shape-rendering="crispEdges" aria-hidden="true"><path fill="#000" d="M1 0h3v1h1V0h3v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z"/><path fill="${fill}" d="M1 1h3v1h1V1h3v3H7v1H6v1H5v1H4V6H3V5H2V4H1z"/><path fill="${shine}" d="M2 2h1v1H2z"/></svg>`;
  }
  function villagerURL() {
    const rows = ['..HHHHHH..', '.HHHHHHHH.', '.SSSSSSSS.', '.BBBBBBBB.', '.SWESSEWS.', '.SSSNNSSS.', '.SSSNNSSS.', '.SSSNNSSS.', '.SMSNNSMS.', '.SSSSSSSS.'];
    const col = { H: '#5b3b22', S: '#b7836a', B: '#3d2a1f', W: '#fff', E: '#2a7a3a', N: '#9a6a52', M: '#5a3a30' };
    const c = document.createElement('canvas');
    c.width = 10; c.height = 10;
    const g = c.getContext('2d');
    rows.forEach((r, y) => [...r].forEach((ch, x) => { if (col[ch]) { g.fillStyle = col[ch]; g.fillRect(x, y, 1, 1); } }));
    return c.toDataURL();
  }

  /* ---------- rendering ---------- */
  function renderHome(t) {
    const h = t.home;
    $('#panel-home').innerHTML = `
      <div class="home-head">
        <div class="frame"><img class="photo" src="${P.photo}" alt="${esc(P.name)}" width="100" height="100"></div>
        <div>
          <p class="greet">${esc(h.greet)}</p>
          <h1 class="name" id="h-home">${esc(P.name)}</h1>
          <p class="role">${esc(h.role)}</p>
        </div>
      </div>
      <p class="tagline">${esc(h.tagline)}</p>
      <p class="meta">${esc(h.meta)}</p>
      <div class="btn-row">
        <a class="mc-btn primary" href="${P.cv.de}" download>${SVG.download}${esc(h.cvDe)}</a>
        <a class="mc-btn" href="${P.cv.en}" download>${SVG.download}${esc(h.cvEn)}</a>
        <button type="button" class="mc-btn" data-go="6">${esc(h.contact)}</button>
      </div>
      ${socials()}`;
  }
  function socials() {
    return `<div class="socials">
      <a class="mc-btn square" href="${P.github}" target="_blank" rel="noopener" aria-label="GitHub">${SVG.github}</a>
      <a class="mc-btn square" href="${P.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${SVG.linkedin}</a>
      <a class="mc-btn square" href="mailto:${P.email}" aria-label="Email">${SVG.mail}</a>
    </div>`;
  }
  function renderAbout(t) {
    const a = t.about;
    $('#panel-about').innerHTML = `
      <h2 id="h-about">${esc(a.title)}</h2>
      <ul class="bullets">${a.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      <h3>${esc(a.infoTitle)}</h3>
      <table class="stats">${a.info.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${k.match(/mail|البريد/i) ? `<a href="mailto:${v}">${esc(v)}</a>` : esc(v)}</td></tr>`).join('')}</table>
      <h3>${esc(a.langTitle)}</h3>
      <ul class="langs">${a.langs.map(([n, lvl, h]) => `<li><span>${esc(n)} <small>${esc(lvl)}</small></span><span class="hearts" aria-label="${h}/5">${[0, 1, 2, 3, 4].map((i) => heart(i < h)).join('')}</span></li>`).join('')}</ul>
      <h3>${esc(a.hobbiesTitle)}</h3>
      <div>${a.hobbies.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>`;
  }
  function renderJourney(t) {
    const j = t.journey;
    const planks = window.World.patternURL('planks');
    $('#panel-journey').innerHTML = `
      <h2 id="h-journey">${esc(j.title)}</h2>
      <p class="subtitle">${esc(j.subtitle)}</p>
      <ol class="timeline">${j.items.map((it) => `
        <li class="sign" style="background-image:url(${planks})">
          <div class="sign-top"><span class="sign-tag">${esc(it.tag)}</span><span class="sign-date">${esc(it.date)}</span></div>
          <h3>${esc(it.title)}</h3>
          <p class="org">${esc(it.org)}</p>
          <p>${esc(it.text)}</p>
        </li>`).join('')}</ol>`;
  }
  let selectedSkill = null;
  function renderSkills(t) {
    const s = t.skills;
    const cats = ['lang', 'fw', 'tools'];
    $('#panel-skills').innerHTML = `
      <h2 id="h-skills">${esc(s.title)}</h2>
      <p class="subtitle">${esc(s.subtitle)}</p>
      ${cats.map((c) => `
        <h3>${esc(s.cats[c])}</h3>
        <div class="inv">${window.SKILLS.filter((k) => k.cat === c).map((k) => `
          <button type="button" class="slot" data-skill="${esc(k.name)}" aria-pressed="${selectedSkill === k.name}" aria-label="${esc(k.name)}">
            <span class="item" style="--c:${k.color}">${esc(k.short)}</span>
            ${k.level ? `<span class="count">${k.level}</span>` : ''}
          </button>`).join('')}</div>`).join('')}
      <div class="tooltip" id="skill-info" aria-live="polite"></div>`;
    showSkill(selectedSkill);
  }
  function showSkill(name) {
    const box = $('#skill-info');
    if (!box) return;
    const s = T().skills;
    const k = window.SKILLS.find((x) => x.name === name);
    $$('.slot').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.skill === name)));
    if (!k) { box.innerHTML = `<p>${esc(s.pick)}</p>`; return; }
    box.innerHTML = `<strong>${esc(k.name)}</strong>` + (k.level
      ? `<p>${esc(s.level)} ${k.level}/5</p><div class="bars">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= k.level ? 'on' : ''}"></i>`).join('')}</div>`
      : `<p>${esc(s.inProjects)}</p>`);
  }
  function renderProjects(t) {
    const p = t.projects;
    const icon = window.World.iconURL('chestFront');
    $('#panel-projects').innerHTML = `
      <h2 id="h-projects">${esc(p.title)}</h2>
      <p class="subtitle">${esc(p.subtitle)}</p>
      <div class="cards">${window.PROJECTS.map((pr) => {
        const it = p.items[pr.id];
        return `<article class="card">
          <img src="${icon}" alt="" width="44" height="48">
          <h3>${esc(it.name)}</h3>
          <p class="when">${esc(it.sub)} · ${esc(it.date)}</p>
          <p class="short">${esc(it.short)}</p>
          <div class="tags">${pr.stack.slice(0, 5).map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>
          <button type="button" class="mc-btn" data-project="${pr.id}">${esc(p.open)}</button>
        </article>`;
      }).join('')}</div>`;
  }
  function renderAchievements(t) {
    const a = t.achievements;
    $('#panel-achievements').innerHTML = `
      <h2 id="h-achievements">${esc(a.title)}</h2>
      <p class="subtitle">${esc(a.subtitle)}</p>
      <div class="adv">${window.ACHIEVEMENTS.map((x) => `
        <div class="adv-item">
          ${x.img ? `<img class="adv-icon" src="${x.img}" alt="" width="52" height="52" loading="lazy">` : `<img class="adv-icon block" src="${window.World.iconURL('gold')}" alt="" width="52" height="56">`}
          <div>
            <p class="adv-made">${esc(a.made)}</p>
            <p class="adv-title">${esc(a.items[x.id])}</p>
            <p class="adv-kind">${esc(a.kinds[x.kind])}</p>
          </div>
          ${x.img ? `<button type="button" class="mc-btn" data-cert="${x.id}">${esc(a.view)}</button>` : ''}
        </div>`).join('')}</div>`;
  }
  function renderContact(t) {
    const c = t.contact;
    const old = $('#panel-contact form');
    const keep = old ? { name: old.name.value, email: old.email.value, message: old.message.value } : {};
    $('#panel-contact').innerHTML = `
      <h2 id="h-contact">${esc(c.title)}</h2>
      <p class="subtitle">${esc(c.subtitle)}</p>
      <form class="form" id="contact-form" novalidate>
        <label>${esc(c.name)}<input name="name" autocomplete="name" required maxlength="100" value="${esc(keep.name || '')}"></label>
        <label>${esc(c.email)}<input name="email" type="email" autocomplete="email" required maxlength="150" value="${esc(keep.email || '')}"></label>
        <label>${esc(c.message)}<textarea name="message" required maxlength="3000">${esc(keep.message || '')}</textarea></label>
        <input class="hp" type="checkbox" name="botcheck" tabindex="-1" aria-hidden="true">
        <button type="submit" class="mc-btn primary">${esc(c.send)}</button>
        <p class="form-status" id="form-status" role="status"></p>
      </form>
      <h3>${esc(c.or)}</h3>
      ${socials()}
      <p class="footer-note">${esc(c.footer)} · ${new Date().getFullYear()}</p>`;
    $('#contact-form').addEventListener('submit', sendForm);
  }
  function renderHotbar(t) {
    $('#hotbar').innerHTML = SECTIONS.map((s, i) => `
      <li><button type="button" data-go="${i}" aria-label="${esc(t.nav[i])}" aria-current="${i === state.index}" title="${esc(t.nav[i])}">
        <span class="num">${i + 1}</span><img src="${window.World.iconURL(s.icon)}" alt="" width="34" height="37">
      </button></li>`).join('');
  }
  function renderChrome(t) {
    document.title = t.meta.title;
    $('meta[name="description"]').setAttribute('content', t.meta.description);
    $('#lang').setAttribute('aria-label', t.ui.language);
    $$('#lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
    $('#hint').textContent = t.ui.hint;
    $('#loader-title').textContent = t.ui.loading;
    $('#loader-tip').textContent = t.ui.tip;
    $('#chat-title').textContent = t.chat.title;
    $('#chat-toggle').setAttribute('aria-label', t.chat.open);
    $('#chat-input').placeholder = t.chat.placeholder;
    $('#chat-input').setAttribute('aria-label', t.chat.placeholder);
    $('#chat-send').textContent = t.chat.send;
    $('#chat-close').setAttribute('aria-label', t.ui.close);
    $('#modal-close').setAttribute('aria-label', t.ui.close);
    $('#chat-chips').innerHTML = t.chat.chips.map(([label, id]) => `<button type="button" data-intent="${id}">${esc(label)}</button>`).join('');
    updateToggles();
  }
  function renderAll() {
    const t = T();
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    renderChrome(t);
    renderHotbar(t);
    renderHome(t); renderAbout(t); renderJourney(t); renderSkills(t);
    renderProjects(t); renderAchievements(t); renderContact(t);
    applyLayout();
    if (!$('#modal').hidden && modalState) openModal(modalState.kind, modalState.id);
  }
  function updateToggles() {
    const t = T();
    const n = $('#btn-night');
    n.innerHTML = state.night ? SVG.moon : SVG.sun;
    n.setAttribute('aria-pressed', String(state.night));
    n.setAttribute('aria-label', `${t.ui.day} / ${t.ui.night}`);
    n.title = state.night ? t.ui.night : t.ui.day;
    const s = $('#btn-sound');
    s.innerHTML = state.sound ? SVG.soundOn : SVG.soundOff;
    s.setAttribute('aria-pressed', String(state.sound));
    s.setAttribute('aria-label', state.sound ? t.ui.soundOn : t.ui.soundOff);
    s.title = s.getAttribute('aria-label');
  }

  /* ---------- navigation ---------- */
  let labelTimer;
  function go(i, opts) {
    i = (i + SECTIONS.length) % SECTIONS.length;
    const first = opts && opts.instant;
    if (i === state.index && !first) return;
    state.index = i;
    $$('.panel').forEach((p) => {
      const on = Number(p.dataset.i) === i;
      p.classList.toggle('active', on);
      p.setAttribute('aria-hidden', String(!on));
      if (on) p.scrollTop = 0;
      p.inert = !on;
    });
    $$('#hotbar button').forEach((b) => b.setAttribute('aria-current', String(Number(b.dataset.go) === i)));
    const label = $('#hud-label');
    label.textContent = T().nav[i];
    label.classList.add('show');
    clearTimeout(labelTimer);
    labelTimer = setTimeout(() => label.classList.remove('show'), 1800);
    window.World.goTo(i, first);
    history.replaceState(null, '', '#' + SECTIONS[i].id);
    if (!first) { sfx('click'); $('#hint').classList.add('gone'); }
    visit(i);
  }
  function visit(i) {
    state.visited.add(i);
    $('#xp-level').textContent = state.visited.size;
    $('#xp-fill').style.width = ((state.visited.size - 1) / (SECTIONS.length - 1)) * 100 + '%';
    if (state.visited.size === SECTIONS.length && !state.explorerShown) {
      state.explorerShown = true;
      const e = T().ui.explorer;
      setTimeout(() => toast(e.title, e.text, window.World.iconURL('diamondOre')), 1600);
    }
  }
  function next(d) { if (Date.now() < state.lock) return; state.lock = Date.now() + 850; go(state.index + d); }

  function canScroll(el, dy) {
    const panel = el && el.closest && el.closest('.panel, .chat-log, .modal-box');
    if (!panel) return false;
    if (panel.scrollHeight <= panel.clientHeight + 2) return false;
    return dy > 0 ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2 : panel.scrollTop > 2;
  }
  function bindNavigation() {
    window.addEventListener('wheel', (e) => {
      if (!$('#modal').hidden || Math.abs(e.deltaY) < 12) return;
      if (canScroll(e.target, e.deltaY)) return;
      if (e.target.closest && e.target.closest('.panel, .chat')) { if (Date.now() < state.lock) return; }
      next(e.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    let touch = null;
    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('.panel, .chat, .modal, .topbar, .hud')) { touch = null; return; }
      touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
    window.addEventListener('touchend', (e) => {
      if (!touch) return;
      const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 60) return;
      const rtl = state.lang === 'ar';
      if (Math.abs(dx) > Math.abs(dy)) next((dx < 0) !== rtl ? 1 : -1);
      else next(dy < 0 ? 1 : -1);
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeModal(); toggleChat(false); return; }
      if (e.target.matches('input, textarea, select') || !$('#modal').hidden || e.altKey || e.ctrlKey || e.metaKey) return;
      const rtl = state.lang === 'ar';
      if (/^[1-7]$/.test(e.key)) { go(Number(e.key) - 1); return; }
      const fwd = ['ArrowDown', 'PageDown', rtl ? 'ArrowLeft' : 'ArrowRight'];
      const back = ['ArrowUp', 'PageUp', rtl ? 'ArrowRight' : 'ArrowLeft'];
      if (e.target.closest('.panel') && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key.startsWith('Page'))) return;
      if (fwd.includes(e.key)) { e.preventDefault(); next(1); }
      else if (back.includes(e.key)) { e.preventDefault(); next(-1); }
    });

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-go], [data-project], [data-cert], [data-skill], [data-lang], [data-intent]');
      if (!t) return;
      if (t.dataset.go !== undefined) { e.preventDefault(); go(Number(t.dataset.go)); }
      else if (t.dataset.project) openModal('project', t.dataset.project);
      else if (t.dataset.cert) openModal('cert', t.dataset.cert);
      else if (t.dataset.skill) { selectedSkill = t.dataset.skill; showSkill(selectedSkill); sfx('click'); }
      else if (t.dataset.lang) setLang(t.dataset.lang);
      else if (t.dataset.intent) ask(t.textContent, t.dataset.intent);
    });

    window.World.onPick = (p) => {
      if (p.project) { if (state.index !== 4) go(4); openModal('project', p.project); }
      else if (p.section !== undefined) go(p.section);
    };
  }

  function applyLayout() {
    const mode = mobileMq.matches ? 'bottom' : state.lang === 'ar' ? 'right' : 'left';
    window.World.setLayout(mode);
  }

  function setLang(l) {
    if (!LANGS.includes(l) || l === state.lang) return;
    state.lang = l;
    store.set('lang', l);
    renderAll();
    go(state.index, { instant: true });
    sfx('click');
  }

  /* ---------- modal ---------- */
  let modalState = null, lastFocus = null;
  function openModal(kind, id) {
    const t = T();
    const body = $('#modal-body');
    if (kind === 'project') {
      const pr = window.PROJECTS.find((p) => p.id === id);
      const it = t.projects.items[id];
      body.innerHTML = `
        <div class="modal-head"><img src="${window.World.iconURL('chestFront')}" alt="" width="52" height="56">
          <div><h2 id="modal-title">${esc(it.name)}</h2><p class="modal-sub">${esc(it.sub)} · ${esc(it.date)} · ${esc(it.context)}</p></div></div>
        <p>${esc(it.short)}</p>
        <h3>${esc(t.projects.features)}</h3>
        <ul class="bullets">${it.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <h3>${esc(t.projects.stack)}</h3>
        <div>${pr.stack.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>
        ${pr.link ? `<p style="margin-top:14px"><a class="mc-btn" href="${pr.link}" target="_blank" rel="noopener">${SVG.github} GitHub</a></p>` : ''}`;
      if (!modalState || modalState.id !== id) sfx('chest');
      window.World.openChest(id, true);
    } else {
      const a = window.ACHIEVEMENTS.find((x) => x.id === id);
      body.innerHTML = `<h2 id="modal-title">${esc(t.achievements.items[id])}</h2>
        <p class="modal-sub">${esc(t.achievements.kinds[a.kind])}</p>
        <img class="cert" src="${a.img}" alt="${esc(t.achievements.items[id])}">`;
    }
    if (modalState && modalState.kind === 'project' && modalState.id !== id) window.World.openChest(modalState.id, false);
    modalState = { kind, id };
    const m = $('#modal');
    if (m.hidden) { lastFocus = document.activeElement; m.hidden = false; }
    $('#modal-close').focus();
  }
  function closeModal() {
    const m = $('#modal');
    if (m.hidden) return;
    m.hidden = true;
    if (modalState && modalState.kind === 'project') window.World.openChest(modalState.id, false);
    modalState = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function bindModal() {
    $('#modal-close').addEventListener('click', closeModal);
    $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
    $('#modal').addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = $$('a[href], button, input, textarea', $('#modal')).filter((x) => !x.disabled);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(title, text, icon) {
    const el = $('#toast');
    el.innerHTML = `${icon ? `<img src="${icon}" alt="" width="36" height="39">` : ''}<div><strong>${esc(title)}</strong><span>${esc(text)}</span></div>`;
    el.hidden = false;
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    sfx('level');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 5000);
  }

  /* ---------- chat ---------- */
  function toggleChat(open) {
    const chat = $('#chat');
    const show = open === undefined ? chat.hidden : open;
    if (show === !chat.hidden) return;
    chat.hidden = !show;
    $('#chat-toggle').setAttribute('aria-expanded', String(show));
    if (show) {
      if (!$('#chat-log').children.length) say(T().chat.hello, 'bot');
      setTimeout(() => $('#chat-input').focus(), 50);
    } else $('#chat-toggle').focus();
  }
  function say(text, who, goIndex, lang) {
    const log = $('#chat-log');
    const div = document.createElement('div');
    div.className = 'msg ' + who;
    div.textContent = text;
    if (lang) { div.lang = lang; div.dir = lang === 'ar' ? 'rtl' : 'ltr'; }
    if (goIndex !== undefined && goIndex !== null) {
      const L = window.I18N[lang || state.lang];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mc-btn';
      b.textContent = L.chat.go + ' → ' + L.nav[goIndex];
      b.dataset.go = goIndex;
      div.appendChild(document.createElement('br'));
      div.appendChild(b);
    }
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
  function intentFor(text) {
    const s = text.toLowerCase();
    const tokens = s.split(/[^\p{L}\p{N}+#-]+/u).filter(Boolean);
    return window.CHAT_INTENTS.find((it) => it.words.some((w) => (w.length <= 3 ? tokens.includes(w) : s.includes(w))));
  }
  /* Guess the language of a typed question; falls back to the page language when unclear (e.g. "Java?"). */
  const LANG_HINTS = {
    de: ['was', 'wie', 'wer', 'wo', 'welche', 'welcher', 'ist', 'sind', 'du', 'hast', 'hat', 'er', 'sein', 'seine', 'ich', 'und', 'nicht', 'kannst', 'kann', 'mit', 'für', 'über', 'studiert', 'arbeitet', 'spricht', 'sprichst', 'lebenslauf', 'kontakt', 'projekte', 'fähigkeiten', 'erfahrung', 'sprachen', 'hallo', 'danke', 'bitte', 'gibt', 'es', 'mir', 'zeig', 'erzähl'],
    fr: ['quel', 'quels', 'quelle', 'quelles', 'est', 'tu', 'il', 'ses', 'son', 'sa', 'que', 'qui', 'quoi', 'comment', 'où', 'parle', 'parles', 'études', 'projets', 'compétences', 'travail', 'je', 'le', 'la', 'les', 'des', 'avec', 'pour', 'bonjour', 'salut', 'merci', 'langues', 'expérience', 'contacter', 'montre', 'peux'],
    en: ['what', 'who', 'how', 'where', 'which', 'is', 'are', 'does', 'do', 'did', 'his', 'he', 'you', 'your', 'skills', 'projects', 'study', 'studied', 'work', 'works', 'resume', 'about', 'can', 'the', 'and', 'hello', 'hi', 'thanks', 'show', 'tell', 'me', 'languages', 'speak', 'experience']
  };
  function detectLang(text) {
    if (/[؀-ۿ]/.test(text)) return 'ar';
    const s = text.toLowerCase();
    const tokens = s.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    const score = { de: /[äöüß]/.test(s) ? 2 : 0, fr: /[éèêàçùâîôœ]/.test(s) ? 2 : 0, en: 0 };
    tokens.forEach((t) => Object.keys(LANG_HINTS).forEach((l) => { if (LANG_HINTS[l].includes(t)) score[l] += 1; }));
    const best = Object.keys(score).sort((a, b) => score[b] - score[a]);
    if (score[best[0]] === 0 || score[best[0]] === score[best[1]]) return state.lang;
    return best[0];
  }
  function ask(text, forced) {
    text = text.trim();
    if (!text) return;
    say(text, 'me');
    const intent = forced ? window.CHAT_INTENTS.find((x) => x.id === forced) : intentFor(text);
    const lang = forced ? state.lang : detectLang(text);
    const c = window.I18N[lang].chat;
    setTimeout(() => {
      if (!intent) say(c.fallback, 'bot', null, lang);
      else say(c.answers[intent.id], 'bot', intent.go !== state.index ? intent.go : null, lang);
      sfx('villager');
    }, reducedMotion ? 0 : 380);
  }
  function bindChat() {
    $('#chat-toggle').addEventListener('click', () => toggleChat());
    $('#chat-close').addEventListener('click', () => toggleChat(false));
    $('#chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('#chat-input');
      ask(input.value);
      input.value = '';
    });
  }

  /* ---------- contact form (web3forms) ---------- */
  async function sendForm(e) {
    e.preventDefault();
    const f = e.target, c = T().contact, status = $('#form-status');
    const data = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
    status.className = 'form-status';
    if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      status.textContent = c.invalid; status.classList.add('err'); return;
    }
    if (f.botcheck.checked) return;
    const btn = f.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = c.sending;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({ access_key: P.formKey, subject: 'Portfolio message from ' + data.name, from_name: 'Portfolio' }, data))
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.status);
      status.textContent = c.ok; status.classList.add('ok');
      f.reset();
      sfx('level');
    } catch (err) {
      status.innerHTML = `${esc(c.fail)} <a href="mailto:${P.email}">${P.email}</a>`;
      status.classList.add('err');
    } finally {
      btn.disabled = false;
    }
  }

  /* ---------- sound (WebAudio, generated) ---------- */
  let audio;
  function sfx(kind) {
    if (!state.sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const now = audio.currentTime;
      const tone = (freq, start, dur, type, vol, slide) => {
        const o = audio.createOscillator(), g = audio.createGain();
        o.type = type || 'square';
        o.frequency.setValueAtTime(freq, now + start);
        if (slide) o.frequency.exponentialRampToValueAtTime(slide, now + start + dur);
        g.gain.setValueAtTime(vol || 0.05, now + start);
        g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
        o.connect(g).connect(audio.destination);
        o.start(now + start); o.stop(now + start + dur + 0.02);
      };
      if (kind === 'click') tone(620, 0, 0.06, 'square', 0.04, 300);
      else if (kind === 'chest') { tone(180, 0, 0.12, 'triangle', 0.09, 120); tone(260, 0.08, 0.1, 'triangle', 0.06); }
      else if (kind === 'villager') { tone(300, 0, 0.12, 'sawtooth', 0.03, 220); tone(240, 0.1, 0.14, 'sawtooth', 0.03, 180); }
      else if (kind === 'level') [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.08, 0.16, 'square', 0.035));
    } catch (e) { /* audio is optional */ }
  }

  /* ---------- boot ---------- */
  function bindControls() {
    $('#btn-night').addEventListener('click', () => {
      state.night = !state.night;
      store.set('night', state.night ? '1' : '0');
      window.World.setNight(state.night);
      updateToggles();
      sfx('click');
    });
    $('#btn-sound').addEventListener('click', () => {
      state.sound = !state.sound;
      store.set('sound', state.sound ? '1' : '0');
      updateToggles();
      sfx('click');
    });
    mobileMq.addEventListener('change', applyLayout);
  }

  async function boot() {
    const t = T();
    const W = window.World;
    $('#brand-icon').src = W.iconURL('grass');
    const vill = villagerURL();
    $('#villager-icon').src = vill;
    $('#villager-icon-2').src = vill;
    $('#loader').style.backgroundImage = `url(${W.patternURL('dirt')})`;
    document.body.style.setProperty('--grass-pattern', `url(${W.patternURL('grassSide')})`);

    renderAll();
    bindNavigation();
    bindModal();
    bindChat();
    bindControls();
    W.setNight(state.night);

    const hashIndex = SECTIONS.findIndex((s) => '#' + s.id === location.hash);
    const start = hashIndex >= 0 ? hashIndex : 0;
    W.goTo(start, true);

    const t0 = performance.now();
    const steps = t.ui.steps;
    const ok = await W.init({
      canvas: $('#world'),
      mobile: mobileMq.matches,
      reducedMotion,
      onProgress: (n) => {
        $('#loader-fill').style.width = (n / 4) * 100 + '%';
        $('#loader-step').textContent = T().ui.steps[Math.min(n, steps.length - 1)];
      }
    }).catch((err) => { console.error(err); return false; });
    if (!ok) document.body.classList.add('no-webgl');
    applyLayout();
    const wait = Math.max(0, (reducedMotion ? 300 : 1100) - (performance.now() - t0));
    setTimeout(() => {
      $('#loader').classList.add('done');
      if (ok) W.intro();
      go(start, { instant: true });
      if (!ok) toast('', T().ui.noWebgl);
    }, wait);

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
