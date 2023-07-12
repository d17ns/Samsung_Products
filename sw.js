// Service Worker
const CACHE_NAME = 'pwa-cache';
const CACHE_FILES = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/app.js',
    '/css/styles.css',
    '/images/icon-192x192.png',
    '/images/icon-256x256.png',
    '/images/icon-384x384.png',
    '/images/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Found in cache, return the cached response
        }
        return fetch(event.request) // Not found in cache, fetch from the network
          .then((networkResponse) => {
            // Cache the response for future use
            const clonedResponse = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, clonedResponse);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
      })
  );
});