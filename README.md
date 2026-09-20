# ARDS Prediction Model - Web Portfolio

IMEN 383 **Health Systems Engineering** 프로젝트 발표자료를 GitHub Pages에서 볼 수 있도록 스크롤형 웹 포트폴리오로 구성한 버전입니다.

## 프로젝트 개요

ICU 시계열 데이터를 이용해 **향후 12시간 내 ARDS 발생 위험**을 예측하는 프로젝트입니다. 발표자료의 흐름을 그대로 유지하면서 웹에서는 다음 순서로 읽을 수 있도록 구성했습니다.

```text
Overview
  ↓
Preprocessing
  ↓
Prediction Task
  ↓
Annotation & Labeling
  ↓
Model Design & Training
  ↓
Performance & Conclusion
```

## 발표자료 기준 핵심 내용

- Total cohort: 11,514 unique IDs
- Observation window 확보를 위해 LOS ≥ 2 적용
- Train / Valid / Test = 80% / 10% / 10%
- ARDS 라벨 조건: `0 < PF Ratio <= 300` & `MechVent = 1`
- 현재 시점으로부터 향후 12시간 내 조건 충족 여부를 `ards_next_12h`로 라벨링
- Machine Learning: XGB, LGB, RF, DT, LR, NB
- Deep Learning: LSTM, Transformer
- 발표자료 결과: LSTM F1-Score 0.867, Transformer ROC-AUC 0.949

## 파일 구조

```text
index.html
style.css
script.js
original.pdf
slides/
  slide01.webp
  ...
  slide37.webp
README.md
```

## GitHub Pages 배포

저장소 루트에 위 파일들을 그대로 업로드한 뒤:

1. `Settings`
2. `Pages`
3. `Deploy from a branch`
4. Branch: `main`
5. Folder: `/(root)`

으로 설정하면 됩니다.

## 참고

이 웹페이지는 발표자료를 포트폴리오 형태로 재구성한 것으로, 모델 결과와 임상적 해석은 원 발표자료의 내용을 기준으로 표시합니다.
