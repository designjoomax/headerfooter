/*!
 * Joomax Layout v2: Header & Footer portable (Web Component + Shadow DOM)
 *   <joomax-header sticky></joomax-header> ...isi... <joomax-footer></joomax-footer>
 *   <script src="https://designjoomax.github.io/headerfooter/joomax-layout.config.js"></script>
 *   <script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
 * Isi diatur dari window.JOOMAX_LAYOUT (lihat file config).
 * CSS variabel: --jx-accent --jx-accent-dark --jx-font --jx-max --jx-footer-max. Atribut: sticky, theme="light|dark".
 */
(() => {
  "use strict";
  if (window.JoomaxLayout) return;
  const SCRIPT = document.currentScript;
  const BASE = SCRIPT && SCRIPT.src ? new URL(".", SCRIPT.src).href : "";
  const MOBILE_BP = 900;

  const DEFAULTS = {
    loadFont: true,
    brand: { name: "Joomax Teknologi Indonesia", mark: BASE + "assets/logo/icon-red.png", logo: BASE + "assets/logo/logo.png", logoOnDark: "", href: "./" },
    nav: [], cta: null,
    footer: { columns: [], social: [], copyright: "© {year} Joomax Teknologi Indonesia. All Rights Reserved.", credit: "", countries: [] }
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
      if (k === "class") el.className = v; else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  };
  const svg = (s) => { const t = document.createElement("template"); t.innerHTML = s; return t.content.firstElementChild; };
  const CHEV = '<svg class="chev" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const normPath = (p) => p.replace(/index\.html?$/i, "").replace(/\/+$/, "");
  const SITE = /(^|\.)github\.(com|io)$/;
  const slugOf = (u) => { const s = u.pathname.split("/").filter(Boolean); return (s[s.length - 1] || "").toLowerCase(); };
  // Halaman aktif: cocok persis, atau nama repo (mis. "imagetoframe") ada di alamat halaman sekarang
  const isCurrent = (it) => {
    if (typeof it.current === "boolean") return it.current;
    if (it.children) return it.children.some(isCurrent);
    if (!it.href || it.href === "#") return false;
    try {
      const u = new URL(it.href, location.href);
      if (u.hash) return false;
      if (u.origin === location.origin && normPath(u.pathname) === normPath(location.pathname)) return true;
      const slug = slugOf(u);
      return !!slug && SITE.test(u.hostname) && SITE.test(location.hostname) && location.pathname.toLowerCase().split("/").includes(slug);
    } catch { return false; }
  };
  const link = (it, cls) => {
    if (!it.href) return h("span", { class: cls }, it.label);
    return h("a", { class: cls, href: it.href, "data-ph": it.href === "#" ? "" : null,
      target: it.newTab ? "_blank" : null, rel: it.newTab ? "noopener noreferrer" : null,
      "aria-current": isCurrent(it) ? "page" : null }, it.label);
  };
  const ensureFont = () => {
    if (document.querySelector('link[href*="family=Poppins"]') || document.getElementById("jx-font")) return;
    document.head.append(h("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      h("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }),
      h("link", { id: "jx-font", rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" }));
  };

  // ---------- Tema ----------
  const instances = new Set();
  const modeOf = (el) => {
    const t = el.getAttribute("theme") || document.documentElement.getAttribute("data-theme");
    return t === "light" || t === "dark" ? t : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  const syncModes = () => instances.forEach((el) => el._applyMode && el._applyMode());
  new MutationObserver(syncModes).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncModes);

  // ---------- CSS ----------
  const BASE_CSS = `
    *,*::before,*::after{box-sizing:border-box}
    a{color:inherit;text-decoration:none}
    button{font:inherit;color:inherit}
    a:focus-visible,button:focus-visible,select:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
    @media print{:host{display:none}}
  `;
  const HEADER_CSS = `
    :host{display:block;position:relative;z-index:100;font:16px/1.5 var(--jx-font,"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif)}
    :host([sticky]){position:sticky;top:0}
    .root{--ease:cubic-bezier(.22,.8,.24,1);--h:72px;--bg:#fff;--glass:rgba(255,255,255,.82);--ink:#141416;--muted:#74747d;--line:#e6e6ea;--cap:#f0f0f0;--pill:#fff;--pillsh:0 1px 2px rgba(0,0,0,.06),0 6px 14px -6px rgba(0,0,0,.18);--hover:#f4f4f6;--accent:var(--jx-accent,#e60020);
      position:relative;isolation:isolate;color:var(--ink)}
    .root[data-mode="dark"]{--bg:#0f0f12;--glass:rgba(15,15,18,.82);--ink:#f3f3f5;--muted:#9a9aa3;--line:#2c2c33;--cap:#1b1b21;--pill:#2c2c35;--pillsh:0 1px 2px rgba(0,0,0,.4);--hover:#1d1d23;--accent:var(--jx-accent-dark,#ff3d55)}
    .root::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--glass);backdrop-filter:saturate(180%) blur(14px);-webkit-backdrop-filter:saturate(180%) blur(14px);border-bottom:1px solid transparent;transition:border-color .3s ease,box-shadow .3s ease}
    .root[data-scrolled]::before{border-bottom-color:var(--line);box-shadow:0 10px 24px -18px rgba(0,0,0,.35)}
    .in{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;width:min(var(--jx-max,1500px),calc(100% - 40px));height:var(--h);margin:0 auto}
    .brand{justify-self:start;display:inline-flex;border-radius:10px;transition:transform .4s var(--ease)}
    .brand:hover{transform:scale(1.06) rotate(-3deg)}
    .brand img{display:block;height:34px;width:auto}
    .menu{position:relative;display:flex;gap:2px;padding:6px;border-radius:999px;background:var(--cap)}
    .ind{position:absolute;top:6px;bottom:6px;left:0;width:0;border-radius:999px;background:var(--pill);box-shadow:var(--pillsh);opacity:0;pointer-events:none}
    .menu.ready .ind{transition:transform .5s var(--ease),width .5s var(--ease),opacity .25s ease}
    .item{position:relative}
    .mi{position:relative;z-index:1;display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 20px;border:0;border-radius:999px;background:none;font-size:.95rem;font-weight:500;cursor:pointer;white-space:nowrap}
    .mi .chev{transition:transform .35s var(--ease);opacity:.6}
    .item.open .chev{transform:rotate(180deg)}
    .dd{position:absolute;top:calc(100% + 14px);left:50%;min-width:230px;padding:8px;border-radius:18px;background:var(--bg);border:1px solid var(--line);box-shadow:0 24px 48px -20px rgba(0,0,0,.35);
      opacity:0;visibility:hidden;transform:translate(-50%,-8px) scale(.97);transform-origin:50% 0;transition:opacity .25s ease,transform .4s var(--ease),visibility 0s linear .4s}
    .dd::before{content:"";position:absolute;left:0;right:0;top:-16px;height:16px}
    .item.open .dd{opacity:1;visibility:visible;transform:translate(-50%,0) scale(1);transition-delay:0s}
    .dl{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:11px 14px;border-radius:12px;font-size:.92rem;font-weight:500;transition:background .2s ease,padding .3s var(--ease)}
    .dl::after{content:"\\2192";opacity:0;transform:translateX(-6px);transition:opacity .2s ease,transform .3s var(--ease);color:var(--accent)}
    .dl:hover,.dl:focus-visible{background:var(--hover);padding-left:18px}
    .dl:hover::after,.dl:focus-visible::after{opacity:1;transform:none}
    .dl[aria-current="page"]{color:var(--accent)}
    .end{justify-self:end;display:flex;align-items:center;gap:12px}
    .cta{display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:999px;background:var(--accent);color:#fff;font-size:.9rem;font-weight:600;transition:transform .3s var(--ease),filter .2s ease}
    .cta:hover{filter:brightness(1.08);transform:translateY(-1px)}
    .burger{position:relative;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;transition:background .25s ease}
    .burger:hover{background:var(--cap)}
    .burger span{position:absolute;left:12px;right:12px;height:2px;border-radius:2px;background:var(--ink);transition:transform .45s var(--ease),opacity .2s ease}
    .burger span:nth-child(1){top:15px}.burger span:nth-child(2){top:21px}.burger span:nth-child(3){top:27px}
    .sheet-open .burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}
    .sheet-open .burger span:nth-child(2){opacity:0;transform:scaleX(.3)}
    .sheet-open .burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
    .scrim{position:fixed;left:0;right:0;bottom:0;top:var(--h);background:rgba(10,10,14,.38);opacity:0;visibility:hidden;transition:opacity .45s ease,visibility 0s linear .45s}
    .sheet-open .scrim{opacity:1;visibility:visible;transition-delay:0s}
    .sheet{position:absolute;left:0;right:0;top:100%;display:grid;grid-template-rows:0fr;visibility:hidden;background:var(--bg);box-shadow:0 30px 50px -30px rgba(0,0,0,.4);transition:grid-template-rows .55s var(--ease),visibility 0s linear .55s}
    .sheet-open .sheet{grid-template-rows:1fr;visibility:visible;transition-delay:0s}
    .sheet-in{min-height:0;overflow:hidden}
    .groups{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:28px 32px;width:min(var(--jx-max,1500px),calc(100% - 40px));max-height:calc(100dvh - var(--h) - 12px);margin:0 auto;padding:14px 0 36px;overflow:auto}
    .gt{margin:0 0 8px;color:var(--muted);font-size:.8rem;font-weight:500}
    .sl{display:block;padding:7px 0;font-size:1.15rem;font-weight:500;opacity:0;transform:translateY(12px);transition:opacity .25s ease,transform .3s ease,color .2s ease}
    .sheet-open .sl{opacity:1;transform:none;transition:opacity .5s ease var(--d,0ms),transform .6s var(--ease) var(--d,0ms),color .2s ease}
    .sl:hover{color:var(--accent)}.sl[aria-current="page"]{color:var(--accent)}
    .sheet .cta{margin-top:10px}
    @media (max-width:${MOBILE_BP}px){.root{--h:64px}.in{display:flex;justify-content:space-between}.menu,.end>.cta{display:none}.brand img{height:30px}.groups{grid-template-columns:1fr}}
    @media (prefers-reduced-motion:reduce){*{transition-duration:.01ms !important;transition-delay:0s !important}}
  `;
  const FOOTER_CSS = `
    :host{display:block;font:16px/1.5 var(--jx-font,"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif)}
    .root{--accent:var(--jx-accent-dark,#ff3d55);background:#111116;color:#fff;padding:56px 24px calc(28px + env(safe-area-inset-bottom,0px))}
    .in{display:grid;grid-template-columns:minmax(160px,1.2fr) repeat(var(--cols,0),minmax(0,1fr));gap:40px 32px;width:min(var(--jx-footer-max,1260px),100%);margin:0 auto}
    .brand{align-self:center;display:inline-flex;width:max-content;max-width:100%}
    .brand img{display:block;width:min(200px,100%);height:auto}
    .brand img.invert{filter:brightness(0) invert(1)}
    .col{display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-width:0}
    .col h2{margin:0 0 4px;font-size:1.05rem;font-weight:600}
    .col a{font-size:.92rem;color:#dcdce0;transition:color .2s ease,transform .3s cubic-bezier(.22,.8,.24,1)}
    .col a:hover{color:#fff;transform:translateX(4px)}
    .bottom{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:26px;border-top:1px solid #3a3a42}
    .copy{font-size:.92rem}.copy small{display:block;margin-top:2px;color:#9a9aa3;font-size:.75rem}
    .right{display:flex;align-items:center;gap:22px}
    .social{display:flex;gap:16px}
    .social a{display:block;opacity:.9;transition:opacity .2s ease,transform .3s cubic-bezier(.22,.8,.24,1)}
    .social a:hover{opacity:1;transform:translateY(-3px)}
    .social img{display:block;width:34px;height:34px;filter:brightness(0) invert(1)}
    .country{display:flex;align-items:center;gap:12px;width:250px;height:48px;padding:0 14px;border:1px solid #4a4a52;border-radius:6px;transition:border-color .2s ease}
    .country:hover{border-color:#8a8a92}
    .code{font-size:.75rem;font-weight:700}
    .country select{flex:1;min-width:0;height:100%;border:0;outline:0;background:#111116 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='white' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 2px center;color:#fff;font:inherit;font-size:.88rem;font-weight:500;cursor:pointer;appearance:none;-webkit-appearance:none}
    .country select option{background:#111116;color:#fff}
    @media (max-width:1000px){.in{grid-template-columns:repeat(2,minmax(0,1fr))}.brand{grid-column:1/-1}}
    @media (max-width:760px){.root{padding:40px 20px calc(24px + env(safe-area-inset-bottom,0px))}.bottom,.right{flex-direction:column;align-items:flex-start}.country{width:100%;max-width:320px}}
    @media (prefers-reduced-motion:reduce){*{transition-duration:.01ms !important}}
  `;

  // ---------- Elemen dasar ----------
  class JoomaxPart extends HTMLElement {
    connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: "open" }); instances.add(this); this.refresh(); }
    disconnectedCallback() { instances.delete(this); this._teardown(); }
    refresh() { this._teardown(); this.render(); }
    _teardown() { if (this._cleanup) { this._cleanup(); this._cleanup = null; } }
    mount(css, root) {
      // link sementara ("#") tidak melompat ke atas halaman
      root.addEventListener("click", (e) => { const a = e.target.closest && e.target.closest("a[data-ph]"); if (a) e.preventDefault(); });
      this.shadowRoot.replaceChildren(h("style", null, BASE_CSS + css), root);
    }
  }

  class JoomaxHeader extends JoomaxPart {
    static get observedAttributes() { return ["theme"]; }
    attributeChangedCallback() { this._applyMode && this._applyMode(); }

    render() {
      const c = cfg(), b = c.brand, items = c.nav || [];
      if (c.loadFont) ensureFont();
      const root = h("header", { class: "root" });
      const menu = h("nav", { class: "menu", "aria-label": "Navigasi utama" });
      const ind = h("span", { class: "ind", "aria-hidden": "true" });
      menu.append(ind);

      const entries = []; // {mi, wrap, dd?}
      let openIdx = -1, closeT = 0, activeEntry = null;
      items.forEach((it, i) => {
        const wrap = h("div", { class: "item" });
        let mi, dd = null;
        if (it.children && it.children.length) {
          mi = h("button", { class: "mi", type: "button", "aria-expanded": "false", "aria-haspopup": "true", "aria-controls": "dd" + i }, it.label, svg(CHEV));
          dd = h("div", { class: "dd", id: "dd" + i }, it.children.map((ch) => link(ch, "dl")));
          wrap.append(mi, dd);
        } else { mi = link(it, "mi"); wrap.append(mi); }
        if (isCurrent(it)) activeEntry = { mi };
        entries.push({ mi, wrap, dd, i });
        menu.append(wrap);
      });

      const place = (el) => {
        if (!el) { ind.style.opacity = "0"; return; }
        const mr = menu.getBoundingClientRect(), r = el.getBoundingClientRect();
        if (!r.width) return;
        ind.style.width = r.width + "px"; ind.style.transform = `translateX(${r.left - mr.left}px)`; ind.style.opacity = "1";
      };
      const rest = () => place(openIdx >= 0 ? entries[openIdx].mi : activeEntry && activeEntry.mi);
      const setDD = (i) => {
        openIdx = i;
        entries.forEach((e) => { const on = e.i === i && !!e.dd; e.wrap.classList.toggle("open", on); if (e.dd) e.mi.setAttribute("aria-expanded", String(on)); });
        rest();
      };

      let lastType = "";
      entries.forEach((e) => {
        e.mi.addEventListener("pointerenter", (ev) => { if (ev.pointerType !== "mouse") return; clearTimeout(closeT); setDD(e.dd ? e.i : -1); place(e.mi); });
        e.wrap.addEventListener("pointerleave", (ev) => { if (ev.pointerType !== "mouse") return; clearTimeout(closeT); closeT = setTimeout(() => setDD(-1), 140); });
        e.wrap.addEventListener("pointerenter", (ev) => { if (ev.pointerType === "mouse") clearTimeout(closeT); });
        if (!e.dd) return;
        e.mi.addEventListener("pointerdown", (ev) => { lastType = ev.pointerType; });
        e.mi.addEventListener("click", (ev) => { if (lastType === "mouse" && ev.detail > 0) setDD(e.i); else setDD(openIdx === e.i ? -1 : e.i); lastType = ""; });
        e.mi.addEventListener("keydown", (ev) => { if (ev.key === "ArrowDown") { ev.preventDefault(); setDD(e.i); e.dd.querySelector("a").focus(); } });
        e.dd.addEventListener("keydown", (ev) => {
          const links = [...e.dd.querySelectorAll("a")], k = links.indexOf(this.shadowRoot.activeElement);
          if (ev.key === "ArrowDown") { ev.preventDefault(); links[(k + 1) % links.length].focus(); }
          else if (ev.key === "ArrowUp") { ev.preventDefault(); links[(k - 1 + links.length) % links.length].focus(); }
        });
        e.wrap.addEventListener("focusout", (ev) => { if (!ev.relatedTarget || !e.wrap.contains(ev.relatedTarget)) { if (openIdx === e.i) setDD(-1); } });
      });
      menu.addEventListener("pointerleave", (ev) => { if (ev.pointerType === "mouse") rest(); });

      // ---- Panel menu penuh (hamburger) ----
      const burger = h("button", { class: "burger", type: "button", "aria-expanded": "false", "aria-controls": "sheet", "aria-label": "Buka menu" }, h("span"), h("span"), h("span"));
      const flat = items.filter((x) => !x.children), groups = [];
      if (flat.length) groups.push({ title: "Menu", links: flat });
      items.filter((x) => x.children).forEach((x) => groups.push({ title: x.label, links: x.children }));
      let n = 0;
      const sheet = h("div", { class: "sheet", id: "sheet" }, h("div", { class: "sheet-in" }, h("div", { class: "groups" },
        groups.map((g) => h("div", { class: "g" }, h("p", { class: "gt" }, g.title), g.links.map((l) => { const a = link(l, "sl"); a.style.setProperty("--d", 70 + (n++) * 45 + "ms"); return a; }))),
        c.cta ? h("div", { class: "g" }, link(c.cta, "cta")) : null)));
      const scrim = h("div", { class: "scrim" });
      const setSheet = (open) => {
        root.classList.toggle("sheet-open", open);
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
        if (open) setDD(-1);
      };
      burger.addEventListener("click", () => setSheet(!root.classList.contains("sheet-open")));
      scrim.addEventListener("click", () => setSheet(false));
      sheet.addEventListener("click", (e) => { if (e.target.closest("a")) setSheet(false); });

      root.append(
        h("div", { class: "in" },
          h("a", { class: "brand", href: b.href, "aria-label": b.name + ", beranda" }, h("img", { src: b.mark, alt: "" })),
          menu,
          h("div", { class: "end" }, c.cta ? link(c.cta, "cta") : null, burger)),
        scrim, sheet);

      // ---- Global listeners ----
      const onKey = (e) => { if (e.key !== "Escape") return; const o = openIdx >= 0 ? entries[openIdx] : null; setDD(-1); setSheet(false); if (o) o.mi.focus(); };
      const onDown = (e) => { if (!e.composedPath().includes(this)) { setDD(-1); setSheet(false); } };
      const onScroll = () => root.toggleAttribute("data-scrolled", scrollY > 4);
      const onResize = () => rest();
      document.addEventListener("keydown", onKey); document.addEventListener("pointerdown", onDown);
      addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onResize);
      const ro = "ResizeObserver" in window ? new ResizeObserver(rest) : null; ro && ro.observe(menu);
      this._cleanup = () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); ro && ro.disconnect(); };
      onScroll();

      this._applyMode = () => { root.dataset.mode = modeOf(this); };
      this.mount(HEADER_CSS, root);
      this._applyMode();
      // posisi awal indikator tanpa animasi, lalu aktifkan transisi
      requestAnimationFrame(() => { rest(); requestAnimationFrame(() => menu.classList.add("ready")); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(rest);
    }
  }

  class JoomaxFooter extends JoomaxPart {
    render() {
      const c = cfg(), f = c.footer, b = c.brand, cols = f.columns || [];
      if (c.loadFont) ensureFont();
      const root = h("footer", { class: "root" });
      root.style.setProperty("--cols", cols.length);

      const list = f.countries || [];
      let country = null;
      if (list.length) {
        const sel = Math.max(list.findIndex((x) => x.selected), 0);
        const code = h("span", { class: "code", "aria-hidden": "true" }, list[sel].code || list[sel].flag || "");
        const select = h("select", { "aria-label": "Pilih negara" }, list.map((x, i) => h("option", { value: i, selected: i === sel }, x.name)));
        select.addEventListener("change", () => {
          const p = list[Number(select.value)]; code.textContent = p.code || p.flag || "";
          this.dispatchEvent(new CustomEvent("joomax:country", { bubbles: true, composed: true, detail: p }));
        });
        country = h("label", { class: "country" }, code, select);
      }
      const social = (f.social || []).length ? h("div", { class: "social" }, f.social.map((s) => {
        const a = h("a", { href: s.href || "#", "aria-label": s.label, "data-ph": !s.href || s.href === "#" ? "" : null, target: s.href && s.href !== "#" ? "_blank" : null, rel: "noopener noreferrer" },
          h("img", { src: /^(https?:)?\/\//.test(s.icon || "") ? s.icon : BASE + "assets/icon/" + s.icon, alt: "" }));
        return a;
      })) : null;

      root.append(h("div", { class: "in" },
        h("a", { class: "brand", href: b.href, "aria-label": b.name + ", ke beranda" }, h("img", { src: b.logoOnDark || b.logo, alt: b.name, class: b.logoOnDark ? "" : "invert" })),
        cols.map((col) => h("nav", { class: "col", "aria-label": col.title }, h("h2", null, col.title), (col.links || []).map((l) => link(l)))),
        h("div", { class: "bottom" },
          h("div", { class: "copy" }, String(f.copyright || "").replace("{year}", new Date().getFullYear()), f.credit ? h("small", null, f.credit) : null),
          h("div", { class: "right" }, social, country))));
      this.mount(FOOTER_CSS, root);
    }
  }

  customElements.define("joomax-header", JoomaxHeader);
  customElements.define("joomax-footer", JoomaxFooter);
  window.JoomaxLayout = { version: "2.0.0", refresh: () => instances.forEach((el) => el.refresh()) };
})();
