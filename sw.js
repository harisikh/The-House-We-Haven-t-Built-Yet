/* Offline cache so the house can be "kept" — works once hosted (http/https). */
const CACHE = 'house-v10';
const ASSETS = [
  './', 'index.html', 'manifest.webmanifest',
  'css/variables.css','css/typography.css','css/layout.css','css/animations.css',
  'css/blueprint.css','css/rooms.css','css/enhance.css','css/scene.css','css/print.css',
  'js/config.js','js/state.js','js/content.js','js/objects.js','js/storage.js','js/lock.js',
  'js/timeOfDay.js','js/transitions.js','js/navigation.js','js/progress.js',
  'js/roomEngine.js','js/cabinet.js','js/notes.js','js/rooftop.js','js/letter.js',
  'js/ambient.js','js/ceremony.js','js/extras.js','js/app.js',
  'assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
