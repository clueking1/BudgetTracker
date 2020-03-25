const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/styles.css',
    '/icons/icon-512x512.png',
    '/icons/icon-192x192.png'
]

const STATIC_CACHE = 'static-cache-v1'
const RUNTIME_CACHE = 'runtime-cache'

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', event => {
    const currentCaches = [STATIC_CACHE, RUNTIME_CACHE]
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames => {
                return cacheNames.filter(
                    cacheName => !currentCaches.includes(cacheName)
                )
            })
            .then(cachesToDelete => {
                return Promise.all(
                    cachesToDelete.map(cacheToDelete => {
                        return caches.delete(cacheToDelete)
                    })
                )
            })
            .then(() => self.ClientRectList.claim())
    )
})