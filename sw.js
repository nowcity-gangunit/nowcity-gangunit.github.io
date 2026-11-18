// Gang Unit · NOW V4 — service worker
// Prende sempre la versione nuova dal sito; usa la copia salvata solo se sei senza internet.
const CACHE = 'gu-now-v4';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/gu-icona-192.png']).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;   // Discord, Supabase ecc. passano dritti
  e.respondWith(fetch(r).then(res => {
    if (res.ok && (r.mode === 'navigate' || u.pathname.startsWith('/gu-'))) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r.mode === 'navigate' ? '/' : r, copia)); }
    return res;
  }).catch(() => caches.match(r.mode === 'navigate' ? '/' : r).then(x => x || caches.match('/'))));
});
