/* =====================================================================
   AGENTIC AI AUTOMATION — site behaviour.
   Vanilla, no dependencies, deferred. Every effect is guarded so a page
   that lacks the element simply skips it (the same file ships on all 8
   pages). All motion collapses under prefers-reduced-motion.
   ===================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. hero terminal typing ---------------------------------- */
  (function () {
    var el = document.getElementById('typed');
    if (!el) return;
    var lines = [
      'WhatsApp enquiries — answering now',
      'invoices & KYC packets — extracting',
      'n8n workflows — running self-hosted',
      'UiPath bots — watching for failures',
      'CRM records — writing back, validated'
    ];
    if (reduced) { el.textContent = lines[0]; return; }

    var caret = document.createElement('span');
    caret.className = 'caret';
    var i = 0, c = 0, del = false;

    function tick() {
      var w = lines[i];
      if (!del) {
        c++;
        el.textContent = w.slice(0, c);
        el.appendChild(caret);
        if (c >= w.length) { del = true; setTimeout(tick, 1600); return; }
        setTimeout(tick, 40);
      } else {
        c--;
        el.textContent = w.slice(0, c);
        el.appendChild(caret);
        if (c <= 0) { del = false; i = (i + 1) % lines.length; setTimeout(tick, 320); return; }
        setTimeout(tick, 18);
      }
    }
    tick();
  })();

  /* ---- 2. self-check tally --------------------------------------- */
  (function () {
    var grid = document.getElementById('leakGrid'),
        out  = document.getElementById('leakCount'),
        say  = document.getElementById('leakSay');
    if (!grid || !out || !say) return;

    var msgs = [
      'Tick the ones you recognise. <b>Every box is a process we have automated before.</b>',
      'One is enough to be worth forty-five minutes. <b>It rarely stays at one.</b>',
      'Two. <b>These two usually share a single root cause.</b>',
      'Three. <b>This is the point where hiring stops fixing it.</b>',
      'Four. <b>Most of a person’s week is going on work an agent can do.</b>',
      'Five. <b>Every one of these is on our standard automation list.</b>',
      'Six. <b>Start with whichever one costs you the most — not all of them at once.</b>',
      'Seven. <b>We would scope this as a department build, not a single process.</b>',
      'All eight. <b>Bring the worst one to the audit call and we will map it live.</b>'
    ];

    function update() {
      var n = grid.querySelectorAll('.leak[aria-pressed="true"]').length;
      out.textContent = n;
      say.innerHTML = msgs[n];
    }

    Array.prototype.forEach.call(grid.querySelectorAll('.leak'), function (b) {
      b.addEventListener('click', function () {
        b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        update();
      });
    });
    update();
  })();

  /* ---- 3. macOS-style dock magnification -------------------------
     Pointer-driven scale falloff. Only on fine pointers at >=768px,
     which is exactly where the CSS enables the transform. Touch and
     reduced-motion users get the plain wrapped grid. */
  (function () {
    var dock = document.getElementById('socialDock');
    if (!dock) return;

    var items = Array.prototype.slice.call(dock.querySelectorAll('.dock-item'));
    var fine  = window.matchMedia('(pointer:fine)').matches;
    var wide  = window.matchMedia('(min-width:768px)').matches;

    function setAll(v) {
      items.forEach(function (it) { it.style.setProperty('--s', v); });
    }

    if (fine && wide && !reduced) {
      var raf = null, lastX = 0;
      function apply() {
        raf = null;
        // amp 0.95 / sigma 78 ballooned the hovered icon to ~1.95x, which the
        // owner flagged as oversized. 0.5 / 52 gives a ~1.5x lift with a
        // tighter falloff, closer to the real macOS Dock.
        var amp = 0.5, sigma = 52;
        items.forEach(function (it) {
          var r = it.getBoundingClientRect();
          var c = r.left + r.width / 2;
          var d = lastX - c;
          var s = 1 + amp * Math.exp(-(d * d) / (2 * sigma * sigma));
          it.style.setProperty('--s', s.toFixed(3));
        });
      }
      dock.addEventListener('pointermove', function (e) {
        lastX = e.clientX;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      dock.addEventListener('pointerleave', function () {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        setAll(1);
      });
    }

    items.forEach(function (it) {
      it.addEventListener('click', function () {
        it.classList.remove('bounce');
        void it.offsetWidth;
        it.classList.add('bounce');
      });
      it.addEventListener('animationend', function () { it.classList.remove('bounce'); });
    });
  })();

  /* ---- 4. WhatsApp shutter --------------------------------------- */
  (function () {
    var sh = document.getElementById('waShutter'),
        h  = document.getElementById('waHandle');
    if (!sh || !h) return;

    function set(open) {
      sh.classList.toggle('open', open);
      h.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    h.addEventListener('click', function () {
      set(!sh.classList.contains('open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sh.classList.contains('open')) { set(false); h.focus(); }
    });
  })();

  /* ---- 5. scroll reveal ------------------------------------------ */
  (function () {
    var items = document.querySelectorAll('.rv');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('on'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  })();


  /* ---- 6. measurement hooks --------------------------------------
     The four events from docs/07 Part 2. They push into dataLayer and
     go nowhere until GA4_ID is set in .env and the tag is installed —
     no ID is guessed here. Once the tag exists these start reporting
     with no further change, so the wiring is done and waiting.

       whatsapp_click  any wa.me link            the main conversion
       audit_booked    the Calendly link         the actual pipeline
       selfcheck_used  a yellow-band box ticked  which pain resonates
       pricing_viewed  pricing 50% visible, 2s   browsers vs buyers
     ------------------------------------------------------------- */
  (function () {
    window.dataLayer = window.dataLayer || [];

    // Market dimension, so conversions can be sliced per country once the
    // country pages exist. Driven by <body data-market="..."> and defaulting
    // to india, which is the base site. Pushed on every page load, homepage
    // included, so the dimension is never absent from a session.
    var market = (document.body && document.body.getAttribute("data-market")) || "india";
    try { window.dataLayer.push({ page_market: market }); } catch (e) {}

    function track(name, params) {
      try {
        window.dataLayer.push(Object.assign({ event: name, page_market: market }, params || {}));
        if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
      } catch (e) { /* measurement must never break the page */ }
    }

    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('wa.me') !== -1) {
        track('whatsapp_click', { link_url: href, link_text: (a.textContent || '').trim().slice(0, 80) });
      } else if (href.indexOf('calendly.com') !== -1) {
        track('audit_booked', { link_url: href });
      }
    }, true);

    var grid = document.getElementById('leakGrid');
    if (grid) {
      var reported = false;
      grid.addEventListener('click', function () {
        var n = grid.querySelectorAll('.leak[aria-pressed="true"]').length;
        if (!reported && n > 0) { reported = true; }
        track('selfcheck_used', { boxes_ticked: n });
      });
    }

    var pricing = document.getElementById('pricing');
    if (pricing && 'IntersectionObserver' in window) {
      var timer = null, done = false;
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (done) return;
          if (en.isIntersecting && en.intersectionRatio >= 0.5) {
            if (!timer) timer = setTimeout(function () {
              done = true; track('pricing_viewed', {}); io2.disconnect();
            }, 2000);
          } else if (timer) { clearTimeout(timer); timer = null; }
        });
      }, { threshold: [0.5] });
      io2.observe(pricing);
    }
  })();

})();
