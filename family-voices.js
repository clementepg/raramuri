/* Personal adult recordings stay in this browser. Nothing is uploaded. */
class FamilyVoiceStore {
  constructor() { this.records = new Map(); this.urls = new Map(); }
  async open() {
    if (!globalThis.indexedDB) throw new Error('storage-unavailable');
    this.db = await new Promise((resolve,reject) => {
      const request = indexedDB.open('raramuri-family-voices',1);
      request.onupgradeneeded = () => request.result.createObjectStore('voices',{keyPath:'id'});
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const records = await this.readAll();
    records.forEach(record => this.install(record));
    return this;
  }
  readAll() {
    return new Promise((resolve,reject) => {
      const tx = this.db.transaction('voices','readonly');
      const request = tx.objectStore('voices').getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  install(record) {
    if (this.urls.has(record.id)) URL.revokeObjectURL(this.urls.get(record.id));
    this.records.set(record.id,record);
    this.urls.set(record.id,URL.createObjectURL(record.blob));
  }
  get(id) {
    const record = this.records.get(id);
    return record ? {...record,audio:this.urls.get(id)} : null;
  }
  async save(id,text,blob) {
    if (!this.db || !text.trim() || !blob.size || blob.size > 10*1024*1024) throw new Error('invalid-recording');
    const record = {id,text:text.trim().slice(0,120),blob,date:new Date().toISOString()};
    await new Promise((resolve,reject) => {
      const tx = this.db.transaction('voices','readwrite');
      tx.objectStore('voices').put(record);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
    });
    this.install(record);
  }
  async remove(id) {
    await new Promise((resolve,reject) => {
      const tx = this.db.transaction('voices','readwrite');
      tx.objectStore('voices').delete(id);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
    });
    if (this.urls.has(id)) URL.revokeObjectURL(this.urls.get(id));
    this.urls.delete(id); this.records.delete(id);
  }
  async backup() {
    const records = await Promise.all([...this.records.values()].map(async record => ({
      id:record.id,text:record.text,date:record.date,mime:record.blob.type,
      audio:await new Promise((resolve,reject) => {
        const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject; reader.readAsDataURL(record.blob);
      })
    })));
    return new Blob([JSON.stringify({format:'raramuri-family-voices',version:1,records})],{type:'application/json'});
  }
  async restore(file,knownIds) {
    if (file.size > 100*1024*1024) throw new Error('invalid-backup');
    const backup = JSON.parse(await file.text());
    if (backup.format !== 'raramuri-family-voices' || backup.version !== 1 || !Array.isArray(backup.records) || backup.records.length > 100) throw new Error('invalid-backup');
    const seen = new Set();
    const records = backup.records.map(record => {
      if (!knownIds.has(record.id) || typeof record.text !== 'string' || !record.text.trim() || record.text.length > 120 || !/^audio\/(webm|ogg|mp4|wav|mpeg)(;.*)?$/.test(record.mime) || typeof record.audio !== 'string' || record.audio.length > 14*1024*1024) throw new Error('invalid-backup');
      if (seen.has(record.id)) throw new Error('invalid-backup');
      seen.add(record.id);
      const bytes = Uint8Array.from(atob(record.audio),c => c.charCodeAt(0));
      if (!bytes.length || bytes.length > 10*1024*1024) throw new Error('invalid-backup');
      return {id:record.id,text:record.text.trim(),date:new Date().toISOString(),blob:new Blob([bytes],{type:record.mime})};
    });
    await new Promise((resolve,reject) => {
      const tx=this.db.transaction('voices','readwrite');
      records.forEach(record=>tx.objectStore('voices').put(record));
      tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);
    });
    records.forEach(record=>this.install(record));
    return records.length;
  }
}
