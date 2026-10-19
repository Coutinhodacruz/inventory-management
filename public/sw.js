/**
 * Elufidiya Maison 1975 — Production Service Worker
 * Comprehensive PWA caching, update lifecycle, and offline fallback.
 */

const CACHE_VERSION = 'v1.0.0'
const STATIC_CACHE = `elufidiya-static-${CACHE_VERSION}`
const RUNTIME_CACHE = `elufidiya-runtime-${CACHE_VERSION}`

// Critical App Shell assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/elufidiya-logo.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
]

// 1. Install Event: Pre-cache static shell & skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// 2. Activate Event: Purge old cache versions and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== STATIC_CACHE && name !== RUNTIME_CACHE) {
              return caches.delete(name)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// 3. Message Event: Allow client to trigger immediate activation upon update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// 4. Fetch Event: Safe caching rules
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // A. Only process HTTP(S) requests
  if (!url.protocol.startsWith('http')) return

  // B. Never cache non-GET requests (mutations, order creations, uploads)
  if (request.method !== 'GET') return

  // C. SECURITY & DATA INTEGRITY:
  // NEVER cache API requests, authenticated calls, telemetry, or server actions
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_vercel/') ||
    url.pathname.includes('/api') ||
    request.headers.has('Authorization') ||
    request.headers.get('Accept')?.includes('application/json')
  ) {
    // Network-Only: pass straight to network, do not touch CacheStorage
    event.respondWith(fetch(request))
    return
  }

  // D. Navigation Requests (Page Visits): Network-First with Offline Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If response is valid, clone and update the runtime cache
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, clone)
            })
          }
          return response
        })
        .catch(async () => {
          // Network failed: Check cache for the requested page
          const cachedResponse = await caches.match(request)
          if (cachedResponse) {
            return cachedResponse
          }
          // If not in cache, deliver the dedicated offline fallback page
          const offlineFallback = await caches.match('/offline.html')
          return offlineFallback || new Response('Offline', { status: 503 })
        })
    )
    return
  }

  // E. Static Assets (Next.js chunks, images, icons, CSS, fonts):
  // Stale-While-Revalidate / Cache-First strategy
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    /\.(png|jpg|jpeg|svg|webp|gif|css|js|woff|woff2|ttf|eot)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone()
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, clone)
              })
            }
            return networkResponse
          })
          .catch(() => null)

        // Return cached immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise
      })
    )
    return
  }

  // Default: Network with cache fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, clone)
            })
          }
          return response
        })
      )
    })
  )
})
