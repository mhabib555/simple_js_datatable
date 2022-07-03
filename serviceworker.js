const cacheName = 'fetchCache_v1';

self.addEventListener('fetch', async(event) => {
    event.respondWith(
        (async function() {
            var cache = await caches.open(cacheName);
            var cachedFiles = await cache.match(event.request);
            if (cachedFiles) {
                return cachedFiles;
            } else {
                try {
                    var response = await fetch(event.request);
                    await cache.put(event.request, response.clone());
                    return response;
                } catch (e) { /* ... */ }
            }
        }())
    )

});