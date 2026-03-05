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
  // tags는 여러 개 가능, url이 있으면 클릭 이동도 가능(원하면 추가 가능)
  const papers = [
    {
      date: '2025.10.31',
      title:
        'Research on User Behavior-Based Artifact Analysis of Android Session Messenger from a Digital Forensics Viewpoint 디지털 포렌식 관점에서의 안드로이드 Session 메신저에 대한 사용자 행위 기반 아티팩트 분석 연구',
      org: 'Hye Ji Kim, Yeoung Seo Kim, Hui Ju Kim, Jea Kwang Ryu, Yu Ran Park, Mi So Park, Chan Yeoung Ji,  Jun Hee Hong',
      tags: ['국내', 'KCI'],
    },
    {
      date: '2025.06.27',
      title:
        'Researching speech detection systems made with DeepVoice 딥보이스로 제작된 음성 탐지 시스템 연구',
      org: 'Jin Ho Jung, Woo Kyung Park, Ha Young Lee, Su Min Choi, Jun Hee Hong, Min Su Kim',
      tags: ['국내', '학술대회'],
    },
    {
      date: '2024.11.08',
      title:
        'Research on phishing detection and blocking system using machine learning: Based on PDCA methodology 머신러닝을 활용한 피싱 탐지⋅차단 시스템 연구: PDCA 방법론을 기반으로',
      org: 'Jin Ho Jung, Woo Kyung Park, Ha Young Lee, Su Min Choi, Jun Hee Hong, Min Su Kim',
      tags: ['국내', '학술대회'],
    },
    {
      date: '2024.06.08',
      title:
        'Research on illegal and harmful site blocking systems using XGBoost XGBoost 머신러닝을 이용한 불법⋅유해 사이트 차단 시스템 연구',
      org: 'Jin-Ho Jung, Woo-Kyung Park, Su-Min Choi, Jun-Hee Hong, Pyeong-An Kim, Min-Su Kim',
      tags: ['국내', '학술대회'],
    },
    {
      date: '2024.06.08',
      title:
        'Research on IoT Vulnerabilities Analysis, and Response Based on Scenario 시나리오 기반 IoT 취약점 분석 및 대응에 관한 연구',
      org: 'Kyeong Jea Lee, Jea Won Jang, Jun Hee Hong, Min-Su Kim',
      tags: ['해외', '학술대회'],
    },
  ];

  let state = { tag: 'All', q: '' };

  const uniqTags = () => {
    const s = new Set();
    papers.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
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

  const matches = (p) => {
    const tagOK = state.tag === 'All' || (p.tags || []).includes(state.tag);
    const q = state.q.trim().toLowerCase();
    const text =
      `${p.title} ${p.org} ${(p.tags || []).join(' ')}`.toLowerCase();
    const qOK = !q || text.includes(q);
    return tagOK && qOK;
  };

  const renderList = () => {
    const items = papers.filter(matches);

    listEl.innerHTML = items
      .map(
        (p) => `
      <div class="row">
        <div class="date">${p.date}</div>

        <div class="main">
          <h3 class="name">${p.title}</h3>
          <div class="org">${p.org}</div>
        </div>

        <div class="badges">
          ${(p.tags || []).map((t) => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>
    `,
      )
      .join('');

    hint.hidden = items.length !== 0;
  };

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
