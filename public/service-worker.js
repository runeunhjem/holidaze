self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener("fetch", (event) => {
  // Check if the request is for an image from the static content domain
  if (event.request.url.startsWith("https://static.noroff.dev/api/online-shop")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return the cached image if it exists
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch the image from the network, cache it, and return it
        return fetch(event.request).then((response) => {
          return caches.open("noroff-static-images").then((cache) => {
            // Only cache valid responses
            if (response && response.status === 200 && response.type === "basic") {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
    );
  }
});
