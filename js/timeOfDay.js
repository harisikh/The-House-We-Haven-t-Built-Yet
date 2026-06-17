/* Shifts the whole mood by the local clock — no network needed. */
const TIME_OF_DAY = {
  phases: [
    { name: 'morning',   label: 'Morning light',   from: 5,  to: 11 },
    { name: 'afternoon', label: 'Afternoon',       from: 11, to: 17 },
    { name: 'evening',   label: 'Evening',         from: 17, to: 21 },
    { name: 'night',     label: 'Late & quiet',    from: 21, to: 29 }, // wraps past midnight
  ],

  current() {
    const h = new Date().getHours();
    const hh = h < 5 ? h + 24 : h; // 0–4 counts as "night" (21–29)
    return this.phases.find(p => hh >= p.from && hh < p.to) || this.phases[1];
  },

  apply() {
    const p = this.current();
    document.body.classList.remove('tod-morning','tod-afternoon','tod-evening','tod-night');
    document.body.classList.add('tod-' + p.name);
    const label = document.getElementById('tod-label');
    if (label) label.textContent = p.label;
    return p;
  },

  init() {
    this.apply();
    // re-check every few minutes so a long session can roll into the next phase
    setInterval(() => this.apply(), 5 * 60 * 1000);
  },

  reveal() {
    const badge = document.getElementById('tod-badge');
    if (badge) setTimeout(() => badge.classList.add('show'), 600);
  },
};
