/* ═══════════════════════════════════════════════════════════════
   ANIMATED DOCK MENU  —  dock-menu.js
   <script src="dock-menu.js"></script>  (before </body>)
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Magnification config ──────────────────────────────────────────────────
     Radius = how many neighbours feel the pull.
     You can override per dock:  data-radius="2"
  ─────────────────────────────────────────────────────────────────────────── */
  const DEFAULT_RADIUS = 2;   // items to each side that grow

  /* ── Init every .dock-wrap on the page ─────────────────────────────────── */
  function initDocks() {
    document.querySelectorAll('.dock-wrap').forEach(dock => {
      const items   = Array.from(dock.querySelectorAll('.dock-item'));
      const radius  = parseInt(dock.dataset.radius ?? DEFAULT_RADIUS);

      /* ── Inject tooltip & ripple wrappers if not present ─────────────── */
      items.forEach(item => {
        const pill = item.querySelector('.dock-icon');

        // Tooltip
        if (item.dataset.label && !item.querySelector('.dock-tooltip')) {
          const tip = document.createElement('div');
          tip.className = 'dock-tooltip';
          tip.textContent = item.dataset.label;
          item.appendChild(tip);
        }

        // Ripple wrapper
        if (pill && !pill.querySelector('.dock-ripple')) {
          const rw = document.createElement('div');
          rw.className = 'dock-ripple';
          pill.appendChild(rw);
        }

        // Active dot
        if (!item.querySelector('.dock-dot')) {
          const dot = document.createElement('span');
          dot.className = 'dock-dot';
          item.appendChild(dot);
        }
      });

      /* ── Mouse move over dock ─────────────────────────────────────────── */
      dock.addEventListener('mousemove', e => {
        const hoveredItem = e.target.closest('.dock-item');
        if (!hoveredItem) return;

        const hovIdx = items.indexOf(hoveredItem);
        if (hovIdx === -1) return;

        items.forEach((item, i) => {
          const dist = Math.abs(i - hovIdx);

          item.classList.remove('is-center', 'is-near');

          if (dist === 0) {
            item.classList.add('is-center');
          } else if (dist <= radius) {
            item.classList.add('is-near');
            // Proportional scale via CSS variable — fades with distance
            const ratio = 1 - dist / (radius + 1);
            item.style.setProperty('--near-scale', ratio.toFixed(3));
          } else {
            item.style.removeProperty('--near-scale');
          }
        });
      });

      /* ── Mouse leave ──────────────────────────────────────────────────── */
      dock.addEventListener('mouseleave', () => {
        items.forEach(item => {
          item.classList.remove('is-center', 'is-near');
          item.style.removeProperty('--near-scale');
        });
      });

      /* ── Click ────────────────────────────────────────────────────────── */
      items.forEach(item => {
        item.addEventListener('click', e => {

          /* ripple */
          const rw = item.querySelector('.dock-ripple');
          if (rw) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const dot = document.createElement('div');
            dot.className = 'dock-ripple-dot';
            dot.style.cssText = `width:50px;height:50px;left:${x-25}px;top:${y-25}px;`;
            rw.appendChild(dot);
            setTimeout(() => dot.remove(), 520);
          }

          /* bounce */
          item.classList.add('is-bounce');
          item.addEventListener('animationend', () => item.classList.remove('is-bounce'), { once: true });

          /* active */
          items.forEach(el => el.classList.remove('is-active'));
          item.classList.add('is-active');

          /* custom event */
          item.dispatchEvent(new CustomEvent('dock:select', {
            bubbles: true,
            detail: { label: item.dataset.label, item }
          }));
        });
      });
    });
  }

  /* ── Proportional near scaling (progressive between base and max) ────────
     CSS alone can't tween between two custom properties proportionally,
     so we update width/height inline for .is-near items based on --near-scale.
  ─────────────────────────────────────────────────────────────────────────── */
  function applyNearScale() {
    document.querySelectorAll('.dock-item.is-near').forEach(item => {
      const ratio = parseFloat(item.style.getPropertyValue('--near-scale') || 0);
      const base  = parseFloat(getComputedStyle(item).getPropertyValue('--dock-item-size')) || 52;
      const max   = parseFloat(getComputedStyle(item).getPropertyValue('--dock-item-max'))  || 82;
      const size  = base + (max - base) * ratio * 0.65;
      item.style.width  = size + 'px';
      item.style.height = size + 'px';
      item.style.transform = `translateY(${-ratio * 3}px)`;
    });
    requestAnimationFrame(applyNearScale);
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  function boot() {
    initDocks();
    applyNearScale();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
