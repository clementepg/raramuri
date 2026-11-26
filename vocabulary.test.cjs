const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const data=vm.runInNewContext(fs.readFileSync('bridge-data.js','utf8')+';BRIDGE_DATA');

test('every published lesson preserves language coverage, local media and source credits',()=>{
  const languages=data.languages.map(x=>x.id).sort();
  const ids=data.scenes.map(s=>s.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const legacy of ['agua','saludar','jugar']) assert.ok(ids.includes(legacy),'preserve shared lesson URL '+legacy);
  const sw=fs.readFileSync('sw.js','utf8');
  const used=new Set();
  for(const scene of data.scenes){
    assert.deepEqual(Array.from(Object.keys(scene.words).sort()),Array.from(languages));
    assert.ok(fs.existsSync(scene.image),scene.image);
    assert.ok(sw.includes('./'+scene.image),'offline image '+scene.image);
    assert.ok(scene.words.rar.sourceUrl.startsWith('https://'));
    assert.match(scene.words.rar.note,/Caballero \(2022\), p\./);
    for(const word of Object.values(scene.words)){
      assert.ok(word.text?.trim());
      if(!word.audio) continue;
      assert.match(word.audio,/^[a-z0-9-]+\.(wav|mp3)$/);
      assert.ok(fs.existsSync(word.audio),word.audio);
      assert.ok(sw.includes('./'+word.audio),'offline recording '+word.audio);
      const credit=data.audioCredits[word.audio];
      assert.ok(credit?.author && credit.license && credit.licenseUrl.startsWith('https://') && credit.sourceUrl.startsWith('https://'));
      assert.equal(crypto.createHash('sha256').update(fs.readFileSync(word.audio)).digest('hex'),credit.sha256,word.audio);
      used.add(word.audio);
    }
  }
  assert.equal(used.size,Object.keys(data.audioCredits).length,'no orphaned recording credits');
  assert.doesNotMatch(JSON.stringify(data),/[A-Z]:\\\\Users|AppData|local_audio|downloadURL/);
});
