// ===========================================================================
// PENGATURAN HEADER & FOOTER JOOMAX: dipakai SEMUA website Joomax.
// Edit di sini lalu commit, semua website yang memuat file ini ikut berubah.
// Muat file ini SEBELUM joomax-layout.js.
//
// Semua link harus ABSOLUT (https://...) karena file ini dipakai dari website lain.
// href: "#"  = link sementara (diklik tidak ke mana-mana).
// Website yang butuh isi sendiri: definisikan window.JOOMAX_LAYOUT sebelum script ini.
// Website yang belum boleh ketahuan: pakai joomax-layout.beta.config.js (tanpa link internal),
// atau tulis <script>window.JOOMAX_BETA = true;</script> sebelum script ini (link tetap ada di file ini).
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

  // ---- Terjemahan: tulis SEKALI di sini, dipakai header, footer, dan isi halaman ----
  // Kunci = teks yang ditulis di menu/footer/halaman. Tiap baris WAJIB berisi 5 bahasa, urutannya:
  //            Indonesia | English | 中文 | Русский | العربية
  // Menambah menu baru? Tambahkan barisnya di sini. Baris yang kurang bahasa akan diberi peringatan di console.
  const LANGS = ["id", "en", "zh", "ru", "ar"];
  const TEXT = {
    // menu header
    "Home":     ["Beranda", "Home", "首页", "Главная", "الرئيسية"],
    "Workspace":["Ruang Kerja", "Workspace", "工作区", "Рабочее пространство", "مساحة العمل"],
    "Creative": ["Kreatif", "Creative", "创意", "Креатив", "الإبداع"],
    "Gallery":  ["Galeri", "Gallery", "图库", "Галерея", "المعرض"],
    "Jadwal Kerja":   ["Jadwal Kerja", "Work Schedule", "工作排班", "График работы", "جدول العمل"],
    "Lihat jadwal kerja tim": ["Lihat jadwal kerja tim", "View the team's work schedule", "查看团队工作排班", "Посмотреть график работы команды", "عرض جدول عمل الفريق"],
    "Jadwal Piket":   ["Jadwal Piket", "Duty Roster", "值日表", "График дежурств", "جدول المناوبات"],
    "Cek giliran piket harian": ["Cek giliran piket harian", "Check daily duty turns", "查看每日值日安排", "Проверьте дежурства на сегодня", "تحقق من مناوبات اليوم"],
    "Pengajuan Izin": ["Pengajuan Izin", "Leave Request", "请假申请", "Заявка на отгул", "طلب إجازة"],
    "Ajukan izin dan sakit": ["Ajukan izin dan sakit", "Request leave or sick days", "申请事假和病假", "Подайте заявку на отгул или больничный", "قدّم طلب إجازة أو إجازة مرضية"],
    "Image to Frame": ["Gambar ke Bingkai", "Image to Frame", "图片加相框", "Изображение в рамку", "صورة إلى إطار"],
    "Pasang frame Joomax ke foto": ["Pasang frame Joomax ke foto", "Add the Joomax frame to your photo", "为照片添加 Joomax 相框", "Добавьте рамку Joomax к фото", "أضف إطار Joomax إلى صورتك"],
    "Generate": ["Generator", "Generate", "生成", "Генерация", "إنشاء"],
    "Buat gambar produk marketplace": ["Buat gambar produk marketplace", "Create marketplace product images", "制作电商平台商品图", "Создавайте изображения товаров для маркетплейсов", "أنشئ صور منتجات للأسواق الإلكترونية"],
    "Tools":    ["Alat", "Tools", "工具", "Инструменты", "الأدوات"],
    "Alat bantu kreatif": ["Alat bantu kreatif", "Creative helper tools", "创意辅助工具", "Творческие инструменты", "أدوات مساعدة إبداعية"],
    "Dokumentasi": ["Dokumentasi", "Documentation", "活动纪实", "Документация", "التوثيق"],
    "Foto kegiatan dan momen kantor": ["Foto kegiatan dan momen kantor", "Photos of activities and office moments", "活动照片与办公室瞬间", "Фото мероприятий и моментов в офисе", "صور الفعاليات ولحظات المكتب"],
    "Others":   ["Lainnya", "Others", "其他", "Другое", "أخرى"],
    "Segera hadir": ["Segera hadir", "Coming soon", "敬请期待", "Скоро", "قريباً"],
    // footer
    "Company":  ["Perusahaan", "Company", "公司", "Компания", "الشركة"],
    "About Us": ["Tentang Kami", "About Us", "关于我们", "О нас", "من نحن"],
    "Our Team": ["Tim Kami", "Our Team", "我们的团队", "Наша команда", "فريقنا"],
    "Contact":  ["Kontak", "Contact", "联系我们", "Контакты", "اتصل بنا"],
    "Resource Center": ["Pusat Sumber Daya", "Resource Center", "资源中心", "Центр ресурсов", "مركز الموارد"],
    "Information": ["Informasi", "Information", "信息", "Информация", "معلومات"],
    "Privacy Policy": ["Kebijakan Privasi", "Privacy Policy", "隐私政策", "Политика конфиденциальности", "سياسة الخصوصية"],
    "Terms of Use":   ["Syarat Penggunaan", "Terms of Use", "使用条款", "Условия использования", "شروط الاستخدام"],
    "Help Center":    ["Pusat Bantuan", "Help Center", "帮助中心", "Центр поддержки", "مركز المساعدة"],
    "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": ["© {year} Joomax Teknologi Indonesia. Hak cipta dilindungi.", "© {year} Joomax Teknologi Indonesia. All Rights Reserved.", "© {year} Joomax Teknologi Indonesia 版权所有。", "© {year} Joomax Teknologi Indonesia. Все права защищены.", "© {year} Joomax Teknologi Indonesia. جميع الحقوق محفوظة."],
    "Create : fixs.arts studio": ["Dibuat oleh fixs.arts studio", "Created by fixs.arts studio", "设计：fixs.arts studio", "Создано: fixs.arts studio", "تصميم: fixs.arts studio"],
    "Email":     ["Email", "Email", "电子邮件", "Эл. почта", "البريد الإلكتروني"],
    "Website":   ["Situs Web", "Website", "网站", "Сайт", "الموقع"],
    "Instagram": ["Instagram", "Instagram", "Instagram", "Instagram", "Instagram"],
    // label aksesibilitas (dibaca pembaca layar)
    "Navigasi utama": ["Navigasi utama", "Main navigation", "主导航", "Главная навигация", "التنقل الرئيسي"],
    "Buka menu":  ["Buka menu", "Open menu", "打开菜单", "Открыть меню", "فتح القائمة"],
    "Tutup menu": ["Tutup menu", "Close menu", "关闭菜单", "Закрыть меню", "إغلاق القائمة"],
    "Menu utama": ["Menu utama", "Main menu", "主菜单", "Главное меню", "القائمة الرئيسية"],
    "Menu":       ["Menu", "Menu", "菜单", "Меню", "القائمة"],
    "Pilih bahasa": ["Pilih bahasa", "Select language", "选择语言", "Выберите язык", "اختر اللغة"]
  };
  const DICT = {};
  LANGS.forEach((code) => { DICT[code] = {}; });
  Object.keys(TEXT).forEach((key) => {
    if (TEXT[key].length !== LANGS.length) console.warn("[joomax] terjemahan tidak lengkap (harus " + LANGS.length + " bahasa):", key);
    LANGS.forEach((code, i) => { if (TEXT[key][i] != null) DICT[code][key] = TEXT[key][i]; });
  });

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
        { label: "Image to Frame", desc: "Pasang frame Joomax ke foto", href: LINK.frame },
        { label: "Generate",       desc: "Buat gambar produk marketplace", href: LINK.generate },
        { label: "Tools",          desc: "Alat bantu kreatif",          href: LINK.tools }
      ]},
      { id: "gallery", label: "Gallery", children: [
        { label: "Dokumentasi", desc: "Foto kegiatan dan momen kantor", href: LINK.gallery },
        { label: "Others",      desc: "Segera hadir",                   href: LINK.others }
      ]}
    ],

    // Tombol merah di kanan header. Contoh: { label: "Hubungi Kami", href: LINK.contact }
    cta: null,

    // ---- Bahasa ---------------------------------------------------------------
    // Kamus di atas (TEXT) dipakai header, footer, dan isi halaman website.
    i18n: { default: "id", dict: DICT },

    // ---- Terjemah isi halaman (body) -------------------------------------------
    // Saat bahasa di footer diganti, teks di dalam website ikut berganti kalau ada di kamus.
    // Kamus khusus satu website: JoomaxLayout.addDict({ en: { "Teks Indonesia": "English text" } })
    // Cari teks yang belum punya terjemahan: buka console browser, ketik JoomaxLayout.scan()
    page: {
      enabled: true,   // false = isi halaman tidak ikut diterjemahkan
      source: "id",    // bahasa teks asli di halaman
      rtl: true        // Arab: seluruh halaman berarah kanan-ke-kiri
      // root: "body",            // bagian halaman yang diterjemahkan
      // skip: ".jangan-terjemah" // selector tambahan yang dilewati (atau pakai translate="no" / class="notranslate")
    },

    // ---- Footer -------------------------------------------------------------
    footer: {
      columns: [
        { title: "Company", links: [
          { label: "About Us", href: LINK.about },
          { label: "Our Team", href: LINK.team },
          { label: "Gallery",  href: LINK.gallery },
          { label: "Contact",  href: LINK.contact }
        ]},
        { title: "Workspace", links: [
          { label: "Jadwal Kerja",    href: LINK.kerja },
          { label: "Jadwal Piket",    href: LINK.piket },
          { label: "Pengajuan Izin",  href: LINK.izin },
          { label: "Resource Center", href: LINK.resource }
        ]},
        { title: "Creative", links: [
          { label: "Image to Frame", href: LINK.frame },
          { label: "Generate",       href: LINK.generate },
          { label: "Tools",          href: LINK.tools }
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
        { label: "Website",   icon: "globe",     href: "https://Joomax.id" },
        { label: "Instagram", icon: "instagram", href: "#" }
      ],

      // Pemilih bahasa (5 bahasa). code = kunci di i18n.dict di bawah. Hapus isinya ([]) kalau tidak dipakai.
      // Saat dipilih, header + footer langsung berganti bahasa dan event "joomax:language" terkirim.
      languages: [
        { code: "id", name: "Indonesia", selected: true },
        { code: "en", name: "English" },
        { code: "zh", name: "中文" },
        { code: "ru", name: "Русский" },
        { code: "ar", name: "العربية" }
      ]
    }
  };
})();
