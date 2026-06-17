const STATE = {
  current: null,
  previous: null,
  history: [],
  rooftopLit: false,
  letterClicks: 0,

  set(k, v) { this[k] = v; },
  get(k) { return this[k]; },
};
