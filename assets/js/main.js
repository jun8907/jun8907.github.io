(() => {
  const dz = document.getElementById('dropzone');
  const input = document.getElementById('fileInput');
  const subhint = document.getElementById('subhint');

  const REQUIRED_NAME = 'Encrypted_Portfolio.E01';
  const REQUIRED_TOKEN =
    'It is encrypted and inaccessible. Please load and decrypt the file';
  const PORTFOLIO_URL = 'portfolio/';

  const prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const setHint = (msg) => {
    subhint.textContent = msg;
  };

  const startLoadingAndGo = () => {
    dz.classList.add('is-loading');
    setHint('복호화 완료. 포트폴리오를 여는 중…');

    // 연출용 딜레이(원하면 800~1500 사이로 조절)
    setTimeout(() => {
      window.location.href = PORTFOLIO_URL;
    }, 1100);
  };

  const validateAndOpen = async (file) => {
    if (!file) return;

    // 1) 파일명 체크 (연출상 제일 직관적)
    if (file.name !== REQUIRED_NAME) {
      setHint(`오류: ${REQUIRED_NAME} 파일을 드래그앤드롭 해줘.`);
      return;
    }

    // 2) 내용 토큰 체크 (원하면 끌 수도 있음)
    const text = await file.text();
    if (!text.includes(REQUIRED_TOKEN)) {
      setHint('오류: 유효하지 않은 키 파일이야. 다시 다운로드해줘.');
      return;
    }

    startLoadingAndGo();
  };

  // 클릭/엔터로 파일 선택도 지원
  dz.addEventListener('click', () => input.click());
  dz.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') input.click();
  });

  input.addEventListener('change', (e) => {
    validateAndOpen(e.target.files?.[0]);
  });

  // Drag over style
  ['dragenter', 'dragover'].forEach((evt) => {
    dz.addEventListener(evt, (e) => {
      prevent(e);
      dz.classList.add('is-dragover');
    });
  });

  ['dragleave', 'drop'].forEach((evt) => {
    dz.addEventListener(evt, (e) => {
      prevent(e);
      dz.classList.remove('is-dragover');
    });
  });

  dz.addEventListener('drop', (e) => {
    const file = e.dataTransfer?.files?.[0];
    validateAndOpen(file);
  });

  // 초기 힌트
  setHint(
    'Download file을 눌러 키 파일을 받은 뒤, 여기로 드래그앤드롭 해주세요.',
  );
})();
