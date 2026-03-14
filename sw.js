// MediControl — Service Worker v12
const CACHE = 'medicontrol-v12';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: cache app shell immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for app shell, network-first for everything else
self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith('http') || e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isAppShell = url.pathname === '/' ||
                     url.pathname.endsWith('/index.html') ||
                     url.pathname.endsWith('/manifest.json');

  if (isAppShell) {
    // Cache-first: serve from cache instantly, update in background
    e.respondWith(
      caches.match(e.request).then(cached => {
        const networkFetch = fetch(e.request).then(r => {
          if (r && r.status === 200) {
            const toCache = r.clone(); // clone BEFORE consuming
            caches.open(CACHE).then(c => c.put(e.request, toCache));
          }
          return r;
        }).catch(() => null);
        return cached || networkFetch;
      })
    );
  } else {
    // Network-first: try network, fall back to cache
    e.respondWith(
      fetch(e.request)
        .then(r => {
          if (r && r.status === 200 && r.type !== 'opaque') {
            const toCache = r.clone(); // clone BEFORE consuming
            caches.open(CACHE).then(c => c.put(e.request, toCache));
          }
          return r;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
