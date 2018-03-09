const cache_version = 'v20';

self.addEventListener('activate', (event) => {
    // delete old caches
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.map((key, i) => {
            if (key !== cache_version) {
                return caches.delete(keys[i]);
            }
        }))
    }))
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || getFromNetwork(event)
        })
    );
});

getFromNetwork = (event) => {
    let url = event.request.clone();
    return fetch(url).then((resp) => {
        if (!resp || resp.status !== 200 || resp.type !== 'basic') {
            return resp;
        }

        // cache the response
        let response = resp.clone();
        caches.open(cache_version).then((cache) => {
            let url2 = event.request.clone();
            cache.put(event.request, response);
        });

        return resp;
    })
}
