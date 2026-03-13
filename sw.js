// MediControl SW build 1773440266
const V = 'mc-1773440266';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(function(keys){ return Promise.all(keys.map(function(k){ return caches.delete(k); })); })
      .then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(function(r) {
        if (r && r.status === 200) {
          var clone = r.clone();
          caches.open(V).then(function(c){ c.put(e.request, clone); });
        }
        return r;
      })
      .catch(function(){ return caches.match(e.request); })
  );
});
