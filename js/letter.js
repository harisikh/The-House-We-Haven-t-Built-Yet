const LETTER = {
  init() {
    const env = document.getElementById('envelope');
    if (env && !env.dataset.bound) {
      env.dataset.bound = '1';
      env.addEventListener('click', () => this.open());
    }
  },

  open() {
    const env  = document.getElementById('envelope');
    const hint = document.getElementById('env-hint');
    const paper= document.getElementById('letter-paper');
    if (!env || env.classList.contains('open')) return;
    env.classList.add('open');
    if (hint) hint.style.opacity = '0';
    setTimeout(() => { paper?.classList.add('show'); this.typeIn(); }, 520);
  },

  // the letter writes itself in, line by line, with little pauses
  typeIn() {
    const lines = [...document.querySelectorAll('#letter-body .lw')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { lines.forEach(l => l.classList.add('show')); return; }
    let t = 250;
    lines.forEach(ln => {
      const gap = ln.classList.contains('gap') || ln.classList.contains('gap-sm');
      setTimeout(() => ln.classList.add('show'), t);
      t += gap ? 70 : 330;
    });
  },

  reset() {
    const env  = document.getElementById('envelope');
    const hint = document.getElementById('env-hint');
    const paper= document.getElementById('letter-paper');
    env?.classList.remove('open');
    paper?.classList.remove('show');
    if (hint) hint.style.opacity = '';
    document.querySelectorAll('#letter-body .lw').forEach(l => l.classList.remove('show'));
  },
};
