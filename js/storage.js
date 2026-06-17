/* Safe localStorage wrapper — degrades gracefully if storage is
   unavailable (e.g. some browsers restrict it on file:// URLs). */
const STORE = {
  ok: (() => {
    try { const k = '__h__'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; }
    catch (e) { return false; }
  })(),
  mem: {},
  PREFIX: 'house:',

  get(key, fallback = null) {
    try {
      if (this.ok) { const v = localStorage.getItem(this.PREFIX + key); return v === null ? fallback : v; }
    } catch (e) {}
    return key in this.mem ? this.mem[key] : fallback;
  },
  set(key, val) {
    try { if (this.ok) { localStorage.setItem(this.PREFIX + key, val); return; } } catch (e) {}
    this.mem[key] = val;
  },
  getJSON(key, fallback) {
    const raw = this.get(key, null);
    if (raw === null) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  },
  setJSON(key, val) { this.set(key, JSON.stringify(val)); },
};
