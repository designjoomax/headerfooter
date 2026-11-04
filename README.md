# Header & Footer Joomax

Komponen header + footer portable (Web Component + Shadow DOM) untuk semua website Joomax.
Live: https://designjoomax.github.io/headerfooter/

## Fitur
- Header: ikon di kiri, menu pill di tengah (highlight meluncur mengikuti hover), dropdown satu panel yang pindah dan berubah ukuran dengan halus antar menu, hamburger di kanan membuka panel menu (accordion di HP).
- Header mengecil dan diberi bayangan saat halaman digulir, efek kaca buram.
- Footer: logo, 4 kolom link, ikon sosial, pemilih bahasa.
- Multi-bahasa: Indonesia, English, 中文, Русский, العربية (Arab otomatis kanan-ke-kiri). Header dan footer berganti bahasa sekaligus.
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
| `joomax-layout.config.js` | Menu, dropdown, kolom footer, sosial, bahasa + kamus terjemahan. Edit di sini |
| `joomax-layout.beta.config.js` | Config versi beta: tanpa link internal, header hanya logo (lihat bagian Mode beta) |
| `joomax-layout.js` | Komponen (tidak perlu diedit) |
| `assets/icon-red.png` | Ikon header |
| `assets/logo.png` | Logo footer (otomatis jadi putih) |
| `index.html` | Halaman demo + dokumentasi |
| `translate.html` | Demo terjemah isi halaman |
| `beta.html` | Halaman demo versi beta |

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
## Mode beta (website yang belum boleh ketahuan)
Header hanya logo. Footer hanya logo, Information, sosial, bahasa. Semua link jadi teks biasa (tanpa `href`, tidak ada di DOM).

**Cara paling aman**: pakai `joomax-layout.beta.config.js` sebagai ganti config biasa. File ini tidak berisi link internal sama sekali, jadi view-source dan tab Network tidak membocorkan apa pun.
```html
<script src="https://designjoomax.github.io/headerfooter/joomax-layout.beta.config.js"></script>
<script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
```
**Cara cepat**: tetap pakai config biasa, tambahkan satu baris sebelum script. Link tidak muncul di halaman, tapi masih ada di file config yang diunduh browser.
```html
<script>window.JOOMAX_BETA = true;</script>
```
Opsi (isi di blok `beta` pada config, atau `window.JOOMAX_BETA = { ... }`):
| Opsi | Default | Arti |
|---|---|---|
| `nav` | `false` | `true` = menu header + hamburger tampil (teks saja) |
| `columns` | `["Information"]` | Kolom footer yang tampil. `"all"` = semua, `false` = tidak ada |
| `links` | `false` | `false` = semua link mati |
| `brandLink` | `false` | logo bisa diklik |
| `social` | `true` | tampilkan ikon sosial |
| `socialLinks` | `true` | ikon sosial bisa diklik |
| `language` | `true` | tampilkan pemilih bahasa |
| `enabled` | `true` | `false` = matikan mode beta |

Demo: `beta.html`.

## Bahasa
Pemilih bahasa di footer: Indonesia, English, 中文, Русский, العربية. Memilihnya mengganti bahasa **header, footer, dan seluruh isi halaman**. Pilihan disimpan di `localStorage` (`joomax-lang`) dan berlaku di semua halaman satu domain. Arab otomatis kanan-ke-kiri (seluruh halaman, matikan lewat `page.rtl: false`).

### Kamus
Satu tabel `TEXT` di `joomax-layout.config.js`: tiap baris berisi 5 bahasa (id, en, zh, ru, ar) dan dipakai header, footer, dan isi halaman. Baris yang kurang bahasa memunculkan peringatan di console. Menambah menu baru? Tambahkan barisnya di tabel itu.

### Isi halaman (body)
Teks di halaman dicocokkan **persis** dengan kamus, lalu diganti. Ikut diterjemahkan: teks biasa, `placeholder`, `title`, `alt`, `aria-label`, judul tab, dan konten yang ditambah JavaScript/React belakangan. Teks asli disimpan, jadi kembali ke Indonesia mengembalikan halaman persis seperti semula.

Kamus khusus satu website (taruh setelah script `joomax-layout.js`):
```js
JoomaxLayout.addDict({
  en: { "Jadwal hari ini": "Today's schedule" },
  zh: { "Jadwal hari ini": "今日安排" }
});
```
Kalimat yang berisi `<b>`, `<a>`, `<code>` ditulis dengan `data-i18n`, isi kamusnya boleh HTML:
```html
<p data-i18n="tips">Klik <b>tombol</b> untuk mulai.</p>
```
Dilewati: `<code>`, `<pre>`, `<script>`, `<style>`, `<textarea>`, `<svg>`, elemen ber-`translate="no"`, `class="notranslate"`, `data-i18n-skip`, `contenteditable`.

Mencari teks yang belum punya terjemahan: buka console browser, ketik `JoomaxLayout.scan()`.

Opsi di blok `page` pada config: `enabled`, `source` (bahasa teks asli, default `"id"`), `rtl`, `root` (default `"body"`), `skip` (selector tambahan yang dilewati).

### JavaScript
```js
document.addEventListener("joomax:language", e => console.log(e.detail.code, e.detail.dir)); // "en" "ltr"
JoomaxLayout.setLanguage("zh");   // ganti bahasa lewat kode
JoomaxLayout.language;            // bahasa aktif
JoomaxLayout.t("Jadwal Kerja");   // terjemahkan satu teks lewat kamus
```
`<html>` mendapat atribut `lang` dan `data-jx-lang` sesuai bahasa aktif, bisa dipakai untuk CSS per bahasa.

## Deploy (GitHub Pages)
Upload isi folder ini ke root repo `headerfooter`, lalu Settings > Pages > Deploy from branch > `main` / `(root)`.
