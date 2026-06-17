/* Tracks which rooms have been seen, marks them on the plan,
   and unlocks a quiet completion state once all are visited. */
const PROGRESS = {
  ROOMS: ['living-room','kitchen','dining-table','balcony','study',
          'camera-corner','hallway','cabinet','bedroom','rooftop',
          'entryway','reading-nook','garden','wardrobe','bathroom'],
  visited: new Set(),
  complete: false,

  load() {
    const arr = STORE.getJSON('visited', []);
    this.visited = new Set(arr.filter(r => this.ROOMS.includes(r)));
    this.complete = STORE.get('complete', '0') === '1';
  },

  mark(room) {
    if (!this.ROOMS.includes(room)) return;
    if (!this.visited.has(room)) {
      this.visited.add(room);
      STORE.setJSON('visited', [...this.visited]);
    }
    this.render();
    if (this.visited.size === this.ROOMS.length && !this.complete) {
      this.onComplete();
    }
  },

  // add a small terracotta ✓ into each visited room node on the plan
  render() {
    document.querySelectorAll('.room-node[data-room]').forEach(node => {
      const room = node.getAttribute('data-room');
      const seen = this.visited.has(room);
      node.classList.toggle('visited', seen);
      if (seen && !node.querySelector('.rn-check')) {
        const rect = node.querySelector('.rn-fill');
        if (!rect) return;
        const x = parseFloat(rect.getAttribute('x')) + 14;
        const y = parseFloat(rect.getAttribute('y')) + 26;
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('class', 'rn-check');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.textContent = '✓';
        node.appendChild(t);
      }
    });
    // progress meter
    const n = this.visited.size, total = this.ROOMS.length;
    const txt = document.getElementById('bp-progress-text');
    const bar = document.getElementById('bp-progress-bar');
    const wrap = document.getElementById('bp-progress');
    if (txt) txt.textContent = (n >= total) ? 'Every room seen ♥' : `${n} of ${total} rooms seen`;
    if (bar) bar.style.width = (n / total * 100) + '%';
    if (wrap) wrap.classList.toggle('complete', n >= total);
  },

  onComplete() {
    this.complete = true;
    STORE.set('complete', '1');
    const plan = document.querySelector('.house-plan');
    if (plan) plan.classList.add('complete');
    const status = document.getElementById('tb-status');
    if (status) status.textContent = 'Under Construction';
    this.render();
    this.sparkle();
  },

  // a soft scatter of sketched sparkles when the plan is finished
  sparkle() {
    const svg = document.querySelector('.house-plan');
    if (!svg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const NS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 14; i++) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('class', 'bp-spark');
      t.setAttribute('x', (60 + Math.random() * 640).toFixed(0));
      t.setAttribute('y', (80 + Math.random() * 400).toFixed(0));
      t.textContent = '✦';
      t.style.animationDelay = (Math.random() * 0.8).toFixed(2) + 's';
      svg.appendChild(t);
      setTimeout(() => t.remove(), 2800);
    }
  },

  // re-apply persisted state whenever the blueprint is shown
  refresh() {
    this.render();
    if (this.complete) {
      const plan = document.querySelector('.house-plan');
      if (plan) plan.classList.add('complete');
      const status = document.getElementById('tb-status');
      if (status) status.textContent = 'Under Construction';
    }
  },
};
