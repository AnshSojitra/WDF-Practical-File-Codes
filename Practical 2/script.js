// Theme toggle and mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  function toggleTheme() {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
    // Persist preference
    if (document.body.classList.contains('theme-dark')) {
      localStorage.setItem('site-theme', 'dark');
    } else {
      localStorage.setItem('site-theme', 'light');
    }
  }

  // Initialize theme from storage
  const saved = localStorage.getItem('site-theme');
  if (saved === 'dark') {
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
  } else {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
  }

  // Attach theme toggles (multiple pages may have different ids)
  ['themeToggle','themeToggle2','themeToggle3'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', toggleTheme);
  });

  // Mobile nav toggles
  ['navToggle','navToggle2','navToggle3'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', function () {
      const nav = document.getElementById('mainNav');
      if (!nav) return;
      nav.classList.toggle('collapsed');
    });
  });
});
