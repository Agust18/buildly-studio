// ── NAV SCROLL ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── HAMBURGER MENU ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── TYPEWRITER ──
const words = ['convierten', 'conquistan', 'enamoran', 'venden'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const target = document.getElementById('typewriter-text');
const cursor = document.querySelector('.typewriter-cursor');

function typewriter() {
  if (!target) return;
  const current = words[wordIndex];

  if (!deleting) {
    target.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typewriter, 1800);
      return;
    }
  } else {
    target.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typewriter, deleting ? 60 : 100);
}

typewriter();

// ── PARALLAX HERO ──
const heroBefore = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!heroBefore) return;
  const scrolled = window.scrollY;
  heroBefore.style.setProperty('--parallax-y', `${scrolled * 0.4}px`);
}, { passive: true });

// ── CURSOR PERSONALIZADO (solo desktop) ──
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .servicio-card, .feature-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

// ── CARD TILT (hover 3D sutil) ──
document.querySelectorAll('.servicio-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});