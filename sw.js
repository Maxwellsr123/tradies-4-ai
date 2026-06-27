/* Offline cache so the app opens even on a dodgy site signal.
   Strategy: network-first for app files (so redeploys/config changes show up
   immediately when online), falling back to cache when offline. */
const CACHE = 't4ai-v2';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/config.js',
  './js/content.js',
  './js/store.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Never touch Supabase / cross-origin API calls — always go straight to network.
  if (url.origin !== location.origin) return;
  // Network-first: get the freshest file when online, fall back to cache offline.
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(cached => cached || caches.match('./index.html')))
  );
});
