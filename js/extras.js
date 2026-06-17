/* Small personal touches: a days-counter, a welcome-back / monthsary note,
   gentle cursor parallax, and a desk-lamp glow that follows the cursor at night. */
const EXTRAS = {
  daysTogether() {
    if (!CONFIG.TOGETHER_SINCE) return null;
    const ms = Date.now() - CONFIG.TOGETHER_SINCE.getTime();
    if (ms < 0) return null;
    return Math.floor(ms / 864e5) + 1; // the first day counts as day 1
  },

  isAnniversaryToday() {
    return CONFIG.ANNIVERSARY_DAY && new Date().getDate() === CONFIG.ANNIVERSARY_DAY;
  },

  openingNote(returning) {
    const el = document.getElementById('opening-note');
    if (!el) return;
    const n = this.daysTogether();
    let msg = '';
    if (this.isAnniversaryToday())      msg = n ? `happy monthsary ♥  ·  day ${n} of us` : 'happy monthsary ♥';
    else if (returning)                 msg = 'welcome back ♥';
    else if (CONFIG.SHOW_DAY_COUNTER && n) msg = `day ${n} of us ♥`;
    if (msg) { el.textContent = msg; requestAnimationFrame(() => el.classList.add('show')); }
  },

  rooftopCounter() {
    const el = document.getElementById('roof-days');
    if (!el) return;
    const n = this.daysTogether();
    if (CONFIG.SHOW_DAY_COUNTER && n) el.textContent = String(n);
    else el.closest('.board-row')?.remove();
  },

  pointerEffects() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const lamp = document.getElementById('lamp');
    const root = document.documentElement;
    let raf = null, mx = 0.5, my = 0.5, ex = 0, ey = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX / innerWidth; my = e.clientY / innerHeight; ex = e.clientX; ey = e.clientY;
      if (lamp) { lamp.style.setProperty('--lx', ex + 'px'); lamp.style.setProperty('--ly', ey + 'px'); }
      if (!raf) raf = requestAnimationFrame(() => {
        root.style.setProperty('--par-x', ((mx - 0.5) * 10).toFixed(2) + 'px');
        root.style.setProperty('--par-y', ((my - 0.5) * 8).toFixed(2) + 'px');
        raf = null;
      });
    }, { passive: true });
  },

  init(returning) {
    this.openingNote(returning);
    this.rooftopCounter();
    this.pointerEffects();
  },
};
