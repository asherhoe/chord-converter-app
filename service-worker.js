const CACHE_NAME = 'ash-chord-transposer-v1';
const urlsToCache = [
  '/chord-converter-app/',
  '/chord-converter-app/index.html',
  '/chord-converter-app/manifest.json',
  '/chord-converter-app/icons/icon-72x72.png',
  '/chord-converter-app/icons/icon-96x96.png',
  '/chord-converter-app/icons/icon-144x144.png',
  '/chord-converter-app/icons/icon-192x192.png',
  '/chord-converter-app/icons/icon-512x512.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
