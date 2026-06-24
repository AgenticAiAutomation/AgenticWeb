/* ═══════════════════════════════════════════════════════════════
   ANIMATIONS.JS — IntersectionObserver: fadeUp, counterUp, progressBar
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Reveal (fadeUp) ─────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Counter Up ──────────────────────────────────────────── */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el, target, duration, prefix, suffix) {
    const start     = performance.now();
    const isDecimal = target % 1 !== 0;

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOutQuart(progress) * target;
      const display  = isDecimal ? value.toFixed(1) : Math.round(value);
      el.textContent = (prefix || '') + display + (suffix || '');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseFloat(el.dataset.target || '0');
        const dur    = parseInt(el.dataset.duration || '2000', 10);
        const pre    = el.dataset.prefix  || '';
        const suf    = el.dataset.suffix  || '';
        animateCounter(el, target, dur, pre, suf);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── Progress Bar Fill ───────────────────────────────────── */
  const progressObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const fill   = entry.target.querySelector('.progress-fill');
        const target = entry.target.dataset.percent || '0';
        if (fill) {
          setTimeout(function () {
            fill.style.width = target + '%';
          }, 100);
        }
        progressObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.progress-track').forEach(function (el) {
    progressObserver.observe(el);
  });

  /* ── Timeline draw ───────────────────────────────────────── */
  const timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.timeline-step').forEach(function (step, i) {
          step.style.opacity    = '0';
          step.style.transform  = 'translateY(20px)';
          step.style.transition = 'opacity 0.6s, transform 0.6s';
          setTimeout(function () {
            step.style.opacity   = '1';
            step.style.transform = 'translateY(0)';
          }, i * 160);
        });
        timelineObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.timeline-track').forEach(function (el) {
    timelineObserver.observe(el);
  });

  /* ── Stagger grid items ──────────────────────────────────── */
  const staggerObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(':scope > *').forEach(function (child, i) {
          child.style.opacity    = '0';
          child.style.transform  = 'translateY(20px)';
          child.style.transition = 'opacity 0.55s, transform 0.55s';
          setTimeout(function () {
            child.style.opacity   = '1';
            child.style.transform = 'translateY(0)';
          }, 60 + i * 80);
        });
        staggerObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-stagger]').forEach(function (el) {
    staggerObserver.observe(el);
  });

})();
