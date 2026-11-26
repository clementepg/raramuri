const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(voices=[{lang:'fr-FR'},{lang:'en-US'},{lang:'tar'}]){
  let id=0;const timers=new Map(),spoken=[],states=[];
  const synth={getVoices:()=>voices,speak:u=>spoken.push(u),cancel(){}};
  const Audio=class{
    constructor(){this.events={};this.ended=false;this.paused=true;}
    addEventListener(name,fn){this.events[name]=fn;}
    play(){this.paused=false;this.ended=false;return Promise.resolve();}
    pause(){this.paused=true;}
    finish(){this.ended=true;this.events.ended();}
  };
  const Player=vm.runInNewContext(fs.readFileSync('lesson-player.js','utf8')+';LessonPlayer',{
    speechSynthesis:synth,SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},
    setTimeout:(fn,delay)=>{timers.set(++id,{fn,delay});return id;},clearTimeout:key=>timers.delete(key)
  });
  const audio=new Audio();let errors=0;
  const player=new Player(audio,{onState:(lang,playing)=>states.push([lang,playing]),onError:()=>errors++});
  return {player,audio,synth,spoken,states,timers,get errors(){return errors;},next(){const entry=[...timers].find(([,t])=>t.delay===450);if(entry){timers.delete(entry[0]);entry[1].fn();}}};
}
test('Rarámuri is never synthesized, even if a browser advertises a matching voice',()=>{
  const {player}=setup();
  assert.equal(player.itemFor({text:'palabra'},{id:'rar',lang:'tar'},true),null);
  assert.equal(player.itemFor({text:'Bonjour'},{id:'fr',lang:'fr-FR'},false),null);
});
test('recorded native audio precedes the selected companion voice',()=>{
  const s=setup();
  s.player.play([{kind:'file',language:'rar',audio:'native.wav'},s.player.itemFor({text:'Bonjour'},{id:'fr',lang:'fr-FR'},true)]);
  assert.equal(s.audio.src,'./native.wav');assert.equal(s.spoken.length,0);
  s.audio.finish();s.next();
  assert.equal(s.spoken[0].text,'Bonjour');assert.equal(s.spoken[0].voice.lang,'fr-FR');
  s.spoken[0].onstart();s.spoken[0].onend();
  assert.equal(s.states.at(-1)[1],false);assert.equal(s.errors,0);
});
test('changing lessons cancels both queued speech and stale completion events',()=>{
  const s=setup();s.player.play([{kind:'speech',language:'fr',text:'Ancien',lang:'fr-FR',voice:{lang:'fr-FR'}}]);
  const old=s.spoken[0];s.player.stop();s.player.play([{kind:'file',language:'rar',audio:'new.wav'}]);
  const timer=s.player.startTimer;old.onstart();assert.equal(s.player.startTimer,timer);
  old.onend();s.next();assert.equal(s.audio.src,'./new.wav');assert.equal(s.spoken.length,1);assert.equal(s.player.current.language,'rar');
  s.player.stop();assert.equal(s.timers.size,0);
});
test('Mandarin never falls back to a Cantonese Hong Kong voice or an unrelated language',()=>{
  const s=setup([{lang:'zh-HK'},{lang:'en-US'}]);
  assert.equal(s.player.itemFor({text:'水'},{id:'zh',lang:'zh-CN'},true),null);
  assert.equal(s.player.itemFor({text:'Bonjour'},{id:'fr',lang:'fr-FR'},true),null);
  s.synth.getVoices=()=>[{lang:'zh-TW'}];assert.equal(s.player.voiceFor('zh-CN').lang,'zh-TW');
});
test('file recordings take priority and a failed speech start leaves the UI usable',()=>{
  const s=setup();const item=s.player.itemFor({text:'Bonjour',audio:'bonjour.mp3'},{id:'fr',lang:'fr-FR'},true);
  assert.equal(item.kind,'file');
  s.player.play([s.player.itemFor({text:'Bonjour'},{id:'fr',lang:'fr-FR'},true)]);
  const timeout=[...s.timers.values()].find(x=>x.delay===12000);timeout.fn();
  assert.equal(s.errors,1);assert.equal(s.states.at(-1)[1],false);assert.equal(s.player.current,undefined);
});
