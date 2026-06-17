document.addEventListener('DOMContentLoaded', () => {
  // mood + ambience + pointer effects are available even on the lock screen
  TIME_OF_DAY.init();
  AMBIENT.init();

  // register service worker for offline / installable (http(s) only)
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // ── locked? show the lock screen and stop ──
  if (LOCK.init()) {
    CEREMONY.skipInstantly();
    TIME_OF_DAY.reveal();
    EXTRAS.pointerEffects();
    return;
  }

  // are we a returning visitor? (compute before the ceremony marks us "opened")
  const returning = !CEREMONY.shouldRun();

  // ── setup ──
  PROGRESS.load();
  CABINET.build();
  CABINET.init();
  ROOM_ENGINE.init();
  LETTER.init();
  EXTRAS.init(returning);

  // intro flow
  document.getElementById('btn-keys')  ?.addEventListener('click', () => NAV.go('keys'));
  document.getElementById('btn-door')  ?.addEventListener('click', () => NAV.go('door'));
  document.getElementById('btn-enter') ?.addEventListener('click', () => {
    TRANSITIONS.swingDoor(() => NAV.go('blueprint'));
  });

  // blueprint → rooms
  document.querySelectorAll('.room-node[data-room]').forEach(node => {
    const room = node.getAttribute('data-room');
    node.addEventListener('click', () => NAV.go(room));
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); NAV.go(room); }
    });
  });

  // back buttons
  document.querySelectorAll('.back-to-bp').forEach(b =>
    b.addEventListener('click', () => NAV.toBlueprint()));

  // rooftop → letter, sunflower → letter
  document.getElementById('to-letter-from-roof')?.addEventListener('click', () => NAV.go('letter'));
  document.getElementById('sunflower')?.addEventListener('click', () => NAV.go('letter'));

  // Esc returns from a room to the blueprint (unless a drawer modal is open)
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const modal = document.getElementById('modal-overlay');
    if (modal && modal.classList.contains('open')) return;
    const cur = STATE.current;
    if (PROGRESS.ROOMS.includes(cur) || cur === 'letter') NAV.toBlueprint();
  });

  // ── boot (after the first-open ceremony, if it runs) ──
  const boot = () => { NAV.go('opening'); TIME_OF_DAY.reveal(); };
  if (CEREMONY.shouldRun()) CEREMONY.run(boot);
  else { CEREMONY.skipInstantly(); boot(); }
});
