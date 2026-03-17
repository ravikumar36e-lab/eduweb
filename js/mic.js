/* ═══════════════════════════════════════════════
   MICROPHONE / SPEECH RECOGNITION
═══════════════════════════════════════════════ */
let _mic = null;

function micSupported(){
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function startMic(onResult, onError){
  if(!micSupported()){ onError('not-supported'); return; }
  try{
    if(_mic){ _mic.abort(); _mic=null; }
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    _mic = new Rec();
    _mic.lang = 'en-US';
    _mic.maxAlternatives = 5;
    _mic.interimResults = false;
    _mic.continuous = false;
    _mic.onresult = (e) => {
      const alts = [...e.results[0]].map(r => r.transcript.toLowerCase().trim());
      onResult(alts);
    };
    _mic.onerror = (e) => { _mic=null; onError(e.error); };
    _mic.onend   = ()  => { _mic=null; };
    _mic.start();
  }catch(e){ onError(e.message); }
}

function stopMic(){
  if(_mic){ _mic.abort(); _mic=null; }
}

function micBtnStart(btnId){
  const b=document.getElementById(btnId); if(!b) return;
  b.disabled=true; b.classList.add('listening'); b.textContent='🎤 Listening…';
}

function micBtnReset(btnId){
  const b=document.getElementById(btnId); if(!b) return;
  b.disabled=false; b.classList.remove('listening'); b.textContent=b.dataset.label;
}

function showMicResult(elId, text, ok){
  const el=document.getElementById(elId); if(!el) return;
  el.textContent=text; el.className='mic-result '+(ok?'ok':'bad');
  setTimeout(()=>{ el.textContent=''; el.className='mic-result'; }, 2400);
}

// Hide all mic buttons if API not available
if(!micSupported()){
  document.querySelectorAll('.btn-mic').forEach(b=>b.style.display='none');
}
