const CABINET = {
  overlay: null,

  build() {
    const grid = document.getElementById('cabinet-grid');
    if (!grid) return;
    grid.innerHTML = '';
    CONTENT.drawers.forEach(d => {
      const el = document.createElement('button');
      el.className = 'drawer' + (d.locked ? ' locked' : '');
      el.type = 'button';
      el.setAttribute('aria-label', d.name);
      el.innerHTML = `<div class="drawer-pull"></div><div class="drawer-name">${d.name}</div>`;
      el.addEventListener('click', () => this.open(d.id));
      grid.appendChild(el);
    });
  },

  init() {
    this.overlay = document.getElementById('modal-overlay');
    if (this.overlay) {
      this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });
    }
    document.getElementById('modal-close')?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
  },

  open(id) {
    const d = CONTENT.drawers.find(x => x.id === id);
    if (!d) return;
    const title = document.getElementById('modal-title');
    const body  = document.getElementById('modal-body');
    const count = document.getElementById('modal-counter');
    title.textContent = d.name;

    if (d.locked) {
      STATE.letterClicks++;
      if (STATE.letterClicks < 3) {
        const left = 3 - STATE.letterClicks;
        body.className = 'modal-body lock';
        body.textContent = '🔒';
        count.style.display = 'block';
        count.textContent = `Click ${left} more time${left > 1 ? 's' : ''} to open`;
      } else {
        STATE.letterClicks = 0;
        body.className = 'modal-body';
        body.innerHTML = d.unlocked.replace(/\n/g, '<br>');
        count.style.display = 'none';
      }
    } else if (d.id === 'empty-drawer' && typeof NOTES !== 'undefined') {
      NOTES.render(body, d.body);
      count.style.display = 'none';
    } else {
      body.className = 'modal-body';
      body.innerHTML = d.body.replace(/\n/g, '<br>');
      count.style.display = 'none';
    }
    this.overlay.classList.add('open');
  },

  close() { this.overlay?.classList.remove('open'); },
};
