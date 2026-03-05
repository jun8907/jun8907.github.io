(() => {
  const modeBtn = document.getElementById('modeBtn');
  const logo = document.getElementById('brandLogo'); // ✅ 추가

  if (!modeBtn) return;

  const apply = () => {
    const isDark = document.documentElement.classList.contains('dark');
    modeBtn.textContent = isDark ? 'Light' : 'Dark';

    // ✅ 로고 교체
    if (logo) {
      logo.src = isDark ? logo.dataset.dark : logo.dataset.light;
    }
  };

  const saved = localStorage.getItem('hh_mode');
  if (saved === 'dark') document.documentElement.classList.add('dark');
  apply(); // ✅ 초기에도 적용

  modeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'hh_mode',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
    apply(); // ✅ 클릭 후에도 적용
  });
})();
