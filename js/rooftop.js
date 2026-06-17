const ROOFTOP = {
  ids:    ['light-1','light-2','light-3','light-4','light-5','light-6'],
  delays: [300, 650, 1050, 1500, 1700, 1900],

  illuminate() {
    if (STATE.rooftopLit) return;
    STATE.rooftopLit = true;
    this.ids.forEach((id, i) => {
      setTimeout(() => document.getElementById(id)?.classList.add('lit'), this.delays[i]);
    });
    // once the home is lit, the chimney breathes out a little heart
    const heart = document.getElementById('smoke-heart');
    if (heart) {
      const puff = () => {
        if (!STATE.rooftopLit) return;
        heart.classList.remove('go'); void heart.getBBox; heart.classList.add('go');
        this._t = setTimeout(puff, 7000);
      };
      this._t = setTimeout(puff, 3000);
    }
  },

  reset() {
    STATE.rooftopLit = false;
    clearTimeout(this._t);
    this.ids.forEach(id => document.getElementById(id)?.classList.remove('lit'));
    document.getElementById('smoke-heart')?.classList.remove('go');
  },
};
