// variable CACHE_NAME, yaitu nama cache yang akan digunakan pada service worker
const CACHE_NAME = 'pwa-cache';

// variable CACHE_FILES, berisikan daftar file yang akan disimpan dalam cache
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

// fungsi saat service worker diinstall pada browser
// maka cache akan dengan kode caches.open(CACHE_NAME)
// kemudian daftar file pada CACHE_FILES akan ditambahkan ke dalam cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

// fungsi saat ada permintaan fetching resource
// fungsi akan memastikan apakah resource ada di dalam cache atau tidak
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // jika resource ada di dalam cache, maka response akan dikembalikan langsung
          return response;
        }
        // jika resource tidak ada di dalam cache, maka service worker akan mengambil resource menggunakan internet
        return fetch(event.request)
          .then((networkResponse) => {
            // resource tersebut akan disimpan di dalam cache untuk digunakan pada permintaan-permintaan selanjutnya
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