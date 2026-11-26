const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function worker() {
  const handlers = {};
  const context = {
    self: {location: {origin:'https://example.test'}, addEventListener:(name,fn)=>{handlers[name]=fn;}},
    caches: {match: async()=>new Response(Uint8Array.from([0,1,2,3,4,5,6,7]),{headers:{'Content-Type':'audio/mpeg'}})},
    fetch: async()=>{throw new Error('Offline: audio must come from the cache');},
    URL, Response, Headers
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'sw.js'),'utf8'),context);
  return async range => {
    let result;
    handlers.fetch({request:new Request('https://example.test/voice.mp3',range?{headers:{Range:range}}:{}),respondWith:value=>{result=value;}});
    return result;
  };
}

test('offline cached audio is playable as a complete response',async()=>{
  const response=await worker()();
  assert.equal(response.status,200);
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())],[0,1,2,3,4,5,6,7]);
});
for(const [range,expected,contentRange] of [
  ['bytes=0-1',[0,1],'bytes 0-1/8'],
  ['bytes=5-',[5,6,7],'bytes 5-7/8'],
  ['bytes=-2',[6,7],'bytes 6-7/8'],
  ['bytes=6-99',[6,7],'bytes 6-7/8']
]) test('cached audio supports '+range,async()=>{
  const response=await worker()(range);
  assert.equal(response.status,206);
  assert.equal(response.headers.get('Content-Range'),contentRange);
  assert.equal(Number(response.headers.get('Content-Length')),expected.length);
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())],expected);
});
for(const range of ['bytes=8-','bytes=5-2','bytes=-0','bytes=0-1,4-5']) test('invalid audio range returns416: '+range,async()=>{
  const response=await worker()(range);
  assert.equal(response.status,416);
  assert.equal(response.headers.get('Content-Range'),'bytes */8');
});
