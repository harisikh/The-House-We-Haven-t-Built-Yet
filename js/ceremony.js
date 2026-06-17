/* A one-time opening sequence the very first time the house is opened.
   Subsequent visits skip straight in. */
const CEREMONY = {
  KEY: 'opened',

  shouldRun() { return STORE.get(this.KEY, '0') !== '1'; },

  run(done) {
    const el = document.getElementById('ceremony');
    if (!el) { done && done(); return; }
    el.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => el.classList.add('run'));

    const finish = () => {
      if (el.classList.contains('done')) return;
      STORE.set(this.KEY, '1');
      el.classList.add('done');
      setTimeout(() => { el.style.display = 'none'; done && done(); }, 1000);
    };

    document.getElementById('cer-skip')?.addEventListener('click', finish);
    setTimeout(finish, 3600);
  },

  skipInstantly() {
    const el = document.getElementById('ceremony');
    if (el) el.style.display = 'none';
  },
};
