# ARDS Prediction Model - GitHub Pages

이 폴더 전체를 GitHub 저장소에 업로드하면 바로 정적 웹사이트로 사용할 수 있습니다.

## 배포 방법

1. GitHub에서 새 Repository를 만듭니다. (예: `ards-presentation`)
2. 이 폴더 안의 파일/폴더를 **전부** 저장소 최상단에 업로드합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Build and deployment → Source**를 `Deploy from a branch`로 선택합니다.
5. Branch를 `main`, Folder를 `/(root)`로 지정하고 **Save**를 누릅니다.
6. 잠시 후 표시되는 `https://아이디.github.io/저장소이름/` 주소로 접속합니다.

## 구성

- `index.html` : 메인 페이지
- `style.css` : 반응형 디자인
- `script.js` : 이전/다음, 키보드, 스와이프, 썸네일, 전체화면 기능
- `assets/slides/` : PPT 37장을 이미지로 변환한 파일
- `assets/ARDS_Prediction_Model.pptx` : PPT 원본 다운로드용

## 사용법

- PC: 좌우 화살표키, PageUp/PageDown, Space로 이동
- 모바일: 좌우 스와이프
- 우측 상단 목록 버튼: 전체 슬라이드 미리보기
- 우측 상단 전체화면 버튼: 발표 모드
- URL의 `#slide=숫자`를 이용하면 특정 슬라이드를 바로 열 수 있음

## PPT가 수정되었을 때

슬라이드 이미지만 다시 만들고 `assets/slides/` 안의 파일을 같은 이름(`slide-001.png` ~)으로 교체하면 됩니다. 슬라이드 수가 바뀌면 `script.js`의 `TOTAL = 37`도 수정하세요.
