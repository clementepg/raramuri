class FamilyRecorder {
  constructor(store,onSaved) {
    this.store=store; this.onSaved=onSaved; this.session=0;
    this.byId=id=>document.getElementById(id);
    this.dialog=this.byId('voice-dialog'); this.preview=this.byId('voice-preview');
    this.byId('voice-start').addEventListener('click',()=>this.start());
    this.byId('voice-stop').addEventListener('click',()=>this.stopCapture());
    this.byId('voice-save').addEventListener('click',()=>this.save());
    this.byId('close-voice').addEventListener('click',()=>this.close());
    this.dialog.addEventListener('cancel',()=>this.cleanup());
    this.dialog.addEventListener('close',()=>this.cleanup());
    this.byId('voice-backup').addEventListener('click',()=>this.backup());
    this.byId('voice-import').addEventListener('change',event=>this.restore(event));
    this.byId('voice-remove').addEventListener('click',()=>this.remove());
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.stopCapture();});
    addEventListener('pagehide',()=>this.cleanup());
  }
  message(text) { this.byId('voice-message').textContent=text; }
  open(scene,native,knownIds) {
    this.cleanup(); this.scene=scene; this.knownIds=knownIds;
    this.byId('voice-concept').textContent=scene.spanish;
    this.byId('voice-context').textContent=scene.tip;
    const saved=this.store.get(scene.id);
    this.byId('voice-text').value=saved?.text||native.text||'';
    this.byId('voice-remove').hidden=!saved;
    this.byId('voice-backup').disabled=!this.store.records.size;
    this.message(saved?'Ya hay una voz familiar guardada para esta palabra.':'Graba a una persona adulta que hable rarámuri.');
    if(!this.store.db) {
      this.message('Este navegador no permite guardar voces aquí. Las grabaciones publicadas siguen disponibles.');
      this.byId('voice-start').disabled=true;
    }
    this.dialog.showModal();
  }
  async start() {
    if(this.saving)return;
    if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder!=='function') {
      this.message('Este navegador no permite grabar. Prueba Chrome o Safari actualizado.'); return;
    }
    const session=this.session;
    this.byId('voice-start').disabled=true;
    this.byId('voice-save').disabled=true;this.preview.pause();
    this.message('El navegador pedirá permiso para usar el micrófono.');
    let stream;
    try {
      stream=await navigator.mediaDevices.getUserMedia({audio:true});
      if(session!==this.session||!this.dialog.open||document.hidden) {
        stream.getTracks().forEach(t=>t.stop());
        if(session===this.session&&this.dialog.open)this.byId('voice-start').disabled=false;
        return;
      }
      this.stream=stream;
      const mime=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(type=>MediaRecorder.isTypeSupported(type));
      const recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);this.recorder=recorder;
      const chunks=[];
      let failed=false;
      recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data);};
      recorder.onstop=()=>{
        stream.getTracks().forEach(t=>t.stop());
        if(session!==this.session||!this.dialog.open||this.recorder!==recorder)return;
        clearTimeout(this.limit);
        if(failed){this.byId('voice-start').disabled=false;this.byId('voice-stop').disabled=true;this.byId('voice-save').disabled=!this.blob;this.message('No se pudo grabar. Intenta otra vez.');return;}
        this.blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});
        if(this.draftURL)URL.revokeObjectURL(this.draftURL);
        this.draftURL=URL.createObjectURL(this.blob); this.preview.src=this.draftURL; this.preview.hidden=false;
        this.byId('voice-save').disabled=!this.blob.size;
        this.byId('voice-stop').disabled=true; this.byId('voice-start').disabled=false;
        this.message('Escucha la grabación y revisa la palabra antes de guardarla.');
      };
      recorder.onerror=()=>{
        if(session!==this.session||this.recorder!==recorder)return;
        failed=true;this.stopCapture();this.byId('voice-start').disabled=false;this.byId('voice-stop').disabled=true;this.message('No se pudo grabar. Intenta otra vez.');
      };
      recorder.start();
      this.byId('voice-stop').disabled=false; this.byId('voice-save').disabled=true;
      this.message('Grabando. Di la palabra o expresión natural de tu comunidad. Máximo 20 segundos.');
      this.limit=setTimeout(()=>this.stopCapture(),20000);
    } catch {
      stream?.getTracks().forEach(t=>t.stop());
      if(session!==this.session)return;
      this.byId('voice-start').disabled=false;
      this.byId('voice-save').disabled=!this.blob;
      this.message('No se abrió el micrófono. Puedes revisar el permiso del navegador e intentar otra vez.');
    }
  }
  stopCapture() {
    clearTimeout(this.limit);
    if(this.recorder?.state==='recording')this.recorder.stop();
    this.stream?.getTracks().forEach(t=>t.stop());
  }
  cleanup() {
    this.saving=false;this.byId('voice-text').disabled=false;
    this.session+=1; this.stopCapture(); this.preview.pause(); this.preview.removeAttribute('src');
    if(this.draftURL)URL.revokeObjectURL(this.draftURL);
    this.draftURL=null; this.blob=null;
    this.preview.hidden=true;
    this.byId('voice-start').disabled=false;
    this.byId('voice-stop').disabled=true; this.byId('voice-save').disabled=true;
  }
  close() { this.dialog.close(); }
  async save() {
    if(this.saving)return;
    const text=this.byId('voice-text').value.trim();
    if(!text){this.message('Escribe la palabra o expresión que se escucha.');return;}
    const session=this.session,id=this.scene.id,blob=this.blob;
    this.saving=true;this.byId('voice-start').disabled=true;this.byId('voice-save').disabled=true;this.byId('voice-text').disabled=true;
    try {
      await this.store.save(id,text,blob);
      this.onSaved();if(session===this.session&&this.dialog.open)this.close();
    } catch {if(session===this.session)this.message('No se pudo guardar la voz. Comprueba que haya espacio e intenta otra vez.');}
    finally {if(session===this.session){this.saving=false;this.byId('voice-start').disabled=false;this.byId('voice-save').disabled=!this.blob;this.byId('voice-text').disabled=false;}}
  }
  async remove() {
    if(!confirm('¿Quitar esta voz familiar de este dispositivo? Puedes descargar una copia antes.'))return;
    try {await this.store.remove(this.scene.id);this.onSaved();this.close();}
    catch {this.message('No se pudo quitar la voz.');}
  }
  async backup() {
    try {
      const blob=await this.store.backup(); const url=URL.createObjectURL(blob);
      const link=document.createElement('a'); link.href=url; link.download='raramuri-voces-familiares.json';
      link.click(); setTimeout(()=>URL.revokeObjectURL(url),60000);
      this.message('Copia preparada. Guárdala en un lugar que conozcas; puedes recuperarla en otro dispositivo.');
    } catch {this.message('No se pudo preparar la copia.');}
  }
  async restore(event) {
    const file=event.target.files[0]; if(!file)return;
    try {const count=await this.store.restore(file,this.knownIds);this.onSaved();this.message('Se recuperaron '+count+' voces familiares.');this.byId('voice-backup').disabled=false;}
    catch {this.message('No se pudo recuperar esta copia. Elige un archivo de voces creado por esta aplicación.');}
    event.target.value='';
  }
}
