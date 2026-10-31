/*!
 * Joomax Layout v2: Header & Footer portable (Web Components + Shadow DOM)
 * ---------------------------------------------------------------------------
 *   <joomax-header sticky current="home"></joomax-header>
 *   ... isi halaman ...
 *   <joomax-footer></joomax-footer>
 *   <script src="https://designjoomax.github.io/headerfooter/joomax-layout.config.js"></script>
 *   <script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
 *
 * Header : ikon kiri, menu pill di tengah (highlight meluncur, dropdown yang berubah ukuran
 *          dengan halus antar menu), hamburger kanan yang membuka panel menu.
 * Footer : logo + kolom link + sosial + pemilih negara.
 *
 * Atribut <joomax-header>: sticky | theme="light|dark" | current="id-menu"
 * Isi menu/footer: window.JOOMAX_LAYOUT (lihat joomax-layout.config.js)
 * CSS website: --jx-accent --jx-accent-dark --jx-font --jx-max (lebar header) --jx-footer-max
 */
(() => {
  "use strict";
  if (window.JoomaxLayout) return;

  const SCRIPT = document.currentScript;
  const BASE = SCRIPT && SCRIPT.src ? new URL(".", SCRIPT.src).href : "";
  const DESKTOP = "(min-width: 861px)";

  // ---------- Default ----------
  const DEFAULTS = {
    loadFont: true,
    brand: { name: "Joomax Teknologi Indonesia", href: "./", mark: BASE + "assets/icon-red.png", logo: BASE + "assets/logo.png", logoOnDark: "" },
    nav: [],
    cta: null,
    footer: { columns: [], social: [], copyright: "© {year} Joomax Teknologi Indonesia. All Rights Reserved.", credit: "", creditHref: "", countries: [] }
  };
  const cfg = () => {
    const u = window.JOOMAX_LAYOUT || {};
    return { ...DEFAULTS, ...u, brand: { ...DEFAULTS.brand, ...(u.brand || {}) }, footer: { ...DEFAULTS.footer, ...(u.footer || {}) } };
  };

  // ---------- Util ----------
  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  };
  const ICONS = {
    chevron: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".7" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" stroke="none"/>',
    whatsapp: '<path d="M4 20l1.2-4.2A8 8 0 1 1 8.3 18.8z"/><path d="M9.2 9.2c.3 2.3 2.3 4.3 4.6 4.6l1.1-1.1-1.8-.9-.7.7a3.6 3.6 0 0 1-1.5-1.5l.7-.7-.9-1.8z"/>',
    linkedin: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 11v5M8.5 8v.1M12 16v-5m0 2.2c0-1.4 1-2.2 2.2-2.2s1.8.8 1.8 2.2V16"/>'
  };
  const icon = (name, cls) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true"); s.setAttribute("class", "i" + (cls ? " " + cls : ""));
    s.innerHTML = ICONS[name] || ICONS.globe;
    return s;
  };
  const isExternal = (href) => {
    try { const u = new URL(href, location.href); return /^https?:$/.test(u.protocol) && u.origin !== location.origin; } catch { return false; }
  };
  const normPath = (p) => p.replace(/index\.html?$/i, "").replace(/\/+$/, "");
  const isCurrent = (item) => {
    if (typeof item.current === "boolean") return item.current;
    if (!item.href || item.href === "#") return false;
    try {
      const u = new URL(item.href, location.href);
      return !u.hash && u.origin === location.origin && normPath(u.pathname) === normPath(location.pathname);
    } catch { return false; }
  };
  const attrs = (item, current) => {
    const ph = !item.href || item.href === "#", ext = !ph && isExternal(item.href);
    return { href: item.href || null, "data-ph": item.href === "#", target: ext ? "_blank" : null, rel: ext ? "noopener noreferrer" : null, "aria-current": current ? "page" : null };
  };
  const ensureFont = () => {
    if (document.querySelector('link[href*="family=Poppins"]') || document.getElementById("jx-font")) return;
    document.head.append(
      h("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      h("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }),
      h("link", { id: "jx-font", rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" })
    );
  };

  // ---------- Tema ----------
  const instances = new Set();
  const modeOf = (el) => {
    const t = el.getAttribute("theme") || document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  const syncModes = () => instances.forEach((el) => el._applyMode && el._applyMode());
  new MutationObserver(syncModes).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncModes);

  // ---------- CSS ----------
  const BASE_CSS = `
    *,*::before,*::after{box-sizing:border-box}
    a{color:inherit;text-decoration:none}
    button{font:inherit;color:inherit}
    .i{width:16px;height:16px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    :focus-visible{outline:3px solid var(--accent);outline-offset:2px}
    @media print{:host{display:none}}
  `;

  const HEADER_CSS = `
    :host{display:block;position:relative;z-index:100;font:16px/1.5 var(--jx-font,"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif)}
    :host([sticky]){position:sticky;top:0}
    .root{--bg:rgba(255,255,255,.88);--solid:#fff;--ink:#141416;--mut:#62626c;--line:#e8e8ec;--soft:#f4f4f6;--track:#f0f0f3;--glide:#fff;
      --glide-sh:0 1px 2px rgba(16,16,24,.08),0 3px 10px -3px rgba(16,16,24,.16);--accent:var(--jx-accent,#e60020);--ease:cubic-bezier(.22,.8,.24,1);color:var(--ink)}
    .root[data-mode="dark"]{--bg:rgba(15,15,18,.86);--solid:#17171c;--ink:#f3f3f5;--mut:#a3a3ad;--line:#2a2a31;--soft:#202027;--track:#22222a;--glide:#35353f;
      --glide-sh:0 1px 2px rgba(0,0,0,.4);--accent:var(--jx-accent-dark,#ff3d55)}

    .bar{position:relative;background:var(--bg);border-bottom:1px solid var(--line);-webkit-backdrop-filter:saturate(1.5) blur(16px);backdrop-filter:saturate(1.5) blur(16px);transition:box-shadow .3s ease}
    .root[data-scrolled] .bar{box-shadow:0 12px 32px -24px rgba(16,16,24,.55)}
    .in{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;width:min(var(--jx-max,1600px),calc(100% - 40px));height:66px;margin:0 auto;transition:height .35s var(--ease)}
    .root[data-scrolled] .in{height:58px}
    .brand{justify-self:start;display:inline-flex;align-items:center;height:42px;border-radius:10px}
    .brand img{display:block;height:28px;width:auto;transition:transform .45s var(--ease)}
    .brand:hover img{transform:scale(1.07) rotate(-3deg)}
    .end{justify-self:end;display:flex;align-items:center;gap:8px}

    .track{position:relative;display:flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:var(--track)}
    .glider{position:absolute;left:0;top:4px;bottom:4px;width:0;border-radius:999px;background:var(--glide);box-shadow:var(--glide-sh);opacity:0;pointer-events:none;
      transition:transform .45s var(--ease),width .45s var(--ease),opacity .25s ease}
    .glider.on{opacity:1}
    .glider.jump{transition:none}
    .it{position:relative;z-index:1;display:inline-flex;align-items:center;gap:5px;height:34px;padding:0 16px;border:0;border-radius:999px;background:none;cursor:pointer;
      font-size:.86rem;font-weight:500;color:var(--mut);white-space:nowrap;transition:color .25s ease}
    .it:hover,.it[data-cur],.it[aria-expanded="true"]{color:var(--ink)}
    .it .i{width:14px;height:14px;stroke-width:2.3;transition:transform .4s var(--ease)}
    .it[aria-expanded="true"] .i{transform:rotate(180deg)}

    .cta{display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:999px;background:var(--accent);color:#fff;font-size:.88rem;font-weight:600;transition:filter .2s,transform .3s var(--ease)}
    .cta:hover{filter:brightness(1.08);transform:translateY(-1px)}
    .root[data-mode="dark"] .cta{color:#17171c}
    .burger{display:grid;place-items:center;width:42px;height:42px;padding:0;border:0;border-radius:12px;background:none;cursor:pointer;transition:background .2s}
    .burger:hover{background:var(--soft)}
    .burger .i{width:24px;height:24px;stroke-width:1.8}

    /* Dropdown: satu panel yang pindah posisi dan berubah ukuran */
    .dd{position:absolute;top:calc(100% + 8px);left:0;z-index:5;width:var(--w,300px);height:var(--h,0px);overflow:hidden;outline:0;
      background:var(--solid);border:1px solid var(--line);border-radius:20px;box-shadow:0 34px 60px -28px rgba(16,16,24,.4),0 10px 22px -14px rgba(16,16,24,.22);
      opacity:0;visibility:hidden;pointer-events:none;transform:translate3d(var(--x,0px),-8px,0) scale(.97);transform-origin:50% 0;
      transition:width .45s var(--ease),height .45s var(--ease),transform .45s var(--ease),opacity .22s ease,visibility 0s linear .45s}
    .dd.jump{transition:none}
    .dd.open{opacity:1;visibility:visible;pointer-events:auto;transform:translate3d(var(--x,0px),0,0) scale(1);
      transition:width .45s var(--ease),height .45s var(--ease),transform .45s var(--ease),opacity .22s ease,visibility 0s}
    .dd-in{position:relative;width:100%;height:100%}
    .menu{position:absolute;left:0;top:0;width:var(--mw,300px);padding:8px;opacity:0;visibility:hidden;transform:translateX(calc(var(--dir,1) * -16px));
      transition:opacity .25s ease,transform .45s var(--ease),visibility 0s linear .25s}
    .menu.on{opacity:1;visibility:visible;transform:none;transition-delay:0s}
    .dl{display:flex;align-items:center;gap:12px;padding:11px 12px 11px 14px;border-radius:13px;transition:background .2s ease}
    .dl:hover,.dl:focus-visible{background:var(--soft)}
    .dl-t{display:block;min-width:0}
    .dl-t b{display:block;font-size:.9rem;font-weight:600;color:var(--ink)}
    .dl-t .d{display:block;font-size:.78rem;line-height:1.35;color:var(--mut)}
    .dl .i{margin-left:auto;color:var(--accent);opacity:0;transform:translateX(-8px);transition:opacity .25s ease,transform .4s var(--ease)}
    .dl:hover .i,.dl:focus-visible .i{opacity:1;transform:none}
    .dl[aria-current="page"] .dl-t b{color:var(--accent)}

    /* Panel menu (hamburger) */
    .scrim{position:fixed;inset:0;z-index:90;background:rgba(14,14,20,.45);opacity:0;visibility:hidden;transition:opacity .45s ease,visibility 0s linear .45s}
    .drawer{position:fixed;top:0;right:0;bottom:0;z-index:95;outline:0;display:flex;flex-direction:column;width:min(400px,100%);padding-top:env(safe-area-inset-top,0px);
      background:var(--solid);box-shadow:-30px 0 60px -30px rgba(0,0,0,.4);transform:translateX(104%);visibility:hidden;overflow-y:auto;
      transition:transform .55s var(--ease),visibility 0s linear .55s}
    .root[data-menu] .scrim{opacity:1;visibility:visible;transition-delay:0s}
    .root[data-menu] .drawer{transform:none;visibility:visible;transition-delay:0s}
    .d-head{display:flex;align-items:center;justify-content:space-between;padding:12px 20px 12px 24px;min-height:66px}
    .d-x{display:grid;place-items:center;width:42px;height:42px;padding:0;border:0;border-radius:12px;background:none;cursor:pointer;transition:background .2s,transform .4s var(--ease)}
    .d-x:hover{background:var(--soft);transform:rotate(90deg)}
    .d-x .i{width:22px;height:22px}
    .dn{display:flex;flex-direction:column;padding:8px 24px 24px}
    .dn>*{border-bottom:1px solid var(--line);opacity:0;transform:translateX(20px);transition:opacity .3s ease,transform .3s ease}
    .root[data-menu] .dn>*,.root[data-menu] .d-foot{opacity:1;transform:none;transition:opacity .5s ease calc(var(--i,0) * 50ms + 150ms),transform .6s var(--ease) calc(var(--i,0) * 50ms + 150ms)}
    .d-top{display:flex;align-items:center;justify-content:space-between;width:100%;padding:16px 0;border:0;background:none;text-align:left;cursor:pointer;font-size:1.3rem;font-weight:600;letter-spacing:-.01em;transition:color .2s}
    .dn>.d-top{border-bottom:1px solid var(--line)}
    .d-top:hover,.d-top[aria-current="page"]{color:var(--accent)}
    .d-top .i{width:20px;height:20px;transition:transform .45s var(--ease)}
    .grp.open .d-top .i{transform:rotate(180deg)}
    .d-sub{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows .5s var(--ease),visibility 0s linear .5s}
    .grp.open .d-sub{grid-template-rows:1fr;visibility:visible;transition-delay:0s}
    .d-sub-in{min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:2px}
    .d-link{display:block;padding:10px 14px;margin:0 -14px;border-radius:12px;transition:background .2s}
    .d-link:first-child{margin-top:0}.d-sub-in>.d-link:last-child{margin-bottom:14px}
    .d-link:hover,.d-link:focus-visible{background:var(--soft)}
    .d-link b{display:block;font-size:.98rem;font-weight:600}
    .d-link span{display:block;font-size:.8rem;color:var(--mut)}
    .d-link[aria-current="page"] b{color:var(--accent)}
    .d-foot{padding:20px 24px calc(24px + env(safe-area-inset-bottom,0px));margin-top:auto;opacity:0;transform:translateX(20px)}
    .d-foot .cta{width:100%;justify-content:center;height:48px;margin-bottom:14px}
    .d-foot small{display:block;color:var(--mut);font-size:.78rem}

    @media (max-width:860px){
      .track,.end .cta{display:none}
      .in{grid-template-columns:1fr auto;height:62px}
      .root[data-scrolled] .in{height:56px}
      .dd{display:none}
    }
    @media (prefers-reduced-motion:reduce){*{transition-duration:.01ms !important;transition-delay:0s !important}}
  `;

  const FOOTER_CSS = `
    :host{display:block;font:16px/1.5 var(--jx-font,"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif)}
    .root{--accent:var(--jx-accent-dark,#ff3d55);background:#111116;color:#fff;padding:60px 24px calc(28px + env(safe-area-inset-bottom,0px))}
    .in{width:min(var(--jx-footer-max,1180px),100%);margin:0 auto}
    .top{display:grid;grid-template-columns:minmax(0,1.25fr) repeat(var(--cols,4),minmax(0,1fr));gap:36px 32px;align-items:center}
    .brand{display:inline-flex;width:max-content;max-width:100%;transition:opacity .25s}
    .brand:hover{opacity:.8}
    .brand img{display:block;width:min(190px,100%);height:auto}
    .brand img.invert{filter:brightness(0) invert(1)}
    .col{display:flex;flex-direction:column;align-items:flex-start;gap:11px;min-width:0;align-self:start}
    .col h2{margin:0 0 6px;font-size:.95rem;font-weight:600;color:#fff}
    .col a,.col span{position:relative;max-width:100%;color:#c9c9d1;font-size:.84rem;line-height:1.5;overflow-wrap:anywhere;transition:color .2s}
    .col a::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.22,.8,.24,1)}
    .col a:hover{color:#fff}.col a:hover::after{transform:scaleX(1)}
    .bottom{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:52px;padding-top:26px;border-top:1px solid #33333b}
    .legal{min-width:0;font-size:.8rem;color:#e4e4ea}
    .legal small{display:block;margin-top:4px;color:#8d8d98;font-size:.72rem}
    .legal small a:hover{color:#fff}
    .right{display:flex;align-items:center;gap:6px;flex:none}
    .soc{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;color:#e4e4ea;transition:color .2s,background .2s,transform .35s cubic-bezier(.22,.8,.24,1)}
    .soc:hover{color:#fff;background:#1d1d24;transform:translateY(-2px)}
    .soc .i{width:23px;height:23px;stroke-width:1.7}
    .country{position:relative;display:flex;align-items:center;gap:10px;width:170px;height:42px;margin-left:14px;padding:0 34px 0 12px;border:1px solid #4a4a54;border-radius:8px;transition:border-color .2s}
    .country:hover,.country:focus-within{border-color:#8a8a96}
    .code{display:grid;place-items:center;flex:none;min-width:22px;height:16px;padding:0 4px;border-radius:3px;background:#2b2b33;font-size:.6rem;font-weight:700;letter-spacing:.04em;color:#e4e4ea}
    .country select{width:100%;min-width:0;height:100%;border:0;outline:0;background:transparent;color:#fff;font:inherit;font-size:.82rem;cursor:pointer;appearance:none;-webkit-appearance:none}
    .country select option{background:#17171c;color:#fff}
    .country .i{position:absolute;right:12px;top:50%;width:14px;height:14px;margin-top:-7px;pointer-events:none;color:#c9c9d1}
    @media (max-width:1000px){
      .top{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
      .brand{grid-column:1/-1}
    }
    @media (max-width:640px){
      .root{padding:44px 20px calc(24px + env(safe-area-inset-bottom,0px))}
      .bottom{flex-direction:column;align-items:flex-start;gap:20px;margin-top:40px}
      .right{width:100%;flex-wrap:wrap}
      .country{margin-left:0;width:100%;max-width:340px;order:-1}
      .brand img{width:170px}
    }
    @media (prefers-reduced-motion:reduce){*{transition-duration:.01ms !important}}
  `;

  // ---------- Elemen dasar ----------
  class JoomaxPart extends HTMLElement {
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      instances.add(this);
      this.refresh();
      this._ready = true;
    }
    disconnectedCallback() { instances.delete(this); this._teardown(); }
    refresh() { this._teardown(); this.render(); }
    _teardown() { if (this._cleanup) { this._cleanup(); this._cleanup = null; } }
    mount(css, root) { this.shadowRoot.replaceChildren(h("style", null, BASE_CSS + css), root); }
    onCleanup(fn) { const p = this._cleanup; this._cleanup = () => { p && p(); fn(); }; }
  }

  // ---------- Header ----------
  class JoomaxHeader extends JoomaxPart {
    static get observedAttributes() { return ["theme", "current"]; }
    attributeChangedCallback(name) {
      if (!this._ready) return;
      if (name === "theme") this._applyMode && this._applyMode(); else this.refresh();
    }

    render() {
      const c = cfg(), b = c.brand, items = c.nav || [], cur = this.getAttribute("current");
      if (c.loadFont) ensureFont();
      const hasKids = (it) => !!(it.children && it.children.length);
      const isCur = (it) => (cur ? it.id === cur : it.href ? isCurrent(it) : (it.children || []).some(isCurrent));

      // --- bar
      const glider = h("span", { class: "glider", "aria-hidden": "true" });
      const triggers = items.map((it, i) => hasKids(it)
        ? h("button", { class: "it", type: "button", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "dd", "data-i": i, "data-cur": isCur(it) }, it.label, icon("chevron"))
        : h(it.href ? "a" : "span", { class: "it", "data-i": i, "data-cur": isCur(it), ...(it.href ? attrs(it, isCur(it)) : {}) }, it.label));
      const track = h("nav", { class: "track", "aria-label": "Navigasi utama" }, glider, triggers);
      const burger = h("button", { class: "burger", type: "button", "aria-label": "Buka menu", "aria-expanded": "false", "aria-controls": "drawer" }, icon("menu"));
      const cta = c.cta ? h("a", { class: "cta", ...attrs(c.cta, false) }, c.cta.label) : null;
      const brand = h("a", { class: "brand", href: b.href, "aria-label": b.name }, h("img", { src: b.mark, alt: "" }));

      const menus = items.map((it, i) => hasKids(it)
        ? h("div", { class: "menu", "data-i": i, "aria-label": it.label },
            it.children.map((ch) => h(ch.href ? "a" : "span", { class: "dl", ...(ch.href ? attrs(ch, isCurrent(ch)) : {}) },
              h("span", { class: "dl-t" }, h("b", null, ch.label), ch.desc ? h("span", { class: "d" }, ch.desc) : null), icon("arrow"))))
        : null);
      const dd = h("div", { class: "dd", id: "dd", tabindex: "-1" }, h("div", { class: "dd-in" }, menus.filter(Boolean)));
      const bar = h("header", { class: "bar" }, h("div", { class: "in" }, brand, track, h("div", { class: "end" }, cta, burger)), dd);

      // --- panel menu
      let n = 0;
      const dn = h("nav", { class: "dn", "aria-label": "Menu utama" }, items.map((it) => {
        const style = "--i:" + n++;
        if (hasKids(it)) {
          const open = isCur(it);
          const btn = h("button", { class: "d-top", type: "button", "aria-expanded": String(open) }, it.label, icon("chevron"));
          const grp = h("div", { class: "grp" + (open ? " open" : ""), style }, btn,
            h("div", { class: "d-sub" }, h("div", { class: "d-sub-in" },
              it.children.map((ch) => h(ch.href ? "a" : "span", { class: "d-link", ...(ch.href ? attrs(ch, isCurrent(ch)) : {}) }, h("b", null, ch.label), ch.desc ? h("span", null, ch.desc) : null)))));
          btn.addEventListener("click", () => { const o = grp.classList.toggle("open"); btn.setAttribute("aria-expanded", String(o)); });
          return grp;
        }
        return h(it.href ? "a" : "span", { class: "d-top", style, ...(it.href ? attrs(it, isCur(it)) : {}) }, it.label);
      }));
      const closeBtn = h("button", { class: "d-x", type: "button", "aria-label": "Tutup menu" }, icon("close"));
      const drawer = h("aside", { class: "drawer", id: "drawer", "aria-label": "Menu", tabindex: "-1" },
        h("div", { class: "d-head" }, h("a", { class: "brand", href: b.href, "aria-label": b.name }, h("img", { src: b.mark, alt: "" })), closeBtn),
        dn,
        h("div", { class: "d-foot", style: "--i:" + n }, c.cta ? h("a", { class: "cta", ...attrs(c.cta, false) }, c.cta.label) : null, h("small", null, b.name)));
      const scrim = h("div", { class: "scrim" });
      const root = h("div", { class: "root" }, bar, scrim, drawer);
      this.mount(HEADER_CSS, root);

      // --- tema
      this._applyMode = () => { root.dataset.mode = modeOf(this); };
      this._applyMode();

      // --- placeholder link "#"
      root.addEventListener("click", (e) => { if (e.target.closest("a[data-ph]")) e.preventDefault(); });

      // --- bayangan + mengecil saat digulir
      const onScroll = () => root.toggleAttribute("data-scrolled", scrollY > 6);
      addEventListener("scroll", onScroll, { passive: true });
      this.onCleanup(() => removeEventListener("scroll", onScroll));
      onScroll();

      // --- highlight meluncur
      let openI = -1, openedBy = null, closeT = 0, hl = null;
      const curTrigger = () => triggers.find((t) => t.hasAttribute("data-cur")) || null;
      const glide = (t, jump) => {
        if (!t || !track.offsetWidth) { glider.classList.remove("on"); return; }
        glider.classList.toggle("jump", !!jump);
        glider.style.width = t.offsetWidth + "px";
        glider.style.transform = "translateX(" + t.offsetLeft + "px)";
        glider.classList.add("on");
        if (jump) { void glider.offsetWidth; glider.classList.remove("jump"); }
        hl = t;
      };
      const rest = (jump) => glide(openI >= 0 ? triggers.find((t) => +t.dataset.i === openI) : curTrigger(), jump);
      requestAnimationFrame(() => rest(true));
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => rest(true));
      const ro = new ResizeObserver(() => rest(true));
      ro.observe(track);
      this.onCleanup(() => ro.disconnect());

      // --- dropdown
      const closeDD = () => {
        clearTimeout(closeT);
        if (openI < 0) return;
        openI = -1; openedBy = null;
        dd.classList.remove("open");
        triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
        rest();
      };
      const scheduleClose = () => { clearTimeout(closeT); closeT = setTimeout(closeDD, 280); };
      const openDD = (i, by) => {
        clearTimeout(closeT);
        const trg = triggers.find((t) => +t.dataset.i === i), menu = menus[i];
        if (!trg || !menu || !matchMedia(DESKTOP).matches) return;
        const was = openI >= 0, same = openI === i, dir = was ? (i > openI ? 1 : -1) : 1;
        openedBy = same && openedBy === "click" ? "click" : by;
        const w = menu.offsetWidth + 2, hh = menu.offsetHeight + 2;
        const bb = bar.getBoundingClientRect(), tb = trg.getBoundingClientRect();
        const x = Math.max(12, Math.min(tb.left - bb.left + tb.width / 2 - w / 2, bb.width - w - 12));
        if (!was) dd.classList.add("jump");
        dd.style.setProperty("--w", w + "px"); dd.style.setProperty("--h", hh + "px"); dd.style.setProperty("--x", x + "px");
        if (!was) { void dd.offsetWidth; dd.classList.remove("jump"); }
        if (was && !same) {
          const prev = menus[openI];
          prev.style.setProperty("--dir", dir); prev.classList.remove("on");
          menu.style.transition = "none"; menu.style.setProperty("--dir", -dir); void menu.offsetWidth; menu.style.transition = "";
          menu.classList.add("on");
        } else if (!was) {
          menus.forEach((m) => { if (m && m !== menu) { m.style.transition = "none"; m.classList.remove("on"); } });
          menu.style.transition = "none"; menu.classList.add("on"); void menu.offsetWidth;
          menus.forEach((m) => { if (m) m.style.transition = ""; });
        }
        dd.classList.add("open");
        openI = i;
        triggers.forEach((t) => t.setAttribute("aria-expanded", String(+t.dataset.i === i)));
        glide(trg);
      };
      triggers.forEach((t) => {
        const i = +t.dataset.i, kids = hasKids(items[i]);
        t.addEventListener("pointerenter", (e) => {
          if (e.pointerType === "touch") return;
          glide(t);
          if (kids) openDD(i, "hover"); else if (openI >= 0) scheduleClose();
        });
        t.addEventListener("focus", () => glide(t));
        if (kids) {
          t.addEventListener("click", () => { if (openI === i && openedBy === "click") closeDD(); else openDD(i, "click"); });
          t.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); openDD(i, "click"); const f = menus[i].querySelector("a"); f && setTimeout(() => f.focus(), 30); }
          });
        }
      });
      track.addEventListener("pointerleave", () => { if (openI >= 0) scheduleClose(); else rest(); });
      dd.addEventListener("pointerenter", () => clearTimeout(closeT));
      dd.addEventListener("pointerleave", scheduleClose);
      root.addEventListener("focusout", (e) => { if (openI >= 0 && !root.contains(e.relatedTarget)) closeDD(); });

      // --- panel menu (hamburger)
      let lockPrev = null;
      const setMenu = (open) => {
        root.toggleAttribute("data-menu", open);
        burger.setAttribute("aria-expanded", String(open));
        if (open) {
          closeDD();
          lockPrev = document.documentElement.style.overflow;
          document.documentElement.style.overflow = "hidden";
          setTimeout(() => drawer.focus({ preventScroll: true }), 60);
        } else if (lockPrev !== null) {
          document.documentElement.style.overflow = lockPrev; lockPrev = null;
          burger.focus({ preventScroll: true });
        }
      };
      burger.addEventListener("click", () => setMenu(true));
      closeBtn.addEventListener("click", () => setMenu(false));
      scrim.addEventListener("click", () => setMenu(false));
      drawer.addEventListener("click", (e) => { if (e.target.closest("a.d-top,a.d-link")) setMenu(false); });

      // --- global: Esc, klik di luar, resize
      const onKey = (e) => {
        if (e.key !== "Escape") return;
        if (root.hasAttribute("data-menu")) setMenu(false);
        else if (openI >= 0) { const t = triggers.find((x) => +x.dataset.i === openI); closeDD(); if (root.contains(document.activeElement) || this.shadowRoot.activeElement) t && t.focus({ preventScroll: true }); }
      };
      const onDown = (e) => { if (openI >= 0 && !e.composedPath().includes(this)) closeDD(); };
      const onResize = () => { if (openI >= 0) closeDD(); rest(true); };
      document.addEventListener("keydown", onKey);
      document.addEventListener("pointerdown", onDown);
      addEventListener("resize", onResize);
      this.onCleanup(() => {
        document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown);
        removeEventListener("resize", onResize); clearTimeout(closeT);
        if (lockPrev !== null) document.documentElement.style.overflow = lockPrev;
      });
    }
  }

  // ---------- Footer ----------
  class JoomaxFooter extends JoomaxPart {
    render() {
      const c = cfg(), f = c.footer, b = c.brand, cols = f.columns || [];
      if (c.loadFont) ensureFont();
      const logo = h("img", { src: b.logoOnDark || b.logo, alt: b.name, class: b.logoOnDark ? "" : "invert" });

      const social = (f.social || []).map((s) => h("a", { class: "soc", "aria-label": s.label, title: s.label, ...attrs(s, false) }, icon(s.icon || "globe")));

      let country = null;
      const list = f.countries || [];
      if (list.length) {
        const sel = Math.max(list.findIndex((x) => x.selected), 0);
        const code = h("span", { class: "code", "aria-hidden": "true" }, list[sel].code || "");
        const select = h("select", { "aria-label": "Pilih negara" }, list.map((x, i) => h("option", { value: i, selected: i === sel }, x.name)));
        select.addEventListener("change", () => {
          const picked = list[Number(select.value)];
          code.textContent = picked.code || "";
          this.dispatchEvent(new CustomEvent("joomax:country", { bubbles: true, composed: true, detail: picked }));
        });
        country = h("label", { class: "country" }, code, select, icon("chevron"));
      }

      const credit = f.credit ? h("small", null, f.creditHref ? h("a", { ...attrs({ href: f.creditHref }, false) }, f.credit) : f.credit) : null;
      const root = h("footer", { class: "root" });
      root.style.setProperty("--cols", cols.length || 1);
      root.append(h("div", { class: "in" },
        h("div", { class: "top" },
          h("a", { class: "brand", href: b.href, "aria-label": b.name }, logo),
          cols.map((col) => h("nav", { class: "col", "aria-label": col.title }, h("h2", null, col.title),
            (col.links || []).map((l) => h(l.href ? "a" : "span", l.href ? attrs(l, false) : {}, l.label))))),
        h("div", { class: "bottom" },
          h("div", { class: "legal" }, String(f.copyright || "").replace("{year}", new Date().getFullYear()), credit),
          h("div", { class: "right" }, social, country))));
      root.addEventListener("click", (e) => { if (e.target.closest("a[data-ph]")) e.preventDefault(); });
      this.mount(FOOTER_CSS, root);
    }
  }

  customElements.define("joomax-header", JoomaxHeader);
  customElements.define("joomax-footer", JoomaxFooter);

  window.JoomaxLayout = { version: "2.0.0", refresh: () => instances.forEach((el) => el.refresh()) };
})();
