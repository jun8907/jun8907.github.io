(() => {
  const modeBtn = document.getElementById('modeBtn');
  const logo = document.getElementById('brandLogo');
  const searchInput = document.getElementById('searchInput');

  const apply = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (modeBtn) modeBtn.textContent = isDark ? 'Light' : 'Dark';
    if (logo) logo.src = isDark ? logo.dataset.dark : logo.dataset.light;
  };

  const saved = localStorage.getItem('hh_mode');
  if (saved === 'dark') document.documentElement.classList.add('dark');
  apply();

  modeBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'hh_mode',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
    apply();
  });

  // (나중에 포스트 목록 붙일 때 사용)
  searchInput?.addEventListener('input', () => {
    // TODO: posts 배열 필터링
  });
})();
