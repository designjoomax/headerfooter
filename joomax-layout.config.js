// ===========================================================================
// PENGATURAN HEADER & FOOTER JOOMAX: dipakai SEMUA website Joomax.
// Edit di sini lalu commit, semua website yang memuat file ini ikut berubah.
// Muat file ini SEBELUM joomax-layout.js.
//
// Semua link harus ABSOLUT (https://...) karena file ini dipakai dari website lain.
// href: "#"  = link sementara (diklik tidak ke mana-mana).
// Website yang butuh isi sendiri: definisikan window.JOOMAX_LAYOUT sebelum script ini.
// ===========================================================================
(() => {
  const SITE = "https://designjoomax.github.io";

  // ---- Daftar link: tulis SEKALI di sini, dipakai di header dan footer ------
  const LINK = {
    home:     SITE + "/home/",
    kerja:    "https://docs.google.com/spreadsheets/d/1OEg0_ey3srgomeU1Q1JEdI0h3PW93zb-mxHVxdZiuuY/edit?pli=1&gid=982571310#gid=982571310",
    piket:    "https://docs.google.com/spreadsheets/d/1mXOwBjsoVrU3rJr9XWO6LnKoIOMe2PHVvUV5hc0y5Po/edit?gid=472399028#gid=472399028",
    izin:     "https://forms.gle/SETnE5LfT6avQ5Q39",
    frame:    SITE + "/imagetoframe/",
    generate: SITE + "/generator/",
    tools:    SITE + "/tools/",
    gallery:  SITE + "/gallery/",
    // link sementara (ganti kalau halamannya sudah ada)
    others: "#", about: "#", team: "#", contact: "#", resource: "#", privacy: "#", terms: "#", help: "#"
  };

  window.JOOMAX_LAYOUT = window.JOOMAX_LAYOUT || {

    brand: {
      name: "Joomax Teknologi Indonesia",
      href: LINK.home                    // tujuan saat logo diklik
      // mark: "https://.../ikon.png",   // ikon header (default: assets/icon-red.png)
      // logo: "https://.../logo.png",   // logo footer (default: assets/logo.png)
    },

    // ---- Menu header --------------------------------------------------------
    // id        : dipakai atribut current="..." di <joomax-header> untuk menandai halaman aktif
    // children  : isi dropdown. Tiap item: { label, desc (opsional), href }
    nav: [
      { id: "home", label: "Home", href: LINK.home },
      { id: "workspace", label: "Workspace", children: [
        { label: "Jadwal Kerja",   desc: "Lihat jadwal kerja tim",     href: LINK.kerja },
        { label: "Jadwal Piket",   desc: "Cek giliran piket harian",   href: LINK.piket },
        { label: "Pengajuan Izin", desc: "Ajukan izin dan sakit",      href: LINK.izin }
      ]},
      { id: "creative", label: "Creative", children: [
        { label: "Image to Frame", desc: "Pasang frame Joomax ke foto", href: "https://designjoomax.github.io/imagetoframe/" },
        { label: "Generate",       desc: "Buat gambar produk marketplace", href: "https://designjoomax.github.io/generate/" },
        { label: "Tools",          desc: "Alat bantu kreatif",          href: "https://designjoomax.github.io/tools/" }
      ]},
      { id: "gallery", label: "Gallery", children: [
        { label: "Dokumentasi", desc: "Foto kegiatan dan momen kantor", href: LINK.gallery },
        { label: "Others",      desc: "Segera hadir",                   href: LINK.others }
      ]}
    ],

    // Tombol merah di kanan header. Contoh: { label: "Hubungi Kami", href: LINK.contact }
    cta: null,

    // ---- Footer -------------------------------------------------------------
    footer: {
      columns: [
        { title: "Company", links: [
          { label: "About Us", href: LINK.about },
          { label: "Our Team", href: LINK.team },
          { label: "Gallery",  href: "https://designjoomax.github.io/gallery/" },
          { label: "Contact",  href: LINK.contact }
        ]},
        { title: "Workspace", links: [
          { label: "Jadwal Kerja",    href: "https://docs.google.com/spreadsheets/d/1OEg0_ey3srgomeU1Q1JEdI0h3PW93zb-mxHVxdZiuuY/edit?pli=1&gid=982571310#gid=982571310"},
          { label: "Jadwal Piket",    href: "https://docs.google.com/spreadsheets/d/1mXOwBjsoVrU3rJr9XWO6LnKoIOMe2PHVvUV5hc0y5Po/edit?gid=472399028#gid=472399028" },
          { label: "Pengajuan Izin",  href: "https://forms.gle/SETnE5LfT6avQ5Q39" },
          { label: "Resource Center", href: LINK.resource }
        ]},
        { title: "Creative", links: [
          { label: "Image to Frame", href: "https://designjoomax.github.io/imagetoframe/" },
          { label: "Generate",       href: "https://designjoomax.github.io/generate/" },
          { label: "Tools",          href: "https://designjoomax.github.io/tools/" }
        ]},
        { title: "Information", links: [
          { label: "Privacy Policy", href: LINK.privacy },
          { label: "Terms of Use",   href: LINK.terms },
          { label: "Help Center",    href: LINK.help }
        ]}
      ],

      copyright: "© {year} Joomax Teknologi Indonesia. All Rights Reserved.",   // {year} otomatis
      credit: "Create : fixs.arts studio",
      creditHref: "",                       // isi kalau credit mau jadi link

      // Ikon di kanan bawah. icon: mail | globe | instagram | youtube | whatsapp | linkedin
      // Ganti "#" dengan link asli (email: "mailto:nama@domain.com")
      social: [
        { label: "Email",     icon: "mail",      href: "mailto:cs@joomax.id" },
        { label: "Website",   icon: "globe",     href: "https://joomax.id" },
        { label: "Instagram", icon: "instagram", href: "#" active:false}
      ],

      // Pemilih negara. Hapus isinya ([]) kalau tidak dipakai.
      // Saat dipilih, terkirim event "joomax:country" (e.detail = item yang dipilih).
      countries: [
        { code: "ID", name: "Indonesia", selected: true },
        { code: "US", name: "United States" },
        { code: "SG", name: "Singapore" }
      ]
    }
  };
})();
