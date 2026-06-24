/* ═══════════════════════════════════════════════════════════
   PARTICLE NETWORK — canvas animation for hero section
═══════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const TEAL   = [0, 245, 212];
  const VIOLET = [110, 68, 255];
  const MAX_DIST  = 140;
  const MOUSE_DIST = 110;

  let W, H, particles = [];
  const mouse = { x: -9999, y: -9999 };
  let raf;

  function isMobile() { return window.innerWidth < 768; }

  function count() {
    return isMobile() ? 40 : Math.min(100, Math.floor(W * H / 9000));
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    build();
  }

  function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

  function build() {
    particles = [];
    const n = count();
    for (let i = 0; i < n; i++) {
      const isNode = i < 7;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * (isNode ? 0.2 : 0.45),
        vy: (Math.random() - 0.5) * (isNode ? 0.2 : 0.45),
        r: isNode ? 2.8 : Math.random() * 1.4 + 0.4,
        base_alpha: isNode ? 0.9 : Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.018,
        isNode,
      });
    }
  }

  function dot(p) {
    const alpha = p.base_alpha * (0.65 + 0.35 * Math.sin(p.phase));
    const r = p.r * (p.isNode ? 1 + 0.25 * Math.sin(p.phase) : 1);

    if (p.isNode) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
      g.addColorStop(0,   rgba(TEAL, alpha * 0.9));
      g.addColorStop(0.4, rgba(TEAL, alpha * 0.2));
      g.addColorStop(1,   rgba(TEAL, 0));
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = p.isNode ? rgba(TEAL, alpha) : rgba(VIOLET, alpha * 0.75);
    ctx.fill();
  }

  function edges() {
    for (let i = 0; i < particles.length - 1; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > MAX_DIST * MAX_DIST) continue;
        const d = Math.sqrt(d2);
        const t = 1 - d / MAX_DIST;
        const nodeLine = a.isNode || b.isNode;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = nodeLine
          ? rgba(TEAL,   t * 0.55)
          : rgba(VIOLET, t * 0.22);
        ctx.lineWidth = nodeLine ? 0.9 : 0.5;
        ctx.stroke();
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.phase += p.speed;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const md2 = dx * dx + dy * dy;
      if (md2 < MOUSE_DIST * MOUSE_DIST) {
        const md = Math.sqrt(md2);
        const f  = ((MOUSE_DIST - md) / MOUSE_DIST) * 0.6;
        p.vx += (dx / md) * f;
        p.vy += (dy / md) * f;
      }

      const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const max = p.isNode ? 0.8 : 1.6;
      if (sp > max) { p.vx = (p.vx / sp) * max; p.vy = (p.vy / sp) * max; }

      dot(p);
    }

    edges();
    raf = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }, { passive: true });

  resize();
  tick();
})();
