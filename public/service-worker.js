// public/service-worker.js

const CACHE_NAME = 'villagefresh-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.webmanifest',
];

// ✅ Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache);
        console.log('✅ All assets cached!');
      } catch (err) {
        console.error('❌ Failed to cache during install:', err);
      }
    })()
  );
});

// 🔁 Activate Event
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// 📡 Fetch Event
self.addEventListener('fetch', (event) => {
  console.log('➡️ Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
