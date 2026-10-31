# Header & Footer Joomax

Komponen header + footer portable (Web Component + Shadow DOM) untuk semua website Joomax.
Live: https://designjoomax.github.io/headerfooter/

## Fitur
- Header: ikon di kiri, menu pill di tengah (highlight meluncur mengikuti hover), dropdown satu panel yang pindah dan berubah ukuran dengan halus antar menu, hamburger di kanan membuka panel menu (accordion di HP).
- Header mengecil dan diberi bayangan saat halaman digulir, efek kaca buram.
- Footer: logo, 4 kolom link, ikon sosial, pemilih negara.
- Keyboard: Tab, Enter, panah bawah membuka dropdown, Esc menutup.
- CSS terisolasi (Shadow DOM), aman dipasang di website apa pun.

## Pakai di website lain
```html
<joomax-header sticky current="home"></joomax-header>
...isi halaman...
<joomax-footer></joomax-footer>

<script src="https://designjoomax.github.io/headerfooter/joomax-layout.config.js"></script>
<script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
```
`current` = `id` menu yang sedang aktif (`home`, `workspace`, `creative`, `gallery`).

## File
| File | Fungsi |
|---|---|
| `joomax-layout.config.js` | Menu, dropdown, kolom footer, sosial, negara. Edit di sini |
| `joomax-layout.js` | Komponen (tidak perlu diedit) |
| `assets/icon-red.png` | Ikon header |
| `assets/logo.png` | Logo footer (otomatis jadi putih) |
| `index.html` | Halaman demo + dokumentasi |

Nama dan lokasi `joomax-layout.js` dan `joomax-layout.config.js` jangan diubah: website lain memanggilnya lewat URL ini.

## Mengubah menu
Semua link ditulis sekali di blok `LINK`, lalu dipakai di header dan footer.
```js
{ id: "workspace", label: "Workspace", children: [
  { label: "Jadwal Kerja", desc: "Lihat jadwal kerja tim", href: LINK.kerja }
]}
```
`href: "#"` = link sementara. Link ke luar situs otomatis dibuka di tab baru.

## Isi berbeda untuk satu website
Definisikan `window.JOOMAX_LAYOUT` sebelum script. Kalau sudah ada, config pusat tidak menimpanya (muat `joomax-layout.js` saja).

## CSS website
`--jx-accent`, `--jx-accent-dark`, `--jx-font`, `--jx-max` (lebar header), `--jx-footer-max`.
Atribut `<joomax-header>`: `sticky`, `theme="light|dark"`, `current="id"`.
Event pemilih negara: `document.addEventListener("joomax:country", e => console.log(e.detail.name))`.

## Deploy (GitHub Pages)
Upload isi folder ini ke root repo `headerfooter`, lalu Settings > Pages > Deploy from branch > `main` / `(root)`.
