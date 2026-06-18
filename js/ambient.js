/* Home audio. Toggle is OFF by default (never autoplays).
   1) If a song file exists at assets/audio/homecoming.mp3 (you add it),
      that plays on loop, gently faded in — meant for a Hindi homecoming
      song like "Khat — Navjot Ahuja".
   2) If no file is present, a warm original chord pad plays instead
      (synthesised, no copyright), so there's always something soft. */
const AMBIENT = {
  ctx: null, on: false, nodes: [], song: null, usingSong: false,

  init() {
    const btn = document.getElementById('ambient-toggle');
    if (!btn) return;
    this.song = document.getElementById('bg-song');
    btn.addEventListener('click', () => this.toggle());
  },

  toggle() {
    this.on ? this.stop() : this.start();
    const btn = document.getElementById('ambient-toggle');
    if (btn) btn.classList.toggle('on', this.on);
    STORE.set('ambient', this.on ? '1' : '0');
  },

  start() {
    this.on = true;
    if (this.song) {
      this.song.loop = true; this.song.volume = 0;
      const p = this.song.play();
      if (p && p.then) {
        p.then(() => { this.usingSong = true; this._fade(this.song, 0.55, 2.5); })
         .catch(() => { this.usingSong = false; this._pad(); });
      } else { this.usingSong = true; this._fade(this.song, 0.55, 2.5); }
    } else { this._pad(); }
  },

  _fade(audio, to, sec) {
    const start = performance.now(), from = audio.volume;
    const step = (t) => {
      if (!this.on) { audio.volume = 0; return; }
      const k = Math.min(1, (t - start) / (sec * 1000));
      audio.volume = from + (to - from) * k;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  _pad() {  // warm "coming home" chord pad — original, no audio file
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();
      const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 950; lp.Q.value = 0.6; lp.connect(master);
      const freqs = [130.81, 164.81, 196.00, 246.94, 293.66]; // Cmaj9 — warm, resolved, "home"
      const oscs = freqs.map((f, i) => {
        const o = ctx.createOscillator(); o.type = i < 3 ? 'sine' : 'triangle'; o.frequency.value = f;
        o.detune.value = Math.random() * 6 - 3;
        const g = ctx.createGain(); g.gain.value = i < 3 ? 0.13 : 0.06;
        o.connect(g); g.connect(lp); o.start();
        return o;
      });
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;     // slow breathing
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.02;
      lfo.connect(lfoG); lfoG.connect(master.gain); lfo.start();
      master.gain.linearRampToValueAtTime(0.075, ctx.currentTime + 3);
      this.nodes = [master, oscs, lfo];
    } catch (e) { this.on = false; }
  },

  stop() {
    this.on = false;
    if (this.usingSong && this.song) {
      this._fade(this.song, 0, 1.0);
      setTimeout(() => { try { this.song.pause(); } catch (e) {} }, 1100);
      this.usingSong = false;
    }
    const master = this.nodes[0];
    if (master && this.ctx) {
      master.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try { (this.nodes[1] || []).forEach(o => o.stop()); this.nodes[2] && this.nodes[2].stop(); } catch (e) {}
        this.nodes = [];
      }, 900);
    }
  },
};
