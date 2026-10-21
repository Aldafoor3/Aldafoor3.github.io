/* Offline support: stale-while-revalidate for every GET request. Bump CACHE after each deploy. */
const CACHE = 'km-portfolio-v1';
const CORE = [
  './', 'index.html', 'manifest.json', 'css/style.css',
  'js/data.js', 'js/i18n.js', 'js/world.js', 'js/ui.js',
  'files/photo.png', 'icons/icon.svg', 'icons/icon-192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request).then((hit) => {
        const net = fetch(e.request)
          .then((res) => {
            if (res.ok || res.type === 'opaque') cache.put(e.request, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || net;
      })
    )
  );
});
