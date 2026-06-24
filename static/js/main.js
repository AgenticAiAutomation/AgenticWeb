// ─── URGENCY BAR CLOSE ────────────────────────────────────────
const urgencyClose = document.getElementById('urgencyClose');
const urgencyBar = document.getElementById('urgencyBar');
if (urgencyClose && urgencyBar) {
  urgencyClose.addEventListener('click', () => {
    urgencyBar.style.display = 'none';
    sessionStorage.setItem('urgencyDismissed', '1');
  });
  if (sessionStorage.getItem('urgencyDismissed')) {
    urgencyBar.style.display = 'none';
  }
}

// ─── NAVBAR SCROLL ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── HAMBURGER ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mob-link, .mob-ctas a').forEach(el => {
  el.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
  });
});

// ─── SMOOTH SCROLL WITH OFFSET ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ─── FAQ ACCORDION ────────────────────────────────────────────
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-btn').setAttribute('aria-expanded', false);
    });
    if (!isOpen) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', true);
    }
  });
});

// ─── SCROLL ANIMATIONS ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.svc-card, .pain-card, .why-card, .step, .faq-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ─── STICKY MOBILE CTA — HIDE IN HERO ─────────────────────────
const stickyMob = document.getElementById('stickyMob');
const heroSection = document.getElementById('hero');
if (stickyMob && heroSection) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    stickyMob.style.opacity = entry.isIntersecting ? '0' : '1';
    stickyMob.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
  }, { threshold: 0.3 });
  heroObserver.observe(heroSection);
}
