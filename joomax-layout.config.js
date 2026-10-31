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
      { label: "Home", href:"https://designjoomax.github.io/home/"},
      { label: "Workspace", children: [
        { label: "Jadwal Kerja", href: "https://docs.google.com/spreadsheets/d/1OEg0_ey3srgomeU1Q1JEdI0h3PW93zb-mxHVxdZiuuY/edit?pli=1&gid=982571310#gid=982571310" },
        { label: "Jadwal Piket", href: "https://docs.google.com/spreadsheets/d/1mXOwBjsoVrU3rJr9XWO6LnKoIOMe2PHVvUV5hc0y5Po/edit?gid=472399028#gid=472399028" },
        { label: "Pengajuan Izin", href: "https://forms.gle/SETnE5LfT6avQ5Q39" }
      ]},
      { label: "Creative", children: [
        { label: "Image to Frame", href: "https://designjoomax.github.io/imagetoframe/" },
        { label: "Generate", href: "https://designjoomax.github.io/genetare" },
        { label: "Tools", href: "https://designjoomax.github.io/tools" }
      ]},
      { label: "Gallery", children: [
        { label: "Dokumentasi", href: "https://designjoomax.github.io/dokumentasi" },
        { label: "Others", href: "https://designjoomax.github.io/others }
      ]}
    ],
    cta: null, // contoh: { label: "Hubungi Kami", href: "https://..." }

    footer: {
      columns: [
        { title: "Company", links: [
          { label: "About Us", href: "https://designjoomax.github.io/about us" }, { label: "Our Team", href: T },
          { label: "Gallery", href: "https://designjoomax.github.io/gallery" }, { label: "Contact", href: T } 
        ]},
        
        { title: "Workspace", links: [
          { label: "Jadwal Kerja", href: "https://docs.google.com/spreadsheets/d/1OEg0_ey3srgomeU1Q1JEdI0h3PW93zb-mxHVxdZiuuY/edit?pli=1&gid=982571310#gid=982571310" }, { label: "Jadwal Piket", href: T },
          { label: "Pengajuan Izin", href: "https://forms.gle/SETnE5LfT6avQ5Q39" }, { label: "Resource Center", href: T }
        ]},
        
        { title: "Creative", links: [
            { label: "Image to Frame", href: "https://designjoomax.github.io/imagetoframe/" },
            { label: "Generate", href: "https://designjoomax.github.io/genetare" },
            { label: "Tools", href: "https://designjoomax.github.io/tools" }
        ]},
        
        { title: "Information", links: [
          { label: "Privacy Policy", href: T }, { label: "Terms of Use", href: T },
          { label: "Help Center", href: "mailto:cs@joomax.id" }
        ]}
      ],
      // icon: nama file di assets/icon/ (otomatis jadi putih)
      social: [
        { label: "Email", icon: "Mail.png", href: "mailto:cs@joomax.id" },
        { label: "Website", icon: "Website.png", href: "joomax.id" },
        // { label: "Instagram", icon: "Instagram.png", href: T }
      ],
      copyright: "© {year} Joomax Teknologi Indonesia. All Rights Reserved.", // {year} = tahun berjalan
      credit: "Create : fixs.arts studio",
      countries: [ { code: "ID", name: "Indonesia", selected: true }, { code: "US", name: "United States" }, { code: "SG", name: "Singapore" } ]
    }
  };
})();
