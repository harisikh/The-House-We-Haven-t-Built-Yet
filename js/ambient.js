/* Optional, OFF by default. Generates a soft, synthetic room-tone with
   the Web Audio API (no audio files) plus the faint scratch of a pencil.
   Respects the brief's "no music" — this is ambience, not a track. */
const AMBIENT = {
  ctx: null, on: false, nodes: [], scratchTimer: null,

  init() {
    const btn = document.getElementById('ambient-toggle');
    if (!btn) return;
    // remember preference (but never auto-start without a user gesture)
    this.pref = STORE.get('ambient', '0') === '1';
    btn.addEventListener('click', () => this.toggle());
  },

  toggle() {
    this.on ? this.stop() : this.start();
    const btn = document.getElementById('ambient-toggle');
    if (btn) btn.classList.toggle('on', this.on);
    STORE.set('ambient', this.on ? '1' : '0');
  },

  start() {
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();

      // soft brown-noise room tone
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * white) / 1.02; last = data[i]; data[i] *= 3.2;
      }
      const noise = ctx.createBufferSource(); noise.buffer = noiseBuf; noise.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
      const gain = ctx.createGain(); gain.gain.value = 0.0; 
      noise.connect(lp); lp.connect(gain); gain.connect(ctx.destination);
      noise.start();
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2);
      this.nodes = [noise, gain];

      // occasional pencil scratch
      const scratch = () => {
        if (!this.on) return;
        const dur = 0.12 + Math.random() * 0.18;
        const sb = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const sd = sb.getChannelData(0);
        for (let i = 0; i < sd.length; i++) sd[i] = (Math.random() * 2 - 1) * (1 - i / sd.length);
        const src = ctx.createBufferSource(); src.buffer = sb;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800 + Math.random() * 800;
        const g = ctx.createGain(); g.gain.value = 0.018;
        src.connect(bp); bp.connect(g); g.connect(ctx.destination); src.start();
        this.scratchTimer = setTimeout(scratch, 2500 + Math.random() * 5000);
      };
      this.scratchTimer = setTimeout(scratch, 2000);

      this.on = true;
    } catch (e) { this.on = false; }
  },

  stop() {
    this.on = false;
    clearTimeout(this.scratchTimer);
    const g = this.nodes[1];
    if (g && this.ctx) {
      g.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      setTimeout(() => { try { this.nodes[0]?.stop(); } catch (e) {} this.nodes = []; }, 700);
    }
  },
};
