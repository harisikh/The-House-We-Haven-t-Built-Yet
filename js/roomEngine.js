const ROOM_ENGINE = {
  cameraTimer: null,
  starTimer: null,

  init() {
    document.querySelectorAll('[data-egg]').forEach(egg => {
      egg.addEventListener('click', () => egg.classList.toggle('open'));
    });
  },

  makeStars() {
    const sky = document.getElementById('sky');
    if (!sky || sky.dataset.filled) return;
    sky.dataset.filled = '1';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 64; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = Math.random() * 2.4 + 0.5;
      s.style.cssText =
        `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*78}%;` +
        `opacity:${Math.random()*0.7+0.2};` +
        `animation:twinkle ${2+Math.random()*4}s ease-in-out ${Math.random()*4}s infinite`;
      frag.appendChild(s);
    }
    sky.appendChild(frag);
  },

  // a shooting star drifts across now and then while on the balcony
  startBalcony() {
    const star = document.getElementById('shooting-star');
    if (!star) return;
    const fire = () => {
      star.classList.remove('go'); void star.offsetWidth; star.classList.add('go');
      this.starTimer = setTimeout(fire, 9000 + Math.random() * 7000);
    };
    this.starTimer = setTimeout(fire, 1600);
  },
  stopBalcony() { clearTimeout(this.starTimer); },

  // live timestamp in the camera viewfinder
  startCameraClock() {
    const el = document.getElementById('vf-time');
    if (!el) return;
    const tick = () => {
      const d = new Date();
      const p = n => String(n).padStart(2, '0');
      el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    tick();
    this.cameraTimer = setInterval(tick, 1000);
  },
  stopCameraClock() { clearInterval(this.cameraTimer); },

  startRain() {
    const host = document.getElementById('rainfall');
    if (!host || host.dataset.filled) return;
    host.dataset.filled = '1';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 60; i++) {
      const d = document.createElement('span');
      d.className = 'raindrop';
      const dur = 0.5 + Math.random() * 0.7;
      d.style.cssText = `left:${Math.random()*100}%;animation-duration:${dur}s;animation-delay:${(-Math.random()*dur).toFixed(2)}s;opacity:${0.3+Math.random()*0.5}`;
      frag.appendChild(d);
    }
    host.appendChild(frag);
  },

  startSteam() {
    document.querySelectorAll('#screen-after-work .steam').forEach(el => {
      el.classList.remove('go'); void el.getBBox; el.classList.add('go');
    });
  },

};