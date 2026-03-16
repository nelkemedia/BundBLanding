// ─── Theme Restore (runs immediately to prevent FOUC) ───
(function () {
  var saved = localStorage.getItem('bb-theme');
  if (saved && saved !== 'default') {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

// ─── Theme Switcher UI ───
document.addEventListener('DOMContentLoaded', function () {
  var themes = [
    { id: 'default', gradient: 'linear-gradient(135deg, #1a1410, #a3302b)', title: 'Rot-Schema' },
    { id: 'gold', gradient: 'linear-gradient(135deg, #0a1628, #c9a96e)', title: 'Navy-Gold-Schema' },
    { id: 'light', gradient: 'linear-gradient(135deg, #f5f5f5, #d0d0d0, #e8e8e8)', title: 'Hell-Schema' }
  ];

  var switcher = document.createElement('div');
  switcher.id = 'theme-switcher';
  switcher.className = 'fixed bottom-4 right-4 z-50 flex items-center gap-2 glass-card px-3 py-2 rounded-full lg:bottom-6 lg:right-6';

  themes.forEach(function (t) {
    var btn = document.createElement('button');
    btn.setAttribute('data-set-theme', t.id);
    btn.className = 'theme-btn w-7 h-7 rounded-full border-2 border-warm-200/30 transition-all duration-300';
    btn.style.background = t.gradient;
    btn.title = t.title;
    btn.setAttribute('aria-label', t.title);
    switcher.appendChild(btn);
  });

  document.body.appendChild(switcher);

  var saved = localStorage.getItem('bb-theme') || 'default';

  function markActive(activeTheme) {
    switcher.querySelectorAll('[data-set-theme]').forEach(function (b) {
      b.style.borderColor = '';
      b.style.transform = '';
    });
    var active = switcher.querySelector('[data-set-theme="' + activeTheme + '"]');
    if (active) {
      active.style.borderColor = 'var(--color-gold-500)';
      active.style.transform = 'scale(1.15)';
    }
  }

  markActive(saved);

  switcher.querySelectorAll('[data-set-theme]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var theme = btn.getAttribute('data-set-theme');
      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
      localStorage.setItem('bb-theme', theme);
      markActive(theme);
    });
  });
});
