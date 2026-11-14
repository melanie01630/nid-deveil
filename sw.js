// Service worker : hors-ligne + mises à jour automatiques
// (essaie d'abord le réseau pour avoir la dernière version, sinon utilise la copie enregistrée)
const CACHE = 'nid-deveil-v49';
const FILES = ['./', './index.html', './manifest.webmanifest', './privacy.html',
  './data/activites-1.js', './data/activites-2.js', './data/activites-3.js', './data/activites-4.js', './data/activites-5.js', './data/films.js', './data/videos.js', './data/guide.js', './data/adultes.js', './data/sorties.js', './data/nouveautes.js', './data/actu.js', './data/schemas.js', './data/photos.js', './data/plus-jeux.js', './data/plus-recettes.js', './data/plus-sante.js', './data/plus-fetes.js', './plus.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/fond.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
