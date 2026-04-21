const socket = io();

const sky        = document.getElementById('sky');
const wishInput  = document.getElementById('wish-input');
const wishBtn    = document.getElementById('wish-btn');
const shootBtn   = document.getElementById('shoot-btn');
const charCount  = document.getElementById('char-count');
const wishCount  = document.getElementById('wish-count');

let totalWishes = 0;

(function seedBgStars() {
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'bg-star';
    const size = Math.random() * 2 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${(Math.random()*100).toFixed(2)}%;
      top:${(Math.random()*85).toFixed(2)}%;
      --dur:${(Math.random()*4+2).toFixed(1)}s;
      --delay:-${(Math.random()*5).toFixed(1)}s;
    `;
    sky.appendChild(s);
  }
})();

function placeWish(wish) {
  const star = document.createElement('div');
  star.className = `wish-star ${wish.size}`;
  star.style.cssText = `
    left:${wish.x}%;
    top:${wish.y}%;
    color:${wish.color};
    --pulse:${(Math.random()*3+3).toFixed(1)}s;
    --pdelay:-${(Math.random()*4).toFixed(1)}s;
  `;
  star.innerHTML = `
    <span class="star-glyph">✦</span>
    <span class="wish-label">${escapeHtml(wish.text)}</span>
  `;
  sky.appendChild(star);

  totalWishes++;
  wishCount.textContent = `${totalWishes} wish${totalWishes !== 1 ? 'es' : ''} in the sky`;
}

function launchShootingStar(yPct) {
  const el = document.createElement('div');
  el.className = 'shooting-star';
  el.style.top = `${yPct}%`;
  sky.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

let toastTimer;
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

wishInput.addEventListener('input', () => {
  charCount.textContent = 80 - wishInput.value.length;
});

function sendWish() {
  const text = wishInput.value.trim();
  if (!text) return;
  socket.emit('new-wish', { text });
  wishInput.value = '';
  charCount.textContent = 80;
  showToast('Your wish is rising to the sky ✦');
}

wishBtn.addEventListener('click', sendWish);

wishInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendWish();
  }
});

shootBtn.addEventListener('click', () => {
  socket.emit('shooting-star');
});

// Socket
// load wishes when connected
socket.on('existing-wishes', (wishes) => {
  wishes.forEach(placeWish);
});

// new wish
socket.on('new-wish', (wish) => {
  placeWish(wish);
});

// shooting start trigger
socket.on('shooting-star', (data) => {
  launchShootingStar(data.y);
  showToast('Someone sent a shooting star!');
});

socket.on('connect', () => {
  console.log('Connected to wishing wall');
});

socket.on('disconnect', () => {
  showToast('Lost connection... reconnecting');
});