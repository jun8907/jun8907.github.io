(() => {
  const view = document.getElementById('view');
  const tree = document.getElementById('tree');
  const modeBtn = document.getElementById('modeBtn');
  const logo = document.getElementById('brandLogo');

  // --- 방어: 요소 없으면 종료(콘솔 에러 방지) ---
  if (!view || !tree || !modeBtn) {
    console.error('Missing element:', {
      view: !!view,
      tree: !!tree,
      modeBtn: !!modeBtn,
    });
    return;
  }

  const applyLogo = () => {
    if (!logo) return;
    const isDark = document.documentElement.classList.contains('dark');
    logo.src = isDark ? logo.dataset.dark : logo.dataset.light;
  };

  // --- Views (right side) ---
  const templates = {
    root: `
      <div class="section-grid">
    <div class="card">
      <h2 class="section-title">portfolio</h2>
      <p class="small">학력, 프로젝트, 수상, 논문 등 주요 포트폴리오 정리.</p>
      <button class="goto-btn" data-goto="portfolio" type="button">Open portfolio →</button>
    </div>

    <div class="card">
      <h2 class="section-title">blog</h2>
      <p class="small">포렌식/보안 공부 기록과 일상을 모아둔 공간.</p>
      <button class="goto-btn" data-goto="blog" type="button">Open blog →</button>
    </div>

    <div class="card">
      <h2 class="section-title">...</h2>
      <p class="small">확장용 폴더.</p>
      <button class="goto-btn" data-goto="ellipsis" type="button">Open ... →</button>
    </div>
  </div>
`,
    portfolio: `
  <div class="portfolio-page" style="max-width:920px;">
    <h2 class="page-title">Education</h2>
    <div class="page-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2022년 03월 ~ 2026년 08월</div>
            <div class="edu-school">중부대학교 정보보호학과</div>
            <div class="edu-degree">공학사</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/joongbu.png" alt="중부대학교 로고" />
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2024년 03월 ~ 2024년 12월</div>
            <div class="edu-school">중부대학교 정보보안 SW융합전공</div>
            <div class="edu-degree">부전공</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/joongbu.png" alt="중부대학교 로고" />
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2025년 03월 ~ 2025년 09월</div>
            <div class="edu-school">화이트햇 스쿨 3기</div>
            <div class="edu-degree">수료</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/whitehat.jpeg" alt="화이트햇 로고" />
          </div>
        </div>
      </div>
    </div>

  <div class="portfolio-page" style="max-width:920px;">
    <h2 class="page-title">Awards</h2>
    <div class="page-divider"></div>
        
        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2025.09.10</div>
            <div class="edu-school">2025-1 캡스톤디자인 경진대회 우수상(총장)</div>
            <div class="edu-degree">중부대학교</div>
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2025.06.27</div>
            <div class="edu-school">2025 한국융합보안학회 하계학술대회 우수논문상</div>
            <div class="edu-degree">한국융합보안학회</div>
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2024.12.12</div>
            <div class="edu-school">2024-2 캡스톤디자인 경진대회 우수상</div>
            <div class="edu-degree">중부대학교</div>
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2024.11.08</div>
            <div class="edu-school">2024 한국융합보안학회 추계학술대회 장려상</div>
            <div class="edu-degree">한국융합보안학회</div>
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">2024.06.28</div>
            <div class="edu-school">2024 한국융합보안학회 하계학술대회 우수논문상</div>
            <div class="edu-degree">한국융합보안학회</div>
          </div>
        </div>
      </div>
    </div>

  <div class="portfolio-page" style="max-width:920px;">
    <h2 class="page-title">Papers</h2>
    <div class="page-divider"></div>
        
        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">#국내 #논문지 #KCI</div>
            <div class="edu-school">디지털 포렌식 관점에서의 안드로이드 Session 메신저에 대한 사용자 행위 기반 아티팩트 분석 연구</div>
            <div class="edu-degree">한국정보보호학회 2025.10.31</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/한국정보보호학회.png" alt="한국정보보호학회 로고" />
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">#국내 #학술대회</div>
            <div class="edu-school">딥보이스로 제작된 음성 탐지 시스템 연구</div>
            <div class="edu-degree">한국융합보안학회 2025.06.27</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/한국융합보안학회.png" alt="한국융합보안학회 로고" />
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">#국내 #학술대회</div>
            <div class="edu-school">머신러닝을 활용한 피싱 탐지⋅차단 시스템 연구: PDCA 방법론을 기반으로</div>
            <div class="edu-degree">한국융합보안학회 2024.11.08</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/한국융합보안학회.png" alt="한국융합보안학회 로고" />
          </div>
        </div>

        <div class="edu-divider"></div>

        <div class="edu-item">
          <div class="edu-left">
            <div class="edu-date">#국내 #학술대회</div>
            <div class="edu-school">XGBoost 머신러닝을 이용한 불법⋅유해 사이트 차단 시스템 연구</div>
            <div class="edu-degree">한국융합보안학회 2024.06.08</div>
          </div>
          <div class="edu-right">
            <img class="edu-logo" src="img/한국융합보안학회.png" alt="한국융합보안학회 로고" />
          </div>
        </div>
      </div>
    </div>

  </div>
`,
  };

  const setActive = (nodeId) => {
    tree
      .querySelectorAll('.node')
      .forEach((btn) => btn.classList.remove('is-active'));
    const btn = tree.querySelector(`.node[data-node="${nodeId}"]`);
    if (btn) btn.classList.add('is-active');
  };

  const render = (nodeId) => {
    view.innerHTML =
      templates[nodeId] ??
      `
      <div class="card" style="max-width:920px;">
        <h2 class="section-title">${nodeId}</h2>
        <p class="small">아직 이 섹션 내용이 없어.</p>
      </div>
    `;
  };

  // --- Tree: toggle helper ---
  const toggleNode = (btn) => {
    const wrapper = btn.closest('.tree-node');
    const children = wrapper
      ? wrapper.querySelector(':scope > .tree-children')
      : null;
    if (!children) return false;

    const isCollapsed = children.classList.contains('is-collapsed');
    children.classList.toggle('is-collapsed');
    wrapper.classList.toggle('is-open');

    const twisty = btn.querySelector('.twisty');
    if (twisty) twisty.textContent = isCollapsed ? '−' : '+';
    return true;
  };
  const openNode = (btn) => {
    const wrapper = btn.closest('.tree-node');
    const children = wrapper
      ? wrapper.querySelector(':scope > .tree-children')
      : null;
    if (!children) return; // leaf면 열 게 없음

    if (children.classList.contains('is-collapsed')) {
      children.classList.remove('is-collapsed');
      wrapper.classList.add('is-open');

      const twisty = btn.querySelector('.twisty');
      if (twisty) twisty.textContent = '−';
    }
  };

  // 어떤 노드로 가기: 조상(root 등)부터 차례대로 열고, 해당 노드 선택+렌더
  const gotoNode = (nodeId) => {
    const targetBtn = tree.querySelector(`.node[data-node="${nodeId}"]`);
    if (!targetBtn) return;

    // 1) 조상 폴더들(root 포함) 전부 열기
    // targetBtn을 감싼 tree-node들을 따라 올라가며,
    // 각 tree-node의 "직접 버튼(node)"을 찾아 openNode
    const ancestors = [];
    let current = targetBtn.closest('.tree-node');
    while (current) {
      ancestors.push(current);
      current = current.parentElement?.closest('.tree-node');
    }
    // 위에서부터 열리도록 reverse
    ancestors.reverse().forEach((nodeEl) => {
      const btn = nodeEl.querySelector(':scope > .node');
      if (btn) openNode(btn);
    });

    // 2) 타겟이 폴더면 그것도 열기(특히 portfolio)
    openNode(targetBtn);

    // 3) 선택 + 렌더
    setActive(nodeId);
    render(nodeId);

    // (선택) 트리 영역에서 해당 항목이 보이도록 스크롤
    targetBtn.scrollIntoView({ block: 'nearest' });
  };

  // root 화면의 "바로가기 버튼" 클릭 처리
  view.addEventListener('click', (e) => {
    const btn = e.target.closest('.goto-btn');
    if (!btn) return;
    gotoNode(btn.dataset.goto);
  });

  // --- Tree click: twisty only toggles, row click selects ---
  tree.addEventListener('click', (e) => {
    const btn = e.target.closest('.node');
    if (!btn) return;

    // twisty 클릭이면 토글만
    if (e.target.closest('.twisty')) {
      toggleNode(btn);
      return;
    }

    const routes = {
      education: 'education/',
      projects: 'projects/',
      awards: 'awards/',
      papers: 'papers/',
      blog: '../blog/',
    };

    // ... tree.addEventListener('click', ...) 내부에서
    const nodeId = btn.dataset.node;

    // leaf에 해당하면 페이지 이동
    if (routes[nodeId]) {
      window.location.href = routes[nodeId];
      return;
    }

    // 그 외는 기존처럼 SPA 렌더
    setActive(nodeId);
    render(nodeId);
  });

  // --- Tree dblclick: row double-click toggles ---
  tree.addEventListener('dblclick', (e) => {
    const btn = e.target.closest('.node');
    if (!btn) return;

    e.preventDefault(); // 텍스트 선택 방지(선택)
    toggleNode(btn);
  });

  // --- Dark mode ---
  const applyModeLabel = () => {
    modeBtn.textContent = document.documentElement.classList.contains('dark')
      ? 'Light'
      : 'Dark';
  };

  modeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'hh_mode',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
    applyModeLabel();
    applyLogo(); // ✅ 추가
  });

  // Load persisted mode
  const saved = localStorage.getItem('hh_mode');
  if (saved === 'dark') document.documentElement.classList.add('dark');
  applyModeLabel();
  applyLogo();

  // Initial
  setActive('root');
  render('root');
})();
