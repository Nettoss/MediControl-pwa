// ═══════════════════════════════════════════════
//  MEDICONTROL PWA — Service Worker v2.0
// ═══════════════════════════════════════════════
const CACHE_NAME = 'medicontrol-v2.0';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// ── INSTALL: cache core assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS.map(url => new Request(url, { mode: 'no-cors' })))
        .catch(() => cache.addAll(['/index.html', '/manifest.json']));
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first for static, Network-first for API ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Network-first for OSM/Overpass/Nominatim APIs (maps data)
  if (
    url.hostname.includes('openstreetmap.org') ||
    url.hostname.includes('overpass-api.de') ||
    url.hostname.includes('nominatim.openstreetmap.org')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      });
    })
  );
});

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'Hora do medicamento!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    tag: data.tag || 'medicontrol',
    data: data,
    actions: [
      { action: 'taken', title: '✓ Tomei' },
      { action: 'snooze', title: '⏰ +15min' }
    ],
    vibrate: [200, 100, 200],
    requireInteraction: false
  };
  event.waitUntil(
    self.registration.showNotification(data.title || '💊 MediControl', options)
  );
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'taken') {
    // Post message to client to mark dose as taken
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(c => c.postMessage({ type: 'DOSE_TAKEN', data: event.notification.data }));
        if (clients.length) clients[0].focus();
        else self.clients.openWindow('/index.html#agenda');
      })
    );
  } else if (event.action === 'snooze') {
    // Re-notify in 15 minutes
    const data = event.notification.data || {};
    event.waitUntil(
      new Promise(resolve => {
        setTimeout(() => {
          self.registration.showNotification(data.title || '💊 MediControl (lembrete)', {
            body: data.body || 'Você adiou este lembrete.',
            icon: '/icons/icon-192.png',
            tag: (data.tag || 'medicontrol') + '-snooze'
          });
          resolve();
        }, 15 * 60 * 1000);
      })
    );
  } else {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        if (clients.length) clients[0].focus();
        else self.clients.openWindow('/index.html#agenda');
      })
    );
  }
});

// ── BACKGROUND SYNC (future-proof) ──
self.addEventListener('sync', event => {
  if (event.tag === 'sync-doses') {
    // Reserved for future cloud sync feature
    console.log('[SW] Background sync: sync-doses');
  }
});
