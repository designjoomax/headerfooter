// ===========================================================================
// PENGATURAN HEADER & FOOTER JOOMAX: VERSI BETA (website yang belum boleh ketahuan)
//
// File ini BERDIRI SENDIRI dan sengaja TIDAK berisi link ke halaman internal Joomax
// (jadwal, form izin, tools, dll). Jadi walau orang membuka view-source atau tab Network,
// link aslinya tidak ada di sini. Pakai file ini sebagai ganti joomax-layout.config.js:
//
//   <joomax-header sticky></joomax-header>
//   ...isi halaman...
//   <joomax-footer></joomax-footer>
//   <script src="https://designjoomax.github.io/headerfooter/joomax-layout.beta.config.js"></script>
//   <script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
//
// Hasilnya: header hanya logo, footer hanya logo + Information + sosial + bahasa.
// ===========================================================================
(() => {
  window.JOOMAX_LAYOUT = window.JOOMAX_LAYOUT || {

    brand: { name: "Joomax Teknologi Indonesia" },

    // ---- Pengaturan beta: ubah true/false sesuai kebutuhan ----------------------
    beta: {
      enabled: true,           // false = beta dimatikan (tapi config ini tetap tidak punya menu lengkap)
      nav: false,              // true = menu header + hamburger tampil (teks saja, tidak bisa diklik)
      columns: ["Information"],// kolom footer yang tampil. "all" = semua, false = tidak ada
      links: false,            // false = semua link menjadi teks biasa
      brandLink: false,        // true = logo bisa diklik
      social: true,            // tampilkan ikon sosial
      socialLinks: true,       // false = ikon sosial tampil tapi tidak bisa diklik
      language: true           // tampilkan pemilih bahasa
    },

    nav: [],
    cta: null,

    // Isi halaman ikut berganti bahasa lewat kamus (tidak ada terjemahan otomatis dari internet: tidak ada teks yang keluar dari website).
    page: { enabled: true, source: "id", rtl: true },

    i18n: {
      default: "id",
      dict: {
        "id": {
          "Information": "Informasi",
          "Privacy Policy": "Kebijakan Privasi",
          "Terms of Use": "Syarat Penggunaan",
          "Help Center": "Pusat Bantuan",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia. Hak cipta dilindungi.",
          "Create : fixs.arts studio": "Dibuat oleh fixs.arts studio",
          "Email": "Email",
          "Website": "Situs Web",
          "Instagram": "Instagram",
          "Navigasi utama": "Navigasi utama",
          "Buka menu": "Buka menu",
          "Tutup menu": "Tutup menu",
          "Menu utama": "Menu utama",
          "Menu": "Menu",
          "Pilih bahasa": "Pilih bahasa"
        },
        "en": {
          "Information": "Information",
          "Privacy Policy": "Privacy Policy",
          "Terms of Use": "Terms of Use",
          "Help Center": "Help Center",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia. All Rights Reserved.",
          "Create : fixs.arts studio": "Created by fixs.arts studio",
          "Email": "Email",
          "Website": "Website",
          "Instagram": "Instagram",
          "Navigasi utama": "Main navigation",
          "Buka menu": "Open menu",
          "Tutup menu": "Close menu",
          "Menu utama": "Main menu",
          "Menu": "Menu",
          "Pilih bahasa": "Select language"
        },
        "zh": {
          "Information": "信息",
          "Privacy Policy": "隐私政策",
          "Terms of Use": "使用条款",
          "Help Center": "帮助中心",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia 版权所有。",
          "Create : fixs.arts studio": "设计：fixs.arts studio",
          "Email": "电子邮件",
          "Website": "网站",
          "Instagram": "Instagram",
          "Navigasi utama": "主导航",
          "Buka menu": "打开菜单",
          "Tutup menu": "关闭菜单",
          "Menu utama": "主菜单",
          "Menu": "菜单",
          "Pilih bahasa": "选择语言"
        },
        "ru": {
          "Information": "Информация",
          "Privacy Policy": "Политика конфиденциальности",
          "Terms of Use": "Условия использования",
          "Help Center": "Центр поддержки",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia. Все права защищены.",
          "Create : fixs.arts studio": "Создано: fixs.arts studio",
          "Email": "Эл. почта",
          "Website": "Сайт",
          "Instagram": "Instagram",
          "Navigasi utama": "Главная навигация",
          "Buka menu": "Открыть меню",
          "Tutup menu": "Закрыть меню",
          "Menu utama": "Главное меню",
          "Menu": "Меню",
          "Pilih bahasa": "Выберите язык"
        },
        "ar": {
          "Information": "معلومات",
          "Privacy Policy": "سياسة الخصوصية",
          "Terms of Use": "شروط الاستخدام",
          "Help Center": "مركز المساعدة",
          "© {year} Joomax Teknologi Indonesia. All Rights Reserved.": "© {year} Joomax Teknologi Indonesia. جميع الحقوق محفوظة.",
          "Create : fixs.arts studio": "تصميم: fixs.arts studio",
          "Email": "البريد الإلكتروني",
          "Website": "الموقع",
          "Instagram": "Instagram",
          "Navigasi utama": "التنقل الرئيسي",
          "Buka menu": "فتح القائمة",
          "Tutup menu": "إغلاق القائمة",
          "Menu utama": "القائمة الرئيسية",
          "Menu": "القائمة",
          "Pilih bahasa": "اختر اللغة"
        }
      }
    },

    footer: {
      columns: [
        { title: "Information", links: [
          { label: "Privacy Policy" },
          { label: "Terms of Use" },
          { label: "Help Center" }
        ]}
      ],

      copyright: "© {year} Joomax Teknologi Indonesia. All Rights Reserved.",
      credit: "Create : fixs.arts studio",

      // Ikon sosial. Isi link asli di sini kalau ikonnya mau bisa diklik.
      social: [
        { label: "Email",     icon: "mail",      href: "mailto:cs@joomax.id" },
        { label: "Website",   icon: "globe",     href: "https://Joomax.id" },
        { label: "Instagram", icon: "instagram", href: "#" }
      ],

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
