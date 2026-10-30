# Header & Footer Joomax

Komponen header + footer portable (Web Component + Shadow DOM) untuk semua website Joomax.
Live: https://designjoomax.github.io/headerfooter/

## Pakai di website lain
```html
<joomax-header sticky></joomax-header>
...isi halaman...
<joomax-footer></joomax-footer>

<script src="https://designjoomax.github.io/headerfooter/joomax-layout.config.js"></script>
<script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
```

## File
| File | Fungsi |
|---|---|
| `joomax-layout.config.js` | Isi menu, dropdown, footer, link, sosmed, negara. Edit di sini |
| `joomax-layout.js` | Komponen (tidak perlu diedit) |
| `assets/logo/` | `icon-red.png` (header), `logo.png` (footer), `icon-white.png` |
| `assets/icon/` | Icon Mail, Website, Instagram (otomatis putih di footer) |
| `index.html` | Halaman demo + dokumentasi |

## Menu
- Item biasa: `{ label, href }`. Dropdown: `{ label, children: [{ label, href }] }`.
- `href: "#"` = link sementara (klik tidak melakukan apa-apa).
- Halaman yang sedang dibuka otomatis ditandai (cocok dari nama repo di alamat).
- Tombol hamburger membuka panel berisi semua menu.
- `cta`: `{ label, href }` atau `null`.

## Isi berbeda untuk satu website
Definisikan `window.JOOMAX_LAYOUT` sebelum memuat `joomax-layout.js` (tanpa `joomax-layout.config.js`).

## Event pemilih negara
`document.addEventListener("joomax:country", e => console.log(e.detail.name))`

## Deploy (GitHub Pages)
Upload isi folder ini ke root repo `headerfooter`, lalu Settings > Pages > Deploy from branch > `main` / `(root)`.
