const NAV = {
  go(id, opts = {}) {
    const prev = STATE.current;
    if (prev && prev !== id) STATE.history.push(prev);

    // forward motion: step deeper in (incoming rises from below — the default)
    document.body.classList.remove('nav-back');

    document.querySelectorAll('.screen.active, .room-screen.active')
      .forEach(el => el.classList.remove('active'));

    STATE.previous = prev;
    STATE.current = id;

    const next = document.getElementById('screen-' + id);
    if (!next) return;

    // force reflow so stagger / draw animations restart
    void next.offsetWidth;
    requestAnimationFrame(() => {
      next.classList.add('active');
      next.scrollTop = 0;
      window.scrollTo(0, 0);
      TRANSITIONS.onEnter(id);
      if (opts.onEnter) opts.onEnter();
    });
  },

  back() {
    const prev = STATE.history.pop();
    if (prev) {
      const wasRoom = STATE.current;
      // backward motion: the room rises away, the overview settles down from above
      document.body.classList.add('nav-back');
      document.querySelectorAll('.screen.active, .room-screen.active')
        .forEach(el => el.classList.remove('active'));
      STATE.current = prev;
      const next = document.getElementById('screen-' + prev);
      if (next) {
        void next.offsetWidth;
        requestAnimationFrame(() => {
          next.classList.add('active');
          window.scrollTo(0, 0);
          TRANSITIONS.onEnter(prev);
        });
      }
    }
  },

  toBlueprint() {
    STATE.letterClicks = 0;
    this.go('blueprint');
  },
};
