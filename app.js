const scenes = {
  saludar: {
    title: 'Nos saludamos', image: 'greeting.png',
    alt: 'Una persona adulta y un niño pequeño se miran y saludan con la mano.',
    caption: 'Una mirada, un gesto, un saludo.',
    description: 'Miremos la imagen y compartamos un saludo a nuestro ritmo.',
    steps: ['Miren la imagen y acompaña el saludo con un gesto.', 'Si conoces una expresión de tu comunidad, úsala.', 'Responde a sus miradas, gestos o sonidos. No hace falta que repita.'],
    together: 'Saluda con un gesto y responde a lo que mire o haga tu niña o niño.',
    native: 'ˈkuíra (ba)', spanish: 'Hola', page: '387', example: '41b',
    sourceNote: 'La fuente presenta ba entre paréntesis como una parte opcional del saludo.', audio: null
  },
  jugar: {
    title: 'La pelota', image: 'play-ball.png',
    alt: 'Una persona adulta hace rodar una pelota grande hacia un niño pequeño sentado en una alfombra.',
    caption: 'La pelota va y viene, y el juego también.',
    description: 'Una pelota, nuestra voz y un momento para jugar en compañía.',
    steps: ['Busquen una pelota y un espacio cómodo.', 'Hazla rodar y acompaña el juego con tu voz.', 'Sigue su interés. Pueden parar o volver cuando quieran.'],
    together: 'Hagan rodar la pelota y acompaña el juego con tu voz. Sigue sus miradas, gestos o sonidos.',
    native: 'peˈlôta', spanish: 'Pelota', page: '608', example: '7b',
    sourceNote: 'Palabra de origen español documentada en el habla de Choguita. Se usa el nombre del objeto para esta escena de rodar una pelota.', audio: null
  },
  taza: {
    title: 'Agua', image: 'cup.png',
    alt: 'Una persona adulta muestra una taza de color verde a un niño pequeño sentado en su silla.',
    caption: 'Un poco de agua, un momento para compartir.',
    description: 'Escuchemos el nombre del agua y compartámoslo con un recipiente de casa.',
    steps: ['Escucha la palabra en la grabación de Choguita.', 'Muestra un poco de agua en el recipiente que estén usando y comparte la palabra.', 'Acompaña lo que mire o señale. No hace falta que repita.'],
    together: 'Muestra el agua en su recipiente y comparte la palabra. Sigue las miradas, los gestos y los sonidos de tu niña o niño.',
    native: 'baʔˈwí', spanish: 'Agua', page: '202', example: '2e',
    sourceNote: 'Se conserva la transcripción fonémica de la fuente. La pronunciación puede variar entre hablantes. Esta palabra significa agua; la imagen muestra un recipiente para compartirla.',
    audio: 'water-choguita.wav'
  }
};

let currentScene = 'saludar';
const byId = id => document.getElementById(id);
const sceneButtons = [...document.querySelectorAll('[data-scene]')];

function renderScene(id, announce = false) {
  if (!Object.hasOwn(scenes, id)) id = 'saludar';
  currentScene = id;
  const scene = scenes[id];
  byId('scene-title').textContent = scene.title;
  byId('scene-description').textContent = scene.description;
  byId('scene-caption').textContent = scene.caption;
  byId('scene-image').src = './' + scene.image;
  byId('scene-image').alt = scene.alt;
  byId('native-word').textContent = scene.native;
  byId('spanish-meaning').textContent = scene.spanish;
  const audio = byId('native-audio');
  audio.pause();
  if (scene.audio) audio.src = './' + scene.audio;
  else { audio.removeAttribute('src'); audio.load(); }
  byId('listen-word').hidden = !scene.audio;
  byId('listen-word').disabled = false;
  byId('listen-word').textContent = 'Escuchar en rarámuri';
  byId('voice-status').textContent = scene.audio ? 'Jesusita Loya Guerra · Choguita' : 'Grabación pendiente para esta palabra';
  byId('voice-note').textContent = scene.audio ? 'Grabación original de la palabra agua. Fuente: Caballero (2022), ejemplo 2e, p. 202. CC BY 4.0.' : 'La palabra está documentada en la fuente. La escena Agua ya incluye una grabación de una hablante de Choguita.';
  byId('scene-steps').replaceChildren(...scene.steps.map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
  sceneButtons.forEach(button => {
    const active = button.dataset.scene === id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.title = scene.title + ' · Rarámuri en familia';
  if (announce) byId('scene-announcement').textContent = 'Escena seleccionada: ' + scene.title;
}

sceneButtons.forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.scene;
  if (location.hash.slice(1) === id) renderScene(id, true);
  else location.hash = id;
}));
addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (Object.hasOwn(scenes, id)) renderScene(id, true);
});
renderScene(location.hash.slice(1));

