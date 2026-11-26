const CACHE = 'raramuri-family-prototype-v5';
const ASSETS = ['./', './index.html', './styles.css?v=5', './bridge-data.js?v=5', './app.js?v=5',
  './icon.svg', './manifest.webmanifest', './greeting.png', './play-ball.png', './cup.png',
  './water-choguita.wav',
  './voice-en-water.mp3', './voice-en-hello.mp3', './voice-en-ball.mp3',
  './voice-es-agua.mp3', './voice-es-hola.mp3', './voice-es-pelota.mp3',
  './voice-fr-eau.mp3', './voice-fr-bonjour.mp3', './voice-it-acqua.mp3',
  './voice-de-wasser.mp3', './voice-de-hallo.mp3', './voice-de-ball.mp3', './voice-zh-shui.mp3'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('raramuri-family-prototype-') && key !== CACHE)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

async function serveAudio(request) {
  const cached = await caches.match(request.url);
  if (!cached) return fetch(request);
  const range = request.headers.get('range');
  if (!range) return cached;
  const bytes = await cached.arrayBuffer();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  const invalid = () => new Response(null, {status:416,headers:{'Content-Range':'bytes */'+bytes.byteLength}});
  if (!match || (!match[1] && !match[2])) return invalid();
  const start = match[1] ? Number(match[1]) : Math.max(0, bytes.byteLength-Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]),bytes.byteLength-1) : bytes.byteLength-1;
  if (start >= bytes.byteLength || start > end) return invalid();
  const headers = new Headers(cached.headers);
  headers.set('Content-Range','bytes '+start+'-'+end+'/'+bytes.byteLength);
  headers.set('Content-Length',String(end-start+1));
  headers.set('Accept-Ranges','bytes');
  return new Response(bytes.slice(start,end+1),{status:206,headers});
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.endsWith('.pdf')) return;
  if (/\.(wav|mp3)$/i.test(url.pathname)) {
    event.respondWith(serveAudio(event.request));
    return;
  }
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(response => {
    if (response.status === 200) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(() => caches.match(event.request)));
});
