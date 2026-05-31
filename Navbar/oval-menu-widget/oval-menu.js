/* ═══════════════════════════════════════════════════════════════
   OVAL MENU WIDGET  —  oval-menu.js
   نحوه استفاده: قبل از </body> اضافه کنید
   <script src="oval-menu.js"></script>
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Palette per item (can override via data-palette="0..7") ─────────────────
  const PALETTES = [
    ['#ff416c','#ff9a3c','#ffd700','#00e87a'],  // 0 – fire
    ['#00c6ff','#0072ff','#7c3aed','#e91e63'],  // 1 – cool neon
    ['#f7971e','#ffd200','#ff5858','#ff3cac'],  // 2 – sunset
    ['#00f2fe','#4facfe','#a78bfa','#fbc2eb'],  // 3 – sky
    ['#43e97b','#38f9d7','#00c6ff','#4facfe'],  // 4 – nature
    ['#fa709a','#fee140','#f9a825','#ff6b6b'],  // 5 – candy
    ['#c471f5','#fa71cd','#ff9a9e','#fad0c4'],  // 6 – rose
    ['#d4fc79','#96e6a1','#43e97b','#00c6ff'],  // 7 – lime
  ];

  // ── Hex → rgb ───────────────────────────────────────────────────────────────
  function hexRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }

  function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
  }

  function lerpColor(c1, c2, t) {
    const a = hexRgb(c1), b = hexRgb(c2);
    return `rgb(${lerp(a[0],b[0],t)},${lerp(a[1],b[1],t)},${lerp(a[2],b[2],t)})`;
  }

  // ── Draw one frame of the spinning oval border ──────────────────────────────
  function drawBorder(canvas, colors, angle) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const rx = W / 2 - 3;
    const ry = H / 2 - 3;
    const cx = W / 2, cy = H / 2;
    const STEPS = 220;
    const LW = 2.8;

    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = LW;
    ctx.lineCap = 'round';

    for (let i = 0; i < STEPS; i++) {
      const t0 = i / STEPS;
      const t1 = (i + 1) / STEPS;
      const a0 = t0 * Math.PI * 2;
      const a1 = t1 * Math.PI * 2;

      // Color position shifts with rotation angle
      const huePos = ((t0 + angle / (Math.PI * 2)) % 1) * colors.length;
      const ci = Math.floor(huePos) % colors.length;
      const cf = huePos - Math.floor(huePos);
      const color = lerpColor(colors[ci], colors[(ci + 1) % colors.length], cf);

      // Opacity: fade the trailing quarter
      const opacity = 0.4 + 0.6 * Math.pow((t0 + angle/(Math.PI*2)) % 1, 0.5);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.shadowBlur  = 10;
      ctx.shadowColor = color;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, a0, a1);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ── Resize canvas to match pill ─────────────────────────────────────────────
  function sizeCanvas(canvas, pill) {
    const r = pill.getBoundingClientRect();
    const w = Math.round(r.width  + 10);
    const h = Math.round(r.height + 10);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
    }
  }

  // ── Ripple on click ─────────────────────────────────────────────────────────
  function spawnRipple(pill, e) {
    const rippleWrap = pill.querySelector('.om-ripple');
    if (!rippleWrap) return;
    const rect = pill.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = document.createElement('div');
    dot.className = 'om-ripple-dot';
    dot.style.cssText = `width:60px;height:60px;left:${x-30}px;top:${y-30}px;`;
    rippleWrap.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }

  // ── Init all items ──────────────────────────────────────────────────────────
  function initMenu() {
    document.querySelectorAll('.om-sidebar .om-item').forEach(item => {
      const pi     = parseInt(item.dataset.palette ?? item.dataset.p ?? 0);
      const colors = PALETTES[pi % PALETTES.length];
      const pill   = item.querySelector('.om-pill');
      const canvas = item.querySelector('canvas');
      if (!pill || !canvas) return;

      // Ensure ripple wrapper exists
      if (!pill.querySelector('.om-ripple')) {
        const rw = document.createElement('div');
        rw.className = 'om-ripple';
        pill.appendChild(rw);
      }

      const state = { angle: 0, raf: null, spinning: false };

      function tick() {
        state.angle += parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--om-speed') || '0.03'
        );
        sizeCanvas(canvas, pill);
        drawBorder(canvas, colors, state.angle);
        if (state.spinning) state.raf = requestAnimationFrame(tick);
        else state.raf = null;
      }

      function startSpin() {
        state.spinning = true;
        if (!state.raf) tick();
      }

      function stopSpin() {
        if (!item.classList.contains('is-active')) {
          state.spinning = false;
        }
      }

      item.addEventListener('mouseenter', startSpin);
      item.addEventListener('mouseleave', stopSpin);

      item.addEventListener('click', e => {
        // Ripple
        spawnRipple(pill, e);

        // Deactivate siblings
        item.closest('.om-sidebar')
          .querySelectorAll('.om-item')
          .forEach(el => el.classList.remove('is-active'));

        // Activate this one
        item.classList.add('is-active');
        startSpin();

        // Dispatch custom event (for SPA routing etc.)
        item.dispatchEvent(new CustomEvent('om:select', {
          bubbles: true,
          detail: { page: item.dataset.page, item }
        }));
      });

      // Auto-start if already active
      if (item.classList.contains('is-active')) {
        sizeCanvas(canvas, pill);
        startSpin();
      }
    });

    // Re-size on window resize
    window.addEventListener('resize', () => {
      document.querySelectorAll('.om-sidebar .om-item canvas').forEach(canvas => {
        const pill = canvas.closest('.om-pill');
        if (pill) sizeCanvas(canvas, pill);
      });
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
