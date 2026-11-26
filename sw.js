const CACHE = 'raramuri-family-prototype-v7';
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=7",
  "./bridge-data.js?v=7",
  "./lesson-player.js?v=7",
  "./family-voices.js?v=7",
  "./family-recorder.js?v=7",
  "./app.js?v=7",
  "./icon.svg",
  "./manifest.webmanifest",
  "./learn-mas.webp",
  "./learn-ayuda.webp",
  "./no.webp",
  "./learn-para.webp",
  "./learn-termine.webp",
  "./learn-quiero.webp",
  "./si.webp",
  "./learn-dame.webp",
  "./learn-ven.webp",
  "./learn-abre.webp",
  "./learn-upa.webp",
  "./learn-bajame.webp",
  "./learn-mira.webp",
  "./greeting-family.webp",
  "./learn-adios.webp",
  "./learn-mama.webp",
  "./learn-papa.webp",
  "./learn-abuela.webp",
  "./learn-abuelo.webp",
  "./learn-bebe.webp",
  "./comer.webp",
  "./learn-beber.webp",
  "./learn-dormir.webp",
  "./learn-jugar-accion.webp",
  "./learn-ir.webp",
  "./learn-lavar.webp",
  "./learn-abrazar.webp",
  "./cup-family.webp",
  "./learn-leche.webp",
  "./learn-comida.webp",
  "./learn-vaso.webp",
  "./learn-cuchara.webp",
  "./play-ball-family.webp",
  "./learn-libro.webp",
  "./learn-zapato.webp",
  "./learn-cobija.webp",
  "./learn-mano.webp",
  "./learn-pie.webp",
  "./learn-boca.webp",
  "./nariz.webp",
  "./learn-ojos.webp",
  "./learn-duele.webp",
  "./learn-cansancio.webp",
  "./perro.webp",
  "./learn-gato.webp",
  "./learn-gallina.webp",
  "./sol.webp",
  "./learn-lluvia.webp",
  "./learn-arbol.webp",
  "./learn-casa.webp",
  "./elote.webp",
  "./calabacita.webp",
  "./noche.webp",
  "./raton.webp",
  "./water-choguita.wav",
  "./voice-en-water.mp3",
  "./voice-en-hello.mp3",
  "./voice-en-ball.mp3",
  "./voice-es-agua.mp3",
  "./voice-es-hola.mp3",
  "./voice-es-pelota.mp3",
  "./voice-fr-eau.mp3",
  "./voice-fr-bonjour.mp3",
  "./voice-it-acqua.mp3",
  "./voice-de-wasser.mp3",
  "./voice-de-hallo.mp3",
  "./voice-de-ball.mp3",
  "./voice-zh-shui.mp3",
  "./native-sol.wav",
  "./native-elote.wav",
  "./first-es-perro.mp3",
  "./first-en-perro.mp3",
  "./first-es-comer.mp3",
  "./first-en-comer.mp3",
  "./first-es-nariz.mp3",
  "./first-en-nariz.mp3",
  "./first-es-sol.mp3",
  "./first-en-sol.mp3",
  "./first-es-noche.mp3",
  "./first-en-noche.mp3",
  "./first-es-elote.mp3",
  "./first-en-elote.mp3",
  "./first-es-calabacita.mp3",
  "./first-en-calabacita.mp3",
  "./first-es-raton.mp3",
  "./first-en-raton.mp3",
  "./first-es-si.mp3",
  "./first-en-si.mp3",
  "./first-es-no.mp3",
  "./first-en-no.mp3",
  "./v7-es-mas.mp3",
  "./v7-en-mas.mp3",
  "./v7-es-ayuda.mp3",
  "./v7-en-ayuda.mp3",
  "./v7-es-para.mp3",
  "./v7-en-para.mp3",
  "./v7-es-quiero.mp3",
  "./v7-en-dame.mp3",
  "./v7-es-ven.mp3",
  "./v7-es-abre.mp3",
  "./v7-es-mira.mp3",
  "./v7-en-mira.mp3",
  "./v7-en-adios.mp3",
  "./v7-es-mama.mp3",
  "./v7-en-mama.mp3",
  "./v7-es-papa.mp3",
  "./v7-en-papa.mp3",
  "./v7-es-abuela.mp3",
  "./v7-en-abuela.mp3",
  "./v7-es-abuelo.mp3",
  "./v7-en-abuelo.mp3",
  "./v7-es-bebe.mp3",
  "./v7-en-bebe.mp3",
  "./v7-es-beber.mp3",
  "./v7-en-beber.mp3",
  "./v7-es-dormir.mp3",
  "./v7-en-dormir.mp3",
  "./v7-es-jugar-accion.mp3",
  "./v7-en-jugar-accion.mp3",
  "./v7-es-ir.mp3",
  "./v7-en-ir.mp3",
  "./v7-es-lavar.mp3",
  "./v7-en-lavar.mp3",
  "./v7-es-abrazar.mp3",
  "./v7-en-abrazar.mp3",
  "./v7-es-leche.mp3",
  "./v7-en-leche.mp3",
  "./v7-es-comida.mp3",
  "./v7-en-comida.mp3",
  "./v7-es-vaso.mp3",
  "./v7-en-vaso.mp3",
  "./v7-es-cuchara.mp3",
  "./v7-en-cuchara.mp3",
  "./v7-es-libro.mp3",
  "./v7-en-libro.mp3",
  "./v7-es-zapato.mp3",
  "./v7-en-zapato.mp3",
  "./v7-en-cobija.mp3",
  "./v7-es-mano.mp3",
  "./v7-en-mano.mp3",
  "./v7-es-pie.mp3",
  "./v7-en-pie.mp3",
  "./v7-es-boca.mp3",
  "./v7-en-boca.mp3",
  "./v7-es-ojos.mp3",
  "./v7-en-ojos.mp3",
  "./v7-es-gato.mp3",
  "./v7-en-gato.mp3",
  "./v7-es-gallina.mp3",
  "./v7-en-gallina.mp3",
  "./v7-es-lluvia.mp3",
  "./v7-en-lluvia.mp3",
  "./v7-es-arbol.mp3",
  "./v7-en-arbol.mp3",
  "./v7-es-casa.mp3",
  "./v7-en-casa.mp3"
];

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
