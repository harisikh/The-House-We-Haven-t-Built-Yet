const NAV = {
  go(id, opts = {}) {
    const prev = STATE.current;
    if (prev && prev !== id) STATE.history.push(prev);

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
