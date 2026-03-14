// MediControl SW build 1773451545
const V = 'mc-1773451545';

self.addEventListener('install', e => {
  // Forçar ativação imediata sem esperar abas fecharem
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    // Apagar TODOS os caches antigos
    caches.keys()
      .then(keys => Promise.all(keys.map(k => {
        console.log('[SW] Deletando cache antigo:', k);
        return caches.delete(k);
      })))
      .then(() => {
        console.log('[SW] Todos os caches limpos. Versão ativa:', V);
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Network-first: sempre tenta buscar versão nova da rede primeiro
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r && r.status === 200 && r.type !== 'opaque') {
          const clone = r.clone();
          caches.open(V).then(c => c.put(e.request, clone));
        }
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
