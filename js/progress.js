/* Tracks which rooms have been seen, marks them on the plan,
   and unlocks a quiet completion state once all are visited. */
const PROGRESS = {
  ROOMS: ['entry-foyer','kitchen','dining-table','living-room','balcony','study',
          'camera-corner','hallway','cabinet','reading-nook','washroom','laundry',
          'after-work','rain-room','argument-bench','bedroom','garden','rooftop'],
  visited: new Set(),
  complete: false,
  celebrated: false,
  pendingHighlight: null,
  _winMapped: false,

  load() {
    const arr = STORE.getJSON('visited', []);
    this.visited = new Set(arr.filter(r => this.ROOMS.includes(r)));
    this.complete = STORE.get('complete', '0') === '1';
    this.celebrated = STORE.get('celebrated', '0') === '1';
  },

  mark(room) {
    if (!this.ROOMS.includes(room)) return;
    if (!this.visited.has(room)) {
      this.visited.add(room);
      STORE.setJSON('visited', [...this.visited]);
      // remember it so the plan can warm this room to life when she returns
      this.pendingHighlight = room;
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
    // the house fills with light — exterior windows of lived-in rooms glow warm
    this.lightWindows();
    // progress meter
    const n = this.visited.size, total = this.ROOMS.length;
    const txt = document.getElementById('bp-progress-text');
    const bar = document.getElementById('bp-progress-bar');
    const wrap = document.getElementById('bp-progress');
    if (txt) txt.textContent = (n >= total) ? 'Every room seen ♥' : `${n} of ${total} rooms seen`;
    if (bar) bar.style.width = (n / total * 100) + '%';
    if (wrap) wrap.classList.toggle('complete', n >= total);
  },

  // Map each exterior window to the room it borders (once), then light the
  // windows of every room she's lived in. The plan glows on, room by room.
  lightWindows() {
    const wins = document.querySelectorAll('.wall-extras .pl-win');
    if (!wins.length) return;
    if (!this._winMapped) {
      const rooms = [...document.querySelectorAll('.room-node[data-room]')].map(node => {
        const r = node.querySelector('.rn-fill');
        const room = node.getAttribute('data-room');
        // garden/rooftop have no exterior glazing of their own
        if (!r || room === 'garden' || room === 'rooftop') return null;
        return { room,
          x: +r.getAttribute('x'), y: +r.getAttribute('y'),
          w: +r.getAttribute('width'), h: +r.getAttribute('height') };
      }).filter(Boolean);
      wins.forEach(w => {
        const g = w.querySelector('.glass') || w.querySelector('line');
        if (!g) return;
        const mx = (parseFloat(g.getAttribute('x1')) + parseFloat(g.getAttribute('x2'))) / 2;
        const my = (parseFloat(g.getAttribute('y1')) + parseFloat(g.getAttribute('y2'))) / 2;
        let best = null, bd = Infinity;
        rooms.forEach(rm => {
          const cx = Math.max(rm.x, Math.min(mx, rm.x + rm.w));
          const cy = Math.max(rm.y, Math.min(my, rm.y + rm.h));
          const d = Math.hypot(mx - cx, my - cy);
          if (d < bd) { bd = d; best = rm; }
        });
        if (best && bd < 24) w.setAttribute('data-win-room', best.room);
      });
      this._winMapped = true;
    }
    wins.forEach(w => {
      const room = w.getAttribute('data-win-room');
      if (room) w.classList.toggle('lit', this.visited.has(room));
    });
  },

  onComplete() {
    this.complete = true;
    STORE.set('complete', '1');
    const status = document.getElementById('tb-status');
    if (status) status.textContent = 'Under Construction';
    this.render();
    // The house finishes the moment she steps into the last room — but she's
    // standing *inside* it, not looking at the plan. So we don't celebrate now;
    // refresh() throws the stamp + sparkles the next time the plan is in view,
    // guaranteeing she actually witnesses the house become real.
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
      if (plan) plan.classList.add('complete');   // stamp settles in
      const status = document.getElementById('tb-status');
      if (status) status.textContent = 'Under Construction';
      // the one and only celebration — fired the first time the finished plan
      // is actually on screen, then never again
      if (!this.celebrated) {
        this.celebrated = true;
        STORE.set('celebrated', '1');
        setTimeout(() => this.sparkle(), 520);
      }
    }
    // warm the room she just lived in, so returning to the plan feels like the
    // house quietly coming alive behind her
    if (this.pendingHighlight) {
      const room = this.pendingHighlight;
      this.pendingHighlight = null;
      const node = document.querySelector(`.room-node[data-room="${room}"]`);
      if (node) {
        // wait for the plan's ink-in to settle, then let this one room glow
        setTimeout(() => {
          node.classList.add('just-seen');
          setTimeout(() => node.classList.remove('just-seen'), 1800);
        }, 650);
      }
    }
  },
};
