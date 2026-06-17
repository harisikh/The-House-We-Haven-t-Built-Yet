const LOCK = {
  isHarisikh() {
    return navigator.userAgent.toLowerCase().includes('harisikh');
  },

  unlocked() {
    if (CONFIG.PREVIEW_MODE) return true;
    return new Date() >= CONFIG.UNLOCK_DATE;
  },

  countdown(el) {
    const tick = () => {
      const diff = CONFIG.UNLOCK_DATE - new Date();
      if (diff <= 0) { el.textContent = '♥️'; return; }
      const d = Math.floor(diff / 864e5);
      const h = Math.floor(diff % 864e5 / 36e5);
      const m = Math.floor(diff % 36e5 / 6e4);
      const s = Math.floor(diff % 6e4 / 1e3);
      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    };
    tick();
    setInterval(tick, 1000);
  },

  init() {
    if (this.unlocked()) return false;

    document.querySelectorAll('.screen, .room-screen')
      .forEach(s => { if (s.id !== 'screen-lock') s.remove(); });
    document.getElementById('sunflower')?.remove();
    document.getElementById('modal-overlay')?.remove();

    const lock = document.getElementById('screen-lock');
    lock.classList.add('active');
    STATE.current = 'lock';

    const cd = document.getElementById('lock-countdown');
    if (cd) this.countdown(cd);

    if (this.isHarisikh()) {
      const msg = document.getElementById('lock-message');
      if (msg) { msg.textContent = 'Nice try.'; msg.style.fontSize = 'var(--t-2xl)'; }
    }
    return true;
  },
};
