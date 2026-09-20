const CACHE_NAME = 'gestao-gastos-v2'; // Altere esta versão (ex: v3, v4) sempre que atualizar o app na hospedagem

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o novo service worker a assumir o controle imediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './',
        './index.html'
      ]);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Remove os caches antigos para liberar espaço e garantir dados novos
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
