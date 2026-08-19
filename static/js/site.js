/* Agentic AI Automation — site behaviour.
 *
 * This file replaces animations.js, network.js, calculator.js and main.js
 * (~22 KB combined). Everything they did was decoration: a particle canvas,
 * scroll-triggered fades, animated counters, an exit-intent popup and a
 * "limited availability" bar. All of it cost LCP/INP and none of it sold
 * anything, so it is gone.
 *
 * What is left is the one thing that genuinely needs JavaScript: the mobile
 * nav. Everything else — the FAQ accordion, smooth scrolling, sticky header —
 * is handled by <details>, CSS scroll-behavior and position:sticky.
 */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setOpen(!links.classList.contains('is-open'));
  });

  // Escape closes the menu and returns focus to the control that opened it.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && links.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset the open state when the viewport grows past the mobile breakpoint,
  // otherwise the menu stays stuck open behind a desktop layout.
  var wide = window.matchMedia('(min-width: 901px)');
  wide.addEventListener('change', function (event) {
    if (event.matches) setOpen(false);
  });
})();
