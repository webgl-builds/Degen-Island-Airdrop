const cacheName = "DefaultCompany-Degen Island-3.1";
const contentToCache = [
    "Build/DegenIsland_Build.loader.js",
    "Build/DegenIsland_Build.framework.js",
    "Build/DegenIsland_Build.data",
    "Build/DegenIsland_Build.wasm",
    "TemplateData/style.css"

];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(contentToCache);
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map(key => {
        if (key !== cacheName) return caches.delete(key);
      })
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    return cached || fetch(event.request);
  })());
});
