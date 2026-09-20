const TOTAL = 37;
const img = document.getElementById('slideImage');
const stage = document.getElementById('stage');
const currentEl = document.getElementById('currentSlide');
const totalEl = document.getElementById('totalSlides');
const progress = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevSmall = document.getElementById('prevSmall');
const nextSmall = document.getElementById('nextSmall');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const thumbPanel = document.getElementById('thumbPanel');
const thumbToggle = document.getElementById('thumbToggle');
const thumbClose = document.getElementById('thumbClose');
const thumbGrid = document.getElementById('thumbGrid');
const backdrop = document.getElementById('backdrop');

totalEl.textContent = TOTAL;

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
function slideSrc(n) { return `assets/slides/slide-${String(n).padStart(3, '0')}.png`; }

function readHash() {
  const match = location.hash.match(/slide=(\d+)/i);
  return match ? clamp(Number(match[1]) || 1, 1, TOTAL) : 1;
}

let current = readHash();
let touchStartX = null;
let touchStartY = null;

function preload(n) {
  if (n < 1 || n > TOTAL) return;
  const p = new Image();
  p.src = slideSrc(n);
}

function render(n, {updateHash = true} = {}) {
  current = clamp(n, 1, TOTAL);
  stage.classList.add('is-loading');
  img.onload = () => stage.classList.remove('is-loading');
  img.onerror = () => stage.classList.remove('is-loading');
  img.src = slideSrc(current);
  img.alt = `ARDS Prediction Model - 슬라이드 ${current}`;
  currentEl.textContent = current;
  progress.style.width = `${(current / TOTAL) * 100}%`;
  prevBtn.disabled = current === 1;
  nextBtn.disabled = current === TOTAL;
  prevSmall.disabled = current === 1;
  nextSmall.disabled = current === TOTAL;

  if (updateHash) history.replaceState(null, '', `#slide=${current}`);
  document.querySelectorAll('.thumb').forEach((el, i) => el.classList.toggle('active', i + 1 === current));
  const activeThumb = document.querySelector('.thumb.active');
  if (thumbPanel.classList.contains('open') && activeThumb) activeThumb.scrollIntoView({block:'nearest'});
  preload(current - 1);
  preload(current + 1);
}

function prev() { if (current > 1) render(current - 1); }
function next() { if (current < TOTAL) render(current + 1); }

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
prevSmall.addEventListener('click', prev);
nextSmall.addEventListener('click', next);
stage.addEventListener('click', (e) => {
  if (document.body.classList.contains('presentation-mode')) return;
  const rect = stage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  if (x < rect.width * .35) prev(); else next();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
  if (e.key === 'Home') render(1);
  if (e.key === 'End') render(TOTAL);
  if (e.key === 'Escape' && thumbPanel.classList.contains('open')) closeThumbs();
});

stage.addEventListener('touchstart', (e) => {
  const t = e.changedTouches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, {passive:true});
stage.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  touchStartX = touchStartY = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    dx < 0 ? next() : prev();
  }
}, {passive:true});

function openThumbs() {
  thumbPanel.classList.add('open');
  thumbPanel.setAttribute('aria-hidden','false');
  backdrop.hidden = false;
}
function closeThumbs() {
  thumbPanel.classList.remove('open');
  thumbPanel.setAttribute('aria-hidden','true');
  backdrop.hidden = true;
}
thumbToggle.addEventListener('click', openThumbs);
thumbClose.addEventListener('click', closeThumbs);
backdrop.addEventListener('click', closeThumbs);

for (let i = 1; i <= TOTAL; i++) {
  const button = document.createElement('button');
  button.className = 'thumb';
  button.type = 'button';
  button.setAttribute('aria-label', `슬라이드 ${i}로 이동`);
  button.innerHTML = `<img src="${slideSrc(i)}" loading="lazy" alt="슬라이드 ${i} 미리보기"><span>${i}</span>`;
  button.addEventListener('click', () => { render(i); closeThumbs(); });
  thumbGrid.appendChild(button);
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (_) {
    document.body.classList.toggle('presentation-mode');
  }
}
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  document.body.classList.toggle('presentation-mode', Boolean(document.fullscreenElement));
});

window.addEventListener('hashchange', () => render(readHash(), {updateHash:false}));
render(current, {updateHash:false});
