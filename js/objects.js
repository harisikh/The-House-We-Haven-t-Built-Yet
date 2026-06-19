/* Interactive room objects — you touch the thing, it answers.
   Lines are verbatim from the script. */
const OBJECTS = {
  ICONS: {
    tv: `<svg width="68" height="60" viewBox="0 0 68 60"><rect class="fl tv-screen" x="6" y="6" width="56" height="38" rx="3"/><rect class="tv-on ac" x="10" y="10" width="48" height="30" rx="2" opacity="0.25"/><line class="ln" x1="34" y1="44" x2="34" y2="52"/><line class="ln" x1="22" y1="54" x2="46" y2="54"/></svg>`,
    'floor-lamp': `<svg width="44" height="78" viewBox="0 0 44 78"><circle class="glow-halo ac" cx="22" cy="18" r="20" opacity="0"/><path class="fl" d="M8 22 L36 22 L29 6 L15 6 Z"/><rect class="gl" x="9" y="19" width="26" height="4"/><line class="ln" x1="22" y1="22" x2="22" y2="70"/><path class="ln" d="M12 72 Q22 66 32 72"/></svg>`,
    'window-seat': `<svg width="70" height="62" viewBox="0 0 70 62"><rect class="ln" x="10" y="4" width="50" height="34" rx="2"/><line class="ln" x1="35" y1="4" x2="35" y2="38"/><rect class="fl" x="6" y="38" width="58" height="16" rx="3"/><rect class="ac" x="12" y="40" width="14" height="10" rx="3" opacity="0.5"/></svg>`,
    fridge: `<svg width="50" height="74" viewBox="0 0 50 74"><rect class="fl fridge-inside" x="8" y="6" width="34" height="62" rx="4"/><line class="ln fridge-inside" x1="8" y1="34" x2="42" y2="34"/><rect class="ac fridge-inside" x="13" y="12" width="14" height="6" rx="2" opacity="0.6"/><rect class="fl fridge-door" x="8" y="6" width="34" height="62" rx="4"/><line class="ln fridge-door" x1="8" y1="34" x2="42" y2="34"/><line class="ln fridge-door" x1="36" y1="14" x2="36" y2="26"/><line class="ln fridge-door" x1="36" y1="42" x2="36" y2="54"/></svg>`,
    'spice-rack': `<svg width="64" height="60" viewBox="0 0 64 60"><line class="ln" x1="6" y1="30" x2="58" y2="30"/><line class="ln" x1="6" y1="54" x2="58" y2="54"/><rect class="fl" x="10" y="14" width="10" height="16" rx="2"/><rect class="fl" x="26" y="10" width="10" height="20" rx="2"/><rect class="fl" x="42" y="16" width="10" height="14" rx="2"/><rect class="fl" x="18" y="40" width="10" height="14" rx="2"/><rect class="fl" x="36" y="38" width="10" height="16" rx="2"/><rect class="ac" x="11" y="14" width="8" height="4"/><rect class="ac" x="27" y="10" width="8" height="4"/></svg>`,
    telescope: `<svg width="66" height="66" viewBox="0 0 66 66"><rect class="fl" x="14" y="20" width="36" height="13" rx="6" transform="rotate(-26 32 26)"/><circle class="ac" cx="48" cy="16" r="5" opacity="0.6"/><line class="ln" x1="30" y1="34" x2="22" y2="58"/><line class="ln" x1="34" y1="36" x2="44" y2="58"/><line class="ln" x1="18" y1="58" x2="48" y2="58"/></svg>`,
    'hanging-chair': `<svg width="58" height="74" viewBox="0 0 58 74"><line class="ln" x1="29" y1="2" x2="29" y2="20"/><path class="fl" d="M10 22 Q29 18 48 22 Q50 50 29 58 Q8 50 10 22 Z"/><path class="ln" d="M10 22 Q29 30 48 22"/></svg>`,
    desk: `<svg width="72" height="58" viewBox="0 0 72 58"><rect class="fl" x="6" y="18" width="60" height="8" rx="2"/><line class="ln" x1="12" y1="26" x2="12" y2="52"/><line class="ln" x1="60" y1="26" x2="60" y2="52"/><rect class="fl" x="44" y="22" width="18" height="4"/><rect class="ac" x="16" y="8" width="20" height="10" rx="1" opacity="0.5"/><rect class="ln" x="16" y="8" width="20" height="10" rx="1"/></svg>`,
    'desk-lamp': `<svg width="50" height="64" viewBox="0 0 50 64"><circle class="glow-halo ac" cx="16" cy="14" r="15" opacity="0"/><path class="fl" d="M8 18 L26 18 L22 6 L14 6 Z"/><rect class="gl" x="10" y="15" width="14" height="3"/><line class="ln" x1="17" y1="18" x2="30" y2="40"/><line class="ln" x1="30" y1="40" x2="30" y2="54"/><rect class="fl" x="20" y="54" width="20" height="6" rx="2"/></svg>`,
    phone: `<svg width="40" height="68" viewBox="0 0 40 68"><rect class="fl" x="8" y="4" width="24" height="60" rx="5"/><rect class="ac" x="12" y="10" width="16" height="40" rx="2" opacity="0.3"/><circle class="rec-dot ac" cx="20" cy="30" r="4"/><line class="ln" x1="15" y1="58" x2="25" y2="58"/></svg>`,
    bathtub: `<svg width="74" height="56" viewBox="0 0 74 56"><path class="fl" d="M8 24 Q8 44 20 44 L54 44 Q66 44 66 24 Z"/><rect class="ln" x="6" y="20" width="62" height="6" rx="3"/><line class="ln" x1="16" y1="44" x2="14" y2="52"/><line class="ln" x1="58" y1="44" x2="60" y2="52"/><path class="ln" d="M60 20 Q60 10 52 12"/></svg>`,
    mirror: `<svg width="50" height="70" viewBox="0 0 50 70"><rect class="fl" x="8" y="4" width="34" height="54" rx="17"/><rect class="mirror-fog" x="11" y="7" width="28" height="48" rx="14" fill="#cdd6de"/><text class="mirror-word" x="25" y="34" text-anchor="middle" font-family="Caveat,cursive" font-size="13" fill="#5a6b78">still here ♥</text><line class="ln" x1="14" y1="58" x2="36" y2="64"/></svg>`,
    'key-bowl': `<svg width="64" height="44" viewBox="0 0 64 44"><g class="keys-g"><circle class="ln" cx="40" cy="18" r="6"/><line class="ln" x1="44" y1="22" x2="52" y2="30"/><line class="ln" x1="49" y1="27" x2="52" y2="24"/></g><path class="fl" d="M10 22 Q32 40 54 22 Q54 34 32 36 Q10 34 10 22 Z"/></svg>`,
  },

  SCENES: {
    'entry-foyer': [
      { type: 'key-bowl', name: 'Key Bowl', effect: 'rattle', note: 'Last known location of responsibility.' },
    ],
    'living-room': [
      { type: 'tv', name: 'TV', effect: 'lit', note: 'Continue Watching\nEpisode 1\nFor the seventh consecutive week.' },
      { type: 'floor-lamp', name: 'Floor Lamp', effect: 'lit', note: 'This lamp exists because apparently overhead lighting is a crime.' },
      { type: 'window-seat', name: 'Window Seat', note: 'Reserved for absolutely nothing productive.' },
    ],
    'kitchen': [
      { type: 'fridge', name: 'Fridge', effect: 'lit', note: 'Contains:\nLeftovers · Sauces · Questionable experiments\nAnd snacks that mysteriously belong to Bebu.' },
      { type: 'spice-rack', name: 'Spice Rack', note: 'Official Recipe\nStep 1. Trust me.\nStep 2. Trust me more.\nStep 3. Somehow it works.' },
    ],
    'balcony': [
      { type: 'telescope', name: 'Telescope', effect: 'stars', note: 'You know what I like about stars?\nThey look closer than they are.\nSomehow that feels familiar.' },
      { type: 'hanging-chair', name: 'Hanging Chair', note: 'Official seat of overthinking.' },
    ],
    'study': [
      { type: 'desk', name: 'Desk', note: 'Current Status:\nOne person working.\nOther person annoying the other.\nBoth hugging each other after a long day.' },
      { type: 'desk-lamp', name: 'Desk Lamp', effect: 'lit', note: 'Powered primarily by determination.' },
    ],
    'camera-corner': [
      { type: 'phone', name: 'Phone', effect: 'rec', note: 'Current Activity:\nExisting.\nQuite successfully.' },
    ],
    'washroom': [
      { type: 'bathtub', name: 'Bathtub', note: 'Reserved for difficult days.\nAnd doing absolutely nothing about them.' },
      { type: 'mirror', name: 'Mirror', effect: 'fog', note: 'Future proof.\nStill beautiful.' },
    ],
  },

  build() {
    document.querySelectorAll('[data-scene]').forEach(host => {
      const room = host.getAttribute('data-scene');
      const objs = this.SCENES[room];
      if (!objs) return;
      const floor = document.createElement('div'); floor.className = 'scene-floor';
      objs.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.className = 'obj'; btn.type = 'button';
        btn.setAttribute('aria-label', o.name);
        btn.dataset.note = o.note; btn.dataset.name = o.name;
        if (o.effect) btn.dataset.effect = o.effect;
        btn.innerHTML = this.ICONS[o.type] + `<span class="obj-name">${o.name}</span>`;
        floor.appendChild(btn);
      });
      const note = document.createElement('div'); note.className = 'scene-note';
      note.innerHTML = `<div class="sn-name"></div><div class="sn-text"></div>`;
      host.appendChild(floor);
      host.appendChild(note);

      floor.addEventListener('click', e => {
        const btn = e.target.closest('.obj'); if (!btn) return;
        floor.querySelectorAll('.obj').forEach(b => { if (b !== btn) b.classList.remove('active'); });
        const wasActive = btn.classList.contains('active');
        btn.classList.toggle('active');
        this.effect(btn, room);
        if (!wasActive) {
          note.querySelector('.sn-name').textContent = btn.dataset.name;
          note.querySelector('.sn-text').innerHTML = btn.dataset.note.replace(/\n/g, '<br>');
          note.classList.add('show');
        } else {
          note.classList.remove('show');
        }
      });
    });
  },

  effect(btn, room) {
    const fx = btn.dataset.effect;
    if (!fx) return;
    if (fx === 'lit' || fx === 'rec' || fx === 'fog') {
      btn.classList.toggle('lit', btn.classList.contains('active'));
    }
    if (fx === 'rattle') {
      btn.classList.remove('rattle'); void btn.offsetWidth; btn.classList.add('rattle');
    }
    if (fx === 'stars') {
      const note = btn.closest('[data-scene]').querySelector('.scene-note');
      // a tiny twinkle accent on the note
      note.style.borderLeftColor = btn.classList.contains('active') ? 'var(--draft)' : 'var(--terra-soft)';
    }
  },
};
