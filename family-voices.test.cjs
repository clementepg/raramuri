const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
test('closing the adult recorder while permission is pending immediately releases a later microphone stream',async()=>{
  const nodes=new Map();let permission,stopped=0,constructed=0;
  const node=id=>{
    if(!nodes.has(id))nodes.set(id,{value:'',hidden:false,disabled:false,open:false,events:{},addEventListener(name,fn){this.events[name]=fn;},pause(){},removeAttribute(){},showModal(){this.open=true;},close(){this.open=false;this.events.close?.();}});
    return nodes.get(id);
  };
  const Recorder=vm.runInNewContext(fs.readFileSync('family-recorder.js','utf8')+';FamilyRecorder',{
    document:{hidden:false,getElementById:node,addEventListener(){}},addEventListener(){},
    navigator:{mediaDevices:{getUserMedia:()=>new Promise(resolve=>{permission=resolve;})}},
    MediaRecorder:class{constructor(){constructed++;}static isTypeSupported(){return true;}},
    clearTimeout(){},setTimeout(){},URL:{revokeObjectURL(){}}
  });
  const recorder=new Recorder({db:{},get:()=>null,records:new Map()},()=>{});
  recorder.open({id:'mas',spanish:'Más',tip:'Pedir más.'},{text:null},new Set(['mas']));
  const pending=recorder.start();recorder.close();permission({getTracks:()=>[{stop:()=>stopped++}]});await pending;
  assert.equal(stopped,1);assert.equal(constructed,0);assert.equal(node('voice-dialog').open,false);
});
test('invalid or foreign voice backups are rejected before any database write',async()=>{
  const Store=vm.runInNewContext(fs.readFileSync('family-voices.js','utf8')+';FamilyVoiceStore',{Blob,URL,atob});
  const store=new Store();let writes=0;store.db={transaction(){writes++;throw Error('should not write');}};
  const invalid={format:'raramuri-family-voices',version:1,records:[{id:'foreign',text:'word',mime:'audio/webm',audio:'YQ=='}]};
  await assert.rejects(store.restore(new Blob([JSON.stringify(invalid)]),new Set(['mas'])));
  assert.equal(writes,0);
});

test('a delayed old recorder stop cannot remove the new recording time limit',async()=>{
  const nodes=new Map(),instances=[],timers=new Map();let timerId=0;
  const node=id=>{
    if(!nodes.has(id))nodes.set(id,{value:'',hidden:false,open:false,events:{},addEventListener(n,fn){this.events[n]=fn;},pause(){},removeAttribute(){},showModal(){this.open=true;},close(){this.open=false;this.events.close?.();}});
    return nodes.get(id);
  };
  const Recorder=vm.runInNewContext(fs.readFileSync('family-recorder.js','utf8')+';FamilyRecorder',{
    document:{hidden:false,getElementById:node,addEventListener(){}},addEventListener(){},
    navigator:{mediaDevices:{getUserMedia:async()=>({getTracks:()=>[{stop(){}}]})}},
    MediaRecorder:class{constructor(){this.state='inactive';this.mimeType='audio/webm';instances.push(this);}static isTypeSupported(){return true;}start(){this.state='recording';}stop(){this.state='inactive';}},
    setTimeout:(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId;},clearTimeout:id=>timers.delete(id),URL:{revokeObjectURL(){}},Blob
  });
  const recorder=new Recorder({db:{},get:()=>null,records:new Map()},()=>{});
  recorder.open({id:'mas',spanish:'Más',tip:'Pedir más.'},{text:null},new Set(['mas']));await recorder.start();
  const old=instances[0];recorder.close();recorder.open({id:'ayuda',spanish:'Ayuda',tip:'Pedir ayuda.'},{text:null},new Set(['mas','ayuda']));await recorder.start();
  const currentLimit=recorder.limit;old.onstop();
  assert.equal(timers.get(currentLimit).delay,20000);assert.equal(instances[1].state,'recording');
  recorder.close();
});
