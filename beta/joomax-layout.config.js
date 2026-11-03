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

    // ---- Terjemahan -----------------------------------------------------------
    // Kunci = teks aslinya (Indonesia/Inggris seperti yang tertulis di atas).
    // Teks yang tidak ada di kamus tampil apa adanya. Bahasa "id" tidak perlu kamus.
    // Tambah menu baru? Tambahkan juga terjemahannya di sini.
    i18n: {
      default: "id",
      dict: {
        en: {
          "Jadwal Kerja": "Work Schedule", "Lihat jadwal kerja tim": "View the team's work schedule",
          "Jadwal Piket": "Duty Roster", "Cek giliran piket harian": "Check daily duty turns",
          "Pengajuan Izin": "Leave Request", "Ajukan izin dan sakit": "Request leave or sick days",
          "Pasang frame Joomax ke foto": "Add the Joomax frame to your photo",
          "Buat gambar produk marketplace": "Create marketplace product images",
          "Alat bantu kreatif": "Creative helper tools",
          "Dokumentasi": "Documentation", "Foto kegiatan dan momen kantor": "Photos of activities and office moments",
          "Segera hadir": "Coming soon",
          "Create : fixs.arts studio": "Created by fixs.arts studio",
          "Website": "Website",
          "Navigasi utama": "Main navigation", "Buka menu": "Open menu", "Tutup menu": "Close menu",
          "Menu utama": "Main menu", "Menu": "Menu", "Pilih bahasa": "Select language"
        },
        zh: {
          "Home": "首页", "Workspace": "工作区", "Creative": "创意", "Gallery": "图库",
          "Jadwal Kerja": "工作排班", "Lihat jadwal kerja tim": "查看团队工作排班",
          "Jadwal Piket": "值日表", "Cek giliran piket harian": "查看每日值日安排",
          "Pengajuan Izin": "请假申请", "Ajukan izin dan sakit": "申请事假和病假",
          "Image to Frame": "图片加相框", "Pasang frame Joomax ke foto": "为照片添加 Joomax 相框",
          "Generate": "生成", "Buat gambar produk marketplace": "制作电商平台商品图",
          "Tools": "工具", "Alat bantu kreatif": "创意辅助工具",
          "Dokumentasi": "活动纪实", "Foto kegiatan dan momen kantor": "活动照片与办公室瞬间",
          "Others": "其他", "Segera hadir": "敬请期待",
          "Company": "公司", "About Us": "关于我们", "Our Team": "我们的团队", "Contact": "联系我们",
          "Resource Center": "资源中心", "Information": "信息",
          "Privacy Policy": "隐私政策", "Terms of Use": "使用条款", "Help Center": "帮助中心",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia 版权所有。",
          "Create : fixs.arts studio": "设计：fixs.arts studio",
          "Email": "电子邮件", "Website": "网站",
          "Navigasi utama": "主导航", "Buka menu": "打开菜单", "Tutup menu": "关闭菜单",
          "Menu utama": "主菜单", "Menu": "菜单", "Pilih bahasa": "选择语言"
        },
        ru: {
          "Home": "Главная", "Workspace": "Рабочее пространство", "Creative": "Креатив", "Gallery": "Галерея",
          "Jadwal Kerja": "График работы", "Lihat jadwal kerja tim": "Посмотреть график работы команды",
          "Jadwal Piket": "График дежурств", "Cek giliran piket harian": "Проверьте дежурства на сегодня",
          "Pengajuan Izin": "Заявка на отгул", "Ajukan izin dan sakit": "Подайте заявку на отгул или больничный",
          "Image to Frame": "Изображение в рамку", "Pasang frame Joomax ke foto": "Добавьте рамку Joomax к фото",
          "Generate": "Генерация", "Buat gambar produk marketplace": "Создавайте изображения товаров для маркетплейсов",
          "Tools": "Инструменты", "Alat bantu kreatif": "Творческие инструменты",
          "Dokumentasi": "Документация", "Foto kegiatan dan momen kantor": "Фото мероприятий и моментов в офисе",
          "Others": "Другое", "Segera hadir": "Скоро",
          "Company": "Компания", "About Us": "О нас", "Our Team": "Наша команда", "Contact": "Контакты",
          "Resource Center": "Центр ресурсов", "Information": "Информация",
          "Privacy Policy": "Политика конфиденциальности", "Terms of Use": "Условия использования", "Help Center": "Центр поддержки",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia. Все права защищены.",
          "Create : fixs.arts studio": "Создано: fixs.arts studio",
          "Email": "Эл. почта", "Website": "Сайт",
          "Navigasi utama": "Главная навигация", "Buka menu": "Открыть меню", "Tutup menu": "Закрыть меню",
          "Menu utama": "Главное меню", "Menu": "Меню", "Pilih bahasa": "Выберите язык"
        },
        ar: {
          "Home": "الرئيسية", "Workspace": "مساحة العمل", "Creative": "الإبداع", "Gallery": "المعرض",
          "Jadwal Kerja": "جدول العمل", "Lihat jadwal kerja tim": "عرض جدول عمل الفريق",
          "Jadwal Piket": "جدول المناوبات", "Cek giliran piket harian": "تحقق من مناوبات اليوم",
          "Pengajuan Izin": "طلب إجازة", "Ajukan izin dan sakit": "قدّم طلب إجازة أو إجازة مرضية",
          "Image to Frame": "صورة إلى إطار", "Pasang frame Joomax ke foto": "أضف إطار Joomax إلى صورتك",
          "Generate": "إنشاء", "Buat gambar produk marketplace": "أنشئ صور منتجات للأسواق الإلكترونية",
          "Tools": "الأدوات", "Alat bantu kreatif": "أدوات مساعدة إبداعية",
          "Dokumentasi": "التوثيق", "Foto kegiatan dan momen kantor": "صور الفعاليات ولحظات المكتب",
          "Others": "أخرى", "Segera hadir": "قريباً",
          "Company": "الشركة", "About Us": "من نحن", "Our Team": "فريقنا", "Contact": "اتصل بنا",
          "Resource Center": "مركز الموارد", "Information": "معلومات",
          "Privacy Policy": "سياسة الخصوصية", "Terms of Use": "شروط الاستخدام", "Help Center": "مركز المساعدة",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia. جميع الحقوق محفوظة.",
          "Create : fixs.arts studio": "تصميم: fixs.arts studio",
          "Email": "البريد الإلكتروني", "Website": "الموقع",
          "Navigasi utama": "التنقل الرئيسي", "Buka menu": "فتح القائمة", "Tutup menu": "إغلاق القائمة",
          "Menu utama": "القائمة الرئيسية", "Menu": "القائمة", "Pilih bahasa": "اختر اللغة"
        }
      }
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
