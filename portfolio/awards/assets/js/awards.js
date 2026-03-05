(() => {
  const modeBtn = document.getElementById('modeBtn');
  const logo = document.getElementById('brandLogo');
  const listEl = document.getElementById('list');
  const searchInput = document.getElementById('searchInput');
  const chipsEl = document.getElementById('chips');
  const hint = document.getElementById('hint');

  // --- Dark mode ---
  const applyModeLabel = () => {
    const isDark = document.documentElement.classList.contains('dark');

    modeBtn.textContent = isDark ? 'Light' : 'Dark';

    // ✅ 로고 교체
    if (logo) {
      logo.src = isDark ? logo.dataset.dark : logo.dataset.light;
    }
  };

  const saved = localStorage.getItem('hh_mode');
  if (saved === 'dark') document.documentElement.classList.add('dark');
  applyModeLabel();

  modeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'hh_mode',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
    applyModeLabel();
  });

  // --- Data (여기만 채우면 됨) ---
  // tags: ["Conference", "Contest"] 처럼 여러 개 가능
  const awards = [
    {
      date: '2026.01.06',
      title: '인터넷보안전문가 2급',
      org: '한국정보통신자격협회(ICQA)',
      tags: ['자격증'],
    },
    {
      date: '2025.09.25',
      title:
        '딥보이스 탐지 장치 및 방법 (Apparatus and method for deep voice detection)',
      org: '10-2025-0140200',
      tags: ['특허'],
    },
    {
      date: '2025.09.10',
      title: '2025-1 캡스톤디자인 경진대회 우수상(총장)',
      org: '중부대학교',
      tags: ['수상'],
    },
    {
      date: '2025.06.27',
      title: '2025 한국융합보안학회 하계학술대회 우수논문상',
      org: '한국융합보안학회',
      tags: ['수상'],
    },
    {
      date: '2024.12.12',
      title: '2024-2 캡스톤디자인 경진대회',
      org: '중부대학교',
      tags: ['수상'],
    },
    {
      date: '2024.11.08',
      title: '2024 한국융합보안학회 추계학술대회 장려상',
      org: '한국융합보안학회',
      tags: ['수상'],
    },
    {
      date: '2024.06.28',
      title: '2024 한국융합보안학회 하계학술대회 우수논문상',
      org: '한국융합보안학회',
      tags: ['수상'],
    },
    {
      date: '2023.12.18',
      title: '2023 한국해양대학교 빅데이터 공모전 대상',
      org: '국립한국해양대학교',
      tags: ['수상'],
    },
    {
      date: '2023.12.18',
      title: '2023 한국해양대학교 빅데이터 공모전 최우수',
      org: '국립한국해양대학교',
      tags: ['수상'],
    },
    {
      date: '2023.10.24',
      title: '네트워크관리사 2급',
      org: '한국정보통신자격협회(ICQA)',
      tags: ['자격증'],
    },
    {
      date: '2022.10.14',
      title: '침해사고대응전문가 2급',
      org: '사이버보안평가기술원',
      tags: ['자격증'],
    },
    // 필요하면 계속 추가
  ];

  let state = { tag: 'All', q: '' };

  const uniqTags = () => {
    const s = new Set();
    awards.forEach((a) => (a.tags || []).forEach((t) => s.add(t)));
    return ['All', ...Array.from(s).sort()];
  };

  const renderChips = () => {
    chipsEl.innerHTML = uniqTags()
      .map(
        (t) =>
          `<button class="chip ${t === 'All' ? 'is-active' : ''}" data-tag="${t}" type="button">${t}</button>`,
      )
      .join('');
  };

  const matches = (a) => {
    const tagOK = state.tag === 'All' || (a.tags || []).includes(state.tag);
    const q = state.q.trim().toLowerCase();
    const text =
      `${a.title} ${a.org} ${(a.tags || []).join(' ')}`.toLowerCase();
    const qOK = !q || text.includes(q);
    return tagOK && qOK;
  };

  const renderList = () => {
    const items = awards.filter(matches);

    listEl.innerHTML = items
      .map(
        (a) => `
      <div class="row">
        <div class="date">${a.date}</div>

        <div class="main">
          <h3 class="name">${a.title}</h3>
          <div class="org">${a.org}</div>
        </div>

        <div class="badges">
          ${(a.tags || []).map((t) => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>
    `,
      )
      .join('');

    hint.hidden = items.length !== 0;
  };

  // events
  chipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    state.tag = btn.dataset.tag;

    chipsEl
      .querySelectorAll('.chip')
      .forEach((c) => c.classList.remove('is-active'));
    btn.classList.add('is-active');

    renderList();
  });

  searchInput.addEventListener('input', (e) => {
    state.q = e.target.value;
    renderList();
  });

  // init
  renderChips();
  renderList();
})();
