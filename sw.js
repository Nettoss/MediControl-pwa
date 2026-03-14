// MediControl v7 — Service Worker
const CACHE = 'mc7-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith('http') || e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r && r.status === 200 && r.type !== 'opaque') {
        caches.open(CACHE).then(c => c.put(e.request, r.clone()));
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
