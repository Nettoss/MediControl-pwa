// MediControl — Service Worker v9
const CACHE = 'medicontrol-v9';
const APP_SHELL = ['./'];

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
  const isAppShell = url.pathname === '/' || url.pathname.endsWith('/index.html') ||
                     url.pathname.endsWith('/manifest.json');

  if (isAppShell) {
    // Cache-first: serve instantly, refresh in background
    e.respondWith(
      caches.match(e.request).then(cached => {
        const network = fetch(e.request).then(r => {
          if (r && r.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, r.clone()));
          }
          return r;
        });
        return cached || network;
      })
    );
  } else {
    // Network-first: try network, fall back to cache
    e.respondWith(
      fetch(e.request)
        .then(r => {
          if (r && r.status === 200 && r.type !== 'opaque') {
            caches.open(CACHE).then(c => c.put(e.request, r.clone()));
          }
          return r;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
