const scenes = {
  agua: {
    image: 'cup.png',
    alt: 'Una persona adulta muestra una taza a un niño pequeño.',
    native: 'baʔˈwí', spanish: 'Agua', page: '202', example: '2e',
    tip: 'Escuchen juntos. Después, señala el agua en una taza de casa.',
    note: 'La palabra significa agua. La taza de la imagen sirve para compartirla.',
    audio: 'water-choguita.wav'
  },
  saludar: {
    image: 'greeting.png',
    alt: 'Una persona adulta y un niño pequeño se saludan con la mano.',
    native: 'ˈkuíra (ba)', spanish: 'Hola', page: '387', example: '41b',
    tip: 'Miren juntos la imagen y saluda con un gesto.',
    note: 'La fuente presenta ba como una parte opcional del saludo.',
    audio: null
  },
  jugar: {
    image: 'play-ball.png',
    alt: 'Una persona adulta hace rodar una pelota hacia un niño pequeño.',
    native: 'peˈlôta', spanish: 'Pelota', page: '608', example: '7b',
    tip: 'Busquen una pelota y háganla rodar juntos.',
    note: 'Palabra de origen español documentada en el habla de Choguita.',
    audio: null
  }
};

const order = ['agua', 'saludar', 'jugar'];
const byId = id => document.getElementById(id);
const audio = byId('native-audio');
const listenButton = byId('listen-word');
const helpDialog = byId('help-dialog');
let currentScene = 'agua';
let playRequest = 0;

function sceneFromHash() {
  const id = location.hash.slice(1);
  if (id === 'taza') return 'agua'; // Existing shared links keep working.
  return Object.prototype.hasOwnProperty.call(scenes, id) ? id : null;
}

function stopAudio() {
  playRequest += 1;
  audio.pause();
  listenButton.classList.remove('is-playing');
}

function renderScene(id, announce = false) {
  stopAudio();
  currentScene = id;
  const scene = scenes[id];
  byId('scene-image').src = './' + scene.image;
  byId('scene-image').alt = scene.alt;
  byId('native-word').textContent = scene.native;
  byId('spanish-meaning').textContent = scene.spanish;
  byId('parent-tip').textContent = scene.tip;
  byId('word-reference').textContent = scene.native + ' = ' + scene.spanish.toLowerCase()
    + '. Caballero (2022), p. ' + scene.page + ', ejemplo (' + scene.example + '). ' + scene.note;
  listenButton.hidden = !scene.audio;
  byId('audio-unavailable').hidden = Boolean(scene.audio);
  listenButton.setAttribute('aria-label', 'Escuchar ' + scene.spanish.toLowerCase() + ' en rarámuri');
  byId('audio-error').hidden = true;
  if (scene.audio) {
    if (audio.getAttribute('src') !== './' + scene.audio) audio.src = './' + scene.audio;
  } else {
    audio.removeAttribute('src');
    audio.load();
  }
  document.title = scene.spanish + ' · Rarámuri en familia';
  if (announce) byId('announcement').textContent = scene.spanish;
}

listenButton.addEventListener('click', async () => {
  if (!scenes[currentScene].audio) return;
  const request = ++playRequest;
  byId('audio-error').hidden = true;
  audio.currentTime = 0;
  try {
    await audio.play();
    if (request === playRequest && !audio.paused) listenButton.classList.add('is-playing');
  } catch (error) {
    if (request !== playRequest) return;
    listenButton.classList.remove('is-playing');
    byId('audio-error').hidden = false;
    byId('announcement').textContent = 'No se escuchó. Intenta otra vez.';
  }
});

audio.addEventListener('ended', () => listenButton.classList.remove('is-playing'));
audio.addEventListener('pause', () => listenButton.classList.remove('is-playing'));

byId('next-scene').addEventListener('click', () => {
  const next = order[(order.indexOf(currentScene) + 1) % order.length];
  location.hash = next;
});
addEventListener('hashchange', () => {
  const id = sceneFromHash();
  if (id || !location.hash) renderScene(id || 'agua', true);
});

byId('open-help').addEventListener('click', () => {
  stopAudio();
  byId('source-details').open = false;
  if (typeof helpDialog.showModal === 'function') helpDialog.showModal();
  else helpDialog.setAttribute('open', '');
});
byId('close-help').addEventListener('click', () => {
  if (typeof helpDialog.close === 'function') helpDialog.close();
  else helpDialog.removeAttribute('open');
});
helpDialog.addEventListener('click', event => {
  if (event.target !== helpDialog) return;
  const bounds = helpDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    if (typeof helpDialog.close === 'function') helpDialog.close();
    else helpDialog.removeAttribute('open');
  }
});

renderScene(sceneFromHash() || 'agua');

if ('serviceWorker' in navigator && (location.protocol === 'https:'
    || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
