const TRANSITIONS = {
  onEnter(id) {
    // stop any per-room loops from the previous screen
    ROOM_ENGINE.stopCameraClock();
    ROOM_ENGINE.stopBalcony();

    // mark visited rooms / refresh the plan
    if (typeof PROGRESS !== 'undefined') {
      if (id === 'blueprint') PROGRESS.refresh();
      else if (PROGRESS.ROOMS.includes(id)) PROGRESS.mark(id);
    }

    if (id === 'rooftop') {
      ROOFTOP.reset();
      setTimeout(() => ROOFTOP.illuminate(), 700);
    }
    if (id === 'balcony') { ROOM_ENGINE.makeStars(); ROOM_ENGINE.startBalcony(); }
    if (id === 'camera-corner') ROOM_ENGINE.startCameraClock();
    if (id === 'rain-room') ROOM_ENGINE.startRain();
    if (id === 'after-work') ROOM_ENGINE.startSteam();
    if (id === 'letter') LETTER.reset();
    if (id === 'cabinet') STATE.letterClicks = 0;
  },

  swingDoor(cb) {
    const panel = document.getElementById('door-panel');
    if (!panel) { cb && cb(); return; }
    panel.style.animation = 'doorSwing 0.95s var(--e-soft) forwards';
    setTimeout(() => { cb && cb(); }, 850);
  },
};
