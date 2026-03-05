(() => {
  const modeBtn = document.getElementById('modeBtn');
  const logo = document.getElementById('brandLogo');
  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('searchInput');
  const hint = document.getElementById('hint');
  const chips = Array.from(document.querySelectorAll('.chip'));

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

  // --- Data (여기만 너 프로젝트로 채우면 됨) ---
  const projects = [
    {
      title: '2025 사이버안보 논문공모전',
      tags: ['Contest'],
      date: '2025. 08 (불합격)',
      thumb: 'assets/img/사이버안보 논문공모전.jpg',
      url: '#',
    },
    {
      title: '2025 디지털 범인을 찾아라',
      tags: ['Contest', 'CTF'],
      date: '2025. 08 (불합격)',
      thumb: 'assets/img/디지털 범인 찾아라.jpg',
      url: '#',
    },
    {
      title: '디지털 포렌식 챌린지 2025',
      tags: ['Contest', 'CTF'],
      date: '2025. 08 (불합격)',
      thumb: 'assets/img/디지털포렌식 챌린지.jpg',
      url: '#',
    },
    {
      title: 'WHS-3 화이트햇 스쿨 3기',
      tags: ['Edu'],
      date: '2025. 09 (수료)',
      thumb: 'assets/img/화이트햇스쿨.jpeg',
      url: '#',
    },
    {
      title: '2025 한국융합보안학회 하계학술대회',
      tags: ['Contest', 'Project'],
      date: '2025. 06 (우수논문상)',
      thumb: 'assets/img/2025한국융합보안학회 하계.jpg',
      url: '#',
    },
    {
      title: 'Deepvoice 음성 분석 연구 및 탐지 어플리케이션 제작',
      tags: ['Project'],
      date: '2025',
      thumb: 'assets/img/딥보이스.png',
      url: '#',
    },
    {
      title: '비대면진료의 안정적 시행 정책 아이디어 공모전',
      tags: ['Contest'],
      date: '2024. 12 (불합격)',
      thumb: 'assets/img/비대면진료.jpg',
      url: '#',
    },
    {
      title: '2024 딥페이크 가짜뉴스 정책아이디어 공모전',
      tags: ['Contest'],
      date: '2024. 10 (불합격)',
      thumb: 'assets/img/딥페이크.jpg',
      url: '#',
    },
    {
      title: '2024 한국융합보안학회 추계학술대회',
      tags: ['Contest', 'Project'],
      date: '2024. 11 (장려상)',
      thumb: 'assets/img/2024한국융합보안학회 추계.jpg',
      url: '#',
    },
    {
      title: '머신러닝을 활용한 QR Code 피싱 탐지 어플 제작',
      tags: ['Project'],
      date: '2024',
      thumb: 'assets/img/qr피싱.png',
      url: '#',
    },
    {
      title: '2024 정보보호 정책 제안 공모전',
      tags: ['Contest'],
      date: '2024. 09 (불합격)',
      thumb: 'assets/img/정책제안.jpeg',
      url: '#',
    },
    {
      title: '2024 한국융합보안학회 하계학술대회',
      tags: ['Contest', 'Project'],
      date: '2024. 06 (우수논문상)',
      thumb: 'assets/img/2024한국융합보안학회 하계.jpeg',
      url: '#',
    },
    {
      title: 'XGBoost를 이용한 불법・유해 사이트 차단 프로그램 제작',
      tags: ['Project'],
      date: '2024',
      thumb: 'assets/img/유해사이트.jpeg',
      url: '#',
    },
    {
      title: '2024 전라남도 웹 취약점 경진대회',
      tags: ['Contest', 'CTF'],
      date: '2024. 05 (웹 공부)',
      thumb: 'assets/img/전라남도 웹취약점.jpeg',
      url: '#',
    },
    {
      title: '2023년도 조선 해운 빅데이터 아이디어 공모 경진대회',
      tags: ['Contest'],
      date: '2023. 12 (대상·최우수상)',
      thumb: 'assets/img/빅데이터 공모전.png',
      url: '#',
    },
    {
      title: '2023 한이음 ICT 멘토링',
      tags: ['Contest', 'Project'],
      date: '2023. 03 (1차 심사 합격)',
      thumb: 'assets/img/한이음.jpeg',
      url: '#',
    },
  ];

  let state = {
    tag: 'all',
    q: '',
  };

  const matches = (p) => {
    const tagOK = state.tag === 'all' || (p.tags || []).includes(state.tag);
    const q = state.q.trim().toLowerCase();
    const qOK = !q || p.title.toLowerCase().includes(q);
    return tagOK && qOK;
  };

  const render = () => {
    const list = projects.filter(matches);

    grid.innerHTML = list
      .map((p) => {
        const thumbHTML = p.thumb
          ? `<div class="thumb"><img src="${p.thumb}" alt=""></div>`
          : `<div class="thumb empty">No preview</div>`;

        return `
          <article class="card" data-url="${p.url}">
            ${thumbHTML}
            <div class="body">
              <h3 class="card-title">${p.title}</h3>
              <div class="meta">
                ${(p.tags || []).map((t) => `<span class="badge">${t}</span>`).join('')}
                <span>${p.date}</span>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    hint.hidden = list.length !== 0;
  };

  // Chip filter
  chips.forEach((c) => {
    c.addEventListener('click', () => {
      chips.forEach((x) => x.classList.remove('is-active'));
      c.classList.add('is-active');
      state.tag = c.dataset.tag;
      render();
    });
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    state.q = e.target.value;
    render();
  });

  // Card click
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const url = card.dataset.url;
    if (url && url !== '#') window.location.href = url;
  });

  // Initial
  render();
})();