byId('play-together').addEventListener('click', () => {
  const scene = scenes[currentScene];
  byId('together-image').src = './' + scene.image;
  byId('together-image').alt = scene.alt;
  byId('together-prompt').textContent = scene.together;
  byId('together-dialog').showModal();
});

const infoCopy = {
  family: { title: 'Aprendemos en compañía', paragraphs: [
    'Esta propuesta está pensada para familias de Guachochi con niñas y niños de 12 a 24 meses. El español orienta a la persona adulta. Esta prueba incluye tres palabras documentadas del rarámuri de Choguita y una grabación original de agua.',
    'Miren una escena, compartan un gesto y continúen con la actividad real. Sigue su interés y responde a sus miradas, gestos o sonidos. No hace falta que repita.',
    'Las ilustraciones son un punto de partida. Pueden dejar el dispositivo a un lado y compartir el momento con objetos de casa.'
  ] },
  about: { title: 'Sobre esta propuesta', paragraphs: [
    'Rarámuri en familia es un título de trabajo para una ayuda infantil ilustrada. Esta es una primera versión visual para revisar en teléfonos y tabletas.',
    'Para esta prueba se usa material publicado de Choguita, en el municipio de Guachochi. Se conserva la transcripción lingüística de la fuente, con sus marcas. La escritura práctica y la ampliación del curso se revisarán con hablantes de la comunidad elegida.',
    'Las tres ilustraciones fueron generadas por IA y representan personajes ficticios. La representación visual también se revisará con la comunidad.',
    'No se solicitan cuentas ni datos del niño. El sitio no utiliza analítica ni grabaciones de micrófono.'
  ] }
};

byId('listen-word').addEventListener('click', async () => {
  if (!scenes[currentScene].audio) return;
  const audio = byId('native-audio');
  audio.currentTime = 0;
  try {
    await audio.play();
    byId('listen-word').textContent = 'Escuchando…';
    byId('audio-announcement').textContent = 'Reproduciendo la palabra agua en rarámuri.';
  } catch {
    byId('audio-announcement').textContent = 'No se pudo reproducir la grabación. Puedes volver a intentarlo.';
  }
});
byId('native-audio').addEventListener('ended', () => {
  byId('listen-word').textContent = 'Escuchar otra vez';
  byId('audio-announcement').textContent = 'Terminó la grabación. Puedes escucharla otra vez.';
});

byId('word-source').addEventListener('click', () => {
  const scene = scenes[currentScene];
  byId('information-title').textContent = scene.spanish + ' · Choguita';
  const paragraphs = [
    scene.native + ' = ' + scene.spanish.toLowerCase() + '.',
    'Gabriela Caballero (2022), A grammar of Choguita Rarámuri, p. ' + scene.page + ', ejemplo (' + scene.example + '). En colaboración con Luz Elena León Ramírez, Sebastián Fuentes Holguín, Bertha Fuentes Loya y otras personas expertas de Choguita.',
    'Transcripción de la fuente: el libro emplea transcripción fonémica (p. 65). Se mantienen las marcas originales. No es una propuesta de ortografía escolar.',
    scene.sourceNote,
    ...(scene.audio ? ['Audio: Jesusita Loya Guerra; Caballero (2022), Audio files accompanying A grammar of Choguita Rarámuri. Archivo co1234[06_044-06_053].wav. CC BY 4.0. Sin modificaciones.'] : [])
  ];
  const nodes = paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; });
  for (const [label, url] of [
    ['Consultar el libro y sus créditos', 'https://langsci-press.org/catalog/book/324'],
    ...(scene.audio ? [['Consultar el archivo de audio', 'https://zenodo.org/records/7268366']] : []),
    ['Licencia Creative Commons Attribution 4.0', 'https://creativecommons.org/licenses/by/4.0/']
  ]) {
    const a = document.createElement('a'); a.textContent = label; a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.className = 'reference-link'; nodes.push(a);
  }
  byId('information-content').replaceChildren(...nodes);
  byId('information-dialog').showModal();
});

function openInformation(kind) {
  const content = infoCopy[kind];
  byId('information-title').textContent = content.title;
  byId('information-content').replaceChildren(...content.paragraphs.map(text => {
    const paragraph = document.createElement('p'); paragraph.textContent = text; return paragraph;
  }));
  byId('information-dialog').showModal();
}
byId('family-guide').addEventListener('click', () => openInformation('family'));
byId('about-project').addEventListener('click', () => openInformation('about'));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}));

// Only the source-attested water recording is played; no synthetic native speech is used.
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
