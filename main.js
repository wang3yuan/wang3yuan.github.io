/**
 * 王三源 副教授 (Dr. San-Yuan Wang) 個人學術網站
 * main.js - 原生 JavaScript (無依賴、無框架)
 * 包含：雙語切換、深淺色切換、著作篩選、響應式導覽列與平滑捲動
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. 雙語切換機制 (Bilingual Switcher) ---
  const langToggleBtn = document.getElementById('lang-toggle');
  const currentLangText = document.getElementById('current-lang-text');
  const htmlRoot = document.documentElement;

  // <head> 內的小程式已先套用儲存的偏好，這裡同步按鈕文字與分頁標題
  setLanguage(htmlRoot.getAttribute('data-lang') || 'zh');

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-lang') || 'zh';
      const nextLang = current === 'zh' ? 'en' : 'zh';
      setLanguage(nextLang);
      savePref('wang_academic_lang', nextLang);
    });
  }

  function setLanguage(lang) {
    htmlRoot.setAttribute('data-lang', lang);
    htmlRoot.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');

    if (currentLangText) {
      // 若當前為中文，按鈕提示切換成 'EN'；若當前為英文，按鈕提示切換成 '中文'
      currentLangText.textContent = lang === 'zh' ? 'EN' : '中文';
    }

    // 更新瀏覽器分頁標題
    if (lang === 'zh') {
      document.title = '王三源 副教授 | Dr. San-Yuan Wang - 臺北醫學大學';
    } else {
      document.title = 'Dr. San-Yuan Wang | Associate Professor - Taipei Medical University';
    }
  }

  // --- 2. 深色 / 淺色模式切換 (Dark / Light Theme Toggle) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // 只有訪客手動切換時才記住偏好；未切換過則持續跟隨系統設定
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  setTheme(htmlRoot.getAttribute('data-theme') || (darkQuery.matches ? 'dark' : 'light'));

  darkQuery.addEventListener('change', (e) => {
    if (!readPref('wang_academic_theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
      savePref('wang_academic_theme', nextTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  // --- 3. 手機版選單開合 (Mobile Navigation Toggle) ---
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggleBtn && navLinks) {
    mobileToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggleBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // 點擊任一導覽連結後自動收合選單
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- 4. 代表著作分類過濾 (Publication Category Filter) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      pubCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. 導覽列作用中連結高亮 (Active Navigation on Scroll) ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  // 以 requestAnimationFrame 節流，避免每次捲動事件都重新計算
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(() => {
      updateActiveNav();
      navTicking = false;
    });
  }, { passive: true });

  // --- 6. 動態年份更新 ---
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});

// localStorage 在部分隱私模式下會拋出錯誤，統一包裝
function readPref(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function savePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

// CSS 動畫關鍵影格注入
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
