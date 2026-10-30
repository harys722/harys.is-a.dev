const CACHE = 'desktop-dev';
const PRECACHE = [];
const files = new Set(PRECACHE);
// Clean-URL hosts redirect .html requests. A redirected cached response cannot
// always be used for a new navigation, so return a fresh response in that case.
function navigationResponse(response) {
  return response.redirected
    ? new Response(response.body, {status:response.status,statusText:response.statusText,headers:response.headers})
    : response;
}
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('harys-desktop-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(request); }
      catch {
        const cache = await caches.open(CACHE);
        const path = url.pathname === '/' ? '/index.html' : url.pathname.replace(/\/$/, '');
        const saved = await cache.match(path) || await cache.match(path + '.html');
        if (saved) return navigationResponse(saved);
        // Unknown paths still boot the desktop, whose router opens its 404 window.
        const desktop = await cache.match('/index.html');
        return desktop ? navigationResponse(desktop) : new Response('The desktop has not finished saving offline. Reconnect and reload.', {status:503,headers:{'Content-Type':'text/plain'}});
      }
    })());
    return;
  }
  if (files.has(url.pathname)) event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return await cache.match(url.pathname) || fetch(request);
  })());
});
