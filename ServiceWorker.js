const cacheName = "DefaultCompany-SpearMania-1.5";
const contentToCache = [
    "Build/SpearMania-Airdrop.loader.js",
    "Build/SpearMania-Airdrop.framework.js",
    "Build/SpearMania-Airdrop.data",
    "Build/SpearMania-Airdrop.wasm",
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