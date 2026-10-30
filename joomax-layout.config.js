// ===========================================================================
// PENGATURAN HEADER & FOOTER JOOMAX
// Satu-satunya file yang diedit untuk mengubah menu & footer SEMUA website Joomax.
// Muat file ini SEBELUM joomax-layout.js. Link "#" = link sementara (belum ke mana-mana).
// Ganti "#" dengan link asli kalau halamannya sudah jadi.
// ===========================================================================
window.JOOMAX_LAYOUT = window.JOOMAX_LAYOUT || (() => {
  const T = "#"; // link sementara
  const WELCOME = "https://github.com/designjoomax/welcomescreen";
  return {
    brand: { name: "Joomax Teknologi Indonesia", href: WELCOME },

    // Menu: item tanpa "children" = link biasa, dengan "children" = dropdown.
    nav: [
      { label: "Home", href: WELCOME },
      { label: "Workspace", children: [
        { label: "Jadwal Kerja", href: T },
        { label: "Jadwal Piket", href: T },
        { label: "Pengajuan Izin", href: T }
      ]},
      { label: "Creative", children: [
        { label: "Image to Frame", href: "https://github.com/designjoomax/imagetoframe" },
        { label: "Generate", href: "https://github.com/designjoomax/generate" },
        { label: "Tools", href: "https://github.com/designjoomax/tools" }
      ]},
      { label: "Gallery", children: [
        { label: "Dokumentasi", href: T },
        { label: "Others", href: T }
      ]}
    ],
    cta: null, // contoh: { label: "Hubungi Kami", href: "https://..." }

    footer: {
      columns: [
        { title: "Company", links: [
          { label: "About Us", href: T }, { label: "Our Team", href: T },
          { label: "Gallery", href: T }, { label: "Contact", href: T } ]},
        { title: "Workspace", links: [
          { label: "Jadwal Kerja", href: T }, { label: "Jadwal Piket", href: T },
          { label: "Pengajuan Izin", href: T }, { label: "Resource Center", href: T } ]},
        { title: "Creative", links: [
          { label: "Image to Frame", href: "https://github.com/designjoomax/imagetoframe" },
          { label: "Generate", href: "https://github.com/designjoomax/generate" },
          { label: "Tools", href: "https://github.com/designjoomax/tools" } ]},
        { title: "Information", links: [
          { label: "Privacy Policy", href: T }, { label: "Terms of Use", href: T },
          { label: "Help Center", href: T } ]}
      ],
      // icon: nama file di assets/icon/ (otomatis jadi putih)
      social: [
        { label: "Email", icon: "Mail.png", href: T },
        { label: "Website", icon: "Website.png", href: T },
        { label: "Instagram", icon: "Instagram.png", href: T }
      ],
      copyright: "© {year} Joomax Teknologi Indonesia. All Rights Reserved.", // {year} = tahun berjalan
      credit: "Create : fixs.arts studio",
      countries: [ { code: "ID", name: "Indonesia", selected: true }, { code: "US", name: "United States" }, { code: "SG", name: "Singapore" } ]
    }
  };
})();
