const CACHE = 'scanner-v9';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  // 行情数据永远走网络，不缓存
  if (url.hostname.includes('financialmodelingprep.com')) return;
  // 页面与 vault.json：网络优先，离线回退缓存
  if (req.mode === 'navigate' || url.pathname.endsWith('/vault.json') || url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req.mode === 'navigate' ? './index.html' : req, cp)); }
      return r;
    }).catch(() => caches.match(req.mode === 'navigate' ? './index.html' : req)));
    return;
  }
  // 静态资源（含 Tailwind CDN）：缓存优先
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
    return r;
  })));
});
