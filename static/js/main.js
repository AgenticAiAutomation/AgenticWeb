/* ═══════════════════════════════════════════════════════════════
   MAIN.JS — UI behaviour (nav, urgency bar, exit intent, mobile CTA)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Urgency bar ──────────────────────────────────────────── */
  const urgencyBar   = document.getElementById('urgencyBar');
  const urgencyClose = document.getElementById('urgencyClose');

  if (urgencyBar && urgencyClose) {
    if (sessionStorage.getItem('urgency_dismissed')) {
      urgencyBar.classList.add('hidden');
    }

    urgencyClose.addEventListener('click', function () {
      urgencyBar.classList.add('hidden');
      sessionStorage.setItem('urgency_dismissed', '1');
    });
  }

  /* ── Nav scroll behaviour ─────────────────────────────────── */
  const header = document.getElementById('siteHeader');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile hamburger ─────────────────────────────────────── */
  const hamburger  = document.getElementById('navHamburger');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && navOverlay) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      navOverlay.classList.toggle('visible', isOpen);
      navOverlay.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navOverlay.querySelectorAll('.nav-overlay-link, .nav-overlay-actions .btn').forEach(function (el) {
      el.addEventListener('click', function () {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('visible');
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navOverlay.classList.contains('visible')) {
        hamburger.click();
      }
    });
  }

  /* ── Smooth scroll for anchor links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Sticky mobile CTA ────────────────────────────────────── */
  const stickyMobileCta = document.getElementById('stickyMobileCta');

  if (stickyMobileCta) {
    let heroBottom = 0;

    function getHeroBottom() {
      const hero = document.querySelector('.hero, .page-hero');
      heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 300;
    }

    function onScrollMobileCta() {
      if (window.scrollY > heroBottom) {
        stickyMobileCta.classList.add('visible');
      } else {
        stickyMobileCta.classList.remove('visible');
      }
    }

    window.addEventListener('load', getHeroBottom);
    window.addEventListener('resize', getHeroBottom);
    window.addEventListener('scroll', onScrollMobileCta, { passive: true });
    getHeroBottom();
  }

  /* ── Exit intent banner ──────────────────────────────────── */
  const exitBanner      = document.getElementById('exitBanner');
  const exitBannerClose = document.getElementById('exitBannerClose');

  if (exitBanner && exitBannerClose) {
    let shown = false;

    if (!sessionStorage.getItem('exit_shown')) {
      document.addEventListener('mouseleave', function (e) {
        if (e.clientY < 5 && !shown) {
          shown = true;
          exitBanner.classList.add('visible');
          sessionStorage.setItem('exit_shown', '1');
        }
      });
    }

    exitBannerClose.addEventListener('click', function () {
      exitBanner.classList.remove('visible');
    });
  }

  /* ── FAQ accordion ───────────────────────────────────────── */
  function initFaq() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item   = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  initFaq();

  /* ── Blog tabs ───────────────────────────────────────────── */
  const blogTabs = document.querySelectorAll('.blog-tab');

  if (blogTabs.length) {
    blogTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        blogTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        const cat = tab.dataset.category;
        document.querySelectorAll('.blog-card').forEach(function (card) {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Active nav link ─────────────────────────────────────── */
  (function () {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === path) {
        link.classList.add('active');
      }
    });
  })();

})();
