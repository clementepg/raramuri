const data=BRIDGE_DATA;
const byId=id=>document.getElementById(id);
const audio=byId('native-audio');
const listenButton=byId('listen-word');
const helpDialog=byId('help-dialog');
const guideDialog=byId('guide-dialog');
const languages=Object.create(null),scenes=Object.create(null);
data.languages.forEach(language=>{languages[language.id]=language;});
data.scenes.forEach(scene=>{scenes[scene.id]=scene;});
const order=data.scenes.map(scene=>scene.id);
let currentScene='agua',currentLanguage='es',currentCategory='objects';
const familyVoices=new FamilyVoiceStore();
function clearSpeaking(){
  byId('raramuri-cell').classList.remove('is-speaking');
  byId('other-cell').classList.remove('is-speaking');
}
const player=new LessonPlayer(audio,{
  onState:(language,playing)=>{
    clearSpeaking(); listenButton.classList.toggle('is-playing',playing);
    if(language)byId(language==='rar'?'raramuri-cell':'other-cell').classList.add('is-speaking');
  },
  onError:()=>{byId('audio-error').hidden=false;byId('announcement').textContent='No se escuchó. Intenta otra vez.';}
});
const recorder=new FamilyRecorder(familyVoices,()=>renderState(currentScene,currentLanguage));
familyVoices.open().then(()=>renderState(currentScene,currentLanguage)).catch(()=>{});
function nativeWord(scene){
  const saved=familyVoices.get(scene.id);
  return saved?{text:saved.text,audio:saved.audio,family:true,note:'Palabra y voz añadidas por esta familia; guardadas en este dispositivo.'}:scene.words.rar;
}
function stopAudio(){player.stop();}
function stateFromLocation(){
  const hash=location.hash.slice(1);
  let scene=hash==='taza'?'agua':hash;
  if(!scenes[scene])scene=hash?currentScene:'agua';
  const requested=new URL(location.href).searchParams.get('lang');
  return {scene,language:requested!=='rar'&&languages[requested]?requested:'es'};
}
function availableItems(){
  const scene=scenes[currentScene];
  return [player.itemFor(nativeWord(scene),languages.rar,false),
    player.itemFor(scene.words[currentLanguage],languages[currentLanguage],byId('device-voices').checked)].filter(Boolean);
}
function updateAudioAvailability(){
  const scene=scenes[currentScene],native=nativeWord(scene),other=scene.words[currentLanguage];
  const items=availableItems(),nativeItem=items.find(item=>item.language==='rar'),otherItem=items.find(item=>item.language===currentLanguage);
  byId('raramuri-status').hidden=Boolean(nativeItem&&!native.family)||!items.length||!native.text;
  byId('raramuri-status').textContent=native.family?'Voz familiar':'Sin audio';
  byId('other-status').hidden=Boolean(otherItem?.kind==='file')||!items.length;
  byId('other-status').textContent=otherItem?.kind==='speech'?'Voz del dispositivo':'Sin audio';
  listenButton.hidden=!items.length; byId('audio-unavailable').hidden=Boolean(items.length);
  listenButton.setAttribute('aria-label','Escuchar '+scene.spanish.toLowerCase()+' en '+items.map(item=>languages[item.language].label).join(' y '));
}
function addSourceCredits(scene,languageId){
  const word=languageId==='rar'?nativeWord(scene):scene.words[languageId];
  const language=languages[languageId],container=byId('pair-credits');
  const p=document.createElement('p');
  if(word.family){p.textContent='Rarámuri: voz familiar guardada únicamente en este dispositivo.';container.append(p);return;}
  if(!word.text){p.textContent='Rarámuri: buscamos la palabra o expresión natural de esta situación para revisarla con hablantes.';container.append(p);return;}
  const credit=word.audio?data.audioCredits[word.audio]:null;
  const device=languageId!=='rar'&&player.itemFor(word,language,byId('device-voices').checked)?.kind==='speech';
  p.textContent=language.label+': '+(credit?credit.author+'. '+credit.changes:device?'Voz sintética del dispositivo; no es una grabación de hablante.':'Grabación aún no disponible.');
  container.append(p);
  const source=document.createElement('a'); source.textContent='Fuente: '+language.label;
  source.href=word.sourceUrl||(credit&&credit.sourceUrl)||'./THIRD_PARTY_NOTICES.md';
  source.target='_blank';source.rel='noopener';source.className='credit-link';container.append(source);
  if(!credit)return;
  if(credit.sourceUrl!==source.href){
    const recording=document.createElement('a');recording.textContent='Grabación: '+language.label;recording.href=credit.sourceUrl;
    recording.target='_blank';recording.rel='noopener';recording.className='credit-link';container.append(recording);
  }
  const license=document.createElement('a');license.textContent=language.label+': '+credit.license;license.href=credit.licenseUrl;
  license.target='_blank';license.rel='noopener';license.className='credit-link';container.append(license);
}
function renderLibrary(){
  byId('topic-select').value=currentCategory;
  document.querySelectorAll('.vocabulary-card').forEach(button=>{
    button.hidden=scenes[button.dataset.scene].category!==currentCategory;
    button.setAttribute('aria-pressed',String(button.dataset.scene===currentScene));
  });
}
function renderState(sceneId,languageId,announce=false){
  stopAudio();currentScene=sceneId;currentLanguage=languageId;currentCategory=scenes[sceneId].category;
  const scene=scenes[sceneId],language=languages[languageId],native=nativeWord(scene),other=scene.words[languageId];
  const image=byId('scene-image');if(image.getAttribute('src')!=='./'+scene.image)image.src='./'+scene.image;image.alt=scene.alt;
  byId('native-word').textContent=native.text||'Por revisar';byId('native-word').classList.toggle('word-pending',!native.text);
  byId('native-word').lang=native.text?'tar':'es';
  byId('other-word').textContent=other.text;byId('other-word').lang=language.lang;
  byId('other-cell').setAttribute('aria-label',language.label);byId('spanish-meaning').textContent=scene.spanish;
  byId('language-select').value=languageId;byId('parent-tip').textContent=scene.tip;
  byId('word-reference').textContent=native.text?native.text+' — '+scene.spanish.toLowerCase()+'. '+(native.note||''):'Esta expresión en rarámuri está pendiente de revisión. Una persona hablante puede añadir la voz de su familia.';
  byId('other-reference').textContent=other.text+' — '+scene.spanish.toLowerCase()+'. '+(other.note||'');
  byId('romanization').textContent=other.romanization?'Pinyin: '+other.romanization+'.':'';byId('romanization').hidden=!other.romanization;
  byId('pair-credits').replaceChildren();addSourceCredits(scene,'rar');addSourceCredits(scene,languageId);
  byId('audio-error').hidden=true;audio.removeAttribute('src');audio.load();
  updateAudioAvailability();renderLibrary();
  document.title=scene.spanish+' · Rarámuri + '+language.label;
  if(announce)byId('announcement').textContent=scene.spanish+'. Rarámuri y '+language.label+'.';
}
function navigate(sceneId,languageId){
  if(sceneId===currentScene&&languageId===currentLanguage)return;
  const url=new URL(location.href);
  if(languageId==='es')url.searchParams.delete('lang');else url.searchParams.set('lang',languageId);
  url.hash=sceneId;history.pushState(null,'',url.pathname+url.search+url.hash);renderState(sceneId,languageId,true);
}
function syncLocation(){const state=stateFromLocation();if(state.scene!==currentScene||state.language!==currentLanguage)renderState(state.scene,state.language,true);}
listenButton.addEventListener('click',()=>{byId('audio-error').hidden=true;player.play(availableItems());});
byId('language-select').addEventListener('change',event=>navigate(currentScene,event.target.value));
byId('next-scene').addEventListener('click',()=>{
  const group=order.filter(id=>scenes[id].category===currentCategory);
  navigate(group[(group.indexOf(currentScene)+1)%group.length],currentLanguage);
});
byId('topic-select').addEventListener('change',event=>{
  currentCategory=event.target.value;const next=order.find(id=>scenes[id].category===currentCategory);navigate(next,currentLanguage);
});
byId('device-voices').addEventListener('change',()=>renderState(currentScene,currentLanguage));
globalThis.speechSynthesis?.addEventListener('voiceschanged',()=>{
  updateAudioAvailability();byId('pair-credits').replaceChildren();addSourceCredits(scenes[currentScene],'rar');addSourceCredits(scenes[currentScene],currentLanguage);
});
addEventListener('hashchange',syncLocation);addEventListener('popstate',syncLocation);
byId('skip-scene').addEventListener('click',event=>{event.preventDefault();byId('escena').focus();byId('escena').scrollIntoView({block:'start'});});
function openDialog(dialog){stopAudio();if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');}
function closeDialog(dialog){if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');}
byId('open-help').addEventListener('click',()=>{byId('source-details').open=false;openDialog(helpDialog);});
byId('close-help').addEventListener('click',()=>closeDialog(helpDialog));
byId('open-guide').addEventListener('click',()=>{openDialog(guideDialog);guideDialog.scrollTop=0;});
byId('close-guide').addEventListener('click',()=>closeDialog(guideDialog));
for(const dialog of [helpDialog,guideDialog])dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;const b=dialog.getBoundingClientRect();
  if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)closeDialog(dialog);
});
byId('open-voice').addEventListener('click',()=>{closeDialog(helpDialog);stopAudio();recorder.open(scenes[currentScene],nativeWord(scenes[currentScene]),new Set(order));});
data.scenes.forEach(scene=>{
  const button=document.createElement('button');button.type='button';button.className='vocabulary-card';button.dataset.scene=scene.id;
  button.setAttribute('aria-label','Ver '+scene.spanish.toLowerCase());
  const image=document.createElement('img');image.src='./'+scene.image;image.alt='';image.loading='lazy';image.width=96;image.height=96;
  const label=document.createElement('span');label.textContent=scene.spanish;button.append(image,label);
  button.addEventListener('click',()=>{navigate(scene.id,currentLanguage);byId('escena').focus({preventScroll:true});byId('escena').scrollIntoView({block:'start'});});
  byId('vocabulary-grid').append(button);
});
const initialState=stateFromLocation();renderState(initialState.scene,initialState.language);
if('serviceWorker'in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
