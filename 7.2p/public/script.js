const socket = io();
const sky       = document.getElementById('sky');
const wishInput = document.getElementById('wish-input');
const wishBtn   = document.getElementById('wish-btn');
const charCount = document.getElementById('char-count');
const wishCount = document.getElementById('wish-count');

let totalWishes = 0;

function placeWish(wish) {
  const star = document.createElement('div');
  star.className = `wish-star ${wish.size}`;
  star.style.cssText = `
    left:${wish.x}%;
    top:${wish.y}%;
    color:${wish.color};
  `;
  star.innerHTML = `<span class="star-dot"></span>`;
  sky.appendChild(star);

  totalWishes++;
  wishCount.textContent = `${totalWishes} wish${totalWishes !== 1 ? 'es' : ''}`;
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
}

wishBtn.addEventListener('click', sendWish);

wishInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendWish();
  }
});

socket.on('existing-wishes', (wishes) => {
  wishes.forEach(placeWish);
});

socket.on('new-wish', (wish) => {
  placeWish(wish);
});

socket.on('connect', () => {
  console.log('Connected to wishing wall');
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});