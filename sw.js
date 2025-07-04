// Service Worker for Saudi Music Community Database
// Version 1.0.0

const CACHE_NAME = 'saudi-music-db-v1';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Assets to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/GOASTFLOWER_LOGO.png',
    'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap'
];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('ServiceWorker: Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('ServiceWorker: Cache complete');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('ServiceWorker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('ServiceWorker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('ServiceWorker: Activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    // Skip Google Sheets API calls - always fetch fresh
    if (event.request.url.includes('sheets.googleapis.com')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Add cache headers to API responses
                    const responseClone = response.clone();
                    const headers = new Headers(responseClone.headers);
                    headers.set('Cache-Control', 'public, max-age=180'); // 3 minutes
                    
                    return new Response(responseClone.body, {
                        status: responseClone.status,
                        statusText: responseClone.statusText,
                        headers: headers
                    });
                })
                .catch(() => {
                    // Return cached API response if available
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Handle other requests with cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    // Check if cache is expired
                    const dateHeader = response.headers.get('date');
                    if (dateHeader) {
                        const cacheDate = new Date(dateHeader);
                        const now = new Date();
                        if (now - cacheDate < CACHE_EXPIRY) {
                            return response;
                        }
                    }
                }

                // Fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cache successful responses
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return cached version as fallback
                        return response || new Response('Offline - Please check your connection', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Message event - handle cache updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            event.ports[0].postMessage('Cache cleared');
        });
    }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    console.log('ServiceWorker: Background sync triggered');
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle any offline actions here
            Promise.resolve()
        );
    }
});

// Push notifications (if needed in the future)
self.addEventListener('push', event => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/GOASTFLOWER_LOGO.png',
            badge: '/GOASTFLOWER_LOGO.png'
        };

        event.waitUntil(
            self.registration.showNotification('Saudi Music Database', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});