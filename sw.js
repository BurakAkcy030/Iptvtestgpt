self.addEventListener('install', e => {
  // Precache core app shell files. Icons are omitted since they're embedded via data URIs.
  e.waitUntil(
    caches.open('iptv-shell-v1').then(c => c.addAll([
      './',
      './index.html',
      './manifest.json'
    ]))
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
