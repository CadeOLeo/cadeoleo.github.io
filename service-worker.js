import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// Precaching (manifest will be injected by the build)
precacheAndRoute(self.__WB_MANIFEST || []);

// Ignore requests to Google Analytics (don't intercept)
registerRoute(
  ({url}) => url.hostname === 'www.google-analytics.com',
  new NetworkOnly()
);

// Cache images with a stale-while-revalidate strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({ cacheName: 'images' })
);

// Navigation requests: Network first with fallback to cache
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'pages' })
);

// Message handler to skip waiting when new SW is available
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});







