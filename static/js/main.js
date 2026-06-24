/* ═══════════════════════════════════════════════════════════
   AGENTIC AI AUTOMATION — main.js
═══════════════════════════════════════════════════════════ */

/* ── Nav scroll ─────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile nav ─────────────────────────────────────────── */
(function () {
  const btn    = document.getElementById('navHamburger');
  const mobile = document.getElementById('navMobile');
  if (!btn || !mobile) return;
  btn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
})();

/* ── Scroll reveal (IntersectionObserver) ───────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── Hero typewriter sequence ───────────────────────────── */
(function () {
  const seqEl   = document.getElementById('heroSequence');
  const lineEl  = document.getElementById('heroSeqLine');
  const mainEl  = document.getElementById('heroMain');
  const scrollEl = document.getElementById('heroScrollHint');
  if (!seqEl || !lineEl || !mainEl) return;

  const lines = [
    { text: 'YOUR COMPANY HAS A HIDDEN WORKFORCE.', hold: 2400 },
    { text: 'THEY NEVER SLEEP.',                    hold: 1800 },
    { text: 'THEY NEVER MISS A FOLLOW-UP.',         hold: 1800 },
    { text: 'THEY NEVER ASK FOR LEAVE.',            hold: 1800 },
    { text: 'THEY WORK 24/7.',                      hold: 2200 },
  ];

  let i = 0;
  function next() {
    if (i >= lines.length) {
      seqEl.style.opacity = '0';
      seqEl.style.transition = 'opacity 0.8s';
      setTimeout(() => {
        seqEl.style.display = 'none';
        mainEl.classList.add('show');
        if (scrollEl) scrollEl.classList.add('show');
      }, 800);
      return;
    }
    lineEl.classList.remove('show');
    setTimeout(() => {
      lineEl.textContent = lines[i].text;
      lineEl.classList.add('show');
      setTimeout(() => { i++; next(); }, lines[i - 1]?.hold || 1800);
    }, 400);
  }

  setTimeout(next, 600);
})();

/* ── Chaos counters ─────────────────────────────────────── */
(function () {
  const cards = document.querySelectorAll('.chaos-number');
  if (!cards.length) return;

  function animCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(c => io.observe(c));
})();

/* ── Shift flow items ───────────────────────────────────── */
(function () {
  const section = document.getElementById('chapterShift');
  if (!section) return;
  const items = section.querySelectorAll('.flow-item');
  let fired = false;

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      items.forEach((el, i) => setTimeout(() => el.classList.add('lit'), 600 + i * 500));
    }
  }, { threshold: 0.4 });
  io.observe(section);
})();

/* ── Command center ─────────────────────────────────────── */
(function () {
  const agents = document.querySelectorAll('.cc-agent');
  const panel  = document.getElementById('ccPanel');
  const stories = document.querySelectorAll('.cc-story');
  const def    = document.getElementById('ccDefault');
  if (!agents.length || !panel) return;

  agents.forEach(agent => {
    agent.addEventListener('click', () => {
      const id = agent.dataset.agent;
      agents.forEach(a => a.classList.remove('active'));
      agent.classList.add('active');
      stories.forEach(s => s.classList.remove('active'));
      const story = document.getElementById('story-' + id);
      if (story) story.classList.add('active');
      if (def) def.style.display = 'none';
    });
  });
})();

/* ── Industry tabs ──────────────────────────────────────── */
(function () {
  const tabs   = document.querySelectorAll('.industry-tab');
  const panels = document.querySelectorAll('.industry-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.industry;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('industry-' + id);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ── ROI Calculator ─────────────────────────────────────── */
(function () {
  const form = document.getElementById('roiForm');
  if (!form) return;

  const valEls = {
    savings:     document.getElementById('roiSavings'),
    hours:       document.getElementById('roiHours'),
    agents:      document.getElementById('roiAgents'),
    productivity: document.getElementById('roiProductivity'),
  };

  function fmt(n) {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(1) + 'Cr';
    if (n >= 100000)   return '₹' + (n / 100000).toFixed(1) + 'L';
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function animNum(el, target, prefix, suffix, isCurrency) {
    if (!el) return;
    const duration = 1200;
    const start = performance.now();
    const startVal = parseFloat(el.dataset.current || '0') || 0;
    el.dataset.current = target;
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = startVal + (target - startVal) * ease;
      el.textContent = isCurrency ? fmt(val) : prefix + Math.round(val).toLocaleString('en-IN') + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function calculate() {
    const emp     = Math.max(1, parseInt(form.employees?.value) || 5);
    const salary  = Math.max(1000, parseInt(form.salary?.value) || 30000);
    const hours   = Math.max(1, parseFloat(form.hours?.value) || 15);
    const procs   = Math.max(1, parseInt(form.processes?.value) || 5);

    const annualSalary   = emp * salary * 12;
    const wastedFraction = hours / 200;
    const wastedCost     = annualSalary * wastedFraction;
    const savings        = wastedCost * 0.68;
    const hoursPerYear   = emp * hours * 50;
    const agentsNeeded   = Math.ceil(procs / 3);
    const productivity   = Math.round(wastedFraction * 65);

    animNum(valEls.savings,      savings,      '', '', true);
    animNum(valEls.hours,        hoursPerYear, '', ' hrs', false);
    animNum(valEls.agents,       agentsNeeded, '', ' agents', false);
    animNum(valEls.productivity, productivity, '', '%', false);
  }

  form.addEventListener('input', calculate);
  calculate();
})();

/* ── FAQ accordion ──────────────────────────────────────── */
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ── Smooth anchor scroll ───────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      const mobile = document.getElementById('navMobile');
      const btn = document.getElementById('navHamburger');
      if (mobile?.classList.contains('open')) {
        mobile.classList.remove('open');
        btn?.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
})();

/* ── Number counter for hero stats ─────────────────────── */
(function () {
  const stats = document.querySelectorAll('.hero-stat strong[data-count]');
  if (!stats.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let start = performance.now();
        function step(now) {
          const t = Math.min((now - start) / 1500, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = prefix + Math.round(ease * target) + suffix;
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = prefix + target + suffix;
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(el => io.observe(el));
})();
