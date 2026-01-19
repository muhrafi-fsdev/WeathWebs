// CuacaKu Indonesia - Service Worker
const CACHE_NAME = 'cuacaku-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Removing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // API calls - network only with timeout
    if (url.hostname.includes('bmkg.go.id') || url.hostname.includes('api.')) {
        event.respondWith(
            fetchWithTimeout(request, 10000)
                .catch(() => {
                    // Return cached response or error
                    return caches.match(request).then((cached) => {
                        if (cached) return cached;
                        return new Response(
                            JSON.stringify({ error: 'Offline - tidak dapat memuat data' }),
                            { headers: { 'Content-Type': 'application/json' } }
                        );
                    });
                })
        );
        return;
    }
    
    // Static assets - cache first
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            
            return fetch(request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, responseToCache);
                });
                
                return response;
            });
        })
    );
});

// Fetch with timeout helper
function fetchWithTimeout(request, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Timeout')), timeout);
        
        fetch(request)
            .then((response) => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch((error) => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

// Background sync for earthquake updates
self.addEventListener('sync', (event) => {
    if (event.tag === 'earthquake-check') {
        event.waitUntil(checkEarthquake());
    }
});

async function checkEarthquake() {
    try {
        const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        const data = await response.json();
        const gempa = data.Infogempa?.gempa;
        
        if (gempa) {
            const magnitude = parseFloat(gempa.Magnitude) || 0;
            
            // Notify for significant earthquakes (M >= 4.5)
            if (magnitude >= 4.5) {
                self.registration.showNotification(`⚠️ Gempa M${gempa.Magnitude}`, {
                    body: `${gempa.Wilayah}\n${gempa.Tanggal} ${gempa.Jam}`,
                    icon: '/icons/icon-192.png',
                    badge: '/icons/icon-72.png',
                    tag: 'earthquake-alert',
                    vibrate: [200, 100, 200, 100, 200],
                    data: { url: '/' },
                    actions: [
                        { action: 'view', title: 'Lihat Detail' },
                        { action: 'dismiss', title: 'Tutup' }
                    ]
                });
            }
        }
    } catch (error) {
        console.error('Background earthquake check failed:', error);
    }
}

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view' || !event.action) {
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then((clientList) => {
                for (const client of clientList) {
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
        );
    }
});

// Push notification handler
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'CuacaKu', {
            body: data.body || 'Update cuaca terbaru',
            icon: '/icons/icon-192.png',
            badge: '/icons/icon-72.png',
            tag: data.tag || 'cuacaku-notification',
            data: data
        })
    );
});
