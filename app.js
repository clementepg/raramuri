const data = BRIDGE_DATA;
const byId = id => document.getElementById(id);
const audio = byId('native-audio');
const listenButton = byId('listen-word');
const helpDialog = byId('help-dialog');
const languages = Object.create(null);
const scenes = Object.create(null);
data.languages.forEach(language => { languages[language.id] = language; });
data.scenes.forEach(scene => { scenes[scene.id] = scene; });
const order = data.scenes.map(scene => scene.id);
let currentScene = 'agua';
let currentLanguage = 'es';
let playRequest = 0;
let playQueue = [];
let playIndex = 0;
let nextVoiceTimer;

function stateFromLocation() {
  const hash = location.hash.slice(1);
  let scene = hash === 'taza' ? 'agua' : hash;
  if (!scenes[scene]) scene = hash ? currentScene : 'agua';
  const requested = new URL(location.href).searchParams.get('lang');
  return {scene,language:requested !== 'rar' && languages[requested] ? requested : 'es'};
}
function clearSpeaking() {
  byId('raramuri-cell').classList.remove('is-speaking');
  byId('other-cell').classList.remove('is-speaking');
}
function stopAudio() {
  playRequest += 1;
  clearTimeout(nextVoiceTimer);
  playQueue = [];
  audio.pause();
  listenButton.classList.remove('is-playing');
  clearSpeaking();
}
function addSourceCredits(scene, languageId) {
  const word = scene.words[languageId];
  const language = languages[languageId];
  const credit = word.audio ? data.audioCredits[word.audio] : null;
  const container = byId('pair-credits');
  const p = document.createElement('p');
  p.textContent = language.label + ': ' + (credit ? credit.author + '. ' + credit.changes : 'Grabación aún no disponible.');
  container.append(p);
  const source = document.createElement('a');
  source.textContent = 'Fuente: ' + language.label;
  source.href = word.sourceUrl || (credit && credit.sourceUrl) || './THIRD_PARTY_NOTICES.md';
  source.target = '_blank'; source.rel = 'noopener'; source.className = 'credit-link';
  container.append(source);
  if (!credit) return;
  if (credit.sourceUrl !== source.href) {
    const recording = document.createElement('a');
    recording.textContent = 'Grabación: ' + language.label; recording.href = credit.sourceUrl;
    recording.target = '_blank'; recording.rel = 'noopener'; recording.className = 'credit-link';
    container.append(recording);
  }
  const license = document.createElement('a');
  license.textContent = language.label + ': ' + credit.license; license.href = credit.licenseUrl;
  license.target = '_blank'; license.rel = 'noopener'; license.className = 'credit-link';
  container.append(license);
}
function renderState(sceneId, languageId, announce = false) {
  stopAudio();
  currentScene = sceneId; currentLanguage = languageId;
  const scene = scenes[sceneId], language = languages[languageId];
  const raramuri = scene.words.rar, other = scene.words[languageId];
  const hasAudio = Boolean(raramuri.audio || other.audio);
  const image = byId('scene-image');
  if (image.getAttribute('src') !== './' + scene.image) image.src = './' + scene.image;
  image.alt = scene.alt;
  byId('native-word').textContent = raramuri.text;
  byId('other-word').textContent = other.text;
  byId('other-word').lang = language.lang;
  byId('other-cell').setAttribute('aria-label',language.label);
  byId('spanish-meaning').textContent = scene.spanish;
  byId('language-select').value = languageId;
  byId('parent-tip').textContent = scene.tip;
  byId('word-reference').textContent = raramuri.text + ' = ' + scene.spanish.toLowerCase() + '. ' + (raramuri.note || '');
  byId('other-reference').textContent = other.text + ' = ' + scene.spanish.toLowerCase() + '. ' + (other.note || '');
  byId('romanization').textContent = other.romanization ? 'Pinyin: ' + other.romanization + '.' : '';
  byId('romanization').hidden = !other.romanization;
  byId('pair-credits').replaceChildren();
  addSourceCredits(scene,'rar'); addSourceCredits(scene,languageId);
  byId('raramuri-status').hidden = Boolean(raramuri.audio) || !hasAudio;
  byId('other-status').hidden = Boolean(other.audio) || !hasAudio;
  listenButton.hidden = !hasAudio;
  byId('audio-unavailable').hidden = hasAudio;
  const spokenLanguages = [raramuri.audio ? 'Rarámuri' : null, other.audio ? language.label : null].filter(Boolean);
  listenButton.setAttribute('aria-label','Escuchar ' + scene.spanish.toLowerCase() + ' en ' + spokenLanguages.join(' y '));
  byId('audio-error').hidden = true;
  audio.removeAttribute('src'); audio.load();
  document.title = scene.spanish + ' · Rarámuri + ' + language.label;
  if (announce) byId('announcement').textContent = scene.spanish + '. Rarámuri y ' + language.label + '.';
}
function navigate(sceneId, languageId) {
  if (sceneId === currentScene && languageId === currentLanguage) return;
  const url = new URL(location.href);
  if (languageId === 'es') url.searchParams.delete('lang'); else url.searchParams.set('lang',languageId);
  url.hash = sceneId;
  history.pushState(null,'',url.pathname + url.search + url.hash);
  renderState(sceneId,languageId,true);
}
function syncLocation() {
  const state = stateFromLocation();
  if (state.scene !== currentScene || state.language !== currentLanguage) renderState(state.scene,state.language,true);
}
async function playCurrent(request) {
  if (request !== playRequest || !playQueue[playIndex]) return;
  const item = playQueue[playIndex];
  clearSpeaking(); audio.src = './' + item.audio;
  try {
    await audio.play();
    if (request !== playRequest || audio.paused) return;
    listenButton.classList.add('is-playing');
    byId(item.language === 'rar' ? 'raramuri-cell' : 'other-cell').classList.add('is-speaking');
  } catch (error) {
    if (request !== playRequest) return;
    stopAudio(); byId('audio-error').hidden = false;
    byId('announcement').textContent = 'No se escuchó. Intenta otra vez.';
  }
}
listenButton.addEventListener('click', () => {
  stopAudio();
  const scene = scenes[currentScene];
  playQueue = ['rar',currentLanguage].filter(id => scene.words[id].audio).map(id => ({language:id,audio:scene.words[id].audio}));
  if (!playQueue.length) return;
  byId('audio-error').hidden = true; playIndex = 0;
  listenButton.classList.add('is-playing'); playCurrent(playRequest);
});
audio.addEventListener('ended', () => {
  if (!audio.ended || !playQueue.length) return;
  clearSpeaking();
  if (playIndex + 1 < playQueue.length) {
    const request = playRequest; playIndex += 1;
    nextVoiceTimer = setTimeout(() => playCurrent(request),450);
  } else {
    playQueue = []; listenButton.classList.remove('is-playing');
  }
});
byId('language-select').addEventListener('change', event => navigate(currentScene,event.target.value));
byId('next-scene').addEventListener('click', () => navigate(order[(order.indexOf(currentScene)+1)%order.length],currentLanguage));
addEventListener('hashchange',syncLocation); addEventListener('popstate',syncLocation);
byId('skip-scene').addEventListener('click', event => {
  event.preventDefault(); byId('escena').focus(); byId('escena').scrollIntoView({block:'start'});
});
byId('open-help').addEventListener('click', () => {
  stopAudio(); byId('source-details').open = false;
  if (typeof helpDialog.showModal === 'function') helpDialog.showModal(); else helpDialog.setAttribute('open','');
});
byId('close-help').addEventListener('click', () => {
  if (typeof helpDialog.close === 'function') helpDialog.close(); else helpDialog.removeAttribute('open');
});
helpDialog.addEventListener('click', event => {
  if (event.target !== helpDialog) return;
  const b = helpDialog.getBoundingClientRect();
  if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) {
    if (typeof helpDialog.close === 'function') helpDialog.close(); else helpDialog.removeAttribute('open');
  }
});
const initialState = stateFromLocation();
renderState(initialState.scene,initialState.language);
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
