/* Speaker recordings first; device voices are offered only for companion languages. */
class LessonPlayer {
  constructor(audio, {onState = () => {}, onError = () => {}} = {}) {
    this.audio = audio; this.onState = onState; this.onError = onError;
    this.request = 0; this.items = []; this.index = 0;
    audio.addEventListener('ended', () => {
      if (this.current?.kind === 'file' && this.current === this.activeFile && audio.ended) this.advance(this.request);
    });
    audio.addEventListener('error', () => {
      if (this.current?.kind === 'file' && this.current === this.activeFile && audio.error) this.fail(this.request);
    });
  }
  voiceFor(lang) {
    const voices = globalThis.speechSynthesis?.getVoices() || [];
    const prefix = lang.toLowerCase().split('-')[0];
    if (prefix === 'zh') return voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
      voices.find(v => /^(zh-(cn|tw|sg)|cmn(-.*)?|zh)$/i.test(v.lang)) || null;
    return voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
      voices.find(v => v.lang.toLowerCase().split('-')[0] === prefix) || null;
  }
  itemFor(word, language, allowDeviceVoice) {
    if (word.audio) return {kind:'file', language:language.id, audio:word.audio};
    if (language.id === 'rar' || !word.text || !allowDeviceVoice) return null;
    const voice = this.voiceFor(language.lang);
    if (!voice || typeof globalThis.SpeechSynthesisUtterance !== 'function') return null;
    return {kind:'speech',language:language.id,text:word.text,lang:language.lang,voice};
  }
  get current() { return this.items[this.index]; }
  stop() {
    this.request += 1;
    clearTimeout(this.nextTimer); clearTimeout(this.startTimer);
    this.items = []; this.index = 0; this.activeFile = null; this.utterance = null;
    this.audio.pause();
    globalThis.speechSynthesis?.cancel();
    this.onState(null,false);
  }
  play(items) {
    this.stop(); this.items = items.filter(Boolean);
    if (this.items.length) this.start(this.request);
  }
  async start(request) {
    const item = this.current;
    if (request !== this.request || !item) return;
    this.onState(item.language,true);
    this.startTimer = setTimeout(() => this.fail(request),30000);
    if (item.kind === 'file') {
      this.activeFile = item;
      this.audio.src = item.audio.startsWith('blob:') ? item.audio : './' + item.audio;
      try { await this.audio.play(); }
      catch { this.fail(request); }
      return;
    }
    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.voice = item.voice; utterance.lang = item.lang; utterance.rate = .85;
    utterance.onstart = () => {
      if(request!==this.request||this.utterance!==utterance||this.current!==item)return;
      clearTimeout(this.startTimer);this.startTimer=setTimeout(()=>this.fail(request),30000);
    };
    utterance.onend = () => {if(this.utterance===utterance&&this.current===item)this.advance(request);};
    utterance.onerror = () => {if(this.utterance===utterance&&this.current===item)this.fail(request);};
    clearTimeout(this.startTimer);this.startTimer = setTimeout(() => this.fail(request),12000);
    this.utterance = utterance;
    globalThis.speechSynthesis.speak(utterance);
  }
  advance(request) {
    if (request !== this.request || !this.current) return;
    clearTimeout(this.startTimer);
    this.activeFile = null;
    this.index += 1;
    if (!this.current) {
      this.items = []; this.onState(null,false); return;
    }
    this.onState(null,true);
    this.nextTimer = setTimeout(() => this.start(request),450);
  }
  fail(request) {
    if (request !== this.request || !this.current) return;
    this.stop(); this.onError();
  }
}
